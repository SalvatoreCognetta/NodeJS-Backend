const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vaccinePrenotationSchema = new Schema({
	uid: String,
	covidCenter: String,
	dateRequest: Date,
	dateFirstDose: Date,
	dateSecondDose: Date
});

vaccinePrenotationSchema.findByUid = function (cb) {
	console.log("findbyuid")
    return this.model('VaccinePrenotation').find({uid: this.uid}, cb);
};



// Create a collection called VaccinePrenotations
const VaccinePrenotation = mongoose.model('VaccinePrenotation', vaccinePrenotationSchema);

exports.createVaccinePrenotation = (vaccinePrenotationData) => {
	const info = new VaccinePrenotation(vaccinePrenotationData);
	console.log("info" + info)
	return info.save();
};

exports.findByUid = (uid) => {
	return new Promise((resolve, reject) => {
		VaccinePrenotation.find({"uid": uid})
			.sort([['dateInfo', -1]])
			.limit(1)
			.exec(function (err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			})
	})
};


exports.removeById = (vaccinePrenotationId) => {
	return new Promise((resolve, reject) => {
        VaccinePrenotation.deleteMany({_id: vaccinePrenotationId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    });
};
