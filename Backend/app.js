const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookingForm = require("./Router/formRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dburl = process.env.ATLAS_URI;
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// FOR SUBMITTING DATA AT MONGODB ATLAS
// Correcet;
// mongoose
//   .connect(dburl)
//   .then(() => {
//     app.listen(port, console.log(`Server is running at port ${port}`));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

mongoose.connect(dburl);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connected Sucessfully");
});

app.use("/", bookingForm);

app.listen(3000, function (req, res) {
  console.log(`Server is running at port ${port}`);
});
