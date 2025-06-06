let form = document.querySelector("form")
let addItem = document.querySelector("input#item")

let list = document.querySelector("ul.list")

let alertMsg = document.querySelector(".alert")
let closeAlert = document.querySelector("img#close-msg")


form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    if (addItem.value.trim() === "") return

    // Criando uma nova li quando o formulário for enviado.
    let newItem = document.createElement("li")
    newItem.classList.add("show-result")

    let checkbox = document.createElement("span")
    checkbox.classList.add("checkbox")

    let itemName = document.createElement("p")
    itemName.classList.add("item-name")
    itemName.textContent = addItem.value

    let trash = document.createElement("span")
    trash.classList.add("trash-bin")
    
    // Adicionando todos os elementos na li.
    newItem.appendChild(checkbox)
    newItem.appendChild(itemName)
    newItem.appendChild(trash)

    list.appendChild(newItem)

    addItem.value = ""
    addItem.focus()

    newItem.addEventListener("click", () => {
        newItem.classList.toggle("checked")
    })

    trash.addEventListener("click", (event) => {
        event.stopPropagation()
        list.removeChild(newItem)
        alertMsg.classList.add("show-alert")
    })
})


closeAlert.addEventListener("click", () => {
    alertMsg.classList.remove("show-alert")
})