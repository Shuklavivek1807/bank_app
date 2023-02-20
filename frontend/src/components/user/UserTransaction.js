import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserTransaction = () => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState({
    fname: "",
    tamount: "",
    memo: "",
    accountno: "",
  });

  const navigate = useNavigate();

  const result = localStorage.getItem("user");
  const value = JSON.parse(result);

  //get User Data and set to data
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

  //Check transfer to User data
  const checkUser = async (event) => {
    let getData = await fetch("http://localhost:3004/ufind", {
      method: "post",
      body: JSON.stringify({
        contact: amount.accountno,
        fname: amount.fname
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getData = await getData.json();
    if (getData.fname) {
      const newamount = data.balance - Number(amount.tamount);
      setData((data.balance = newamount));

      //update balance of user data
      let updateData = await fetch(
        `http://localhost:3004/wupdate/${data._id}`,
        {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      updateData = await updateData.json();

      const newbalance = getData.balance + Number(amount.tamount);
      getData.balance = newbalance;

      //update balance of transfer to User balance
      let updateUser = await fetch(
        `http://localhost:3004/uupdate/${getData._id}`,
        {
          method: "put",
          body: JSON.stringify(getData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //post data of transaction in database to store transaction history
      let postTransaction = await fetch(`http://localhost:3004/transaction`, {
        method: "post",
        body: JSON.stringify({
          fname: amount.fname,
          tamount: amount.tamount,
          memo: amount.memo,
          name: data.fname,
          transID: new Date().getTime(),
          contact: data.contact,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/user");
    } else {
      window.alert("Payee not found");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handlerAmount = (event) => {
    setAmount({ ...amount, [event.target.name]: event.target.value });
  };

  const handlerTransaction = async (event) => {
    event.preventDefault();
    if(amount.tamount>data.balance){
      alert("not enough balance")
    }else if(amount.tamount<0){
      alert("incorrect amount")
    }else{
      checkUser();
    }
    
  };
  return (
    <>
      <div className="homeimg">
        <div className="logincontainer">
          <label>From Account</label>
          <input
            className="login_input"
            value={data.fname + " " + data.lname}
          />
          <form onSubmit={handlerTransaction}>
            <label>To Account</label>
            <input
              className="login_input"
              name="fname"
              type="text"
              onChange={handlerAmount}
              placeholder="Payee Name"
              autoComplete="off"
              required
            />
            <label>Contact No.</label>
            <input
              className="login_input"
              name="accountno"
              type="text"
              onChange={handlerAmount}
              placeholder="contact no."
              autoComplete="off"
              required
            />
            <label>Amount</label>
            <input
              className="login_input"
              name="tamount"
              type="text"
              onChange={handlerAmount}
              placeholder="Amount"
              autoComplete="off"
              required
            />
            <br />
            <label>Memo</label>
            <textarea
              className="login_input"
              name="memo"
              type="text"
              onChange={handlerAmount}
              autoComplete="off"
              required
            />
            <button className="submitButton" type="submit">
              Sumbit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserTransaction;
