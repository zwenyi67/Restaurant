import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function WaiterMenus() {

    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState([]);

  useEffect(() => {
    getMenus();
  },[])

  const getMenus = () => {
    setLoading(true);
    axiosClient.get('/waiter/menus')
        .then(({data})=> {
            setLoading(false);
          setMenus(data.menus);
        })
        .catch(err => {
          if(err.response.status === 404) {
            console.log('404 error')
          }
          if(err.response.status === 402) {
            console.log('402 error')
          }
        })
  }

  return (
    <div>
        <div className="row"></div>
      {!loading && (
                            <>
                                {menus.length > 0 ? (
                                    menus.map((m) => (
                                        <p>{m.name}</p>
                                    ))
                                ) : (
                                        <p colSpan={6} className='text-center'>No Data</p>
                                )}
                            </>
                        )}
    </div>
  )
}
