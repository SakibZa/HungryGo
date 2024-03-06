import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
 
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    const fetchData = async () => {
        try {
            const response = await fetch(`https://kind-blue-centipede-robe.cyclic.app/orderData/getOrder/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setOrderData(result.order);
            console.log("orderData", orderData);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                {(token) && (orderData && orderData.order_data) ? (
                    orderData.order_data.map((food, index) => (
                        <div key={index} className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <img src={food.img} alt="..." style={{ height: "200px", width: "200px" }} />
                                        <h5 className="card-title">{food.name}</h5>
                                        <p className="card-text">Quantity: {food.qty}</p>
                                        <p className="card-text">Price: {food.price}</p>
                                        <p className='card-text'>Date :{food.orderDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No Orders Yet</h1>
                )}
            </div>
            <Footer />
        </>
    );
}
