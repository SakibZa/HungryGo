import React from 'react'
import { useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
export default function Card({foodItem, option,}) {

  let priceOptions = Object.keys(option);
  const [qty , setQty] = useState(1);
  const [size , setSize] = useState(priceOptions[0]);
  let dispatch = useDispatchCart();
  let data = useCart();
  let finalPrice = qty*parseInt(option[size]);
  
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        alert(`Added ${foodItem.name} ${qty} Quantity to Cart`);
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img })
        alert(`Added ${foodItem.name} ${qty} Quantity to Cart`);
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    alert(`Added ${foodItem.name}  ${qty} Quantity to Cart`);

  }


  console.log("data", data)

  
  return (
    <div> <div>
    <div
      className="card mt-3"
      style={{ width: "18rem"}}
    >
      <img src={foodItem.img} className="card-img-top" alt="..." width={"286px"} height={"180px"} />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100  bg-success" onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100  bg-success rounded" onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.filter((item) => item !== "_id").map((item)=> (
                <option key = {item} value = {item}>{item}</option>
              ))}
          </select>
          <div className="d-inline h-100 fs-5">
            Price:{finalPrice}
            </div>
          <hr/>
          <button className={`btn btn-success justify-content-center ms-2`} onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
       
    </div>
  </div></div>
  )
}
