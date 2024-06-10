import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../axiosClient';

export default function Menus() {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  let count = 1;

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    setLoading(true);
    axiosClient.get('/admin/menus')
      .then(({ data }) => {
        setMenus(data.menus);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err); 
      });
  };

  const deleteButton = (menu, event) => {
    event.preventDefault(); 
    if (!window.confirm('Are you sure you want to delete this menu?')) {
      return;
    }
    axiosClient.delete(`/admin/menus/${menu.id}/delete`)
      .then(() => {
        setMenus(prevMenus => prevMenus.filter(m => m.id !== menu.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="card">
      <div className="card-header d-flex">
        <h3 className="card-title mr-auto pt-2">Menu Table</h3>
        <Link className='btn btn-info' to={'/admin/menus/create'}>Add New Menu</Link>
      </div>

      <div className="card-body">
        <table id="example2" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
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
                {menus.length > 0 ? (
                  menus.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td><img className='menu-img' src={`http://localhost:8000/uploads/${s.image}`} alt={s.name} /></td>
                      <td>{s.price}</td>
                      <td>{s.status}</td>
                      <td width={500}>{s.description}</td>
                      <td className='d-flex'>
                        <div className='border-none'>
                          <Link to={`/admin/menus/${s.id}/edit`} className='btn btn-success mt-2 px-4 mr-4'>Edit</Link>
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
  );
}
