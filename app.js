
const express = require('express');
const fs  = require('fs');
const bodyParser = require('body-Parser');
const { dirname } = require('path');
const mongoose = require('mongoose');
// const e = require('express');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new  mongoose.Schema({
    name : String ,
    email : {type : String ,unique : true},
    password: String ,
    phone :Number,
    address : String
});

const User  = new mongoose.model('User' , userSchema);

app.get('/',(req,res) =>{
    res.sendFile(__dirname + '\\Home.html');
});

app.get('/help' , (req,res) =>{
    res.sendFile(__dirname + '\\help.html');
})

app.get('/ContactUs' , (req,res) =>{
    res.sendFile(__dirname + '\\contactus.html') ;
})

app.get('/AboutUs' , (req,res) =>{
    res.sendFile(__dirname + '\\aboutus.html');
})


app.get('/Register', (req,res) =>{
    res.sendFile(__dirname + '\\Register.html');

});

app.post('/Register',(req,res)=>{
     console.log(req.body.name + " " +req.body.email + " "+ req.body.password);

    User.findOne({email : req.body.email} , function(err , foundUser){
        if(err)
            console.log(err);
        else{
            if(foundUser){
               // alert("email is already registered")
                res.sendFile(__dirname + "\\Register.html")
            }

        }
    });

 
  const newUser = new User({
    name : req.body.name ,  email : req.body.email , password : req.body.password 
  })


  newUser.save(function(err){
    if (err) {
      console.log(err);
    //   res.send("hello");
    }  else {
      
        res.sendFile(__dirname+ "\\Profile.html");
     
    }
  });
});


app.get('/Login' , (req,res)=>{
    res.sendFile(__dirname + "\\login.html");

})

app.post('/login' , (req,res) =>{
    const username = req.body.username ;
    const password = req.body.Password ;
    console.log(username +" "+password);
    User.findOne({email : username} , function(err , foundUser){
        if(err)
            console.log(err);
        else{
            if(foundUser){
                if(foundUser.password === password)
                    res.sendFile(__dirname + "\\Profile.html");
                else if(err){
                    res.sendFile(__dirname+"\\login.html");
                }
            }

        }
    });
});

app.get('/Home' , (req,res)=>{
    res.sendFile(__dirname + "\\Home.html");
})



app.listen(3000, ()=>{
    console.log('server running at port 3000');
})