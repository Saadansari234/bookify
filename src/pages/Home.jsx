import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BooksCard from '../components/Card'

const Home = () => {
    const [books, setBooks] = useState([])
    const firebase = useFirebase()
    useEffect(() => {
        firebase.listAllData()
            .then((allBooks) => setBooks(allBooks.docs))
    }, [firebase])
    return (
        <div className='container'>
            <div className='row'>

                {
                    books.map((book) => {
                        return (
                            <div key={book.id} className='col-lg-4 col-md-6 col-sm-12 mt-5' >
                                <BooksCard link1={`/book/view/${book.id}`} link2={`/book/orders/${book.id}`}  id={book.id}   {...book.data()} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Home