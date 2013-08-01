define(['dojo/_base/declare', // declare
'dojo/_base/lang', 'dojo/Stateful' // Stateful
], function(declare, lang, Stateful) {

	return declare(Stateful, {

		nivel : 0,
		orbital : '',
		orbitalIndex : 0,
		capacity : 0,
		e : 0,
		eUsed : 0,

		constructor : function(args) {
			lang.mixin(this, args);
		},

		_nGetter : function() {
			if (!this.cacheQuantumNumbers)
				this._computeQuantumNumbers();
			return this.cacheQuantumNumbers.n;
		},

		_lGetter : function() {
			if (!this.cacheQuantumNumbers)
				this._computeQuantumNumbers();
			return this.cacheQuantumNumbers.l;
		},

		_mlGetter : function() {
			if (!this.cacheQuantumNumbers)
				this._computeQuantumNumbers();
			return this.cacheQuantumNumbers.ml;
		},

		_msGetter : function() {
			if (!this.cacheQuantumNumbers)
				this._computeQuantumNumbers();
			return this.cacheQuantumNumbers.ms;
		},

		_computeQuantumNumbers : function() {			
			
			var me = this;
			
			var quantumNumberAuxiliar = {
				ml : [],
				ms : []
			};
			
			var n = me.nivel;
			var l = me.orbitalIndex;

			var distributedElectrons = me.eUsed;
			var i = -l;
			
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
			
			me.cacheQuantumNumbers = {				
				n : n,
				l : l,
				lLetter : me.orbital,
				ml : quantumNumberAuxiliar.ml[lastElectronIndex],
				ms : quantumNumberAuxiliar.ms[lastElectronIndex] > 1 ? -0.5 : +0.5,
				mlArray : quantumNumberAuxiliar.ml,
				msArray : quantumNumberAuxiliar.ms	
			};
		}
	});

});
