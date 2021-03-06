var express = require("express");
const { json } = require("express");
require("./db/mongoose");

const userRouter = require("./routes/user.route");
const shopRouter = require("./routes/shop.route");
const addressRouter = require("./routes/address.route");
const productRouter = require("./routes/product.route");

const app = express();
var router = express.Router();

app.use(express.json());
app.use(userRouter);
app.use(shopRouter);
app.use(addressRouter);
app.use(productRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

module.exports = router;
