const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/reactdata";

mongoose.connect(mongoURI, {
    dbName: "reactdata",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Specific route to handle favicon.ico requests
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    try {
        const oneProduct = await Product.findOne(query);
        if (oneProduct) {
            console.log(oneProduct);
            resp.send(oneProduct);
        } else {
            resp.status(404).send("Product not found");
        }
    } catch (err) {
        console.error("Error while fetching product:", err);
        resp.status(500).send("Internal Server Error");
    }
});

app.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.log("Error while fetching all products: " + err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const ptitle = req.body.title;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pcategory = req.body.category;
    const pimage = req.body.image;
    const prate = req.body.rating.rate;
    const pcount = req.body.rating.count;

    const formData = new Product({
        _id: p_id,
        title: ptitle,
        price: pprice,
        description: pdescription,
        category: pcategory,
        image: pimage,
        rating: { rate: prate, count: pcount },
    });

    try {
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:", err);
    }
});

app.delete("/delete", async (req, res) => {
    console.log("Delete:", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = { message: `Product ${req.body._id} deleted correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting:", req.body._id, err);
    }
});

app.put("/update", async (req, res) => {
    try {
        const updatedProduct = req.body;
        const query = { _id: updatedProduct._id };
        await Product.findOneAndUpdate(query, updatedProduct, { new: true });
        const messageResponse = { message: `Product ${updatedProduct._id} updated correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while updating product:", err);
    }
});

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`);
});
