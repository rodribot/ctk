define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/aspect', // aspect
'../Atom', // Atom
'dojo/data/ObjectStore', // ObjectStore
'dojo/i18n!../nls/base.js', // i18n 
'../dictionary/atomStore', // atomStore
'dijit/form/FilteringSelect', // FilteringSelect
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dojo/text!./templates/atom.html', // template
'dijit/InlineEditBox', // InlineEditBox
'dijit/form/NumberSpinner'], function(declare, lang, aspect, Atom, ObjectStore, i18n, atomStore, FilteringSelect, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString : template,

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.i18n = args.i18n || i18n;
			this.store = args.store || atomStore;
			this.atom = args.atom || new Atom();
			this.atomWatches = [];
		},
		
		_getAtomAttr : function() {
			return this.atom;
		},
		
		_setAtomAttr : function(atom) {
			var me = this;
			for(var i in this.atomWatches) {
				me.atomWatches[i].unwatch();
			}
			me.atom = atom;
			me.atomWatches.push(me.atom.watch('A', function(name, oval, nval) {
				if(me.aInlineEditBox.get('value') != nval)
					me.aInlineEditBox.set('value', nval + '');
			}));
			me.atomWatches.push(me.atom.watch('symbol', function(name, oval, nval) {
				if(me.symbolInlineEditBox.get('value') != nval)
					me.symbolInlineEditBox.set('value', nval + '');
			}));
			me.atomWatches.push(me.atom.watch('ionization', function(name, oval, nval) {
				if(me.ionizationInlineEditBox.get('value') != nval)
					me.ionizationInlineEditBox.set('value', nval + '');
			}));
			me.atomWatches.push(me.atom.watch('Z', function(name, oval, nval) {
				if(me.zInlineEditBox.get('value') != nval)
					me.zInlineEditBox.set('value', nval + '');
			}));
			me.atomWatches.push(me.atom.watch('p', function(name, oval, nval) {
				if(me.zInlineEditBox.get('value') != nval)
					me.zInlineEditBox.set('value', nval + '');
			}));
		},

		/*
		_getAAttr : function() {
			return this.atom.get('A');			
		},

		_setAAttr : function(A) {
			this.atom.set('A', A);			
			//if(this.aInlineEditBox.get('value') != A)
			//	this.aInlineEditBox.set('value', A + ''); 
		},

		_getSymbolAttr : function() {
			return this.atom.get('symbol');
		},

		_setSymbolAttr : function(symbol) {
			this.atom.set('symbol', symbol);
			/*
			var p = this.store.get(symbol).number;
			if (this.symbolInlineEditBox.get('value') != symbol)
				this.symbolInlineEditBox.set('value', symbol);
			if (p && this.zInlineEditBox.get('value') != p)
				this.zInlineEditBox.set('value', p);
			if(this.aInlineEditBox.get('value') < p)
				this.set('A', p + '');
			//
		},

		_getZAttr : function() {
			return this.atom.get('Z');
		},

		_setZAttr : function(p) {					
			this._setPAttr(p);
		},

		_getPAttr : function() {
			return this.inherited('_pGetter', arguments);
		},

		_setPAttr : function(p) {
			this.inherited('_pSetter', arguments);
			var symbol = this.store.query({ number : p})[0].symbol;
			if (this.symbolInlineEditBox.get('value') != symbol)
				this.symbolInlineEditBox.set('value', symbol);
			if (this.zInlineEditBox.get('value') != p)
				this.zInlineEditBox.set('value', p + '');
			if(this.aInlineEditBox.get('value') < p)
				this.set('A', p + '');				
		},
		
		_getIonizationAttr : function() {
			return this.inherited('_ionizationGetter', arguments);
		},
		
		_setIonizationAttr : function(ionization) {
			this.inherited('_ionizationSetter', arguments);
			if(this.ionizationInlineEditBox.get('value') != ionization)
				this.ionizationInlineEditBox.set('value', ionization + '');
		},
		
		_getEAttr : function() {
			return this.inherited('_eGetter', arguments);
		},
		
		_setEAttr : function() {
			this.inherited('_eSetter', arguments);
		},
		*/
		postCreate : function() {

			var me = this;
			me.inherited(arguments);

			var instantiatedSymbol = false, instantiatedZ = false;

			me.ionizationInlineEditBox.set('value', me.atom.get('ionization') + '');
			me.aInlineEditBox.set('value', me.atom.get('A') + '');
			me.zInlineEditBox.set('value', me.atom.get('Z') + '');
			me.symbolInlineEditBox.set('value', me.atom.get('symbol') + '');			

			me.symbolInlineEditBox.on('Change', function(symbol) {
				me.atom.set('symbol', symbol);
				var result = me.store.get(symbol);
				if(result)
					me.atom.set('Z', result.number);			
			});

			me.zInlineEditBox.on('Change', function(Z) {
				me.atom.set('Z', Z);
				var result = me.store.query({number : Z});
				if(result.length) {
					result = result[0];
					me.atom.set('symbol', result.symbol);
				}
			});
			
			me.ionizationInlineEditBox.on('Change', function(ionization) {
				me.atom.set('ionization', ionization);
			});
			
			me.aInlineEditBox.on('Change', function(A) {
				me.atom.set('A', A);
			});

			aspect.after(me.symbolInlineEditBox, 'edit', function(value) {
				if (!instantiatedSymbol) {
					instantiatedSymbol = true;
					var widget = me.symbolInlineEditBox.wrapperWidget.editWidget;
					widget.set('store', me.store);
					widget.set('searchAttr', 'symbol');
				}
			});

			aspect.after(me.zInlineEditBox, 'edit', function(value) {
				if (!instantiatedZ) {
					instantiatedZ = true;
					var widget = me.zInlineEditBox.wrapperWidget.editWidget;
					widget.set('store', me.store);
					widget.set('searchAttr', 'number');
				}
			});
		}
		
	});

});
