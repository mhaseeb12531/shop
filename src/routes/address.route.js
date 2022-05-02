const express = require("express");
const { add } = require("nodemon/lib/rules");
const { authUser, authAdmin, authUserOrAdmin } = require("../middleware/auth");

const router = new express.Router();

const Address = require("../models/address.model");
const Shop = require("../models/shop.model");

router.post("/address", authAdmin, async (req, res) => {
  const address = new Address(req.body);
  try {
    const address = await Address.create(req.body);
    res.status(200).send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/address", authAdmin, async (req, res) => {
  try {
    const address = await Address.find();

    if (!address) {
      return res.status(404).send();
    }
    res.send(address);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
router.get("/address", authAdmin, async (req, res) => {
  try {
    const address = await Address.find();

    if (!address) {
      return res.status(404).send();
    }
    res.send(address);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
router.get("/address/:id", authAdmin, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      res.status(404).send("not found");
    }
    res.status(200).send(address);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.patch("/address/:id", authAdmin, async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await address.save();
    res.send(address);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/address/:id", authAdmin, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).send("not found");
    }
    const shop = await Shop.find({ address });
    if (shop) {
      return res
        .status(400)
        .send("not autherized to delete address of occupied shop");
    } else {
      const result = await Address.deleteOne({ address });
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
