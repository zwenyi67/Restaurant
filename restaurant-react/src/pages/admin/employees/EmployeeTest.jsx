import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../../axiosClient';

export default function EmployeeAdd() {

    const [errors, setErrors] = useState();

    const nameRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();
    const navigate = useNavigate();

    const EmployeeAdd = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            role: roleRef.current.value,
        }

        axiosClient.post('/admin/employees/add', payload)
        .then(() => {
            navigate('/admin/employees');
        })
    }

  return (
    <div className='card'>
    <div className="card-header d-flex">
        <Link className='btn btn-info mr-3' to={'/admin/employees'}>Back</Link>
        <h3 className="card-title pt-2">Add New Employee</h3>
    </div>
    <div className="card-body">
        <div className="container-fluid">
            <div className="row">
                <form onSubmit={EmployeeAdd} className="col-lg-6">
                    
                    <div className="mb-3">
                        <label className='form-label'>Name</label>
                        <input ref={nameRef} type="text" className='form-control' />
                        {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Email</label>
                        <input ref={emailRef} type="email" className='form-control' />
                        {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
                    </div>
                    <div className="mb-3">
                                <label className='form-label'>Role</label>
                                <select ref={roleRef} className='form-control'>
                                    <option value="waiter">Waiter</option>
                                    <option value="cashier">Cashier</option>
                                    <option value="kitchen">Kitchen</option>
                                </select>
                                {errors && errors['role'] && (<p className="text-danger text-sm">{errors['role']}</p>)}
                            </div>
                    <div className="mb-3">
                        <label className='form-label'>Address</label>
                        <input ref={addressRef} type="text" className='form-control' />
                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                    </div>
                    
                    <div className="mb-4">
                        <button className='btn btn-info px-4'>ADD</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}
