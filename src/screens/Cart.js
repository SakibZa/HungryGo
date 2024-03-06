import React, { useEffect } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from '../assests/trash.svg';

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();
    const orderDate = new Date().toLocaleDateString();
    const dataWithDate = data.map(item => ({
        ...item,
        orderDate: orderDate
    }));
    const handleCheckOut = async () => {
        const userEmail = localStorage.getItem('email');
        const response = await fetch('https://kind-blue-centipede-robe.cyclic.app/orderData/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: dataWithDate,
                email: userEmail,
                
            })
        });

        console.log(response);
        if (response.status == 200) {
            dispatch({ type: 'DROP' });
            localStorage.removeItem('cart'); // Clear cart after checkout
        }
    };

    const total = data.reduce((total, food) => total + food.price, 0);
    useEffect(() => {
        console.log("Ya Ali")
        localStorage.setItem('total', JSON.stringify(total));
    }, [data])

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
            </div>
        );
    }

   

    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button type="button" className='btn p-0'>
                                        <img src={trash} alt="delete" onClick={() => dispatch({ type: 'REMOVE', index: index })} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <hr />
                        <h5>Total Price : {total}</h5>
                    </tbody>
                </table>
                <div>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
}
