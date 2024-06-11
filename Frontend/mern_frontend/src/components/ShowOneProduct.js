
import React, { useState } from 'react';
import './ShowOneProduct.css';

const ShowOneProduct = () => {
    const [oneProduct, setOneProduct] = useState([]);
    const [viewer2, setViewer2] = useState(false);
    const [productId, setProductId] = useState(0);

    function getOneProduct(id) {
        console.log(id);
        setOneProduct([]);
        setViewer2(false);
        if (id >= 1 && id <= 20) {
            fetch("http://localhost:4000/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    if (data) {
                        const dataArr = [];
                        dataArr.push(data);
                        setOneProduct(dataArr);
                        setViewer2(true);
                    } else {
                        console.log("Invalid ID");
                        alert("Invalid ID entered");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                    console.log("Invalid ID entered");
                    alert("Invalid ID entered");
                });
        } else {
            console.log("Invalid ID entered");
            alert("Invalid ID entered");
        }
    }

    const showOneItem = oneProduct.map((el) => (
        <div key={el._id} className="product-info">
            <img src={el.image} />
            <p>Title: {el.title}</p>
            <p>Category: {el.category}</p>
            <p>Price: {el.price}</p>
            <p>Rate: {el.rating.rate} | Count: {el.rating.count}</p>
        </div>
    ));

    return (
        <div className="show-one-product-container">
            <h3>Show one product</h3>
            <input type="number" placeholder="Enter product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
            <button onClick={() => getOneProduct(productId)} >Show Product</button>
            {showOneItem}
        </div>
    );
};

export default ShowOneProduct;

