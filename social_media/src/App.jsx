import React from "react";
import Login from "./components/Login"
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App(){
    
    return(
        <Router>
        <Routes>
           
            <Route path="/login" element={<Login />} />
           
            
            
        </Routes>  
    </Router>
    );
}
export default App;