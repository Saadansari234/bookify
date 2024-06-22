import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const Firebase = useFirebase()
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        console.log("logging in user");
        const result = await Firebase.signupWithEmailAndPassword(email, password);
        console.log("successful", result);
      } catch (error) {
        console.log(error);
      }
    }

  };


  useEffect(() => {
    if (Firebase.isLogedin) {
      //  user is logged in
      navigate("/")
    }
  }, [Firebase, navigate])



  return (
    <div className='container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(text) => setEmail(text.target.value)} value={email} autoComplete='username' />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(text) => setPassword(text.target.value)} value={password} autoComplete='current-password' />
        </Form.Group>
        <Button variant="primary" type="submit"  >
          Create Accout
        </Button>
      </Form>
    </div>
  );
}

export default Register;