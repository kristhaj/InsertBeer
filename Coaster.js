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
		tag.notifyBarometricPressure(listenForBarPresReading);
	}

	function listenForTempReading() {
		tag.on('irTemperatureChange', function(objectTemp, ambientTemp) {
			// TODO notify slow drinking
			console.log('\tObject Temp = %d deg. C', objectTemp.toFixed(1));
			console.log('\tAmbient Temp = %d deg. C', ambientTemp.toFixed(1));

		});

	}

	function enableBarPresMe() {
		console.log('enableBarometricPressureSensor');
		tag.enableBarometricPressure(notifyMe);
	}

	function listenForTempReading() {
		var fs = require('fs');
		while(true) {
			tag.on('barometricPressureChange', function(pressure) {
			console.log('\tPressure = %d', pressure.toFixed(1));
			//writes beer state to file for tweet
			
			// TODO tweet for more beer
			if (pressure < 2 || pressure) > 1 { //pressure with empty beer
				fs.writeFile('/beerState', "empty", function(err) {
					if(err) {
						return conole.log(err);
					}

					console.log("File saved!");
				});
			} 
		});
		}
		
	}








	connectAndSetUpMe();
});