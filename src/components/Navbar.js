import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false); // State for controlling navbar collapse
  const navigate = useNavigate();

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            HungryGO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavbarToggle} // Add onClick to toggle navbar collapse
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-2" to="/signup">
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                  My Cart
                  {" "}
                  <Badge pill bg="danger">{data.length > 0 ? data.length : ''}</Badge>
                </div>
                {cartView && <Modal onClose={() => setCartView(false)}><Cart/></Modal>}
                <div className="btn bg-white text-danger mx-2" onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
