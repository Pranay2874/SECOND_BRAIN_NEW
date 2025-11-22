import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserModel,contentModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { middleware } from "./middleware";
const app = express();
//app.use(cors());
app.use(express.json()); // JSON-to-JavaScript-object parser
import cors from "cors";

const allowedOrigins = [
    "http://localhost:5173",
    "https://second-brain-new-pi.vercel.app"
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS blocked: " + origin));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.post("/api/v1/signup", async(req, res) => {
     const schema = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(3).max(300),
    });

    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {  // zod returns a object not just true or false , the object has success  status (True/false) and data
        res.status(400).json({
            message: "Invalid username or password",
        });
        return;
    }

   const username = parsedData.data.username;
   const password = parsedData.data.password;


    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username, password: hashedPassword });

        const token = jwt.sign({ userId: user._id }, JWT_PASSWORD);

        res.status(201).json({ message: "You are signed up", token });
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e });
    }

});

app.post("/api/v1/signin", async (req, res) => {
    const schema = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(3).max(300),
    });

    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {  
        res.status(400).json({
            message: "Invalid username or password",
        });
        return;
    }

    const username = parsedData.data.username;
    const password = parsedData.data.password;


    try {
        const user = await UserModel.findOne({ username });
          if (!user || !user.password) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_PASSWORD);
        res.status(200).json({ message: "Successfully signed in", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});


app.post("/api/v1/content", middleware, async (req, res) => {
    try {
        const { link, description, type, title, tags } = req.body;

        // Simple check for required fields
        if (!type || !title) {
            return res.status(400).json({ 
                message: "Type and Title are required" 
            });
        }

        const content = await contentModel.create({
            link,
            description, // Now saved as a String
            type,
            title,
            //@ts-ignore
            userId: req.userId , 
            tags: tags || "", 
        });

        res.status(200).json({
            message: "Content added successfully",
            content,
        });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({
            message: "Error adding content",
            //@ts-ignore
            error: error.message,
        });
    }
});

app.get("/api/v1/content", middleware,async(req, res) => {
    //@ts-ignore
    const userId=req.userId;
    const content=await contentModel.find({
        userId}) .populate("userId","username")
        res.json(content);
});
app.delete("/api/v1/content", middleware,async(req, res) => {
   const contentId = req.body.contentId;

     //@ts-ignore
    await contentModel.deleteMany({ contentId,userId:req.userId });
    res.json({ message: "Deleted" });
});
app.post("/api/v1/brain/share", (req, res) => {});
app.get("/api/v1/brain/:shareLink", (req, res) => {});



app.listen(3000, () => console.log(" Server running on port 3000"));
