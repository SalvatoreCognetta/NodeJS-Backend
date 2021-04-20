const CovidCenterController = require('./controllers/covidCenter.controller');

exports.routesConfig = function(app) {
	app.post('/covidCenters', [
		CovidCenterController.insert
	]);

	app.get('/covidCenters', [
		CovidCenterController.list
	]);

	app.get('/covidCenters/:region', [
		CovidCenterController.getByRegion
	]);

	app.delete('/covidCenters/:covidCenterId', [
		CovidCenterController.removeById
	]);
}