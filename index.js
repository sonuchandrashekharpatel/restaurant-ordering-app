import { menuArray } from './data.js'
 
let cart = []
const restoItemsContainer = document.getElementById("resto-items-container")
const checkoutSection = document.getElementById("checkout-section")
const checkoutModal = document.getElementById("checkout-modal")
const orderCompleteSection = document.getElementById("order-complete-section")

document.addEventListener("click", (e) => {

    if(e.target.className === "plus-btn") {
        handlePlusBtnClick(e.target.id)
    }
    else if(e.target.className === "remove-btn") {
        handleRemoveBtnClick(e.target.id)
    }
    else if(e.target.id === "complete-order-btn") {

        handleCompleteOrderBtnClick()
    } else if(e.target.id === "pay-btn") {
        handlePayBtnClick()
    }
})

function handlePayBtnClick() {
    checkoutModal.style.display = 'none'
    checkoutSection.style.display = "none"

    const messageDiv = document.createElement("div")
    messageDiv.className = "order-complete-section"
    messageDiv.textContent = `Thanks, Sonu! Your order is on it's way!`
    orderCompleteSection.appendChild(messageDiv)
    console.log(orderCompleteSection)
    orderCompleteSection.style.display = "block"

}

function handleCompleteOrderBtnClick() {
    checkoutModal.style.display = "block"
    renderCheckoutModal()
}

function renderCheckoutModal() {
    checkoutModal.innerHTML = `
        <h3 class="modal-heading">Enter card details</h3>
        <form>
            <input 
                type="text"
                placeholder="Enter your name"
                name="username"
                aria-label="Enter your name"
                id="name"
                required
            >
            <input 
                type="text"
                placeholder="Enter card number"
                aria-label="Enter card number"
                name="card-number"
                pattern="\d{16}"
                id="card-number"
                required
            >
            <input 
                type="text"
                placeholder="Enter CVV"
                aria-label="Enter CVV"
                name="cvv"
                id="cvv"
                pattern="\d{3}"
                required
            >
            <button class="pay-btn" id="pay-btn">Pay</button>
        </form>
    `
}

function handleRemoveBtnClick(removeItemId) {

    cart = cart.filter(item => {
        return item.id !== Number(removeItemId)
    })
    if(cart.length > 0) {
        renderCheckoutHtml(cart)
    } else {
        checkoutSection.style.display = "none"
    }
}

function handlePlusBtnClick(addItemId) {

    const selectedItem = menuArray.filter(item => {
        return item.id === Number(addItemId)
})

    if(!cart.includes(selectedItem[0])){
        cart.push(selectedItem[0])
    }

    if(cart.length > 0) {
        checkoutSection.style.display = "block"
        renderCheckoutHtml(cart)
    }
}

function renderItemsHtml() {

    const itemsHtml = menuArray.map(menu => {
        
        const menuIngredients =  menu.ingredients.map(ingredient => ingredient).join(',')

        return `
            <section class="item-section">
                <h2 class="item">${menu.emoji}</h2>

                <div class="item-info">
                    <h2 class="item-name">${menu.name}</h2>
                    <p class="item-ingredients">${menuIngredients}</p>
                    <h4 class="item-price">$${menu.price}</h4>
                </div>
                <div class="btn-container">
                    <button class="plus-btn" id=${menu.id}>+</button>
                </div>

            </section>
        `
    }).join('')
    restoItemsContainer.innerHTML = itemsHtml

}

function renderCheckoutHtml(itemsCart) {  
    const checkoutHeadingHtml = `<h2 class="checkout-heading">Your order</h2>`

    let totalPrice = 0
    const checkoutItemsHtml = itemsCart.map(item => {
        totalPrice += item.price 
        return `
            <div class="checkout-items-container flex">
                <div class="flex">
                    <h2>${item.name}</h2>
                    <button class="remove-btn" id="${item.id}">remove</button>
                </div>
                <h4>$${item.price}</h4>
            </div>
        `
    }).join('')

    const checkoutTotalPriceHtml = `
        <div class="checkout-total-price flex">
            <h2>Total Price: </h2>
            <h4>$${totalPrice}</h4>
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
    `
    checkoutSection.innerHTML = checkoutHeadingHtml + checkoutItemsHtml + checkoutTotalPriceHtml
}

renderItemsHtml()
