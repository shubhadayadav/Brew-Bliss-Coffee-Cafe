const Reservation = require("../model/reservationModels");

const createReservation = async (req, res) => {
  console.log("Controller called");
  console.log("Received data:", req.body);
  try {
    const response = await Reservation.create(req.body);

    res
      .status(201)
      .json({ message: " Reservation Successfull", reservation: response });
  } catch (error) {
    // Check if Email Id and phone number is Duplicate
    if (error.code === 11000) {
      if (error.keyValue.emailId) {
        return res.status(400).json({
          field: "emailId",
          message: " This Email Id is already registered",
        });
      }
      if (error.keyValue.telNumber) {
        return res.status(400).json({
          field: "telNumber",
          message: "This Phone Number is already registered ",
        });
      }
    }
  }
};

module.exports = { createReservation };
