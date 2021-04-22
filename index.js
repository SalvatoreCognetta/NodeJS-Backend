var express = require('express')
var app = express()

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/local';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});



// Parsers for POST data
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));


const VaccinationInfoRouter = require('./vaccinationInfos/routes.config')
const CovidInfoRouter = require('./covidInfos/routes.config')
const CovidCenterRouter = require('./covidCenters/routes.config')
const VaccinePrenotationRouter = require('./vaccinePrenotations/routes.config')

VaccinationInfoRouter.routesConfig(app)
CovidInfoRouter.routesConfig(app)
CovidCenterRouter.routesConfig(app)
VaccinePrenotationRouter.routesConfig(app)

app.listen(3000, function () {
    console.log('app listening at port %s', 3000);
});




