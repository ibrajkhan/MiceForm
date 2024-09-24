const express = require("express");
var bodyParser = require("body-parser");
const bookingCollection = require("../Model/bookingSchema");
const router = express.Router();

router.get("", async (req, res) => {
  const user = await bookingCollection.find();
  try {
    res.json({
      staus: "Sucess",
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// Post Routes

router.post("", async (req, res) => {
  try {
    const userData = await bookingCollection.create(req.body);
    return res.json({
      status: "Sucess",
      data: userData,
    });
  } catch (e) {
    return res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});
module.exports = router;
