import React, { useEffect, useRef, useState } from 'react'
import { useOrderContext } from '../../contexts/OrderProvider'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

export default function Order() {
  //const { order, setOrder } = useOrderContext();
  const {user} = useStateContext();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState();
  const [menus, setMenus] = useState([]);
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState();
  const searchRef = useRef();
  const typeRef = useRef();
  const navigate = useNavigate();
  const {id} = useParams();


  var total = 0;
  var qty = 0;

  useEffect(() => {
    getMenus();
  }, [])

  const getMenus = () => {
    setLoading(true);
    axiosClient.get('/waiter/menus')
      .then(({ data }) => {
        setMenus(data.menus);
        setTypes(data.types);
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

  const removeOrder = (selectedMenu) => {
    const existingMenuIndex = order.findIndex(menu => menu.id === selectedMenu.id);
    if (existingMenuIndex !== -1) {
      const updatedMenu = order.filter(menu => menu.id !== selectedMenu.id);
      setOrder(updatedMenu);
    }
  }

  const decreaseQty = (selectedMenu) => {
    const existingMenuIndex = order.findIndex(menu => menu.id === selectedMenu.id);
    if (existingMenuIndex !== -1) {
      const updatedOrder = [...order];
      if (updatedOrder[existingMenuIndex].qty > 1) {
        updatedOrder[existingMenuIndex] = {
          ...updatedOrder[existingMenuIndex],
          qty: updatedOrder[existingMenuIndex].qty - 1
        };
        setOrder(updatedOrder);
      }
    }
  }

  const increaseQty = (selectedMenu) => {
    const existingMenuIndex = order.findIndex(menu => menu.id === selectedMenu.id);
    if (existingMenuIndex !== -1) {
      const updatedOrder = [...order];
      if (updatedOrder[existingMenuIndex].qty < 20) {
        updatedOrder[existingMenuIndex] = {
          ...updatedOrder[existingMenuIndex],
          qty: updatedOrder[existingMenuIndex].qty + 1
        };
        setOrder(updatedOrder);
      }
    }
  }

  const SearchForm = (e) => {
    e.preventDefault();
    setLoading(true)
    axiosClient.get(`/waiter/menus?search=${searchRef.current.value}&type=${typeRef.current.value}`)
      .then(({ data }) => {
        setLoading(false);
        setMenus(data.menus);
      })
      .catch(err => {
        setLoading(false);
      })
  }

  const addToOrder = (selectedMenu) => {
    const existingMenuIndex = order.findIndex(menu => menu.id === selectedMenu.id);
    if (existingMenuIndex === -1) {
      const updatedMenu = {
        ...selectedMenu,
        qty: 1,
      };
      setOrder([...order, updatedMenu]);
    } else {
      const updatedOrder = [...order];
      updatedOrder[existingMenuIndex] = {
        ...updatedOrder[existingMenuIndex],
        qty: updatedOrder[existingMenuIndex].qty + 1
      };
      setOrder(updatedOrder);
    }
  };

  const ConfirmOrder = (e) => {
    e.preventDefault();
    const formData = {
      order: order,
      waiter_id: user.id
    }
    axiosClient.post(`/waiter/tables/${id}/order/confirm`, formData)
    .then(({data}) => {
      setMessage(data.message)
      navigate('/waiter');
    })
  }



  return (
    <div style={{ padding: '3px 20px' }} className="container-fluid mt-5">
      <div className="row ">
        <div className="col-lg-7 left-menu">
          <div className="row mb-3">
            <form onSubmit={SearchForm} className="search-form">
              <div className='search-form-box'>
                <select className='select-type' ref={typeRef}>
                  <option value="">All Menu</option>
                  {types && (types.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    )))}
                </select>
                <input placeholder='Search By Name' type="text" ref={searchRef} className='search-input' />
              </div>
              <button className='menu-search'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>
          {
            loading ? (
              <div className="container mt-5 d-flex justify-content-center">
                <div style={{ fontSize: '1000px', }} className="spinner-grow text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )
              : (
                <div className='row'>
                  {menus.length > 0 ?
                    menus.map((m) => (
                      <div key={m.id} className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
                        <div className="menu-item-box">
                          <div className='menu-img-box d-flex justify-content-center'>
                            <img src={`http://localhost:8000/uploads/${m.image}`} alt={m.name} className="menu-img-lg" />
                          </div>
                          <div className="card-body">
                            <div className='menu-name'>{m.name}</div>
                            <div className='d-flex justify-content-between'>
                              <div className='pt-2' style={{ color: 'goldenrod', fontWeight: '600', fontSize: '22px' }}>${m.price}</div>
                              <button onClick={() => addToOrder(m)} className="menu-add"><i className='fa-solid fa-circle-plus fa-fw'></i></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    : <div className='text-center'>No Data Found</div>
                  }
                </div>
              )}
        </div>
       
        <div className="col-lg-5 right-order">
          <table className="table">
            <thead>
              <tr>
                <th className='py-2' scope="col"><div className='d-flex justify-content-center'></div></th>
                <th className='py-2' scope="col"><div className='d-flex justify-content-center'>Menu</div></th>
                <th className='py-2' scope="col"><div className='d-flex justify-content-center'>Price</div></th>
                <th className='py-2' scope='col'><div className='d-flex justify-content-center'>Quantity</div></th>
                <th className='py-2' scope='col'><div className='d-flex justify-content-center'>Total</div></th>
              </tr>
            </thead>
            <tbody>
              {order.length > 0 ? (
                order.map(d => {
                  return (
                    <tr key={d.id}>
                      <td className='py-2'>
                        <div className='d-flex justify-content-center align-items-center pt-4'>
                          <button onClick={() => removeOrder(d)} className='fs-5 remove-cart'>
                            <i style={{ fontSize: '25px' }} className="fa-regular fa-circle-xmark" ></i>
                          </button>
                        </div>
                      </td>
                      <td className='py-2'>
                        <div className='d-flex align-items-center pt-4 justify-content-center'>
                          {d.name}
                        </div>
                      </td>
                      <td className='py-2'>
                        <div className='d-flex align-items-center pt-4 justify-content-center'>
                          ${d.price}
                        </div>
                      </td>
                      <td className='py-2'>
                        <div className='d-flex align-items-center pt-4 justify-content-center'>
                          <button onClick={() => decreaseQty(d)} style={{ borderTopLeftRadius: '3px', borderBottomLeftRadius: '3px' }} className='cart-qty-btn px-2 py-1'><i className="fa-solid fa-minus"></i></button>
                          <div className='qty-box px-3 py-1'>{d.qty}</div>
                          <button onClick={() => increaseQty(d)} style={{ borderTopRightRadius: '3px', borderBottomRightRadius: '3px' }} className='cart-qty-btn px-2 py-1'><i className="fa-solid fa-plus"></i></button>

                        </div>
                      </td>
                      <td className='py-2'>
                        <div className='d-flex align-items-center pt-4 justify-content-center'>
                          ${(d.qty * d.price).toFixed(2)}
                          <p className='d-none'>{qty += d.qty} {total += d.qty * d.price} </p>
                        </div>
                      </td>
                    </tr>
                  )
                })

              ) :
                <tr><td colSpan={5} className='text-center'>No Order</td></tr>
              }

              {order.length > 0 && (
                <>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><div className="text-center">{qty}</div></td>
                  <td><div className="text-center">{total.toFixed(2)}</div></td>
                </tr>
                <tr>
                  
                  <td colSpan={5}>
                    <form onSubmit={ConfirmOrder}>
                    <button className='order-confirm-btn'>
                      Confirm the order
                    </button>
                    </form>
                  </td>
                </tr>
                </>
              )}


            </tbody>
          </table>


        </div>

      </div>
    </div>
  )
}
