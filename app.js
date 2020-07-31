var express = require('express');
var app = express();
const crypto=require('crypto');
const mongoose = require('mongoose');
//const xoauth2=require('xoauth');
const mailer=require("nodemailer");

const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";

const bdp=require('body-parser');
 const multer = require('multer');
// //const prod=require('./api/routes/Send.js');

const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
// const methodOverride=require('method-override');
// const storage=multer.diskStorage({
//   destination :function(req,file,cb){
//     cb(null,'./uploads');
//   },
//   filename :function(req,file,cb){
//     cb(null,new Date().toISOString()+file.originalname);
//   }
// });
const fileFilter=(req,file,cb)=>{


  if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
    cb(null,true);

  }
  else{
    cb(null,false);
  }
};

let gfs;
const conn = mongoose.createConnection(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
conn.once('open', function () {
   gfs = Grid(conn.db, mongoose.mongo);

   gfs.collection('uploads');
})
const path=require('path');

const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
const upload2=multer({
  storage:storage,
  fileFilter:fileFilter

});

var connectDB = require('./backend/models/Connection');
const Student=require('./backend/models/Student');
connectDB();

app.use(express.static('uploads'));

app.use(bdp.urlencoded({ extended: false }))

app.get('/',(req,res)=>{

    res.sendFile(__dirname + '/StudentSign.html');
  

});

// app.post('/Send', function (req, res) {
//   res.send(JSON.stringify(req.body)); 
//   console.log(req.body)
// });


app.use("/Send",upload.single('prodImage'),(req,res,next)=>{
 console.log(req.file);

   const DBElement=new Student({
    username: req.body.email,
    passwordHash: '',
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    gender:req.body.gender,
    city:req.body.city,
    //state:req.body.firstName,
    //country:req.body.firstName,
    //school:req.body.firstName,
    grade:req.body.grade,
    subjects:req.body.subjects,
    reasonForTutor:req.body.firstName,
    duration:req.body.duration,
    sessionFreq:req.body.sessionFreq,
    eligibilityForFreeTutor:req.body.firstName,

   });
  //  DBElement.save().then(data=>{
  //    console.log("saved")
  //  })

  //  const transporter=mailer.createTransport({
  //   service:'gmail',
  //   auth:{

  //     // xoauth2:xoauth2.createXOAuth2Generator({
  //     user:'inplacelearn@gmail.com',
  //    password:'Password@1234'
  
  //   // })
  // }
  // });
  
  // var mailOptions={
  //   from :'no-reply@learninplace.com',
  //   to:req.body.email,
  //   subject:'Registration Confirmed at LearnInPlace',
  //   text:'<h1>Thanks for Signing Up</h1>'
  // };
  
  // transporter.sendMail(mailOptions,function(error,info){
  // if(error){
  //   console.log(error);
  
  // }
  // else{
  //   console.log('Email sent :'+info.response);
  // }
  // });

  console.log(req.body);
  
});

// app.get('/contact',(req,res)=>{
  // const transporter=mailer.createTransport({
  //   service:'gmail',
  //   auth:{

  //     // xoauth2:xoauth2.createXOAuth2Generator({
  //     user:'inplacelearn@gmail.com',
  //    password:'Password@1234'
  
  //   // })
  // }
  // });
  
  // var mailOptions={
  //   from :'no-reply@learninplace.com',
  //   to:req.body.email,
  //   subject:'Registration Confirmed at LearnInPlace',
  //   text:'<h1>Thanks for Signing Up</h1>'
  // };
  
  // transporter.sendMail(mailOptions,function(error,info){
  // if(error){
  //   console.log(error);
  
  // }
  // else{
  //   console.log('Email sent :'+info.response);
  // }
  // });
// });



//retrieve fikes 
app.get('/files',(req,res)=>{
  gfs.files.find().toArray((err,files)=>{
    if(!files || files.length===0){
      return res.status(404).json({
        err :'No file exists'
      });
    }
    return res.json(files);
  });
})

    app.post('/tutorthankyou', (req, res) => {
        console.log(req.body);
      });

    //   app.post('/StudentAlert', (req, res) => {
    //     console.log(req.body)
    //   });

    // app.post('/Send', function(req, res) {
    //     console.log("BODY"+req.body); //Output=> like { searchid: 'Array of checked checkbox' }
    //     console.log("SEARCH"+req.body.searchid); // to get array of checked checkbox
    
    //    res.sendFile(__dirname + '/test.html')
    //     //res.send(JSON.stringify(req.body))
    //     console.log(req.body)
    //   });
   
    

app.listen(3008, function() {
    console.log('listening on 3000')
  });


  module.exports=app;