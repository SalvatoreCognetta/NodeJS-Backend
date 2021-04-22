const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const covidInfoSchema = new Schema({
	region: String,
	newPositive: Number,
	deaths: Number,
	swap: Number,
	posPercentage: Number,
	icu: Number,
	incidence: Number,
	totVaccine: Number,
	dateInfo: Date
});

covidInfoSchema.findById = function (cb) {
	console.log("findbyid")
    return this.model('CovidInfo').find({id: this.id}, cb);
};



// Create a collection called CovidInfos
const CovidInfo = mongoose.model('CovidInfo', covidInfoSchema);

exports.createCovidInfo = (covidInfoData) => {
	const info = new CovidInfo(covidInfoData);
	console.log("info" + info)
	return info.save();
};

exports.findById = (covidInfoId) => {
	return CovidInfo.findById(covidInfoId)
		.then((result) => {
			if (result != null) {
				result = result.toJSON();
				delete result._id;
				delete result.__v;
			}
            return result;
		})
};

exports.findLatestByRegion = (region) => {
	return new Promise((resolve, reject) => {
		CovidInfo.find({"region": region})
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

exports.getLatest = () => {
	return new Promise((resolve, reject) => {
		CovidInfo.find()
			.sort([['dateInfo', -1], ['region', 1]])
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
        CovidInfo.find()
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


exports.removeById = (covidInfoId) => {
	return new Promise((resolve, reject) => {
        CovidInfo.deleteMany({_id: covidInfoId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    });
};
