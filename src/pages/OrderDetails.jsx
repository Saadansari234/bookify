import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
    const [orders,setOrders]=useState([])
    const params= useParams()
    const firebase=useFirebase()

    useEffect(()=>{
       firebase.getOrders(params.bookId).then(orders=>setOrders(orders.docs))
    },[])
  return (
    <div className='container'>
        <h1>orders</h1>
        {
            orders.map((order)=>{
                const data= order.data()
                // console.log(data)
                return(
                 <div key={order.id} className='mt-5' style={{border:"1px solid" , padding:"10px"}}>
                    <h5>ordered by {data.displayName}</h5>
                    <h6>Qty: {data.Qty}</h6>
                    <p>Email: {data.userEmail}</p>
                 </div>
                )
            })
        }

    </div>
  )
}

export default OrderDetails