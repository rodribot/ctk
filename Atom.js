define(['dojo/_base/declare', // declare
 'dojo/_base/lang', // lang
 'dojo/Stateful', // Stateful
 './dictionary/orbitals' // orbitalsDictionary
 ], function(declare, lang, Stateful, orbitalsDictionary) { 	
	
	return declare(Stateful, {
			
		symbol : '',		
		mass : 0,
		e : 0,
		p : 0,
		n : 0,
	
		constructor : function(args) {
			lang.mixin(this, args);
			if(!args.e) {
				this.e = this.p;
			}
		},
		
		computeElectronConfiguration : function() {
		
			if(this._cacheElectronConfiguration)
				return this._cacheElectronConfiguration;
			
			var electronConfiguration = [];
			var i = -1, orbital;
			do {
				++i;
				orbital = orbitalsDictionary[i];
				electronConfiguration.push(orbital);								
			} while (this.e > orbital.e);
			
			var quantumNumberAuxiliar = {
				ml : [],
				ms : []
			};
			
			var n = orbital.nivel;
			var l = orbital.orbitalIndex;

			var distributedElectrons = this.e - orbitalsDictionary[i - 1 < 0 ? 0 : i - 1].e;
			i = -l;
			
			var lastElectronIndex = 0;	
			while(i <= l) {		
				if(distributedElectrons > 0) {
					quantumNumberAuxiliar.ms.push(1);
					++lastElectronIndex;	
					--distributedElectrons;
				} else {
					quantumNumberAuxiliar.ms.push(0);
				}
				quantumNumberAuxiliar.ml.push(i++);				
			}
			if(distributedElectrons > 0) {
				lastElectronIndex = 0;
			 	while(distributedElectrons > 0) {
					quantumNumberAuxiliar.ms[lastElectronIndex]++;
					++lastElectronIndex;
					--distributedElectrons;
				}				
			}		
			
			--lastElectronIndex;				
			
			quantumNumberAuxiliar.lastElectronIndex = lastElectronIndex;
			
			this._cacheElectronConfiguration = {
				electronConfiguration : electronConfiguration,
				quantumNumberAuxiliar : quantumNumberAuxiliar,
				n : n,
				l : l,
				lLetter : orbital.orbital,
				ml : quantumNumberAuxiliar.ml[lastElectronIndex],
				ms : quantumNumberAuxiliar.ms[lastElectronIndex] > 1 ? -0.5 : +0.5				
			};
			
			return this._cacheElectronConfiguration;
			
		},
		
		_AGetter : function() {
			return this.protons + this.neutrons;
		},
		
		_ASetter : function(A) {
			this.set('n', A - this.protons);
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
			return this.p == atom.p
				&& this.e == atom.e
				&& this.n != atom.n
		}
		
	});
	
});