const mongoose = require("mongoose");
const DB = process.env.MONGO_URL;

mongoose
  .connect(DB, {
    // useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => {
    console.log("connection failed error", e);
  });
