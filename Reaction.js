define(['dojo/_base/declare', // declare
 'dojo/_base/lang', // lang
 'dojo/Stateful', // Stateful
 ], function(declare, lang, Stateful) { 	
	
	return declare(Stateful, {
			
		symbol : '',		
		mass : 0,
		z : 0,
	
		constructor : function(args) {
			lang.mixin(this, args);
		}
	});
	
});