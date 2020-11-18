let request = new XMLHttpRequest();
request.open('GET', 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta', true);
request.send();
request.onreadystatechange = function() {
    if(this.readyState === 2) {
        document.querySelector(".loading").style.display = 'block';
    }
    if(this.readyState === 4 && this.status === 200) {
        document.querySelector(".loading").style.display = 'none';
        createRecipeCards(JSON.parse(this.responseText).meals);
    } else if(this.readyState === 4 && this.status !== 200) {
        handleNetworkFailure();
    }
}

const createRecipeCards = list => {
    let recipesContainer = document.querySelector(".recipes");
    for(let recipe of list) {
        let recipeCard = document.createElement('div');
        recipeCard.setAttribute("id", recipe.idMeal);
        recipeCard.setAttribute("class", "recipe-card");
        let recipeImg = document.createElement("img");
        recipeImg.setAttribute("src", recipe.strMealThumb);
        recipeImg.setAttribute("class", "recipe-img");
        recipeImg.setAttribute("alt", recipe.strMeal);
        recipeCard.appendChild(recipeImg);
        let recipeTitle = document.createElement("p");
        recipeTitle.setAttribute("class", "recipe-title");
        recipeTitle.innerHTML = recipe.strMeal;
        recipeCard.appendChild(recipeTitle);
        recipesContainer.appendChild(recipeCard);

        recipeCard.onclick = () => viewRecipe(recipe.idMeal);
    }
}

const handleNetworkFailure = () => {
    document.querySelector(".recipes-container").style.display = "none";
    document.querySelector(".error").style.display = "block";
}


const viewRecipe = id => window.location.href = `recipe-detail.html?id=${id}`;
