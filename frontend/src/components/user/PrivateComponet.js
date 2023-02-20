import React from "react";
import {Outlet,Navigate} from 'react-router-dom';

const PrivateComponent=()=>{
    const userauth = localStorage.getItem('user');
    return userauth ?<Outlet/>:<Navigate to='/'/>
}

export default PrivateComponent;