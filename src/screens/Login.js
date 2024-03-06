import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useRef } from 'react';

export default function Login() {

  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (event) =>{

     event.preventDefault();
     const response = await fetch('http://localhost:8000/user/loginUser',{

        method :'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
     })
     const result = await response.json();
     if(!result.success){
      console.log("Invalid User");
     }
     if(result.success){
      console.log("result" , result.user.email);
      localStorage.setItem('email' , result.user.email)
      localStorage.setItem("token", result.token);
      navigate('/');
     }
  }
  return (
    <div className ="container">

<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref = {emailRef} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  ref = {passwordRef}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
   <Link to="/signup" className="m-3 btn btn-danger">New User</Link>
</form>

    </div>
  )
}
