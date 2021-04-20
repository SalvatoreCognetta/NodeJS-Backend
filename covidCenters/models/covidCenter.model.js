const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const covidCenterSchema = new Schema({
	location: String,
	region: String,
	latitude: Number,
	longitude: Number
});

covidCenterSchema.findById = function (cb) {
	console.log("findbyid")
    return this.model('CovidCenter').find({id: this.id}, cb);
};



// Create a collection called CovidCenters
const CovidCenter = mongoose.model('CovidCenter', covidCenterSchema);

exports.createCovidCenter = (covidCenterData) => {
	const info = new CovidCenter(covidCenterData);
	console.log("info" + info)
	return info.save();
};

exports.findById = (covidCenterId) => {
	return CovidCenter.findById(covidCenterId)
		.then((result) => {
			if (result != null) {
				result = result.toJSON();
				delete result._id;
				delete result.__v;
			}
            return result;
		})
};

exports.findByRegion = (region) => {
	return new Promise((resolve, reject) => {
		CovidCenter.find({"region": region})
			.exec(function (err, result) {
				if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
			})
	})
};

exports.list = () => {
	return new Promise((resolve, reject) => {
        CovidCenter.find()
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


exports.removeById = (covidCenterId) => {
	return new Promise((resolve, reject) => {
        CovidCenter.deleteMany({_id: covidCenterId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    });
};
