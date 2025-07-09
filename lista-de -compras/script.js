let form = document.querySelector("form")
let addItem = document.querySelector("input#item")
let list = document.querySelector("ul.list")
let alertMsg = document.querySelector(".alert")

addItem.focus()

form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    if (addItem.value.trim() === "") return

    // Criando uma nova li quando o formulário for enviado.
    let newItem = document.createElement("li")
    newItem.classList.add("item")

    let checkbox = document.createElement("span")
    checkbox.classList.add("checkbox")

    let itemName = document.createElement("p")
    itemName.classList.add("item-name")
    itemName.textContent = addItem.value

    let trash = document.createElement("span")
    trash.classList.add("trash-bin")
    
    // Adicionando todos os elementos na li.
    newItem.append(checkbox, itemName, trash)

    list.appendChild(newItem)

    addItem.value = ""
    addItem.focus()
})


list.addEventListener("click", (event) => {
    if (event.target.classList.contains("trash-bin")) {
        let item = event.target.closest(".item")
        item.remove()

        alertMsg.classList.add("show-alert")
        return
    }

    if (event.target.classList.contains("item") || event.target.classList.contains("checkbox") || event.target.classList.contains("item-name")) {
        let check = event.target.closest(".item")
        check.classList.toggle("checked")
    }
})

alertMsg.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-msg")) {
        alertMsg.classList.remove("show-alert")
    }
})