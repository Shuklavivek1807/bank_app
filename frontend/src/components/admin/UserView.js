import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserHistory } from "./UserHistory";

const UserView=()=>{
    const[data,setData]=useState({});
    const[list,setList]=useState({});
    const params = useParams();

    useEffect(() => {
        getList();
      },[]);
      let getList = async (event) => {
        let getUser = await fetch(`http://localhost:3004/wfind/${params.id}`, {
          method: "get",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
          },
        })
        getUser= await getUser.json();
        setData(getUser)

        let key = getUser.contact;
        if (key) {
          let result = await fetch(`http://localhost:3004/trans/${key}`);
          result = await result.json();
          if (result) {
            setList(result);
          }
        } else {
          setList();
        }
      };
    return(
        <div className="homeimg">
            <div className="container">
          <thead>
            <tr>
            <th>Name</th>
              <th>Balance</th>
              <th>Contact No.</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
            <tbody>
            <tr>
            <td>{data.fname+" "+data.lname}</td>
              <td>{data.balance}</td>
              <td>{data.contact}</td>
              <td>{data.date}</td>
              <td>{data.gender}</td>
              <td>{data.address}</td>
            </tr>
          </tbody>
        </div>
        <div className="container" style={{width:'auto'}}>
        <h2 style={{margin:'10px',padding:'0px'}}>Transaction History</h2>
        <table>
        <thead>
            <tr>
              <th>S no.</th>
              <th>ID</th>
              <th>Payee Name</th>
              <th>Amount</th>
              <th>Memo</th>
            </tr>
          </thead>
        {list.length > 0 ? (
            list.map((item, index) => (
              <tbody>
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.transID}</td>
                  <td>{item.fname}</td>
                  <td>{item.tamount}</td>
                  <td>{item.memo}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <h1>No transaction</h1>
          )}
        </table>
          </div>
        </div>
    )
}
export default UserView;