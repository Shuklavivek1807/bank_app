import { React, useEffect, useState } from "react";

const User_page = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getList();
  }, []);
  const result = localStorage.getItem("user");
  const value = JSON.parse(result);

  //get User data by id taken from loacal host
  let getList = async (event) => {
    let getUser = await fetch(`http://localhost:3004/wfind/${value._id}`, {
      method: "get",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getUser = await getUser.json();
    setData(getUser);
  };

  return (
    <>
      <div class="homeimg">
        <h1>Welcome {data.fname}</h1>
        <div className="container">
          <thead>
            <tr>
              <th>Balance</th>
              <th>Contact No.</th>
              <th>Date of birth</th>
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.balance}</td>
              <td>{data.contact}</td>
              <td>{data.date}</td>
              <td>{data.gender}</td>
              <td>{data.address}</td>
            </tr>
          </tbody>
        </div>
      </div>
    </>
  );
};

export default User_page;
