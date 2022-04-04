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


function mod_button() {

    let button_mod = document.querySelectorAll('.btn-mod')

    for (let i = 0; i < button_mod.length; i++) {
        button_mod[i].addEventListener('click', function () {
            
            let newDiv = document.createElement('div')
            newDiv.setAttribute("class", "form-group")
            newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Modifier le groupe</label><input type="text" name="mod_input" class="form-control" placeholder="Nouveau nom de groupe" id="inputDefault">`

            let newButton = document.createElement("button")
            newButton.setAttribute("class", "btn btn-primary")
            newButton.setAttribute("type", "submit")
            newButton.setAttribute("name", "mod")
            newButton.setAttribute("value", i)
            newButton.innerHTML = `Modifier`
            
            button_mod[i].insertAdjacentElement("afterend", newDiv)
            newDiv.insertAdjacentElement("afterend", newButton)
            
        }, {
            once: true
        })
    }

}

function interactiveDiv() {

    let card = document.querySelectorAll('.card-content')
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', function () {
            document.querySelector('form[action="/listing_tache"]').submit()
        })
    }
}



function pageLoad() {
    mod_button()
    interactiveDiv()
}