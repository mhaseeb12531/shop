const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    shopNo: {
      type: String,
      required: true,
    },
    plaza: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    timestamps: true,
  }
);
addressSchema.pre("save", async function (next) {
  const shop = this;
  next();
});
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
