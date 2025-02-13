import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {

   const handleLogin=async(e)=>{
    e.preventDefault();
    try{
        const email=e.target.email.value;
        const password=e.target.password.value;
        const resp=await fetch("http://localhost:1500/api/v1/login",{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({
                email,
                password,
            }),
            headers:{
             "content-type":"application/json"
            }
        });
        const respObj=await resp.json();
        console.log(respObj); // just for debugging
        
    }catch(err){
      alert(err.name);
    }
   
   }
   
  return (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                <label>User name/ Email</label>
                <input type="text" name='email'/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name='password'/>
            </div>
            <div>
                
                <button type='submit'>Login</button>
                <Link to='/sign-up'>Sign Up</Link>
            </div>
        </form>
    </div>
  )
}
