// Cotação de moedas do dia.
let USD = 5.63
let EUR = 6.44
let GBP = 7.64

// Obtendo os elementos do formulário.
let form = document.querySelector("form")
let amount = document.getElementById("amount")
let currency = document.getElementById("currency")
let footer = document.querySelector("main footer")
let description = document.getElementById("description")
let result = document.getElementById("result")

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
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = amount * price

        // Verifica se o resultado não é um número.
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        // Formatar o valor total.
        total = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total.
        result.textContent = `${total} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")

    } catch (error) {
        // Rmove a classe do footer removendo ele da tela.
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
    // Converte para número para utilizar o toLocaleString para formatar no padrão BRL.
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}