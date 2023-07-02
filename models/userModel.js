const mongoose = require("mongoose");
const validator = require("validator");
const usersSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "user", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organisation: {
      type: String,
      required: function () {
        if (this.role === organisation) {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("not valid email");
        }
      },
    },
    password: {
      type: String,
      required: [true, "paswword is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
// model
const users = new mongoose.model("users", usersSchema);

module.exports = users;
