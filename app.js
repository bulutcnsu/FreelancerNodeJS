const express = require('express');
const ejs = require('ejs')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const pageRoute = require('./routes/pageRoute');
const bodyParser = require('body-parser');


const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', {methods: ['POST','GET','PUT','DELETE']}));
app.use(express.static('public'))
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : 'public/uploads/'
}));

app.use('/', pageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  mongoose.connect('mongodb://127.0.0.1:27017/freelancer-db')
  .then(() => console.log('DB-connected!'))
  .catch((err) => console.log("Connection-Error", err))

