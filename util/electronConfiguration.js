define([], function() {

	return {

		orbitals : ['s', 'p', 'd', 'f', 'g', 'h', 'i'],

		orbitalsCapacity : [2, 6, 10, 14, 18, 22, 26],

		makeAufbauPrinciple : function() {
			var matrix = [];
			for (var nivel = 1, maxNivel = this.orbitals.length; nivel <= maxNivel; nivel++) {
				var row = [];
				for (var orbitalIndex = 0; orbitalIndex < nivel; orbitalIndex++) {
					row.push({
						nivel : nivel,
						orbital : this.orbitals[orbitalIndex],
						orbitalIndex : orbitalIndex,
						capacity : this.orbitalsCapacity[orbitalIndex]
					});
				}
				matrix.push(row);
			}
			return matrix;
		},

		makeElectronConfigurationSequence : function() {
			var orbitals = []
			var e = 0;
			var aufbauPrinciple = this.makeAufbauPrinciple();
			for (var i = 0, length = this.orbitals.length; i < length; i++) {
				var j = 0;
				while (aufbauPrinciple[i + j] && aufbauPrinciple[i + j][i - j]) {
					var orbital = aufbauPrinciple[i + j][i - j];
					e += orbital.capacity;
					orbital.e = e;
					orbitals.push(orbital); ++j;
				}
				j = 0;
				while (aufbauPrinciple[i + j + 1] && aufbauPrinciple[i + j + 1][i - j]) {				
					var orbital = aufbauPrinciple[i + j + 1][i - j];
					e += orbital.capacity;
					orbital.e = e;
					orbitals.push(orbital); ++j;
				}
			}
			return orbitals;
		}
	};

});
