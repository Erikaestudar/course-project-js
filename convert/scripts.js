// Cotação de moedas do dia.
let USD = 5.63
let EUR = 6.44
let GBP = 7.64

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

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    console.log(amount, price, symbol)
}