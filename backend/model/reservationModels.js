const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    telNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    selectDate: {
      type: Date,
      required: true,
    },
    selectTime: {
      type: String,
      required: true,
    },
    Guests: {
      type: Number,
      required: true,
    },
    indoor: {
      type: Boolean,
    },

    outdoor: {
      type: Boolean,
    },

    noPreference: {
      type: Boolean,
    },
    specialRequest: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
