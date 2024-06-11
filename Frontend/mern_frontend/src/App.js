import React from 'react';
import Navbar from './components/Navbar';
import ShowAllProducts from './components/ShowAllProducts';
import ShowOneProduct from './components/ShowOneProduct';
import AddNewProduct from './components/AddNewProduct';
import DeleteOneProduct from './components/DeleteOneProduct';
import UpdateProductById from './components/UpdateProductById';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<ShowAllProducts />} />
          <Route path="/show-all-products" element={<ShowAllProducts />} />
          <Route path="/show-one-product" element={<ShowOneProduct />} />
          <Route path="/add-new-product" element={<AddNewProduct />} />
          <Route path="/delete-one-product" element={<DeleteOneProduct />} />
          <Route path="/update-product" element={<UpdateProductById />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


