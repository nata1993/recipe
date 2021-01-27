require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const ax = require('axios');
const port = 3000;

// init app
const app = express();

app.set('view engine', ejs);
app.use(express.static('public'));  // for css

app.get('/', (req, res) => {
    const randomRecipe =  "https://api.spoonacular.com/recipes/random" + process.env.API_KEY;
    let title, image, summary, instructions;

    ax.get(randomRecipe)
    .then(function(response){
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

        res.render('index.ejs', {
            data: _data
        });
    })
    .catch((error) =>{
        console.log("Some error with request: " + error)
    });
});

// app will run on this port
app.listen(port, () => {
    console.log(`app running on port ${port}\n`);
});

/*The name of the recipe
Main ingredients (including amount and metric units)
Summary
Instructions
Image*/
