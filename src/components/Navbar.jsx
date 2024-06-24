import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const firebase= useFirebase()
  const navigate=useNavigate()
  const islogein= firebase.isLogedin
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> navigate("/")}>Home</Nav.Link>
            <Nav.Link  onClick={()=> navigate("/book/list")}>Add List</Nav.Link>
            <Nav.Link onClick={()=> navigate("/book/view/order")}>orders</Nav.Link>
            {
              islogein ? null : <Nav.Link  onClick={()=> navigate("/signin")}>login</Nav.Link>
            }
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar

