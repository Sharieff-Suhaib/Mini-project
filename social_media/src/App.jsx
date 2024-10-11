import React from "react";
import Register from "./components/Register"
import Home from "./components/Home"
import Login from "./components/Login"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
    
    return(
        <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>  
    </Router>
    );
}
export default App;