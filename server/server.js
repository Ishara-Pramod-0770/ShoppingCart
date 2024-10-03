const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./data");

app.use(express.json());
app.use(cors());

//display all products
app.get("/products", (req, res) => {
  try {
    res.status(200).json(data.products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products." });
  }
});

// Add item to the cart
app.post("/cart", (req, res) => {
  try {
    const product = req.body;
    data.cart.push(product);
    res.status(201).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to add product to cart." });
  }
});

// Retrieve all products in the cart
app.get("/cart", (req, res) => {
  try {
    res.status(200).json(data.cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart items." });
  }
});

// Update product item in the cart
app.put("/cart/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    const index = data.cart.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      data.cart[index] = updatedProduct;
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found in cart." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item." });
  }
});

// Delete product item in the cart
app.delete("/cart/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = data.cart.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      data.cart.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Product not found in cart." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cart item." });
  }
});

// Clear entire cart
app.delete("/cart", (req, res) => {
  try {
    data.cart = [];
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});