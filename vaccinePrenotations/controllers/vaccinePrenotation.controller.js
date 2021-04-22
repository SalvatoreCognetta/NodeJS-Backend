const VaccinePrenotationModel = require('../models/vaccinePrenotation.model');
const util = require('util');

exports.insert = (req, res) => {
	console.log("body: " + util.inspect(req.body,false,null))
	VaccinePrenotationModel.createVaccinePrenotation(req.body)
		.then((result) => {
			console.log("Result:"+result)
			res.status(201).send(result._id);
		});
};

exports.getByUid = (req, res) => {
	VaccinePrenotationModel.findByUid(req.params.uid)
		.then((result) => {
			res.status(200).send(result);
		})
};

exports.removeById = (req, res) => {
    VaccinePrenotationModel.removeById(req.params.vaccinePrenotationId)
        .then((result)=>{
            res.status(204).send({});
        });
};