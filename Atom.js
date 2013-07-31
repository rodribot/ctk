define(['dojo/_base/declare', // declare
 'dojo/_base/lang', // lang
 './Orbital', // Orbital
 'dojo/Stateful', // Stateful
 './dictionary/orbitals' // orbitalsDictionary
 ], function(declare, lang, Orbital, Stateful, orbitalsDictionary) { 	
	
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
			this.e = args.e || this.p;
			this.symbol = args.symbol || 'H';
		},
		
		computeElectronConfiguration : function() {		
			if(this._cacheElectronConfiguration)
				return this._cacheElectronConfiguration;
			
			var electronConfiguration = [];
			var i = -1, orbital;
			do {
				++i;
				orbital = orbitalsDictionary[i];
				electronConfiguration.push(new Orbital(orbital));								
			} while (this.e > orbital.e);
			
			this._cacheElectronConfiguration = electronConfiguration;			
			return this._cacheElectronConfiguration;			
		},			
		
		_AGetter : function() {
			return this.p + this.n;
		},
		
		_ASetter : function(A) {
			this.set('n', A - this.p);
		},
		
		_ZGetter : function() {
			return this.p;
		},
		
		_ZSetter : function(Z) {
			this.set('p', Z);
		},
		
		_pSetter : function(p) {
			this.p = p;
			delete this._cacheElectronConfiguration;
		},
		
		_ionizationGetter : function() {
			return this.p - this.e;
		},
		
		isIsotope : function(atom) {
			return this.p == atom.p && this.n != atom.n
		},
		
		isIsobar : function(atom) {
			return this.p != atom.p && this.n == atom.n;
		}
		
	});
	
});