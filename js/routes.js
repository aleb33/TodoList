const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const router = express.Router();
app.use(express.static('./source/'));
app.use(express.static('./js/'));
app.use(bodyParser.urlencoded({extended : true}));

const source='./source/';


app.get('/',(req,res) => {
  res.sendFile(source+'index.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});

app.get('/formulaire',(req,res) => {
  res.sendFile('formulaire.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});

app.post('/listing_groupe',(req,res) => {
  res.sendFile('listing_groupe.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
app.post('/listing_tache',(req,res) => {
  res.sendFile('listing_tache.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
app.post('/modifier_groupe',(req,res) => {
  res.sendFile('modifier_groupe.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
app.post('/modifier_tache',(req,res) => {
  res.sendFile('modifier_tache.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);


console.log('Running at Port 3000');



//receive the user data
app.post("/", function(req, res){
  var email = req.body.email
  var passwrd = req.body.passwrd

  if (!RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)){
    console.log("Pas correct")
  }  
  if (!RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/).test(passwrd)){
    console.log("Pas correct 2")
  }

  


  res.redirect('/')
})