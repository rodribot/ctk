define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/dom-class', // domClass
'dojo/dom-construct', // domConstruct
'../Atom', // Atom
'dojo/i18n!../nls/base.js', // i18n
'../dictionary/atomStore', // atomStore
'dijit/layout/TabContainer', // TabContainer
'./OrbitalPane', // OrbitalPane
], function(declare, lang, domClass, domConstruct, Atom, i18n, atomStore, TabContainer, OrbitalPane) {

	return declare(TabContainer, {			

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.i18n = args.i18n || i18n;
			this.atom = args.atom || new Atom();			
		},

		_getAtomAttr : function() {
			return this.atom;
		},

		_setAtomAttr : function(atom) {
			var me = this;
			me.atomWatch && me.atomWath.unwatch();			
			me.atom = atom;
			me.atomWatch = me.atom.watch('e', function(name, oval, nval) {				
				me._update();
			});
		},

		_update : function() {
			var me = this;
			me.atom.computeElectronConfiguration().then(function(orbitals) {
				me.reset();
				var oIndex = orbitals.length, pane;					
				for (var i = 0; i < oIndex; i++) {
					var pane = new OrbitalPane({
						orbital : orbitals[i]								
					});
					me.addChild(pane);
				}				
				me.selectChild(pane);
			});
		},

		reset : function() {
			var children = electronConfiguration.getChildren();
			for (var i in children) {
				this.removeChild(children[i]);
				children[i].destroy();
			}
		},

		postCreate : function() {

			var me = this;
			me.inherited(arguments);
			domClass.add(me.domNode, 'chemistry-electron-configuration');
			me._update();
		}
	});

});
