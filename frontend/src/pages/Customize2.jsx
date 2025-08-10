 import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Customize  from "./Customize";
 function Customize2(){
    const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(UserDataContext);
    const [AssistantName,setAssistantName] = useState(userData?.AssistantName || "");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleUpdateAssistant = async ()=>{
        setLoading(true);
        try{
            let formData = new FormData();
            formData.append("AssistantName",AssistantName);
            if(backendImage){
                formData.append("AssistantImage",backendImage);
            }
            else{
                formData.append("imageUrl",selectedImage);
            }
            const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true});
            console.log(result.data);
            setUserData(result.data);
            setLoading(false);
            toast.success("Assistant created successfully!");
            navigate("/");
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0f051d] via-[#0c0846] to-[#010e1a] flex flex-col justify-center items-center px-4 py-10">
        <IoArrowBackOutline className="absolute top-[30px] left-[30px] text-white h-[25px] w-[25px] cursor-pointer" onClick={()=>{navigate("/Customize")}}/>
        <h1 className="text-white text-[30px] text-center mb-[30px]">
        Enter Your <span className="text-[dodgerblue]">Assistant Name</span>
        </h1>
        <input type="text" placeholder="eg: viveki" className="w-full max-w-[600px] h-[60px] outline-none border-2 border-[white] bg-transparent text-[#f3f4f3] placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]" required onChange={(e)=>setAssistantName(e.target.value)} value = {AssistantName} ></input>
        {AssistantName && <button className=" min-w-[300px] h-[60px] text-black font-semibold bg-white rounded-full text-[19px] mt-[60px] cursor-pointer" 
        onClick={()=>{
        handleUpdateAssistant();
        }
        } disabled={loading}>
        {!loading?"Finally Create Your Assistant":"Loading..."}
        </button>} 
        </div>
    )
 }
 export default Customize2;