define(['dojo/_base/declare', // declare
 'dojo/_base/lang', // lang
 'dojo/Stateful', // Stateful
 'dojo/_base/array', // array
 ], function(declare, lang, Stateful, array) {
  
 	
	var Molecule = declare(Stateful, {
		
		// Ignore if sub molecule
		coefficient : 1,
		
		// Ignore unless sub molecule
		subscript : 1,
		
		components : [],
	
		constructor : function(args) {
			lang.mixin(this, args);
		}
		
	});
	
	Molecule.prototype.toString = function() {
		var str = '';
			
		if(this.coefficient > 1)
			str += this.coefficient;
			
		array.forEach(this.components, function(component) {
			if(component instanceof Molecule) {
				str += '(' + component.toString() + ')';
				if(component.get('subscript') > 1)
					str += component.get('subscript');
			} else
				str += component.toString();
		});
			
		if(this.subscript > 1)
			str += this.subscript;
			
		return str;
	}
	
	return Molecule;
	
});