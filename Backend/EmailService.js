const http = require("http");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "patelaryankumar123@gmail.com",
    pass: "zobd oovy mejj zmpw",
  },
  logger: true,
  debug: true,
});

const sendEmail = async ({ to, recipients, subject, text, image }) => {
  const mailOptions = {
    from: "patelaryankumar123@gmail.com",
    bcc: recipients.join(", "),
    subject: subject,
    html: `
    <h2>${subject}</h2>
    <p>${text}</p>
    <img src="cid:product-image.jpg" alt="Product Image" style="width:300px;" />
  `,

    attachments: [
      {
        filename: "product-image.jpg",
        path: image,
        cid: "product-image.jpg",
        contentType: "image/jpeg",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
