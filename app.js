const express = require("express");
const app = express();
const http = require("http")
const path = require("path")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const port = 3000
mongoose.connect('mongodb://127.0.0.1:27017/ishantkart' , {useNewUrlParser:true});

const aboutusschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const aboutus = mongoose.model('aboutus' , aboutusschema);

const server = http.createServer((req, res) => {
    res.end("hiiiiiiiiiiiiiiiiiiiii");
});


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.render('../static/index.pug');
})

app.get('/menu' , (req , res) =>{
    res.render('../static/menu.pug')
})

app.get('/servises' , (req , res) =>{
    res.render('../static/servises.pug')
})

app.get('/aboutus' , (req , res) =>{
    res.render('../static/aboutus.pug')
})

app.post('/aboutus' , (req , res) =>{
    var mydata = new aboutus(req.body);
    mydata.save().then(()=> {
    res.send("sucessful")
    }).catch(()=>{
        res.status(400).send("item not send")
    })
    // res.render('aboutus.pug')
})



// START THE SERVER
app.listen(port, "127.0.0.1", () => {
    console.log("The application started successfully on port $[3000]" );
});
