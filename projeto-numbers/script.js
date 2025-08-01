let form = document.querySelector("form")

let quantity = document.querySelector("#quantity")



form.addEventListener("submit", (event) => {
    event.defaultPrevented()

    
})

quantity.addEventListener("input", (event) => {
    let num = quantity.value
    console.log(num)
})