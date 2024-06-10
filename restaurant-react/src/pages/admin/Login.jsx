import React, { useRef, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/ContextProvider';


export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {setUser,setToken, setRole} = useStateContext();
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState('');

  

  const LoginSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login', payload)
    .then(({data}) => {
      setUser(data.user);
      setToken(data.token);
      setRole(data.role);
      setErrors('');
    })
    .catch(err => {
      if (err.response) {
        if (err.response.status === 422) {
          console.log(err.response.data.errors);
          setErrors(err.response.data.errors);
        } else if(err.response.status === 401) {
          console.log(err.response.data.message);
          setErrors('');
          setMessage(err.response.data.message);
        } else {
          console.error('Server error:', err.response.status);
        }
      } else {
        console.error('Network error:', err.message);
      }
    });
  }

  return (
    <div >
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '870px' }}>
          <div className="card p-5 shadow">
            <br />
            <h1>Please Login To Your Account</h1>
            <hr />
            <form onSubmit={LoginSubmit} className="">
              <div className="mb-3">
                <label className='form-label'>Email</label>
                <input ref={emailRef} type="email" className='form-control' />
                {errors && errors['email'] && (<p className="text-danger text-sm">{errors['email']}</p>)}
                {message && (<p className="text-danger text-sm">{message}</p>)}
              </div>
              <div className="mb-4">
                <label className='form-label'>Password</label>
                <input ref={passwordRef} type="password" className='form-control' />
                {errors && errors['password'] && (<p className="text-danger text-sm">{errors['password']}</p>)}
              </div>
              <div className='mb-3'>
                <button type='submit' className='btn btn-info px-4'>Login</button>
              </div>
            </form>
            <br />
          </div>
        </div>
    </div>
  )
}
