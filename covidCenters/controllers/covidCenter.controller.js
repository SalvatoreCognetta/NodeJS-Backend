const CovidCenterModel = require('../models/covidCenter.model');
const util = require('util');

exports.insert = (req, res) => {
	console.log("body: " + util.inspect(req.body,false,null))
	CovidCenterModel.createCovidCenter(req.body)
		.then((result) => {
			res.status(201).send({id: result._id});
		});
};

exports.getById = (req, res) => {
	CovidCenterModel.findById(req.params.covidCenterId)
		.then((result) => {
			res.status(200).send(result);
		})
}

exports.getByRegion = (req, res) => {
	CovidCenterModel.findByRegion(req.params.region)
		.then((result) => {
			res.status(200).send(result);
		})
};

exports.list = (req, res) => {
	CovidCenterModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.removeById = (req, res) => {
    CovidCenterModel.removeById(req.params.covidCenterId)
        .then((result)=>{
            res.status(204).send({});
        });
};