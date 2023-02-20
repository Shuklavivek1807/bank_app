import React from "react";
import {Outlet,Navigate} from 'react-router-dom';

const AdminPComponent=()=>{
    const adminauth = localStorage.getItem('admin');
    return adminauth ?<Outlet/>:<Navigate to='/'/>
       
}

export default AdminPComponent;