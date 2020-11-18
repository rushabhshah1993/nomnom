const fetchId = () => {
    let paramsString = window.location.search.slice(1);
    let paramsArr = paramsString.split('&');
    let id = paramsArr
            .find(param => param.split('=')[0] === 'id')
            .split('=')[1];
    return id;
}

let id = fetchId();
let request = new XMLHttpRequest();
request.open('GET', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, true);
request.send();
request.onreadystatechange = function() {
    if(this.readyState === 2) {
        document.querySelector(".loading").style.display = "block";
        document.title = "Nom Nom | Loading...";
    }
    if(this.readyState === 4 && this.status === 200) {
        document.querySelector(".details").style.display = "grid";
        document.querySelector(".details").style.gridTemplateColumns = "30% 70%";
        document.querySelector(".loading").style.display = "none";
        addRecipeDetails(JSON.parse(this.responseText).meals[0]);
    } else if(this.readyState === 4 && this.status !== 200) {
        handleNetworkFailure();
    }
}

const goToHome = () => window.location.href = "/";

const addRecipeDetails = response => {
    document.title = `Nom Nom | ${response.strMeal}`;
    document.querySelector(".recipe-title").innerHTML = response.strMeal;
    document.querySelector(".video").setAttribute('src', response.strYoutube.replace("watch?v=", "embed/")); 
    let ingredientsList = document.querySelector(".ingredients-list");
    let ingredients = getIngredients(response);
    for(let ingredient of ingredients) {
        let listElement = document.createElement('li');
        listElement.innerHTML = ingredient;
        ingredientsList.appendChild(listElement);
    }
    document.querySelector(".instruction").innerHTML = response.strInstructions;
}

const handleNetworkFailure = () => {
    document.querySelector(".recipe-details-container").style.display = "none";
    document.querySelector(".error").style.display = "block";
}

const getIngredients = response => {
    let ingredients = [],
        measurements = [],
        ingredientsWithMeasurements = [];
    for(let key in response) {
        if(key.includes("strIngredient") && response[key].length > 0)
            ingredients.push(response[key]);
        if(key.includes("Measure") && response[key].length > 0 && response[key] !== " ")
            measurements.push(response[key]);
    }

    for(let index in ingredients) {
        ingredientsWithMeasurements.push(`${ingredients[index]} (${measurements[index]})`);
    }

    return ingredientsWithMeasurements;
}
