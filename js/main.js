var prompt = require('prompt-async');
var fs = require('fs');

function lecture_fichier(filename) {
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

async function ajouter_tache(tache) {
    let fichier = lecture_fichier('data.json');
    if (fichier == "") {
        let donnees = '{"tâche 1": ' + '"' + tache + '"}';

        fs.appendFileSync('data.json', donnees, err => {
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
        fs.writeFileSync('data.json', nv_fichJSON, err => {
            if (err) {
                console.error(err)
                return
            }
        })
    }
}


async function supprimer_tache(tache) {
    console.log(tache);
    let fichier = lecture_fichier('data.json');

    let fichJson = JSON.parse(fichier);

    if (fichJson["tâche " + tache] == undefined) {
        return;
    }

    delete fichJson["tâche " + tache];

    cpt = parseInt(tache);
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
    console.log(nv_fichJSON)    
    fs.writeFileSync('data.json', nv_fichJSON, err => {
        if (err) {
            console.error(err)
            return
        }
    })
}

function afficher_bienvenue() {
    console.log("Bienvenue sur ma TODO liste !");
    console.log("1 : lire liste de tâche, 2 : rentrez une tâche, 3 : supprimer tâche");
}

function afficher_tache_rentrer() {
    console.log('Veuillez rentrer la tâche à exécuter : ' + ' ');
}

function afficher_tache_supprimer() {
    console.log("Veuillez rentrer le numéro de tâche souhaitée :");
}

async function menu_accueil() {

    afficher_bienvenue();
    prompt.start();

    result = await prompt.get(['choix']);
    switch (result.choix) {
        case '1':
            liste_tache();
            break;
        case '2':
            prompt.start();
            afficher_tache_rentrer();
            result = await prompt.get(['tache']);
            await ajouter_tache(result.tache);
            liste_tache();
            break;
        case '3':
            liste_tache();
            prompt.start();
            afficher_tache_supprimer();
            result = await prompt.get(['tache']);
            await supprimer_tache(result.tache);
            liste_tache();
            break;
        default:
            menu_accueil();
            break;

    }

}

menu_accueil();