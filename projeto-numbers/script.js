let form = document.querySelector("form")

let number = document.querySelector(".number")

let inputs = document.querySelectorAll('input[type="text"]')

let result = document.querySelector(".result")

inputs.forEach((input) => {
    input.addEventListener("input", () => {
    
    let valueRegex = /\D+/g
    input.value = input.value.replace(valueRegex, "")

    if (input.value !== "") {
        styleNumber(input.value)
        
        /*
        let numbersWrapper = document.createElement("div")
        numbersWrapper.classList.add("numbers-wrapper")

        let square = document.createElement("div")
        square.classList.add("square")

        let number = document.createElement("span")
        number.classList.add("number")
        number.textContent = input.value
            
        numbersWrapper.append(square, number)
        result.append(numbersWrapper)
        */
    }
    })
})

form.addEventListener("submit", (event) => {
    event.preventDefault()



})

function styleNumber() {
        let numbersWrapper = document.createElement("div")
        numbersWrapper.classList.add("numbers-wrapper")

        let square = document.createElement("div")
        square.classList.add("square")

        let number = document.createElement("span")
        number.classList.add("number")

            
        numbersWrapper.append(square, number)
        result.append(numbersWrapper)
}

/*
quantity.addEventListener("input", (event) => {
    let num = quantity.value
    console.log(num)
})
    */

