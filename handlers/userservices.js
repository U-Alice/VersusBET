
const { db } = require("../database/database")
const { User } = require('../database/userSchema.js')
const { generateToken } = require('./jwt')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const { Password } = require("../database/passwordreset.js");
const otpGenerator = require("otp-generator");




module.exports.register = (db) => {
    return async (req, res) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                const result = await User.findOne({ email: req.body.email })
                if (result) {
                    return res.send("The email is taken !!!")
                }
                try {
                    const user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        tel: req.body.tel,
                        country: req.body.country,
                        password: hash,
                        userName: req.body.userName,
                        idNumber: req.body.idNumber
                    });
                    await user.save()
                    const transporter = nodemailer.createTransport({
                        host: "smtp-mail.outlook.com",
                        auth: {
                            user: "hallcoder25@outlook.com",
                            pass: "!!!?!?123Abana"
                        },
                        tls: {
                            rejectUnauthorized: false,
                        }
                    });

                    const options = {
                        from: "hallcoder25@outlook.com",
                        to: req.body.email,
                        subject: "Node nodemailer test activity undergoing",
                        text: `I can see you reading this ${req.body.firstName} `,
                        //   html:`<h1>Your Favorite artist!!! Iriz wali iliz</h1>
                        //      <img src="https://www.pinterest.com/pin/450219293980329785/?amp_client_id=CLIENT_ID%28_%29&mweb_unauth_id=%7B%7Bdefault.session%7D%7D&simplified=true"
                        //   <p>I guess not so sure<p>
                        //   <h4>Am I right?</h4>
                        //   <a href="http://google.com">Yes</a>
                        //   <a  href="http://igihe.com">Nah not right</a>
                        //   `,

                    }

                    transporter.sendMail(options, (err, info) => {
                        if (err) {
                            console.log(err.message);
                            return;
                        }
                        console.log("Sent" + info.response);
                    })
                    res.send("User registered successfully")
                } catch (error) {
                    res.send(error.message)
                }
            })
        })
    }
}

module.exports.login = () => {
    return async (req, res) => {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        if (!user) {
            res.status(400).json({ message: 'User not found' })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(400).send({ message: 'Invalid password' })
        }
        else {
            const token = generateToken(user.email, user._id)
            res.status(200).send({ success: true, message: "Log in successfull", data: user, token: token })
        }
    }
}


module.exports.forgotPassword = (db) => {
    return async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({ message: 'user not found' })
        }
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false })
        let userDetails = await Password.findOne({email: user.email})
        if(userDetails){
            Password.findOneAndUpdate({email:userDetails.email}, {OTP:OTP})
        }else{
        userDetails=new Password({
            email:user.email,
            OTP:OTP,
            User_id: user.id
        })
        await userDetails.save()
        }
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "",
                pass: ""
            }
        })
        const mailOptions = {
            to: user.email,
            from: "umugwanezaalice22@gmail.com",
            subject: "password reset request",
            html: `
            <html>
           <h6> Hi ${user.firstName} </h6>\n
           <p> below is the verification code for your password reset request <br> This code is valid for 15 minutes</p>
            <h3>${OTP}</h3>
            </html>
            `
        }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }
            console.log("sent" + info.response)
            res.send('email sent successfully')
        })
    }
}

module.exports.verifyEmail = (db) => {
    return async (req, res) => {
        const updatePassword = await Password.findOne({ email: req.body.email, OTP: req.body.OTP })
        if (!updatePassword) {
            res.status(401).send('Invalide OTP')
        }
        res.status(200).send('OTP validation successfull')
    }
}
module.exports.updatePassword = () => {
    return async (req, res) => {
        const salt = await bcrypt.genSalt(10)
        const userUpdate = await Password.findOne() 
        const hashed = await bcrypt.hash(req.body.password, salt)
        User.findOneAndUpdate({email:userUpdate.email}, { password:  hashed}, () => {
            res.send('password updated successfully')
        })
        Password.findOneAndRemove({email:userUpdate.email},()=>{
            console.log('userUpdate removed')
        })
    }
}