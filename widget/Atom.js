define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/aspect', // aspect
'dojo/Stateful', // Stateful
'../Atom', // Atom
'dojo/data/ObjectStore', // ObjectStore
'dojo/i18n!../nls/base.js',
'../dictionary/atomStore', // atomStore
'dijit/form/FilteringSelect', // FilteringSelect
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dojo/text!./templates/atom.html', // template
'dijit/InlineEditBox', // InlineEditBox 
'dijit/form/NumberSpinner'], function(declare, lang, aspect, Stateful, Atom, ObjectStore, i18n, atomStore, FilteringSelect, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {	
	return declare([Atom, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {				

		templateString : template,			

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.i18n = args.i18n || i18n;
			this.store = args.store || atomStore;			
		},
		
		_symbolSetter : function(symbol) {
			this.symbol = symbol;
			var p = this.store.query({symbol:  symbol}).number;
			if(me.symbolInlineEditBox.get('value') != symbol)
				me.symbolInlineEditBox.set('value', symbol);
			if(me.zInlineEditBox.get('value') !=  p)
				me.zInlineEditBox.set('value', p);
		},
		
		_ZSetter : function(p) {
			this.inherited();
			var symbol = this.store.get(p).symbol;
			if(me.symbolInlineEditBox.get('value') != symbol)
				me.symbolInlineEditBox.set('value', symbol);
			if(me.zInlineEditBox.get('value') !=  p)
				me.zInlineEditBox.set('value', p);									
		},
		
		_pSetter : function(p) {
			this.inherited();
			if(me.symbolInlineEditBox.get('value') != symbol)
				me.symbolInlineEditBox.set('value', symbol);
			if(me.zInlineEditBox.get('value') !=  p)
				me.zInlineEditBox.set('value', p);
		},

		postCreate : function() {
			
			var me = this;
			me.inherited(arguments);
			
			var instantiatedSymbol = false, instantiatedZ = false;			
			
			me.symbolInlineEditBox.on('Change', function(symbol) {
				var z = me.store.get(symbol).number;
				me.set('Z', z);
			});
			
			me.zInlineEditBox.on('Change', function(z) {
				me.set('Z', z);
			});
			
			aspect.after(me.symbolInlineEditBox, 'edit', function(value) {
				if (!instantiatedSymbol) {
					instantiatedSymbol = true;														
					var widget = me.symbolInlineEditBox.wrapperWidget.editWidget;					
					widget.set('store', me.store);
					widget.set('searchAttr', 'symbol');
					me.symbolInlineEditBox.set('value', me.get('symbol'));
				}
			});
			
			aspect.after(me.zInlineEditBox, 'edit', function(value) {
				if (!instantiatedZ) {
					instantiatedZ = true;														
					var widget = me.zInlineEditBox.wrapperWidget.editWidget;
					widget.set('store', me.store);
					widget.set('searchAttr', 'number');
					me.zInlineEditBox.set('value', me.get('Z'));
				}
			});
		}
		
	});

});
