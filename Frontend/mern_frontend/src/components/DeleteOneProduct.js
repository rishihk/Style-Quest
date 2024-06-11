import React, { useState, useEffect } from 'react';
import './DeleteOneProduct.css';

const DeleteOneProduct = ({ getAllProducts }) => {
    const [deleteId, setDeleteId] = useState("");
    const [product, setProduct] = useState([]);
    const [checked4, setChecked4] = useState(false);
    const [index, setIndex] = useState(0);
    const [viewer1, setViewer1] = useState(false);

    useEffect(() => {
        if (checked4) {
            getAllProducts();
        }
    }, [checked4, getAllProducts]);

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

    function deleteOneProduct(deleteid) {
        console.log("Product to delete :", deleteid);
        fetch("http://localhost:4000/delete/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: deleteid }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Delete a product completed : ", deleteid);
                console.log(data);
                if (data) {
                    const value = Object.values(data);
                    alert(value);
                    setChecked4(true);
                }
            });
    }

    // return (
    //     <div className="delete-one-product-container">
    //         <h3>Delete one product:</h3>
    //         <div className="delete-one-product-checkbox">
    //             <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4} onChange={(e) => setChecked4(!checked4)} /></div>
    //         <button onClick={() => getOneByOneProductPrev()}>Prev</button>
    //         <button onClick={() => getOneByOneProductNext()}>Next</button>
    //         <button onClick={() => deleteOneProduct(product[index]?._id)}>Delete</button>

    //         {checked4 && product[index] && (
    //             <div className="product-details" key={product[index]._id}>
    //                 <img src={product[index].image} alt={product[index].title} width={150} /> <br />
    //                 <label>Id:</label>
    //                 {product[index]._id} <br />
    //                 <label>Title:</label>
    //                 {product[index].title} <br />
    //                 <label>Category:</label>
    //                 {product[index].category} <br />
    //                 <label>Price:</label>
    //                 {product[index].price} <br />
    //                 <label>Rate:</label>
    //                 {product[index].rating.rate} <br />
    //                 <label>Count:</label>
    //                 {product[index].rating.count} <br />
    //             </div>
    //         )}
    //         <hr></hr>
    //     </div>
    // );
    return (
        <div className="delete-one-product-container">
            <h3>Delete one product:</h3>
            <div className="delete-one-product-checkbox">
                <input
                    type="checkbox"
                    id="acceptdelete"
                    name="acceptdelete"
                    checked={checked4}
                    onChange={(e) => setChecked4(!checked4)}
                />
            </div>
            <div className="delete-one-product-buttons">
                <button onClick={() => getOneByOneProductPrev()}>Prev</button>
                <button onClick={() => getOneByOneProductNext()}>Next</button>
                <button onClick={() => deleteOneProduct(product[index]?._id)}>Delete</button>
            </div>
            {checked4 && product[index] && (
                <div className="product-details" key={product[index]._id}>
                    <img src={product[index].image} alt={product[index].title} width={150} />
                    <label>Id: {product[index]._id}</label>

                    <label>Title: {product[index].title}</label>

                    <label>Category: {product[index].category}</label>

                    <label>Price: {product[index].price}</label>

                    <label>Rate: {product[index].rating.rate}</label>

                    <label>Count: {product[index].rating.count}</label>

                </div>
            )}
            <hr></hr>
        </div>
    );

};

export default DeleteOneProduct;

