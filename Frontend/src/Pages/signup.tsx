import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LockIcon } from "../Icons/LockIcon";
import { UserIcon } from "../Icons/UserIcon";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

     try {
    
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });

    
      localStorage.setItem("token", response.data.token);
   
    
  
      
     alert("You have signed up!");

      
      navigate("/home");  
    } catch (error) {
      console.error(error);
      alert("Signup failed. Please try again.");
    }
  }

  return (
    <div className="bg-[#4071f4] flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl text-white mb-4">Second Brain</h1>

        <div className="p-6 w-80 bg-white border border-gray-100 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
          <h2 className="font-medium text-xl text-center mb-5 text-gray-700">Sign Up</h2>

          <div className="mb-3 relative">
            <UserIcon />
<Input ref={usernameRef} placeholder="Enter Your Username"></Input>
          </div>

          <div className="mb-5 relative">
            <LockIcon />
            <Input ref={passwordRef} placeholder="Password"></Input>
          </div>

          <div className="mb-4 flex justify-center">
            <Button variant="primary" text="Sign Up" onClick={signup} fullWidth={true} ></Button>
            
          </div>

          <div className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-[#4071f4] hover:underline focus:outline-none"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};