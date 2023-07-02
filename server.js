const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

// dot config
dotenv.config();

// mongoose connection
require("./config/db");

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));

// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    "server running in " +
      process.env.DEV_MODE +
      " Mode on " +
      PORT.bgYellow.white
  );
});
