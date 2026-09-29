const Reservation = require("../model/reservationModels");
// const transporter = require("../config/mail");
require("dotenv").config();

const createReservation = async (req, res) => {
  console.log("Controller called");
  console.log("Received data:", req.body);
  try {
    const response = await Reservation.create(req.body);
    // console.log(response);
    // const sendEmail = await transporter.sendMail({
    //   from: process.env.EMAIL_ID,
    //   to: response.emailId,
    //   subject: "Reservation Confirmed - Brew & Bliss",
    //       text: `Hello ${response.name},

    //            Your table reservation at Brew & Bliss has been confirmed.

    //             Date: ${response.selectDate}
    // Time: ${response.selectTime}
    // Guests: ${response.Guests}

    // We look forward to serving you!

    // Brew & Bliss`,
    // });
    // console.log("Email sent:", sendEmail.messageId);
    res
      .status(201)
      .json({ message: " Reservation Successfull", reservation: response });
  } catch (error) {
    console.log(error);

    // Check if Email Id and phone number is Duplicate
    // if (error.code === 11000) {
    //   if (error.keyValue.emailId) {
    //     return res.status(400).json({
    //       field: "emailId",
    //       message: " This Email Id is already registered",
    //     });
    //   }
    //   if (error.keyValue.telNumber) {
    //     return res.status(400).json({
    //       field: "telNumber",
    //       message: "This Phone Number is already registered ",
    //     });
    //   }

    //   console.log("Email failed:", error.message);
    // }
  }
};

module.exports = { createReservation };
