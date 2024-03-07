const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your_mongodb_uri' with your MongoDB connection string)
mongoose.connect(
  "mongodb+srv://andalibqu14:h8k6TcUO3DXHJP6p@cluster0.nfgszhz.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define the Email model
const Email = mongoose.model("Email", {
  to: String,
  subject: String,
  text: String,
});

// Body parser middleware
app.use(
  bodyParser.json()
  );

  app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint for sending and storing emails
app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Save email to MongoDB
    const newEmail = new Email({ to, subject, text });
    await newEmail.save();

    // Send email using Nodemailer (replace 'your_email' and 'your_password' with your email credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "andalibquraishi14@gmail.com",
        pass: "bunh olhx skte nssf",
      },
    });

    const mailOptions = {
      from: "andalibquraishi1401@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent and stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
