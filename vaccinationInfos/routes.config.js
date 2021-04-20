const VaccinationInfoController = require('./controllers/vaccinationInfo.controller');

exports.routesConfig = function(app) {
	app.post('/vaccinationInfos', [
		VaccinationInfoController.insert
	]);

	app.get('/vaccinationInfos', [
		VaccinationInfoController.getLatest
	]);

	app.get('/vaccinationInfos/:vaccinationInfoId', [
		VaccinationInfoController.getById
	]);

	app.delete('/vaccinationInfos/:vaccinationInfoId', [
		VaccinationInfoController.removeById
	]);
}