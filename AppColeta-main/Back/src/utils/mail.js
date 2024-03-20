import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.emailemnuvem.com.br",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const send = async (to, subject, content) => {
  return new Promise(async (resolve, reject) => {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html: content,
    };

    try {
      let envio = await transporter.sendMail(mailOptions);
      resolve(envio.response);
    } catch (error) {
      reject(error);
    }
  });
};

export { send };
