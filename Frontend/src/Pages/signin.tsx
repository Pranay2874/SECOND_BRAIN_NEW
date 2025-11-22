import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LockIcon } from "../Icons/LockIcon";
import { UserIcon } from "../Icons/UserIcon";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const signin = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }

        try {

            localStorage.removeItem("token");

            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });

            if (response.data.token) {

               
                localStorage.setItem("token", response.data.token);
               
                navigate("/home");
            } else {
                alert("Signin failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Signin failed. Please try again.");
        }
    };

    return (
        <div className="bg-[#4071f4] flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-4xl text-white mb-4">Second Brain</h1>

                <div className="p-6 w-80 bg-white border border-gray-100 rounded-lg shadow-md">
                    <h2 className="font-medium text-xl text-center mb-5 text-gray-700">Sign In</h2>

                    <div className="mb-3 relative">
                        <UserIcon />
                        <Input ref={usernameRef} placeholder="Enter Your Username"></Input>
                    </div>

                    <div className="mb-5 relative">
                        <LockIcon />
                        <Input ref={passwordRef} placeholder="Password" type="password"></Input>
                    </div>

                    <div className="mb-4 flex justify-center">
                        <Button variant="primary" text="Sign In" onClick={signin} fullWidth={true}></Button>

                    </div>

                    <div className="text-center text-xs text-gray-500">
                        Don’t have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-[#4071f4] hover:underline"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};