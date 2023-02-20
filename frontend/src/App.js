import './App.css';
import LogIn from './components/LogIn';
import {Route,Routes} from 'react-router-dom';
import User_page from './components/user/User_page';
import New_registration from './components/admin/New_registraion';
import Admin_home from './components/admin/Admin_home';
import Update_list from './components/admin/Update_list';
import Navbar from './components/template/Navbar';
import React from 'react';
import Footer from './components/template/Footer';
import AboutUs from './components/home/AboutUs';
import PrivateComponent from './components/user/PrivateComponet';
import ContactUs from './components/home/ContactUs';
import AdminPComponent from './components/admin/AdminPComponent';
import UserTransaction from './components/user/UserTransaction';
import Transaction_history from './components/user/Tansaction_history';
import UserView from './components/admin/UserView';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<LogIn/>}/>
      <Route element={<PrivateComponent/>}>
      <Route exact path='/user' element={<User_page/>}/>
      <Route exact path='/user/transaction_history' element={<Transaction_history/>}/>
      <Route exact path='/user/transaction' element={<UserTransaction/>}/>
      </Route>
      <Route element={<AdminPComponent/>}>
      <Route exact path='/admin/registration' element={<New_registration/>}/>
      <Route exact path='/admin' element={<Admin_home/>}/>
      <Route exact path='/update/:id' element={<Update_list/>}/>
      <Route exact path='/view/:id' element={<UserView/>}/>
      </Route> 
    </Routes>
    <AboutUs/>
    <ContactUs/>
    <Footer/>
    </>
  );
}

export default App;
