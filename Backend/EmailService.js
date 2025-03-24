const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eshop9231@gmail.com",
    // pass: "hchq mrow ilwt alax",
    pass: "tzvx zmjs eztu qmhz",
  },
  // logger: true,
  // debug: true,
});

const sendEmail = async ({
  to,
  recipients,
  product,
  price,
  subject,
  text,
  image,
}) => {
  const mailOptions = {
    from: "eshop9231@gmail.com",
    bcc: recipients.join(", "),
    subject: subject,
    html: `
      <div>
        <h2>${text}</h2>
        <div style="display: flex;">
          <div style="padding: 2px;">
            <img src="cid:product-image.jpg" alt="Product Image" style="height: 100px; object-fit: contain;" />
          </div>
          <div style="">
            <p style="font-size: 18px; font-weight: 500; line-height: 23px;">
              ${product}
            </p>
            <p style="font-size: 17px; font-weight: 450; line-height: 5px;">₹${price}</p>
          </div>
        </div>
      </div>
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
