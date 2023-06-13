import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    //isse page reload nahi hoga
    e.preventDefault();
    const response = await fetch(`${host}/api/Auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success||credentials.cpassword.value===credentials.password.value){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account created successfully","success")
    }
    else {
      props.showAlert("Invalid credentials","danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='containet'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
        </div><div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="current-password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5}  autoComplete="true" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="cpassword" className="form-control"  autoComplete="true" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
        </div>

        <button disabled={credentials.password.length<5 || credentials.cpassword.length<5 } type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
