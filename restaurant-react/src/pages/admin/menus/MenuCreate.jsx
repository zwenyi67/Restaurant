import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axiosClient';

export default function MenuCreate() {

  const [errors, setErrors] = useState('');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const imageRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/admin/menus/create')
    .then(({ data }) => {
      setTypes(data.types);
    })
    .catch(err => {
      setLoading(false);
      console.error(err); 
    });
  }, [])


  const menuCreate = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      image: imageRef.current.files[0],
      price: priceRef.current.value,
      menu_type_id: typeRef.current.value,
      description: descriptionRef.current.value,
    }

    axiosClient.post('/admin/menus/create', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(({ data }) => {
        navigate('/admin/menus')
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 422) {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
          } else if (err.response.status === 401) {
            console.log(err.response.data.message);
            setErrors('');
            setMessage(err.response.data.message);
          } else {
            console.error('Server error:', err.response.status);
          }
        } else {
          console.error('Network error:', err.message);
        }
      })
  }


  return (
    <div className='card'>
      <div className="card-header d-flex">
        <Link className='btn btn-info mr-3' to={'/admin/suppliers'}>Back</Link>
        <h3 className="card-title pt-2">Add New Menu</h3>
      </div>
      <div className="card-body">
        <div className="container-fluid">
          <div className="row">
            <form onSubmit={menuCreate} className="col-lg-6">

              <div className="mb-3">
                <label className='form-label'>Name</label>
                <input ref={nameRef} type="text" className='form-control' />
                {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Image</label>
                <input ref={imageRef} type="file" className='form-control' />
                {errors && errors['image'] && (<p className="text-danger text-sm">{errors['image']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Price</label>
                <input ref={priceRef} type="text" className='form-control' />
                {errors && errors['price'] && (<p className="text-danger text-sm">{errors['price']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Types</label>
                <select className='form-control' ref={typeRef} >
                  <option value="0">------ Select Menu Types ------</option>
                                    {types && (types.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    )))}
                </select>
              </div>
              <div className="mb-3">
                <label className='form-label'>Description</label>
                <textarea ref={descriptionRef} className='form-control' style={{ maxHeight: '150px', minHeight: '100px' }}></textarea>
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
