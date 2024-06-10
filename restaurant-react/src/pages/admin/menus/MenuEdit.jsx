import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';

export default function MenuEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const imageRef = useRef();
    const [menu, setMenu] = useState({
        id: null,
        name: '',
        price: '',
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
            axiosClient.get(`/admin/menus/${id}/edit`)
                .then(({ data }) => {
                    setLoading(false);
                    setMenu(data.menu);
                    setImage(data.menu.image);
                })
                .catch(err => {
                    const response = err.response;
                    if (response) {
                        setMessage('Error');
                    }
                    else if (response && response.status === 422) {
                        setMessage('Error creating product');
                    } else if (response && response.status === 429) {
                        setMessage('Too Many Request');
                        navigate('/admin/menus');
                    }
                })
        }, [])
    }

    const menuEdit = (e) => {
        e.preventDefault();


        axiosClient.put(`/admin/menus/${id}/edit`, menu)
            .then((response) => {
                setMessage(response.data.message);
                navigate('/admin/menus')
            })
            .catch(err => {
                const response = err.response;
                if (response) {
                    setMessage('Error');
                }
                else if (response && response.status === 422) {
                    setMessage('Error creating product');
                } else if (response && response.status === 429) {
                    setMessage('Too Many Request');
                    navigate('/admin/menus');
                }
            })
    }

    const imageUpdate = (e) => {
        e.preventDefault();

        const payload = {
            image: imageRef.current.files[0],
        }

        axiosClient.post(`/admin/menus/${id}/imageUpdate`, payload , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(({data}) => {
            setImage(data.image);
        })
        .catch(err => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <>
            <div className='card'>
                <div className="card-header d-flex">
                    <Link className='btn btn-info mr-3' to={'/admin/menus'}>Back</Link>
                    <h3 className="card-title pt-2">{menu.name}</h3>
                </div>
                <div className="card-body">
                    <div className="container-fluid">
                        <div className="row">
                            {loading && <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}
                            {!loading &&
                                <>
                                    <div className="col-lg-4">
                                        <form onSubmit={imageUpdate} action="">
                                        <div className="mb-3">
                                                <img src={`http://localhost:8000/uploads/${image}`} alt={menu.name} />
                                                <div className='input-group'>
                                                <input ref={imageRef} type="file" className='form-control' />
                                                <button className='btn btn-info px-3'>Update</button>
                                                </div>
                                                {errors && errors['image'] && (<p className="text-danger text-sm">{errors['image']}</p>)}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-7">
                                        <form onSubmit={menuEdit}>
                                        
                                            <div className="mb-3">
                                                <label className='form-label'>Name</label>
                                                <input value={menu.name} onChange={(e) => setMenu({ ...menu, name: e.target.value })} type="text" className='form-control' />
                                                {errors && errors['name'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
                                            </div>
                                            <div className="mb-3">
                                                <label className='form-label'>Price</label>
                                                <input value={menu.price} onChange={(e) => setMenu({ ...menu, price: e.target.value })} type="text" className='form-control' />
                                                {errors && errors['price'] && (<p className="text-danger text-sm">{errors['price']}</p>)}
                                            </div>
                                            <div className="mb-3">
                                                <label className='form-label'>Description</label>
                                                <textarea value={menu.description} onChange={(e) => setMenu({ ...menu, description: e.target.value })} type="text" className='form-control'></textarea>
                                                {errors && errors['description'] && (<p className="text-danger text-sm">{errors['description']}</p>)}
                                            </div>
                                            <div className="mb-3">
                                                <label className='form-label'>Status</label>
                                                <select onChange={(e) => setMenu({ ...menu, status: e.target.value })} className='form-control'>
                                                <option value="available" selected={menu.status === 'available'}>Available</option>
                                                    <option value="unavailable" selected={menu.status === 'unavailable'}>Unavailable</option>
                                                </select>
                                            </div>


                                            <div className="mb-4">
                                                <button className='btn btn-info px-4'>Update</button>
                                            </div>
                                        </form>
                                    </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
