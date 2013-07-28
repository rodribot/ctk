define(['dojo/_base/declare', // declare
 'dojo/_base/lang', // lang
 'dojo/Stateful', // Stateful
 ], function(declare, lang, Stateful) { 	
	
	return declare(Stateful, {
			
		symbol : '',		
		mass : 0,
		electrons : 0,
		protons : 0,
		neutrons : 0,
	
		constructor : function(args) {
			lang.mixin(this, args);
		},
		
		/**
		 * The principal quantum number
		 * 
		 * The first describes the electron shell, or energy level, of an atom.
		 * The value of n ranges from 1 to the shell containing the outermost electron of that atom.
		 */
		_nGetter : function() {
			var electronsNow = this.electrons < this.protons ? this.protons : this.protons;
			return Math.sqrt(electronsNow) / 2;
		},
		
		/**
		 * The azimuthal quantum number
		 * 
		 * ℓ The second (also known as the angular quantum number or orbital quantum number)
		 */
		_lGetter : function() {
			return this.get('n') - 1;
		},
		
		_AGetter : function() {
			return this.protons + this.neutrons;
		},
		
		_ASetter : function(A) {
			this.set('neutrons', A - this.protons);
		},
		
		_ZGetter : function() {
			return this.p;
		},
		
		_ionizationGetter : function() {
			return this.p - this.e;
		},
		
		isIsotope : function(atom) {
			return this.protons == atom.protons
				&& this.electrons == atom.electrons
				&& this.neutrons != atom.neutrons
		}
		
	});
	
});