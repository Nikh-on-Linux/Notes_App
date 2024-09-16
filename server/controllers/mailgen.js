
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: 'smpt.gmail.com',
  port: 587,
  auth: {
    user: 'azurafoundation@gmail.com',
    pass: 'uixormjfikombzft '
  }
});

const genMail = async (req, res) => {

  try {

    console.log(req.body.email);

    const info = await transporter.sendMail({
      from: 'azurafoundation@gmail.com', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "Notess_App: Reset your password", // Subject line
      text: "", // plain text body
      html: `<h1>You can reset your account password from the link given below</h1><a href="http://localhost:3000/auth/resetpassword/${req.body.id}" >Click here to reset password</a>`, // html body
    }).then(data => console.log(data));

    res.json({msg:"Email is sent successfully",suc:true});
  }
  catch(err){
    res.json({msg:"Failed to send email..try again after some time",suc:false});
  }

}

export { transporter , genMail };