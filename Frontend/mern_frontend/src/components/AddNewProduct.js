import React, { useState } from 'react';
import './AddNewProduct.css';

const AddNewProduct = ({ getAllProducts }) => {
    const [addNewProduct, setAddNewProduct] = useState({
        _id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 },
    });
    const [viewer1, setViewer1] = useState(false);
    const [product, setProduct] = useState([]);

    function handleChange(evt) {
        const value = evt.target.value;
        if (evt.target.name === "_id") {
            setAddNewProduct({ ...addNewProduct, _id: value });
        } else if (evt.target.name === "title") {
            setAddNewProduct({ ...addNewProduct, title: value });
        } else if (evt.target.name === "price") {
            setAddNewProduct({ ...addNewProduct, price: value });
        } else if (evt.target.name === "description") {
            setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "category") {
            setAddNewProduct({ ...addNewProduct, category: value });
        } else if (evt.target.name === "image") {
            setAddNewProduct({ ...addNewProduct, image: value });
        } else if (evt.target.name === "rate") {
            setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
        } else if (evt.target.name === "count") {
            const temp = addNewProduct.rating.rate;
            setAddNewProduct({
                ...addNewProduct,
                rating: { rate: temp, count: value },
            });
        }
    }

    function getAllProducts() {
        fetch("http://localhost:4000/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products :");
                console.log(data);
                setProduct(data);
            });
        setViewer1(!viewer1);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch("http://localhost:4000/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addNewProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Post a new product completed");
                console.log(data);
                if (data) {
                    const value = Object.values(data);
                    alert(value);
                }
            });
        getAllProducts();
    }

    return (
        <div className="add-new-product-container">
            <h3>Add a New Product:</h3>
            <form className="add-new-product-form" onSubmit={handleOnSubmit}>
                <input type="text" autoComplete="off" name="_id" placeholder="Enter Id" onChange={handleChange} />
                <input type="text" autoComplete="off" name="title" placeholder="Enter Title" onChange={handleChange} />
                <input type="number" autoComplete="off" name="price" placeholder="Enter Price" onChange={handleChange} />
                <input type="text" autoComplete="off" name="description" placeholder="Enter Description" onChange={handleChange} />
                <input type="text" autoComplete="off" name="category" placeholder="Enter Category" onChange={handleChange} />
                <input type="text" name="image" value={addNewProduct.image} placeholder="Enter Image URL" onChange={handleChange} />
                <input type="number" autoComplete="off" name="rate" placeholder="Enter Rating" onChange={handleChange} />
                <input type="number" autoComplete="off" name="count" placeholder="Enter Count" onChange={handleChange} />
                <button type="submit">Add +</button>
            </form>
            <hr />
        </div>
    );
};
export default AddNewProduct;

