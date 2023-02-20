import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin_home =()=>{
    const [list,setList] =useState([]);

    useEffect(()=>{
          getLists();
    },[])

    const getLists = async () =>{
        let result = await fetch('http://localhost:3004/users');
        result = await result.json();
        setList(result);
    }
    
    const deleteList =async (id) =>{
          let result = await fetch(`http://localhost:3004/users/${id}`,{
              method: "Delete"
          });
          result = await result.json()
          if(result){
           alert("record deleted")
           getLists();
          }

    }

    const searchHandle =async (event)=>{
        let input =event.target.value;
        let key = input;
        if(key){
            let result = await fetch(`http://localhost:3004/search/${key}`);
            result =await result.json();
            if(result){
                setList(result);
            }
        }else{
            getLists();
        }
    }

    return(

        <>  <div id="home" className="homeimg">
            <input className="input_search" placeholder="Search name" type="text" onChange={searchHandle}/>
            <div className="container" style={{overflow:"auto"}}>
            <table className="user_table">
               <thead> <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Contact No.</th>
                    <th>Date of birth</th>
                    <th>Gender</th>
                    <th>View</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr></thead>
                {
                     list.length>0 ? list.map((item,index)=>
                    <tbody>
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>{item.fname+" "+ item.lname}</td>
                            <td>{item.contact}</td>
                            <td>{item.date}</td>
                            <td>{item.gender}</td>
                            <td><button className="tableButton"><Link  to={"/view/"+item._id}>View</Link></button></td>
                            <td><button className="tableButton"><Link  to={"/update/"+item._id}>Update</Link></button></td>
                            <td><button onClick={(id)=>deleteList(item._id)} className="tableButton">Delete</button></td>
                        </tr></tbody>
                    )
                    : <h1>No data</h1>
                }
            </table>
            </div>
            </div>
        </>
    )
}

export default Admin_home;