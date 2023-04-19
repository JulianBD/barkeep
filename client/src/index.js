"use strict";

const orders = [
    {
        "drink": "Old Fashioned",
        "firstName": "Julian",
        "lastName": "Dorsey",
        "time": new Date()
    },
    {
        "drink": "French 75",
        "firstName": "Laura",
        "lastName": "Nugent",
        "time": new Date()
    },
    {
        "drink": "Manhattan",
        "firstName": "Sheridan",
        "lastName": "Carty",
        "time": new Date()
    }
]

const recipes = {
    "Old Fashioned": {
        ingredients: [
            "1 teaspoon sugar",
            "3 dashes Angostura bitters",
            "1 teaspoon water",
            "2 ounces bourbon (or rye whiskey, if preferred)",
            "Garnish: orange twist"
        ],
        steps: [
            "Add the sugar and bitters into a mixing glass, then add the water, and stir until the sugar is nearly dissolved.",
            "Fill the mixing glass with ice, add the bourbon, and stir until well-chilled.",
            "Strain into a rocks glass over one large ice cube.",
            "Express the oil of an orange twist over the glass, then drop into the glass to garnish."
        ]
    },
    "French 75": {
        ingredients: [
            "1 ounce gin",
            "1/2 ounce lemon juice, freshly squeezed",
            "1/2 ounce simple syrup",
            "3 ounces Champagne (or other sparkling wine)",
            "Garnish: lemon twist",
        ],
        steps: [
            "Add the gin, lemon juice and simple syrup to a shaker with ice and shake until well-chilled.",
            "Strain into a Champagne flute.",
            "Top with the Champagne.",
            "Garnish with a lemon twist."  
        ]
    },
    "Manhattan": {
        ingredients: [
            "2 ounces rye whiskey",
            "1 ounce sweet vermouth",
            "2 dashes Angostura bitters",
            "Garnish: brandied cherry (or lemon twist, if preferred)"
        ],
        steps: [
            "Add the rye whiskey, sweet vermouth, and bitters into a mixing glass with ice and stir until well-chilled.",
            "Strain into a chilled Nick & Nora or coupe glass.",
            "Garnish with a brandied cherry (or a lemon twist, if preferred)."
        ]
    }
}

const formatTime = (date) => {
    return date.toLocaleTimeString();
}

const renderOrders = (orderList) => {
    //const orderList = document.getElementById("orders-list");

    orders.map(order => {
        let listElement = document.createElement("li");
        let orderDiv = document.createElement("div");
        orderDiv.classList.add("order")
        let orderString = document.createElement("p");
        orderString.classList.add("order-details")
        let drinkLink = document.createElement("a");
        drinkLink.classList.add("recipe-toggle")
        drinkLink.textContent = order.drink;
        drinkLink.href="#"
        orderString.appendChild(drinkLink);
        orderString.innerHTML += ` ${order.firstName} ${order.lastName[0].toUpperCase()}. ${formatTime(order.time)}`
        orderDiv.appendChild(orderString);
        
        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.classList.add("hidden");
        let ingredientsHeading = document.createElement("p");
        ingredientsHeading.classList.add("ingredients-heading");
        let stepsHeading = document.createElement("p");
        stepsHeading.classList.add("steps-heading")
        ingredientsHeading.textContent = "Ingredients";
        stepsHeading.textContent = "Steps";
        let ingredientsList = document.createElement("ul");
        ingredientsList.classList.add("ingredients-list")
        let stepsList = document.createElement("ol");
        stepsList.classList.add("steps-list");
        let recipe = recipes[order.drink];
        try {
            recipe.ingredients.map(ingredient => {
                let ingredientText = document.createElement("li");
                ingredientText.textContent = ingredient;
                ingredientsList.appendChild(ingredientText);
            })
            recipe.steps.map(step => {
                let stepText = document.createElement("li");
                stepText.textContent = step;
                stepsList.appendChild(stepText);
            }) 
        } catch {

        }

        recipeDiv.appendChild(ingredientsHeading);
        recipeDiv.appendChild(ingredientsList);
        recipeDiv.appendChild(stepsHeading);
        recipeDiv.appendChild(stepsList);


        listElement.appendChild(orderDiv);
        listElement.appendChild(recipeDiv);
        orderList.appendChild(listElement);
    })
}

window.addEventListener("DOMContentLoaded", () => {

    const orders = document.getElementById("orders-list");
    renderOrders(orders);
    orders.addEventListener('click', (e) => {
        if(e.target.classList.contains('recipe-toggle')) {
            let recipe = e.target.parentElement.parentElement.nextSibling;
            recipe.classList.toggle("hidden");
        }
    });
});