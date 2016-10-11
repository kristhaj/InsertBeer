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

	}

	function enableIrTempMe() {
		console.log('enableIRTemperatureSensor');
		tag.enableIrTemperature(notifyMe);
	}

	function notifyMe() {
		tag.notifyIrTemperature(listenForTempReading);
		tag.notifySimpleKey(listenforButton);
	}

	function listenForTempReading() {
		tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
			// TODO tweet for more beer

		});

	}


	connectAndSetUpMe();
});