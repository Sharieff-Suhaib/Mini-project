import React from "react";
import Register from "./components/Register"
import Home from "./components/Home"
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
    
    return(
        <Router>
        <Routes>
            <Route path="/login" element={<Register />} />
            <Route path="/home" element={<Home/>}/>
        </Routes>  
    </Router>
    );
}
export default App;