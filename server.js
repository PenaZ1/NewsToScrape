var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(
    express.urlencoded({
        extended: false
    })
);


app.use(express.static(process.cwd() + "/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultlayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/NewstoScrape");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.on("open", function () {
    console.log("Connected to Mongoose!");
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening on port" + port);
});