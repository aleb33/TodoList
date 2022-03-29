function add_group() {
    let button_add = document.querySelector('#button-add')

    let newDiv = document.createElement('div')
    newDiv.setAttribute("class", "form-group")
    let newButton = document.createElement("button")
    newButton.setAttribute("class", "btn btn-primary")
    newButton.setAttribute("type", "submit")

    newDiv.innerHTML = `<label class="col-form-label mt-4" for="inputDefault">Groupe</label>
    <input type="text" name="add_input" class="form-control" placeholder="Nom du groupe" id="inputDefault"> 
    `

    newButton.innerHTML = `Ajouter`

    button_add.insertAdjacentElement("afterend", newDiv)
    newDiv.insertAdjacentElement("afterend", newButton)
    

}