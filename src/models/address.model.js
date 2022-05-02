const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    shopNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    floor: {
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
      enum: ["punjab", "sindh", "kpk", "balochistan"],
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
