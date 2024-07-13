import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BooksCard from '../components/Card'

const Orders = () => {
  const [books, setBooks] = useState([])
  const firebase = useFirebase()
  
  useEffect(() => {
    if (firebase.isLogedin) {
      firebase.fetchMyOrders(firebase.user.uid)?.then((books) => setBooks(books.docs))  
    }
    
  }, [firebase])

  if (!firebase.isLogedin) return <h1>please login</h1> 

  // console.log(books)
  return (
    <div className='container'>
      <div className='row'>
        
      {
        books.map((book)=>{
        return  (
          <div className='col-lg-4 col-md-6 col-sm-12 mt-5' key={book.id}>
            <BooksCard   id={book.id} link1={`/book/orders/${book.id}`} {...book.data()}/>
          </div>
        )
        })
      }
      </div>
    </div>
  )
}

export default Orders