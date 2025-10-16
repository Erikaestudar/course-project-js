const form = document.querySelector("form")
const formResult = document.querySelector(".form-result")

const formWrapper = document.querySelector(".form-wrapper")
const inputs = document.querySelectorAll('[type="text"]')
const quantityInput = document.getElementById("quantity")
const fromInput = document.getElementById("from")
const toInput = document.getElementById("to")
const noRepeat = document.getElementById("switch")


const textBtn = document.querySelector("button span")
const imgBtn = document.querySelector("button div")


// Função para só aceitar números nos inputs.
function onlyNumericInput(inputElement) {
    inputElement.addEventListener("input", () => {
        inputElement.value = inputElement.value.replace(/\D/g, "")
    })
}

// Aplica a função em cada input separadamente.
onlyNumericInput(quantityInput)
onlyNumericInput(fromInput)
onlyNumericInput(toInput)


// Apaga todos os inputs.
function clearAllInputs() {
    inputs.forEach((input) => {
        input.value = ""
    })
    quantityInput.focus()
}

function animationStyle(randomNumber) {
    const numbersWrapper = document.createElement("div")
    numbersWrapper.classList.add("numbers-wrapper")

    const square = document.createElement("div")
    square.classList.add("square")

    const number = document.createElement("span")
    number.classList.add("number")
    number.textContent = randomNumber

    numbersWrapper.append(square, number)
    formResult.append(numbersWrapper)
}

function generateRandomNumbers(qty, from, to, noRepeat) {
    const result = []
    const allPossibilities = to - from + 1

    if (qty <= 0 || from <= 0 || to <= 0) {
        alert("[ERRO] Por favor, insira valores numéricos válidos.")
        clearAllInputs()
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

    if (noRepeat && qty > allPossibilities) {
        alert(`[ERRO] Quantidade insuficiente: você pediu ${qty}, mas só existem ${allPossibilities} números no intervalo.`)
        quantityInput.focus()
        return []
    }

    while (result.length < qty) {
        const newNumber = Math.floor(Math.random() * allPossibilities) + from

        if (noRepeat) {
            if (!result.includes(newNumber)) {
                result.push(newNumber)
            }
        } else {
            result.push(newNumber)
        }
    }
    return result
}


// Abre e Fecha o formulário dos inputs para dar início ao sorteio e altera a animação do botão.
function openCloseFormWrapper(isOpen) {
    const subtitle = document.querySelector(".info-wrapper h2")
    const paragraph = document.querySelector(".info-wrapper p")

    if(isOpen) {
        formWrapper.style.display = "block"
        subtitle.textContent = "Quero sortear:"
        paragraph.textContent = `Defina o intervalo e a quantidade de números, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!`

        subtitle.classList.remove("subtitle-prize")
        paragraph.classList.remove("paragraph-prize")

        textBtn.classList.remove("checked")
        imgBtn.classList.remove("checked")
        textBtn.classList.add("default")
        imgBtn.classList.add("default")
    } else {
        formWrapper.style.display = "none"
        subtitle.textContent = "resultado do sorteio"
        paragraph.textContent = `1° resultado`

        subtitle.classList.add("subtitle-prize")
        paragraph.classList.add("paragraph-prize")

        textBtn.classList.add("checked")
        imgBtn.classList.add("checked")
        textBtn.classList.remove("default")
        imgBtn.classList.remove("default")
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const isFormOpen = formWrapper.style.display !== "none"

    if (isFormOpen) {

        formResult.innerHTML = ""

        const qty = Number(quantityInput.value)
        const from = Number(fromInput.value)
        const to = Number(toInput.value)

        const numbers = generateRandomNumbers(qty, from, to, noRepeat.checked)

        numbers.forEach((randomNumber, index) => {
            setTimeout(() => {
                animationStyle(randomNumber)
            }, 2500 * index)
        })
        clearAllInputs()
        openCloseFormWrapper(false)
    } else {

        formResult.innerHTML = ""
        openCloseFormWrapper(true)
    }  
})