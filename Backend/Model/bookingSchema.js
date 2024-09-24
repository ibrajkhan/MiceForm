const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    groupType: {
      type: String,
    },

    destination: { type: String },
    subcategory: { type: String },
    Comments: { type: String },
    company__name: { type: String },
    contactPerson: { type: String },
    email: { type: String },
    phone: { type: Number },
    period: { type: String },
    hotelDuration: { type: String },
    groupSize: { type: Number },
    noOfPaxFit: { type: String },
    national__city: { type: String },
    
  },
  { timestamps: true }
);
const bookingData = mongoose.model("bookingData", bookingSchema);
module.exports = bookingData;
