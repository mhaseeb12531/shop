const express = require("express");
const { is } = require("express/lib/request");
const res = require("express/lib/response");
const authAdmin = require("../middleware/auth");
const authUser = require("../middleware/auth");
const router = new express.Router();
const Shop = require("../models/shop.model");

router.post("/shop", authUser, async (req, res) => {
  const shop = new Shop(req.body);
  try {
    await shop.save();
    //const shop = await Shop.create(req.body);
    res.status(200).send(shop);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/shop/:id", authUser, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      res.status(404).send("not found");
    }
    res.status(200).send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/shop/user/:id", authAdmin, async (req, res) => {
  try {
    const shop = await Shop.find({ user: req.params.id });
    if (!shop) {
      res.status(404).send("not found");
    }

    res.status(200).send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/shop", authAdmin, async (req, res) => {
  try {
    const shop = await Shop.find();

    if (!shop) {
      return res.status(404).send();
    }
    res.send(shop);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.patch("/shop/:id", authUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "product"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send("invalid updates");
  }
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await shop.save();
    res.send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/shop-product/:id", authUser, async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { $push: { product: "625a309d6c06a2c9e53b56c6" } },
      {
        new: true,
      }
    );
    await shop.save();
    res.send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.patch("/shop-product-remove/:id", authUser, async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { $pull: { product: "625cc31edc532b9bf8464827" } },
      {
        new: true,
      }
    );
    await shop.save();
    res.send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/shop/:id", authUser, async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).send("not found");
    }
    res.status(200).send(shop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/shop-admin/:id", authAdmin, async (req, res) => {
  try {
    const shop = await findById(req.params.id);
    if (!shop) {
      return res.status(404).send("not found");
    }
    if (shop.product !== []) {
      return res.status(400).send("not autherizod to delete occupied shop");
    }
    const result = await Shop.deleteOne(shop);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
