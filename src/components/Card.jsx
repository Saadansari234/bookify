import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
function BooksCard(props) {
  const firebase = useFirebase()
  const [url, setURL] = useState(null)
  const navigate= useNavigate()

  useEffect(() => {
    firebase.getImageURL(props.imageURL)
      .then((url) => setURL(url))
  }, [firebase,props.imageURL])

  return (
    <Card style={{ width: '18rem', marginBottom: "2rem" }}>
        <Card.Img variant="top" src={url} style={{  width:"100%" , height:"10rem" }} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          this books has title {props.name} and this book is sold by {props.displayName} and this book cost is Rs{props.price}
        </Card.Text>
        <Button variant="primary" onClick={(e)=> navigate(props.link1)} >View</Button>
        <Button variant="danger" onClick={(e)=> navigate(props.link2)} >View order</Button>
        
      </Card.Body>
    </Card>
  );
}

export default BooksCard;