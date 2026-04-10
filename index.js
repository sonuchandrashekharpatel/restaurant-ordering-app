import { menuArray } from './data.js'
 
let cart = []
const restoItemsContainer = document.getElementById("resto-items-container")
const checkoutSection = document.getElementById("checkout-section")

document.addEventListener("click", (e) => {
    if(e.target.className === "plus-btn") {
        handlePlusBtnClick(e.target.id)
    }
})

function handlePlusBtnClick(addItemId) {

    const selectedItem = menuArray.filter(item => {
        return item.id === Number(addItemId)
})

    if(!cart.includes(selectedItem[0])){
        cart.push(selectedItem[0])
    }

    if(cart.length > 0) {
        checkoutSection.style.display = "block"
        checkoutSection.innerHTML = getCheckoutHtml(cart)
    }
}

function getItemsHtml() {

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
    return itemsHtml

}

function getCheckoutHtml(itemsCart) {  
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
        <button class="complete-order-btn">Complete Order</button>
    `
    return checkoutHeadingHtml + checkoutItemsHtml + checkoutTotalPriceHtml
}



function getHtml() {
    restoItemsContainer.innerHTML = getItemsHtml()

}

function render() {
    getHtml()
}

render()