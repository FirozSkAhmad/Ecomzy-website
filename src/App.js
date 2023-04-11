import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from "./pages/Login"
import Protected from './components/Protected';
import MyProducts from './pages/MyProducts';
import AddProducts from './pages/AddProducts';
import Seller from './pages/Seller';

function App() {
  return (
    <div className="Wrapper">
      <Navbar />
      <Routes>
        <Route path='/' element={<Protected cmp={<Home />} />} />
        <Route path='/cart' element={<Protected cmp={<Cart />} />} />
        <Route path='/login' element={<Protected cmp={<Login />} />} />
        <Route path='/signup' element={<Protected cmp={<SignUp />} />} />
        <Route path='/seller/' element={<Protected cmp={<Seller/>} />} >
          <Route path='myproducts' element={<Protected cmp={<MyProducts />} />} />
          <Route path='addproducts' element={<Protected cmp={<AddProducts />} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
