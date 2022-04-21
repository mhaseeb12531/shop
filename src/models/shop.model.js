const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    open: {
      type: Boolean,
    },
    address: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Address",
      required: true,
    },
    product: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

shopSchema.pre("save", async function (next) {
  const shop = this;
  next();
});
const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
