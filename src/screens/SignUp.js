import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
export default function SignUp() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const addressRef = useRef("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        location: addressRef.current.value,
      }),
    });
    const result = await response.json();
    console.log(result);

    if (!result.success) {
      console.log("invalid creadentials");
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input type="text" className="form-control" ref={nameRef} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={emailRef}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            ref={addressRef}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">
          Already a user
        </Link>
      </form>
    </div>
  );
}
