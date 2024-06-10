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

    const [currentStep, setCurrentStep] = useState(1);

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
                <div className="container-fluid ">
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={EmployeeAdd} className="col-lg-7">

                            {/* Step 1 Personal Information */}
                            {currentStep === 1 && (
                            <div className="card">
                                <div class="card-header bg-secondary text-white">
                                    Step 1/5 - Personal Information
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className='form-label'>Name</label>
                                        <input ref={nameRef} type="text" className='form-control' />
                                        {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Date of Birth</label>
                                        <input ref={emailRef} type="email" className='form-control' />
                                        {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Gender</label>
                                        <select ref={roleRef} className='form-control'>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        {errors && errors['role'] && (<p className="text-danger text-sm">{errors['role']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Nationality</label>
                                        <input ref={addressRef} type="text" className='form-control' />
                                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Phone</label>
                                        <input ref={addressRef} type="text" className='form-control' />
                                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Address</label>
                                        <input ref={addressRef} type="text" className='form-control' />
                                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                                    </div>
                                </div>
                            </div>
                            )}

                            {/* Step 2 Employment Detail */}
                            {currentStep === 2 && (
                            <div className="card">
                                <div class="card-header bg-secondary text-white">
                                    Step 2/5 - Employment Detail
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className='form-label'>Job Title</label>
                                        <input ref={nameRef} type="text" className='form-control' />
                                        {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Department</label>
                                        <input ref={emailRef} type="email" className='form-control' />
                                        {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Employment Type</label>
                                        <select ref={roleRef} className='form-control'>
                                            <option value="waiter">Waiter</option>
                                            <option value="cashier">Cashier</option>
                                            <option value="kitchen">Kitchen</option>
                                        </select>
                                        {errors && errors['role'] && (<p className="text-danger text-sm">{errors['role']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>NRC</label>
                                        <input ref={addressRef} type="text" className='form-control' />
                                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>CV Form</label>
                                        <input ref={addressRef} type="text" className='form-control' />
                                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className='form-label'>Work Schedule</label>
                                        <input ref={addressRef} type="text" className='form-control' />
                                        {errors && errors['address'] && (<p className="text-danger text-sm">{errors['address']}</p>)}
                                    </div>
                                </div>
                            </div>
)}

                            {/* Step 3 Identification Documents */}
                            {currentStep === 3 && (
                            <div className="card">
                                <div class="card-header bg-secondary text-white">
                                    Step 3/5 - Identifications Documents
                                </div>
                                <div className="card-body">
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
                                </div>
                            </div>
                            )}

                            {/* Step 4 Booking Information */}
                            {currentStep === 4 && (
                            <div className="card">
                                <div class="card-header bg-secondary text-white">
                                    Step 4/5 - Booking Information
                                </div>
                                <div className="card-body">
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
                                </div>
                            </div>
                            )}

                            {/* Step 4 Permission Access */}
                            {currentStep === 5 && (
                            <div className="card">
                                <div class="card-header bg-secondary text-white">
                                    Step 5/5 - Booking Information
                                </div>
                                <div className="card-body">
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
                                </div>
                            </div> 
                            )}


                            <div className="mb-4">
                                <div className="d-flex justify-content-between">
                                    {currentStep === 1 && (
                                        <div></div>
                                    )}
                                {currentStep > 1 && (
                                <button onClick={() => {setCurrentStep(currentStep - 1)}} className='btn btn-info px-4'>Back</button>)}
                                {currentStep < 5 && (
                                <button onClick={() => {setCurrentStep(currentStep + 1)}} className='btn btn-info px-4 ps-auto'>Next</button>)}
                                {currentStep === 5 && (
                                <button className='btn btn-success px-4 ps-auto'>Submit</button> )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
