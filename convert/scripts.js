// Obtendo os elementos do formulário.
let form = document.querySelector("form")
let amount = document.getElementById("amount")
let currency = document.getElementById("currency")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    let hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
    event.preventDefault()

    console.log(currency.value)
}
