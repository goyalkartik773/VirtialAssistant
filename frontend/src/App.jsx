import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Signup from './pages/SignUp'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from './pages/Signin'
import './App.css'
import Home from './pages/Home'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2';
import { useContext } from 'react';
import { UserDataContext } from "./context/UserDataContext";


function App() {
  const {userData} = useContext(UserDataContext);
  return (
    
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={(userData?.AssistantImage && userData?.AssistantName)?<Home/>:<Navigate to={"/Customize"}/>}></Route>
        <Route path="/signup" element={!userData?<Signup />:<Navigate to={"/"}/>}/>
        <Route path="/signin" element={!userData?<Signin />:<Navigate to={"/"}/>} />
        <Route path="/Customize" element={userData?<Customize/>:<Navigate to={"/signin"}/>}/>
        <Route path="/Customize2" element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
