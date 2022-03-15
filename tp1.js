function lecture_fichier(filename){
    var fs = require('fs');
    let fichier = fs.readFileSync(filename, {
        encoding: 'utf8',
        flag: 'r+'
    });
    return fichier; 
}

function liste_tache() {

    let fichier = lecture_fichier('data.json');
    if (fichier == "") {
        console.log("Aucune tâche est enregistré");
        return;
    }

    var monJson = JSON.parse(fichier);

    for (i in monJson) {
        console.log(i + " -> " + monJson[i]);
    }

}

function ajouter_tache(tache) {
    var fs = require('fs')
    let fichier = lecture_fichier('data.json');
    if (fichier == "") {
        let donnees = '{"tâche 1": ' + '"' + tache + '"}';

        fs.appendFile('data.json', donnees, err => {
            if (err) {
                console.error(err)
                return
            }   
        });

    } else {
        let fichJson = JSON.parse(fichier);

        cpt = 1;
        for (var key in fichJson) {
            if (fichJson.hasOwnProperty(key)) {
                cpt += 1;
            }
        }

        fichJson["tâche " + cpt] = tache;
        let nv_fichJSON = JSON.stringify(fichJson);
        fs.writeFile('data.json', nv_fichJSON, err => {
            if (err) {
              console.error(err)
              return
            }
        })
        console.log(lecture_fichier("data.json"))
    }
}

function supprimer_tache() {
    let fichier = lecture_fichier('data.json');
    var choice = require('prompt');
    choice.start();

    console.log("Veuillez rentrer le numéro de tâche souhaitée :");
    choice.get(['choix'], function (err, result) {
        if (err) throw err

        let fichJson = JSON.parse(data);

        if (fichJson["tâche " + result.choix] == undefined) {
            return;
        }

        delete fichJson["tâche " + result.choix];

        cpt = parseInt(result.choix);
        cpt_sup = parseInt(cpt) + 1;
        elt_sup = `tâche ${cpt_sup}`;
        elt = `tâche ${cpt}`;
        while (fichJson[elt_sup] != undefined) {
            var temp = fichJson[elt_sup];
            fichJson[elt] = temp;
            delete fichJson[elt_sup];
            cpt++;
            cpt_sup++;
            elt = `tâche ${cpt}`;
            elt_sup = `tâche ${cpt_sup}`;
        }

        let nv_fichJSON = JSON.stringify(fichJson);
        console.log(nv_fichJSON);
        fs.writeFile('data.json', nv_fichJSON, {
            flag: 'w'
        }, err => {});

    });

}


function menu_accueil() {

    console.log("Bienvenue sur ma TODO liste !");
    console.log("1 : lire liste de tâche, 2 : rentrez une tâche, 3 : supprimer tâche");
    var choice = require('prompt');
    choice.start();

    choice.get(['choix'], function (err, result) {
        if (err) throw err;
        if (result.choix == 1) { // afficher tache

            liste_tache();
        } else if (result.choix == 2) { // ajout tache
            var choice = require('prompt');
            choice.start();
            console.log('Veuillez rentrer la tâche à exécuter : ' + ' ');
            choice.get(['tache'], function (err, result) {
                if (err) throw err;
                ajouter_tache(result.tache);
                liste_tache();
            });

        } else if (result.choix == 3) { // suppresion tache
            liste_tache();
            supprimer_tache();
        } else {
            menu_accueil();
            // rediriger ici
        }
    });

}

menu_accueil();