const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

//Routes
app.use("/user/", require("./routes/authRoutes"));
 
const port = process.env.PORT || 5000;
app.listen(port);
console.log("Server listening at " + port);
