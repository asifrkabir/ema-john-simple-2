// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';

export const UserContext = createContext();

function App() {

  

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/review" element={<Review></Review>}></Route>
        <Route path="/inventory" element={<Inventory></Inventory>}></Route>
        <Route path="/shipment" element={<Shipment></Shipment>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route exact path="/" element={<Shop></Shop>}></Route>
        <Route path="/product/:productKey" element={<ProductDetail></ProductDetail>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
