/*InsertBeerHere*/

var SensorTag = require('sensortag');

SensorTag.discoverByAddress('b0:b4:b48:c9:74:80', function(tag) {
	tag.on('disconnect', function() {
		console.log('disconnected');
		process.exit(0);
	});

	function connectAndSetUpMe() {
		console.log('connectAndSetUp');
		tag.connectAndSetUp(enableIrTempMe);
		tag.connectAndSetUpMe(enableBarPresMe);

	}

	function enableIrTempMe() {
		console.log('enableIRTemperatureSensor');
		tag.enableIrTemperature(notifyMe);
	}

	function notifyMe() {
		tag.notifyIrTemperature(listenForTempReading);
		tag.notidyBarometricPressure(listenForBarPresReading);
	}

	function listenForTempReading() {
		tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
			// TODO tweet for more beer
			console.log('\tObject Temp = %d deg. C', objectTemp.toFixed(1));
			console.log('\tAmbient Temp = %d deg. C', ambientTemp.toFixed(1));

		});

	}

	function enableBarPresMe() {
		console.log('enableBarometricPressureSensor');
		tag.enableBarometricPressure(notifyMe);
	}

	function listenForTempReading() {
		tag.on('barometricPressureChange', function(pressure) {
			// TODO messure weight of beer
			console.log('\tPressure = %d', pressure.toFixed(1));
		});
	}








	connectAndSetUpMe();
});