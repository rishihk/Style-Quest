import React, { useState, useEffect } from 'react';
import './UpdateProductById.css';

const UpdateProductById = () => {
    const [editedProduct, setEditedProduct] = useState({});
    const [product, setProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (checked5) {
            getAllProducts();
        }
    }, [checked5]);

    useEffect(() => {
        if (product[index]) {
            setEditedProduct(product[index]);
        }
    }, [product, index]);

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

    function getOneByOneProductNext() {
        if (product.length > 0) {
            if (index === product.length - 1) setIndex(0);
            else setIndex(index + 1);
        }
    }

    function getOneByOneProductPrev() {
        if (product.length > 0) {
            if (index === 0) setIndex(product.length - 1);
            else setIndex(index - 1);
        }
    }

    function handleUpdateProduct(e) {
        e.preventDefault();
        fetch("http://localhost:4000/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Update product completed");
                console.log(data);
                if (data) {
                    const value = Object.values(data);
                    alert(value);
                }
            });
        getAllProducts();
    }

    return (
        <div className="update-product-container">
            <h3>Update Product</h3>
            <div className="update-product-buttons">
                <input type="checkbox" id="acceptput" name="acceptput" checked={checked5} onChange={(e) => setChecked5(!checked5)} />
                <button className="prev-button" onClick={() => getOneByOneProductPrev()}>Prev</button>
                <button className="next-button" onClick={() => getOneByOneProductNext()}>Next</button>
            </div>
            {checked5 && product[index] && (
                <div key={product[index]._id} className="update-product-details">
                    <img src={product[index].image} width={30} className="product-image" />
                    <div className="product-info">
                        <div>Id: {product[index]._id}</div>
                        <div>Title: {product[index].title}</div>
                        <div>Category: {product[index].category}</div>
                        <div>Price: {product[index].price}</div>
                        <div>Rate: {product[index].rating.rate} and Count: {product[index].rating.count}</div>
                    </div>
                    <form onSubmit={handleUpdateProduct} className="update-product-form">
                        {/* <input type="text" className="input-field" name="_id" placeholder="Enter the Products Id" onChange={(e) => setEditedProduct({ ...editedProduct, _id: e.target.value })} /> */}
                        <span>Title</span><input type="text" autocomplete="off" className="input-field" name="title" placeholder="Modify Title" value={editedProduct.title} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} />
                        <span>Price</span><input type="number" autocomplete="off" className="input-field" name="price" placeholder="Modify Price" value={editedProduct.price} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} />
                        <span>Description</span><input type="text" autocomplete="off" className="input-field" name="description" placeholder="Modify Description" value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} />
                        <span>Category</span><input type="text" autocomplete="off" className="input-field" name="category" placeholder="Modify Category" value={editedProduct.category} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} />
                        <span>Image</span><input type="text" className="input-field" name="image" placeholder="Modify Image URL" value={editedProduct.image} onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })} />
                        {/* <input type="number" className="input-field" name="rate" placeholder="Modify Rating" value={editedProduct.rating.rate} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, rate: e.target.value } })} />
                        <input type="number" className="input-field" name="count" placeholder="Modify Count" value={editedProduct.rating.count} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, count: e.target.value } })} /> 
                        */}
                        <span>Rate</span><input type="number" autocomplete="off" className="input-field" name="rate" placeholder="Modify Rating" value={editedProduct.rating?.rate || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, rate: e.target.value } })} />
                        <span>Count</span><input type="number" autocomplete="off" className="input-field" name="count" placeholder="Modify Count" value={editedProduct.rating?.count || ''} onChange={(e) => setEditedProduct({ ...editedProduct, rating: { ...editedProduct.rating, count: e.target.value } })} />

                        <button type="submit" className="update-button">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateProductById;


