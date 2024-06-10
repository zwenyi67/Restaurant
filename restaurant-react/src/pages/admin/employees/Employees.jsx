import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../../axiosClient';

export default function Employees() {

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    let count = 1;

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = () => {
        setLoading(true);
        axiosClient.get('/admin/employees')
            .then(({ data }) => {
                setLoading(false);
                setEmployees(data.employees);
            })
    }

    return (
        <div className="card">
            <div className="card-header d-flex">
                <h3 className="card-title mr-auto pt-2" >Employees Table</h3>
                <Link className='btn btn-info' to={'/admin/employees/add'}>Add New Employees</Link>
            </div>

            <div className="card-body">
                <table id="example2" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading &&
                            <tr>
                                <td colSpan={6} className='text-center'> Loading ...</td>
                            </tr>
                        }

                        {!loading && (
                            <>
                                {employees.length > 0 ? (
                                    employees.map((e) => (
                                        <tr key={e.id}>
                                            <td>{count++}</td>
                                            <td>{e.email}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:8000/uploads/${e.image}`} alt={e.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                                {e.name}
                                            </td>
                                            <td>{e.price}</td>
                                            <td>{e.stock}</td>
                                            <td className='d-flex' style={{}}>
                                                <Link to={`/products/${e.id}/edit`} className='btn btn-success px-4 mr-4'>Edit</Link>
                                                <button className='btn btn-danger px-3' onClick={() => deleteButton(e)}>Delete</button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className='text-center'>No Data</td>
                                    </tr>
                                )}
                            </>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
