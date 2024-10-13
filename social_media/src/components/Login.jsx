import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import "./Login.css"
function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const result = await loginUser(email,password);
            console.log(result);
            navigate("/home");
        }catch(error){
            console.error("Login failed",error);
        }
    }
    return(
        <div className="login-container">
            <div className="login-box">
            <form className="" onClick={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <div class="form-floating">
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input onChange={(e) => setPassword(e.target.value)}  type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="form-check text-start my-3">
                    <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
            
                
            </div>
        </div>
    )
}
export default Login;