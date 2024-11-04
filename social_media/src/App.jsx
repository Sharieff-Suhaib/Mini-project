import React from "react";
import Register from "./components/Register"
import Home from "./components/Home"
import Login from "./components/Login"
import Post2 from "./components/post2";
=======
import Friend from "./components/Friend"
import Chat from "./components/Chat"
>>>>>>> 9b5b18b4aa52feb3c1750cb42f7201e8a8d72384
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
    return(
        <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/post2" element={<Post2/>}/>
=======
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/friends" element={<Friend/>}/>
            <Route path="/chat" element={<Chat/>}/>
>>>>>>> 9b5b18b4aa52feb3c1750cb42f7201e8a8d72384
        </Routes>  
    </Router>
    );
}
export default App;