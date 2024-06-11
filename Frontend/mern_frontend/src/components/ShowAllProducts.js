import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShowAllProducts.css';

const ShowAllProducts = () => {
    const [product, setProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    function getAllProducts() {
        fetch('http://localhost:4000/')
            .then((response) => response.json())
            .then((data) => {
                console.log('Show Catalog of Products :');
                console.log(data);
                setProduct(data);
            });
        setViewer1(!viewer1);
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    const filteredProducts = product.filter((el) =>
        el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showAllItems = (searchTerm ? filteredProducts : product).map((el) => {
        const stars = [];
        for (let i = 1; i <= el.rating.rate; i++) {
            stars.push(<span key={i} className="active"></span>);
        }

        return (
            <div key={el._id} className="col-md-3 col-sm-6 mb-4">
                <div className="card h-100">
                    <img src={el.image} className="card-img-top" alt={el.title} />
                    <div className="card-body">
                        <h5 className="card-title">{el.title}</h5>
                        <p className="card-text">Category: {el.category}</p>
                        <p className="card-text">Price: 💲{el.price}</p>
                        <div className="rating-stars">
                            {stars}
                            <span>({el.rating.count})</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="show-all-products-container">
            <h3>Show All Available Products</h3>
            <input
                type="text"
                placeholder="Search for a product..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setViewer1(!viewer1)}>
                {viewer1 ? 'Hide All Products' : 'Show All Products'}
            </button>
            <hr />
            {viewer1 && (
                <div className="container">
                    <div className="row">{showAllItems}</div>
                </div>
            )}
            <hr />
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">© HKalem's Fashion. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );

};

export default ShowAllProducts;





