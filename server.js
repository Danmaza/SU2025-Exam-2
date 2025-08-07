//load express modules
const express = require('express');
const axios = require('axios');
const bodyParser  = require('body-parser');


//create app with express
const app = express();

//set views property
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());

 app.get("/", function(request, response){
     response.render("index", {
         data: "Welcome"
     })
 });

// using some local memory information 

app.get('/mascots', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tuxedo', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('mascots', {
        mascots: mascots,
        tagline: tagline
    });
});


// Code to call Third party server API and processing retrived JSON data (from API) here in server.js file

app.get('/superhero', function(req, res){
    
    // This is the url to call superheros api from superheroapi.com server to get super heros information i.e., hulk, spider etc.,
    var url = "https://www.superheroapi.com/api.php/10221405381743383/search/hulk";
    axios.get(url)
        .then((response)=>{
            // This is how you get required data out of whole api call data list
            let myHeroArray = response.data.results;
            let hero = myHeroArray[0];
            let aliases = hero.biography.aliases;
            
            res.render('superhero', {
                aliases: aliases
            });
        });
  
  })

// Code to call Third party server API and processing retrived JSON data (from API) in ejs file
app.get('/appleitunes', function(req, res) {

    //itunes API call
    axios.get('https://itunes.apple.com/search?term=radiohead')
    .then((response)=>{
        let musicData = response.data;
        console.log(musicData);
        res.render('appleitunes', {
            music: musicData
        });
    });

});

//run application on a port
app.listen(8080);
console.log("Application is listening on port no 8080")
