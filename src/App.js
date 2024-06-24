import { Routes, Route } from 'react-router-dom'
//pages
import SigninPage from './pages/SigninPage'
import Register from './pages/Register'
import ListingPage from './pages/ListingPage'
import MyNavbar from './components/Navbar'
import Home from './pages/Home'
import Details from './pages/Details'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
//css
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div>
      <MyNavbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/book/list' element={<ListingPage />} />
        <Route path='/book/view/:bookId' element={<Details />} />
        <Route path='/book/view/order' element={<Orders />} />
        <Route path='/book/orders/:bookId' element={<OrderDetails />} />
      </Routes>
    </div>
  )
}

export default App
