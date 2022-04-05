function add_tache() {
    let button_add = document.querySelector('#button-add')

    let newDiv = document.createElement('div')
    newDiv.setAttribute("class", "form-group")
    let newButton = document.createElement("button")
    newButton.setAttribute("class", "btn btn-primary")
    newButton.setAttribute("type", "submit")

    newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Tâche</label>
    <input type="text" name="add_input" class="form-control" id="bar" placeholder="Nom de la Tâche" id="inputDefault"> 
    `

    newButton.innerHTML = `Ajouter`

    button_add.insertAdjacentElement("afterend", newDiv)
    newDiv.insertAdjacentElement("afterend", newButton)
}

function mod_button() {

    let button_mod = document.querySelectorAll('.btn-mod')

    for (let i = 0; i < button_mod.length; i++) {
        button_mod[i].addEventListener('click', function () {

            let newDiv = document.createElement('div')
            newDiv.setAttribute("class", "form-group")
            newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Modifier la tâche</label><input type="text" name="mod_input" class="form-control" placeholder="Nouveau nom de tâche" id="inputDefault">`

            let newButton = document.createElement("button")
            newButton.setAttribute("class", "btn btn-primary")
            newButton.setAttribute("type", "submit")
            newButton.innerHTML = `Modifier`

            button_mod[i].insertAdjacentElement("afterend", newDiv)
            newDiv.insertAdjacentElement("afterend", newButton)

        }, {
            once: true
        })
    }

}

function pageLoad() {
    mod_button()
}