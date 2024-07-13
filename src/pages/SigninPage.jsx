import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const Firebase = useFirebase()
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        console.log("logging in user");
        const result = await Firebase.signInUserWithEmailAndPassword(email, password);
        console.log("successful", result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(()=>{
     if (Firebase.isLogedin) {
      //  user is logged in
      navigate("/")
     }
  },[Firebase,navigate])


  return (
    <div className='container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete='username' />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete='current-password' />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Sign In
        </Button>
      </Form>
  
      <h1 className='mt-3 mb-3'>OR</h1>

      <Button variant='danger'
      onClick={Firebase.signInWithGoogle}
      >Sign In With Google</Button>
      <p onClick={()=> navigate("/register")} style={{color:"blue", marginTop:"20px", cursor:"pointer"}}>Sign Up. if you are new</p>
    </div>
  );
}

export default SigninPage;
