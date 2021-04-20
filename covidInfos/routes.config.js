const CovidInfoController = require('./controllers/covidInfo.controller');

exports.routesConfig = function(app) {
	app.post('/covidInfos', [
		CovidInfoController.insert
	]);

	app.get('/covidInfos', [
		CovidInfoController.getLatest
	]);

	app.get('/covidInfos/:region', [
		CovidInfoController.getLatestByRegion
	]);

	app.delete('/covidInfos/:covidInfoId', [
		CovidInfoController.removeById
	]);
}