import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useFirebase } from '../context/Firebase'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';


const Details = () => {
    const params = useParams()
    const [data, setData] = useState()
    const [url, setURL] = useState()
    const [qty, setQty] = useState(1)
    const firebase = useFirebase()
    const [isLoading, setIsLoading]= useState(false)
    // console.warn(params);
    // console.log(data)
    useEffect(() => {
        firebase.getBookById(params.bookId).then(value => setData(value.data()))
    }, [firebase,params.bookId])

    useEffect(() => {
        if (data) {
            const imgURL = data.imageURL
            firebase.getImageURL(imgURL).then(URL => setURL(URL))
        }
    }, [data,firebase])


    const placeorder= async()=>{
        setIsLoading(true)
        const result= await firebase.placeOrder(params.bookId, qty)
        setIsLoading(false)
        alert("your order has been placed")
        console.log(result)
    }

    if (data == null || isLoading) return <h1>Loading...</h1>

    return (
        <div className='container mt-5 '>
            <h1>{data.name}</h1>
            <img src={url} alt="title theme" width={400} height={200} /> <br />
            <h1>Details</h1>
            <h4>Price: RS.{data.price}</h4>
            <h1>Owner Deails</h1>
            <img src={data.photoURL} alt="account theme" width={50} />
            <p>Name: {data.displayName}</p>
            <p>Email Id: {data.userEmail}</p>
            <p>ISBN: {data.isbn}</p>
            <Form.Group className="mb-3" controlId="formBasicQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="Number" placeholder="Enter Quantity" onChange={(text) => setQty(text.target.value)} value={qty}  />
            </Form.Group>


            <Button variant='success' onClick={placeorder}>Buy Now</Button>
        </div>
    )
}

export default Details