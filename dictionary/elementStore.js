define(['dojo/store/Memory', // Memory
'dojo/i18n!../nls/elements.js', // names
'./elements', // elements
'dojo/_base/array' // array
], function(Memory, names, elements, array) {	
	array.forEach(elements, function(entry) {
		entry.name = names[entry.id];
	});
	return new Memory({
		idProperty : 'symbol',
		data : elements
	});
});