import nodemailer from "nodemailer";

const send = async user => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    }
  });

  const info = await transporter.sendMail({
    from: `"Admin" ${process.env.USER}`,
    to: `${user.verify}`,
    subject: `Hello ${user.username} | Coinmarketdashboard`,
    text: `Hello ${user.username}, your account has been registered. To verify your email click here`,
    html: `<p>Hello ${user.username}. Your account has been registered. To verify your email <a href='${process.env.APP_NAME ? process.env.APP_NAME + '/verify?email=' + user.verify : 'http://localhost:5001/verify?email=' + user.verify}'>click here</a></p>`
  });
};

export default send;
