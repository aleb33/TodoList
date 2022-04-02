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

    id.insertMany(newId, function (err) {
      if (err)
        console.log(err)
    })

    res.redirect('/')
  }

})

app.post("/add_group", function (req, res) {

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

  // mettre a jour la collection groupTache dans mongodb
  groupe_tache.updateOne({
    id: idConnected
  }, {
    $set: {
      groupe_tache: groupTache.groupe_tache
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    else
      res.redirect('/listing_groupe')
  })

})


app.post("/mod_group", function (req, res) {

  let indice_arr = req.body.mod
  groupTache.groupe_tache[indice_arr].name_groupe = req.body.mod_input

  // mettre a jour la collection groupTache dans mongodb
  groupe_tache.updateOne({
    id: idConnected
  }, {
    $set: {
      groupe_tache: groupTache.groupe_tache
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    else
      res.redirect('/listing_groupe')
  })

})

// faire la même chose mais pour del_button
app.post("/del_group", function (req, res) {
  
    let id_grp_del = req.body.del
    groupTache.groupe_tache.splice(id_grp_del, 1)
  
    // mettre a jour la collection groupTache dans mongodb
    groupe_tache.updateOne({
      id: idConnected
    }, {
      $set: {
        groupe_tache: groupTache.groupe_tache
      }
    }, function (err, result) {
      if (err)
        console.log(err)
      else
        res.redirect('/listing_groupe')
    })
  
  })
