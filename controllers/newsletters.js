const Newsletter = require('../models/Newsletter');
require('dotenv').config();
const nodemailer = require('nodemailer');

const EMAIL = 'mikgru9016@gmail.com';
const PASSWORD = 'Organy9016';

exports.findNewsletters =  async (req, res) => {
    const newsletter = await Newsletter.find();
    res.send({data: newsletter});

};

exports.createNewsletter = async (req,res) => {
   const newsletter = new Newsletter(req.body);
   await newsletter.save();

 
    //CASHING DATA
    let lastItem = req.body.email;
    console.log(lastItem)
    
    //NODEMAILER

    const transporter = nodemailer.createTransport({
    
    // host: 'smtp.mail.yahoo.com',
    // port: 465,
    service:'Gmail',
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    },
    debug: false,
    logger: true 
});

    const mailOptions = { 
        from: EMAIL,
        to: lastItem,
        subject: 'Your Fresh Design News!',
        text: `Hi ${req.body.name}! WELCOME TO THE NEWSLETTER!!!!`
    }
    
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: ' + info.response)
        }
    });
    //RESPONSE TO THE CLIENT
    res.send({
        status: true,
        message: 'Data is received',
    });

};

exports.findNewsletter = async (req,res) => {
    try{
        const newsletter = await Newsletter.findById(req.params.id);
        res.send({data: newsletter});
        
    } catch{
        res.status(404).send({error: 'Newsletter not found'});
    }
    
   
}