const express = require('express');
const app = express();
const router = express.Router();
app.use(express.static('./source/'));
const source='./source/';


app.get('/',(req,res) => {
  res.sendFile(source+'index.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});

app.get('/formulaire',(req,res) => {
  res.sendFile('formulaire.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});

app.get('/listing_groupe',(req,res) => {
  res.sendFile('listing_groupe.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
app.get('/listing_tache',(req,res) => {
  res.sendFile('listing_tache.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
app.get('/modifier_groupe',(req,res) => {
  res.sendFile('modifier_groupe.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
app.get('/modifier_tache',(req,res) => {
  res.sendFile('modifier_tache.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');