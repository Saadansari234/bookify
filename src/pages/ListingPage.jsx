import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';



const ListingPage = () => {

    const [name, setName] = useState("")
    const [isbnNumber, setIsbnNumber] = useState("")
    const [price, setPrice] = useState("")
    const [coverPic, setCoverPic] = useState("")
    const [isLoading, setIsLoading]= useState(false)

    const firebase=useFirebase()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true); // Set loading to true
        const result= await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic)
        alert("book has been added successfully")
        setIsLoading(false); // Set loading to false
        console.log(result)

    }

    if(isLoading) return <h1>Loading...</h1>

    return (

        <div className='container'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Book Name" onChange={(text) => setName(text.target.value)} value={name} autoComplete='username' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicIsbn">
                    <Form.Label>Enter ISBN Number</Form.Label>
                    <Form.Control type="text" placeholder="Book ISBN" onChange={(text) => setIsbnNumber(text.target.value)} value={isbnNumber} autoComplete='username' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Enter Price</Form.Label>
                    <Form.Control type="text" placeholder="Book Price" onChange={(text) => setPrice(text.target.value)} value={price} autoComplete='username' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCover">
                    <Form.Label>Enter CoverPic</Form.Label>
                    <Form.Control type="file"  onChange={(text) => setCoverPic(text.target.files[0])}   />
                </Form.Group>



                <Button variant="primary" type="submit"  >
                    Add Book
                </Button>
            </Form>
        </div>
    )
}

export default ListingPage