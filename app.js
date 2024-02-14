const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];
app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/search", (req, res) => {
  const nameSt = req.query.st;
  const minPrice = req.query.mini;
  const maxPrice = req.query.maxi;
  let resultPro = products;
  if (nameSt) {
    resultPro = resultPro.filter((item) => {
      return item.name.includes(nameSt);
    });
  }
  if (minPrice) {
    resultPro = resultPro.filter((item) => {
      return item.price >= minPrice;
    });
  }
  if (maxPrice) {
    resultPro = resultPro.filter((item) => {
      return item.price <= maxPrice;
    });
  }

  res.send(resultPro);
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  const productResult = products.find((pro) => {
    return pro.id == productId;
  });
  if (productResult) {
    res.send(productResult);
  } else {
    res.send("Hi erreur");
  }
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const newPro = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newPro);

  res.send(newPro);
});

app.put("/products/:id", (req, res) => {
  const ProId = req.params.id;
  const { id, name, price } = req.body;

  const index = products.findIndex((p) => p.id === ProId);
  if (index !== -1) {
    products[index] = { id, name, price };

    res.send(products[index]);
  }
});
app.delete("/products/:id", (req, res) => {
  const prId = req.params.id;
  const index = products.indexOf((product) => (product.id === id));
  if(index){
    products.splice(index, 1)
  }
  res.send()
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
