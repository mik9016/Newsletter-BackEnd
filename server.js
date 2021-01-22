
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

//DB

// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.URI;
// const client = new MongoClient(uri, { useNewUrlParser: true },{ useUnifiedTopology: true }, () => {
//     console.log('connected')
// });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// })



const app = express();


const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('dotenv').config();
//definig 
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const postArr = [];

//NODEMAILER

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
})  


//REQUESTS

app.get('/',(req,res)=> {
    res.send({
        message: ' your get req'

    })
} )

app.post('/',(req, res) => {
    //pushing data from client to postArr
    postArr.push(req.body)
    postArr.forEach(element => {
        console.log(element)
    });
    //cashing data 
    let lastItem = postArr[postArr.length-1];
    console.log(lastItem.email)
    

    const mailOptions = { 
        from: EMAIL,
        to: lastItem.email,
        subject: 'Your Fresh Design News!',
        text: 'WELCOME TO THE NEWSLETTER!!!!'
    }
    
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: ' + info.response)
        }
    });

    res.send({
        status: true,
        message: 'Data is received',
    });


});



app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);
