const form = document.querySelector("form")
const inputs = document.querySelectorAll('input[type="text"]')

// Captura os inputs individualmente
const quantityInput = document.querySelector("#quantity")
quantityInput.focus()
const fromInput = document.querySelector("#from")
const toInput = document.querySelector("#to")
const switchButton = document.querySelector("#switch")

const result = document.querySelector(".result")

// Animação durante o sorteio
const formWrapper = document.querySelector(".form-wrapper")
const textBtn = document.querySelector("button span")
const imgBtn = document.querySelector("button div")


let drawnNumbers = []

// Função para só aceitar números nos inputs
function onlyNumericInput(inputElement) {
    inputElement.addEventListener('input', () => {
        inputElement.value = inputElement.value.replace(/\D/g, "")
    })
}

// Aplica a função em cada input separadamente
onlyNumericInput(quantityInput)
onlyNumericInput(fromInput)
onlyNumericInput(toInput)

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const qty = Number(quantityInput.value)
    const from = Number(fromInput.value)
    const to = Number(toInput.value)

    if (from <= 0 || to <= 0 || qty <= 0) {
        alert("[ERRO] Por favor, insira valores numéricos válidos.")
        fromInput.value = ""
        toInput.value = ""
        quantityInput.value = 1
        fromInput.focus()
        return
    }

    if (from >= to) {
        alert("[ERRO] O valor inicial (DE) não pode ser maior ou igual ao valor final (ATÉ).")
        toInput.value = ""
        toInput.focus()
        return
    } 

    const allPossibilities = to - from + 1

    if (switchButton.checked && drawnNumbers.length >= allPossibilities) {
        clearAllInputs()
        openFormWrapper()
        quantityInput.focus()
        return
    }

    for ( let i = 0; i < qty; i++ ) {
        let newNumber

        if (switchButton.checked) {
            // MODO SEM REPETIÇÃO
            if (drawnNumbers.length >= allPossibilities) break
            do {
                newNumber = Math.floor(Math.random() * (to - from + 1)) + from
            } while (drawnNumbers.includes(newNumber))
                drawnNumbers.push(newNumber)
                randomNumberStyle(newNumber)
                closeFormWrapper()

        } else {
            // MODO COM REPETIÇÃO
            newNumber = Math.floor(Math.random() * (to - from + 1)) + from
            randomNumberStyle(newNumber)
            closeFormWrapper()
        }
    }  
})

function clearAllInputs() {
    inputs.forEach((input) => {
        input.value = ""
        quantityInput.focus()
    })
}

function randomNumberStyle(randomNumber) {
    const numbersWrapper = document.createElement("div")
    numbersWrapper.classList.add("numbers-wrapper")

    const square = document.createElement("div")
    square.classList.add("square")

    const number = document.createElement("span")
    number.classList.add("number")
    number.textContent = randomNumber

    numbersWrapper.append(square, number)
    result.append(numbersWrapper)
}

// Fecha o formulário dos inputs para dar inicio a animação do sorteio.
function closeFormWrapper() {
    formWrapper.style.display = "none"
    textBtn.classList.add("checked")
    imgBtn.classList.add("checked")

    
    let subtitle = document.querySelector(".info-wrapper h2")
    subtitle.classList.add("subtitle-prize")
    subtitle.textContent = "resultado do sorteio"

    let paragraph = document.querySelector(".info-wrapper p")
    paragraph.classList.add("paragraph-prize")
    paragraph.textContent =  "1° resultado"
}

// Abre o formulário para fazer um novo sorteio
function openFormWrapper() {
    formWrapper.style.display = "block"
    textBtn.classList.remove("checked")
    imgBtn.classList.remove("checked")
    result.textContent = ""
    drawnNumbers = []

    
    let subtitle = document.querySelector(".info-wrapper h2")
    subtitle.classList.remove("subtitle-prize")
    subtitle.textContent = "Quero sortear:"

    let paragraph = document.querySelector(".info-wrapper p")
    paragraph.classList.remove("paragraph-prize")
    paragraph.textContent =  `Defina o intervalo e a quantidade de números, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!`
}