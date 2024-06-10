import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axiosClient';
import '../assets/css/adminlte.min.css';
import { OrderProvider, useOrderContext } from '../contexts/OrderProvider';

export default function WaiterLayout() {

    const { token, user, role, setUser,setToken,setRole } = useStateContext();
    // var qtyCount = 0;
    // order.map((o) => {
    //   qtyCount += o.qty;
    // })

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (token && role === 'admin') {
        return <Navigate to="/admin" />;
    }

    useEffect(() => {
      axiosClient.get('/waiter')
      .then(({data}) => {
        setUser(data);
      })
    },[])

      const Logout = (e)=> {
        e.preventDefault();

        if(!window.confirm('Are You Sure you want to logout ?')) {
            return 
        }

        axiosClient.get('/logout')
        .then(() => {
            setUser(null);
            setToken(null);
            setRole(null);
        })
        .catch(err => {
            if (err.response) {
              if (err.response.status === 422) {
                console.log(err.response.data.errors);
              } else {
                console.error('Server error:', err.response.status);
              }
            } else {
              console.error('Network error:', err.message);
            }
          });
    }

  return (
    <div style={{background: '#f0f0f0'}}>
      <nav className="navbar navbar-expand-lg ">
  <div style={{ padding: '3px 20px' }} className="container-fluid d-flex justify-content-center">
    <Link className="navbar-brand" to={'/waiter'}>Waiter</Link>
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon btn btn-danger"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/waiter'}>Home</Link>
        </li>
        <li className="nav-item">
        <Link className='nav-link' to={'/waiter/menus'}>Menus</Link>
        </li>
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
       
        <li className="nav-item">
        <a onClick={Logout} title='logout' className='nav-link'>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <Outlet/>
      
    </div>
  )
}
