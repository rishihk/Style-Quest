import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/show-all-products">Show All Products</Link>
            <Link to="/show-one-product">Get Product By Id</Link>
            <Link to="/add-new-product">Add New Product</Link>
            <Link to="/delete-one-product">Delete Product</Link>
            <Link to="/update-product">Update Product </Link>
            <Link to="/about">About</Link>
        </div>
    );
};

export default Navbar;
