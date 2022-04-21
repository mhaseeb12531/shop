const express = require("express");
const authUser = require("../middleware/auth");
const authAdmin = require("../middleware/auth");
const router = new express.Router();
const Product = require("../models/product.model");

router.post("/product", authUser, async (req, res) => {
  const product = new Product(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/product", authAdmin, async (req, res) => {
  try {
    const product = await Product.find();

    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
router.get("/product/:id", authUser, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("not found");
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.patch("/product/:id", authUser, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/product/:id", authUser, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("not found");
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
