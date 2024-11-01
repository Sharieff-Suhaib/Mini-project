import React from "react";
import Register from "./components/Register"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Friend from "./components/Friend"
import Chat from "./components/Chat"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
    
    return(
        <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/friends" element={<Friend/>}/>
            <Route path="/chat" element={<Chat/>}/>
        </Routes>  
    </Router>
    );
}
export default App;