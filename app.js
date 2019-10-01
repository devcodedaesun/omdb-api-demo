var express = require("express")
var app = express()
var port = 3000
var request = require("request")

// Use the public folder for styles
app.use(express.static("public"))

// Set view engine to use EJS
app.set("view engine", "ejs")

// Root route
app.get("/", function(req, res){
    res.render("home")
})

// Results route
app.get("/results", function(req, res){
    var searchQuery = req.query.search
    request("http://www.omdbapi.com/?apikey=thewdb&s=" + searchQuery, function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body)
            res.render("results", {parsedData: parsedData})
        }
    })
})

// Server set up
app.listen(port, function(){
    console.log(`Your server is running on localhost:${port}`)
})