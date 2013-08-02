define(['dojo/_base/declare', // declare
'dojo/_base/lang', // lang
'../Atom', // Atom
'dojo/i18n!../nls/base.js', // i18n
'../dictionary/atomStore', // atomStore
'dijit/_WidgetBase', // _WidgetBase
'dijit/_TemplatedMixin', // _TemplatedMixin
'dijit/_WidgetsInTemplateMixin', // _WidgetsInTemplateMixin
'dojo/text!./templates/atomPlayer.html', // template
'dijit/form/HorizontalSlider', 'dijit/form/Button', 'dojo/NodeList-dom'], function(declare, lang, Atom, i18n, atomStore, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString : template,

		STATUS_PLAY : 'play',
		STATUS_PAUSE : 'pause',
		STATUS_END : 'end',					

		constructor : function(args) {
			args = args || {};
			lang.mixin(this, args);
			this.i18n = args.i18n || i18n;
			this.atom = args.atom || new Atom();
			this.secuenceAtom = new Atom({
				p : this.atom.get('e')
			});		
			this.atomWatches = [];
			this.status = this.STATUS_PAUSE;
		},

		_getAtomAttr : function() {
			return this.atom;
		},

		_setAtomAttr : function(atom) {
			var me = this;
			for (var i in this.atomWatches) {
				me.atomWatches[i].unwatch();
			}
			me.atom = atom;
			me.secuenceAtom.set('e', atom.get('e'));
			me.atomWatches.push(me.atom.watch('e', function(name, oval, nval) {
				me._configureSlider();
			}));

		},
		
		_getSecuenceAtomAttr : function() {
			return this.secuenceAtom;
		},

		_configureSlider : function() {
			var me = this;
			var e = me.atom.get('e');
			console.log('conf', e);			
			me.secuenceHorizontalSlider.set('value', 0);
			me.secuenceHorizontalSlider.set('maximum', e);
			me.secuenceHorizontalSlider.set('discreteValues', e + 1);			
		},

		postCreate : function() {

			var me = this;
			me.inherited(arguments);

			me._configureSlider();
			me.time;
			me.stopButton.on('Click', function() {
				clearInterval(me.time);
				me.secuenceHorizontalSlider.set('value', 0);
				me.playButton.set('label', i18n.PAUSE);
				me.status = me.STATUS_PAUSE;
			});
			me.playButton.on('Click', function() {				
				if(me.status == me.STATUS_PAUSE) {					
					me.playButton.set('label', i18n.PAUSE);
					me.status = me.STATUS_PLAY;
					me.time = setInterval(function() {
						if(me.secuenceHorizontalSlider.get('value') == me.secuenceHorizontalSlider.get('maximum')) {
							me.playButton.set('label', i18n.PLAY);
							me.status = me.STATUS_PAUSE;
							clearInterval(me.time);							
						}
						me.secuenceHorizontalSlider.increment(1);
					}, 800);
				} else if(me.status = me.STATUS_PLAY) {					
					clearInterval(me.time);
					me.playButton.set('label', i18n.PLAY);
					me.status = me.STATUS_PAUSE;
				}
			});
			me.secuenceHorizontalSlider.on('Change', function(v) {
				me.secuenceAtom.set('e', v);
			});
		}
	});

});
