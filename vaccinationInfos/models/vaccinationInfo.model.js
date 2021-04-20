const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vaccinationInfoSchema = new Schema({
	textInfo: String,
	dateInfo: Date
});

vaccinationInfoSchema.findById = function (cb) {
	console.log("findbyid")
    return this.model('VaccinationInfo').find({id: this.id}, cb);
};



// Create a collection called VaccinationInfos
const VaccinationInfo = mongoose.model('VaccinationInfo', vaccinationInfoSchema);

exports.createVaccinationInfo = (vaccinationInfoData) => {
	const info = new VaccinationInfo(vaccinationInfoData);
	console.log("info" + info)
	return info.save();
};

exports.findById = (vaccinationInfoId) => {
	return VaccinationInfo.findById(vaccinationInfoId)
		.then((result) => {
			if (result != null) {
				result = result.toJSON();
				delete result._id;
				delete result.__v;
			}
            return result;
		})
}

exports.getLatest = () => {
	return new Promise((resolve, reject) => {
		VaccinationInfo.find()
			.sort([['dateInfo', -1], ['_id', -1]])
			.limit(1)
			.exec(function (err, result) {
				if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
			})
	})
}

exports.list = () => {
	return new Promise((resolve, reject) => {
        VaccinationInfo.find()
            .limit(10)
            .exec(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
    });
};


exports.removeById = (vaccinationInfoId) => {
	return new Promise((resolve, reject) => {
        VaccinationInfo.deleteMany({_id: vaccinationInfoId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    });
};

exports.getText = () => {
	return "text";
};
