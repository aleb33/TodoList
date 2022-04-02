function add_tache() {
    let button_add = document.querySelector('#button-add')

    let newDiv = document.createElement('div')
    newDiv.setAttribute("class", "form-group")
    let newButton = document.createElement("button")
    newButton.setAttribute("class", "btn btn-primary")
    newButton.setAttribute("type", "submit")

    newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Tâche</label>
    <input type="text" name="add_input" class="form-control" placeholder="Nom de la Tâche" id="inputDefault"> 
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
        newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Modifier tâche</label>
    <input type="text" name="mod_input" class="form-control" placeholder="Nouvelle tâche" id="inputDefault"> 
    `
        newButton.innerHTML = `Modifier`
        // ajouter le bouton au dernier element de la div
        button_mod[i].insertAdjacentElement("afterend", newDiv)
        newDiv.insertAdjacentElement("afterend", newButton)

    })

}
