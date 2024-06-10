import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../../axiosClient';


export default function Suppliers() {

  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  let count = 1;

  useEffect(() => {
    getSuppliers();
  }, [])

  const getSuppliers = () => {
    setLoading(true);
    axiosClient.get('/admin/suppliers')
      .then(({ data }) => {
        setLoading(false);
        setSuppliers(data.suppliers);
      });
  }

  return (
    <div className="card">
      <div className="card-header d-flex">
        <h3 className="card-title mr-auto pt-2" >Suppliers Table</h3>
        <Link className='btn btn-info' to={'/admin/suppliers/create'}>Add New Supplier</Link>
      </div>

      <div className="card-body">
        <table id="example2" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Description</th>
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
                {suppliers.length > 0 ? (
                  suppliers.map((s) => (
                    <tr key={s.id}>
                      <td>{count++}</td>
                      <td>{s.name}</td>
                      <td>
                        <div>Email : {s.email},</div>
                        <div>Phone : {s.phone}</div>
                        <div>Location : {s.location}</div>
                      </td>
                      
                      <td>{s.type}</td>
                      <td>{s.description}</td>
                      <td className='d-flex'>
                        <div className='border-none'>
                        <Link to={`/admin/suppliers/${s.id}/edit`} className='btn btn-success px-4 mr-4'>Edit</Link>
                        <button className='btn btn-danger px-3' onClick={() => deleteButton(s)}>Delete</button>
                        </div>
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
