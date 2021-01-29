
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const newsletterController = require('./controllers/newsletters');


const app = express();

var corsOptions = {
    origin: 'https://newsletter2-9880b.web.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//definig 

const URI = 'mongodb+srv://Mikus:Organy9016@cluster0.3zr1s.mongodb.net/test?retryWrites=true&w=majority';



//MONGOOSE

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {

console.log('Connected to DB!')
// app.use(express.json());

app.get('/newsletter', newsletterController.findNewsletters);
app.post('/newsletter',cors(corsOptions). newsletterController.createNewsletter);
app.get('/newsletter/:id'/ newsletterController.findNewsletter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`)}

);

}).catch((err) => {
    console.log(err);
})












//REQUESTS

// app.get('/',(req,res)=> {
//     res.send({
//         message: ' your get req'

//     })
// } )

// app.post('/',(req, res) => {
    // //pushing data from client to postArr
    // postArr.push(req.body)
    // postArr.forEach(element => {
    //     console.log(element)
    // });
    // //cashing data 
    // let lastItem = postArr[postArr.length-1];
    // console.log(lastItem.email)
    

    // const mailOptions = { 
    //     from: EMAIL,
    //     to: lastItem.email,
    //     subject: 'Your Fresh Design News!',
    //     text: 'WELCOME TO THE NEWSLETTER!!!!'
    // }
    
    // transporter.sendMail(mailOptions,(error,info) => {
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log('Email sent: ' + info.response)
    //     }
    // });

    // res.send({
    //     status: true,
    //     message: 'Data is received',
    // });


// });




// APP LISTENING PORT
// app.listen(port, () => {
//     console.log(`App is listening on port ${port}.`)}

// );