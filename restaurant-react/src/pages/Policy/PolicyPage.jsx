import React from 'react'
import { Link } from 'react-router-dom'

export default function PolicyPage() {
  return (
    <div>
        Policy

        <Link className='btn btn-info' to={'/login'}>Login</Link>
    </div>
  )
}
