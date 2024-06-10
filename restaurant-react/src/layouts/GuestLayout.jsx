import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayout() {
    const {token, user, role} = useStateContext();

    if(token && role === 'admin') {
      return <Navigate to={'/admin'} />
  }
    if(token && role === 'waiter') {
        return <Navigate to={'/waiter'} />
    }

  return (
    <div>
        Guest Layout
        <Outlet/>
    </div>
  )
}
