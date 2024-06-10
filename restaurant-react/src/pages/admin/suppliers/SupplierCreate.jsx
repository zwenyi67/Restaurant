import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../../axiosClient';


export default function SupplierCreate() {

    const [errors, setErrors] = useState('');

    const nameRef = useRef();
    const emailRef = useRef();
    const locationRef = useRef();
    const phoneRef = useRef();
    const typeRef = useRef();
    const descriptionRef = useRef();

    const navigate = useNavigate();

    const supplierCreate = (e) => {
        e.preventDefault();

        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            location : locationRef.current.value,
            phone : phoneRef.current.value,
            type : typeRef.current.value,
            description : descriptionRef.current.value,
        }

        axiosClient.post('/admin/suppliers/create', payload)
        .then(() => {
            navigate('/admin/suppliers');
        })
        .catch(err => {
            if (err.response) {
              if (err.response.status === 422) {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
              } else if(err.response.status === 401) {
                console.log(err.response.data.message);
                setErrors('');
                setMessage(err.response.data.message);
              } else {
                console.error('Server error:', err.response.status);
              }
            } else {
              console.error('Network error:', err.message);
            }
          });
    }

  return (
    <div className='card'>
    <div className="card-header d-flex">
        <Link className='btn btn-info mr-3' to={'/admin/suppliers'}>Back</Link>
        <h3 className="card-title pt-2">Add New Supplier</h3>
    </div>
    <div className="card-body">
        <div className="container-fluid">
            <div className="row">
                <form onSubmit={supplierCreate} className="col-lg-6">
                    
                    <div className="mb-3">
                        <label className='form-label'>Name</label>
                        <input ref={nameRef} type="text" className='form-control' />
                        {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Email</label>
                        <input ref={emailRef} type="text" className='form-control' />
                        {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Location</label>
                        <input ref={locationRef} type="text" className='form-control' />
                        {errors && errors['location'] && (<p className="text-danger text-sm">{errors['location']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Phone</label>
                        <input ref={phoneRef} type="text" className='form-control' />
                        {errors && errors['phone'] && (<p className="text-danger text-sm">{errors['phone']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Type</label>
                        <input ref={typeRef} type="text" className='form-control' />
                        {errors && errors['type'] && (<p className="text-danger text-sm">{errors['type']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Description</label>
                        <input ref={descriptionRef} type="text" className='form-control' />
                        {errors && errors['description'] && (<p className="text-danger text-sm">{errors['description']}</p>)}
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
