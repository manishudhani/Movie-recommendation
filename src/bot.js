const consoleLol = require('console.lol');
const getCSV = require('./api/getCSV');
const filterCSV = require('./api/filterCSV');
const mainRoute = require("./api/main");
// const putCSV = require('./api/putCSV');
const methodOverride = require("method-override");

const ejs = require("ejs");
const engine = require("ejs-mate");
const bodyParser = require("body-parser");
const express = require('express');
const morgan = require('morgan');
// Set up the express app
const app = express();
let port = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://localhost/nineleaps",{ useNewUrlParser: true });

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true })); //complex algo for parsing
app.use(morgan('dev'));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use('/getCSV',getCSV);
app.use('/filterCSV',filterCSV);
app.use('/',mainRoute)
// app.use('/putCSV',putCSV);
// app.use()

console.rofl('APIs starting...')

app.listen(port, function () {
   console.log('Updated : Server listening at port %d', port);
});
