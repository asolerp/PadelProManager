const nodemailer = require("nodemailer");


const createTransporter = async () => {

  const transporter = nodemailer.createTransport({
    host: "smtp.dondominio.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "info@padelpromanager.com",
      pass: "Ayc.051213",
    },
  });

  return transporter;
};

module.exports = {
  createTransporter,
};
