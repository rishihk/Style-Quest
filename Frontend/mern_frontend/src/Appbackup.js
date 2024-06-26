import { useState, useEffect } from "react";
function App() {
    const [product, setProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);

    const [oneProduct, setOneProduct] = useState([]);
    const [viewer2, setViewer2] = useState(false);

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

    const showAllItems = product.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={30} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate :{el.rating.rate} and Count:{el.rating.count} <br />
        </div>
    ));

    function getOneProduct(id) {
        console.log(id);
        if (id >= 1 && id <= 20) {
            fetch("http://localhost:4000/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    const dataArr = [];
                    dataArr.push(data);
                    setOneProduct(dataArr);
                });
            setViewer2(!viewer2);
        } else {
            console.log("Wrong number of Product id.");
        }
    }

    const showOneItem = oneProduct.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={30} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate :{el.rating.rate} and Count:{el.rating.count} <br />
        </div>
    ));

    return (
        <div>
            <h1>Catalog of Products</h1>
            <button onClick={() => getAllProducts()}>Show All products</button>
            <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />

            <h1>Show all available Products.</h1>
            <hr></hr>
            {viewer1 && <div>Products {showAllItems}</div>}
            <hr></hr>
            <h1>Show one Product by Id:</h1>
            {viewer2 && <div>Product: {showOneItem}</div>}
            <hr></hr>
        </div>
    );
} // App end
export default App;




// import logo from './logo.svg';
// import './App.css';
// import {useState, useEffect} from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
