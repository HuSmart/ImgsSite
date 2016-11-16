/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _script = __webpack_require__(1);

	var _script2 = _interopRequireDefault(_script);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_script2.default.load());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _qiniuBucket = __webpack_require__(2);

	var _qiniuBucket2 = _interopRequireDefault(_qiniuBucket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Config = {
	    load: function load() {
	        return _qiniuBucket2.default.getFile('config.json');
	    }
	};

	exports.default = Config;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _qiniu = __webpack_require__(3);

	var _qiniu2 = _interopRequireDefault(_qiniu);

	var _crypto = __webpack_require__(4);

	var _crypto2 = _interopRequireDefault(_crypto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var qiniuBucketUrl = null;

	/**
	 * location.protocol  获取Hppt Or Hppts
	 * location.host    获取域名，如www.baidu.com
	 */
	var filmyBucket = _qiniu2.default.bucket('filmydemo', {
	    url: qiniuBucketUrl ? qiniuBucketUrl : location.protocol + '//' + location.host
	});

	function getKeys(pswd) {
	    return filmyBucket.getFile('secret-' + pswd + '.json').then(function (body) {
	        return JSON.parse(body);
	    });
	}

	// filmyBucket.fetchPutToken=function(password,keys=null, returnBody = null){
	//     return (keys ? Promise.resolve(keys) : getKeys(password))
	//         .then(keys => {
	//             const options = {
	//                 scope: 'filmy',
	//                 deadline: Math.floor(Date.now() / 1000) +3600 ,
	//                 insertOnly: 1
	//             }

	//             if (returnBody){
	//                 options.returnBody=returnBody
	//             }

	//             const singture = safeEncode(JSON.stringify(options))

	//             const encodeDigest = encodeSign(singture,keys.sk)

	//             const token =`${keys.ak}:${encodeDigest}:${singture}`

	//             return token
	//         })
	// }

	function safeEncode(str) {
	    return btoa(str).replace(/\//g, '_').replace(/\+/g, '-');
	}

	// 相当于执行私有空间的下载步骤三
	function encodeSign(str, key) {
	    return _crypto2.default.createHmac('sha1', key).update(str).digest('base64').replace(/\//g, '_').replace(/\+/g, '-');
	}

	exports.default = filmyBucket;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	    true ? module.exports = factory() :
	   typeof define === 'function' && define.amd ? define(factory) :
	   (global.qiniu = factory());
	}(this, function () { 'use strict';

	   var babelHelpers = {};
	   babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	     return typeof obj;
	   } : function (obj) {
	     return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	   };

	   babelHelpers.classCallCheck = function (instance, Constructor) {
	     if (!(instance instanceof Constructor)) {
	       throw new TypeError("Cannot call a class as a function");
	     }
	   };

	   babelHelpers.createClass = function () {
	     function defineProperties(target, props) {
	       for (var i = 0; i < props.length; i++) {
	         var descriptor = props[i];
	         descriptor.enumerable = descriptor.enumerable || false;
	         descriptor.configurable = true;
	         if ("value" in descriptor) descriptor.writable = true;
	         Object.defineProperty(target, descriptor.key, descriptor);
	       }
	     }

	     return function (Constructor, protoProps, staticProps) {
	       if (protoProps) defineProperties(Constructor.prototype, protoProps);
	       if (staticProps) defineProperties(Constructor, staticProps);
	       return Constructor;
	     };
	   }();

	   babelHelpers.inherits = function (subClass, superClass) {
	     if (typeof superClass !== "function" && superClass !== null) {
	       throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	     }

	     subClass.prototype = Object.create(superClass && superClass.prototype, {
	       constructor: {
	         value: subClass,
	         enumerable: false,
	         writable: true,
	         configurable: true
	       }
	     });
	     if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	   };

	   babelHelpers.possibleConstructorReturn = function (self, call) {
	     if (!self) {
	       throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	     }

	     return call && (typeof call === "object" || typeof call === "function") ? call : self;
	   };

	   babelHelpers;

	   var slice = [].slice;

	   var nativeForEach = [].forEach || false;

	   var utils = {
	     slice: slice,
	     noop: function noop() {
	       return false;
	     },

	     // Class Inherits
	     inherits: function inherits(ctor, superCtor) {
	       ctor.super_ = superCtor;
	       ctor.prototype = utils.objCreate(utils.objExtend(utils.objClone(superCtor.prototype), {
	         constructor: {
	           value: ctor,
	           enumerable: false,
	           writable: true,
	           configurable: true
	         }
	       }));
	     },

	     isString: function isString(val) {
	       return typeof val == 'string';
	     },

	     isObject: function isObject(val) {
	       return val instanceof Object;
	     },

	     isArray: function isArray(val) {
	       return val instanceof Array;
	     },

	     isFunction: function isFunction(val) {
	       return val instanceof Function;
	     },

	     isUndefine: function isUndefine(val) {
	       return val === void 0;
	     },

	     objClone: function objClone(obj) {
	       if (!utils.isObject(obj)) return obj;
	       return utils.isArray(obj) ? obj.slice() : utils.objExtend({}, obj);
	     },

	     objExtend: function objExtend(obj) {
	       var sources = slice.call(arguments, 1);

	       for (var i = 0; i < sources.length; i++) {
	         (function (index) {
	           var source = sources[index];

	           if (source) {
	             for (var prop in source) {
	               if (source.hasOwnProperty(prop)) {
	                 obj[prop] = source[prop];
	               }
	             }
	           }
	         })(i);
	       }

	       return obj;
	     },

	     objCreate: function objCreate(o) {
	       if (arguments.length > 1) {
	         throw new Error('Object.create implementation only accepts the first parameter.');
	       }
	       function F() {}
	       F.prototype = o;
	       return new F();
	     },

	     objKeys: function objKeys(obj) {
	       if (utils.isFunction(obj.key)) {
	         return obj.keys();
	       } else {
	         var keys = [];

	         for (var key in obj) {
	           if (obj.hasOwnProperty(key)) {
	             keys.push(key);
	           }
	         }

	         return keys;
	       }
	     },

	     each: function each(obj, iterator, context) {
	       if (obj == null) return;
	       if (nativeForEach && obj.forEach === nativeForEach) {
	         obj.forEach(iterator, context);
	       } else if (obj.length === +obj.length) {
	         for (var i = 0, length = obj.length; i < length; i++) {
	           if (iterator.call(context, obj[i], i, obj) === false) return;
	         }
	       } else {
	         var keys = utils.objKeys(obj);
	         for (var i = 0, length = keys.length; i < length; i++) {
	           if (iterator.call(context, obj[keys[i]], keys[i], obj) === false) return;
	         }
	       }
	     },

	     format: function format(str) {
	       if (!utils.isString(str)) {
	         var objects = [];
	         for (var i = 0; i < arguments.length; i++) {
	           objects.push(arguments[i]);
	         }
	         return objects.join(' ');
	       }

	       var values = slice.call(arguments, 1);
	       var i = 0;
	       var len = arguments.length;
	       var formatRegExp = /%[sd%]/g;

	       var rtn = String(str).replace(formatRegExp, function (x) {

	         if (x === '%%') {
	           return '%';
	         }

	         if (i >= len) {
	           return x;
	         }
	         switch (x) {
	           case '%s':
	             return String(values[i++]);
	           case '%d':
	             return Number(values[i++]);
	           default:
	             return x;
	         }
	       });
	       /*      for (var x = arguments[i]; i < len; x = arguments[++i]) {
	             if (x === null || !utils.isObject(x)) {
	               rtn += ' ' + x;
	             }
	           }*/

	       return rtn;
	     },

	     safeEncode: function safeEncode(str) {
	       var encoded = btoa(str);
	       var rtn = encoded.replace(/\//g, '_').replace(/\+/g, '-');

	       return rtn;
	     },

	     css: function css(el, _css) {
	       if (el && el.style) {
	         var key, val;
	         for (key in _css) {
	           val = _css[key];
	           if (typeof val == 'number') val += 'px';
	           try {
	             el.style[key] = val;
	           } catch (e) {}
	         }
	       }
	     }

	   };

	   var imageViewTranslations = {
	     weight: 'w',
	     height: 'h',
	     quality: 'q'
	   };

	   var Fop = function () {
	     /**
	      * Fop Class
	      * @param {Asset} asset    asset
	      * @param {Object} _config config
	      */

	     function Fop(asset) {
	       var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	       babelHelpers.classCallCheck(this, Fop);

	       this.parent = asset;
	       this.config = config;

	       this.query = '';
	     }

	     /**
	      * custom fop
	      * @param  {String} str fop string
	      * @return {Fop}     fop
	      */


	     babelHelpers.createClass(Fop, [{
	       key: 'fop',
	       value: function fop(str) {
	         this.query += '|' + str;

	         return this;
	       }

	       /**
	        * Add imageInfo to the fop
	        * @return {Fop} fop
	        */

	     }, {
	       key: 'imageInfo',
	       value: function imageInfo() {
	         this.query += '|imageInfo';

	         return this;
	       }

	       /**
	        * Add exif to the fop
	        * @return {Fop} fop
	        */

	     }, {
	       key: 'exif',
	       value: function exif() {
	         this.query += '|exif';

	         return this;
	       }

	       /**
	        * Add imageView to the fop
	        * @param  {Object} opts options
	        * @return {Fop}      fop
	        */

	     }, {
	       key: 'imageView',
	       value: function imageView(opts) {
	         var mode = opts.mode;
	         delete opts.mode;

	         var url = this.url();
	         var params = {};

	         utils.each(opts, function (value, key) {
	           if (imageViewTranslations.hasOwnProperty(key)) {
	             key = imageViewTranslations[key];
	           }

	           params[key] = value;
	         });

	         this.query += utils.format('|imageView/%d%s', mode, genOptUrl(params));

	         return this;
	       }

	       /**
	        * Add imageMogr to the fop
	        * @param  {Object} opts options
	        * @return {Fop}      fop
	        */

	     }, {
	       key: 'imageMogr',
	       value: function imageMogr(opts) {
	         var params = {};

	         utils.objExtend(params, opts);

	         this.query += utils.format('|imageMogr/v2/auto-orient%s', genOptUrl(params));

	         return this;
	       }

	       /**
	        * Add watermark to the fop
	        * @param  {Object} opts options
	        * @return {Fop}      fop
	        */

	     }, {
	       key: 'watermark',
	       value: function watermark(opts) {
	         var params = {};
	         var mode = opts.mode;
	         delete opts.mode;

	         utils.objExtend(params, opts);

	         params.image = utils.safeEncode(params.image);

	         this.query += utils.format('|watermark/%d%s', mode, genOptUrl(params));

	         return this;
	       }

	       /**
	        * Add qrcode to the fop
	        * @param  {Object} opts options
	        * @return {Fop}      fop
	        */

	     }, {
	       key: 'qrcode',
	       value: function qrcode(opts) {
	         opts = opts || {
	           mode: 0,
	           level: 'L'
	         };

	         this.query += utils.format('|qrcode/%d/level/%s', this.url(), opts.mode, opts.level);

	         return this;
	       }

	       /**
	        * Markdown to HTML
	        * @param  {Object}   opts     options
	        * @return {Fop}           fop
	        */

	     }, {
	       key: 'md2html',
	       value: function md2html(opts) {
	         opts = opts || {
	           mode: false,
	           css: false
	         };

	         var url = '|md2html';

	         if (opts.css) {
	           url += utils.format('/%s', opts.mode);
	         }

	         if (opts.css) {
	           url += utils.format('/css/%s', utils.safeEncode(opts.css));
	         }

	         this.query += url;

	         return this;
	       }

	       /**
	        * get the url of the fop
	        * @return {String} url
	        */

	     }, {
	       key: 'url',
	       value: function url() {
	         return utils.format('%s?%s', this.parent.url(), this.query.substr(1));
	       }

	       /**
	        * return the image of the fop
	        * @return {Image} image
	        */

	     }, {
	       key: 'image',
	       value: function image() {
	         var image = new Image();
	         image.src = this.url();

	         return image;
	       }
	     }]);
	     return Fop;
	   }();

	   function genOptUrl(params) {
	     var url = "";

	     utils.each(params, function (value, key) {
	       url += utils.format('/%s/%s', key, value);
	     });

	     return url;
	   }

	   var configData = {};
	   function noop$1() {
	     return false;
	   }

	   var Asset$1 = function () {

	     /**
	      * Asset Class
	      * @param {String} key    Asset's key
	      * @param {Bucket} parent Bucket object
	      */

	     function Asset(key, parent) {
	       var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	       babelHelpers.classCallCheck(this, Asset);

	       this.key = key;
	       this.parent = parent;

	       this.config = config;
	     }

	     /**
	      * return the asset url
	      * @return {String} url
	      */


	     babelHelpers.createClass(Asset, [{
	       key: 'url',
	       value: function url() {
	         return this.parent.url() + '/' + this.key;
	       }

	       /**
	        * return the encoded entry url of the asset
	        * @return {String} entry url
	        */

	     }, {
	       key: 'entryUrl',
	       value: function entryUrl() {
	         return utils.safeEncode(utils.format('%s:%s', this.parent.name, this.key));
	       }

	       /**
	        * return the qrcode image of the asset
	        * @param  {Object}   opts     options
	        * @return {String}            url
	        */

	     }, {
	       key: 'qrcode',
	       value: function qrcode(opts, callback) {
	         switch (true) {
	           case utils.isFunction(opts):
	             callback = opts;
	             opts = { mode: 0, level: 'L' };
	             break;
	           case utils.isObject(opts) && utils.isUndefined(callback):
	             callback = noop$1;
	             break;
	           case utils.isUndefined(opts):
	             opts = { mode: 0, level: 'L' };
	             callback = noop$1;
	             break;
	         }

	         var url = utils.format('%s?qrcode/%d/level/%s', this.url(), opts.mode, opts.level);

	         var img = new Image();
	         img.src = img.url = url;

	         return img;
	       }
	     }, {
	       key: 'fop',
	       value: function fop(config) {
	         return new Fop(this, config);
	       }

	       /**
	        * return a image with a established format
	        * @param  {String}   alias    alias name
	        * @return {String}            url
	        */

	     }, {
	       key: 'alias',
	       value: function alias(_alias) {
	         var url = this.url();

	         url += utils.format('%s%s', this.config.separate, _alias);

	         return url;
	       }

	       /**
	        * Markdown to HTML
	        * @param  {Object}   opts     options
	        * @return {Promise}           promise object
	        */

	     }, {
	       key: 'md2html',
	       value: function md2html(opts) {
	         if (utils.isFunction(opts)) {
	           callback = opts;
	           opts = {
	             mode: false,
	             css: false
	           };
	         } else if (utils.isObject(opts)) {
	           callback = callback || noop$1;
	         } else {
	           callback = callback || noop$1;
	           opts = {
	             mode: false,
	             css: false
	           };
	         }

	         var url = this.url() + '?md2html';

	         if (opts.mode) {
	           url += utils.format('/%s', opts.mode);
	         }

	         if (opts.css) {
	           url += utils.format('/css/%s', utils.safeEncode(opts.css));
	         }

	         return url;
	       }
	     }]);
	     return Asset;
	   }();

	   function _Asset (config) {
	     configData = config;
	     return Asset$1;
	   }

	   /**!
	    * FileAPI — a set of tools for working with files
	    *
	    * @author  RubaXa  <trash@rubaxa.org>
	    * @build lib/canvas-to-blob lib/FileAPI.core lib/FileAPI.Image lib/FileAPI.Form lib/FileAPI.XHR lib/FileAPI.Flash
	    */ /*! fileapi 2.0.2 - BSD | git://github.com/mailru/FileAPI.git
	    * FileAPI — a set of  javascript tools for working with files. Multiupload, drag'n'drop and chunked file upload. Images: crop, resize and auto orientation by EXIF.
	    */window.FileAPI={staticPath:'http://iwillwen.u.qiniudn.com/',withCredentials:false}; /*jslint evil: true */ /*global window, URL, webkitURL, ActiveXObject */(function(window,undef){'use strict';var gid=1,noop=function noop(){},document=window.document,doctype=document.doctype||{},userAgent=window.navigator.userAgent, // https://github.com/blueimp/JavaScript-Load-Image/blob/master/load-image.js#L48
	   apiURL=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL,Blob=window.Blob,File=window.File,FileReader=window.FileReader,FormData=window.FormData,XMLHttpRequest=window.XMLHttpRequest,jQuery=window.jQuery,html5=!!(File&&FileReader&&(window.Uint8Array||FormData||XMLHttpRequest.prototype.sendAsBinary))&&!(/safari\//i.test(userAgent)&&!/chrome\//i.test(userAgent)&&/windows/i.test(userAgent)), // BugFix: https://github.com/mailru/FileAPI/issues/25
	   cors=html5&&'withCredentials' in new XMLHttpRequest(),chunked=html5&&!!Blob&&!!(Blob.prototype.webkitSlice||Blob.prototype.mozSlice||Blob.prototype.slice), // https://github.com/blueimp/JavaScript-Canvas-to-Blob
	   dataURLtoBlob=window.dataURLtoBlob,_rimg=/img/i,_rcanvas=/canvas/i,_rimgcanvas=/img|canvas/i,_rinput=/input/i,_rdata=/^data:[^,]+,/,Math=window.Math,_SIZE_CONST=function _SIZE_CONST(pow){pow=new window.Number(Math.pow(1024,pow));pow.from=function(sz){return Math.round(sz*this);};return pow;},_elEvents={}, // element event listeners
	   _infoReader=[], // list of file info processors
	   _readerEvents='abort progress error load loadend',_xhrPropsExport='status statusText readyState response responseXML responseText responseBody'.split(' '),currentTarget='currentTarget', // for minimize
	   preventDefault='preventDefault', // and this too
	   _isArray=function _isArray(ar){return ar&&'length' in ar;}, /**
	        * Iterate over a object or array
	        */_each=function _each(obj,fn,ctx){if(obj){if(_isArray(obj)){for(var i=0,n=obj.length;i<n;i++){if(i in obj){fn.call(ctx,obj[i],i,obj);}}}else {for(var key in obj){if(obj.hasOwnProperty(key)){fn.call(ctx,obj[key],key,obj);}}}}}, /**
	        * Merge the contents of two or more objects together into the first object
	        */_extend=function _extend(dst){var args=arguments,i=1,_ext=function _ext(val,key){dst[key]=val;};for(;i<args.length;i++){_each(args[i],_ext);}return dst;}, /**
	        * Add event listener
	        */_on=function _on(el,type,fn){if(el){var uid=api.uid(el);if(!_elEvents[uid]){_elEvents[uid]={};}_each(type.split(/\s+/),function(type){if(jQuery){jQuery.event.add(el,type,fn);}else {if(!_elEvents[uid][type]){_elEvents[uid][type]=[];}_elEvents[uid][type].push(fn);if(el.addEventListener){el.addEventListener(type,fn,false);}else if(el.attachEvent){el.attachEvent('on'+type,fn);}else {el['on'+type]=fn;}}});}}, /**
	        * Remove event listener
	        */_off=function _off(el,type,fn){if(el){var uid=api.uid(el),events=_elEvents[uid]||{};_each(type.split(/\s+/),function(type){if(jQuery){jQuery.event.remove(el,type,fn);}else {var fns=events[type]||[],i=fns.length;while(i--){if(fns[i]===fn){fns.splice(i,1);break;}}if(el.addEventListener){el.removeEventListener(type,fn,false);}else if(el.detachEvent){el.detachEvent('on'+type,fn);}else {el['on'+type]=null;}}});}},_one=function _one(el,type,fn){_on(el,type,function _(evt){_off(el,type,_);fn(evt);});},_fixEvent=function _fixEvent(evt){if(!evt.target){evt.target=window.event&&window.event.srcElement||document;}if(evt.target.nodeType===3){evt.target=evt.target.parentNode;}return evt;},_supportInputAttr=function _supportInputAttr(attr){var input=document.createElement('input');input.setAttribute('type',"file");return attr in input;}, /**
	        * FileAPI (core object)
	        */api={version:'2.0.2',cors:false,html5:true,media:false,formData:true,debug:false,pingUrl:false,multiFlash:false,flashAbortTimeout:0,withCredentials:true,staticPath:'./dist/',flashUrl:0, // @default: './FileAPI.flash.swf'
	   flashImageUrl:0, // @default: './FileAPI.flash.image.swf'
	   postNameConcat:function postNameConcat(name,idx){return name+(idx!=null?'['+idx+']':'');},ext2mime:{jpg:'image/jpeg',tif:'image/tiff',txt:'text/plain'}, // Fallback for flash
	   accept:{'image/*':'art bm bmp dwg dxf cbr cbz fif fpx gif ico iefs jfif jpe jpeg jpg jps jut mcf nap nif pbm pcx pgm pict pm png pnm qif qtif ras rast rf rp svf tga tif tiff xbm xbm xpm xwd','audio/*':'m4a flac aac rm mpa wav wma ogg mp3 mp2 m3u mod amf dmf dsm far gdm imf it m15 med okt s3m stm sfx ult uni xm sid ac3 dts cue aif aiff wpl ape mac mpc mpp shn wv nsf spc gym adplug adx dsp adp ymf ast afc hps xs','video/*':'m4v 3gp nsv ts ty strm rm rmvb m3u ifo mov qt divx xvid bivx vob nrg img iso pva wmv asf asx ogm m2v avi bin dat dvr-ms mpg mpeg mp4 mkv avc vp3 svq3 nuv viv dv fli flv wpl'},chunkSize:0,chunkUploadRetry:0,chunkNetworkDownRetryTimeout:2000, // milliseconds, don't flood when network is down
	   KB:_SIZE_CONST(1),MB:_SIZE_CONST(2),GB:_SIZE_CONST(3),TB:_SIZE_CONST(4),expando:'fileapi'+new Date().getTime(),uid:function uid(obj){return obj?obj[api.expando]=obj[api.expando]||api.uid():(++gid,api.expando+gid);},log:function log(){if(api.debug&&window.console&&console.log){if(console.log.apply){console.log.apply(console,arguments);}else {console.log([].join.call(arguments,' '));}}}, /**
	          * Create new image
	          *
	          * @param {String} [src]
	          * @param {Function} [fn]   1. error -- boolean, 2. img -- Image element
	          * @returns {HTMLElement}
	          */newImage:function newImage(src,fn){var img=document.createElement('img');if(fn){api.event.one(img,'error load',function(evt){fn(evt.type=='error',img);img=null;});}img.src=src;return img;}, /**
	          * Get XHR
	          * @returns {XMLHttpRequest}
	          */getXHR:function getXHR(){var xhr;if(XMLHttpRequest){xhr=new XMLHttpRequest();}else if(window.ActiveXObject){try{xhr=new ActiveXObject('MSXML2.XMLHttp.3.0');}catch(e){xhr=new ActiveXObject('Microsoft.XMLHTTP');}}return xhr;},isArray:_isArray,support:{dnd:cors&&'ondrop' in document.createElement('div'),cors:cors,html5:html5,chunked:chunked,dataURI:true,accept:_supportInputAttr('accept'),multiple:_supportInputAttr('multiple')},event:{on:_on,off:_off,one:_one,fix:_fixEvent},throttle:function throttle(fn,delay){var id,args;return function _throttle(){args=arguments;if(!id){fn.apply(window,args);id=setTimeout(function(){id=0;fn.apply(window,args);},delay);}};},F:function F(){},parseJSON:function parseJSON(str){var json;if(window.JSON&&JSON.parse){json=JSON.parse(str);}else {json=new Function('return ('+str.replace(/([\r\n])/g,'\\$1')+');')();}return json;},trim:function trim(str){str=String(str);return str.trim?str.trim():str.replace(/^\s+|\s+$/g,'');}, /**
	          * Simple Defer
	          * @return  {Object}
	          */defer:function defer(){var list=[],result,error,defer={resolve:function resolve(err,res){defer.resolve=noop;error=err||false;result=res;while(res=list.shift()){res(error,result);}},then:function then(fn){if(error!==undef){fn(error,result);}else {list.push(fn);}}};return defer;},queue:function queue(fn){var _idx=0,_length=0,_fail=false,_end=false,queue={inc:function inc(){_length++;},next:function next(){_idx++;setTimeout(queue.check,0);},check:function check(){_idx>=_length&&!_fail&&queue.end();},isFail:function isFail(){return _fail;},fail:function fail(){!_fail&&fn(_fail=true);},end:function end(){if(!_end){_end=true;fn();}}};return queue;}, /**
	          * For each object
	          *
	          * @param {Object|Array}  obj
	          * @param {Function}    fn
	          * @param {*}       [ctx]
	          */each:_each, /**
	          * Async for
	          * @param {Array} array
	          * @param {Function} callback
	          */afor:function afor(array,callback){var i=0,n=array.length;if(_isArray(array)&&n--){(function _next(){callback(n!=i&&_next,array[i],i++);})();}else {callback(false);}}, /**
	          * Merge the contents of two or more objects together into the first object
	          *
	          * @param {Object}  dst
	          * @return  {Object}
	          */extend:_extend, /**
	          * Is file instance
	          *
	          * @param  {File}  file
	          * @return {Boolean}
	          */isFile:function isFile(file){return html5&&file&&file instanceof File;}, /**
	          * Is canvas element
	          *
	          * @param {HTMLElement} el
	          * @return  {Boolean}
	          */isCanvas:function isCanvas(el){return el&&_rcanvas.test(el.nodeName);},getFilesFilter:function getFilesFilter(filter){filter=typeof filter=='string'?filter:filter.getAttribute&&filter.getAttribute('accept')||'';return filter?new RegExp('('+filter.replace(/\./g,'\\.').replace(/,/g,'|')+')$','i'):/./;}, /**
	          * Read as DataURL
	          *
	          * @param {File|Element} file
	          * @param {Function} fn
	          */readAsDataURL:function readAsDataURL(file,fn){if(api.isCanvas(file)){_emit(file,fn,'load',api.toDataURL(file));}else {_readAs(file,fn,'DataURL');}}, /**
	          * Read as Binary string
	          *
	          * @param {File} file
	          * @param {Function} fn
	          */readAsBinaryString:function readAsBinaryString(file,fn){if(_hasSupportReadAs('BinaryString')){_readAs(file,fn,'BinaryString');}else { // Hello IE10!
	   _readAs(file,function(evt){if(evt.type=='load'){try{ // dataURL -> binaryString
	   evt.result=api.toBinaryString(evt.result);}catch(e){evt.type='error';evt.message=e.toString();}}fn(evt);},'DataURL');}}, /**
	          * Read as ArrayBuffer
	          *
	          * @param {File} file
	          * @param {Function} fn
	          */readAsArrayBuffer:function readAsArrayBuffer(file,fn){_readAs(file,fn,'ArrayBuffer');}, /**
	          * Read as text
	          *
	          * @param {File} file
	          * @param {String} encoding
	          * @param {Function} [fn]
	          */readAsText:function readAsText(file,encoding,fn){if(!fn){fn=encoding;encoding='utf-8';}_readAs(file,fn,'Text',encoding);}, /**
	          * Convert image or canvas to DataURL
	          *
	          * @param   {Element}  el      Image or Canvas element
	          * @param   {String}   [type]  mime-type
	          * @return  {String}
	          */toDataURL:function toDataURL(el,type){if(typeof el=='string'){return el;}else if(el.toDataURL){return el.toDataURL(type||'image/png');}}, /**
	          * Canvert string, image or canvas to binary string
	          *
	          * @param   {String|Element} val
	          * @return  {String}
	          */toBinaryString:function toBinaryString(val){return window.atob(api.toDataURL(val).replace(_rdata,''));}, /**
	          * Read file or DataURL as ImageElement
	          *
	          * @param {File|String} file
	          * @param {Function}    fn
	          * @param {Boolean}   [progress]
	          */readAsImage:function readAsImage(file,fn,progress){if(api.isFile(file)){if(apiURL){ /** @namespace apiURL.createObjectURL */var data=apiURL.createObjectURL(file);if(data===undef){_emit(file,fn,'error');}else {api.readAsImage(data,fn,progress);}}else {api.readAsDataURL(file,function(evt){if(evt.type=='load'){api.readAsImage(evt.result,fn,progress);}else if(progress||evt.type=='error'){_emit(file,fn,evt,null,{loaded:evt.loaded,total:evt.total});}});}}else if(api.isCanvas(file)){_emit(file,fn,'load',file);}else if(_rimg.test(file.nodeName)){if(file.complete){_emit(file,fn,'load',file);}else {var events='error abort load';_one(file,events,function _fn(evt){if(evt.type=='load'&&apiURL){ /** @namespace apiURL.revokeObjectURL */apiURL.revokeObjectURL(file.src);}_off(file,events,_fn);_emit(file,fn,evt,file);});}}else if(file.iframe){_emit(file,fn,{type:'error'});}else { // Created image
	   var img=api.newImage(file.dataURL||file);api.readAsImage(img,fn,progress);}}, /**
	          * Make file by name
	          *
	          * @param {String}  name
	          * @return  {Array}
	          */checkFileObj:function checkFileObj(name){var file={},accept=api.accept;if((typeof name==='undefined'?'undefined':babelHelpers.typeof(name))=='object'){file=name;}else {file.name=(name+'').split(/\\|\//g).pop();}if(file.type==null){file.type=file.name.split('.').pop();}_each(accept,function(ext,type){ext=new RegExp(ext.replace(/\s/g,'|'),'i');if(ext.test(file.type)||api.ext2mime[file.type]){file.type=api.ext2mime[file.type]||type.split('/')[0]+'/'+file.type;}});return file;}, /**
	          * Get drop files
	          *
	          * @param {Event} evt
	          * @param {Function} callback
	          */getDropFiles:function getDropFiles(evt,callback){var files=[],dataTransfer=_getDataTransfer(evt),entrySupport=_isArray(dataTransfer.items)&&dataTransfer.items[0]&&_getAsEntry(dataTransfer.items[0]),queue=api.queue(function(){callback(files);});_each((entrySupport?dataTransfer.items:dataTransfer.files)||[],function(item){queue.inc();try{if(entrySupport){_readEntryAsFiles(item,function(err,entryFiles){if(err){api.log('[err] getDropFiles:',err);}else {files.push.apply(files,entryFiles);}queue.next();});}else {_isRegularFile(item,function(yes){yes&&files.push(item);queue.next();});}}catch(err){queue.next();api.log('[err] getDropFiles: ',err);}});queue.check();}, /**
	          * Get file list
	          *
	          * @param {HTMLInputElement|Event}  input
	          * @param {String|Function} [filter]
	          * @param {Function}      [callback]
	          * @return  {Array|Null}
	          */getFiles:function getFiles(input,filter,callback){var files=[];if(callback){api.filterFiles(api.getFiles(input),filter,callback);return null;}if(input.jquery){ // jQuery object
	   input.each(function(){files=files.concat(api.getFiles(this));});input=files;files=[];}if(typeof filter=='string'){filter=api.getFilesFilter(filter);}if(input.originalEvent){ // jQuery event
	   input=_fixEvent(input.originalEvent);}else if(input.srcElement){ // IE Event
	   input=_fixEvent(input);}if(input.dataTransfer){ // Drag'n'Drop
	   input=input.dataTransfer;}else if(input.target){ // Event
	   input=input.target;}if(input.files){ // Input[type="file"]
	   files=input.files;if(!html5){ // Partial support for file api
	   files[0].blob=input;files[0].iframe=true;}}else if(!html5&&isInputFile(input)){if(api.trim(input.value)){files=[api.checkFileObj(input.value)];files[0].blob=input;files[0].iframe=true;}}else if(_isArray(input)){files=input;}return api.filter(files,function(file){return !filter||filter.test(file.name);});}, /**
	          * Get total file size
	          * @param {Array} files
	          * @return  {Number}
	          */getTotalSize:function getTotalSize(files){var size=0,i=files&&files.length;while(i--){size+=files[i].size;}return size;}, /**
	          * Get image information
	          *
	          * @param {File}    file
	          * @param {Function}  fn
	          */getInfo:function getInfo(file,fn){var info={},readers=_infoReader.concat();if(api.isFile(file)){(function _next(){var reader=readers.shift();if(reader){if(reader.test(file.type)){reader(file,function(err,res){if(err){fn(err);}else {_extend(info,res);_next();}});}else {_next();}}else {fn(false,info);}})();}else {fn('not_support_info',info);}}, /**
	          * Add information reader
	          *
	          * @param {RegExp} mime
	          * @param {Function} fn
	          */addInfoReader:function addInfoReader(mime,fn){fn.test=function(type){return mime.test(type);};_infoReader.push(fn);}, /**
	          * Filter of array
	          *
	          * @param {Array}   input
	          * @param {Function}  fn
	          * @return  {Array}
	          */filter:function filter(input,fn){var result=[],i=0,n=input.length,val;for(;i<n;i++){if(i in input){val=input[i];if(fn.call(val,val,i,input)){result.push(val);}}}return result;}, /**
	          * Filter files
	          *
	          * @param {Array}   files
	          * @param {Function}  eachFn
	          * @param {Function}  resultFn
	          */filterFiles:function filterFiles(files,eachFn,resultFn){if(files.length){ // HTML5 or Flash
	   var queue=files.concat(),file,result=[],deleted=[];(function _next(){if(queue.length){file=queue.shift();api.getInfo(file,function(err,info){(eachFn(file,err?false:info)?result:deleted).push(file);_next();});}else {resultFn(result,deleted);}})();}else {resultFn([],files);}},upload:function upload(options){options=_extend({prepare:api.F,beforeupload:api.F,upload:api.F,fileupload:api.F,fileprogress:api.F,filecomplete:api.F,progress:api.F,complete:api.F,pause:api.F,imageOriginal:true,chunkSize:api.chunkSize,chunkUpoloadRetry:api.chunkUploadRetry},options);if(options.imageAutoOrientation&&!options.imageTransform){options.imageTransform={rotate:'auto'};}var proxyXHR=new api.XHR(options),dataArray=this._getFilesDataArray(options.files),_this=this,_total=0,_loaded=0,_nextFile2,_complete=false; // calc total size
	   _each(dataArray,function(data){_total+=data.size;}); // Array of files
	   proxyXHR.files=[];_each(dataArray,function(data){proxyXHR.files.push(data.file);}); // Set upload status props
	   proxyXHR.total=_total;proxyXHR.loaded=0;proxyXHR.filesLeft=dataArray.length; // emit "beforeupload"  event
	   options.beforeupload(proxyXHR,options); // Upload by file
	   _nextFile2=function _nextFile(){var data=dataArray.shift(),_file=data&&data.file,_fileLoaded=false,_fileOptions=_simpleClone(options);proxyXHR.filesLeft=dataArray.length;if(_file&&_file.name===api.expando){_file=null;api.log('[warn] FileAPI.upload() — called without files');}if((proxyXHR.statusText!='abort'||proxyXHR.current)&&data){ // Mark active job
	   _complete=false; // Set current upload file
	   proxyXHR.currentFile=_file; // Prepare file options
	   _file&&options.prepare(_file,_fileOptions);_this._getFormData(_fileOptions,data,function(form){if(!_loaded){ // emit "upload" event
	   options.upload(proxyXHR,options);}var xhr=new api.XHR(_extend({},_fileOptions,{upload:_file?function(){ // emit "fileupload" event
	   options.fileupload(_file,xhr,_fileOptions);}:noop,progress:_file?function(evt){if(!_fileLoaded){ // emit "fileprogress" event
	   options.fileprogress({type:'progress',total:data.total=evt.total,loaded:data.loaded=evt.loaded},_file,xhr,_fileOptions); // emit "progress" event
	   options.progress({type:'progress',total:_total,loaded:proxyXHR.loaded=_loaded+data.size*(evt.loaded/evt.total)|0},_file,xhr,_fileOptions);}}:noop,complete:function complete(err){ // fixed throttle event
	   _fileLoaded=true;_each(_xhrPropsExport,function(name){proxyXHR[name]=xhr[name];});if(_file){data.loaded=data.total; // emulate 100% "progress"
	   this.progress(data); // bytes loaded
	   _loaded+=data.size; // data.size != data.total, it's desirable fix this
	   proxyXHR.loaded=_loaded; // emit "filecomplete" event
	   options.filecomplete(err,xhr,_file,_fileOptions);} // upload next file
	   _nextFile2.call(_this);}})); // xhr
	   // ...
	   proxyXHR.abort=function(current){if(!current){dataArray.length=0;}this.current=current;xhr.abort();}; // Start upload
	   xhr.send(form);});}else {options.complete(proxyXHR.status==200||proxyXHR.status==201?false:proxyXHR.statusText||'error',proxyXHR,options); // Mark done state
	   _complete=true;}}; // Next tick
	   setTimeout(_nextFile2,0); // Append more files to the existing request
	   // first - add them to the queue head/tail
	   proxyXHR.append=function(files,first){files=api._getFilesDataArray([].concat(files));_each(files,function(data){_total+=data.size;proxyXHR.files.push(data.file);if(first){dataArray.unshift(data);}else {dataArray.push(data);}});proxyXHR.statusText="";if(_complete){_nextFile2.call(_this);}}; // Removes file from queue by file reference and returns it
	   proxyXHR.remove=function(file){var i=dataArray.length,_file;while(i--){if(dataArray[i].file==file){_file=dataArray.splice(i,1);_total-=_file.size;}}return _file;};return proxyXHR;},_getFilesDataArray:function _getFilesDataArray(data){var files=[],oFiles={};if(isInputFile(data)){var tmp=api.getFiles(data);oFiles[data.name||'file']=data.getAttribute('multiple')!==null?tmp:tmp[0];}else if(_isArray(data)&&isInputFile(data[0])){_each(data,function(input){oFiles[input.name||'file']=api.getFiles(input);});}else {oFiles=data;}_each(oFiles,function add(file,name){if(_isArray(file)){_each(file,function(file){add(file,name);});}else if(file&&(file.name||file.image)){files.push({name:name,file:file,size:file.size,total:file.size,loaded:0});}});if(!files.length){ // Create fake `file` object
	   files.push({file:{name:api.expando}});}return files;},_getFormData:function _getFormData(options,data,fn){var file=data.file,name=data.name,filename=file.name,filetype=file.type,trans=api.support.transform&&options.imageTransform,Form=new api.Form(),queue=api.queue(function(){fn(Form);}),isOrignTrans=trans&&_isOriginTransform(trans),postNameConcat=api.postNameConcat;(function _addFile(file /**Object*/){if(file.image){ // This is a FileAPI.Image
	   queue.inc();file.toData(function(err,image){ // @todo: error
	   filename=filename||new Date().getTime()+'.png';_addFile(image);queue.next();});}else if(api.Image&&trans&&(/^image/.test(file.type)||_rimgcanvas.test(file.nodeName))){queue.inc();if(isOrignTrans){ // Convert to array for transform function
	   trans=[trans];}api.Image.transform(file,trans,options.imageAutoOrientation,function(err,images){if(isOrignTrans&&!err){if(!dataURLtoBlob&&!api.flashEngine){ // Canvas.toBlob or Flash not supported, use multipart
	   Form.multipart=true;}Form.append(name,images[0],filename,trans[0].type||filetype);}else {var addOrigin=0;if(!err){_each(images,function(image,idx){if(!dataURLtoBlob&&!api.flashEngine){Form.multipart=true;}if(!trans[idx].postName){addOrigin=1;}Form.append(trans[idx].postName||postNameConcat(name,idx),image,filename,trans[idx].type||filetype);});}if(err||options.imageOriginal){Form.append(postNameConcat(name,addOrigin?'original':null),file,filename,filetype);}}queue.next();});}else if(filename!==api.expando){Form.append(name,file,filename);}})(file); // Append data
	   _each(options.data,function add(val,name){if((typeof val==='undefined'?'undefined':babelHelpers.typeof(val))=='object'){_each(val,function(v,i){add(v,postNameConcat(name,i));});}else {Form.append(name,val);}});queue.check();},reset:function reset(inp,notRemove){var parent,clone;if(jQuery){clone=jQuery(inp).clone(true).insertBefore(inp).val('')[0];if(!notRemove){jQuery(inp).remove();}}else {parent=inp.parentNode;clone=parent.insertBefore(inp.cloneNode(true),inp);clone.value='';if(!notRemove){parent.removeChild(inp);}_each(_elEvents[api.uid(inp)],function(fns,type){_each(fns,function(fn){_off(inp,type,fn);_on(clone,type,fn);});});}return clone;}, /**
	          * Load remote file
	          *
	          * @param   {String}    url
	          * @param   {Function}  fn
	          * @return  {XMLHttpRequest}
	          */load:function load(url,fn){var xhr=api.getXHR();if(xhr){xhr.open('GET',url,true);if(xhr.overrideMimeType){xhr.overrideMimeType('text/plain; charset=x-user-defined');}_on(xhr,'progress',function( /**Event*/evt){ /** @namespace evt.lengthComputable */if(evt.lengthComputable){fn({type:evt.type,loaded:evt.loaded,total:evt.total},xhr);}});xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=null;if(xhr.status==200){url=url.split('/'); /** @namespace xhr.responseBody */var file={name:url[url.length-1],size:xhr.getResponseHeader('Content-Length'),type:xhr.getResponseHeader('Content-Type')};file.dataURL='data:'+file.type+';base64,'+api.encode64(xhr.responseBody||xhr.responseText);fn({type:'load',result:file},xhr);}else {fn({type:'error'},xhr);}}};xhr.send(null);}else {fn({type:'error'});}return xhr;},encode64:function encode64(str){var b64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',outStr='',i=0;if(typeof str!=='string'){str=String(str);}while(i<str.length){ //all three "& 0xff" added below are there to fix a known bug
	   //with bytes returned by xhr.responseText
	   var byte1=str.charCodeAt(i++)&0xff,byte2=str.charCodeAt(i++)&0xff,byte3=str.charCodeAt(i++)&0xff,enc1=byte1>>2,enc2=(byte1&3)<<4|byte2>>4,enc3,enc4;if(isNaN(byte2)){enc3=enc4=64;}else {enc3=(byte2&15)<<2|byte3>>6;enc4=isNaN(byte3)?64:byte3&63;}outStr+=b64.charAt(enc1)+b64.charAt(enc2)+b64.charAt(enc3)+b64.charAt(enc4);}return outStr;}} // api
	   ;function _emit(target,fn,name,res,ext){var evt={type:name.type||name,target:target,result:res};_extend(evt,ext);fn(evt);}function _hasSupportReadAs(as){return FileReader&&!!FileReader.prototype['readAs'+as];}function _readAs(file,fn,as,encoding){if(api.isFile(file)&&_hasSupportReadAs(as)){var Reader=new FileReader(); // Add event listener
	   _on(Reader,_readerEvents,function _fn(evt){var type=evt.type;if(type=='progress'){_emit(file,fn,evt,evt.target.result,{loaded:evt.loaded,total:evt.total});}else if(type=='loadend'){_off(Reader,_readerEvents,_fn);Reader=null;}else {_emit(file,fn,evt,evt.target.result);}});try{ // ReadAs ...
	   if(encoding){Reader['readAs'+as](file,encoding);}else {Reader['readAs'+as](file);}}catch(err){_emit(file,fn,'error',undef,{error:err.toString()});}}else {_emit(file,fn,'error',undef,{error:'filreader_not_support_'+as});}}function _isRegularFile(file,callback){ // http://stackoverflow.com/questions/8856628/detecting-folders-directories-in-javascript-filelist-objects
	   if(!file.type&&file.size%4096===0&&file.size<=102400){if(FileReader){try{var Reader=new FileReader();_one(Reader,_readerEvents,function(evt){var isFile=evt.type!='error';callback(isFile);if(isFile){Reader.abort();}});Reader.readAsDataURL(file);}catch(err){callback(false);}}else {callback(null);}}else {callback(true);}}function _getAsEntry(item){var entry;if(item.getAsEntry){entry=item.getAsEntry();}else if(item.webkitGetAsEntry){entry=item.webkitGetAsEntry();}return entry;}function _readEntryAsFiles(entry,callback){if(!entry){ // error
	   callback('invalid entry');}else if(entry.isFile){ // Read as file
	   entry.file(function(file){ // success
	   file.fullPath=entry.fullPath;callback(false,[file]);},function(err){ // error
	   callback('FileError.code: '+err.code);});}else if(entry.isDirectory){var reader=entry.createReader(),result=[];reader.readEntries(function(entries){ // success
	   api.afor(entries,function(next,entry){_readEntryAsFiles(entry,function(err,files){if(err){api.log(err);}else {result=result.concat(files);}if(next){next();}else {callback(false,result);}});});},function(err){ // error
	   callback('directory_reader: '+err);});}else {_readEntryAsFiles(_getAsEntry(entry),callback);}}function _simpleClone(obj){var copy={};_each(obj,function(val,key){if(val&&(typeof val==='undefined'?'undefined':babelHelpers.typeof(val))==='object'&&val.nodeType===void 0){val=_extend({},val);}copy[key]=val;});return copy;}function isInputFile(el){return _rinput.test(el&&el.tagName);}function _getDataTransfer(evt){return (evt.originalEvent||evt||'').dataTransfer||{};}function _isOriginTransform(trans){var key;for(key in trans){if(trans.hasOwnProperty(key)){if(!(trans[key] instanceof Object||key==='overlay'||key==='filter')){return true;}}}return false;} // Add default image info reader
	   api.addInfoReader(/^image/,function(file /**File*/,callback /**Function*/){if(!file.__dimensions){var defer=file.__dimensions=api.defer();api.readAsImage(file,function(evt){var img=evt.target;defer.resolve(evt.type=='load'?false:'error',{width:img.width,height:img.height});img=null;});}file.__dimensions.then(callback);}); /**
	      * Drag'n'Drop special event
	      *
	      * @param {HTMLElement} el
	      * @param {Function}    onHover
	      * @param {Function}    onDrop
	      */api.event.dnd=function(el,onHover,onDrop){var _id,_type;if(!onDrop){onDrop=onHover;onHover=api.F;}if(FileReader){_on(el,'dragenter dragleave dragover',function(evt){var types=_getDataTransfer(evt).types,i=types&&types.length,debounceTrigger=false;while(i--){if(~types[i].indexOf('File')){evt[preventDefault]();if(_type!==evt.type){_type=evt.type; // Store current type of event
	   if(_type!='dragleave'){onHover.call(evt[currentTarget],true,evt);}debounceTrigger=true;}break; // exit from "while"
	   }}if(debounceTrigger){clearTimeout(_id);_id=setTimeout(function(){onHover.call(evt[currentTarget],_type!='dragleave',evt);},50);}});_on(el,'drop',function(evt){evt[preventDefault]();_type=0;onHover.call(evt[currentTarget],false,evt);api.getDropFiles(evt,function(files){onDrop.call(evt[currentTarget],files,evt);});});}else {api.log("Drag'n'Drop -- not supported");}}; /**
	      * Remove drag'n'drop
	      * @param {HTMLElement} el
	      * @param {Function}    onHover
	      * @param {Function}    onDrop
	      */api.event.dnd.off=function(el,onHover,onDrop){_off(el,'dragenter dragleave dragover',onHover);_off(el,'drop',onDrop);}; // Support jQuery
	   if(jQuery&&!jQuery.fn.dnd){jQuery.fn.dnd=function(onHover,onDrop){return this.each(function(){api.event.dnd(this,onHover,onDrop);});};jQuery.fn.offdnd=function(onHover,onDrop){return this.each(function(){api.event.dnd.off(this,onHover,onDrop);});};} // @export
	   window.FileAPI=_extend(api,window.FileAPI); // Debug info
	   api.log('FileAPI: '+api.version);api.log('protocol: '+window.location.protocol);api.log('doctype: ['+doctype.name+'] '+doctype.publicId+' '+doctype.systemId); // @detect 'x-ua-compatible'
	   _each(document.getElementsByTagName('meta'),function(meta){if(/x-ua-compatible/i.test(meta.getAttribute('http-equiv'))){api.log('meta.http-equiv: '+meta.getAttribute('content'));}}); // @configuration
	   if(!api.flashUrl){api.flashUrl=api.staticPath+'FileAPI.flash.swf';}if(!api.flashImageUrl){api.flashImageUrl=api.staticPath+'FileAPI.flash.image.swf';}if(!api.flashWebcamUrl){api.flashWebcamUrl=api.staticPath+'FileAPI.flash.camera.swf';}})(window,void 0); /*global window, FileAPI, document */(function(api,document,undef){'use strict';var min=Math.min,round=Math.round,getCanvas=function getCanvas(){return document.createElement('canvas');},support=false,exifOrientation={8:270,3:180,6:90};try{support=getCanvas().toDataURL('image/png').indexOf('data:image/png')>-1;}catch(e){}function Image(file){if(file instanceof Image){var img=new Image(file.file);api.extend(img.matrix,file.matrix);return img;}else if(!(this instanceof Image)){return new Image(file);}this.file=file;this.matrix={sx:0,sy:0,sw:0,sh:0,dx:0,dy:0,dw:0,dh:0,resize:0, // min, max OR preview
	   deg:0,quality:1, // jpeg quality
	   filter:0};}Image.prototype={image:true,constructor:Image,set:function set(attrs){api.extend(this.matrix,attrs);return this;},crop:function crop(x,y,w,h){if(w===undef){w=x;h=y;x=y=0;}return this.set({sx:x,sy:y,sw:w,sh:h||w});},resize:function resize(w,h,type){if(typeof h=='string'){type=h;h=w;}return this.set({dw:w,dh:h,resize:type});},preview:function preview(w,h){return this.resize(w,h||w,'preview');},rotate:function rotate(deg){return this.set({deg:deg});},filter:function filter(_filter){return this.set({filter:_filter});},overlay:function overlay(images){return this.set({overlay:images});},clone:function clone(){return new Image(this);},_load:function _load(image,fn){var self=this;if(/img|video/i.test(image.nodeName)){fn.call(self,null,image);}else {api.readAsImage(image,function(evt){fn.call(self,evt.type!='load',evt.result);});}},_apply:function _apply(image,fn){var canvas=getCanvas(),m=this.getMatrix(image),ctx=canvas.getContext('2d'),width=image.videoWidth||image.width,height=image.videoHeight||image.height,deg=m.deg,dw=m.dw,dh=m.dh,w=width,h=height,filter=m.filter,copy // canvas copy
	   ,buffer=image,overlay=m.overlay,queue=api.queue(function(){fn(false,canvas);}),renderImageToCanvas=api.renderImageToCanvas; // For `renderImageToCanvas`
	   image._type=this.file.type;while(min(w/dw,h/dh)>2){w=w/2+0.5|0;h=h/2+0.5|0;copy=getCanvas();copy.width=w;copy.height=h;if(buffer!==image){renderImageToCanvas(copy,buffer,0,0,buffer.width,buffer.height,0,0,w,h);buffer=copy;}else {buffer=copy;renderImageToCanvas(buffer,image,m.sx,m.sy,m.sw,m.sh,0,0,w,h);m.sx=m.sy=m.sw=m.sh=0;}}canvas.width=deg%180?dh:dw;canvas.height=deg%180?dw:dh;canvas.type=m.type;canvas.quality=m.quality;ctx.rotate(deg*Math.PI/180);renderImageToCanvas(canvas,buffer,m.sx,m.sy,m.sw||buffer.width,m.sh||buffer.height,deg==180||deg==270?-dw:0,deg==90||deg==180?-dh:0,dw,dh);dw=canvas.width;dh=canvas.height; // Apply overlay
	   overlay&&api.each([].concat(overlay),function(over){queue.inc(); // preload
	   var img=new window.Image(),fn=function fn(){var x=over.x|0,y=over.y|0,w=over.w||img.width,h=over.h||img.height,rel=over.rel; // center  |  right  |  left
	   x=rel==1||rel==4||rel==7?(dw-w+x)/2:rel==2||rel==5||rel==8?dw-(w+x):x; // center  |  bottom  |  top
	   y=rel==3||rel==4||rel==5?(dh-h+y)/2:rel>=6?dh-(h+y):y;api.event.off(img,'error load abort',fn);try{ctx.globalAlpha=over.opacity||1;ctx.drawImage(img,x,y,w,h);}catch(er){}queue.next();};api.event.on(img,'error load abort',fn);img.src=over.src;if(img.complete){fn();}});if(filter){queue.inc();Image.applyFilter(canvas,filter,queue.next);}queue.check();},getMatrix:function getMatrix(image){var m=api.extend({},this.matrix),sw=m.sw=m.sw||image.videoWidth||image.naturalWidth||image.width,sh=m.sh=m.sh||image.videoHeight||image.naturalHeight||image.height,dw=m.dw=m.dw||sw,dh=m.dh=m.dh||sh,sf=sw/sh,df=dw/dh,type=m.resize;if(type=='preview'){if(dw!=sw||dh!=sh){ // Make preview
	   var w,h;if(df>=sf){w=sw;h=w/df;}else {h=sh;w=h*df;}if(w!=sw||h!=sh){m.sx=~ ~((sw-w)/2);m.sy=~ ~((sh-h)/2);sw=w;sh=h;}}}else if(type){if(!(sw>dw||sh>dh)){dw=sw;dh=sh;}else if(type=='min'){dw=round(sf<df?min(sw,dw):dh*sf);dh=round(sf<df?dw/sf:min(sh,dh));}else {dw=round(sf>=df?min(sw,dw):dh*sf);dh=round(sf>=df?dw/sf:min(sh,dh));}}m.sw=sw;m.sh=sh;m.dw=dw;m.dh=dh;return m;},_trans:function _trans(fn){this._load(this.file,function(err,image){if(err){fn(err);}else {this._apply(image,fn);}});},get:function get(fn){if(api.support.transform){var _this=this,matrix=_this.matrix;if(matrix.deg=='auto'){api.getInfo(_this.file,function(err,info){ // rotate by exif orientation
	   matrix.deg=exifOrientation[info&&info.exif&&info.exif.Orientation]||0;_this._trans(fn);});}else {_this._trans(fn);}}else {fn('not_support_transform');}},toData:function toData(fn){this.get(fn);}};Image.exifOrientation=exifOrientation;Image.transform=function(file,transform,autoOrientation,fn){function _transform(err,img){ // img -- info object
	   var images={},queue=api.queue(function(err){fn(err,images);});if(!err){api.each(transform,function(params,name){if(!queue.isFail()){var ImgTrans=new Image(img.nodeType?img:file);if(typeof params=='function'){params(img,ImgTrans);}else if(params.width){ImgTrans[params.preview?'preview':'resize'](params.width,params.height,params.type);}else {if(params.maxWidth&&(img.width>params.maxWidth||img.height>params.maxHeight)){ImgTrans.resize(params.maxWidth,params.maxHeight,'max');}}if(params.crop){var crop=params.crop;ImgTrans.crop(crop.x|0,crop.y|0,crop.w||crop.width,crop.h||crop.height);}if(params.rotate===undef&&autoOrientation){params.rotate='auto';}ImgTrans.set({deg:params.rotate,type:params.type||file.type||'image/png',quality:params.quality||1,overlay:params.overlay,filter:params.filter});queue.inc();ImgTrans.toData(function(err,image){if(err){queue.fail();}else {images[name]=image;queue.next();}});}});}else {queue.fail();}} // @todo: Оло-ло, нужно рефакторить это место
	   if(file.width){_transform(false,file);}else {api.getInfo(file,_transform);}}; // @const
	   api.each(['TOP','CENTER','BOTTOM'],function(x,i){api.each(['LEFT','CENTER','RIGHT'],function(y,j){Image[x+'_'+y]=i*3+j;Image[y+'_'+x]=i*3+j;});}); /**
	      * Trabsform element to canvas
	      *
	      * @param    {Image|HTMLVideoElement}   el
	      * @returns  {Canvas}
	      */Image.toCanvas=function(el){var canvas=document.createElement('canvas');canvas.width=el.videoWidth||el.width;canvas.height=el.videoHeight||el.height;canvas.getContext('2d').drawImage(el,0,0);return canvas;}; /**
	      * Create image from DataURL
	      * @param  {String}  dataURL
	      * @param  {Object}  size
	      * @param  {Function}  callback
	      */Image.fromDataURL=function(dataURL,size,callback){var img=api.newImage(dataURL);api.extend(img,size);callback(img);}; /**
	      * Apply filter (caman.js)
	      *
	      * @param  {Canvas|Image}   canvas
	      * @param  {String|Function}  filter
	      * @param  {Function}  doneFn
	      */Image.applyFilter=function(canvas,filter,doneFn){if(typeof filter=='function'){filter(canvas,doneFn);}else if(window.Caman){ // http://camanjs.com/guides/
	   window.Caman(canvas.tagName=='IMG'?Image.toCanvas(canvas):canvas,function(){if(typeof filter=='string'){this[filter]();}else {api.each(filter,function(val,method){this[method](val);},this);}this.render(doneFn);});}}; /**
	      * For load-image-ios.js
	      */api.renderImageToCanvas=function(canvas,img,sx,sy,sw,sh,dx,dy,dw,dh){canvas.getContext('2d').drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);return canvas;}; // @export
	   api.support.canvas=api.support.transform=support;api.Image=Image;})(FileAPI,document); /*global window, FileAPI */(function(api,window){"use strict";var document=window.document,FormData=window.FormData,Form=function Form(){this.items=[];},encodeURIComponent=window.encodeURIComponent;Form.prototype={append:function append(name,blob,file,type){this.items.push({name:name,blob:blob&&blob.blob||(blob==void 0?'':blob),file:blob&&(file||blob.name),type:blob&&(type||blob.type)});},each:function each(fn){var i=0,n=this.items.length;for(;i<n;i++){fn.call(this,this.items[i]);}},toData:function toData(fn,options){ // allow chunked transfer if we have only one file to send
	   // flag is used below and in XHR._send
	   options._chunked=api.support.chunked&&options.chunkSize>0&&api.filter(this.items,function(item){return item.file;}).length==1;if(!api.support.html5){api.log('FileAPI.Form.toHtmlData');this.toHtmlData(fn);}else if(!api.formData||this.multipart||!FormData){api.log('FileAPI.Form.toMultipartData');this.toMultipartData(fn);}else if(options._chunked){api.log('FileAPI.Form.toPlainData');this.toPlainData(fn);}else {api.log('FileAPI.Form.toFormData');this.toFormData(fn);}},_to:function _to(data,complete,next,arg){var queue=api.queue(function(){complete(data);});this.each(function(file){next(file,data,queue,arg);});queue.check();},toHtmlData:function toHtmlData(fn){this._to(document.createDocumentFragment(),fn,function(file,data /**DocumentFragment*/){var blob=file.blob,hidden;if(file.file){api.reset(blob,true); // set new name
	   blob.name=file.name;data.appendChild(blob);}else {hidden=document.createElement('input');hidden.name=file.name;hidden.type='hidden';hidden.value=blob;data.appendChild(hidden);}});},toPlainData:function toPlainData(fn){this._to({},fn,function(file,data,queue){if(file.file){data.type=file.file;}if(file.blob.toBlob){ // canvas
	   queue.inc();_convertFile(file,function(file,blob){data.name=file.name;data.file=blob;data.size=blob.length;data.type=file.type;queue.next();});}else if(file.file){ // file
	   data.name=file.blob.name;data.file=file.blob;data.size=file.blob.size;data.type=file.type;}else { // additional data
	   if(!data.params){data.params=[];}data.params.push(encodeURIComponent(file.name)+"="+encodeURIComponent(file.blob));}data.start=-1;data.end=data.file&&data.file.FileAPIReadPosition||-1;data.retry=0;});},toFormData:function toFormData(fn){this._to(new FormData(),fn,function(file,data,queue){if(file.blob&&file.blob.toBlob){queue.inc();_convertFile(file,function(file,blob){data.append(file.name,blob,file.file);queue.next();});}else if(file.file){data.append(file.name,file.blob,file.file);}else {data.append(file.name,file.blob);}if(file.file){data.append('_'+file.name,file.file);}});},toMultipartData:function toMultipartData(fn){this._to([],fn,function(file,data,queue,boundary){queue.inc();_convertFile(file,function(file,blob){data.push('--_'+boundary+('\r\nContent-Disposition: form-data; name="'+file.name+'"'+(file.file?'; filename="'+encodeURIComponent(file.file)+'"':'')+(file.file?'\r\nContent-Type: '+(file.type||'application/octet-stream'):'')+'\r\n'+'\r\n'+(file.file?blob:encodeURIComponent(blob))+'\r\n'));queue.next();},true);},api.expando);}};function _convertFile(file,fn,useBinaryString){var blob=file.blob,filename=file.file;if(filename){if(!blob.toDataURL){ // The Blob is not an image.
	   api.readAsBinaryString(blob,function(evt){if(evt.type=='load'){fn(file,evt.result);}});return;}var mime={'image/jpeg':'.jpe?g','image/png':'.png'},type=mime[file.type]?file.type:'image/png',ext=mime[type]||'.png',quality=blob.quality||1;if(!filename.match(new RegExp(ext+'$','i'))){ // Does not change the current extension, but add a new one.
	   filename+=ext.replace('?','');}file.file=filename;file.type=type;if(!useBinaryString&&blob.toBlob){blob.toBlob(function(blob){fn(file,blob);},type,quality);}else {fn(file,api.toBinaryString(blob.toDataURL(type,quality)));}}else {fn(file,blob);}} // @export
	   api.Form=Form;})(FileAPI,window); /*global window, FileAPI, Uint8Array */(function(window,api){"use strict";var noop=function noop(){},document=window.document,XHR=function XHR(options){this.uid=api.uid();this.xhr={abort:noop,getResponseHeader:noop,getAllResponseHeaders:noop};this.options=options;},_xhrResponsePostfix={'':1,XML:1,Text:1,Body:1};XHR.prototype={status:0,statusText:'',constructor:XHR,getResponseHeader:function getResponseHeader(name){return this.xhr.getResponseHeader(name);},getAllResponseHeaders:function getAllResponseHeaders(){return this.xhr.getAllResponseHeaders()||{};},end:function end(status,statusText){var _this=this,options=_this.options;_this.end=_this.abort=noop;_this.status=status;if(statusText){_this.statusText=statusText;}api.log('xhr.end:',status,statusText);options.complete(status==200||status==201?false:_this.statusText||'unknown',_this);if(_this.xhr&&_this.xhr.node){setTimeout(function(){var node=_this.xhr.node;try{node.parentNode.removeChild(node);}catch(e){}try{delete window[_this.uid];}catch(e){}window[_this.uid]=_this.xhr.node=null;},9);}},abort:function abort(){this.end(0,'abort');if(this.xhr){this.xhr.aborted=true;this.xhr.abort();}},send:function send(FormData){var _this=this,options=this.options;FormData.toData(function(data){ // Start uploading
	   options.upload(options,_this);_this._send.call(_this,options,data);},options);},_send:function _send(options,data){var _this=this,xhr,uid=_this.uid,url=options.url;api.log('XHR._send:',data);if(!options.cache){ // No cache
	   url+=(~url.indexOf('?')?'&':'?')+api.uid();}if(data.nodeName){ // legacy
	   options.upload(options,_this);xhr=document.createElement('div');xhr.innerHTML='<form target="'+uid+'" action="'+url+'" method="POST" enctype="multipart/form-data" style="position: absolute; top: -1000px; overflow: hidden; width: 1px; height: 1px;">'+'<iframe name="'+uid+'" src="javascript:false;"></iframe>'+'<input value="'+uid+'" name="callback" type="hidden"/>'+'</form>';_this.xhr.abort=function(){var transport=xhr.getElementsByTagName('iframe')[0];if(transport){try{if(transport.stop){transport.stop();}else if(transport.contentWindow.stop){transport.contentWindow.stop();}else {transport.contentWindow.document.execCommand('Stop');}}catch(er){}}xhr=null;}; // append form-data
	   var form=xhr.getElementsByTagName('form')[0];form.appendChild(data);api.log(form.parentNode.innerHTML); // append to DOM
	   document.body.appendChild(xhr); // keep a reference to node-transport
	   _this.xhr.node=xhr; // jsonp-callack
	   window[uid]=function(status,statusText,response){_this.readyState=4;_this.responseText=response;_this.end(status,statusText);xhr=null;}; // send
	   _this.readyState=2; // loaded
	   form.submit();form=null;}else { // html5
	   if(this.xhr&&this.xhr.aborted){api.log("Error: already aborted");return;}xhr=_this.xhr=api.getXHR();if(data.params){url+=(url.indexOf('?')<0?"?":"&")+data.params.join("&");}xhr.open('POST',url,true);if(api.withCredentials){xhr.withCredentials="true";}if(!options.headers||!options.headers['X-Requested-With']){xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');}api.each(options.headers,function(val,key){xhr.setRequestHeader(key,val);});if(options._chunked){ // chunked upload
	   if(xhr.upload){xhr.upload.addEventListener('progress',function( /**Event*/evt){if(!data.retry){ // show progress only for correct chunk uploads
	   options.progress({type:evt.type,total:data.size,loaded:data.start+evt.loaded,totalSize:data.size},_this,options);}},false);}xhr.onreadystatechange=function(){var lkb=parseInt(xhr.getResponseHeader('X-Last-Known-Byte'),10);_this.status=xhr.status;_this.statusText=xhr.statusText;_this.readyState=xhr.readyState;if(xhr.readyState==4){for(var k in _xhrResponsePostfix){_this['response'+k]=xhr['response'+k];}xhr.onreadystatechange=null;if(!xhr.status||xhr.status-201>0){api.log("Error: "+xhr.status); // some kind of error
	   // 0 - connection fail or timeout, if xhr.aborted is true, then it's not recoverable user action
	   // up - server error
	   if((!xhr.status&&!xhr.aborted||500==xhr.status||416==xhr.status)&&++data.retry<=options.chunkUploadRetry){ // let's try again the same chunk
	   // only applicable for recoverable error codes 500 && 416
	   var delay=xhr.status?0:api.chunkNetworkDownRetryTimeout; // inform about recoverable problems
	   options.pause(data.file,options); // smart restart if server reports about the last known byte
	   api.log("X-Last-Known-Byte: "+lkb);if(lkb){data.end=lkb;}else {data.end=data.start-1;}setTimeout(function(){_this._send(options,data);},delay);}else { // no mo retries
	   _this.end(xhr.status);}}else { // success
	   data.retry=0;if(data.end==data.size-1){ // finished
	   _this.end(xhr.status);}else { // next chunk
	   // shift position if server reports about the last known byte
	   api.log("X-Last-Known-Byte: "+lkb);if(lkb){data.end=lkb;}data.file.FileAPIReadPosition=data.end;setTimeout(function(){_this._send(options,data);},0);}}xhr=null;}};data.start=data.end+1;data.end=Math.max(Math.min(data.start+options.chunkSize,data.size)-1,data.start);var slice;(slice='slice') in data.file||(slice='mozSlice') in data.file||(slice='webkitSlice') in data.file;xhr.setRequestHeader("Content-Range","bytes "+data.start+"-"+data.end+"/"+data.size);xhr.setRequestHeader("Content-Disposition",'attachment; filename='+encodeURIComponent(data.name));xhr.setRequestHeader("Content-Type",data.type||"application/octet-stream");slice=data.file[slice](data.start,data.end+1);xhr.send(slice);slice=null;}else { // single piece upload
	   if(xhr.upload){ // https://github.com/blueimp/jQuery-File-Upload/wiki/Fixing-Safari-hanging-on-very-high-speed-connections-%281Gbps%29
	   xhr.upload.addEventListener('progress',api.throttle(function( /**Event*/evt){options.progress(evt,_this,options);},100),false);}xhr.onreadystatechange=function(){_this.status=xhr.status;_this.statusText=xhr.statusText;_this.readyState=xhr.readyState;if(xhr.readyState==4){for(var k in _xhrResponsePostfix){_this['response'+k]=xhr['response'+k];}xhr.onreadystatechange=null;_this.end(xhr.status);xhr=null;}};if(api.isArray(data)){ // multipart
	   xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=_'+api.expando);data=data.join('')+'--_'+api.expando+'--'; /** @namespace  xhr.sendAsBinary  https://developer.mozilla.org/ru/XMLHttpRequest#Sending_binary_content */if(xhr.sendAsBinary){xhr.sendAsBinary(data);}else {var bytes=Array.prototype.map.call(data,function(c){return c.charCodeAt(0)&0xff;});xhr.send(new Uint8Array(bytes).buffer);}}else { // FormData 
	   xhr.send(data);}}}}}; // @export
	   api.XHR=XHR;})(window,FileAPI); /**
	    * @class FileAPI.Camera
	    * @author  RubaXa  <trash@rubaxa.org>
	    * @support Chrome 21+, FF 18+, Opera 12+
	    */ /*global window, FileAPI, jQuery */ /** @namespace LocalMediaStream -- https://developer.mozilla.org/en-US/docs/WebRTC/MediaStream_API#LocalMediaStream */(function(window,api){"use strict";var URL=window.URL||window.webkitURL,document=window.document,navigator=window.navigator,getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,html5=!!getMedia; // Support "media"
	   api.support.media=html5;var Camera=function Camera(video){this.video=video;};Camera.prototype={isActive:function isActive(){return !!this._active;}, /**
	        * Start camera streaming
	        * @param {Function}  callback
	        */start:function start(callback){var _this=this,video=_this.video,_successId,_failId,_complete=function _complete(err){_this._active=!err;clearTimeout(_failId);clearTimeout(_successId); //          api.event.off(video, 'loadedmetadata', _complete);
	   callback&&callback(err,_this);};getMedia.call(navigator,{video:true},function(stream /**LocalMediaStream*/){ // Success
	   _this.stream=stream; //        api.event.on(video, 'loadedmetadata', function (){
	   //          _complete(null);
	   //        });
	   // Set camera stream
	   video.src=URL.createObjectURL(stream); // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
	   // See crbug.com/110938.
	   _successId=setInterval(function(){if(_detectVideoSignal(video)){_complete(null);}},1000);_failId=setTimeout(function(){_complete('timeout');},5000); // Go-go-go!
	   video.play();},_complete /*error*/);}, /**
	        * Stop camera streaming
	        */stop:function stop(){try{this._active=false;this.video.pause();this.stream.stop();}catch(err){}}, /**
	        * Create screenshot
	        * @return {FileAPI.Camera.Shot}
	        */shot:function shot(){return new Shot(this.video);}}; /**
	      * Get camera element from container
	      *
	      * @static
	      * @param {HTMLElement} el
	      * @return  {Camera}
	      */Camera.get=function(el){return new Camera(el.firstChild);}; /**
	      * Publish camera element into container
	      *
	      * @static
	      * @param {HTMLElement} el
	      * @param {Object}    options
	      * @param {Function}    [callback]
	      */Camera.publish=function(el,options,callback){if(typeof options=='function'){callback=options;options={};} // Dimensions of "camera"
	   options=api.extend({},{width:'100%',height:'100%',start:true},options);if(el.jquery){ // Extract first element, from jQuery collection
	   el=el[0];}var doneFn=function doneFn(err){if(err){callback(err);}else { // Get camera
	   var cam=Camera.get(el);if(options.start){cam.start(callback);}else {callback(null,cam);}}};el.style.width=_px(options.width);el.style.height=_px(options.height);if(api.html5&&html5){ // Create video element
	   var video=document.createElement('video'); // Set dimensions
	   video.style.width=_px(options.width);video.style.height=_px(options.height); // Clean container
	   if(window.jQuery){jQuery(el).empty();}else {el.innerHTML='';} // Add "camera" to container
	   el.appendChild(video); // end
	   doneFn();}else {Camera.fallback(el,options,doneFn);}};Camera.fallback=function(el,options,callback){callback('not_support_camera');}; /**
	      * @class FileAPI.Camera.Shot
	      */var Shot=function Shot(video){var canvas=video.nodeName?api.Image.toCanvas(video):video;var shot=api.Image(canvas);shot.type='image/png';shot.width=canvas.width;shot.height=canvas.height;shot.size=canvas.width*canvas.height*4;return shot;}; /**
	      * Add "px" postfix, if value is a number
	      *
	      * @private
	      * @param {*}  val
	      * @return  {String}
	      */function _px(val){return val>=0?val+'px':val;} /**
	      * @private
	      * @param {HTMLVideoElement} video
	      * @return  {Boolean}
	      */function _detectVideoSignal(video){var canvas=document.createElement('canvas'),ctx,res=false;try{ctx=canvas.getContext('2d');ctx.drawImage(video,0,0,1,1);res=ctx.getImageData(0,0,1,1).data[4]!=255;}catch(e){}return res;} // @export
	   Camera.Shot=Shot;api.Camera=Camera;})(window,FileAPI); /**
	    * FileAPI fallback to Flash
	    *
	    * @flash-developer  "Vladimir Demidov" <v.demidov@corp.mail.ru>
	    */ /*global window, ActiveXObject, FileAPI */(function(window,jQuery,api){"use strict";var document=window.document,location=window.location,navigator=window.navigator,_each=api.each,_cameraQueue=[];api.support.flash=function(){var mime=navigator.mimeTypes,has=false;if(navigator.plugins&&babelHelpers.typeof(navigator.plugins['Shockwave Flash'])=='object'){has=navigator.plugins['Shockwave Flash'].description&&!(mime&&mime['application/x-shockwave-flash']&&!mime['application/x-shockwave-flash'].enabledPlugin);}else {try{has=!!(window.ActiveXObject&&new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));}catch(er){api.log('Flash -- does not supported.');}}if(has&&/^file:/i.test(location)){api.log('[warn] Flash does not work on `file:` protocol.');}return has;}();api.support.flash&&(0||!api.html5||!api.support.html5||api.cors&&!api.support.cors||api.media&&!api.support.media)&&function(){var _attr=api.uid(),_retry=0,_files={},_rhttp=/^https?:/i,flash={_fn:{}, /**
	            * Initialization & preload flash object
	            */init:function init(){var child=document.body&&document.body.firstChild;if(child){do {if(child.nodeType==1){api.log('FlashAPI.state: awaiting');var dummy=document.createElement('div');dummy.id='_'+_attr;_css(dummy,{top:1,right:1,width:5,height:5,position:'absolute',zIndex:1e6+'' // set max zIndex
	   });child.parentNode.insertBefore(dummy,child);flash.publish(dummy,_attr);return;}}while(child=child.nextSibling);}if(_retry<10){setTimeout(flash.init,++_retry*50);}}, /**
	            * Publish flash-object
	            *
	            * @param {HTMLElement} el
	            * @param {String} id
	            * @param {Object} [opts]
	            */publish:function publish(el,id,opts){opts=opts||{};el.innerHTML=_makeFlashHTML({id:id,src:_getUrl(api.flashUrl,'r='+api.version) //            , src: _getUrl('http://v.demidov.boom.corp.mail.ru/uploaderfileapi/FlashFileAPI.swf?1')
	   ,wmode:opts.camera?'':'transparent',flashvars:'callback='+(opts.onEvent||'FileAPI.Flash.onEvent')+'&flashId='+id+'&storeKey='+navigator.userAgent.match(/\d/ig).join('')+'_'+api.version+(flash.isReady||(api.pingUrl?'&ping='+api.pingUrl:''))+'&timeout='+api.flashAbortTimeout+(opts.camera?'&useCamera='+_getUrl(api.flashWebcamUrl):'') //              + '&debug=1'
	   },opts);},ready:function ready(){api.log('FlashAPI.state: ready');flash.ready=api.F;flash.isReady=true;flash.patch();api.event.on(document,'mouseover',flash.mouseover);api.event.on(document,'click',function(evt){if(flash.mouseover(evt)){evt.preventDefault?evt.preventDefault():evt.returnValue=true;}});},getEl:function getEl(){return document.getElementById('_'+_attr);},getWrapper:function getWrapper(node){do {if(/js-fileapi-wrapper/.test(node.className)){return node;}}while((node=node.parentNode)&&node!==document.body);},mouseover:function mouseover(evt){var target=api.event.fix(evt).target;if(/input/i.test(target.nodeName)&&target.type=='file'){var state=target.getAttribute(_attr),wrapper=flash.getWrapper(target);if(api.multiFlash){ // check state:
	   //   i — published
	   //   i — initialization
	   //   r — ready
	   if(state=='i'||state=='r'){ // publish fail
	   return false;}else if(state!='p'){ // set "init" state
	   target.setAttribute(_attr,'i');var dummy=document.createElement('div');if(!wrapper){api.log('[err] FlashAPI.mouseover: js-fileapi-wrapper not found');return;}_css(dummy,{top:0,left:0,width:target.offsetWidth+100,height:target.offsetHeight+100,zIndex:1e6+'' // set max zIndex
	   ,position:'absolute'});wrapper.appendChild(dummy);flash.publish(dummy,api.uid()); // set "publish" state
	   target.setAttribute(_attr,'p');}return true;}else if(wrapper){ // Use one flash element
	   var box=_getDimensions(wrapper);_css(flash.getEl(),box); // Set current input
	   flash.curInp=target;}}else if(!/object|embed/i.test(target.nodeName)){_css(flash.getEl(),{top:1,left:1,width:5,height:5});}},onEvent:function onEvent(evt){var type=evt.type;if(type=='ready'){try{ // set "ready" state
	   flash.getInput(evt.flashId).setAttribute(_attr,'r');}catch(e){}flash.ready();setTimeout(function(){flash.mouseenter(evt);},50);return true;}else if(type==='ping'){api.log('(flash -> js).ping:',[evt.status,evt.savedStatus],evt.error);}else if(type==='log'){api.log('(flash -> js).log:',evt.target);}else if(type in flash){setTimeout(function(){api.log('FlashAPI.event.'+evt.type+':',evt);flash[type](evt);},1);}},mouseenter:function mouseenter(evt){var node=flash.getInput(evt.flashId);if(node){ // Set multiple mode
	   flash.cmd(evt,'multiple',node.getAttribute('multiple')!=null); // Set files filter
	   var accept=[],exts={};_each((node.getAttribute('accept')||'').split(/,\s*/),function(mime){api.accept[mime]&&_each(api.accept[mime].split(' '),function(ext){exts[ext]=1;});});_each(exts,function(i,ext){accept.push(ext);});flash.cmd(evt,'accept',accept.length?accept.join(',')+','+accept.join(',').toUpperCase():'*');}},get:function get(id){return document[id]||window[id]||document.embeds[id];},getInput:function getInput(id){if(api.multiFlash){try{var node=flash.getWrapper(flash.get(id));if(node){return node.getElementsByTagName('input')[0];}}catch(e){api.log('[err] Can not find "input" by flashId:',id,e);}}else {return flash.curInp;}},select:function select(evt){var inp=flash.getInput(evt.flashId),uid=api.uid(inp),files=evt.target.files,event;_each(files,function(file){api.checkFileObj(file);});_files[uid]=files;if(document.createEvent){event=document.createEvent('Event');event.files=files;event.initEvent('change',true,true);inp.dispatchEvent(event);}else if(jQuery){jQuery(inp).trigger({type:'change',files:files});}else {event=document.createEventObject();event.files=files;inp.fireEvent('onchange',event);}},cmd:function cmd(id,name,data,last){try{api.log('(js -> flash).'+name+':',data);return flash.get(id.flashId||id).cmd(name,data);}catch(e){api.log('(js -> flash).onError:',e);if(!last){ // try again
	   setTimeout(function(){flash.cmd(id,name,data,true);},50);}}},patch:function patch(){api.flashEngine=api.support.transform=true; // FileAPI
	   _inherit(api,{getFiles:function getFiles(input,filter,callback){if(callback){api.filterFiles(api.getFiles(input),filter,callback);return null;}var files=api.isArray(input)?input:_files[api.uid(input.target||input.srcElement||input)];if(!files){ // Файлов нету, вызываем родительский метод
	   return this.parent.apply(this,arguments);}if(filter){filter=api.getFilesFilter(filter);files=api.filter(files,function(file){return filter.test(file.name);});}return files;},getInfo:function getInfo(file,fn){if(_isHtmlFile(file)){this.parent.apply(this,arguments);}else if(file.isShot){fn(null,file.info={width:file.width,height:file.height});}else {if(!file.__info){var defer=file.__info=api.defer();flash.cmd(file,'getFileInfo',{id:file.id,callback:_wrap(function _(err,info){_unwrap(_);defer.resolve(err,file.info=info);})});}file.__info.then(fn);}}}); // FileAPI.Image
	   api.support.transform=true;api.Image&&_inherit(api.Image.prototype,{get:function get(fn,scaleMode){this.set({scaleMode:scaleMode||'noScale'}); // noScale, exactFit
	   this.parent(fn);},_load:function _load(file,fn){api.log('FlashAPI.Image._load:',file);if(_isHtmlFile(file)){this.parent.apply(this,arguments);}else {var _this=this;api.getInfo(file,function(err){fn.call(_this,err,file);});}},_apply:function _apply(file,fn){api.log('FlashAPI.Image._apply:',file);if(_isHtmlFile(file)){this.parent.apply(this,arguments);}else {var m=this.getMatrix(file.info),doneFn=fn;flash.cmd(file,'imageTransform',{id:file.id,matrix:m,callback:_wrap(function _(err,base64){api.log('FlashAPI.Image._apply.callback:',err);_unwrap(_);if(err){doneFn(err);}else if(!api.support.html5&&(!api.support.dataURI||base64.length>3e4)){_makeFlashImage({width:m.deg%180?m.dh:m.dw,height:m.deg%180?m.dw:m.dh,scale:m.scaleMode},base64,doneFn);}else {if(m.filter){doneFn=function doneFn(err,img){if(err){fn(err);}else {api.Image.applyFilter(img,m.filter,function(){fn(err,this.canvas);});}};}api.newImage('data:'+file.type+';base64,'+base64,doneFn);}})});}},toData:function toData(fn){var file=this.file,info=file.info,matrix=this.getMatrix(info);if(_isHtmlFile(file)){this.parent.apply(this,arguments);}else {if(matrix.deg=='auto'){matrix.deg=api.Image.exifOrientation[info&&info.exif&&info.exif.Orientation]||0;}fn.call(this,!file.info,{id:file.id,flashId:file.flashId,name:file.name,type:file.type,matrix:matrix});}}});api.Image&&_inherit(api.Image,{fromDataURL:function fromDataURL(dataURL,size,callback){if(!api.support.dataURI||dataURL.length>3e4){_makeFlashImage(api.extend({scale:'exactFit'},size),dataURL.replace(/^data:[^,]+,/,''),function(err,el){callback(el);});}else {this.parent(dataURL,size,callback);}}}); // FileAPI.Camera:statics
	   api.Camera.fallback=function(el,options,callback){var camId=api.uid();api.log('FlashAPI.Camera.publish: '+camId);flash.publish(el,camId,api.extend(options,{camera:true,onEvent:_wrap(function _(evt){if(evt.type=='camera'){_unwrap(_);if(evt.error){api.log('FlashAPI.Camera.publish.error: '+evt.error);callback(evt.error);}else {api.log('FlashAPI.Camera.publish.success: '+camId);callback(null);}}})}));}; // Run
	   _each(_cameraQueue,function(args){api.Camera.fallback.apply(api.Camera,args);});_cameraQueue=[]; // FileAPI.Camera:proto
	   _inherit(api.Camera.prototype,{_id:function _id(){return this.video.id;},start:function start(callback){var _this=this;flash.cmd(this._id(),'camera.on',{callback:_wrap(function _(evt){_unwrap(_);if(evt.error){api.log('FlashAPI.camera.on.error: '+evt.error);callback(evt.error,_this);}else {api.log('FlashAPI.camera.on.success: '+_this._id());_this._active=true;callback(null,_this);}})});},stop:function stop(){this._active=false;flash.cmd(this._id(),'camera.off');},shot:function shot(){api.log('FlashAPI.Camera.shot:',this._id());var shot=flash.cmd(this._id(),'shot',{});shot.type='image/png';shot.flashId=this._id();shot.isShot=true;return new api.Camera.Shot(shot);}}); // FileAPI.Form
	   _inherit(api.Form.prototype,{toData:function toData(fn){var items=this.items,i=items.length;for(;i--;){if(items[i].file&&_isHtmlFile(items[i].blob)){return this.parent.apply(this,arguments);}}api.log('FlashAPI.Form.toData');fn(items);}}); // FileAPI.XHR
	   _inherit(api.XHR.prototype,{_send:function _send(options,formData){if(formData.nodeName||formData.append&&api.support.html5||api.isArray(formData)&&typeof formData[0]==='string'){ // HTML5, Multipart or IFrame
	   return this.parent.apply(this,arguments);}var data={},files={},_this=this,flashId,fileId;_each(formData,function(item){if(item.file){files[item.name]=item=_getFileDescr(item.blob);fileId=item.id;flashId=item.flashId;}else {data[item.name]=item.blob;}});if(!fileId){flashId=_attr;}if(!flashId){api.log('[err] FlashAPI._send: flashId -- undefined');return this.parent.apply(this,arguments);}else {api.log('FlashAPI.XHR._send: '+flashId+' -> '+fileId,files);}_this.xhr={headers:{},abort:function abort(){flash.cmd(flashId,'abort',{id:fileId});},getResponseHeader:function getResponseHeader(name){return this.headers[name];},getAllResponseHeaders:function getAllResponseHeaders(){return this.headers;}};var queue=api.queue(function(){flash.cmd(flashId,'upload',{url:_getUrl(options.url),data:data,files:fileId?files:null,headers:options.headers||{},callback:_wrap(function upload(evt){var type=evt.type,result=evt.result;api.log('FlashAPI.upload.'+type+':',evt);if(type=='progress'){evt.loaded=Math.min(evt.loaded,evt.total); // @todo fixme
	   evt.lengthComputable=true;options.progress(evt);}else if(type=='complete'){_unwrap(upload);if(typeof result=='string'){_this.responseText=result.replace(/%22/g,"\"").replace(/%5c/g,"\\").replace(/%26/g,"&").replace(/%25/g,"%");}_this.end(evt.status||200);}else if(type=='abort'||type=='error'){_this.end(evt.status||0,evt.message);_unwrap(upload);}})});}); // #2174: FileReference.load() call while FileReference.upload() or vice versa
	   _each(files,function(file){queue.inc();api.getInfo(file,queue.next);});queue.check();}});}};function _makeFlashHTML(opts){return ('<object id="#id#" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+(opts.width||'100%')+'" height="'+(opts.height||'100%')+'">'+'<param name="movie" value="#src#" />'+'<param name="flashvars" value="#flashvars#" />'+'<param name="swliveconnect" value="true" />'+'<param name="allowscriptaccess" value="always" />'+'<param name="allownetworking" value="all" />'+'<param name="menu" value="false" />'+'<param name="wmode" value="#wmode#" />'+'<embed flashvars="#flashvars#" swliveconnect="true" allownetworking="all" allowscriptaccess="always" name="#id#" src="#src#" width="'+(opts.width||'100%')+'" height="'+(opts.height||'100%')+'" menu="false" wmode="transparent" type="application/x-shockwave-flash"></embed>'+'</object>').replace(/#(\w+)#/ig,function(a,name){return opts[name];});}function _css(el,css){if(el&&el.style){var key,val;for(key in css){val=css[key];if(typeof val=='number'){val+='px';}try{el.style[key]=val;}catch(e){}}}}function _inherit(obj,methods){_each(methods,function(fn,name){var prev=obj[name];obj[name]=function(){this.parent=prev;return fn.apply(this,arguments);};});}function _isHtmlFile(file){return file&&!file.flashId;}function _wrap(fn){var id=fn.wid=api.uid();flash._fn[id]=fn;return 'FileAPI.Flash._fn.'+id;}function _unwrap(fn){try{flash._fn[fn.wid]=null;delete flash._fn[fn.wid];}catch(e){}}function _getUrl(url,params){if(!_rhttp.test(url)){if(/^\.\//.test(url)||'/'!=url.charAt(0)){var path=location.pathname;path=path.substr(0,path.lastIndexOf('/'));url=(path+'/'+url).replace('/./','/');}if('//'!=url.substr(0,2)){url='//'+location.host+url;}if(!_rhttp.test(url)){url=location.protocol+url;}}if(params){url+=(/\?/.test(url)?'&':'?')+params;}return url;}function _makeFlashImage(opts,base64,fn){var key,flashId=api.uid(),el=document.createElement('div'),attempts=10;for(key in opts){el.setAttribute(key,opts[key]);el[key]=opts[key];}_css(el,opts);opts.width='100%';opts.height='100%';el.innerHTML=_makeFlashHTML(api.extend({id:flashId,src:_getUrl(api.flashImageUrl,'r='+api.uid()),wmode:'opaque',flashvars:'scale='+opts.scale+'&callback='+_wrap(function _(){_unwrap(_);if(--attempts>0){_setImage();}return true;})},opts));function _setImage(){try{ // Get flash-object by id
	   var img=flash.get(flashId);img.setImage(base64);}catch(e){api.log('[err] FlashAPI.Preview.setImage -- can not set "base64":',e);}}fn(false,el);el=null;}function _getFileDescr(file){return {id:file.id,name:file.name,matrix:file.matrix,flashId:file.flashId};}function _getDimensions(el){var box=el.getBoundingClientRect(),body=document.body,docEl=(el&&el.ownerDocument).documentElement;return {top:box.top+(window.pageYOffset||docEl.scrollTop)-(docEl.clientTop||body.clientTop||0),left:box.left+(window.pageXOffset||docEl.scrollLeft)-(docEl.clientLeft||body.clientLeft||0),width:box.right-box.left,height:box.bottom-box.top};}api.Camera.fallback=function(){_cameraQueue.push(arguments);}; // @export
	   api.Flash=flash; // Check dataURI support
	   api.newImage('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',function(err,img){api.support.dataURI=!(img.width!=1||img.height!=1);flash.init();});}();})(window,window.jQuery,FileAPI); /*
	    * JavaScript Load Image iOS scaling fixes 1.0.3
	    * https://github.com/blueimp/JavaScript-Load-Image
	    *
	    * Copyright 2013, Sebastian Tschan
	    * https://blueimp.net
	    *
	    * iOS image scaling fixes based on
	    * https://github.com/stomita/ios-imagefile-megapixel
	    *
	    * Licensed under the MIT license:
	    * http://www.opensource.org/licenses/MIT
	    */ /*jslint nomen: true, bitwise: true */ /*global FileAPI, window, document */(function(factory){'use strict';factory(FileAPI);})(function(loadImage){'use strict'; // Only apply fixes on the iOS platform:
	   if(!window.navigator||!window.navigator.platform||!/iP(hone|od|ad)/.test(window.navigator.platform)){return;}var originalRenderMethod=loadImage.renderImageToCanvas; // Detects subsampling in JPEG images:
	   loadImage.detectSubsampling=function(img){var canvas,context;if(img.width*img.height>1024*1024){ // only consider mexapixel images
	   canvas=document.createElement('canvas');canvas.width=canvas.height=1;context=canvas.getContext('2d');context.drawImage(img,-img.width+1,0); // subsampled image becomes half smaller in rendering size.
	   // check alpha channel value to confirm image is covering edge pixel or not.
	   // if alpha value is 0 image is not covering, hence subsampled.
	   return context.getImageData(0,0,1,1).data[3]===0;}return false;}; // Detects vertical squash in JPEG images:
	   loadImage.detectVerticalSquash=function(img,subsampled){var naturalHeight=img.naturalHeight||img.height,canvas=document.createElement('canvas'),context=canvas.getContext('2d'),data,sy,ey,py,alpha;if(subsampled){naturalHeight/=2;}canvas.width=1;canvas.height=naturalHeight;context.drawImage(img,0,0);data=context.getImageData(0,0,1,naturalHeight).data; // search image edge pixel position in case it is squashed vertically:
	   sy=0;ey=naturalHeight;py=naturalHeight;while(py>sy){alpha=data[(py-1)*4+3];if(alpha===0){ey=py;}else {sy=py;}py=ey+sy>>1;}return py/naturalHeight||1;}; // Renders image to canvas while working around iOS image scaling bugs:
	   // https://github.com/blueimp/JavaScript-Load-Image/issues/13
	   loadImage.renderImageToCanvas=function(canvas,img,sourceX,sourceY,sourceWidth,sourceHeight,destX,destY,destWidth,destHeight){if(img._type==='image/jpeg'){var context=canvas.getContext('2d'),tmpCanvas=document.createElement('canvas'),tileSize=1024,tmpContext=tmpCanvas.getContext('2d'),subsampled,vertSquashRatio,tileX,tileY;tmpCanvas.width=tileSize;tmpCanvas.height=tileSize;context.save();subsampled=loadImage.detectSubsampling(img);if(subsampled){sourceX/=2;sourceY/=2;sourceWidth/=2;sourceHeight/=2;}vertSquashRatio=loadImage.detectVerticalSquash(img,subsampled);if(subsampled||vertSquashRatio!==1){sourceY*=vertSquashRatio;destWidth=Math.ceil(tileSize*destWidth/sourceWidth);destHeight=Math.ceil(tileSize*destHeight/sourceHeight/vertSquashRatio);destY=0;tileY=0;while(tileY<sourceHeight){destX=0;tileX=0;while(tileX<sourceWidth){tmpContext.clearRect(0,0,tileSize,tileSize);tmpContext.drawImage(img,sourceX,sourceY,sourceWidth,sourceHeight,-tileX,-tileY,sourceWidth,sourceHeight);context.drawImage(tmpCanvas,0,0,tileSize,tileSize,destX,destY,destWidth,destHeight);tileX+=tileSize;destX+=destWidth;}tileY+=tileSize;destY+=destHeight;}context.restore();return canvas;}}return originalRenderMethod(canvas,img,sourceX,sourceY,sourceWidth,sourceHeight,destX,destY,destWidth,destHeight);};}); /*
	    * JavaScript Canvas to Blob 2.0.5
	    * https://github.com/blueimp/JavaScript-Canvas-to-Blob
	    *
	    * Copyright 2012, Sebastian Tschan
	    * https://blueimp.net
	    *
	    * Licensed under the MIT license:
	    * http://www.opensource.org/licenses/MIT
	    *
	    * Based on stackoverflow user Stoive's code snippet:
	    * http://stackoverflow.com/q/4998908
	    */ /*jslint nomen: true, regexp: true */ /*global window, atob, Blob, ArrayBuffer, Uint8Array */(function(window){'use strict';var CanvasPrototype=window.HTMLCanvasElement&&window.HTMLCanvasElement.prototype,hasBlobConstructor=window.Blob&&function(){try{return Boolean(new Blob());}catch(e){return false;}}(),hasArrayBufferViewSupport=hasBlobConstructor&&window.Uint8Array&&function(){try{return new Blob([new Uint8Array(100)]).size===100;}catch(e){return false;}}(),BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,dataURLtoBlob=(hasBlobConstructor||BlobBuilder)&&window.atob&&window.ArrayBuffer&&window.Uint8Array&&function(dataURI){var byteString,arrayBuffer,intArray,i,mimeString,bb;if(dataURI.split(',')[0].indexOf('base64')>=0){ // Convert base64 to raw binary data held in a string:
	   byteString=atob(dataURI.split(',')[1]);}else { // Convert base64/URLEncoded data component to raw binary data:
	   byteString=decodeURIComponent(dataURI.split(',')[1]);} // Write the bytes of the string to an ArrayBuffer:
	   arrayBuffer=new ArrayBuffer(byteString.length);intArray=new Uint8Array(arrayBuffer);for(i=0;i<byteString.length;i+=1){intArray[i]=byteString.charCodeAt(i);} // Separate out the mime component:
	   mimeString=dataURI.split(',')[0].split(':')[1].split(';')[0]; // Write the ArrayBuffer (or ArrayBufferView) to a blob:
	   if(hasBlobConstructor){return new Blob([hasArrayBufferViewSupport?intArray:arrayBuffer],{type:mimeString});}bb=new BlobBuilder();bb.append(arrayBuffer);return bb.getBlob(mimeString);};if(window.HTMLCanvasElement&&!CanvasPrototype.toBlob){if(CanvasPrototype.mozGetAsFile){CanvasPrototype.toBlob=function(callback,type,quality){if(quality&&CanvasPrototype.toDataURL&&dataURLtoBlob){callback(dataURLtoBlob(this.toDataURL(type,quality)));}else {callback(this.mozGetAsFile('blob',type));}};}else if(CanvasPrototype.toDataURL&&dataURLtoBlob){CanvasPrototype.toBlob=function(callback,type,quality){callback(dataURLtoBlob(this.toDataURL(type,quality)));};}}window.dataURLtoBlob=dataURLtoBlob;})(window);var file = FileAPI;

	   function createXHR() {
	     if (window.ActiveXObject) {
	       var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	     } else if (window.XMLHttpRequest) {
	       var xhr = new XMLHttpRequest();
	     }

	     return xhr;
	   }

	   var ajax = {};

	   ajax.get = function (url, callback) {
	     var xhr = createXHR();

	     xhr.open('GET', url);
	     xhr.onreadystatechange = function () {
	       if (xhr.readyState !== 4) return;

	       if (xhr.status == 200) {
	         callback(null, xhr.responseText);
	       } else if (xhr.status != 304) {
	         callback(true);
	       }
	     };
	     xhr.send(null);

	     return xhr;
	   };

	   ajax.post = function (url, data, callback) {
	     var xhr = createXHR();

	     var query = '?';
	     for (var key in data) {
	       if (data.hasOwnProperty(key)) {
	         query += key + '=' + data[key];
	       }
	     }

	     xhr.open('POST', url);
	     xhr.onreadystatechange = function () {
	       if (xhr.readyState == 4 && xhr.status == 200) {
	         callback(null, xhr.responseText);
	       } else {
	         callback(true);
	       }
	     };
	     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	     xhr.send(query);

	     return xhr;
	   };

	   ajax.postBlob = function (url, blob, options, callback) {
	     var xhr = createXHR();

	     if (utils.isFunction(options)) {
	       callback = options;
	       options = {};
	     }

	     xhr.open('POST', url);
	     xhr.onreadystatechange = function () {
	       if (xhr.readyState == 4 && xhr.status == 200) {
	         callback(null.xhr.responseText);
	       } else {
	         callback(true);
	       }
	     };
	     if (options.headers) {
	       utils.each(options.headers, function (val, header) {
	         xhr.setRequestHeader(header, val);
	       });
	     }
	     xhr.send(blob);

	     return xhr;
	   };

	   var Asset$3 = _Asset({});

	   var imageViewTranslations$1 = {
	     weight: 'w',
	     height: 'h',
	     quality: 'q'
	   };

	   var _Image = function (_Asset2) {
	     babelHelpers.inherits(_Image, _Asset2);


	     /**
	      * Image Asset
	      * @param {String} key    key
	      * @param {Bucket} parent bucket object
	      */

	     function _Image(key, parent, _config) {
	       babelHelpers.classCallCheck(this, _Image);

	       var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(_Image).call(this));

	       var config = utils.objExtend(utils.objClone(parent.config), {
	         separate: '-'
	       }, _config);

	       _this.key = key;
	       _this.parent = parent;
	       _this.config = config;
	       return _this;
	     }

	     /**
	      * get the image's infomations
	      * @param  {Function} callback Callback
	      * @return {Promise}           promise object
	      */


	     babelHelpers.createClass(_Image, [{
	       key: 'imageInfo',
	       value: function imageInfo() {
	         var _this2 = this;

	         var callback = arguments.length <= 0 || arguments[0] === undefined ? noop$3 : arguments[0];

	         return new Promise(function (resolve, reject) {
	           var infoUrl = _this2.url() + '?imageInfo';

	           ajax.get(infoUrl, function (err, body) {
	             if (err) {
	               reject(err);
	               return callback(err);
	             }

	             var info = JSON.parse(body);

	             resolve(info);
	             callback(null, info);
	           });
	         });
	       }

	       /**
	        * get the exif infomation of the picture
	        * @param  {Function} callback Callback
	        * @return {Promise}           promise object
	        */

	     }, {
	       key: 'exif',
	       value: function exif() {
	         var _this3 = this;

	         var callback = arguments.length <= 0 || arguments[0] === undefined ? noop$3 : arguments[0];

	         return new Promise(function (resolve, reject) {
	           var infoUrl = _this3.url() + '?exif';

	           ajax.get(infoUrl, function (err, body) {
	             if (err) {
	               reject(err);
	               return callback(err);
	             }

	             var info = JSON.parse(body);

	             resolve(info);
	             callback(null, info);
	           });
	         });
	       }

	       /**
	        * return a thumbnail image
	        * @param  {Object}   opts     options
	        * @param  {Function} callback Callback
	        * @return {Promise}           promise
	        */

	     }, {
	       key: 'imageView',
	       value: function imageView(opts) {
	         var _this4 = this;

	         var callback = arguments.length <= 1 || arguments[1] === undefined ? noop$3 : arguments[1];

	         var promise = new Promise(function (resolve, reject) {

	           var mode = opts.mode;
	           delete opts.mode;

	           var url = _this4.url();
	           var params = {};

	           utils.each(opts, function (value, key) {
	             if (imageViewTranslations$1.hasOwnProperty(key)) {
	               key = imageViewTranslations$1[key];
	             }

	             params[key] = value;
	           });

	           url += utils.format('?imageView/%d%s', mode, genOptUrl$1(params));

	           var image = new Image();
	           image.src = url;

	           promise.image = image;

	           resolve(image);
	           callback(null, image);
	         });

	         return promise;
	       }

	       /**
	        * return a processed image
	        * @param  {Object}   opts     options
	        * @param  {Function} callback Callback
	        * @return {Promise}           promise
	        */

	     }, {
	       key: 'imageMogr',
	       value: function imageMogr(opts) {
	         var _this5 = this;

	         var callback = arguments.length <= 1 || arguments[1] === undefined ? noop$3 : arguments[1];

	         var promise = new Promise(function (resolve, reject) {
	           var url = _this5.url();
	           var params = {};

	           utils.objExtend(params, opts);

	           url += utils.format('?imageMogr/v2/auto-orient%s', genOptUrl$1(params));

	           var image = new Image();
	           image.src = url;

	           promise.image = image;

	           resolve(image);
	           callback(null, image);
	         });

	         return promise;
	       }

	       /**
	        * return a image with a watermark
	        * @param  {Object}   opts     options
	        * @param  {Function} callback Callback
	        * @return {Promise}           promise object
	        */

	     }, {
	       key: 'watermark',
	       value: function watermark(opts) {
	         var _this6 = this;

	         var callback = arguments.length <= 1 || arguments[1] === undefined ? noop$3 : arguments[1];

	         var promise = new Promise(function (resolve) {
	           var url = _this6.url();
	           var params = {};
	           var mode = opts.mode;
	           delete opts.mode;

	           utils.objExtend(params, opts);

	           params.image = utils.safeEncode(params.image);

	           url += utils.format('?watermark/%d%s', mode, genOptUrl$1(params));

	           var image = new Image();
	           image.src = url;

	           promise.image = image;

	           resolve(image);
	           callback(null, image);
	         });

	         return promise;
	       }
	     }]);
	     return _Image;
	   }(Asset$3);

	   _Image.extend = function (_file) {
	     _file.imageView = function (opts, callback) {
	       var _this7 = this;

	       callback = callback || noop$3;
	       return new Promise(function (resolve) {

	         var img = file.Image(_this7);

	         img._load(_this7, function (err, _img) {
	           if (err) {
	             callback(err);
	             return promise.reject(err);
	           }

	           var view = {};

	           opts.mode = opts.mode || 1;

	           switch (opts.mode) {
	             case 1:
	               utils.objExtend(view, {
	                 // 缩放
	                 dw: opts.width || opts.height,
	                 dh: opts.height || opts.width,
	                 resize: 'preview'
	               });
	               break;
	             case 2:
	               var scale = _img.width / _img.height;

	               var hasWidth = opts.hasOwnProperty('width');
	               var hasHeight = opts.hasOwnProperty('height');

	               switch (true) {
	                 case hasWidth && hasHeight:
	                   utils.objExtend(view, {
	                     dw: opts.width,
	                     dh: opts.height,
	                     resize: 'max'
	                   });
	                   break;
	                 case hasWidth && !hasHeight:
	                   utils.objExtend(view, {
	                     dw: opts.width,
	                     dh: opts.width / scale,
	                     resize: 'max'
	                   });
	                   break;
	                 case !hasWidth && hasHeight:
	                   utils.objExtend(view, {
	                     dw: opts.height * scale,
	                     dh: opts.height,
	                     resize: 'max'
	                   });
	                   break;
	               }
	           }

	           img.set(view).get(function (err, image) {
	             if (err) {
	               callback(err);
	               return reject(err);
	             }

	             callback(null, image);
	             resolve(image);
	           });
	         });
	       });
	     };

	     _file.imageMogr = function (opts, callback) {
	       var _this8 = this;

	       callback = callback || noop$3;

	       return new Promise(function (resolve, reject) {

	         var img = file.Image(_this8);

	         img._load(_this8, function (err, _img) {
	           if (err) {
	             callback(null);
	             return promise.reject(err);
	           }

	           var view = {};
	           var scale = _img.width / _img.height;

	           // Thumbnails
	           var thumbnail = opts.thumbnail;
	           switch (thumbnail.mode) {
	             case 1:
	               utils.objExtend(view, {
	                 // 缩放
	                 dw: thumbnail.width || thumbnail.height,
	                 dh: thumbnail.height || thumbnail.width,
	                 resize: 'preview',

	                 // 中央裁剪
	                 sx: (_img.width - thumbnail.width) / 2, // x
	                 sy: (_img.height - thumbnail.height) / 2, // y
	                 sw: thumbnail.width || thumbnail.height,
	                 sh: thumbnail.height || thumbnail.width
	               });
	               break;
	             case 2:
	               var thumbHasWidth = thumbnail.hasOwnProperty('width');
	               var thumbHasHeight = thumbnail.hasOwnProperty('height');

	               switch (true) {
	                 case thumbHasWidth && thumbHasHeight:
	                   utils.objExtend(view, {
	                     dw: thumbnail.width,
	                     dh: thumbnail.height,
	                     resize: 'max'
	                   });
	                   break;
	                 case thumbHasWidth && !thumbHasHeight:
	                   utils.objExtend(view, {
	                     dw: thumbnail.width,
	                     dh: thumbnail.width / scale,
	                     resize: 'max'
	                   });
	                   break;
	                 case !thumbHasWidth && thumbHasHeight:
	                   utils.objExtend(view, {
	                     dw: thumbnail.height * scale,
	                     dh: thumbnail.height,
	                     resize: 'max'
	                   });
	                   break;
	               }
	           }

	           // Crop
	           var crop = opts.crop;
	           var cropHasWidth = crop.hasOwnProperty('width');
	           var cropHasHeight = crop.hasOwnProperty('height');

	           crop.x = crop.x || 0;
	           crop.y = crop.y || 0;

	           if (crop.gravity) {
	             // TODOS
	           }

	           switch (true) {
	             case cropHasWidth && !cropHasHeight:
	               crop.height = crop.width / scale;
	               break;
	             case !cropHasWidth && cropHasHeight:
	               crop.width = crop.height * scale;
	               break;
	           }

	           crop.rotate = crop.rotate || 0;

	           utils.objExtend(view, {
	             sx: crop.x,
	             sy: crop.y,
	             sw: crop.width,
	             sh: crop.height,

	             deg: crop.rotate
	           });

	           img.set(view).get(function (err, image) {
	             if (err) {
	               callback(err);
	               return reject(err);
	             }

	             callback(null, image);
	             resolve(image);
	           });
	         });
	       });
	     };

	     _file.imageInfo = function (callback) {
	       var _this9 = this;

	       callback = callback || noop$3;

	       return new Promise(function (resolve, reject) {
	         var img = file.Image(_this9);

	         img._load(_this9, function (err, img) {
	           if (err) {
	             callback(err);
	             return reject(err);
	           }

	           var info = {
	             width: img.width,
	             height: img.height
	           };
	           callback(null, info);
	           resolve(info);
	         });
	       });
	     };

	     _file.getImage = function () {
	       return file.Image(this);
	     };

	     return _file;
	   };

	   function genOptUrl$1(params) {
	     var url = "";

	     utils.each(params, function (value, key) {
	       url += utils.format('/%s/%s', key, value);
	     });

	     return url;
	   }

	   function noop$3() {
	     return false;
	   }

	   var Asset$2 = null;

	   var globalConfig = null;

	   function noop$2() {
	     return false;
	   }

	   var Bucket$1 = function () {
	     /**
	      * Bucket
	      * Example:
	      * ```
	      * var imagesBucket = new qiniu.Bucket('images', {
	      *   // special option
	      * });
	      * ```
	      * @param {String} bucketName bucket's name
	      * @param {Object} config     config
	      */

	     function Bucket(name) {
	       var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	       babelHelpers.classCallCheck(this, Bucket);

	       this.name = name;
	       this.queue = [];
	       this.config = utils.objExtend(globalConfig, config, {
	         scope: name
	       });

	       if (this.config.url) {
	         if (/\/$/.test(this.config.url)) {
	           this.config.url = this.config.url.substr(0, this.config.url.length - 1);
	         }
	       } else {
	         throw new ReferenceError('You should set the url of the bucket.');
	       }
	     }

	     /**
	      * Upload a file
	      * Example:
	      * ```
	      * imagesBucket.putFile('example.jpg', __dirname + '/assert/example.jpg', function(err, reply) {
	      *   if (err) {
	      *     return console.error(err);
	      *   }
	      *  
	      *   console.dir(reply);
	      * });
	      * ```
	      * @param  {String}   key      key
	      * @param  {File}     file     file
	      * @param  {Object}   options  upload option
	      * @param  {Function} callback Callback
	      * @return {Promise}           Promise object
	      */


	     babelHelpers.createClass(Bucket, [{
	       key: 'putFile',
	       value: function putFile(key, _file, options, callback) {
	         var _arguments = arguments,
	             _this = this;

	         return new Promise(function (resolve, reject) {

	           switch (_arguments.length) {
	             case 3:
	               if (utils.isFunction(options)) {
	                 callback = options;
	                 options = {};
	               } else {
	                 callback = noop$2;
	               }
	               break;
	             case 2:
	               options = {};
	               callback = noop$2;
	               break;
	           }

	           var config = utils.objExtend(utils.objClone(_this.config), options);

	           var putToken = config.putToken;

	           // upload API
	           var uploadUrl = 'http://' + globalConfig.uploadUrl;

	           // isIE
	           var isIE = window.ActiveXObject ? true : false;

	           var data = {
	             token: putToken,
	             key: key
	           };

	           if (isIE) {
	             data.accept = 'text/plain; charset=utf-8';
	           }

	           // uploading
	           var xhr = file.upload({
	             url: uploadUrl,
	             data: data,
	             files: {
	               file: _file
	             },
	             upload: function upload(xhr, _options) {
	               (options.before && utils.isFunction(options.before) ? options.before : noop$2).call(null, xhr, key, _file);
	             },
	             progress: function progress(evt) {
	               var totalPercent = evt.loaded / evt.total * 100;(options.progress && utils.isFunction(options.progress) ? options.progress : noop$2).call(null, totalPercent, evt.loaded, evt.total);
	             },
	             complete: function complete(err, evt) {
	               if (err) {
	                 callback(err);
	                 return reject(err);
	               }

	               var reply = null;

	               if (window.JSON) {
	                 reply = JSON.parse(xhr.responseText);
	               } else {
	                 reply = xhr.responseText;
	               }

	               var asset = _this.key(key);

	               callback(null, reply, asset, xhr, evt);
	               resolve(reply, asset, xhr, evt);
	             }
	           });
	         });
	       }
	     }, {
	       key: 'putChunkedFile',
	       value: function putChunkedFile(key, _file, options, callback) {
	         var _this2 = this;

	         return new Promise(function (resolve, reject) {
	           var config = utils.objExtend(utils.objClone(_this2.config), options);

	           var putToken = _this2.config.putToken;

	           options.blockSize = options.blockSize || file.MB.form(5);

	           // upload API
	           var uploadUrl = 'http://' + globalConfig.uploadUrl + '/mkblk/' + options.blockSize;

	           // ctx
	           var blockCtxes = [];

	           if (utils.isFunction(_file.slice)) {
	             (function loop(url, start, _callback, host) {
	               var end = start + options.blockSize;

	               if (start < _file.size) {
	                 var blob = _file.slice(start, end);

	                 ajax.postBlob(url, blob, {
	                   headers: {
	                     'Content-Type': 'application/octet-stream',
	                     'Authorization': utils.format('UpToken %s', putToken)
	                   }
	                 }, function (err, reply) {
	                   if (err) {
	                     callback(err);
	                     return reject(err);
	                   }

	                   var replyData = eval(reply);

	                   blockCtxes.push(replyData.ctx);

	                   var host = replyData.host;

	                   loop(utils.format('%s/bput/%s/%s', host, replyData.ctx, end), end, _callback, host);
	                 });
	               } else {
	                 return _callback(host);
	               }
	             })(uploadUrl, 0, function (host) {
	               var asset = self.key(key);

	               var url = utils.format('%s/rs-mkfile/%s/fsize/%s/mimeType/%s', host, asset.entryUrl(), _file.size, _file.type);

	               if (options.params) {
	                 url, utils.format('/params/%s');
	               }

	               if (options.meta) {
	                 url += utils.format('/meta/%s', utils.safeEncode(options.meta));
	               }

	               if (options.customer) {
	                 url += utils.format('/customer/%s', options.customer);
	               }

	               if (options.rotate) {
	                 url += utils.format('/rotate/%s', options.rotate);
	               }

	               ajax.post();
	             });
	           } else {
	             var err = 'no support chunk';

	             reject(err);
	             callback(err);
	           }
	         });
	       }

	       /**
	        * Get a key
	        * @param  {String}   key      key
	        * @param  {Function} callback Callback
	        * @return {Promise}           Promise Object
	        */

	     }, {
	       key: 'getFile',
	       value: function getFile(key) {
	         var _this3 = this;

	         var callback = arguments.length <= 1 || arguments[1] === undefined ? noop$2 : arguments[1];

	         return new Promise(function (resolve, reject) {
	           // token
	           var getToken = _this3.config.getToken || '';

	           // key url
	           var url = null;
	           if (_this3.config.url) {
	             url = utils.format('%s/%s?e=3600&token=%s', _this3.url(), key, getToken);
	           } else {
	             url = utils.format('http://%s.qiniudn.com/%s?e=3600&token=%s', _this3.name, key, getToken);
	           }

	           ajax.get(url, function (err, body) {
	             if (err) {
	               callback(err);
	               return reject(err);
	             }

	             callback(null, body);
	             resolve(body);
	           });
	         });
	       }
	     }, {
	       key: 'url',
	       value: function url() {
	         return this.config.url;
	       }

	       /**
	        * return a asset object
	        * @param  {String} key key
	        * @return {Asset}      asset object
	        */

	     }, {
	       key: 'key',
	       value: function key(_key) {
	         return new Asset$2(_key, this);
	       }
	     }, {
	       key: 'image',
	       value: function image(key) {
	         return new _Image(key, this);
	       }
	     }]);
	     return Bucket;
	   }();

	   Bucket$1.Image = _Image;

	   function _Bucket (config) {
	     globalConfig = config;
	     Asset$2 = _Asset(config);
	     return Bucket$1;
	   }

	   // Copyright Joyent, Inc. and other Node contributors.
	   //
	   // Permission is hereby granted, free of charge, to any person obtaining a
	   // copy of this software and associated documentation files (the
	   // "Software"), to deal in the Software without restriction, including
	   // without limitation the rights to use, copy, modify, merge, publish,
	   // distribute, sublicense, and/or sell copies of the Software, and to permit
	   // persons to whom the Software is furnished to do so, subject to the
	   // following conditions:
	   //
	   // The above copyright notice and this permission notice shall be included
	   // in all copies or substantial portions of the Software.
	   //
	   // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	   // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	   // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	   // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	   // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	   // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	   // USE OR OTHER DEALINGS IN THE SOFTWARE.

	   function EventEmitter() {
	     this._events = this._events || {};
	     this._maxListeners = this._maxListeners || undefined;
	   }
	   // Backwards-compat with node 0.10.x
	   EventEmitter.EventEmitter = EventEmitter;

	   EventEmitter.prototype._events = undefined;
	   EventEmitter.prototype._maxListeners = undefined;

	   // By default EventEmitters will print a warning if more than 10 listeners are
	   // added to it. This is a useful default which helps finding memory leaks.
	   EventEmitter.defaultMaxListeners = 10;

	   // Obviously not all Emitters should be limited to 10. This function allows
	   // that to be increased. Set to zero for unlimited.
	   EventEmitter.prototype.setMaxListeners = function (n) {
	     if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	     this._maxListeners = n;
	     return this;
	   };

	   EventEmitter.prototype.emit = function (type) {
	     var er, handler, len, args, i, listeners;

	     if (!this._events) this._events = {};

	     // If there is no 'error' event listener then throw.
	     if (type === 'error') {
	       if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	         er = arguments[1];
	         if (er instanceof Error) {
	           throw er; // Unhandled 'error' event
	         }
	         throw TypeError('Uncaught, unspecified "error" event.');
	       }
	     }

	     handler = this._events[type];

	     if (isUndefined(handler)) return false;

	     if (isFunction(handler)) {
	       switch (arguments.length) {
	         // fast cases
	         case 1:
	           handler.call(this);
	           break;
	         case 2:
	           handler.call(this, arguments[1]);
	           break;
	         case 3:
	           handler.call(this, arguments[1], arguments[2]);
	           break;
	         // slower
	         default:
	           args = Array.prototype.slice.call(arguments, 1);
	           handler.apply(this, args);
	       }
	     } else if (isObject(handler)) {
	       args = Array.prototype.slice.call(arguments, 1);
	       listeners = handler.slice();
	       len = listeners.length;
	       for (i = 0; i < len; i++) {
	         listeners[i].apply(this, args);
	       }
	     }

	     return true;
	   };

	   EventEmitter.prototype.addListener = function (type, listener) {
	     var m;

	     if (!isFunction(listener)) throw TypeError('listener must be a function');

	     if (!this._events) this._events = {};

	     // To avoid recursion in the case that type === "newListener"! Before
	     // adding it to the listeners, first emit "newListener".
	     if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	     if (!this._events[type])
	       // Optimize the case of one listener. Don't need the extra array object.
	       this._events[type] = listener;else if (isObject(this._events[type]))
	       // If we've already got an array, just append.
	       this._events[type].push(listener);else
	       // Adding the second element, need to change to array.
	       this._events[type] = [this._events[type], listener];

	     // Check for listener leak
	     if (isObject(this._events[type]) && !this._events[type].warned) {
	       if (!isUndefined(this._maxListeners)) {
	         m = this._maxListeners;
	       } else {
	         m = EventEmitter.defaultMaxListeners;
	       }

	       if (m && m > 0 && this._events[type].length > m) {
	         this._events[type].warned = true;
	         console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	         if (typeof console.trace === 'function') {
	           // not supported in IE 10
	           console.trace();
	         }
	       }
	     }

	     return this;
	   };

	   EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	   EventEmitter.prototype.once = function (type, listener) {
	     if (!isFunction(listener)) throw TypeError('listener must be a function');

	     var fired = false;

	     function g() {
	       this.removeListener(type, g);

	       if (!fired) {
	         fired = true;
	         listener.apply(this, arguments);
	       }
	     }

	     g.listener = listener;
	     this.on(type, g);

	     return this;
	   };

	   // emits a 'removeListener' event iff the listener was removed
	   EventEmitter.prototype.removeListener = function (type, listener) {
	     var list, position, length, i;

	     if (!isFunction(listener)) throw TypeError('listener must be a function');

	     if (!this._events || !this._events[type]) return this;

	     list = this._events[type];
	     length = list.length;
	     position = -1;

	     if (list === listener || isFunction(list.listener) && list.listener === listener) {
	       delete this._events[type];
	       if (this._events.removeListener) this.emit('removeListener', type, listener);
	     } else if (isObject(list)) {
	       for (i = length; i-- > 0;) {
	         if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	           position = i;
	           break;
	         }
	       }

	       if (position < 0) return this;

	       if (list.length === 1) {
	         list.length = 0;
	         delete this._events[type];
	       } else {
	         list.splice(position, 1);
	       }

	       if (this._events.removeListener) this.emit('removeListener', type, listener);
	     }

	     return this;
	   };

	   EventEmitter.prototype.removeAllListeners = function (type) {
	     var key, listeners;

	     if (!this._events) return this;

	     // not listening for removeListener, no need to emit
	     if (!this._events.removeListener) {
	       if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	       return this;
	     }

	     // emit removeListener for all listeners on all events
	     if (arguments.length === 0) {
	       for (key in this._events) {
	         if (key === 'removeListener') continue;
	         this.removeAllListeners(key);
	       }
	       this.removeAllListeners('removeListener');
	       this._events = {};
	       return this;
	     }

	     listeners = this._events[type];

	     if (isFunction(listeners)) {
	       this.removeListener(type, listeners);
	     } else if (listeners) {
	       // LIFO order
	       while (listeners.length) {
	         this.removeListener(type, listeners[listeners.length - 1]);
	       }
	     }
	     delete this._events[type];

	     return this;
	   };

	   EventEmitter.prototype.listeners = function (type) {
	     var ret;
	     if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	     return ret;
	   };

	   EventEmitter.prototype.listenerCount = function (type) {
	     if (this._events) {
	       var evlistener = this._events[type];

	       if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	     }
	     return 0;
	   };

	   EventEmitter.listenerCount = function (emitter, type) {
	     return emitter.listenerCount(type);
	   };

	   function isFunction(arg) {
	     return typeof arg === 'function';
	   }

	   function isNumber(arg) {
	     return typeof arg === 'number';
	   }

	   function isObject(arg) {
	     return (typeof arg === 'undefined' ? 'undefined' : babelHelpers.typeof(arg)) === 'object' && arg !== null;
	   }

	   function isUndefined(arg) {
	     return arg === void 0;
	   }

	   var _configData = {
	     uploadUrl: 'up.qiniu.com',
	     rsUrl: 'rs.qbox.me',
	     rsfUrl: 'rsf.qbox.me'
	   };

	   var Asset = _Asset(_configData);
	   var Bucket = _Bucket(_configData);
	   var qiniu = {};

	   /**
	    * Global Config
	    * Example:
	    * ```
	    * qiniu.config({
	    *   foo: '-----'
	    * });
	    *
	    * qiniu.config('foo', 'bar');
	    * qiniu.config('foo');
	    * ``` 
	    * @param  {String/Object} key   key of config
	    * @param  {Mix}           value value
	    */
	   qiniu.config = function (key, value) {
	     if (arguments.length > 1 && key instanceof String) {
	       // set config data normally
	       qiniu.set(key, value);
	     } else {
	       switch (true) {
	         case utils.isString(key):
	           // Get config data
	           return qiniu.get(key);
	           break;
	         case utils.isObject(key):
	           // Set config data with a object
	           for (var ii in key) {
	             (function (_key) {
	               qiniu.set(_key, key[_key]);
	             })(ii);
	           }
	           break;
	       }
	     }

	     return this;
	   };

	   /**
	    * Set config data
	    * @param  {String} key   key
	    * @param  {Mix}    value value
	    * @return {Object}       qiniu object
	    */
	   qiniu.set = function (key, value) {
	     _configData[key] = value;

	     return this;
	   };

	   /**
	    * Get config data
	    * @param  {String} key   key
	    * @return {Mix}          config value
	    */
	   qiniu.get = function (key) {
	     return _configData[key];
	   };

	   /**
	    * Binding the select button
	    * @param  {HTMLElement} el      select button
	    * @param  {Object} options options
	    * @return {Object}         qiniu
	    */
	   qiniu.bind = function (el, options) {
	     options = options || {};

	     var css = ".qiniu-transparent { \
	    z-index: 1000; \
	    zoom: 1; \
	    opacity: 0; \
	    -moz-opacity: 0; \
	    -khtml-opacity: 0; \
	    filter: 'alpha(opacity=0)'; \
	    *filter: alpha(opacity=0); \
	  }";
	     var head = document.getElementsByTagName('head')[0];
	     var style = document.createElement('style');

	     style.type = 'text/css';
	     if (style.styleSheet) {
	       style.styleSheet.cssText = css;
	     } else {
	       style.appendChild(document.createTextNode(css));
	     }

	     head.appendChild(style);

	     var tmp = document.createElement('div');
	     var html = '<div class="js-fileapi-wrapper qiniu-transparent"></div>';
	     tmp.innerHTML = html;
	     var wrapper = tmp.firstChild;

	     if (el.jquery) {
	       el.before(wrapper).addClass('select-btn');
	     } else {
	       var parentNode = el.parentNode;
	       parentNode.insertBefore(wrapper, el);
	     }

	     var input = document.createElement('input');
	     input.type = 'file';
	     input.className = 'qiniu-transparent';
	     input.multiple = true;

	     wrapper.appendChild(input);

	     el = el.jquery ? el.get(0) : el;

	     utils.css(wrapper, {
	       top: el.style.top,
	       right: el.style.right,
	       position: "absolute",
	       width: el.offsetWidth + 5,
	       height: el.offsetHeight + 5,
	       margin: el.style.margin
	     });
	     utils.css(input, {
	       width: el.offsetWidth + 5,
	       height: el.offsetHeight + 5,
	       position: 'relative'
	     });

	     file.event.on(input, 'change', function (evt) {
	       var files = file.getFiles(evt);
	       var filter = options.filter || false;

	       var filters = {
	         'image': /image/,
	         'audio': /audio/,
	         'video': /video/,
	         'media': /audio|video/
	       };

	       switch (true) {
	         case utils.isString(filter):
	           if (filters[filter]) {
	             files = file.filter(files, function (_file) {
	               return filters[filter].test(_file.type);
	             });
	           }
	           break;
	         case utils.isArray(filter):
	           for (var i = 0; i < filter.length; i++) {
	             (function (index) {
	               files = file.filter(files, function (_file) {
	                 return filters[filter[index]].test(_file.type);
	               });
	             })(i);
	           }
	           break;
	         case filter instanceof RegExp:
	           files = file.filter(files, function (_file) {
	             return filter.test(_file.type);
	           });
	           break;
	       }

	       for (var i = 0; i < files.length; i++) {
	         (function (index) {
	           qiniu.emit('file', _Image.extend(files[index]));
	         })(i);
	       }
	     });

	     return this;
	   };

	   /**
	    * Binding the drag and drop aera
	    * @param  {HTMLElement} el      aera
	    * @param  {Object} options options
	    * @return {Object}         qiniu
	    */
	   qiniu.bind.dnd = function (el, options) {
	     if (file.support.dnd) {
	       file.event.dnd(el.jquery ? el.get(0) : el, function (files) {
	         var filter = options.filter || false;

	         var filters = {
	           'image': /image/,
	           'audio': /audio/,
	           'video': /video/,
	           'media': /audio|video/
	         };

	         switch (true) {
	           case utils.isString(filter):
	             if (filters[filter]) {
	               files = file.filter(files, function (_file) {
	                 return filters[filter].test(_file.type);
	               });
	             }
	             break;
	           case utils.isArray(filter):
	             for (var i = 0; i < filter.length; i++) {
	               (function (index) {
	                 files = file.filter(files, function (_file) {
	                   return filters[filter[index]].test(_file.type);
	                 });
	               })(i);
	             }
	             break;
	           case filter instanceof RegExp:
	             files = file.filter(files, function (_file) {
	               return filter.test(_file.type);
	             });
	             break;
	         }

	         for (var i = 0; i < files.length; i++) {
	           (function (index) {
	             qiniu.emit('file', _Image.extend(files[index]));
	           })(i);
	         }
	       });

	       file.event.on(el.jquery ? el.get(0) : el, 'dragover dragleave', function (evt) {
	         switch (evt.type) {
	           case 'dragover':
	             (options.over && utils.isFunction(options.over) ? options.over : noop).call(null);

	             qiniu.emit('over');
	             break;
	           case 'dragleave':
	             (options.out && utils.isFunction(options.out) ? options.out : noop).call(null);

	             qiniu.emit('out');
	         }
	       });

	       (options.success && utils.isFunction(options.success) ? options.success : noop).call(null);
	       qiniu.emit('dnd.success');
	     } else {
	       qiniu.emit('dnd.error', 'no support');
	       (options.error && utils.isFunction(options.error) ? options.error : noop).call(null, 'no support');
	     }

	     return qiniu;
	   };

	   qiniu.supportDnd = file.support.dnd;

	   qiniu.bucket = function (bucket, config) {
	     return new Bucket(bucket, config);
	   };

	   qiniu.Asset = Asset;
	   qiniu.Bucket = Bucket;
	   qiniu.Image = _Image;

	   utils.objExtend(qiniu, EventEmitter.prototype);
	   EventEmitter.call(qiniu);

	   function noop() {
	     return false;
	   }

	   return qiniu;

	}));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(9)

	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}

	exports.createHash = __webpack_require__(11)

	exports.createHmac = __webpack_require__(24)

	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}

	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}

	var p = __webpack_require__(25)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync


	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(7)
	var isArray = __webpack_require__(8)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(10)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(5).Buffer))

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(12)

	var md5 = toConstructor(__webpack_require__(21))
	var rmd160 = toConstructor(__webpack_require__(23))

	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}

	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}

	var Buffer = __webpack_require__(5).Buffer
	var Hash   = __webpack_require__(13)(Buffer)

	exports.sha1 = __webpack_require__(14)(Buffer, Hash)
	exports.sha256 = __webpack_require__(19)(Buffer, Hash)
	exports.sha512 = __webpack_require__(20)(Buffer, Hash)


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }

	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }

	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)

	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }

	      s += ch
	      f += ch

	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s

	    return this
	  }

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)

	    var hash = this._update(this._block) || this._hash()

	    return enc ? hash.toString(enc) : hash
	  }

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }

	  return Hash
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(15).inherits

	module.exports = function (Buffer, Hash) {

	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)

	  var POOL = []

	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()

	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)

	    this._h = null
	    this.init()
	  }

	  inherits(Sha1, Hash)

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0

	    Hash.prototype.init.call(this)
	    return this
	  }

	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e

	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e

	    var w = this._w

	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)

	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )

	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }

	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }

	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }

	  return Sha1
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(17);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(18);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(15).inherits

	module.exports = function (Buffer, Hash) {

	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]

	  var W = new Array(64)

	  function Sha256() {
	    this.init()

	    this._w = W //new Array(64)

	    Hash.call(this, 16*4, 14*4)
	  }

	  inherits(Sha256, Hash)

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }

	  function R (X, n) {
	    return (X >>> n);
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }

	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }

	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }

	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }

	  Sha256.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }

	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0

	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)

	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)

	    return H
	  }

	  return Sha256

	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(15).inherits

	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]

	  var W = new Array(160)

	  function Sha512() {
	    this.init()
	    this._w = W

	    Hash.call(this, 128, 112)
	  }

	  inherits(Sha512, Hash)

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  Sha512.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2

	      var Wi, Wil

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)

	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)

	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]

	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]

	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)

	        W[j] = Wi
	        W[j + 1] = Wil
	      }

	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]

	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)

	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)

	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }

	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0

	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }

	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)

	    return H
	  }

	  return Sha512

	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(22);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160



	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};

	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}

	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}

	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}

	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}

	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}

	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );

	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(11)

	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)

	module.exports = Hmac

	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg

	  var blocksize = (alg === 'sha512') ? 128 : 64

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }

	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)

	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }

	  this._hash = createHash(alg).update(ipad)
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(26)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }

	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')

	    setTimeout(function() {
	      var result

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }

	      callback(undefined, result)
	    })
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')

	    if (iterations < 0)
	      throw new TypeError('Bad iterations')

	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')

	    if (keylen < 0)
	      throw new TypeError('Bad key length')

	    digest = digest || 'sha1'

	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)

	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)

	      var U = crypto.createHmac(digest, password).update(block1).digest()

	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen

	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }

	      U.copy(T, 0, 0, hLen)

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }

	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }

	    return DK
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ }
/******/ ]);