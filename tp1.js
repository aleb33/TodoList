function liste_tache() {
    var fs = require('fs');
    let fichier = fs.readFileSync('data.json');

    if (fichier == "") {
        console.log("Aucune tâche est enregistré");
        return;
    }

    var monJson = JSON.parse(fichier);

    for (i in monJson) {
        console.log(i + " -> " + monJson[i]);
    }

}

async function ajouter_tache() {
    var fs = require('fs');
    let fichier = fs.readFileSync('data.json', {
        encoding: 'utf8',
        flag: 'r+'
    });
    var choice = require('prompt');
    choice.start();
    console.log('Veuillez rentrer la tâche à exécuter : ' + ' ')

    if (fichier == "") {

        choice.get(['choix'], function (err, result) {
            if (err) throw err;
            var deb = "{";
            var fin = "}";
            fs.appendFile('data.json', deb, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            });
            let donnees = '"tâche 1": ' + '"' + result.choix + '"';
            console.log(donnees);

            fs.appendFile('data.json', donnees, err => {
                if (err) {
                    console.error(err)
                    return
                }
                // file written successfully
                fs.appendFile('data.json', fin, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                    liste_tache();
                });
            });

        });

    } else {
        choice.get(['choix'], function (err, result) {
            if (err) throw err

            let fichJson = JSON.parse(fichier);

            cpt = 1;
            for (var key in fichJson) {
                if (fichJson.hasOwnProperty(key)) {
                    cpt += 1;
                }
            }
            fichJson["tâche " + cpt] = result.choix;

            let nv_fichJSON = JSON.stringify(fichJson);

            fs.writeFile('data.json', nv_fichJSON, {
                flag: 'w'
            }, err => {});

        });
    }
}

function supprimer_tache() {
    var fs = require('fs');
    const data = fs.readFileSync('data.json', {
        encoding: 'utf8',
        flag: 'r'
    });
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

        fs.writeFile('data.json', nv_fichJSON, {
            flag: 'w'
        }, err => {});

    });

}


async function menu_accueil() {

    const fs = require('fs');

    fs.open('data.json', "a+", function (err) {
        if (err) throw err;
    });

    console.log("Bienvenue sur ma TODO liste !");
    console.log("1 : lire liste de tâche, 2 : rentrez une tâche, 3 : supprimer tâche");
    var choice = require('prompt');
    choice.start();

    choice.get(['choix'], function (err, result) {
        if (err) throw err;
        if (result.choix == 1) {
            liste_tache();
        } else if (result.choix == 2) {
            ajouter_tache();
        } else if (result.choix == 3) {
            liste_tache();
            supprimer_tache();
        } else {
            menu_accueil();
            // rediriger ici
        }
    });

}

menu_accueil();