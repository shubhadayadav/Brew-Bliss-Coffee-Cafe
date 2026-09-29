const Reservation = require("../model/reservationModels");
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const createReservation = async (req, res) => {
  console.log("Controller called");
  console.log("Received data:", req.body);
  try {
    // 1. Save reservation in MongoDB
    const response = await Reservation.create(req.body);
    console.log(response);

    // 2. Send confirmation email using Resend

    try {
      const { data, error } = await resend.emails.send({
        from: "Brew & Bliss <onboarding@resend.dev>",
        to: [response.emailId],
        subject: "Reservation Confirmed - Brew & Bliss",

        html: `<div style="
      font-family: Arial, sans-serif;
      background-color: #f8f1e8;
      padding: 40px 20px;
    ">

      <div style="
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      ">

        <!-- Header -->
        <div style="
          background-color: #3d0000;
          color: white;
          text-align: center;
          padding: 30px 20px;
        ">
          <h1 style="margin: 0; font-size: 30px;">
            Brew & Bliss ☕
          </h1>

          <p style="margin: 8px 0 0; font-size: 15px;">
            Coffee • Conversations • Good Moments
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 35px 30px;">

          <h2 style="
            color: #3d0000;
            margin-top: 0;
          ">
            Reservation Confirmed! 🎉
          </h2>

          <p style="font-size: 16px; color: #444;">
            Hello <strong>${response.name}</strong>,
          </p>

          <p style="
            font-size: 15px;
            color: #555;
            line-height: 1.6;
          ">
            Thank you for choosing Brew & Bliss.
            Your table has been successfully reserved.
            We look forward to welcoming you!
          </p>

          <!-- Reservation Details -->
          <div style="
            background-color: #f8f1e8;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
          ">

            <h3 style="
              color: #3d0000;
              margin-top: 0;
            ">
              Reservation Details
            </h3>

            <p style="margin: 10px 0;">
              📅 <strong>Date:</strong> ${response.selectDate}
            </p>

            <p style="margin: 10px 0;">
              🕒 <strong>Time:</strong> ${response.selectTime}
            </p>

            <p style="margin: 10px 0;">
              👥 <strong>Guests:</strong> ${response.Guests}
            </p>

          </div>

          <p style="
            font-size: 15px;
            color: #555;
            line-height: 1.6;
          ">
            If you need to make any changes to your reservation,
            please contact us.
          </p>

          <p style="
            margin-top: 30px;
            color: #3d0000;
            font-weight: bold;
          ">
            See you soon! ☕🤎
          </p>

        </div>

        <!-- Footer -->
        <div style="
          background-color: #3d0000;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 13px;
        ">
          <p style="margin: 5px 0;">
            Brew & Bliss
          </p>

          <p style="margin: 5px 0;">
            Thank you for choosing us ❤️
          </p>
        </div>

      </div>

    </div>
  `,
      });
      if (data) {
        console.log("Email sent: ", data);
      } else {
        console.log(" Resend Error: ", error);
      }
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }
    res
      .status(201)
      .json({ message: " Reservation Successfull", reservation: response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createReservation };
