import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Validation from '../Validation';


const New_registration =() =>{
   const [data,setData] = useState({
    fname:"",lname:"",date:Date(''),email:"",pass:"",gender:"",contact:Number(''),balance:Number(''),address:""
   })
   const navigate = useNavigate();
   const submitHandler=(event)=>{
    setData({...data,[event.target.name]: (event.target.value)});
}
const[errors,setErrors] = useState({});
const[correctData,setcorrectData] = useState(false);

   const formSubmit=async event=>{
         event.preventDefault();
            event.preventDefault();
            setErrors(Validation(data));
            setcorrectData(true);
            if(Object.keys(errors).length === 0 && correctData){
            let result = await fetch('http://localhost:3004/register',{
                  method: 'post',
                  body: JSON.stringify(data),
                  headers: {
                    'Content-Type': 'application/json'
                  },
            });
        navigate('/admin')
   }
}
    return(
        <>
        <div className='homeimg'>
        <form className='regcontainer' onSubmit={formSubmit}>
            <div className='column'>
                <label className='label_form'>First name*</label>
                <input className='input_form'  type='text'  name='fname' placeholder='Enter first name' onChange={submitHandler} autoComplete='off'/>
                {errors.fname && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.fname}</p>}
                </div>
            <div className='column'>
                <label className='label_form'>Last name</label>
                <input className='input_form' type='text'  name='lname' placeholder='Enter last name' onChange={submitHandler} autoComplete='off'/>
            </div>
            <div className='column'>
                <label className='label_form'>Contact No*</label>
                <input className='input_form' type='text'  name='contact' placeholder='Enter contact no.' onChange={submitHandler} autoComplete='off'/>
                {errors.contact && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.contact}</p>}
            </div>
            <div className='column'>
                <label className='label_form'>Date Of Birth*</label>
                <input className='input_form' type='date'  name='date' onChange={submitHandler} autoComplete='off'/>
                {errors.date && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.date}</p>}

                </div>
            <div className='column'>
                <label className='label_form'>Opening Amount*</label>
                <input className='input_form'  type='number' name='balance' placeholder='Enter amount' onChange={submitHandler} autoComplete='off'/>
                {errors.amount && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.amount}</p>}
            </div>
            <div className='column'>
                <label className='label_form'>Email*</label>
                <input className='input_form' placeholder='Enter Email' type='text' name='email' onChange={submitHandler} autoComplete='off'/>
                {errors.email && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.email}</p>}
            </div>
            <div className='column'>
                <label className='label_form'>Password*</label>
                <input className='input_form' placeholder='Enter Password' type='password' name='pass' onChange={submitHandler} autoComplete='off'/>
                {errors.password && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.password}</p>}
            </div>
            <div className='radio label_form' >
            <label className='label'>Male</label>
            <input className='input' type='radio' value='Male' name='gender' onChange={submitHandler} required/>
            <label className='label1'>Female</label>
            <input className='input' type='radio' value='Female' name='gender' onChange={submitHandler} required/><br/>
            </div>
            
            <label className='label_form'>Address*</label>
            <textarea className='input_form' name='address'  onChange={submitHandler} autoComplete='off' placeholder='Enter text here...'></textarea>
            {errors.address && <p style={{fontSize:"12px",margin:"5px",float:"left",color:"red"}} classname='error'>{errors.address}</p>}
            <button className='submitButton' type='submit'>Submit</button>
        </form>
        </div>
        </>
    )
}
export default New_registration;