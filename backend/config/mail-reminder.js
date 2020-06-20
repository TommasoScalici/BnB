const nodemailer = require('nodemailer');
let cron = require('node-cron');
var schedule = require('node-schedule');



// module.exports = function(app, express) {
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//             user: 'bnb.webandmobile@gmail.com',
//             pass: 'BnB.Project123!'
//         }
//     });

//     let mailOptions = {
//         to: "apix98@hotmail.it",
//         subject: "Rendiconto",
//         text: "",
//         html: "Le ricordiamo che ogni 3 mesi deve inviare un rendiconto all'ufficio del turismo, ci penseremo noi a ricordarglielo tramite mail tra 3 mesi. <br> Può procedere scaricando il file Excel dal suo Profilo => Storico Guadagni => Rendiconto. <br> Grazie.",
//         attachments : ""
//     };
    

//     cron.schedule('* * * */3 *', () => {
//         // Send e-mail
//         transporter.sendMail(mailOptions, function(error, info){
//               if (error) {
//                 console.log(error);
//               } else {
//                 console.log('Email sent: ' + info.response);
//               }
//           });
//         });

    
// }
