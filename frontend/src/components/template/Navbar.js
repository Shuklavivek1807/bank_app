import React from "react";
import {MdVerticalDistribute} from 'react-icons/md';
import {HashLink as Link} from 'react-router-hash-link';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const userauth = localStorage.getItem('user');
  const adminauth = localStorage.getItem('admin');
  const navigate = useNavigate();

  const logOut=()=>{
    localStorage.clear();
    navigate('/');
}

  const homehandler=()=>{
    if(userauth){
      navigate('/user')
    }else if(adminauth){
      navigate('/admin')
    }else{
      navigate('/')
    }
  }
  
  return (
    <>
      <div className="nav">
        <input type="checkbox" id="check" />
        <label htmlFor="check"> <i id="checkbtn"><MdVerticalDistribute/></i></label>
        <label className="logonav">Pay Bank</label>
        <ul>
          <li>
          <button style={{backgroundColor:'transparent',border:'none',fontSize:'17px',color:'white',fontFamily:'cursive',cursor:'pointer'}} onClick={homehandler} >Home</button>
          </li>
          <li>
            <Link smooth to="#aboutus">About Us</Link>
          </li>
          <li>
          <Link smooth to="#contactus">Contact Us</Link>
          </li>
          <li>
          {userauth ? <a href="/user/transaction">Transaction</a>: <a style={{display:"none"}}></a>}
          </li>
          <li>
          {userauth ? <a href="/user/transaction_history">Transaction History</a>:<a style={{display:"none"}}></a>}
          </li>
          <li>
          {userauth ? <a href="/" onClick={logOut}>Log out</a>:<a style={{display:"none"}}></a>}
          </li>

          <li>
          {adminauth ? <a href="/admin/registration">Registraion</a>: <a style={{display:"none"}}></a>}
          </li>
          <li>
          {adminauth ? <a href="/" onClick={logOut}>Log out</a>:<a style={{display:"none"}}></a>}
          </li>

        </ul>
      </div>
    </>
  );
};
export default Navbar;
