const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');
var connectDB = require('./models/Connection');

connectDB();

app.use(express.json({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter);

var path = require('path');



app.use(bodyParser());
// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(path.join(__dirname + '../../testhomepg/testhomepg/')));
//app.use('/images',express.static(__dirname + '/studentsignup/'));
//\Users\topaz\Documents\learningalliance\backend\routes
app.get('/', function(req, resp) {
    //console.log(__dirname)
    resp.sendFile('home.html', {root:path.join(__dirname, '../testhomepg/testhomepg/')});
    //resp.send("this works");
})

app.get('/tutorsignups', function(req,resp) {
    console.log("tutor signup form works!")
    resp.sendFile('tutorsignups.html', {root:path.join(__dirname, '../')});
})

app.get('/studentsignups', function(req,resp) {
    console.log("student signup form works!")
    resp.sendFile('studentsignups.html', {root:path.join(__dirname, '../studentsignup')});
})

app.get('/renderform.js', function(req, resp) {
    console.log('render form sent')
    resp.sendFile('renderform.js', {root:path.join(__dirname, '../')})
})

// app.post('/tutorsubmit', function(req, resp) {
//     console.log('Data:' + JSON.stringify(req.body));
//     resp.json({message: 'tutor message recieved!!!'})
//     //resp.send('hsahsaj')
//     //resp.redirect('/tutor/register');
//     // this is the header issue
//     //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname)})
// })

app.get('/tutorthankyou.html', function(req, resp) {
    console.log("tutor thankyou sent")
    resp.sendFile('tutorthankyou.html', {root:path.join(__dirname, '../')})
})

const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started;"))
