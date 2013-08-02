define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'dojo/dom-construct', // domConstruct
'dojo/query', // query
'../Atom', // Atom
'dojo/i18n!../nls/base.js', // i18n 
'../dictionary/atomStore', // atomStore
'dojo/string', // string
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dijit/layout/ContentPane', // ContentPane
'dojo/text!./templates/orbitalPane.html', // template
'dojo/NodeList-traverse'], function(declare, lang, domConstruct, query, Atom, i18n, atomStore, string, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, template) {
	return declare([ContentPane, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString : template,
		
		ARROW_UP : '↑',
		
		ARROW_DOWN : '↓',
		
		TITLE_TEMPLATE : '<span class="orbital-title"><span class="n">${n}</span><span class="lLetter">${lLetter}</span><sup>${eUsed}</sup></span>',

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.i18n = args.i18n || i18n;
			this.orbital = args.orbital || {};			
			this.title = args.title || string.substitute(this.TITLE_TEMPLATE, this.orbital);
		},
		
		reset : function() {
						
			query(this.msTdNode).siblings().forEach(function(td) {
				domConstruct.destroy(td);
			});
			query(this.mlTdNode).siblings().forEach(function(td) {
				domConstruct.destroy(td);
			});
			var msArray = this.orbital.msArray;
			var mlArray = this.orbital.mlArray;
			for(var i in msArray) {
				domConstruct.create('td', {
					//'class' : 'invisible',
					innerHTML : (['', '<span>↑</span>', '<span>↑</span><span>↓<span>'])[msArray[i]]
				}, this.msTrNode);
				var ml;
				if(mlArray[i] == 0)
					ml = '<span>0</span>';
				else if(mlArray[i] > 0)
					ml = '<span>+' + mlArray[i] + '</span>';
				else
					ml = '<span>' + mlArray[i] + '</span>';
				domConstruct.create('td', {
					//'class' : 'invisible',
					innerHTML : ml
				}, this.mlTrNode);
			}
		},

		postCreate : function() {
			var me = this;
			me.inherited(arguments);
			me.reset();
		}
		
	});

});
