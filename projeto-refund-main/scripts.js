// Seleciona os elementos do formulário.
const form = document.querySelector("form")

const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

// Monitora os eventos, observa toda vez que algum conteúdo entra no input.
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos.
    let value = amount.value.replace(/\D/g, "")
    
    // Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50).
    value = Number(value) / 100

    // Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
    console.log(amount.value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL (Real Brasileiro).
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value
}

// Captura o evento de submit do formulário para obter os valores.
form.addEventListener("submit", (event) => {
    event.preventDefault()

    let Expense = capitalize(expense.value)

    // Cria um objeto com os detalhes na nova despesa.
    const newExpense = {
        // Cria um timestamp, um identificador único.
        id: new Date().getTime(),
        expense: Expense,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        // Sinalizar quando a despesa foi criada.
        created_at: new Date(),
    }

    // Chama a função que irá adicionar o item na lista.
    expenseAdd(newExpense)
})

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

function expenseAdd(newExpense) {
    try {
        // Cria o elemento para adicionar o item (li) na lista(ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa.
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa.
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona name e category na div expense-info.
        expenseInfo.append(expenseName, expenseCategory)
   
        // Cria o valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o ícone de remover.
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
       


        expenseList.append(expenseItem)
   
    } catch (error) {
        alert(`Não foi possível atualizar a lista de despesas.`)
        console.log(error)
    }
}