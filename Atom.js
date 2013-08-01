define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/Deferred', // Deferred
'./Orbital', // Orbital
'dojo/Stateful', // Stateful
'./dictionary/orbitals' // orbitalsDictionary
], function(declare, lang, Deferred, Orbital, Stateful, orbitalsDictionary) {

	return declare(Stateful, {

		symbol : '',
		mass : 0,
		e : 0,
		p : 0,
		n : 0,		

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.p = args.p || 1;
			this.e = args.e || this.p - (args.ionization || 0);			
			this.symbol = args.symbol || 'H';
		},

		isIsotope : function(atom) {
			return this.p == atom.p && this.n != atom.n
		},

		isIsobar : function(atom) {
			return this.p != atom.p && this.n == atom.n;
		},

		computeElectronConfiguration : function() {

			var me = this;

			var deferred = new Deferred();

			if (me._cacheElectronConfiguration) {
				console.log('cached');
				deferred.resolve(me._cacheElectronConfiguration);
				return deferred.promise;
			}

			// Asynchronous
			setTimeout(function() {

				var electronConfiguration = [];
				var _cacheElectronConfiguration = [];
				var i = 0, orbital, mlArray, msArray;
				var eUsed = me.e;
				do {					
					
					orbital = lang.clone(orbitalsDictionary[i]);
					
					mlArray = [];
					msArray = [];
					
					var mlIndex = -orbital.l;
					var mlEIndex = 0;
					
					while (mlIndex <= orbital.l) {
						if (eUsed > 0) {
							msArray.push(1);
							++mlEIndex;
							--eUsed;
						} else {
							msArray.push(0);
						}
						mlArray.push(mlIndex++);
					}
					if (eUsed > 0) {
						mlEIndex = 0;
						while (eUsed > 0) {
							msArray[mlEIndex]++;
							++mlEIndex;
							--eUsed;
						}
						--mlEIndex;
					}										

					orbital.mlEIndex = mlEIndex;
					orbital.ml = mlArray[mlEIndex];
					orbital.ms = msArray[mlEIndex] > 1 ? -0.5 : +0.5;
					orbital.mlArray = mlArray;
					orbital.msArray = msArray;					

					electronConfiguration.push(orbital);
					_cacheElectronConfiguration.push(orbital);
					
					++i;
					
					console.log('while (me.e > orbitalsDictionary[i].eTotal)', me.e, orbitalsDictionary[i].eTotal, orbitalsDictionary[i])
				} while (me.e > orbitalsDictionary[i].eTotal);

				me._cacheElectronConfiguration = _cacheElectronConfiguration;
				deferred.resolve(electronConfiguration);
				
			}, 0);
			
			return deferred.promise;
		},

		_AGetter : function() {
			return this.p + this.n;
		},

		_ASetter : function(A) {			
			this.set('n', Number(A) - this.p);
		},

		_ZGetter : function() {
			return this.p;
		},

		_ZSetter : function(Z) {
			this.set('p', Z);
		},
		
		_pGetter : function() {
			return this.p;
		},

		_pSetter : function(p) {
			p = Number(p);
			this.e = p - this.p + this.e;			
			this.p = p;
			this.set('A', this.get('A'));
			delete this._cacheElectronConfiguration;
		},

		_ionizationGetter : function() {
			return this.p - this.e;
		},
		
		_ionizationSetter : function(ionization) {			
			this.e = this.p - Number(ionization);
		},
		
		_eGetter : function() {
			return this.e;
		},
		
		_eSetter : function(e) {
			this.e = e;
			this.set('ionization', this.get('ionization'));
		},
		
		_symbolGetter : function() {
			return this.symbol;
		},
		
		_symbolSetter : function(symbol) {
			this.symbol = symbol;
		}
		
	});

});
