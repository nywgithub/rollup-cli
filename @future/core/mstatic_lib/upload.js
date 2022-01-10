/**
* upload
* @version 0.7.0
* @namespace FOCUS.widget
* @author lvxiang
*/
window.FOCUS = window.FOCUS || {};
;void function(window, document, undefined){
	this.UUID = new Date().valueOf().toString(16).toUpperCase();
	
	this.namespace = function(){
		var args = [].slice.call(arguments);
		var ns, tmp, prev;
		var ret = [];

		while(args.length){
			ns = args.shift().split(/\./);
			prev = window;

			while(ns.length){
				tmp = ns.shift();
				if(!prev[tmp]){
					prev[tmp] = {};
				}

				prev = prev[tmp];
			}
			
			ret.push(prev);
		}
		
		return ret.length > 1 ? ret : ret[0];
	};
	

	this.BASEPATH = window.FOCUS_BASEPATH || function(scripts){
		var location = window.location;
		var domain = /^(\w+\:\/{2,3}.+?)\//.exec(location.href)[1];
		//var r_base = /(^\/?|.*?\/)FOCUS\/[^?#]+\.js(?:[?#].*)?$/;
		var r_base = /(.*?\/)(?:[^\/]*?(?:base|upload|transmitter)[^\/]*?)\.js(?:[?#].*)?$/i;
		var r_isAbsPath = /^\w+\:\/\//;
		var r_isBackslash = /^\//;
		var r_path = /^.*\//;
		var base;
		var match;
		
		for(var i = 0, len = scripts.length; i < len; i++){
			var url = scripts[i].src;
			if(!r_isAbsPath.test(url)){
				if(r_isBackslash.test(url)){
					url = domain + url;
				}else{
					url = r_path.exec(location.href)[0] + url;
				}
			}else{ }
			
			match = r_base.exec(url);
			
			if(match){
				base = match[1];
				break;
			}
		}
		
		if(!base){
			base = r_path.exec(location.href)[0];
		}else{
			//if(location.protocol !== 'file:'){
				if(!r_isAbsPath.test(base)){
					base = base.replace(new RegExp(location.protocol + '\\/\\/' + location.host, 'i'), '');
					base = location.protocol + '\/\/' + location.host + base;
				}else{}
				
			//}else{ }
		}
		
		return base;
	}(document.getElementsByTagName('script'));
}.call(FOCUS, this, this.document);
;void function(window, document, undefined){
	var util = this.namespace('FOCUS.util');
	
	/**
	* type
	*/
	util.type = function(o){
		var _type;
		var r_native = /\{\s*\[native\s*code\]\s*\}/i;
		
		if(o === null){
			//for IE, use toString, it's '[object Object]'
			//for FF/Opera, it's '[object Window]'
			_type = 'null';
		}else if(typeof o === 'undefined'){
			//for IE, use toString, it's '[object Object]'
			//for FF/Opera, it's '[object Window]'
			_type = 'undefined';
		}else{
			_type = Object.prototype.toString.call(o).match(/\w+/g)[1].toLowerCase();
			
			//IE native function
			if(_type === 'object' && r_native.test(o + '')){
				_type = 'function';
			}
		}
		
		return _type;
	};
	
	/*
	* trim
	*/
	util.trim = function(str){
		return (str + '').replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
	};
	
	/*
	* JSON
	*/
	util.JSON = function(JSON){
		var _JSON = {};
		if(JSON){
			_JSON.stringify = JSON.stringify;
		}else{
			_JSON.stringify = function(){ return '' };
		}
		
		_JSON.parse = function(jsonStr){
			var ret;
			
			if(util.type(jsonStr) === 'string'){
				try{
					ret = new Function('return ' + jsonStr)();
				}catch(ex){
					ret = {};
				}
			}else{
				ret = jsonStr;
			}
			
			return ret;
		};
		
		return _JSON;
	}.call(this, window.JSON);
	
	
	/**
	* browser
	*/
	util.browser = function(ua){
		var r_msie = /msie\s*(\d+\.\d+)/;
		var r_ff = /firefox\/(\d+\.\d+)/;
		var r_webkit = /webkit\/(\d+\.\d+)/;
		var r_chrome = /chrome\/(\d+\.\d+)/;
		var r_safari = /safari\/(\d+\.\d+)/;
		var r_opera = /opera/;
		var r_ver = /version\/(\d+\.\d+)/;
		
		var ret = {};
		var match;
		
		match = r_msie.exec(ua);
		if(match){
			ret.msie = true;
			ret.version = match[1];
			
			return ret;
		}
		
		match = r_ff.exec(ua);
		if(match){
			ret.mozilla = ret.firefox = true
			ret.version = match[1];
			
			return ret;
		}
		
		match = r_webkit.exec(ua);
		if(match){
			ret.webkit = true;
			ret.version = match[1];
			
			if(window.chrome){
				ret.chrome = true;
				ret.version = r_chrome.exec(ua);
				if(ret.version){
					ret.version = ret.version[1];
				}
				
				return ret;
			}
			
			match = r_safari.exec(ua);
			if(match){
				ret.safari = true;
				ret.version = [1];
			}
			
			return ret;
		}
		
		match = r_opera.exec(ua);
		if(match && window.opera){
			ret.opera = true;
			ret.version = r_ver.exec(ua)[1];
		}

		return ret;
		
	}.call(this, window.navigator.userAgent.toLowerCase());
	
	/*
	* flash plugin
	*/
	util.flash = function(nav, plugins){
		var flash = {
			has: false,
			version: 0
		};

		//flash check
		var SHOCKWAVE_FLASH = "Shockwave Flash";
		var SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash";
		var FLASH_MIME_TYPE = "application/x-shockwave-flash";

		try{
			var rv = /\d+/g;
			var ax = new ActiveXObject(SHOCKWAVE_FLASH_AX);
			
			rv.exec('');
			
			flash = {
				has: true,
				version: ax.GetVariable("$version").match(rv).join('.')
			};
		}catch(ex){
			if(plugins.length
				&& plugins[SHOCKWAVE_FLASH]
				&& plugins[SHOCKWAVE_FLASH].description
				&& !(typeof nav.mimeTypes !== 'undefined'
					&& nav.mimeTypes[FLASH_MIME_TYPE]
					&& !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)
			){ // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				flash = {
					has: true,
					version: /\d+\.\d+/.exec(plugins[SHOCKWAVE_FLASH].description)[0]
				};
			}
		}
		
		return flash;
	}.call(this, window.navigator, window.navigator.plugins);
	
	/**
	* extend
	*/
	util.extend = function(){
		var me = arguments.callee;
		var start, override;

		if(util.type(arguments[0]) !== 'object'){
			start = 1;
			override = !!arguments[0];
		}else{
			start = 0;
			override = false;
		}

		var tar = arguments[start] || {};
		var args = [].slice.call(arguments, start + 1);
		
		var tmp;
		var type;
		while(args.length){
			tmp = args.shift();
			if(util.type(tmp) !== 'object'){
				continue;
			}
			
			var t;
			for(var key in tmp){
				t = tmp[key];
				
				if(util.type(t) === 'object'){
					if(t == window || t == document || ('childNodes' in t && 'nextSibling' in t && 'nodeType' in t)){
						if(!(!override && (key in tar))){
							tar[key] = t;
						}
						
						continue;
					}
					
					type = util.type(tar[key]);
					if(!(key in tar) || type === 'undefined' || type === 'null'){
						tar[key] = {};
					}
					
					if(util.type(tar[key]) === 'object'){
						me(override, tar[key], t);
					}
				}else if(!(!override && (key in tar))){
					tar[key] = t;
				}
				
			}
		}
		
		return tar;
	};
	
	/*
	* log4js
	*/
	util.console = function(console){
		var logStat = false;
		var noop = function(){};
		
		var SWITCH = {
			ON: true,
			OFF: false
		};
		
		var _loger = {
			SWITCH: SWITCH,
			turn: function(stat){
				logStat = SWITCH[!!stat ? 'ON' : 'OFF'];
			},
			log: noop,
			info: noop,
			warn: noop,
			error: noop,
			debug: noop
		};
		
		if(!console){
			return _loger;
		}
		
		if(!console.debug){
			console.debug = console.log;
		}
		
		if(!console.error){
			console.error = console.warn;
		}
		
		return util.extend(true, _loger, {
			log: function(msg){
				if(logStat === SWITCH.ON){
					console.log(msg);
				}
			},
			info: function(msg){
				if(logStat === SWITCH.ON){
					console.info(msg);
				}
			},
			warn: function(msg){
				if(logStat === SWITCH.ON){
					console.warn(msg);
				}
			},
			error: function(msg){
				if(logStat === SWITCH.ON){
					console.error(msg);
				}
			},
			debug: function(msg){
				if(logStat === SWITCH.ON){
					console.debug(msg);
				}
			}
		});
	}.call(window, window.console);
	
	/*
	* indexOf
	*/
	util.indexOf = function(items, value){
		if(items.indexOf){
			return items.indexOf(value);
		}
		
		var ret = -1;
		var i = 0, len = items.length;
		for(; i < len; i++){
			if(items[i] === value){
				ret = i;
				break;
			}
		}
		
		return ret;
	};
	
	/*
	* unique array
	*/
	util.unique = function(arr){
		var ret = [];
		
		for(var i = 0, len = arr.length; i < len; i++){
			if(util.indexOf(ret, arr[i]) === -1){
				ret.push(arr[i]);
			}
		}
		
		return ret;
	};
	
	/*
	* random  -- Int
	*/
	util.random = function(){
		var cache = {};
		
		return function(min, max, clear){
			min = min || 0;
			max = util.type(max) === 'number' && !isNaN(max)
				? max === min
					? max + 10
					: max
				: min + 10;
			
			var group = min + '_' + max;
			
			if(!cache[group]){
				cache[group] = [];
			}
			
			if(cache[group].length === max - min){
				cache[group] = [];
				util.type(clear) === 'function' && clear.call(this);
			}
			
			var ret;
			while(true){
				ret = min + ~~(Math.random() * (max - min));
				if(util.indexOf(cache[group], ret) === -1){
					cache[group].push(ret);
					break;
				}
			}
			
			return ret;
		};
	}.call(this);
	
	/**
	* create element
	*/
	util.createElement = function(){
		var closeSelf = ',meta,base,link,img,input,br,hr,area,sharp,';
	
		var tagStrConstructor = function(config){
			var cfg = util.extend(true, {}, config);
			
			var fragment = ['<', cfg.el];
			var el = cfg.el;
			delete cfg.el;
			
			for(var name in cfg){
				fragment.push(' ', name, '="', cfg[name], '"');
			}
			
			fragment.push((closeSelf.indexOf(',' + el + ',') === -1 ? ('></' + el + '>') : ' />'));
			
			return fragment.join('');
		};
		
		//elems generator
		var _createElem = function(config, doc){
			doc = doc || document;

			var cfg = {};
			util.extend(true, cfg, config);
			
			var isTextarea = cfg.el.toLowerCase() === 'textarea';
			var el = tagStrConstructor(cfg);
			var elem;

			var fail = false;
			
			try{
				elem = doc.createElement(el);
			}catch(ex){
				fail = true;
				elem = doc.createElement(cfg.el);
				delete cfg.el;
			}
			
			if(fail){
				for(var key in cfg){
					elem[key] = cfg[key];
				}
			}
			
			if(isTextarea){
				elem.value = cfg.value;
			}
			
			if(elem.tagName.toLowerCase() === 'input'){
				var type = cfg.type ? cfg.type : 'text';
				elem.type = type;
			}
			
			return elem;
		};
		
		return _createElem;
	}.call(this);
	
	/*
	* event
	*/
	util.event = function(){
		var __bind = function(standard){
			return standard
				? function(elem, type, event){
					elem.addEventListener(type, event, false);
				}
				: function(elem, type, event){
					elem.attachEvent('on' + type, event);
				}
		}.call(this, !!window.addEventListener);
		
		var __remove = function(standard){
			return standard
				? function(elem, type, event){
					elem.removeEventListener(type, event);
				}
				: function(elem, type, event){
					elem.detachEvent('on' + type, event);
				}
		}.call(this, !!window.removeEventListener);
		
		var prefix = 'FOCUS_EVENTS_'
		var uuid = (new Date).valueOf();
		var group = prefix + uuid;
		
		var execEvent = function(e, events){
			for(var i = 0, len = events.length; i < len; i++){
				events[i].handler.apply(this, [e].concat(events[i].params));
			}
		};
		
		var find = function(events, event){
			var ret = -1;
			for(var i = 0, len = events.length; i < len; i++){
				if(events[i].handler === event){
					ret = i;
					break;
				}
			}
			
			return ret;
		};
		
		var _bind = function(elem, type, event){
			if(!elem[group]){
				elem[group] = {};
			}
			
			var events = elem[group];
			
			if(!events[type]){
				events[type] = [];
				__bind(elem, type, function(e){
					e = e || window.event;
					
					execEvent.call(elem, e, events[type]);
				});
			}
			
			events[type].push({
				handler: event,
				params: [].slice.call(arguments, 3)
			});
		};
		var _remove = function(elem, type, event){
			if(!elem[group] || (elem[group] && !elem[group][type]) || (elem[group] && !elem[group][type].length)){
				return; 
			}
			
			var events = elem[group][type];
			if(!event){
				events = [];
				return;
			}
			
			var index = find(events, event);
			if(index == -1){
				return;
			}
			
			events.splice(index, 1);
		};
		
		return {
			bind: _bind,
			remove: _remove
		};
	}.call(this);
	
	/*
	* upload environment feature
	*/
	util.feature_upload = function(nav){
		/* var _flash = function(){
			var flash = util.flash;
			var v = (flash.version + "").split('.');
			var v0 = parseInt(v[0], 10);
			var v1 = parseInt(v[1] || 0, 10);
			var v2 = parseInt(v[2] || 0, 10);
			// 9.0.28+
			var ret = flash.has && (v0 > 9 || (v0 === 9 && (v1 > 0 || (v1 === 0 && v2 >= 28))));
			
			//win vista/7 + flash plugin 11.3 + ff 4-13 == problem
			if(flash && flash.has && nav.oscpu && util.browser.firefox && util.browser.version >= 4 && util.browser.version <= 13){
				var r_sys = /windows\s*nt\s*([\d\.]+)/i;
				var match = r_sys.exec(nav.oscpu);
				
				if(match && (/^6\.0/.test(match[1]) || /^6\.1/.test(match[1])) && /^11\.3/.test(flash.version)){
					ret = false;
				}
			}
			
			return ret;
		}.call(this); */

		var _flash = false;
		
		var _html5 = function(){
			if(util.browser.firefox && util.browser.version < 3.6){
				return false;
			}
			
			var ret = {};
			
			var fileElem = document.createElement('input');
			fileElem.type = 'file';
			fileElem.style.cssText = 'position:absolute; top:-999px; height:-999px;';
			document.body.appendChild(fileElem);
			
			//setTimeout(function(){
				ret.file = !!fileElem.files;
				ret.multiple = ('multiple' in fileElem) && !(util.browser.apple && util.browser.version < 6);
				
				document.body.removeChild(fileElem);
				delete fileElem;
			//}, 25);
			
			if(!window.XMLHttpRequest){
				ret = false;
				return ret;
			}
			
			var xhr = new XMLHttpRequest();
			//standard html5 xhr object
			ret.upload = !!xhr.upload;
			//ff
			ret.sendAsBinary = !!xhr.sendAsBinary;
			//native FormData
			ret.FormData = !!window.FormData && !window.FormData.customized;
			
			delete xhr;
			
			return ret;
		}.call(this);
		
		var _iframe = function(){
			var ret = {};
			var domain = document.domain;
			var host = window.location.host || window.location.hostname;
			
			ret.sameDomain = domain === host;
			
			return ret;
		}.call(this);
		
		return {
			html5: _html5,
			flash: _flash,
			iframe: _iframe
		};
	}.call(this, window.navigator);
	
	util.sizeConvert = function(){
		var Unit = {
			KB: 1024,
			MB: 1024 * 1024,
			GB: 1024 * 1024 * 1024/*,
			TB: 1024 * 1024 * 1024,
			PB: 1024 * 1024 * 1024 * 1024*/
		};
		
		var UnitSize = function(size, unit){
			this.size = size;
			this.unit = unit;
		};
		
		UnitSize.prototype = {
			toString: function(){
				return this.size + ' ' + this.unit;
			},
			valueOf: function(){
				return this.size;
			}
		};

		var r_unit = /^((?:\d+)(?:\.\d+)?)\s*([A-Za-z]*)$/g;
		var r_hasUnit = /([A-Za-z]+)$/;
		
		/*
		* convert Size with Unit to Size in bytes
		*/
		var _unit2Bytes = function(unitSize){
			var size = 0;
			
			if(r_hasUnit.test(unitSize)){
				r_unit.exec('');
				var unit = r_unit.exec(unitSize);
				if(unit){
					size = (parseFloat(unit[1]) || 0) * (unit[2] ? Unit[unit[2].toUpperCase()] : 1024);
				}else{}
			}else{
				size = parseInt(unitSize) || 0;
			}
			
			//size === 0  ===> no size limit(-1)
			size = size || 0;

			return size;
		};
		
		
		/*
		* convert Size in bytes to Size with Unit
		*/
		var _bytes2Unit = function(bytes, unit){
			var size = 0;
			var unitList = ['GB', 'MB', 'KB'];
			
			unit = unit || '';
			if(!unit){
				for(var i = 0; i < unitList.length; i++){
					if(bytes > Unit[unitList[i]]){
						unit = unitList[i];
						break;
					}
				}
			}
			
			if(unit){
				size = bytes / Unit[unit];
			}
			
			size = size || 0;
			size = new UnitSize(size, unit);
			
			return size;
		};
		
		return {
			unit2Bytes: _unit2Bytes,
			bytes2Unit: _bytes2Unit
		};
	}.call(this);
	
	//FormData  -- for FireFox 3.x (has no class FromData, has xhr.sendAsBinary)
	if(!window.FormData && util.feature_upload.html5.sendAsBinary){
		window.FormData = function(charset){
			this.charset = charset || 'UTF-8';
			this.reset();
		};
		window.FormData.prototype = {
			append: function(name, content){
				var _data = '';
				var EOL = this.EOL;
				var boundary = '--' + this.boundary;
				
				var type = util.type(content);
				
				if(type === 'object'){
					content = JSON.stringify(content);
					type = 'string';
				}
				
				_data += boundary + EOL;
				_data += 'Content-Disposition: form-data; ';
				
				if(type === 'file'){
					_data += 'name="' + this.encode(name) + '"; ';
					_data += 'filename="' + this.encode(content.filename || content.name) + '"' + EOL;
					_data += 'Content-Type: ' + (content.type ? content.type : 'application/octet-stream') + EOL + EOL;
					_data += content.getAsBinary() + EOL;
				}else{
					_data += 'name="' + this.encode(name) + '"' + EOL + EOL;
					_data += this.encode(content) + EOL;
				}
				
				this.data += _data;
			},
			getData: function(){
				return this.data + '--' + this.boundary + '--' + this.EOL;
			},
			valueOf: function(){
				return this.getData();
			},
			toString: function(){
				return this.getData();
			},
			reset: function(){
				this.data = '';
				// 71 -- Firefox's tradition
				this.boundary = "---------------------------71" + (new Date).valueOf().toString(16).replace(/^0x/, '');
				this.EOL = '\r\n';
			},
			encode: function(str){
				if(util.transformCharset){
					return util.transformCharset(str, this.charset);
				}else{
					return encodeURI(str);
				}
			}
		};
		
		//customized flag
		window.FormData.customized = true;
	}
	
	
	var MIME_TYPE = {
		'*/*':			'*.*',
		'image/*':		'*.jpg; *.jpeg; *.jpe; *.png; *.gif',
		'image/png':	'*.png',
		'image/jpeg':	'*.jpg; *.jpeg; *.jpe',
		'image/jpg':	'*.jpg; *.jpeg; *.jpe',
		'image/gif':	'*.gif',
		'image/bmp':	'*.bmp',
		'application/gzip':		'*.gz',
		'application/zip':		'*.zip',
		'application/vnd.ms-excel':	'*.xls',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':	'*.xlsx',
		'application/msword':	'*.doc',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document':	'*.docx',
		'application/vnd.ms-powerpoint':	'*.ppt',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation':	'*.pptx',
		'application/mshelp':		'*.hlp; *.chm',
		'application/pdf':			'*.pdf',
		'application/mp3':	'*.mp3',
		'text/html':		'*.html; *.htm; *.xhtml',
		'text/javascript':	'*.js',
		'text/css':			'*.css',
		'text/plain':		'*.txt',
		'default':		'*.*'
	};
	
	var FILE_TYPE = function(mime){
		var exclude = ['image/*', 'image/jpg', 'default'];
		var type = {};
		
		for(var key in mime){
			if(util.indexOf(exclude, key) === -1){
				mime[key].replace(/[^\;\u0020]+/g, function($1){
					type[$1] = key;
				});
			}
		}
		
		return type;
	}(MIME_TYPE);
	
	/*
	* '*.*; *.jpg' to MIME_TYPE
	*/
	util.convert2MimeTypes = function(types){
		types = types.split(/[\;\,]\s*/);
		
		var tmpRet = [];
		var ret = '';
		if(types.length){
			var r = /^[^\/]+\/[^\/]+$/;
			for(var i = 0; i < types.length; i++){
				if(r.test(types[i])){
					tmpRet.push(types[i]);
					continue;
				}
				
				if(types[i] in FILE_TYPE && types[i] !== '*.*'){
					tmpRet.push(FILE_TYPE[types[i]]);
				}else{
					ret = '*/*';
					break;
				}
			}
			
			if(!ret){
				ret = util.unique(tmpRet).join(', ');
			}
		}else{
			ret = '*/*';
		}
		
		return ret;
	};
	
	/*
	* MIME_TYPE to '*.*; *.jpg'
	*/
	util.convertMimeTypes = function(mime){
		mime = mime.split(/[\;\,]\s*/);
		
		var tmpRet = [];
		var ret = '';
		if(mime.length){
			var r = /^[^\\\/]+\.[^\\\/]+$/;
			for(var i = 0; i < mime.length; i++){
				if(r.test(mime[i])){
					tmpRet.push(mime[i]);
					continue;
				}
				
				if(mime[i] in MIME_TYPE && mime[i] !== '*/*'){
					tmpRet.push(MIME_TYPE[mime[i]]);
				}else{
					ret = '*.*';
					break;
				}
			}
			
			if(!ret){
				ret = util.unique(tmpRet).join('; ');
			}
		}else{
			ret = '*.*';
		}
		
		return ret;
	};
	
	/*
	* validate mime type
	*/
	util.mimeValidation = function(mimeSet, sub){
		if((mimeSet + '').indexOf('*/*') !== -1){
			return true;
		}
		
		sub = sub + '';
		var type = util.type(mimeSet);
		if(type === 'string'){
			mimeSet = mimeSet.split(/[\;\,\s]+/);
		}
		
		var ret = false;
		var r = /^([^\/]+)\/([^\/]+)$/;
		var matchSub = r.exec(sub);
		var match;
		
		if(!matchSub){
			return false;
		}
		
		for(var i = 0; i < mimeSet.length; i++){
			match = r.exec(mimeSet[i]);
			if(mimeSet[i] === sub
			|| (match[1] === matchSub[1] && (match[2] === '*' || match[2] === matchSub[2]))){
				ret = true;
				break;
			}
		}
		
		return ret;
	};
	
	/**
	* class
	*/
	util.addClass = function(elem, clazz){
		var clz = util.trim(elem.className).split(/\s+/);
		if(util.type(clazz) === 'string'){
			[].push.apply(clz, clazz.split(/\s+/));
		}
		
		elem.className = util.unique(clz).join(' ');
	};
	
	util.removeClass = function(elem, clazz){
		var clz = util.unique(util.trim(elem.className).split(/\s+/));
		
		if(util.type(clazz) === 'string'){
			clazz = clazz.split(/\s+/);
		}else{
			clazz = [];
		}
		
		var tmpClz;
		var index = -1;
		
		while(clazz.length){
			tmpClz = clazz.shift();
			index = util.indexOf(clz, tmpClz);
			
			if(index !== -1){
				clz.splice(index, 1);
			}
		
		}
		
		elem.className = clz.join(' ');
	};

}.call(FOCUS, this, this.document);






































;void function(window, document, undefined){
	this.namespace('FOCUS.widget');
	
	var util = this.util;
	var widget = this.widget;
	var noop = function(){};
	
	////required swfupload
	//FOCUS.widget.Upload_Flash = SWFUpload;
	
	var envir = function(){
		var feature = util.feature_upload;
		return {
			flash: true,//feature.flash,
			html5: feature.html5 && (feature.html5.upload && /*feature.html5.file && */(feature.html5.sendAsBinary || feature.html5.FormData)),
			iframe: true
		};
	}.call(this);
	

	var upload = widget.Upload = function(cfg){
		upload.__defaults__();
		this.cfg = util.extend(true, {}, upload.defaults);
		
		this.set(cfg);
		if(upload.plugins.UploadEvents){
			this.uploadEvents = new upload.plugins.UploadEvents(this.cfg.events);
			this.set({
				events: this.uploadEvents.events
			});
		}
		this._ = {};
		this.init();
		
		return this.instance;
	};
	
	upload.prototype = {
		init: function(){
			var _this = this;
			var priority = this.cfg.priority;
			
			// 加载 css 文件
			if(this.cfg.css.uri){
				var uri;
				
				if(/^https?:\/\/|^\//i.test(this.cfg.css.uri)){
					uri = this.cfg.css.uri;
				}else{
					uri = FOCUS.BASEPATH + 'css/' + this.cfg.css.uri;
				}
				
				
				if(!upload.__LOADED_CSS__[uri]){
					var link = document.createElement('link');
					link.rel = 'stylesheet';
					link.href = uri;
					document.getElementsByTagName('head')[0].appendChild(link);
					
					upload.__LOADED_CSS__[uri] = true;
				}
			}
			
			//setTimeout(function(){
				var type;
				for(var i = 0; i < priority.length; i++){
					if(envir[priority[i]]){
						type = priority[i];
						break;
					}
				}
				
				var CLZ = {
					'html5': 'Upload_HTML5',
					// 'flash': 'Upload_Flash',
					'iframe': 'Upload_Iframe'
				};

				if(type === "flash"){
					type = "html5";
				}
				
				if(type){
					/* if(type === upload.MODE.FLASH){
						//wrap file object in flash event
						for(var ename in this.cfg.events){
							this.cfg.events[ename] = function(handle, ename){
								var _File = upload.File4Flash;
								return function(file){
									if(file && file.id){
										handle.apply(this, [new _File(file)].concat([].slice.call(arguments, 1)));
									}else{
										handle.apply(this, [].slice.call(arguments, 0));
									}
								};
							}.call(this, this.cfg.events[ename], ename);
						}
				
						this.cfg.fileTypes = util.convertMimeTypes(this.cfg.fileTypes); // mimetype ==> suffix type  ------> TODO
						//this.cfg.placeholder = this.cfg.placeholder.replace(/^#/, '');

						var ready = this.cfg.events.ready;
						this.cfg.events.ready = function(ready){
							return function(){
								// make sure the flash loaded success
								setTimeout(function(){
									_this.instance.isReady = true;
									ready.call(_this.instance, type);
								}, 25);
							};
						}(ready);
					}else{ // */
						this.cfg.fileTypes = util.convert2MimeTypes(this.cfg.fileTypes);
					/* } */
					
					// UI & Events contruct
					this.instance = new widget[CLZ[type]](this.cfg);
					
					//if(type !== upload.MODE.FLASH){
						// make sure the dom elements loaded && script excuted
						//setTimeout(function(){
							// callback for choose which type to initialize
							//_this.cfg.events.ready.call(_this.instance, type);
						//}, 25);
					//}else{ //Flash
						//that = this.instance;
						//this.instance = this.instance.instance;
					//}
					
					var plugs = upload.plugins;
					//bind event handle
					if(plugs.UploadEvents){
						this.uploadEvents.bindThisObj(this.instance);
						'on,one,off,fire'.replace(/(\w+)/g, function($1){
							_this.instance[$1] = function(){
								_this.uploadEvents[$1].apply(_this.uploadEvents, arguments);
								return _this.instance;
							};
						});
					}
					
					//<--
					//execute plugins
					for(var pname in plugs){
						pname.replace(/([\$\^\[\]\\\/\,\?\:\|\{\}\!\(\)\*\-\+])/g, '\\$1');
						if(pname !== 'UploadEvents' && new RegExp('(^|,)' + pname + '(,|$)').exec(this.cfg.plugins)){
							plugs[pname].call(this.instance, this.instance.mode);
						}
					}
					/////-->
				}else{
					throw 'not support this constructor.';
				}
			//}, 25);
		},
		set: function(cfg){
			var plugins = this.cfg.plugins;
			if(cfg && cfg.plugins && util.type(cfg.plugins) === 'string'){
				plugins += (',' + cfg.plugins);
				plugins = util.unique(plugins.split(/[,;\s]+/)).join(',');
			}
			
			
			var skin = cfg && cfg.skin;
			var skinCSS = {};
			var css = cfg && cfg.css || {};
			
			if(skin && skin in upload.CSS){
				skinCSS = upload.CSS[skin];
			}
			
			css = util.extend(true, {}, upload.CSS.DEFAULT, this.cfg.css, skinCSS, css);
			
			util.extend(true, this.cfg, cfg, {css: css});
			
			this.cfg.plugins = plugins;
		}
	};
	
	upload.__defaults__ = function(){
		if(upload.defaults){
			return upload.defaults;
		}
		
		return (upload.defaults = {
			priority: upload.PRIORITY.DEFAULT,
			events: {
				ready: noop,
				loadFailed: noop,
				dialogStart: noop,
				dialogComplete: noop,
				queued: noop,
				queueError: noop,
				uploadStart: noop,
				uploadProgress: noop,
				uploadSuccess: noop,
				uploadError: noop,
				uploadComplete: noop
			},
			button: {
				//width: 120,
				//height: 32,
				text: 'Upload'
			},
			multiple: true,
			sizeLimit: -1,
			uploadLimit: -1,
			queueLimit: -1,
			fileTypes: upload.MIME_TYPE.ALL,
			uploadURL: '',
			filePostName: '',
			placeholder: '#uploader',
			debug: false,
			plugins: 'AutoDisabled',
			fileTypesDescription: 'All Files',
			//css: upload.CSS['DEFAULT'],
			skin: 'DEFAULT',
			timeout: 600000
		});
	};
	
}.call(FOCUS, this, this.document);










































;void function(window, document, undefined){
	var upload = this.widget.Upload;
	var util = this.util;
	
	var MODE = upload.MODE = {
		HTML5: 'html5',
		FLASH: 'html5',
		IFRAME: 'iframe',
		DEFAULT: 'html5'
	};
	
	upload.PRIORITY = {
		DEFAULT: [ MODE.HTML5, /* MODE.FLASH, */ MODE.IFRAME ]
	};
	
	upload.MIME_TYPE = {
		ALL: '*/*',
		IMAGE: 'image/*',
		JPG: 'image/jpeg',
		JPEG: 'image/jpeg',
		PNG: 'image/png',
		GIF: 'image/gif',
		PDF: 'application/pdf',
		DOC: 'application/msword',
		DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		XLS: 'application/vnd.ms-excel',
		XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		PPT: 'application/vnd.ms-powerpoint',
		PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		TXT: 'text/plain',
		UNKNOWN: 'application/octet-stream'
	};
	
	upload.QUEUE_ERROR = {
		QUEUE_LIMIT_EXCEEDED            : -100,
		FILE_EXCEEDS_SIZE_LIMIT         : -110,
		ZERO_BYTE_FILE                  : -120,
		INVALID_FILETYPE                : -130,
		CHAIN_ERROR						: -140 //use iframe method upload, if browser support html5, an error occured on one file object will lead other files to occured error
	};
	
	upload.UPLOAD_ERROR = {
		HTTP_ERROR                      : -200,
		MISSING_UPLOAD_URL              : -210,
		IO_ERROR                        : -220,
		SECURITY_ERROR                  : -230,
		UPLOAD_LIMIT_EXCEEDED           : -240,
		UPLOAD_FAILED                   : -250,
		SPECIFIED_FILE_ID_NOT_FOUND     : -260,
		FILE_VALIDATION_FAILED          : -270,
		FILE_CANCELLED                  : -280,
		UPLOAD_STOPPED                  : -290,
		RESIZE                          : -300,
		TIMEOUT							: -310
	};
	
	upload.FILE_STATUS = {
		QUEUED       : -1,
		IN_PROGRESS  : -2,
		ERROR        : -3,
		COMPLETE     : -4,
		CANCELLED    : -5,
		NEW			 : -6
	};
	
	upload.UPLOAD_TYPE = {
		SINGLE:	1,
		MULTI:	2
	};

	upload.BUTTON_ACTION = {
		SELECT_FILE             : -100,
		SELECT_FILES            : -110,
		START_UPLOAD            : -120,
		JAVASCRIPT              : -130,	// DEPRECATED
		NONE                    : -130
	};
	
	upload.CURSOR = {
		POINTER					: -2,
		DEFAULT					: -1
	};
	
	upload.CSS = {
		DEFAULT: {
			uri: '',
			
			/*WRAP:		'upload-wrap',
			SELECTOR:	'upload-selector',
			FLASH:		'upload-flashwrap',
			TEXT:		'upload-text',
			DISABLED:	'upload-wrap-disabled',
			HOVER:		'upload-wrap-hover'*/
			
			WRAP:		'FOCUS_UPLOAD_wrap upload-wrap',
			SELECTOR:	'FOCUS_UPLOAD_selector upload-selector',
			FLASH:		'FOCUS_UPLOAD_flashWrap upload-flashwrap',
			TEXT:		'FOCUS_UPLOAD_text upload-text',
			DISABLED:	'FOCUS_UPLOAD_wrap_disabled upload-wrap-disabled',
			HOVER:		'FOCUS_UPLOAD_wrap_hover upload-wrap-hover'
		},
		LARGE: {
			uri: '',
			
			WRAP:		'large-upload-wrap',
			SELECTOR:	'large-upload-selector',
			FLASH:		'large-upload-flashwrap',
			TEXT:		'large-upload-text',
			DISABLED:	'large-upload-wrap-disabled',
			HOVER:		'large-upload-wrap-hover'
		}
	};
	
	upload.addSkin = function(name, skin){
		var defaults = {
			uri:		'',
			
			WRAP:		'',
			SELECTOR:	'',
			FLASH:		'',
			TEXT:		'',
			DISABLED:	'',
			HOVER:		''
		};
		
		upload.CSS[name] = util.extend(true, {}, defaults, skin);
	};
	
	upload.removeSkin = function(name){
		delete upload.CSS[name + ''];
	};
	
	// 
	upload.__LOADED_CSS__ = {};
	
	upload.CHARSET = {
		UTF8:		'UTF-8',
		GBK:		'GBK',
		GB2312:		'GB2312',
		BIG5:		'BIG5',
		DEFAULT:	'UTF-8'
	};
	
	upload.TURNING = {
		ON:		true,
		OFF:	false
	};
	
	var _getFilename = function(fullname, ret){
		ret = ret || {};
		
		var nameFrag = fullname.split(/\./);
			
		if(nameFrag.length > 1){
			ret.suffix = nameFrag.pop();
		}else{
			ret.suffix = '';
		}
		
		ret.name = nameFrag.join('.');
		
		return ret;
	};
	
	upload.File = function(file){
		if(!file){
			return;
		}

		var _file = { data: file };
		_file.id = 'FOCUS_UPLOAD_' + (util.random(0, 1000000) + ~~((new Date()).valueOf() / 10000000)).toString(16).toUpperCase();
		
		if(file.tagName && file.tagName.toLowerCase() === 'input' && file.type === 'file'){
			var r_fullname = /[^\/\\]+$/;
			var fullname = r_fullname.exec(file.value);
			if(fullname){
				_file.fullname = fullname[0];
				_getFilename(_file.fullname, _file);
			}
			
			if(_file.suffix){
				_file.type = _file.suffix.toUpperCase() in upload.MIME_TYPE ? upload.MIME_TYPE[_file.suffix.toUpperCase()] : '';
			}else{
				_file.type = '';
			}
		}else{
			_file.size = file.filesize || file.size || 0;
			_file.type = file.type || '';
			_file.fullname = file.filename || file.name || '';
			
			_getFilename(_file.fullname, _file);
			
			if(!_file.type){
				if(_file.suffix){
					_file.type = _file.suffix.toUpperCase() in upload.MIME_TYPE ? upload.MIME_TYPE[_file.suffix.toUpperCase()] : '';
				}else{
					_file.type = '';
				}
			}
		}
		
		_file.status = upload.FILE_STATUS.NEW;
		
		return _file;
	};
	
	upload.File4Flash = function(file){
		if(!file){
			return;
		}

		this.data = file;
		this.id = file.id;
		this.size = file.size;
		this.status = file.filestatus;
		
		_getFilename(file.name, this);
		
		if(file.type){
			this.suffix = file.type.replace(/^\./, '');
		}else{}
		
		this.type = upload.MIME_TYPE[this.suffix.toUpperCase()] || '';
		this.fullname = file.name;
	};
}.call(FOCUS, this, this.document);
;void function(window, document){
	FOCUS.namespace('FOCUS.widget');
	var noop = function(){};
	
	var util = this.util;
	var query = this.query;
	var widget = this.widget;
	var upload = widget.Upload;
	//var CSS = upload.CSS;
	var MODE = upload.MODE;
	var UPLOAD_ERROR = upload.UPLOAD_ERROR;
	var FILE_STATUS = upload.FILE_STATUS;
	
	widget.UploadBase = function(){
		/*this.elems = {};
		this.cfg = {
			priority: FOCUS.widget.Upload.PRIORITY.DEFAULT,
			events: {
				ready: noop,
				loadFailed: noop,
				dialogStart: noop,
				dialogComplete: noop,
				queued: noop,
				queueError: noop,
				uploadStart: noop,
				uploadProgress: noop,
				uploadSuccess: noop,
				uploadError: noop,
				uploadComplete: noop
			},
			button: {
				text: 'Upload'
			},
			// single or multi file(s) selection dialog
			// except: some browser such as ie6-9 not support multiple on input:file
			multiple: true,
			sizeLimit: -1,
			//uploadLimit: -1, //not support now
			queueLimit: -1,
			fileTypes: FOCUS.widget.Upload.MIME_TYPE.ALL,
			fileTypesDescription: 'All Files',
			uploadURL: '',
			filePostName: '',
			placeholder: '',
			charset: FOCUS.widget.Upload.CHARSET.DEFAULT,
			debug: false,
			timeout: 100000,
			css: upload.CSS['DEFAULT'],
			skin: 'DEFAULT'
		};
		
		this._ = {
			queue: [],
			uploadingFile: null
		};*/
	};
	widget.UploadBase.prototype = {
		init: noop,
		set: function(cfg){
			this.cfg = util.extend(true, this.cfg, cfg);
		},
		debug: function(stat){
			util.log.turn(!!stat);
		},
		//Propertis
		//TODO
		
		////////Methods
		startUpload: noop,
		getFile: noop,
		
		//////implementation methods
		cancelUpload: function(callback){
			var file = this.getQueueFile();
			if(file){
				file.status = FILE_STATUS.CANCELLED;
				if(util.type(callback) === 'function'){
					this.one('uploadError', callback);
				}
				this.cfg.events.uploadError.call(this, file, UPLOAD_ERROR.FILE_CANCELLED, 'file cancelled.');
				this.elems.poster && this.elems.poster.abort();
			}
		},
		stopUpload: function(callback){
			var file = this.getQueueFile();
			if(file){
				file.status = FILE_STATUS.QUEUED;
				if(util.type(callback) === 'function'){
					this.one('uploadError', callback);
				}
				this.cfg.events.uploadError.call(this, file, UPLOAD_ERROR.UPLOAD_STOPPED, 'upload stopped.');
				this.elems.poster && this.elems.poster.abort();
				this._.queue.unshift(file);
			}
		},
		getQueueFile: function(arg){
			arg = arg || 0;
			var type = util.type(arg);
			var queue = this._.queue;
			var file = null;
			
			if(type === 'number'){
				if(arg <= queue.length - 1){
					file = queue[arg];
				}else{ }
			}else if(type === 'string'){
				for(var i = 0; i < queue.length; i++){
					if(queue[i].id === arg){
						file = queue[i];
						break;
					}
				}
			}
			
			return file;
		},
		////set
		setPostParam: function(params){
			if(!this.cfg.postParams){
				this.cfg.postParams = {};
			}
			
			util.extend(true, this.cfg.postParams, params);
			
			return this;
		},
		addPostParam: function(key, value){
			if(!this.cfg.postParams){
				this.cfg.postParams = {};
			}
			
			this.cfg.postParams[key] = value;
			
			return this;
		},
		removePostParam: function(key){
			if(!this.cfg.postParams || !key){
				this.cfg.postParams = {};
				return;
			}
			
			if(key in this.cfg.postParams){
				delete this.cfg.postParams[key];
			}
			
			return this;
		},
		setUploadURL: function(url){
			this.cfg.uploadURL = url + '';
			
			return this;
		},
		setFilePostName: function(name){
			this.cfg.filePostName = name + '';
			
			return this;
		},
		//require override
		setFileTypes: function(types){
			this.ready(function(){
				switch(this.mode){
					case MODE.IFRAME:
					case MODE.HTML5: {
						this.cfg.fileTypes = this.elems.selector.accept = util.convert2MimeTypes(types);
					} break;
					case MODE.FLASH: {
						//types = util.convertMimeTypes(types);
					} break;
					default:
				}
				
				//this.cfg.fileTypes = types;
			});
			
			return this;
		},
		setFileSizeLimit: function(limit){
			this.cfg.sizeLimit = limit;
			
			return this;
		},
		//not support now
		/*setFileUploadLimit: function(limit){
			this.cfg.uploadLimit = limit;
		},*/
		setFileQueueLimit: function(limit){
			this.ready(function(){
				this.cfg.queueLimit = limit;
				this.elems.selector.multiple = limit !== 1;
			});

			return this;
		},
		text: function(txt){
			return (typeof txt === 'undefined'
				? this.elems.text && this.elems.text.innerHTML
				: this.elems.text && (this.elems.text.innerHTML = txt + ''));
		},
		__setStyle: function(mode, wrap, selector, text){
			var CSS = this.cfg.css;
			
			wrap.className = CSS.WRAP;
			
			if(util.browser.firefox){
				selector.size = 6;
			}
			
			selector.className = CSS.SELECTOR;
			
			var label;
			label = wrap.getElementsByTagName('label');
			if(label.length){
				wrap.removeChild(label[0]);
			}
			
			label = document.createElement('label');
			label.className = CSS.TEXT;
			label.innerHTML = text;

			if(mode === "iframe" && this.cfg.allowOpen){ // 允许ie调用open方法的模式下，selector 不在当前文档内
				wrap.appendChild(label);
			}else{
				wrap.insertBefore(label, selector);
			}
			
			//hover
			util.event.bind(wrap, 'mouseover', function(e){
				e.cancelBubble = true;
				e.returnValue = false;
				
				util.addClass(wrap, CSS.HOVER);
			});
			util.event.bind(wrap, 'mouseout', function(e){
				e.cancelBubble = true;
				e.returnValue = false;
				
				util.removeClass(wrap, CSS.HOVER);
			});
			
			this.elems.text = label;
		},
		__translateStatus: function(status){
			// status: ON / OFF / true / false
			// disable / able
			var type = util.type(status);
			if(type === 'string'){
				status = util.trim(status);
				if(status.length){
					status = !!upload.TURNING[status.toUpperCase()];
				}else{
					status = upload.TURNING.OFF;
				}
			}else if(type === 'undefined'){
				status = !this._.status;
			}else{
				status = !!status;
			}
			
			return status;
		},
		turn: function(status){
			this.ready(function(){
				var CSS = this.cfg.css;
				status = this.__translateStatus(status);
				// TODO: switch able status
				// flash version require override
				
				if(status !== this._.status){
					this.elems.selector.disabled = !status;
					this._.status = status;
					
					util[status ? 'removeClass' : 'addClass'](this.elems.holder, CSS.DISABLED);
				}
			});

			return this;
		},
		_open: function(){
			this.elems.selector && this.elems.selector.click();
		},
		open: function(){
			//if(this.mode === MODE.IFRAME || this.mode === MODE.HTML5){
				this._open();
			//}else if(this.mode === MODE.FLASH){
			//	this.mouseClick();
			//}

			//return this;
			
			return this;
		},
		multiple: function(isMulti){
			this.ready(function(){
				this.elems.selector.multiple = !!isMulti;
			});

			return this;
		},
		/**
		* try to queue files.
		* -not support flash edition
		*/
		queue: function(){
			if(this.mode === MODE.IFRAME || this.mode === MODE.HTML5){
				//TODO
			}
			
			return this;
		},
		/**
		* remove file out of queue. will not cause the error event.
		* @param {Int|String|Boolean} [arg] remove file out of queue.
			Int: index of the queue, greater than or equal 0
			String: file id of the queue files
			undefined: remove first file in the queue
			Boolean: -true empty the queue. -false remove first file in the queue
		*/
		dequeue: function(arg){
			if(this.mode === MODE.IFRAME || this.mode === MODE.HTML5){
				switch(util.type(arg)){
					case 'string': {
						var index = -99;
						for(var i = 0; i < this._.queue.length; i++){
							if(this._.queue[i].id === arg){
								index = i;
								break;
							}
						}

						if(index !== -99){
							this._.queue.splice(index, 1);
						}
					}; break;
					case 'number': {
						this._.queue.splice(arg, 1);
					}; break;
					case 'undefined': {
						this._.queue.splice(0, 1);
					}; break;
					case 'boolean': {
						if(arg){
							this._.queue.splice(0);
						}else{
							this._.queue.splice(0, 1);
						}
					}; break;
					default:;
				}
			}else if(this.mode === MODE.FLASH){
				switch(util.type(arg)){
					case 'string':
					case 'number': {
						this.instance.cancelUpload(arg, false);
					}; break;
					case 'undefined': {
						arg = false;
					};
					case 'boolean': {
						if(arg){
							var file;
							while(file = this.instance.getQueueFile()){
								this.instance.cancelUpload(file.file_id, false);
							}
						}else{
							this.instance.cancelUpload(0, false);
						}
					}; break;
					default:;
				}
			}
			
			return this;
		},
		ready: function(fn){
			var _this = this;

			setTimeout(function(){
				if(_this.isReady){
					(typeof fn === "function") && fn.call(_this, _this.mode);
				}else{
					_this.one("ready", fn);
				}
			}, 0);

			return this;
		}
	};
}.call(FOCUS, this, this.document);
;void function(window, document){
	var plugs = this.namespace('FOCUS.widget.Upload.plugins');
	var util = this.util;
	var upload = this.widget.Upload;
	var UPLOAD_ERROR = upload.UPLOAD_ERROR;

	//<!-- Event -->
	/**
	* Class Event
	* @constructor
	* @name Event
	* @param {String} type event type
	*/
	var Event = function(type, thisObj){
		this.type = type;
		this.listeners = [];
		this._ = {
			thisObj: thisObj
		};
	};
	Event.prototype = {
		/**
		* @private
		* search handle in listeners
		* @param {Function} handle
		* @param {Number=0} startIndex
		* @return {Number} index of listeners
		*/
		__search: function(handle, startIndex){
			var ret = -1;
			for(var i = startIndex || 0; i < this.listeners.length; i++){
				if(this.listeners[i].handle === handle){
					ret = i;
					break;
				}
			}
			
			return ret;
		},
		/**
		* add events
		* @param {Object} cfg
		* @param {Function[]} cfg.handles
		* @param {Boolean} [cfg.once]
		* @param [cfg.thisObj]
		* @param [args,..]
		*/
		add: function(cfg, args){
			var handles = cfg.handles;
			var thisObj = cfg.thisObj || null;
			var once = cfg.once || false;
			var args = [].slice.call(arguments, 1)

			if(util.type(handles) === 'function'){
				handles = [handles];
			}
			if(util.type(handles) === 'array'){
				for(var i = 0; i < handles.length; i++){
					if(util.type(handles[i]) === 'function'){
						this.listeners.push({
							handle: handles[i],
							thisObj: thisObj,
							once: !!once,
							args: args
						});
					}
				}
			}
		},
		/**
		* add events
		* @param {Object} cfg
		* @param {Function[]} cfg.handles
		* @param {Boolean} [cfg.once]
		* @param [cfg.thisObj]
		* @param [args,..]
		*/
		one: function(cfg, args){
			if(util.type(cfg) !== 'object'){
				return;
			}
			
			cfg.once = true;
			this.add(cfg, [].slice.call(arguments, 1));
		},
		/**
		* remove event
		* @param {Function|Function[]} handles
		*/
		remove: function(handles){
			if(!handles){
				this.listeners = [];
				return;
			}
			if(util.type(handles) === 'function'){
				handles = [handles];
			}
			
			var index;
			for(var i = 0; i < handles.length; i++){
				if(util.type(handles[i]) === 'function' && (index = this.__search(handles[i])) !== -1){
					this.listeners.splice(index, 1);
				}
			}
		},
		/**
		* excute event
		* @param [args,..] event params
		*/
		exec: function(args){
			var listener;
			var onceEvents = [];
			for(var i = 0; i < this.listeners.length; i++){
				listener = this.listeners[i];
				if(listener.once){
					onceEvents.push(listener.handle);
				}
				
				listener.handle.apply(listener.thisObj || this._.thisObj || this, [].concat.call(listener.args, [].slice.call(arguments)));
			}
			
			this.remove(onceEvents);
		},
		/**
		* set this object in event handle excution context
		* @param thisObj
		*/
		bindThisObj: function(thisObj){
			this._.thisObj = thisObj;
		}
	};
	//<!-- Event END -->
	
	//<!-- Upload Events -->
	/**
	* events plugin for upload component
	* @constructor
	* @name UploadEvents
	* @requires FOCUS.base
	* @requires FOCUS.util
	* @requires FOCUS.widget.Upload
	* @requires Event
	* @param events {Object} added events on init
	* @param [thisObj]
	*/
	var UploadEvents = function(events, thisObj){
		this._ = {
			events: {},
			thisObj: thisObj
		};
		
		this.events = {};
		for(var type in events){
			this.on(type, events[type]);
			this.events[type] = function(type){
				var _this = this;
				if(type === 'uploadError'){
					return function(file, code, msg){
						switch(code){
							case UPLOAD_ERROR.FILE_CANCELLED: {
								_this.fire.apply(_this, ['cancel', file, UPLOAD_ERROR.FILE_CANCELLED, 'file cancelled.']);
							}; break;
							case UPLOAD_ERROR.UPLOAD_STOPPED: {
								_this.fire.apply(_this, ['stop', file, UPLOAD_ERROR.UPLOAD_STOPPED, 'upload stopped.']);
							}; break;
							default: {
								_this.fire.apply(_this, [type].concat([].slice.call(arguments)));
							};
						}
					};
				}else{
					return function(){
						_this.fire.apply(_this, [type].concat([].slice.call(arguments)));
					};
				}
			}.call(this, type);
		}
	};
	UploadEvents.prototype = {
		/**
		* @private
		*/
		__initEvent: function(type, handles, thisObj){
			if(!(type in this._.events)){
				this._.events[type] = new Event(type, this._.thisObj);
			}
			
			var cfg = {
				handles: handles,
				thisObj: thisObj
			};
			
			return cfg;
		},
		/**
		* bind event
		* @param {String} type event type
		* @param {Function|Function[]} handles event handles
		* @param [thisObj]
		* @param [args,..]
		*/
		on: function(type, handles, thisObj, args){
			var cfg = this.__initEvent(type, handles, thisObj);
			this._.events[type].add.apply(this._.events[type], [cfg].concat([].slice.call(arguments, 3)));
		},
		/**
		* remove event
		* @param {String} type event type
		* @param {Function|Function[]} [handles] remove handles
		*/
		off: function(type, handles){
			if(type in this._.events){
				this._.events[type].remove(handles);
			}
		},
		/**
		* bind once excuted event
		* @param {String} type event type
		* @param {Function|Function[]} handles event handles
		* @param [thisObj]
		* @param [args,..]
		*/
		one: function(type, handles, thisObj, args){
			var cfg = this.__initEvent(type, handles, thisObj);
			this._.events[type].one.apply(this._.events[type], [cfg].concat([].slice.call(arguments, 3)));
		},
		/**
		* trigger some event with the type
		* @param {String} type event type
		* @param [args,..]
		*/
		fire: function(type, args){
			if(type in this._.events){
				this._.events[type].exec.apply(this._.events[type], [].slice.call(arguments, 1));
			}
		},
		/**
		* set this object in all event handle excution context
		* @param thisObj
		*/
		bindThisObj: function(thisObj){
			this._.thisObj = thisObj;
			for(var type in this._.events){
				this._.events[type].bindThisObj(thisObj);
			}
		}
	};
	
	plugs.UploadEvents = UploadEvents;
	//<!-- Upload Events END -->
	
}.call(FOCUS, window, window.document);
/**
* @requires UploadEvents
*/
;void function(){
	var plugs = this.namespace('FOCUS.widget.Upload.plugins');
	
	plugs.AutoDisabled = function(mode){
		this.on('uploadStart', function(){
			this.turn('off');
		}).on('uploadSuccess', function(){
			this.turn('on');
		}).on('uploadError', function(){
			this.turn('on');
		});
	};
}.call(FOCUS);
/* global FOCUS, lrz */

;void function(){
	var plugs = this.namespace('FOCUS.widget.Upload.plugins');
	var UPLOAD_ERROR = FOCUS.widget.Upload.UPLOAD_ERROR;
	var util = FOCUS.util;

	// 压缩图片失败
	UPLOAD_ERROR.ZIP_ERROR = "-320";

	var cache = document.createElement("div");
	cache.style.cssText = "width:1px; height:1px; overflow:hidden; position:absolute; top: -10px; left: -10px;";

	var getImgSize = function(file, callback, fail){
		document.body.appendChild(cache);

		var reader = new FileReader();
		reader.onload = function(){
			var img = new Image();
			
			img.onload = function(){
				(typeof callback === "function") && callback(this.naturalWidth || this.width, this.naturalHeight || this.height);
				img.onload = img.onerror = null;
				cache.removeChild(img);
			};

			img.onerror = function(){
				(typeof fail === "function") && fail("Cannot read this image file.");
				img.onload = img.onerror = null;
				cache.removeChild(img);
			};

			img.src = this.result;
			cache.appendChild(img);
		};
		
	
		reader.readAsDataURL(file);
	};

	// 压缩宽高、quality
	var resize = function(file, width, height, quality){
		width = width || null;
		height = height || null;

		var config = {
			width: width,
			height: height
		};

		quality = quality || 0.85;

		if(quality){
			config.quality = quality;
		}

		return lrz(file, config);
	};

	/**
	 * @param m 系数
	 */
	var computeSize = function(naturalWidth, naturalHeight, fileSize, targetSize, m){
		/**
		 * 压缩算法
		 * 
		 * 1. 假定一次压缩能达到要求的像素数比 与 体积比 大约相等
		 * 2. 根据等式1，换算出目标像素数量
		 * 3. 根据原图宽高比例 及 目标像素数量，算出宽度
		 * 4. 返回宽度的 m 系数倍取整的值，作为宽度
		 */

		m = m || 1;

		var scale = fileSize / targetSize;
		// if(m >= scale){
		// 	m = scale * 0.9;
		// }

		var pixel = naturalWidth * naturalHeight / scale;
		var whScale = naturalWidth / naturalHeight;
		var tw = Math.sqrt(pixel * whScale);

		return {
			width: parseInt(tw * m),
			height: null
		}
	};

	// 压缩文件尺寸
	var sizeZip = function(file, size, quality, callback, fail){
		var currSize = file.size;
		var tarSize = size;
		var m = 1.5;
		var times = 0;

		switch(file.type){
			case "image/png": m = 2.2; break;
			case "image/jpeg": m = 1.5; break;
			default: m = 1.8;
		}

		var check = function(result, width, height){
			var me = arguments.callee;

			if(result.fileLen <= tarSize){
				callback(result, times);
			}else{
				times++;
				// 如果尺寸不够，则按照当前压缩出来的尺寸与目标尺寸的比值，折算 m 系数
				m = (m / (result.fileLen / tarSize)).toFixed(2);

				// 如果压缩了3次 还没达到标准，则认为 m 比例设定对此图不合适, 按0.9的比例直接缩小 m 值
				if(times >= 3){
					m = m * 0.9;
				}

				var wh = computeSize(width, height, currSize, tarSize, m);
				resize(file.data, wh.width, wh.height, quality).then(function(result){
					me(result, width, height);
				})["catch"](fail);
			}
		};

		getImgSize(file.data, function(width, height){
			times++;
			var wh = computeSize(width, height, currSize, tarSize, m);
			resize(file.data, wh.width, wh.height).then(function(result){
				check(result, width, height);
			})["catch"](fail);
		}, fail);
	};
	
	plugs.zip = function(mode){
		if(mode !== "html5" || typeof lrz === "undefined"){
			return this;
		}

		var _startUpload = this.startUpload;

		this.startUpload = function(){
			var _this = this;
			var doZip = !!this.cfg.zip;
			var zipConfig = this.cfg.zip;
			var file = this.getQueueFile();
			if(!file){
				return this;
			}

			var canZip = /^image\/(?:jpg|jpeg|png)/.test(file.type);
			var zipType;

			if(doZip && canZip){
				var done = function(result, times){
					times = times || 1;
					file.data = result.file;
					file.suffix = /^jpe?g$/i.test(file.suffix) ? file.suffix : "jpg";
					file.fullname = file.name + "." + file.suffix;
					file.type = "image/jpeg";
					file.size = result.fileLen;

					_this.fire("zipSuccess", file, times, zipType);
					_this.fire("zipComplete", file, zipType);
					_startUpload.apply(_this, [].slice.call(arguments));
				};

				var fail = function(err){
					_this.dequeue(false);
					_this.fire("zipError", file, err || "zip error", zipType);
					_this.fire("uploadError", file, UPLOAD_ERROR.ZIP_ERROR, err || "zip error", zipType);
					_this.fire("zipComplete", file, zipType);
					_this.fire("uploadComplete", file);
				};
				
				
				if(zipConfig.size){	// 压缩文件尺寸
					var size = util.sizeConvert.unit2Bytes(zipConfig.size);

					if(file.size > size){	// 仅在文件超出尺寸才压缩
						zipType = "filesize";
						_this.fire("zipStart", file, zipType);

						setTimeout(function(){
							sizeZip(file, size, zipConfig.quality, done, fail);
						}, 0);
					}else{
						_startUpload.apply(this, [].slice.call(arguments));
					}
				}else if(zipConfig.width || zipConfig.height){	// 压缩文件宽高、质量
					zipType = "size";
					_this.fire("zipStart", file, zipType);

					setTimeout(function(){
						resize(file.data, zipConfig.width, zipConfig.height, zipConfig.quality)
							.then(done)["catch"](fail);
					}, 0);
				}
			}else{
				_startUpload.apply(this, [].slice.call(arguments));
			}

			return this;
		};
	};

}.call(FOCUS);
;void function(window, document, undefined){
	var io = this.namespace('FOCUS.widget.io.iframe');
	var noop = function(){};
	
	var util = this.util;
	
	//elems generator
	var createElem = util.createElement;

	//formdata
	var IO_FormData = function(context){
		this.context = context;
		this.elems = {};
	};
	IO_FormData.prototype = {
		_: {
			/*form: function(url){
				return createElem({
					el: 'form',
					name: 'FOCUS_UPLOAD_FORM_' + FOCUS.util.random(0, 1000),
					method: 'POST',
					enctype: 'multipart/form-data',
					action: url || ''
				});
			},*/
			text: function(name, txt, context){
				return createElem({
					el: 'textarea',
					name: name,
					value: txt + ''
				}, context);
			},
			radio: function(name, value, checked, context){
				return createElem({
					el: 'input',
					type: 'radio',
					name: name,
					value: value,
					checked: !!checked
				}, context);
			},
			checkbox: function(name, value, checked, context){
				return createElem({
					el: 'input',
					type: 'checkbox',
					name: name,
					value: value,
					checked: !!checked
				}, context);
			},
			file: function(inputFileElem, cfg, context){
				if(inputFileElem){
					var file = inputFileElem;//.cloneNode(true);
					cfg && cfg.name && (file.name = cfg.name);
					return file;
				}else{
					var _cfg = {
						el: 'input',
						type: 'file'
					};
					
					util.extend(true, _cfg, cfg);

					return createElem(_cfg, context);
				}
			},
			clone: function(elem){
				return elem.cloneNode(true);
			}
		},
		append: function(name, value){
			var type = util.type(value);
			var elem;
			
			if(type !== 'string' && value.type === 'file'){
				elem = this._.file(value, { name: name }, this.context);
			}else if(type === 'string'){
				elem = this._.text(name, value + '', this.context);
			}
			
			this.elems[name] = elem;
			//this.elems.__submit_form.appendChild(elem); //in ie6, here will leak the memory
		}
	};
	
	//
	io.IO_FormData = IO_FormData;
}.call(FOCUS, window, document);
;void function(window, document, undefined){
	var io = this.namespace('FOCUS.widget.io.iframe');
	var noop = function(){};
	var util = this.util;
	//elems generator
	var createElem = util.createElement;
	
	//io
	var IO_Iframe = function(cfg, context){
		this.context = context;

		this.cfg = {
			events: {
				load: noop,
				error: noop
			},
			timeout: 100000,
			charset: 'UTF-8',
			dataKey: "__UPLOAD_RESPONSE_DATA__"
		};
		
		util.extend(true, this.cfg, cfg);
		this.elems = {};
		this._ = {};
		
		this.init();
	};
	IO_Iframe.prototype = {
		init: function(){
			var _this = this;

			this.elems.io = createElem({
				el: 'iframe',
				name: 'FOCUS_UPLOAD_IO_' + util.random(0, 1000),
				src: util.browser.msie
					? ('javascript:document.open();' + (document.domain === window.location.hostname
						? ''
						: ('document.domain=\'' + document.domain + '\';')) + 'void(0)')
					: 'about:blank'
				//src: 'javascript:document.open();document.domain="' + document.domain + '";void(0)'
			});
			
			this.elems.io.style.cssText = 'position:absolute; width:1px; height:1px; top: -9999px; left:-9999px;';

			document.body.appendChild(_this.elems.io);

			setTimeout(function(){
				_this.elems.win = _this.elems.io.contentWindow;
				_this.elems.doc = _this.elems.io.contentWindow.document;
			}, 25);
			
			//onload & onerror
			this._.timer = -1;
			this._.handle = {
				load: function(){
					if(_this._.submited){
						clearTimeout(_this._.timer);
						var data = _this._.handle.getData(_this.elems.io);
						if(util.type(data) === 'undefined'){
							_this.cfg.events.error.call(this, 'IO_ERROR');
						}else{
							_this.cfg.events.load.call(this, data);
						}
						_this._.submited = false;
						
						setTimeout(function(){
							_this._deleteForm();
						}, 25);
					}
				},
				error: function(){
					_this.cfg.events.error.call(this);
					_this._.submited = false;
				},
				//default getData, when Xdomain, override it
				getData: function(ifr){
					var data;
					try{
						//[Problem in chrome]
						// if cross domain, try...catch.. could not catch the 'unsafe error' tip
						var win = ifr.contentWindow;
						var doc = win.document;
						var body = doc.body;
						
						data = win[_this.cfg.dataKey || "__UPLOAD_RESPONSE_DATA__"] || _this.__cleanData(body.innerHTML);
					}catch(ex){}
					
					return data;
				}
			};
			
			//bind load event
			this.elems.io.attachEvent
				? this.elems.io.attachEvent('onload', this._.handle.load)
				: (this.elems.io.onload = this._.handle.load);
		},	
		open: function(method, url/*, async*/){
			this._.openCfg = {
				method: method.toUpperCase() === 'GET' ? 'GET' : 'POST',
				action: url
			};
		},
		send: function(data, charset){
			var _this = this;
			setTimeout(function(){
				var ie67 = util.browser.msie && (util.browser.version == 6 || util.browser.version == 7);

				var formCfg = {
					el: 'form',
					name: 'FOCUS_UPLOAD_FORM_' + util.random(0, 1000),
					method: _this._.openCfg.method,
					/*enctype: 'multipart/form-data',*/
					action: _this._.openCfg.action || ''
				};
				
				//if(ie67){
					formCfg.target = _this.elems.io.name;
				//}
				
				var dataArray = [];
				var hasFile = false;
				var tmpElem;
				for(var key in data.elems){
					tmpElem = data.elems[key];
					if(tmpElem.type === 'file'){
						hasFile = true;
					}
					
					dataArray.push(tmpElem);
				}
				
				formCfg.enctype = hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded';
				
				_this._deleteForm();
				var form = _this.elems.__submit_form = createElem(formCfg, _this.context);
				form.style.cssText = 'position:absolute; width:1px; height:1px; top: -9999px; left:-9999px;';
				
				var doc = _this.context || document;//ie67 ? document : _this.elems.doc;
				doc.body.appendChild(form);
				
				while(dataArray.length){
					form.appendChild(dataArray.shift());
				}
				
				charset = charset || _this.cfg.charset || 'UTF-8';
				//<-- [fixed] charset setting will lead form submit with other charset in ie
				//record the original document charset
				var originalCharset;
				util.browser.msie && (originalCharset = doc.charset);
				//-->
				util.browser.msie
					? (doc.charset = charset)
					: (form.acceptCharset = charset);
				
				/*_this._.timer = setTimeout(function(){
					_this._.handle.error.call(_this);
				}, _this.cfg.timeout);*/
				
				setTimeout(function(){
					_this._.submited = true;
					form.submit();
					
					//restore charset
					setTimeout(function(){ //make sure submit action executed
						util.browser.msie && (doc.charset = originalCharset);
					}, 1);
				}, 25);
			}, 100);
		},
		onload: function(fn){
			//this.event.bind('load', function(){});
			this.cfg.events.load = fn;
		},
		onerror: function(fn){
			this.cfg.events.error = fn;
		},
		overrideGetData: function(fn){
			this._.handle.getData = fn;
		},
		setUrl: function(url){
			this.elems.__submit_form.action = url;
		},
		_deleteForm: function(){
			try{
				if(this.elems.__submit_form){
					this.elems.__submit_form.parentNode.removeChild(this.elems.__submit_form);
				}
			}catch(ex){}
			
			delete this.elems.__submit_form;
		},
		_deleteIO: function(){
			try{
				if(this.elems.io){
					this.__removeOnloadEvent();
					this.elems.io.parentNode.removeChild(this.elems.io);
				}
			}catch(ex){}
			
			delete this.elems.doc;
			delete this.elems.win;
			delete this.elems.io;
		},
		dispose: function(){
			this._deleteForm();
			this._deleteIO();
		},
		__removeOnloadEvent: function(){
			if(this.elems.io){
				this.elems.io.detachEvent
					? this.elems.io.detachEvent('onload', this._.handle.load)
					: this.elems.io.onload = noop;
			}
		},
		__cleanData: function(datastr){
			var filters = [
				/<\s*(script|style|div|p|a|table|iframe)[\s\S]*?<\s*\/\s*\1\s*>/gi,
				/<\s*(link|img|input)[\s\S]*?>/gi,
				/(^|)\<\/?pre[^\>]*\>(|$)/gi,
				/<!--.*?-->/gi,
				/^[\s\u00A0]+|[\s\u00A0]+$/g
			];
			
			var data = datastr;
			for(var i = 0; i < filters.length; i++){
				filters[i].exec('');
				data = data.replace(filters[i], '');
			}
			
			return data;
		}
	};
	
	//
	io.IO_Iframe = IO_Iframe;
}.call(FOCUS, window, document);
;void function(window, document, undefined){
	var io = this.namespace('FOCUS.widget.io.iframe');
	var IO_FormData = io.IO_FormData;
	var IO_Iframe = io.IO_Iframe;
	var util = this.util;
	var noop = function(){};

	//poster
	var Poster = function(cfg, context){
		this.context = context;
		
		this.cfg = {
			events: {
				//abort: noop,
				error: noop,
				load: noop,
				progress: noop,
				abort: noop
			},
			progressURL: '',
			charset: 'UTF-8',
			timeout: 100000,
			dataKey: "__UPLOAD_RESPONSE_DATA__"
		};
		this._ = {
			cancel: false,
			timeout: false,
			loaded: false,
			timeoutTimer: -1
		};
		this.elems = {};		
		this.set(cfg);
		
		this.init();
	};
	Poster.prototype = {
		init: function(){
			var _this = this;
			this._.getProgress = function(){
				var me = arguments.callee;

				if(_this.cfg.progressURL && !_this._.loaded){
					_this.elems.io_progress = new IO_Iframe();
					//getData result: {loaded: xx, total: xx}
					_this.elems.io_progress.onload(function(data){
						setTimeout(function(){
							_this.elems.io_progress.dispose();
						}, 25);
						if(!_this._.loaded){
							data = util.JSON.parse(data);
							_this.cfg.events.progress.call(data);
							
							setTimeout(function(){
								me();
							}, 100);
						}
					});
					
					_this.elems.io_progress.open('GET', _this.cfg.progressURL, true);
					var data = new IO_FormData();
					data.append('progress', 'loaded');
					_this.elems.io_progress.send(data);
				}
			};
		},
		send: function(data){
			/*var formData = new IO_FormData;
			
			if(data){
				var type = FOCUS.util.type(data);
				var name;
				
				if(type === 'object'){
					for(var key in data){
						name = 'FOCUS_DATA_' + key + FOCUS.util.random(0, 1000);
						formData.append(name, data[key]);
					}
				}else{
					name = 'FOCUS_DATA_' + FOCUS.util.random(0, 1000);
					formData.append(name, data);
				}
			}*/
			
			if(this._.cancel){
				return;
			}
			
			var _this = this;
			this._.timeoutTimer = setTimeout(function(){ //timeout trigger
				_this.timeout();
			}, this.cfg.timeout);
			
			this.elems.io.send(data, this.cfg.charset);
			setTimeout(function(){//adjust the progress event trigger timing
				if(!_this._.cancel){
					_this.cfg.events.progress.call(_this, {loaded: 0, total: 100});
				}
			}, 1);

			this._.getProgress();
		},
		open: function(method, url/*, async*/){
			this._.fullProgress = false;
			this.reset();
			this.elems.io.open(method, url/*, async*/);
		},
		set: function(cfg){
			util.extend(true, this.cfg, cfg);
		},
		reset: function(){
			var _this = this;
			
			if(this.elems.io){
				this.elems.io.dispose();
			}
			
			if(this.elems.io_progress){
				this.elems.io_progress.dispose();
			}
			
			this.elems.io = new IO_Iframe({
				timeout: this.cfg.timeout,
				dataKey: this.cfg.dataKey
			}, this.context);
			
			this.elems.io.onload(function(data){
				if(_this._.timeout){
					return;
				}
				
				if(!_this._.fullProgress){
					_this.cfg.events.progress.call(_this, {loaded: 100, total: 100});
					_this._.fullProgress = true;
				}
				
				clearTimeout(_this._.timeoutTimer);
				
				if(!_this._.cancel){ // not canceled
					_this._.loaded = true;
					_this.cfg.events.load.call(_this, data, this);
				}else{
					//_this.cfg.events.error.call(_this, data, this);
				}
			});
			
			this.elems.io.onerror(function(msg){
				clearTimeout(_this._.timeoutTimer);
				if(!_this._.cancel){ // not canceled
					_this.cfg.events.error.call(_this, this, msg);
				}else{
					//TODO
				}
			});
			
			this._.cancel =  false;
			this._.timeout = false;
			this._.loaded = false;
			this._.timeoutTimer = -1;
		},
		dispose: function(){
			if(this.elems.io){
				this.elems.io.dispose();
				delete this.elems.io;
			}
			
			if(this.elems.io_progress){
				this.elems.io_progress.dispose();
				delete this.elems.io_progress;
			}

			//TODO
		},
		timeout: function(){
			this._.timeout = true;
			this.elems.io.__removeOnloadEvent();
			this.cfg.events.error.call(this, this, 'timeout');
		},
		abort: function(){
			this._.cancel = true;
			clearTimeout(this._.timeoutTimer);
			this.elems.io && this.elems.io.__removeOnloadEvent();
			
			this.cfg.events.abort();
		}
	};
	
	//
	io.Poster = Poster;
}.call(FOCUS, window, document);
;void function(window, document, undefined){
	var noop = function(){};
	
	var util = this.util;
	var widget = this.widget;
	var upload = widget.Upload;
	var MODE = upload.MODE;
	var UPLOAD_ERROR = upload.UPLOAD_ERROR;
	var FILE_STATUS = upload.FILE_STATUS;
	var QUEUE_ERROR = upload.QUEUE_ERROR;
	
	var createElem = util.createElement;
	var IO = widget.io.iframe;
	var Poster = IO.Poster;
	var IO_FormData = IO.IO_FormData;

	///////
	widget.Upload_Iframe = function(cfg){
		this.constructor = arguments.callee;
		this.mode = MODE.IFRAME;
		
		this.elems = {};
		this.cfg = {
			//priority: FOCUS.widget.Upload.PRIORITY.DEFAULT,
			events: {
				ready: noop,
				loadFailed: noop,
				dialogStart: noop,
				dialogComplete: noop,
				queued: noop,
				queueError: noop,
				uploadStart: noop,
				uploadProgress: noop,
				uploadSuccess: noop,
				uploadError: noop,
				uploadComplete: noop
			},
			button: {
				text: 'Upload'
			},
			// single or multi file(s) selection dialog
			// except: some browser such as ie6-9 not support multiple on input:file
			multiple: true,
			sizeLimit: -1,
			queueLimit: -1,
			fileTypes: upload.MIME_TYPE.ALL,
			fileTypesDescription: 'All Files',
			uploadURL: '',
			filePostName: '',
			placeholder: '#uploader',
			charset: upload.CHARSET.DEFAULT,
			allowOpen: false,	// iframe 模式特有参数，允许IE浏览器使用 open 方法
			debug: false,
			timeout: 600000,
			dataKey: "__UPLOAD_RESPONSE_DATA__"
		};
		
		this._ = {
			queue: [],
			uploadingFile: null,
			uploadedFile: [],
			status: upload.TURNING.ON
		};
	
		this.set(cfg);
		this.init();
	};
	
	widget.Upload_Iframe.prototype = new FOCUS.widget.UploadBase();
	util.extend(true, widget.Upload_Iframe.prototype, {
		_init: function(win, doc){
			var _this = this;

			this.elems.holder = createElem({
				el: 'div'
			});

			this.elems.holder.style.cssText = '';
			
			//validate errors
			var validate_errors = {
				missing_url: [UPLOAD_ERROR.MISSING_UPLOAD_URL, 'missing upload URL.'],
				invalid_filetype: [QUEUE_ERROR.INVALID_FILETYPE, 'File is not an allowed file type.'],
				size_limit: [QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT, 'File size exceeds allowed limit.'],
				chain_error: [QUEUE_ERROR.CHAIN_ERROR, 'Some reason to occured chain error.']
			};

			//events
			util.extend(this._, {
				open: function(file){
					var data = new IO_FormData(doc);
					if(util.type(_this.cfg.postParams) === 'object'){
						for(var key in _this.cfg.postParams){
							data.append(key, _this.cfg.postParams[key]);
						}
					}
					
					data.append(_this.cfg.filePostName || file.id, file.data);
					_this.elems.poster.open('POST', _this.cfg.uploadURL, true);
					
					return data;
				},
				post: function(data){
					//setTimeout(function(){
						_this.elems.poster.send(data);
					//}, 1);
				},
				start: function(e){
					var file = _this.getQueueFile();
					if(file){
						if(!_this.cfg.uploadURL || util.type(_this.cfg.uploadURL) !== 'string'){
							_this.cfg.events.uploadError.apply(_this, [file].concat(validate_errors['missing_url']));
							
							_this.stopUpload();
							return;
						}
						
						file.status = FILE_STATUS.IN_PROGRESS;
						_this._.uploadingFile = file;
						_this.cfg.events.uploadStart.call(_this, file);
						var data = _this._.open(file);
						_this._.post(data);
					}
				},
				dialogStart: function(e){
					e = e || win.event;
					e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
					//e.preventDefault ? e.preventDefault() : e.returnValue = false;
					
					_this.cfg.events.dialogStart.call(_this);
				},
				__queued: function(isFromDialog, callback){
					// this: input:file element
					var selected = [], queued = [], total = _this._.queue;
					
					var file = new upload.File(this);
					
					if(this.files && (!util.browser.firefox || (util.browser.firefox && util.browser.version >= 3.6))){ // support html5 files object
						var tmpQueued = [];
						var errorFlag = false;
						var file2valid;
						
						//exceed queue limit
						if(_this.cfg.queueLimit !== -1 && (this.files.length + _this._.queue.length) > _this.cfg.queueLimit){
							for(var i = 0, len = this.files.length; i < len; i++){
								file2valid = new upload.File(this.files[i]);
								selected.push(file2valid);
								
								_this.cfg.events.queueError.call(_this, file2valid, QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED, _this.cfg.queueLimit);
							}
							
							errorFlag = true;
						}else{
							var sizeLimit = util.sizeConvert.unit2Bytes(_this.cfg.sizeLimit);
							
							// validate
							for(var i = 0, len = this.files.length; i < len; i++){
								file2valid = new upload.File(this.files[i]);
								selected.push(file2valid);

								var error;
								//filetype
								if(!util.mimeValidation(_this.cfg.fileTypes, file2valid.type)){
									error = validate_errors['invalid_filetype'];
								}else if(sizeLimit !== -1 && (file2valid.fileSize || file2valid.size) > sizeLimit){ //filesize
									error = validate_errors['size_limit'];
								}
								
								if(!error){
									tmpQueued.push(file2valid);
								}else{
									_this.cfg.events.queueError.apply(_this, [file2valid].concat(error));
									errorFlag = true;
								}
							}
						}
						
						if(errorFlag){
							for(var i = 0, len = tmpQueued.length; i < len; i++){
								tmpQueued[i].id = file.id;
								_this.cfg.events.queueError.apply(_this, [tmpQueued[i]].concat(validate_errors['chain_error']));
							}
						}else{
							for(var i = 0, len = tmpQueued.length; i < len; i++){
								tmpQueued[i].status = FILE_STATUS.QUEUED;
								tmpQueued[i].id = file.id;
								_this.cfg.events.queued.call(_this, tmpQueued[i]);
							}
							
							queued = queued.concat(tmpQueued);
							total.push(file);
						}
						
						delete tmpQueued;
					}else{ // normal input:file -- html4
						selected.push(file);
						
						if(FOCUS.util.mimeValidation(_this.cfg.fileTypes, file.type)){
							queued.push(file);
							total.push(file);
							file.status = FILE_STATUS.QUEUED;
							_this.cfg.events.queued.call(_this, file);
						}else{
							_this.cfg.events.queueError.apply(_this, [file].concat(validate_errors['invalid_filetype']));
						}
					}

					if(isFromDialog){
						_this.elems.selector.parentNode.removeChild(_this.elems.selector);
						_this.elems.selector = _this._._crateSelector((doc && doc.body) || _this.elems.holder, _this._.dialogStart, _this._.dialogComplete);
						
						//_this.elems.resetForm.reset();
						// total.length: total means all in queue, but in iframe method upload, only 1 append to total in one selected file
						//_this.cfg.events.dialogComplete.call(_this, selected.length, queued.length, total.length);
					}
					
					//excute callback
					if(FOCUS.util.type(callback) === 'function'){
						callback.call(_this, selected.length, queued.length, total.length);
					}
					
					delete selected;
					delete queued;
					delete total;
				},
				dialogComplete: function(e){
					e = e || win.event;
					e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
					
					_this._.__queued.call(this, true, _this.cfg.events.dialogComplete);
				},
				uploadProgress: function(e){
					var file = _this.getQueueFile();
					if(file){
						file.status = FILE_STATUS.IN_PROGRESS;
						if(e.loaded === e.total){ //markup the 100 percent in uploading
							file.fullProgress = true;
						}
						
						_this.cfg.events.uploadProgress.call(_this, file, e.loaded, e.total);
					}
				},
				uploadSuccess: function(data, context){
					var poster = _this.elems.poster;
					var file = _this.getQueueFile();
					if(file){
						_this.cfg.events.uploadSuccess.call(_this, file, data, poster);
					}
				},
				uploadError: function(context, msg){
					msg = (msg || '').toUpperCase();
					
					var file = _this.getQueueFile();
					if(file){
						file.status = FILE_STATUS.ERROR;
						_this.cfg.events.uploadError.call(_this, file, UPLOAD_ERROR[msg ? msg : 'UPLOAD_FAILED'], msg ? msg : 'TIMEOUT');
						
						_this._.uploadComplete(true);
					}
				},
				uploadComplete: function(fail, isStop){
					var file = _this.getQueueFile();
				
					if(file){
						if(!fail && !file.fullProgress && !isStop){
							_this._.uploadProgress.call(_this, { loaded: file.size, total: file.size });
							file.fullProgress = true;
						}
						
						if(!isStop){
							file.status = FILE_STATUS.COMPLETE;
						}
						
						_this._.queue.shift();
						_this._.uploadingFile = null;
						
						_this.cfg.events.uploadComplete.call(_this, file);
						
						//if(!isStop){
							//_this._.start();
						//}
					
					}
				},
				complete: function(data, context){
					_this._.uploadSuccess.call(_this, data, context);
					_this._.uploadComplete.call(_this);
					
					//In IE, no dispose, it will refuse access iframe when F5 refresh
					setTimeout(function(){
						//for firefox, at this the iframe loaded time,
						//there is a loading progress bar always in firefox that destroy the iframe straightway.
						//use timer to restore it
						if(_this.elems.poster){
							_this.elems.poster.dispose();
							delete _this.elems.poster;
						}
					}, 25);
				},
				abort: function(){
					// be sure uploadComplete after uploadStart event, when upload cancelled
					setTimeout(function(){
						_this._.uploadComplete(false, true);
					}, 1);
				},
				_crateSelector: function(wrap, dialogStart, dialogComplete){
					var doc;
					
					if(_this.cfg.allowOpen){
						doc = _this.elems.openFrame.contentWindow.document;
						wrap = doc.body;
					}

					var selector = createElem({
						el: 'input',
						type: 'file',
						name: 'FOCUS_FILE_' + util.random(0, 100),
						//'class': FOCUS.widget.Upload.CSS.SELECTOR,
						multiple: !!_this.cfg.multiple//,
						//accept: FOCUS.util.browser.chrome ? '*/*' : _this.cfg.fileTypes
					}, doc);
					
					wrap.appendChild(selector);
					util.event.bind(selector, 'click', dialogStart);
					util.event.bind(selector, 'change', dialogComplete);

					_this.__setStyle('iframe', _this.elems.holder, selector, _this.cfg.button.text);
					
					return selector;
				}
			});
			
			
			//holder
			var place = util.query
				? util.query(this.cfg.placeholder)
				: document.getElementById(this.cfg.placeholder.replace(/^#/, ''));
				
			if(place){
				if('length' in place){
					place = place[0];
				}
				
				if(place){
					place.parentNode.insertBefore(_this.elems.holder, place);
					//this.elems.holder.appendChild(this.elems.resetForm);
					_this.elems.selector = _this._._crateSelector((doc && doc.body) || _this.elems.holder, _this._.dialogStart, _this._.dialogComplete);
					place.parentNode.removeChild(place);

					if(_this.cfg.allowOpen){
						util.event.bind(_this.elems.holder, "click", function(){
							_this.open();
						});
					}
				}
			}

			setTimeout(function(){
				_this.isReady = true;
				// callback for choose which type to initialize
				_this.cfg.events.ready.call(_this, _this.mode);
			}, 25);
		},
		init: function(){
			var _this = this;
			var win = window;
			var doc;

			if(this.cfg.allowOpen){	// 允许ie使用open方法
				this._createOpenFrame(function(){
					win = _this.elems.openFrame.contentWindow;
					doc = win.document;

					_this._init(win, doc);
				});
			}else{
				this._init(win, doc);
			}
			
		},
		startUpload: function(){
			if(this.elems.poster){
				this.elems.poster.dispose();
			}
			
			var doc;

			try{
				doc = this.elems.openFrame.contentWindow.document;
			}catch(ex){}

			this.elems.poster = new Poster({
				events: {
					abort: this._.abort,
					load: this._.complete,
					error: this._.uploadError,
					progress: this._.uploadProgress
				},
				progressURL: this.cfg.progressURL,
				charset: this.cfg.charset,
				timeout: this.cfg.timeout || 100000,
				dataKey: this.cfg.dataKey
			}, doc);
			
			this._.start();
			
			return this;
		},
		/**
		* queue files
		* @param {FileInput|FileInput[]} files
		* @param {Function} [callback] queue completed callback
		*/
		queue: function(files, callback){
			if(!files){
				return;
			}
			
			if(files.length === undefined){
				files = [files];
			}
			
			for(var i = 0; i < files.length; i++){
				this._.__queued.call(files[i], false, callback);
			}
			
			return this;
		},
		_createOpenFrame: function(callback){
			var _this = this;

			var frame = this.elems.openFrame = createElem({
				el: 'iframe',
				name: 'FOCUS_UPLOAD_OPEN_' + util.random(0, 1000),
				src: util.browser.msie
					? ('javascript:document.open();' + (document.domain === window.location.hostname
						? ''
						: ('document.domain=\'' + document.domain + '\';')) + 'document.close(); void(0);')
					: 'about:blank'
				//src: 'javascript:document.open();document.domain="' + document.domain + '";void(0)'
			});
			
			this.elems.openFrame.style.cssText = 'position:absolute; width:1px; height:1px; top: -9999px; left:-9999px;';

			document.body.appendChild(_this.elems.openFrame);

			var doc;

			var timer = setInterval(function(){
				try{
					doc = frame.contentWindow.document;
					clearInterval(timer);

					setTimeout(function(){
						(typeof callback === 'function') && callback();
					}, 25);
				}catch(ex){}
			}, 19);
		}
	});
}.call(FOCUS, this, this.document);

/**
* Known Problems
* 1 in chrome, if cross domain, try...catch.. could not catch the 'unsafe error' tip on access iframe.contentWindow in 'getData' method calling with IO_Iframe object
*/







































;void function(window, document, undefined){
	var noop = function(){};
	var util = this.util;
	var widget = this.widget;
	var upload = widget.Upload;
	var MODE = upload.MODE;
	var UPLOAD_ERROR = upload.UPLOAD_ERROR;
	var FILE_STATUS = upload.FILE_STATUS;
	var QUEUE_ERROR = upload.QUEUE_ERROR;
	
	widget.Upload_HTML5 = function(cfg){
		this.constructor = arguments.callee;
		this.mode = MODE.HTML5;
		
		this.elems = {};
		this.cfg = {
			//priority: FOCUS.widget.Upload.PRIORITY.DEFAULT,
			events: {
				ready: noop,
				loadFailed: noop,
				dialogStart: noop,
				dialogComplete: noop,
				queued: noop,
				queueError: noop,
				uploadStart: noop,
				uploadProgress: noop,
				uploadSuccess: noop,
				uploadError: noop,
				uploadComplete: noop
			},
			button: {
				text: 'Upload'
			},
			// single or multi file(s) selection dialog
			// except: some browser such as ie6-9 not support multiple on input:file
			multiple: true,
			sizeLimit: -1,
			queueLimit: -1,
			fileTypes: upload.MIME_TYPE.ALL,
			fileTypesDescription: 'All Files',
			uploadURL: '',
			filePostName: '',
			placeholder: '#uploader',
			charset: upload.CHARSET.DEFAULT,
			debug: false,
			timeout: 600000,
			cookie: true
		};
		
		this._ = {
			queue: [],
			uploadingFile: null,
			cancel: false,
			status: upload.TURNING.ON
		};
		
		this.set(cfg);
		this.init();
	};
	
	widget.Upload_HTML5.prototype = new widget.UploadBase();
	util.extend(true, widget.Upload_HTML5.prototype, {
		init: function(){
			var _this = this;
			
			//EVENTS
			this._.start = function(){
				var file = _this.getQueueFile();
				if(file){
					if(!_this.cfg.uploadURL || util.type(_this.cfg.uploadURL) !== 'string'){
						_this.cfg.events.uploadError.call(_this, file, UPLOAD_ERROR.MISSING_UPLOAD_URL, 'missing upload url.');
						
						_this.stopUpload();
						return;
					}
					
					file.status = FILE_STATUS.IN_PROGRESS;
					_this._.uploadingFile = file;
					_this.cfg.events.uploadStart.call(_this, file);
					_this._.post(file);
				}
			};
			
			this._.success = function(e){
				var poster = _this.elems.poster;
				var file = _this.getQueueFile();
				_this.cfg.events.uploadSuccess.call(_this, file, poster.responseText || poster.responseXML, poster);
				//_this._.uploadComplete();
			};
			
			this._.error = function(e, code, msg){
				if(!_this._.cancel){
					var file = _this.getQueueFile();
					if(file){
						file.status = FILE_STATUS.ERROR;
						
						_this.cfg.events.uploadError.call(_this, file, code || UPLOAD_ERROR.UPLOAD_FAILED, msg || '');
						_this._.uploadComplete();
					}
				}
			};
			
			this._.abort = function(e){
				//_this.stopUpload();
				//_this.getQueueFile().status = FOCUS.widget.Upload.FILE_STATUS.CANCELLED;
				
				//_this.cfg.events.uploadError.call(_this, file, FOCUS.widget.Upload.UPLOAD_ERROR.FILE_CANCELLED);
				//_this._.queue.shift();
				//_this._.uploadingFile = null;

				//_this._.start();
				_this._.cancel = true;
				_this._.uploadComplete(true);
			};
			
			this._.progress = function(e){
				var file = _this.getQueueFile();
				if(file){
					if(e.loaded === e.total){ //markup the 100 percent in uploading
						file.fullProgress = true;
					}
					
					_this.cfg.events.uploadProgress.call(_this, file, e.loaded, e.total);
				}
			};
			
			//post handle
			this._.post = function(file){
				//setTimeout(function(){
					_this.elems.poster.open('POST', _this.cfg.uploadURL, true);
					
					try{
						if(_this.cfg.cookie !== false){
							_this.elems.poster.withCredentials = true;
						}
					}catch(ex){}
					
					var data;
					if(FormData.customized){
						data = new FormData(_this.cfg.charset);
					}else{
						data = new FormData();
					}

					if(util.type(_this.cfg.postParams) === 'object'){
						for(var key in _this.cfg.postParams){
							data.append(key, _this.cfg.postParams[key]);
						}
					}
					
					data.append(_this.cfg.filePostName || file.id, file.data, file.fullname);
					
					if(util.feature_upload.html5.FormData){
						_this.elems.poster.send(data);
					}else{
						_this.elems.poster.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
						_this.elems.poster.sendAsBinary(data);
					}
				//}, 1);
			};
			
			//uploadComplete
			this._.uploadComplete = function(isStop){
				var file = _this.getQueueFile();
				
				if(file){
					if(!file.fullProgress){
						_this._.progress.call(_this, { loaded: file.size, total: file.size });
						file.fullProgress = true;
					}
					
					if(!isStop){
						file.status = FILE_STATUS.COMPLETE;
					}
					
					_this._.queue.shift();
					_this._.uploadingFile = null;
					
					_this.cfg.events.uploadComplete.call(_this, file);
					
					//if(!isStop){
						//_this._.start();
					//}
				}
			};
			
			//xhr complete
			this._.xhrComplete = function(e){
				if(this.readyState === 4){
					switch(this.status){
						case 200: {
							_this._.success.call(this, e);
							_this._.uploadComplete();
						}; break;
						case 404:
						case 500: {
							_this._.error.call(this, e, UPLOAD_ERROR.HTTP_ERROR, this.status);
						}; break;
						default:;
					}
				}
			};
			
			//dialog start <== input:file click event
			this._.dialogStart = function(e){
				e = e || window.event;
				e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
				//e.preventDefault ? e.preventDefault() : e.returnValue = false;
				
				_this.cfg.events.dialogStart.call(_this);
			};
			
			//enter the queue
			this._.__queued = function(files, callback){
				var isFromDialog = !files;
				var selected = [], queued = [], total = _this._.queue;
				var file;
				files = files || _this.elems.selector.files;
				selected = [].slice.call(files);
				
				//exceed queue limit
				if(_this.cfg.queueLimit !== -1 && (selected.length + _this._.queue.length) > _this.cfg.queueLimit){
					for(var i = 0, len = selected.length; i < len; i++){
						file = new upload.File(selected[i]);
						_this.cfg.events.queueError.call(_this, file, QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED, _this.cfg.queueLimit);
					}
				}else{ // other validations
					for(var i = 0, len = selected.length; i < len; i++){
						file = new upload.File(selected[i]);
						
						file.status = FILE_STATUS.ERROR;

						if(!FOCUS.util.mimeValidation(_this.cfg.fileTypes, file.type)){
							_this.cfg.events.queueError.call(_this, file, QUEUE_ERROR.INVALID_FILETYPE, 'File is not an allowed file type.');
							continue;
						}
						
						//zero size file
						if((file.fileSize || file.size) === 0){
							_this.cfg.events.queueError.call(_this, file, QUEUE_ERROR.ZERO_BYTE_FILE, 'File is zero bytes and cannot be uploaded.');
							continue;
						}
						
						var sizeLimit = util.sizeConvert.unit2Bytes(_this.cfg.sizeLimit);
						//exceed size limit
						if(sizeLimit !== -1 && (file.fileSize || file.size) > sizeLimit){
							_this.cfg.events.queueError.call(_this, file, QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT, 'File size exceeds allowed limit.');
							continue;
						}
						
						file.status = FILE_STATUS.QUEUED;
						
						_this.cfg.events.queued.call(_this, file);
						queued.push(file);
						total.push(file);
					}
				}
				
				if(isFromDialog){
					//_this.elems.resetForm.reset();
					_this._._resetSelector();
					_this.cfg.events.dialogComplete.call(_this, selected.length, queued.length, total.length);
				}else{
					//TODO
					util.type(callback) === 'function' && callback.call(_this, selected.length, queued.length, total.length);
				}
				
				delete selected;
				delete queued;
				delete total;
			};
			
			//dialog complete <== input:file change event
			this._.dialogComplete = function(e, files){
				e = e || window.event;
				e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
				//e.preventDefault ? e.preventDefault() : e.returnValue = false;
				
				_this._.__queued();
			};
			
			//reset the file selector
			this._._resetSelector = function(){
				_this.elems.resetForm.appendChild(_this.elems.selector);
				setTimeout(function(){
					_this.elems.resetForm.reset();
					setTimeout(function(){
						_this.elems.holder.appendChild(_this.elems.selector);
					}, 25);
				},25);
			};
			
			//this.cfg.placeholder
			//holder elem
			this.elems.holder = document.createElement('div');
			this.elems.holder.style.cssText = '';
			this.elems.resetForm = document.createElement('form');
			this.elems.selector = document.createElement('input');
			this.elems.selector.type = 'file';
			this.elems.selector.multiple = util.feature_upload.html5.multiple && this.cfg.multiple;
			this.setFileTypes(this.cfg.fileTypes);
			this.elems.holder.accept = this.cfg.fileTypes;
			
			var place = util.query ? util.query(this.cfg.placeholder) : document.querySelectorAll(this.cfg.placeholder);
			if(place.length){
				place = place[0];
				place.parentNode.insertBefore(this.elems.holder, place);
				//this.elems.holder.appendChild(this.elems.resetForm);
				this.elems.holder.appendChild(this.elems.selector);
				place.parentNode.removeChild(place);
				
				FOCUS.util.event.bind(this.elems.selector, 'click', this._.dialogStart);
				FOCUS.util.event.bind(this.elems.selector, 'change', this._.dialogComplete);
				
				this.__setStyle('html5', this.elems.holder, this.elems.selector, this.cfg.button.text);
			}else{}

			setTimeout(function(){
				_this.isReady = true;
				// callback for choose which type to initialize
				_this.cfg.events.ready.call(_this, _this.mode);
			}, 25);
		},
		//override
		startUpload: function(){
			//gen poster
			this.elems.poster = new XMLHttpRequest();
			try{
				if(this.cfg.cookie !== false){
					this.elems.poster.withCredentials = true;
				}
			}catch(ex){}
			//FOCUS.util.event.bind(this.elems.poster.upload, 'load', this._.success);
			util.event.bind(this.elems.poster.upload, 'progress', this._.progress);
			util.event.bind(this.elems.poster.upload, 'error', this._.error);
			util.event.bind(this.elems.poster.upload, 'abort', this._.abort);
			util.event.bind(this.elems.poster, 'readystatechange', this._.xhrComplete);
            util.event.bind(this.elems.poster, 'error', this._.error);
			
			this._.start();
			
			return this;
		},
		/*cancelUpload: function(){
			var file = this.getQueueFile();
			file.status = FOCUS.widget.Upload.FILE_STATUS.CANCELLED;
			this.cfg.events.uploadError.call(_this, file, FOCUS.widget.Upload.UPLOAD_ERROR.FILE_CANCELLED, 'file cancelled.');
			this.elems.poster && this.elems.poster.abort();
		},
		stopUpload: function(){
			var file = this.getQueueFile();
			file.status = FOCUS.widget.Upload.FILE_STATUS.QUEUED;
			this.cfg.events.uploadError.call(this, file, FOCUS.widget.Upload.UPLOAD_ERROR.UPLOAD_STOPPED, 'upload stopped.');
			this.elems.poster && this.elems.poster.abort();
			this._.queue.unshift(file);
		},*/
		/*setFileTypes: function(mimeTypes){
			this.cfg.fileTypes = this.elems.selector.accept = util.convert2Mimetype(mimeTypes);
		},*/
		/*setFileQueueLimit: function(limit){
			this.cfg.queueLimit = limit;
			this.elems.selector.multiple = limit !== 1;
		},*/
		/**
		* try to queue files
		* only surport for HTML5 edtion
		* @param {HTMLFileInput|HTMLInputElement#FileList|File[]} files
		* @param {Function} [callback] queueCompelete callback
		*/
		queue: function(files, callback){
			if(files.files){ //typeof files === input:file
				files = files.files;
			}
			
			if(!files || !files.length){
				return;
			}
			
			this._.__queued(files, callback);
			
			return this;
		}
	});
}.call(FOCUS, this, this.document);

//// Known Problems
// 1. when use Firefox v > 3.5, < 4, custom class FormData, cannot convert non-ASCII characters to Binary String at FormData.prototype.append method, the parameter 'name' and the 'filename' in data will use UTF-8 URI coding instead.
//   server side developer have to convert the UTF-8 URI coding to normal characters
// [FIXED] use flash to translate chars. but if browser not support flash, also use URI encode
FOCUS.widget.Upload.__defaults__();
