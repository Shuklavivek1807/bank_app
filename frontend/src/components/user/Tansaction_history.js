import React, { useEffect, useState } from "react";

const Transaction_history = () => {
  const [data, setData] = useState({});

  const result = localStorage.getItem("user");
  const value = JSON.parse(result);

  useEffect(() => {
    transHistory();
  }, []);


  //get transaction history data by User name and set to table
  const transHistory = async (event) => {
    console.log(value.contact);
    let key = value.contact;
    if (key) {
      let result = await fetch(`http://localhost:3004/trans/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      setData();
    }
  };
  return (
    <>
      <div className="homeimg">
        <table className="container">
          <thead>
            <tr>
              <th>S no.</th>
              <th>ID</th>
              <th>Payee Name</th>
              <th>Amount</th>
              <th>Memo</th>
            </tr>
          </thead>
          {data.length > 0 ? (
            data.map((item, index) => (
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
    </>
  );
};
export default Transaction_history;
