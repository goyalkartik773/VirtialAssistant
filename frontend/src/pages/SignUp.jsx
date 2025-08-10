import React, { useContext, useState } from "react";
import bg from "../assets/authBg2.png"
import { FaEye } from "react-icons/fa6";
import { IoIosEyeOff } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { toast } from "react-toastify";
import Customize from "./Customize";

function Signup(){
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {serverUrl,setUserData} = useContext(UserDataContext);

    const handleSignUp = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{

            let result = await axios.post(`${serverUrl}/api/auth/signup`,{
            name,email,password
            },{withCredentials:true});
            setUserData(result.data);
            toast.success("Signup successful!");
            setLoading(false);
            navigate("/Customize");
        }
        catch (err) {
        const backendMsg = err.response?.data?.message || "Signup failed";
        toast.error(backendMsg);
        console.error("Signup Error:", err);
        setUserData(null);
        setLoading(false);
    }

    }
    return (
        <div className=" relative w-full h-[100vh] bg-cover flex  items-center" style={{backgroundImage:`URL(${bg})`}}>
        <form className="absolute left-[100px] w-[90%] h-[600px] max-w-[500px] backdrop-blur-[12px] shadow-lg  shadow-[#38f404]  flex flex-col items-center justify-center gap-[20px] px-[20px]" onSubmit={handleSignUp}>
        <h1 className="text-white text-[30px] font-semibold pb-[20px]" >Register to <span className=" text-[#00ccff]"> Virtual Assistant</span>  </h1>
        <input type="text" placeholder="Enter your Name" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]" onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Email" className="w-full h-[60px] outline-none border-2 border-[white] bg-transparent text-[#f3f4f3] placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]" onChange={(e)=>setEmail(e.target.value)}></input>
        <div className="realtive w-full h-[60px] border-2 border-white bg-transparent text-[white] rounded-full text-[18px]">
        <input type={showPassword?"text":"password"} placeholder="password" className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]" onChange={(e)=>setPassword(e.target.value)}/>
        {!showPassword && <FiEyeOff className="absolute top-[330px] right-[50px] w-[25px] h-[25px] text-white cursor-pointer" onClick={()=>setShowPassword(true)}/>}
        {showPassword && <FiEye  className="absolute top-[330px] right-[50px] w-[25px] h-[25px] text-white cursor-pointer" onClick={()=>setShowPassword(false)}/>}
        </div>
        <button className="min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full text-[19px] mt-[30px] cursor-pointer" disabled={loading}>{loading?"loading...":"Sign Up"}</button>
        <p className="text-white text-[18px] cursor-pointer " onClick={()=>navigate("/signin")}>Already have an account ? <span className="text-blue-400">Sign In</span></p>
        </form>
        </div>
    )
}
export default Signup;