const VaccinePrenotationController = require('./controllers/vaccinePrenotation.controller');

exports.routesConfig = function(app) {
	app.post('/vaccinePrenotations', [
		VaccinePrenotationController.insert
	]);

	app.get('/vaccinePrenotations/:uid', [
		VaccinePrenotationController.getByUid
	]);

	app.delete('/vaccinePrenotations/:vaccinePrenotationId', [
		VaccinePrenotationController.removeById
	]);
}