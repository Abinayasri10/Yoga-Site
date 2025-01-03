const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This is to parse JSON data from the request body

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

// Route to handle contact form submission
app.post('/send-message', (req, res) => {
  // Destructure data from the body
  const { name, email, subject, message } = req.body;

  // Log the received data to check if it's coming correctly
  console.log("Received Data:", req.body);  // Full object logging
  console.log("Name:", name);  // Log individual fields for easier debugging
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  // Create a transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abinayajegadeeshwaran@gmail.com', // Your email
      pass: 'tkve tklx gkgn dqmq'  // Your email password or app password
    }
  });

  const mailOptions = {
    from: email,
    to: 'abinayajegadeeshwaran@gmail.com',
    subject: subject,
    text: `Message from ${name} (${email}):\n\n${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Something went wrong');
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).send('Message sent successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
