const VaccinationInfoModel = require('../models/vaccinationInfo.model');
const util = require('util');

exports.insert = (req, res) => {
	console.log("body: " + util.inspect(req.body,false,null))
	VaccinationInfoModel.createVaccinationInfo(req.body)
		.then((result) => {
			res.status(201).send({id: result._id});
		});
};

exports.getLatest = (req, res) => {
	console.log("Get latest called");
	VaccinationInfoModel.getLatest()
		.then((result) => {
			res.status(201).send(result);
		})	
}

exports.getById = (req, res) => {
	VaccinationInfoModel.findById(req.params.vaccinationInfoId)
		.then((result) => {
			res.status(200).send(result);
		})
}

exports.list = (req, res) => {
	VaccinationInfoModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
}

exports.removeById = (req, res) => {
    VaccinationInfoModel.removeById(req.params.vaccinationInfoId)
        .then((result)=>{
            res.status(204).send({});
        });
};