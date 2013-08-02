define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'../Atom', // Atom
'dojo/query', // query
'dojo/dom-class', // domClass
'dojo/i18n!../nls/base.js', // i18n
'../dictionary/atomStore', // atomStore
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dojo/text!./templates/aufbauPrinciple.html' // template
], function(declare, lang, Atom, query, domClass, i18n, atomStore, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString : template,

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.i18n = args.i18n || i18n;
			this.atom = args.atom || new Atom();
			this.atomWatch;					
		},

		_getAtomAttr : function() {
			return this.atom;
		},

		_setAtomAttr : function(atom) {
			var me = this;
			me.atomWatch && me.atomWatch.unwatch();
			me.atom = atom;
			me.atomWatch = me.atom.watch('e', function(name, oval, nval) {				
				me._update();
			});
		},

		_update : function() {					
			var me = this;			
			me.atom.computeElectronConfiguration().then(function(orbitals) {
				var oIndex = orbitals.length - 1;				
				me.reset();				
				var orbital = orbitals[oIndex];
				domClass.add(me['orbital' + oIndex], 'active');				
				domClass.add(me['n' + orbital.n], 'active-n');
				domClass.add(me['l' + orbital.l], 'active-l');
				for(var i = oIndex - 1; i >= 0; i--) {					
					domClass.add(me['orbital' + i], 'used');
				}						
			});
		},

		reset : function() {
			query('td', this.domNode).removeClass('active')
				.removeClass('active-n')
				.removeClass('active-l')
				.removeClass('used');
		},

		postCreate : function() {
			var me = this;
			me.inherited(arguments);
			me._update();
		}
	});

}); 