import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
    const [data,setData] = useState({
        contact: "",pass: ""
    })
    const navigate = useNavigate();
    const adminnavigate = useNavigate();
const handleSubmit=(event)=>{
  setData({...data,[event.target.name]: (event.target.value)});
}
const submitHandler = async event =>{
           event.preventDefault();
            let result = await fetch('http://localhost:3004/login',{
                  method: 'post',
                  body: JSON.stringify(data),
                  headers: {
                    'Content-Type': 'application/json'
                  },
            });
            result = await result.json();

            let resultadmin = await fetch('http://localhost:3004/adminlogin',{
                  method: 'post',
                  body: JSON.stringify(data),
                  headers: {
                    'Content-Type': 'application/json'
                  },
            });
            resultadmin = await resultadmin.json();

            if(result.contact){
                localStorage.setItem("user",JSON.stringify(result));
                navigate("/user");
            }else if(resultadmin.contact){
                localStorage.setItem("admin",JSON.stringify(resultadmin));
                adminnavigate("/admin");
            }else{
                alert("incorrect detail");
            }
          
          
}
    return(
        <>
        <div id='home' className="homeimg">
        <div className="logincontainer" >
        <form  onSubmit={submitHandler}>
              <h2 className='loghead'>Log In</h2>
              <input className='login_input' type="text" name='contact' onChange={handleSubmit} autoComplete='off'  placeholder=' Enter user id'/>
              <input className='login_input' type="password" name='pass' onChange={handleSubmit} autoComplete='off' placeholder=' Enter password'/>
              <button className='submitButton' type='submit'>Submit</button>
        </form>
        </div>
        </div>
        </>
    )
}

export default LogIn;

