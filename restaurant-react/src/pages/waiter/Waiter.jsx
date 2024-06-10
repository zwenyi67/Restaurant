import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useOrderContext } from '../../contexts/OrderProvider';
import tablesImage from '../../assets/image/chair.png';
import { Link } from 'react-router-dom';

export default function Waiter() {

  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [tables, setTables] = useState([]);
  const searchRef = useRef();

  const { order, setOrder } = useOrderContext();


  useEffect(() => {
    getTables();
  }, [])

  const getMenus = () => {
    setLoading(true);
    axiosClient.get('/waiter/menus')
      .then(({ data }) => {
        setMenus(data.menus);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 404) {
          console.log('404 error')
        }
        if (err.response.status === 402) {
          console.log('402 error')
        }
      })
  }

  const getTables = () => {
    setLoading(true);
    axiosClient.get('/waiter/tables')
      .then(({ data }) => {
        setTables(data.tables);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 404) {
          console.log('404 error')
        }
        if (err.response.status === 402) {
          console.log('402 error')
        }
      })
  }

  



  return (
    <div className='container mt-5'>
      <div className="row mt-5 d-flex justify-content-center">
        {
          loading ? (
            <div className="container mt-5 d-flex justify-content-center">
              <div style={{ fontSize: '1000px', }} className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )

            : (
              <>
                {/* {menus.length > 0 ? 
            menus.map((m) => (
              <div key={m.id} className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
                <div  className="menu-item-box">
                  <div className='menu-img-box d-flex justify-content-center'>
                  <img src={`http://localhost:8000/uploads/${m.image}`} alt={m.name} className="menu-img-lg" />
                  </div>
                  <div className="card-body">
                    <div className='menu-name'>{m.name}</div>
                    <div className='text-center'>Lorem, ipsum dolor elit. Impedit, tenetur voluptate officiis cupiditate natus molestias!</div>
                    <div className='d-flex justify-content-between'>
                      <div className='pt-4' style={{ color: 'goldenrod', fontWeight: '600', fontSize: '22px' }}>${m.price}</div>
                    <button onClick={() => addToOrder(m)}  className="mt-3 menu-add"><i className='fa-solid fa-circle-plus fa-fw'></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : <div className='text-center'>No Data Found</div>
          } */}

                {tables.length > 0 ?
                  tables.map((m) => (
                    <div key={m.id} className="d-flex justify-content-center col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
                      <div className={`table-container`}>
                        <Link disabled to={`/waiter/tables/${m.id}/order`} className={`table-image-box ${m.status === 'outofservice' ? 'bg-blur' : ''}`}>
                          <img src={tablesImage} className='table-image' alt={m.number} />
                          <div className='table-number'>{m.number}</div>
                          <div className={`table-status ${m.status === 'outofservice' ? 'bg-red' :
                              m.status === 'occupied' ? 'bg-orange' :
                                'bg-green'
                            }`}>
                            {m.status}
                          </div>
                          <div className='table-capacity'>{m.capacity} person</div>
                        </Link>
                      </div>
                    </div>
                  ))
                  : <div className='text-center'>No Data Found</div>
                }

              </>
            )}
      </div>
    </div>
  )
}
