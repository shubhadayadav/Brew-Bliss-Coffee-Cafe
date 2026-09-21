const Reservation = require("../model/reservationModels");

const createReservation = async (req, res) => {
  console.log("Controller called");
  console.log("Received data:", req.body);

  const response = await Reservation.create(req.body);
  res.json({ message: " Reservation Successfull", reservation: response });
};

module.exports = { createReservation };
