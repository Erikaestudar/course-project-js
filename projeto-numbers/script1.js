let form = document.querySelector("form")

let result = document.querySelector(".result")

// INPUTS
let quantityInput = document.querySelector("#quantity")
let fromInput = document.querySelector("#from")
let toInput = document.querySelector("#to")
let switchButton = document.querySelector("#switch")

let valueRegex = /\D+/g

let drawnNumbers = []

let formWrapper = document.querySelector(".form-wrapper")
let textBtn = document.querySelector("button span")
let imgBtn = document.querySelector("button div")


/**/
quantityInput.addEventListener("input", () => {
    quantityInput.value = quantityInput.value.replace(valueRegex, "")
    console.log(quantityInput.value)
})



function randomNumber() {
    let from = Number(fromInput.value)
    let to = Number(toInput.value)
    let qty = Number(quantityInput.value)

    if (from <= 0 || to <= 0 || qty <= 0) {
        alert("[ERRO] Por favor, insira valores numéricos válidos.")
        fromInput.value = ""
        toInput.value = ""
        fromInput.focus()
        return
    }

    if (from >= to) {
        alert("[ERRO] O valor inicial não pode ser maior ou igual ao valor final.")
        fromInput.focus()
        return
    }

    let allPossibilities = to - from + 1

    if (switchButton.checked && drawnNumbers.length >= allPossibilities) {
        alert("Todos os números possíveis já foram sorteados!")
        return
    }

    for ( let i = 0; i < qty; i++) {
        let newNumber

        if (switchButton.checked) {
            // MODO SEM REPETIÇÃO
            if (drawnNumbers.length >= allPossibilities) break
            do {
                newNumber = Math.floor(Math.random() * (to - from + 1)) + from
            } while (drawnNumbers.includes(newNumber))
                drawnNumbers.push(newNumber)
        } else {
            // MODO COM REPETIÇÃO
            newNumber = Math.floor(Math.random() * (to - from + 1)) + from
        }


        let numbersWrapper = document.createElement("div")
        numbersWrapper.classList.add("numbers-wrapper")

        let square = document.createElement("div")
        square.classList.add("square")

        let number = document.createElement("span")
        number.classList.add("number")
        number.textContent = newNumber

        numbersWrapper.append(square, number)
        result.append(numbersWrapper) 
    }
}


function cleanRandomNumber() {
    quantityInput.value = ""
    fromInput.value = ""
    toInput.value = ""
    drawnNumbers = []
}


form.addEventListener("submit", (event) => {
    event.preventDefault()
    randomNumber()

    let subtitle = document.querySelector(".info-wrapper h2")
    subtitle.classList.add("subtitle-prize")
    subtitle.textContent = "resultado do sorteio"

    let paragraph = document.querySelector(".info-wrapper p")
    paragraph.classList.add("paragraph-prize")
    paragraph.textContent =  "resultado"

    closeFormWrapper()
})


function closeFormWrapper() {
    formWrapper.style.display = "none"
    textBtn.classList.add("checked")
    imgBtn.classList.add("checked")
}

