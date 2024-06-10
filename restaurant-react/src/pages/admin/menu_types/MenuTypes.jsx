import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../../axiosClient';

export default function MenuTypes() {

    const [loading, setLoading] = useState();
    const [types, setTypes] = useState([]);

    useEffect(()=> {
        getTypes();
    }, [])

    const getTypes = () => {
        setLoading(true);
        axiosClient.get('/admin/menu_types')
        .then(({ data }) => {
            setTypes(data.types);
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
            console.error(err); 
          });
      };
    
  return (
    <div className="card">
      <div className="card-header d-flex">
        <h3 className="card-title mr-auto pt-2">Menu Type Table</h3>
        <Link className='btn btn-info' to={'/admin/menu_types/create'}>Add New Type </Link>
      </div>

      <div className="card-body">
        <table id="example2" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Status</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className='text-center'>Loading...</td>
              </tr>
            )}
            {!loading && (
              <>
                {types.length > 0 ? (
                  types.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.status}</td>
                      <td width={500}>{s.description}</td>
                      <td className='d-flex'>
                        <div className='border-none'>
                          <Link to={`/admin/menu_types/${s.id}/edit`} className='btn btn-success mt-2 px-4 mr-4'>Edit</Link>
                          <button
                            type="button"
                            className='btn btn-danger px-3 mt-2'
                            onClick={(event) => deleteButton(s, event)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='text-center'>No Data</td>
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
