const express = require('express');
const randomstring = require("randomstring");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
let idConnected, idTache, groupTache, gtaches, gtaches_done, nom_Groupe_actuel;
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
  phone: String,
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
    name_tache: String,
    done: Boolean
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
    gtaches_done = {
      id: idTache,
      taches: []
    }

    gtaches_done.taches = gtaches.taches.filter(obj => (obj.done) == true);


    res.render("list_tache", {
      idConnected,
      gtaches,
      nom_Groupe_actuel,
      gtaches_done
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
    id: email,
    password: passwrd
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

  var RegEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  var RegPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  var RegPhone = new RegExp(/^[0-9]{10}$/)

  if (!RegEmail.test(email) || Cpasswrd != passwrd || !RegPhone.test(Nphone) || fName == "" || lName == "" || email == "" || !RegPassword.test(passwrd)) {
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

    const newGroupe_tache = new groupe_tache({
      id: email,
      groupe_tache: []
    })

    id.insertMany(newId, function (err) {
      if (err)
        console.log(err)
    })

    groupe_tache.insertMany(newGroupe_tache, function (err) {
      if (err)
        console.log(err)
    })

    res.redirect('/')
  }

})

app.post("/add_group", function (req, res) {

  let id_gr_tache = idConnected + randomstring.generate(5)
  groupTache.groupe_tache.push({
    id_grp_tache: id_gr_tache,
    name_groupe: req.body.add_input
  })

  const newTaches = new taches({
    id: id_gr_tache,
    taches: []
  })

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
      taches.insertMany(newTaches, function (err) {
        if (err)
          console.log(err)
      })

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
      res.redirect("/listing_groupe")
  })

})

app.post("/del_group", function (req, res) {

  let id_grp_del = req.body.del
  let id_taches = groupTache.groupe_tache[req.body.del].id_grp_tache

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
      taches.deleteOne({
        id: id_taches
      }, function (err, result) {
        if (err)
          console.log(err)
        else
          res.redirect('/listing_groupe')
      })
  })
})



app.post("/listing_tache", function (req, res) {
  idTache = req.body.IDtache
  nom_Groupe_actuel = req.body.nameTache
  taches.findOne({
    id: idTache
  }, function (err, docs) {
    if (err)
      console.log(err)
    else
    if (docs == null) {
      res.redirect("/listing_groupe")
    } else {
      gtaches = docs
      res.redirect('/listing_tache')
    }

  })

})

//fais la meme chose mais pour add_tache
app.post("/add_tache", function (req, res) {
  let name_tache = req.body.add_input

  taches.findOne({
    id: idTache
  }, function (err, docs) {
    if (err)
      console.log(err)
    else
    if (docs == null) {
      res.redirect("/listing_tache")
    } else {
      docs.taches.push({
        id_tache: idTache + randomstring.generate(5),
        name_tache: name_tache,
        done: false
      })

      taches.updateOne({
        id: idTache
      }, {
        $set: {
          taches: docs.taches
        }
      }, function (err, result) {
        if (err)
          console.log(err)
        else
          res.redirect('/listing_tache')
      })
    }
  })

})

// faire la même chose mais pour del_tache
app.post("/del_tache", function (req, res) {
  let id_tache_del = req.body.del;

  gtaches.taches.splice(id_tache_del, 1)
  //mettre à jour la collection gtaches dans mongodb
  taches.updateOne({
    id: idTache
  }, {
    $set: {
      taches: gtaches.taches
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    else
      res.redirect('/listing_tache')
  })
})

app.post("/mod_tache", function (req, res) {
  let indice_arr = req.body.mod
  gtaches.taches[indice_arr].name_tache = req.body.mod_input
  if (gtaches.taches[indice_arr].name_tache == "") {
    gtaches.taches.splice(indice_arr, 1)
  }
  //mettre à jour la collection gtaches dans mongodb
  taches.updateOne({
    id: idTache
  }, {
    $set: {
      taches: gtaches.taches
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    else
      res.redirect('/listing_tache')
  })
})


app.post('/return_groupe', function (req, res) {
  res.redirect('/listing_groupe')

})


app.post('/done_tache', function (req, res) {
  let ind_done = req.body.done;
  gtaches.taches[ind_done].done = true;

  gtaches_done.taches.push(ind_done);

  taches.updateOne({
    id: idTache
  }, {
    $set: {
      taches: gtaches.taches
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    else
      res.redirect('/listing_tache')
  })
})

app.post('/undone_tache', function (req, res) {
  let ind_undone = req.body.undone;

  gtaches.taches.find(element => element.name_tache == gtaches_done.taches[ind_undone].name_tache).done = false;

  
  gtaches_done.taches.splice(ind_undone, 1)

  taches.updateOne({
    id: idTache
  }, {
    $set: {
      taches: gtaches.taches
    }
  }, function (err, result) {
    if (err)
      console.log(err)
    else
      res.redirect('/listing_tache')
  })
})