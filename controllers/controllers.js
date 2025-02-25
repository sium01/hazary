const nodemailer = require('nodemailer');
const brevoTransport = require('nodemailer-brevo-transport');


const transporter = nodemailer.createTransport(
  new brevoTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth:
    {
    apiKey: process.env.BREVO_API_KEY,
  user: process.env.BREVO_USER_ID
  }
})
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    //email matter
    transporter.sendMail({
      from: process.env.BREVO_USER_ID, 
      to: "siamahmed234636@gmail.com", 
      subject: `New Message from ${req.body.name}`,
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while sending the email.",
      error,
    });
  }
};

module.exports = { sendEmailController };