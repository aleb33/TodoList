function add_group() {
    let button_add = document.querySelector('#button-add')

    let newDiv = document.createElement('div')
    newDiv.setAttribute("class", "form-group")
    let newButton = document.createElement("button")
    newButton.setAttribute("class", "btn btn-primary")
    newButton.setAttribute("type", "submit")
    newButton.setAttribute("name", "add_input_groupe")

    newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Groupe</label>
    <input type="text" name="add_input" class="form-control" placeholder="Nom du groupe" id="inputDefault"> 
    `

    newButton.innerHTML = `Ajouter`

    button_add.insertAdjacentElement("afterend", newDiv)
    newDiv.insertAdjacentElement("afterend", newButton)


}


function mod_button(i) {

    let button_mod = document.querySelectorAll('.btn-mod')


    button_mod[i].addEventListener('click', function () {
        //creer une nouvelle div avec comme attribut une classe form-group et un input et un bouton
        let newDiv = document.createElement('div')
        newDiv.setAttribute("class", "form-group")
        let newButton = document.createElement("button")
        newButton.setAttribute("class", "btn btn-primary")
        newButton.setAttribute("type", "submit")
        newButton.setAttribute("name", "mod")
        newButton.setAttribute("value", i)
        newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Modifier le groupe</label>
    <input type="text" name="mod_input" class="form-control" placeholder="Nouveau nom de groupe" id="inputDefault"> 
    `
        newButton.innerHTML = `Modifier`
        // ajouter le bouton au dernier element de la div
        button_mod[i].insertAdjacentElement("afterend", newDiv)
        newDiv.insertAdjacentElement("afterend", newButton)

    })

}

// fais la meme fonction que mod_button
function del_button(i) {

    let button_del = document.querySelectorAll('.btn-del')

    button_del[i].addEventListener('click', function () {

        let newDiv = document.createElement('div')
        newDiv.setAttribute("class", "form-group")
        let newButton = document.createElement("button")
        newButton.setAttribute("class", "btn btn-primary")
        newButton.setAttribute("type", "submit")
        newButton.innerHTML = `Supprimer`
        // ajouter le bouton au dernier element de la div
        button_del[i].insertAdjacentElement("afterend", newDiv)
        newDiv.insertAdjacentElement("afterend", newButton)

    })

}