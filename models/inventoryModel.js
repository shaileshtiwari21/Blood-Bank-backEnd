const mongoose = require("mongoose");
const investorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory Type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood Group is required"],
      enum: ["O-", "O+", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quentity: {
      type: Number,
      required: [true, "quentity is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",

      required: [true, "organisation is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  {
    timestamps: true,
  }
);

// model
module.exports = mongoose.model("investory", investorySchema);
