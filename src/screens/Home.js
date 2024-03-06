import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useState, useEffect } from "react";
export default function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search , setSearch] = useState('');


  const loadData = async () => {
    const request1 = fetch("https://kind-blue-centipede-robe.cyclic.app/foodItem/getAllItem").then(
      (response) => response.json()
    );
    const request2 = fetch(
      "https://kind-blue-centipede-robe.cyclic.app/foodCategory/getCategory"
    ).then((response) => response.json());
    Promise.all([request1, request2])
      .then(([data1, data2]) => {
        setFoodItem(data1.getItem);
        setFoodCategory(data2.foodcategory);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(foodItem);
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style = {{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id = "carousel">
          <div className="carousel-caption" style = {{zIndex :"10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value = {search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700/?biryani"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?burger"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pastry"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="m-3">
        {foodCategory &&
          foodCategory.map((item) => (
            <div key={item.id} className = "row mb-3">
              <div className="fs-3 m-3">{item.CategoryName}</div>
              <hr />
              {foodItem &&
                foodItem
                  .filter(
                    (itemFood) => ((itemFood.CategoryName === item.CategoryName) && (itemFood.name.toLowerCase().includes(search.toLowerCase())))
                  ) 
                  .map((itemftr) => (
                    <div key={itemftr.id} className = "col-12 col-md-6 col-lg-3">
                      <Card  
                      foodItem = {itemftr}
                      option = {itemftr.option[0]}
        
                      />
                    </div>
                  ))}
            </div>
          ))}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
