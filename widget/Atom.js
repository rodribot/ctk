define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/aspect', // aspect
'dojo/on', // on
'dojo/data/ObjectStore', // ObjectStore
'dojo/i18n!../nls/base.js',
'../dictionary/atomStore', // atomStore
'dijit/form/FilteringSelect', // FilteringSelect
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dojo/text!./templates/atom.html', // template
'dijit/InlineEditBox', // InlineEditBox 
'dijit/form/NumberSpinner'], function(declare, lang, aspect, on, ObjectStore, i18n, atomStore, FilteringSelect, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {	
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {				

		templateString : template,

		constructor : function(args) {
			lang.mixin(this, args);
			this.i18n = i18n;
		},

		postCreate : function() {
			
			var me = this;
			this.inherited(arguments);
			
			var instantiatedSymbol = false, instantiatedZ = false;
			var symbolInlineEditBox = me.symbolInlineEditBox;
			var zInlineEditBox = me.zInlineEditBox;
			
			symbolInlineEditBox.on('Change', function(symbol) {
				var z = atomStore.get(symbol).number;
				if(zInlineEditBox.get('value') != z)
					zInlineEditBox.set('value', z);
				if(me.aInlineEditBox.get('value') < z)
					me.aInlineEditBox.set('value', z);
			});
			
			zInlineEditBox.on('Change', function(z) {
				var symbol = atomStore.query({number : me.zInlineEditBox.get('value')})[0].symbol;
				if(symbolInlineEditBox.get('value') != symbol)				
					symbolInlineEditBox.set('value', symbol);
				if(me.aInlineEditBox.get('value') < z)
					me.aInlineEditBox.set('value', z);
			});
			
			aspect.after(symbolInlineEditBox, 'edit', function(value) {
				if (!instantiatedSymbol) {
					instantiatedSymbol = true;														
					var widget = symbolInlineEditBox.wrapperWidget.editWidget;					
					widget.set('store', atomStore);
					widget.set('searchAttr', 'symbol');
				}
			});
			
			aspect.after(zInlineEditBox, 'edit', function(value) {
				if (!instantiatedZ) {
					instantiatedZ = true;														
					var widget = zInlineEditBox.wrapperWidget.editWidget;
					widget.set('store', atomStore);
					widget.set('searchAttr', 'number');
				}
			});
		}			
		
	});

});
