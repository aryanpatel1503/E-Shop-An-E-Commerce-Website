const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eshop9231@gmail.com",
    pass: "hchq mrow ilwt alax",
  },
  // logger: true,
  // debug: true,
});

const sendEmail = async ({ to, recipients, subject, text, image }) => {
  const mailOptions = {
    from: "eshop9231@gmail.com",
    bcc: recipients.join(", "),
    subject: subject,
    html: `
    <h2>${subject}</h2>
    <p>${text}</p>
    <img src="cid:product-image.jpg" alt="Product Image" style="height:300px; object-fit: contain;" />
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
