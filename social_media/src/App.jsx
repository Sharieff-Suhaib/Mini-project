import React from "react";
import Register from "./components/Register"
import Home from "./components/Home"
import Login from "./components/Login"
import Post2 from "./components/post2";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
    
    return(
        <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/post2" element={<Post2/>}/>
        </Routes>  
    </Router>
    );
}
export default App;