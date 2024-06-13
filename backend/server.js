const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Routers
const databaseSeeder = require("./databaseSeeder");
const userRouter = require("./routes/User");
const productRouter = require("./routes/Product");
const ordersRouter = require("./routes/Order");

dotenv.config();
const PORT = process.env.PORT || 9000;

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db Connected"))
  .catch((err) => console.log(err));

//express app
const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  if ("OPTTT") next();
});
app.use(express.json());

//database seeder router
app.use("/api/seed", databaseSeeder);

//user router
app.use("/api/users", userRouter);

//products router
app.use("/api/products", productRouter);

//orders router
app.use("/api/orders", ordersRouter);

app.listen(PORT || 9000, () => {
  console.log(`Server is running on port ${PORT}`);
});
