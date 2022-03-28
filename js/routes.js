const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
app.use(express.static('./source/'));
app.use(express.static('./js/'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// connexion à la bdd
const url = 'mongodb+srv://allUser:fuLPFQQiZMDtH3VM@cluster0.6hn6y.mongodb.net/todolist?retryWrites=true&w=majority'
mongoose.connect(url)

const idSchema = {
  id: String,
  password: String,
  phone: Number,
  firstname: String,
  lastname: String
}

const id = mongoose.model("users", idSchema)

// Exemple
// const id1 = new id({
//   id: "test@gmail.com",
//   password: "azerty123",
//   phone: 0404040404,
//   firstname: "etienne",
//   lastname: "montdu"
// })

// id.insertMany(id1, function (err) {
//   if (err)
//     console.log(err)
//   else
//     console.log("Successfully add !")
// })

const source = './source/';


app.get('/', (req, res) => {
  res.sendFile(source + 'index.html', {
    root: source,
    mime: 'text/css'
  });
  //__dirname : It will resolve to your project folder.
});

app.get('/formulaire', (req, res) => {
  res.sendFile('formulaire.html', {
    root: source,
    mime: 'text/css'
  });
  //__dirname : It will resolve to your project folder.
});

app.post('/listing_groupe', (req, res) => {
  res.sendFile('listing_groupe.html', {
    root: source,
    mime: 'text/css'
  });
  //__dirname : It will resolve to your project folder.
});
app.post('/listing_tache', (req, res) => {
  res.sendFile('listing_tache.html', {
    root: source,
    mime: 'text/css'
  });
  //__dirname : It will resolve to your project folder.
});
app.post('/modifier_groupe', (req, res) => {
  res.sendFile('modifier_groupe.html', {
    root: source,
    mime: 'text/css'
  });
  //__dirname : It will resolve to your project folder.
});
app.post('/modifier_tache', (req, res) => {
  res.sendFile('modifier_tache.html', {
    root: source,
    mime: 'text/css'
  });
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);


console.log('Running at Port 3000');


//receive the user data
app.post("/", function (req, res) {
  var email = req.body.email
  var passwrd = req.body.passwrd

  if (!RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
    // case email doesn't work
    errorEmail(window.location.href = "./source/index.html")
  }
  if (!RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/).test(passwrd)) {
    // case pswd doesn't work
    console.log("Pas correct 2")
  }

  id.findOne({
    id: email
  }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("First function call : ", docs);
    }
  });


  res.redirect('/')
})


app.post("/formulaire", function (req, res) {

  var email = req.body.email
  var passwrd = req.body.passwrd
  var Cpasswrd = req.body.Cpasswrd
  var Nphone = req.body.phone
  var fName = req.body.fName
  var lName = req.body.lName


  const newId = new id({
    id: email,
    password: passwrd,
    phone: Nphone,
    firstname: fName,
    lastname: lName
  })

  id.insertMany(newId, function (err) {
    if (err)
      console.log(err)
  })

  res.redirect('/')
})