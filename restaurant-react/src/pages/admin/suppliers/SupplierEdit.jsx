import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import { message } from 'laravel-mix/src/Log';

export default function SupplierEdit() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [supplier, setSupplier] = useState({
        id: null,
        name: '',
        email: '',
        location: '',
        phone: '',
        type: '',
        description: '',
        status: '',
    });

    const closeButton = () => {
        console.log(message);
        setMessage(null);
    }

    if (id) {
    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/admin/suppliers/${id}/edit`)
        .then(({data})=> {
            setLoading(false);
            setSupplier(data.supplier);
        })
        .catch(err => {
            const response = err.response;
            if(response) {
                setMessage('Error');
            }
            else if (response && response.status === 422) {
                setMessage('Error creating product');
            } else if (response && response.status === 429) {
                setMessage('Too Many Request');
                navigate('/admin/suppliers');
            }
        })
    }, [])
    }

    const supplierEdit = (e) => {
        e.preventDefault();

        axiosClient.put(`/admin/suppliers/${id}/edit`, supplier)
        .then((response) => {
            setMessage(response.data.message);
        })
        .catch(err => {
            const response = err.response;
            if(response) {
                setMessage('Error');
            }
            else if (response && response.status === 422) {
                setMessage('Error creating product');
            } else if (response && response.status === 429) {
                setMessage('Too Many Request');
                navigate('/admin/suppliers');
            }
        })
    }

  return (
    <>
    { message &&
    <div  className="toast-container position-fixed top-1 end-0 p-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div className='border rounded bg-success'>
  <div  className="toast-header">
    <strong className="me-auto">Bootstrap</strong>
    <button onClick={closeButton}>X</button>
  </div>
  <div className="toast-body">
    {message}
  </div>
  </div>
</div> }
    <div className='card'>
    <div className="card-header d-flex">
        <Link className='btn btn-info mr-3' to={'/admin/suppliers'}>Back</Link>
        <h3 className="card-title pt-2">{supplier.name}</h3>
    </div>
    <div className="card-body">
        <div className="container-fluid">
            <div className="row">
                {loading && <div className="spinner-grow" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
{!loading && 
                <form onSubmit={supplierEdit} className="col-lg-6">
                    
                    <div className="mb-3">
                        <label className='form-label'>Name</label>
                        <input value={supplier.name} onChange={(e) => setSupplier({...supplier, name: e.target.value})} type="text" className='form-control' />
                        {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Email</label>
                        <input value={supplier.email} onChange={(e) => setSupplier({...supplier, email: e.target.value})} type="text" className='form-control' />
                        {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Location</label>
                        <input value={supplier.location} onChange={(e) => setSupplier({...supplier, location: e.target.value})} type="text" className='form-control' />
                        {errors && errors['location'] && (<p className="text-danger text-sm">{errors['location']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Phone</label>
                        <input value={supplier.phone} onChange={(e) => setSupplier({...supplier, phone: e.target.value})} type="text" className='form-control' />
                        {errors && errors['phone'] && (<p className="text-danger text-sm">{errors['phone']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Type</label>
                        <input value={supplier.type} onChange={(e) => setSupplier({...supplier, type: e.target.value})} type="text" className='form-control' />
                        {errors && errors['type'] && (<p className="text-danger text-sm">{errors['type']}</p>)}
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Description</label>
                        <input value={supplier.description} onChange={(e) => setSupplier({...supplier, description: e.target.value})} type="text" className='form-control' />
                        {errors && errors['description'] && (<p className="text-danger text-sm">{errors['description']}</p>)}
                    </div>
                    
                    
                    <div className="mb-4">
                        <button className='btn btn-info px-4'>ADD</button>
                    </div>
                </form> }
            </div>
        </div>
    </div>
</div>
</>
  )
}
