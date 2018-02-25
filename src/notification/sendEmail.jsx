// import nodemailer from 'nodemailer';

// const sendEmail = () => {
//   nodemailer.createTestAccount((err, account) => {
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: account.user,
//         pass: account.pass
//       }
//     });
//
//     let mailOptions = {
//       from: '"Dylan McCapes" <dmccapes@mac.com',
//       to: 'dmccapes@mac.com',
//       text: 'Hello world?',
//       html: '<b>Hello world?</b>'
//     };
//
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     });
//   });
// };
//
// export default sendEmail;
