define(['dojo/store/Memory', // Memory
'dojo/i18n!../nls/atoms.js', // names
'./atoms', // atoms
'dojo/_base/array' // array
], function(Memory, names, atoms, array) {	
	array.forEach(atoms, function(entry) {
		entry.name = names[entry.id];
	});
	return new Memory({
		idProperty : 'symbol',
		data : atoms
	});
});