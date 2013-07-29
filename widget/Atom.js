define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/aspect', // aspect
'dojo/data/ObjectStore', // ObjectStore
'../dictionary/elementStore', // elementStore
'dijit/form/FilteringSelect', // FilteringSelect
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dojo/text!./templates/atom.html', // template
'dijit/InlineEditBox', 'dijit/form/NumberSpinner'], function(declare, lang, aspect, ObjectStore, elementStore, FilteringSelect, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {	
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {				

		templateString : template,

		constructor : function(args) {
			lang.mixin(this, args);
			this.i18n = {
				ATOM_SYMBOL : "Símbolo Atómico",
				ATOM_A : "Masa Atómica",
				ATOM_Z : "Número Atómico",
				ATOM_IONIZATION : "Estado de Ionización"
			};
		},

		postCreate : function() {
			var me = this;
			this.inherited(arguments);
			T = this;
			var instantiated = false;
			var symbolInlineBox = this.symbolInlineBox;
			
			symbolInlineBox.on('Change', function(symbol) {
				me.zInlineEditorBox.set('value', elementStore.get(symbol).number);
			});
			
			aspect.after(symbolInlineBox, 'edit', function(value) {
				if (!instantiated) {
					instantiated = true;														
					var widget = symbolInlineBox.wrapperWidget.editWidget;
					widget.set('store', elementStore);
					widget.set('searchAttr', 'symbol');
				}
			});
		}			
		
	});

});
