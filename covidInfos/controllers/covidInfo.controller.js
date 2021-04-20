const CovidInfoModel = require('../models/covidInfo.model');
const util = require('util');

exports.insert = (req, res) => {
	console.log("body: " + util.inspect(req.body,false,null))
	CovidInfoModel.createCovidInfo(req.body)
		.then((result) => {
			res.status(201).send({id: result._id});
		});
};

exports.getLatest = (req, res) => {
	console.log("Get latest called");
	CovidInfoModel.getLatest()
		.then((result) => {
			res.status(201).send(result);
		})	
}

exports.getById = (req, res) => {
	CovidInfoModel.findById(req.params.covidInfoId)
		.then((result) => {
			res.status(200).send(result);
		})
}

exports.getLatestByRegion = (req, res) => {
	CovidInfoModel.findLatestByRegion(req.params.region)
		.then((result) => {
			res.status(200).send(result);
		})
}

exports.list = (req, res) => {
	CovidInfoModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
}

exports.removeById = (req, res) => {
    CovidInfoModel.removeById(req.params.covidInfoId)
        .then((result)=>{
            res.status(204).send({});
        });
};