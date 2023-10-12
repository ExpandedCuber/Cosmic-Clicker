var express = require('express');
var app = express();
var path = require('path');


//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.listen(3000);

app.listen(function (error) {
    if (error) {
        console.log("Something went wrong", error)
    } else {
        console.log("Server listening on port 3000")
    }
});
