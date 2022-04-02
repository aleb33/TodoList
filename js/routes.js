const express = require('express');
const randomstring = require("randomstring");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
let idConnected, idTache, groupTache, gtaches;
app.use(express.static('./source/'));
app.use(express.static('./js/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs")

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

const groupe_tacheSchema = {
  id: String,
  groupe_tache: [{
    id_grp_tache: String,
    name_groupe: String
  }]
}

const tacheSchema = {
  id: String,
  taches: [{
    id_tache: String,
    name_tache: String
  }]
}

const id = mongoose.model("users", idSchema)
const groupe_tache = mongoose.model("groupe_tache", groupe_tacheSchema)
const taches = mongoose.model("taches", tacheSchema)

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

app.get('/listing_groupe', (req, res) => {
  groupe_tache.findOne({
    id: idConnected
  }, function (err, docs) {
    if (err)
      console.log(err)
    else
      groupTache = docs
    res.render("list_group", {
      idConnected,
      groupTache
    })
  })


});

app.get('/listing_tache', (req, res) => {
  taches.findOne({
    id: idTache
  }, function (err, docs) {
    if (err)
      console.log(err)
    else
      gtaches = docs
      idConnected="testGroup@mail.com"
      res.render("list_tache", {
        idConnected,
        gtaches
      })
  })
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

  id.findOne({
    id: email
  }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs == null) {
        res.redirect('/')
      } else {
        idConnected = docs.id
        res.redirect('/listing_groupe')
      }
    }
  });
})




app.post("/formulaire", function (req, res) {

  var email = req.body.email
  var passwrd = req.body.passwrd
  var Cpasswrd = req.body.Cpasswrd
  var Nphone = req.body.phone
  var fName = req.body.fName
  var lName = req.body.lName

  if (!RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email) || Cpasswrd != passwrd) {
    res.sendFile('formulaire.html', {
      root: source,
      mime: 'text/css'
    });
  } else {

    const newId = new id({
      id: email,
      password: passwrd,
      phone: Nphone,
      firstname: fName,
      lastname: lName
    })

    const newGroupTache = new groupe_tache({
      id: email,
      groupe_tache: [{
        id_grp_tache: idConnected + groupTache,
        name_groupe: "test"
      }]
    })

    idTache=idConnected + groupTache;

    const newTaches = new taches({
      id: idTache,
      taches: [{
        id_tache: "tache1",
        name_tache: "test"
      }]
    })

    id.insertMany(newId, function (err) {
      if (err)
        console.log(err)
    })

    groupe_tache.insertMany(newGroupTache, function (err) {
      if (err)
        console.log(err)
    })

    taches.insertMany(newTaches, function (err) {
      if (err)
        console.log(err)
    })

    res.redirect('/')
  }

})

app.post("/listing_group", function (req, res) {

  if (req.body.add_input == "") {
    groupTache.groupe_tache.push({
      id_grp_tache: idConnected + randomstring.generate(5),
      name_groupe: ""
    })
  } else {
    groupTache.groupe_tache.push({
      id_grp_tache: idConnected + req.body.add_input,
      name_groupe: req.body.add_input
    })
  }
  res.redirect("/listing_group")
})

app.post("/listing_tache", function (req, res) {
  
  if (req.body.add_input == "") {
    gtaches.taches.push({
      id_tache: idTache + randomstring.generate(5),
      name_tache: ""
    })
  } else {
    gtaches.taches.push({
      id_tache: idTache + randomstring.generate(5),
      name_tache: req.body.add_input
    })
  }
  //mettre à jour la collection gtaches
  gtaches.updateOne({
    id: "testGroup@mail.comManger"
  }, {
    $set: {
      taches: gtaches.taches
    }
  }, function (err, docs) {
    if (err)
      console.log(err)
    else
      console.log(docs)
  })

  res.redirect("/listing_tache")
})