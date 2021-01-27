require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const ax = require('axios');
const port = 3000;

// init app
const app = express();

app.set('view engine', ejs);
app.use(express.static('public'));  // for css

app.listen(process.env.PORT || port, function(){
    console.log("Server has started.");
});

app.get('/', (req, res) => {
    const randomRecipe =  "https://api.spoonacular.com/recipes/random" + process.env.API_KEY;
    let title, image, summary, instructions;
    

    ax.get(randomRecipe)
    .then(function(response){
        // else
        title = response.data.recipes[0].title;
        image = response.data.recipes[0].image;
        summary = response.data.recipes[0].summary;
        instructions = response.data.recipes[0].instructions;

        let _data = {
            title,
            image,
            summary,
            instructions
        };

        // ingredients
        let ingredientsData = response.data.recipes[0].extendedIngredients;
        let _ingredients = [];

        for(var i = 0; i < ingredientsData.length; i++){
            _ingredients.push({
                name: ingredientsData[i].name,
                ammount: ingredientsData[i].original
            });
        }

        res.render('index.ejs', {
            data: _data,
            ingredients: _ingredients
        });
    })
    .catch((error) =>{
        console.log("Some error with request: " + error)
    });
});