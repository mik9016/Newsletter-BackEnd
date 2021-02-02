
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const newsletterController = require('./controllers/newsletters');


const app = express();


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
app.post('/newsletter', newsletterController.createNewsletter);
app.get('/newsletter/:id'/ newsletterController.findNewsletter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`)}

);

}).catch((err) => {
    console.log(err);
})












