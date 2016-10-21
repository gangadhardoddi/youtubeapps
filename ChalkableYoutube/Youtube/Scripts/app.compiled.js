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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _youtube = __webpack_require__(2);

	var _youtube2 = _interopRequireDefault(_youtube);

	var _services = __webpack_require__(6);

	var _services2 = _interopRequireDefault(_services);

	var _RecommendedVideosView = __webpack_require__(7);

	var _RecommendedVideosView2 = _interopRequireDefault(_RecommendedVideosView);

	var _AllVideosView = __webpack_require__(19);

	var _AllVideosView2 = _interopRequireDefault(_AllVideosView);

	var _VideoView = __webpack_require__(22);

	var _VideoView2 = _interopRequireDefault(_VideoView);

	var _RoleEnum = __webpack_require__(15);

	var _ModeEnum = __webpack_require__(16);

	var _controls = __webpack_require__(25);

	var _controls2 = _interopRequireDefault(_controls);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GlobalVariables = {
	    CHLK_API: window['CHLK_API'] || null,
	    VIDEO_ID: window['VIDEO_ID'] || null,
	    STANDARD_VIDEOS: window['STANDARD_VIDEOS'] || [],
	    ANNOUNCEMENT_APPLICATION_ID: window['ANNOUNCEMENT_APPLICATION_ID'] || null,
	    ROLE: window['ROLE'] || null,
	    MODE: window['MODE'] || null
	};

	var VideosController = function () {
	    function VideosController() {
	        _classCallCheck(this, VideosController);

	        this.view = null;
	    }

	    _createClass(VideosController, [{
	        key: 'pushView_',
	        value: function pushView_(viewClass, completer) {
	            this.view = new viewClass(this);
	            this.view.show();
	            this.view.refreshAsync(completer);
	        }
	    }, {
	        key: 'updateView_',
	        value: function updateView_(completer, message) {
	            this.view.partialRefreshAsync(completer, message);
	        }
	    }, {
	        key: 'searchAction',
	        value: function searchAction(searchQuery) {
	            var res = _services2.default.VideoService.search(searchQuery).then(function (videos) {
	                return {
	                    videos: videos,
	                    role: GlobalVariables.ROLE,
	                    mode: GlobalVariables.MODE
	                };
	            });
	            this.updateView_(res, 'load-videos');
	        }
	    }, {
	        key: 'recommendedVideosAction',
	        value: function recommendedVideosAction() {
	            var model = {
	                standardVideos: GlobalVariables.STANDARD_VIDEOS,
	                role: GlobalVariables.ROLE,
	                mode: GlobalVariables.MODE
	            };
	            var res = new Promise(function (resolve, reject) {
	                return resolve(model);
	            });
	            this.pushView_(_RecommendedVideosView2.default, res);
	        }
	    }, {
	        key: 'allVideosAction',
	        value: function allVideosAction() {
	            var res = _services2.default.VideoService.search(null).then(function (videos) {
	                return {
	                    videos: videos,
	                    role: GlobalVariables.ROLE,
	                    mode: GlobalVariables.MODE
	                };
	            });
	            this.pushView_(_AllVideosView2.default, res);
	        }
	    }, {
	        key: 'viewVideoAction',
	        value: function viewVideoAction(id) {
	            var res = _services2.default.VideoService.getVideoById(id).then(function (data) {
	                return {
	                    video: data,
	                    role: GlobalVariables.ROLE,
	                    mode: GlobalVariables.MODE
	                };
	            });

	            this.pushView_(_VideoView2.default, res);
	        }
	    }]);

	    return VideosController;
	}();

	$(function () {
	    _controls2.default.Create();
	    var videoController = new VideosController();

	    function isAppReady(data, callback) {
	        if (videoController.view.viewName === 'VideoView') {
	            _services2.default.VideoService.attach(videoController.view.model.video.Id, GlobalVariables.ANNOUNCEMENT_APPLICATION_ID).then(function (res) {
	                return callback(!!res);
	            });
	        } else callback(false);
	    }

	    GlobalVariables.CHLK_API.onBeforeClose(isAppReady);

	    switch (GlobalVariables.MODE) {
	        case _ModeEnum.ModeEnum.EDIT:
	            if (GlobalVariables.ROLE == _RoleEnum.RoleEnum.ADMIN) videoController.allVideosAction();else videoController.recommendedVideosAction();
	            break;
	        case _ModeEnum.ModeEnum.VIEW:case _ModeEnum.ModeEnum.GRADING_VIEW:
	            videoController.viewVideoAction(GlobalVariables.VIDEO_ID);
	            break;
	        default:
	            videoController.allVideosAction();
	            break;
	    }
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./youtube.sass", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./youtube.sass");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "html {\n  height: 100%; }\n\nbody {\n  background-color: #FCFCFC;\n  height: calc(100% - 35px);\n  overflow: hidden;\n  font-family: 'Open Sans', sans-serif; }\n  body .youtube-main {\n    height: 100%; }\n    body .youtube-main .youtube-header {\n      text-align: center;\n      font-size: 23px;\n      margin-top: 27px;\n      font-weight: 600; }\n  body .content-wrapper {\n    height: 100%; }\n  body .fluid-container {\n    height: 100%; }\n  body .videos-view {\n    height: 100%; }\n  body .all-videos-page {\n    height: 100%; }\n  body .search-videos-form {\n    height: 100%; }\n  body .standard-videos-page {\n    height: 100%; }\n  body .hidden {\n    display: none; }\n  body h1 {\n    text-align: center;\n    font-size: 50pt; }\n  body .close-open-control {\n    text-align: left !important;\n    margin-right: 20px !important; }\n  body .action-bar {\n    margin-top: 30px; }\n  body .search-control {\n    position: relative;\n    display: inline-block;\n    float: right;\n    width: 22%; }\n    body .search-control .search-input {\n      width: 92%;\n      display: inline-block; }\n    body .search-control .title {\n      display: block; }\n    body .search-control .filter-component {\n      display: block; }\n  body .action-bar {\n    clear: both; }\n  body .videos-container {\n    background: #fff;\n    border: 1px solid #c8c7c3;\n    display: inline-block;\n    overflow: auto;\n    text-align: center;\n    padding-top: 30px;\n    padding-left: 25px;\n    min-width: 98%;\n    min-height: 360px;\n    overflow-y: scroll;\n    overflow-x: hidden;\n    max-height: calc(100% - 130px); }\n    body .videos-container .announcement-item.application {\n      padding: 3px; }\n      body .videos-container .announcement-item.application img {\n        border-radius: 2px; }\n    body .videos-container .announcement-item.application:hover .duration {\n      opacity: 0.1; }\n    body .videos-container .shortdesc {\n      text-align: left;\n      white-space: pre-wrap;\n      top: 32px; }\n    body .videos-container .duration {\n      position: absolute;\n      bottom: 42px;\n      right: 2px;\n      z-index: 1;\n      background-color: black;\n      color: white;\n      padding: 0px 2px;\n      opacity: 0.8;\n      border-radius: 2px;\n      font-size: 13px; }\n  body .load-videos {\n    display: table;\n    width: 300pt;\n    height: 50pt;\n    text-align: center;\n    font-size: 20pt;\n    margin: auto;\n    display: block;\n    border: none;\n    background-color: aquamarine; }\n  body .clear-filter {\n    transform: scale(0.7);\n    top: 3%;\n    right: 6%;\n    width: 32px;\n    height: 32px;\n    position: absolute; }\n  body .video-view-page {\n    margin: 10px;\n    text-align: center;\n    overflow-y: scroll;\n    overflow-x: hidden;\n    height: 93%; }\n    body .video-view-page .video-content {\n      display: inline-block;\n      margin: auto; }\n      body .video-view-page .video-content .video-title {\n        text-align: center;\n        font-weight: 600; }\n      body .video-view-page .video-content .video-iframe {\n        width: 761px;\n        height: 434px;\n        border: 5px solid #8a8a8a;\n        border-radius: 4px;\n        box-shadow: #969696 5px 5px 10px;\n        display: block;\n        margin: auto; }\n      body .video-view-page .video-content .video-info {\n        margin-top: 21px;\n        text-align: left;\n        display: inline-block;\n        font-size: 15px; }\n        body .video-view-page .video-content .video-info .video-author {\n          display: inline-block;\n          float: left; }\n        body .video-view-page .video-content .video-info .video-views-count {\n          display: inline-block;\n          float: right; }\n        body .video-view-page .video-content .video-info .video-description {\n          clear: both; }\n          body .video-view-page .video-content .video-info .video-description span:first-child {\n            font-weight: bolder; }\n          body .video-view-page .video-content .video-info .video-description span:nth-child(2) {\n            white-space: pre-wrap;\n            display: block;\n            text-align: left;\n            width: 704px; }\n    body .video-view-page .cancel-button {\n      float: right;\n      margin-bottom: 20px;\n      margin-right: 20px;\n      width: 113px;\n      height: 33px; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VideoService = function () {
	    function VideoService() {
	        _classCallCheck(this, VideoService);
	    }

	    _createClass(VideoService, null, [{
	        key: 'get',
	        value: function get(url, params) {
	            return new Promise(function (resolve, reject) {
	                $.getJSON(url, params).done(function (response) {
	                    resolve(VideoService.processResponse(response));
	                }).fail(function (error) {
	                    reject(error);
	                });
	            }).then(function (data) {
	                return data;
	            }).catch(function (message) {
	                window['CHLK_API'].showAlertBox('Whoops. Something went wrong, please try again');
	                return;
	            });
	        }
	    }, {
	        key: 'attach',
	        value: function attach(videoId, announcementApplicationId) {
	            return VideoService.get("/Youtube/Attach", {
	                id: videoId,
	                announcementApplicationId: announcementApplicationId
	            });
	        }
	    }, {
	        key: 'search',
	        value: function search(searchQuery) {
	            return VideoService.get("/Youtube/SearchVideos", {
	                searchQuery: searchQuery
	            });
	        }
	    }, {
	        key: 'getVideoById',
	        value: function getVideoById(id) {
	            return VideoService.get("/Youtube/Video", { id: id });
	        }
	    }, {
	        key: 'processResponse',
	        value: function processResponse(response) {
	            if (!response.Success) {
	                return response.Message;
	            }

	            return response.Data;
	        }
	    }]);

	    return VideoService;
	}();

	exports.default = { VideoService: VideoService };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _BaseVideosView2 = __webpack_require__(8);

	var _BaseVideosView3 = _interopRequireDefault(_BaseVideosView2);

	var _StandardVideosTpl = __webpack_require__(17);

	var _StandardVideosTpl2 = _interopRequireDefault(_StandardVideosTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RecommendedVideosView = function (_BaseVideosView) {
	    _inherits(RecommendedVideosView, _BaseVideosView);

	    function RecommendedVideosView(videosController) {
	        _classCallCheck(this, RecommendedVideosView);

	        var _this = _possibleConstructorReturn(this, (RecommendedVideosView.__proto__ || Object.getPrototypeOf(RecommendedVideosView)).call(this, videosController));

	        _this.name = 'RecommendedVideosView';
	        return _this;
	    }

	    _createClass(RecommendedVideosView, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {
	            var _this2 = this;

	            _get(RecommendedVideosView.prototype.__proto__ || Object.getPrototypeOf(RecommendedVideosView.prototype), 'bindEvents_', this).call(this);

	            var keypressTimeOut;
	            this.dom.on('click', '.action-bar a', function (event) {
	                _this2.controller.allVideosAction();
	            }).on('input', "[name=searchQuery]", function (event) {
	                clearTimeout(keypressTimeOut);
	                keypressTimeOut = setTimeout(function () {
	                    $(_this2.loadVideosFormSelector_).trigger('submit');
	                }, 700);
	            });
	        }
	    }, {
	        key: 'cssClass_',
	        get: function get() {
	            return 'standard-videos-page';
	        }
	    }, {
	        key: 'templateClass_',
	        get: function get() {
	            return _StandardVideosTpl2.default;
	        }
	    }, {
	        key: 'loadResourcesFormSelector_',
	        get: function get() {
	            return '.recommended-videos-form';
	        }
	    }, {
	        key: 'updateResourcesSelector_',
	        get: function get() {
	            return '.attachments-and-applications';
	        }
	    }]);

	    return RecommendedVideosView;
	}(_BaseVideosView3.default);

	exports.default = RecommendedVideosView;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _BaseView2 = __webpack_require__(9);

	var _BaseView3 = _interopRequireDefault(_BaseView2);

	var _VideosTpl = __webpack_require__(10);

	var _VideosTpl2 = _interopRequireDefault(_VideosTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseVideosView = function (_BaseView) {
	    _inherits(BaseVideosView, _BaseView);

	    function BaseVideosView(videosController) {
	        _classCallCheck(this, BaseVideosView);

	        return _possibleConstructorReturn(this, (BaseVideosView.__proto__ || Object.getPrototypeOf(BaseVideosView)).call(this, videosController));
	    }

	    _createClass(BaseVideosView, [{
	        key: 'getSearchQuery',
	        value: function getSearchQuery() {
	            return $('.search-filters').find('[name="searchQuery"]').val();
	        }
	    }, {
	        key: 'bindEvents_',
	        value: function bindEvents_() {
	            var _this2 = this;

	            _get(BaseVideosView.prototype.__proto__ || Object.getPrototypeOf(BaseVideosView.prototype), 'bindEvents_', this).call(this);
	            this.dom.on('submit', this.loadVideosFormSelector_, function (event) {
	                var target = $(event.target);
	                setTimeout(function () {
	                    var params = _this2.getSearchQuery();

	                    !target.hasClass('submit-process') && target.addClass('submit-process');
	                    _this2.controller.searchAction(params);
	                }, 0);
	                return false;
	            }).on('click', '.download-link', function (event) {
	                var id = _this2.getVideoId(event.target);

	                _this2.controller.viewVideoAction(id);

	                return false;
	            });
	        }
	    }, {
	        key: 'getVideoId',
	        value: function getVideoId(node) {
	            var parent = $(node).parents('div.announcement-item.application');
	            return parent.find('[name="id"]').val();
	        }
	    }, {
	        key: 'onRefresh_',
	        value: function onRefresh_(model) {
	            _get(BaseVideosView.prototype.__proto__ || Object.getPrototypeOf(BaseVideosView.prototype), 'onRefresh_', this).call(this, model);
	        }
	    }, {
	        key: 'onPartialRefresh_',
	        value: function onPartialRefresh_(model, message, append) {
	            _get(BaseVideosView.prototype.__proto__ || Object.getPrototypeOf(BaseVideosView.prototype), 'onPartialRefresh_', this).call(this, model, message, append);
	            if (message == 'load-videos') {
	                var dom = $(this.loadVideosFormSelector_ + '.submit-process');
	                _VideosTpl2.default.renderTo(model, dom.find(this.updateVideosSelector_), append);
	            }
	        }
	    }, {
	        key: 'loadVideosFormSelector_',
	        get: function get() {}
	    }, {
	        key: 'updateVideosSelector_',
	        get: function get() {}
	    }]);

	    return BaseVideosView;
	}(_BaseView3.default);

	exports.default = BaseVideosView;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseView = function () {
	    function BaseView(controller) {
	        _classCallCheck(this, BaseView);

	        this._parentDom = $('.videos-view');
	        this.model = null;
	        this.controller = controller;
	    }

	    _createClass(BaseView, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {}
	    }, {
	        key: 'show',
	        value: function show() {
	            $(this._parentDom).html('<div class="' + this.cssClass_ + '"></div>');
	            this.bindEvents_();
	        }
	    }, {
	        key: 'refreshAsync',
	        value: function refreshAsync(promise) {
	            var _this = this;

	            this.showLoader();
	            promise.then(function (model) {
	                _this.onRefresh_(model);
	                _this.hideLoader();
	            });
	        }
	    }, {
	        key: 'partialRefreshAsync',
	        value: function partialRefreshAsync(promisse, message, append) {
	            var _this2 = this;

	            this.showLoader();
	            promisse.then(function (model) {
	                _this2.onPartialRefresh_(model, message, append);
	                _this2.hideLoader();
	            });
	        }
	    }, {
	        key: 'onRefresh_',
	        value: function onRefresh_(model) {
	            new this.templateClass_(model).renderTo(this.dom);
	            this.model = model;
	        }
	    }, {
	        key: 'onPartialRefresh_',
	        value: function onPartialRefresh_(model, message, append) {}
	    }, {
	        key: 'showLoader',
	        value: function showLoader() {
	            if ($('.loading-page').length == 0) {
	                var loader = '<div class="loading-page"></div>';
	                this.dom.append(loader);
	                $('.videos-container').css('opacity', '0.2');
	            }
	        }
	    }, {
	        key: 'hideLoader',
	        value: function hideLoader() {
	            var loader = this.dom.find('.loading-page');
	            if (loader.length > 0) {
	                loader.remove();
	                $('.videos-container').css('opacity', '1');
	            }
	        }
	    }, {
	        key: 'dom',
	        get: function get() {
	            return this._parentDom.find(this.viewSelector_);
	        }
	    }, {
	        key: 'viewSelector_',
	        get: function get() {
	            return '.' + this.cssClass_;
	        }
	    }, {
	        key: 'cssClass_',
	        get: function get() {} //abstract

	    }, {
	        key: 'templateClass_',
	        get: function get() {} // abstract

	    }, {
	        key: 'viewName',
	        get: function get() {
	            return this.name;
	        }
	    }]);

	    return BaseView;
	}();

	exports.default = BaseView;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _videos = __webpack_require__(11);

	var _videos2 = _interopRequireDefault(_videos);

	var _BaseTpl2 = __webpack_require__(14);

	var _BaseTpl3 = _interopRequireDefault(_BaseTpl2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VideosTpl = function (_BaseTpl) {
	    _inherits(VideosTpl, _BaseTpl);

	    function VideosTpl(data) {
	        _classCallCheck(this, VideosTpl);

	        var _this = _possibleConstructorReturn(this, (VideosTpl.__proto__ || Object.getPrototypeOf(VideosTpl)).call(this, data));

	        _this.videos = data.videos;
	        return _this;
	    }

	    _createClass(VideosTpl, [{
	        key: "jade",
	        get: function get() {
	            return _videos2.default;
	        }
	    }], [{
	        key: "renderTo",
	        value: function renderTo(data, dom, append) {
	            new VideosTpl(data).renderTo(dom, append);
	        }
	    }]);

	    return VideosTpl;
	}(_BaseTpl3.default);

	exports.default = VideosTpl;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(12);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var _jade_interp;
	  ;var locals_for_with = locals || {};(function (data, undefined) {
	    jade_mixins["Hidden"] = _jade_interp = function jade_interp(name, value) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<input type=\"hidden\"" + jade.attr("name", name, true, true) + jade.attr("value", value, true, true) + ">");
	    };
	    jade_mixins["SearchControl"] = _jade_interp = function jade_interp(value, name, placeholder) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div class=\"search-control\"><input type=\"text\"" + jade.attr("name", name, true, true) + jade.attr("value", value, true, true) + jade.attr("placeholder", placeholder, true, true) + " class=\"search-input\"><div class=\"search-glass\"></div><div class=\"close-btn clear-filter clear-search hidden\"></div></div>");
	    };

	    jade_mixins["ActionLinkButton"] = _jade_interp = function jade_interp(link, displayName) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<span class=\"chlk-button action-button\"><span><span><a" + jade.attrs(jade.merge([{ "href": jade.escape(link), "class": "action-link not-blue" }, attributes]), true) + ">" + jade.escape(null == (_jade_interp = displayName) ? "" : _jade_interp) + "</a></span></span></span>");
	    };

	    // iterate data.videos
	    ;(function () {
	      var $$obj = data.videos;
	      if ('number' == typeof $$obj.length) {

	        for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	          var item = $$obj[$index];

	          buf.push("<div class=\"announcement-item application\"><div class=\"wrapper\">");
	          jade_mixins["Hidden"]('id', item.Id);
	          buf.push("<img" + jade.attr("src", item.ThumbUrl, true, true) + "><div class=\"duration\">" + jade.escape(null == (_jade_interp = item.Duration) ? "" : _jade_interp) + "</div><div class=\"title\">" + jade.escape(null == (_jade_interp = item.ShortTitle) ? "" : _jade_interp) + "</div><div class=\"shortdesc\">" + jade.escape(null == (_jade_interp = item.ShortDescription) ? "" : _jade_interp) + "</div>");
	          jade_mixins["ActionLinkButton"].call({
	            attributes: { "class": "download-link" }
	          }, "javascript:", "Open");
	          buf.push("</div></div>");
	        }
	      } else {
	        var $$l = 0;
	        for (var $index in $$obj) {
	          $$l++;var item = $$obj[$index];

	          buf.push("<div class=\"announcement-item application\"><div class=\"wrapper\">");
	          jade_mixins["Hidden"]('id', item.Id);
	          buf.push("<img" + jade.attr("src", item.ThumbUrl, true, true) + "><div class=\"duration\">" + jade.escape(null == (_jade_interp = item.Duration) ? "" : _jade_interp) + "</div><div class=\"title\">" + jade.escape(null == (_jade_interp = item.ShortTitle) ? "" : _jade_interp) + "</div><div class=\"shortdesc\">" + jade.escape(null == (_jade_interp = item.ShortDescription) ? "" : _jade_interp) + "</div>");
	          jade_mixins["ActionLinkButton"].call({
	            attributes: { "class": "download-link" }
	          }, "javascript:", "Open");
	          buf.push("</div></div>");
	        }
	      }
	    }).call(this);
	  }).call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined, "undefined" in locals_for_with ? locals_for_with.undefined :  false ? undefined : undefined);;return buf.join("");
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(13).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _RoleEnum = __webpack_require__(15);

	var _ModeEnum = __webpack_require__(16);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseTpl = function () {
	    function BaseTpl(data) {
	        _classCallCheck(this, BaseTpl);

	        this.role = data.role;
	        this.mode = data.mode;
	    }

	    _createClass(BaseTpl, [{
	        key: 'render',
	        value: function render() {
	            return this.jade({ data: this });
	        }
	    }, {
	        key: 'renderTo',
	        value: function renderTo(dom, append) {
	            var content = this.render();
	            if (!append) {
	                dom.html(content);
	            } else {
	                dom.append(content);
	            }
	        }
	    }, {
	        key: 'isTeacherOrAdmin',
	        value: function isTeacherOrAdmin() {
	            if (!this.role) return false;

	            return this.role == _RoleEnum.RoleEnum.TEACHER || this.role == _RoleEnum.RoleEnum.ADMIN;
	        }
	    }, {
	        key: 'isAdmin',
	        value: function isAdmin() {
	            return this.role == _RoleEnum.RoleEnum.ADMIN;
	        }
	    }, {
	        key: 'isStudent',
	        value: function isStudent() {
	            if (!this.role) return false;

	            return this.role == _RoleEnum.RoleEnum.STUDENT;
	        }
	    }, {
	        key: 'isAllViewOnly',
	        value: function isAllViewOnly() {
	            return this.mode == _ModeEnum.ModeEnum.MY_VIEW;
	        }
	    }, {
	        key: 'isViewMode',
	        value: function isViewMode() {
	            return this.mode == _ModeEnum.ModeEnum.VIEW;
	        }
	    }, {
	        key: 'jade',
	        get: function get() {
	            throw new Error('Not implemented exception. jadeView method is not implemented.');
	        }
	    }]);

	    return BaseTpl;
	}();

	exports.default = BaseTpl;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var RoleEnum = exports.RoleEnum = {
	    TEACHER: "teacher",
	    STUDENT: "student",
	    ADMIN: "districtadmin"
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ModeEnum = exports.ModeEnum = {
	    EDIT: "edit",
	    VIEW: "view",
	    MY_VIEW: "myview",
	    GRADING_VIEW: "gradingview"
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _standardVideos = __webpack_require__(18);

	var _standardVideos2 = _interopRequireDefault(_standardVideos);

	var _BaseTpl2 = __webpack_require__(14);

	var _BaseTpl3 = _interopRequireDefault(_BaseTpl2);

	var _VideosTpl = __webpack_require__(10);

	var _VideosTpl2 = _interopRequireDefault(_VideosTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StandardVideosTpl = function (_BaseTpl) {
	    _inherits(StandardVideosTpl, _BaseTpl);

	    function StandardVideosTpl(data) {
	        _classCallCheck(this, StandardVideosTpl);

	        var _this = _possibleConstructorReturn(this, (StandardVideosTpl.__proto__ || Object.getPrototypeOf(StandardVideosTpl)).call(this, data));

	        _this.standardVideos = data.standardVideos;
	        return _this;
	    }

	    _createClass(StandardVideosTpl, [{
	        key: "renderVideosTpl",
	        value: function renderVideosTpl(videos) {
	            var tpl = new _VideosTpl2.default({ videos: videos });
	            var content = tpl.render();
	            return content;
	        }
	    }, {
	        key: "jade",
	        get: function get() {
	            return _standardVideos2.default;
	        }
	    }], [{
	        key: "renderTo",
	        value: function renderTo(data, dom, append) {
	            var tpl = new StandardVideosTpl(data);
	            tpl.renderTo(dom, append);
	        }
	    }]);

	    return StandardVideosTpl;
	}(_BaseTpl3.default);

	exports.default = StandardVideosTpl;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(12);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var _jade_interp3;
	  ;var locals_for_with = locals || {};(function (data, undefined) {

	    jade_mixins["SearchControl"] = _jade_interp3 = function jade_interp(value, name, placeholder) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div class=\"search-control\"><input type=\"text\"" + jade.attr("name", name, true, true) + jade.attr("value", value, true, true) + jade.attr("placeholder", placeholder, true, true) + " class=\"search-input\"><div class=\"search-glass\"></div><div class=\"close-btn clear-filter clear-search hidden\"></div></div>");
	    };
	    jade_mixins["PaginatedForm"] = _jade_interp3 = function jade_interp(name, classes, data) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<form" + jade.attrs(jade.merge([{ "name": jade.escape(name), "class": (_jade_interp3 = [true], jade.joinClasses([classes].map(jade.joinClasses).map(function (cls, i) {
	          return _jade_interp3[i] ? jade.escape(cls) : cls;
	        }))) }, attributes]), true) + ">");
	      block && block();
	      buf.push("</form>");
	    };
	    jade_mixins["CloseOpen"] = _jade_interp3 = function _jade_interp(title) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div" + jade.attrs(jade.merge([{ "class": "close-open-control co-finished co-opened finished mp-50 mp-10" }, attributes]), true) + "><h3>" + jade.escape(null == (_jade_interp3 = title) ? "" : _jade_interp3) + "<div class=\"co-open\"></div><div class=\"co-close\"></div></h3><div class=\"close-open-block\">");
	      block && block();
	      buf.push("</div></div>");
	    };

	    jade_mixins["ActionLinkButton"] = _jade_interp3 = function _jade_interp2(link, displayName) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<span class=\"chlk-button action-button\"><span><span><a" + jade.attrs(jade.merge([{ "href": jade.escape(link), "class": "action-link not-blue" }, attributes]), true) + ">" + jade.escape(null == (_jade_interp3 = displayName) ? "" : _jade_interp3) + "</a></span></span></span>");
	    };
	    jade_mixins["ActionBar"] = _jade_interp3 = function _jade_interp3() {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div class=\"action-bar\"><div class=\"items\">");
	      block && block();
	      buf.push("</div></div>");
	    };
	    jade_mixins["RenderVideos"] = _jade_interp3 = function _jade_interp3(data, resources) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push(data.renderVideosTpl(resources));
	    };
	    jade_mixins["ActionBar"].call({
	      block: function block() {
	        buf.push("<div class=\"pressed\">Recommended</div>");
	        jade_mixins["ActionLinkButton"].call({
	          attributes: { "class": "all-action" }
	        }, "javascript:", "All");
	      }
	    });
	    buf.push("<div class=\"videos-container\">");
	    if (data.standardVideos.length > 0) {
	      // iterate data.standardVideos
	      ;(function () {
	        var $$obj = data.standardVideos;
	        if ('number' == typeof $$obj.length) {

	          for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
	            var item = $$obj[index];

	            jade_mixins["CloseOpen"].call({
	              block: function block() {
	                if (item.Videos.length > 0) {
	                  jade_mixins["PaginatedForm"].call({
	                    block: function block() {
	                      buf.push("<div class=\"attachments-and-applications\">");
	                      jade_mixins["RenderVideos"](data, item.Videos);
	                      buf.push("</div>");
	                    },
	                    attributes: { "id": jade.escape(index) }
	                  }, 'recommendedForm', 'recommended-videos-form', data);
	                }
	              }
	            }, item.StandardName);
	          }
	        } else {
	          var $$l = 0;
	          for (var index in $$obj) {
	            $$l++;var item = $$obj[index];

	            jade_mixins["CloseOpen"].call({
	              block: function block() {
	                if (item.Videos.length > 0) {
	                  jade_mixins["PaginatedForm"].call({
	                    block: function block() {
	                      buf.push("<div class=\"attachments-and-applications\">");
	                      jade_mixins["RenderVideos"](data, item.Videos);
	                      buf.push("</div>");
	                    },
	                    attributes: { "id": jade.escape(index) }
	                  }, 'recommendedForm', 'recommended-videos-form', data);
	                }
	              }
	            }, item.StandardName);
	          }
	        }
	      }).call(this);
	    } else {
	      buf.push("<div class=\"no-videos\"><div class=\"title no-items-text\">There are no Recommended Videos for attached standards</div></div>");
	    }
	    buf.push("</div>");
	  }).call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined, "undefined" in locals_for_with ? locals_for_with.undefined :  false ? undefined : undefined);;return buf.join("");
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _BaseVideosView2 = __webpack_require__(8);

	var _BaseVideosView3 = _interopRequireDefault(_BaseVideosView2);

	var _AllVideosTpl = __webpack_require__(20);

	var _AllVideosTpl2 = _interopRequireDefault(_AllVideosTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AllVideosView = function (_BaseVideosView) {
	    _inherits(AllVideosView, _BaseVideosView);

	    function AllVideosView(videosController) {
	        _classCallCheck(this, AllVideosView);

	        var _this = _possibleConstructorReturn(this, (AllVideosView.__proto__ || Object.getPrototypeOf(AllVideosView)).call(this, videosController));

	        _this.name = 'AllVideosView';
	        return _this;
	    }

	    _createClass(AllVideosView, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {
	            var _this2 = this;

	            _get(AllVideosView.prototype.__proto__ || Object.getPrototypeOf(AllVideosView.prototype), 'bindEvents_', this).call(this);
	            var keypressTimeOut;
	            this.dom.on("click", ".action-bar a", function (event) {
	                _this2.controller.recommendedVideosAction();
	            }).on('input', "[name=searchQuery]", function (event) {
	                clearTimeout(keypressTimeOut);
	                keypressTimeOut = setTimeout(function () {
	                    var formSelector = $(event.target).parents(_this2.loadVideosFormSelector_);
	                    formSelector.trigger('submit');
	                }, 700);
	            });
	        }
	    }, {
	        key: 'cssClass_',
	        get: function get() {
	            return 'all-videos-page';
	        }
	    }, {
	        key: 'templateClass_',
	        get: function get() {
	            return _AllVideosTpl2.default;
	        }
	    }, {
	        key: 'loadVideosFormSelector_',
	        get: function get() {
	            return '.search-videos-form';
	        }
	    }, {
	        key: 'updateVideosSelector_',
	        get: function get() {
	            return '.attachments-and-applications';
	        }
	    }]);

	    return AllVideosView;
	}(_BaseVideosView3.default);

	exports.default = AllVideosView;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _allVideos = __webpack_require__(21);

	var _allVideos2 = _interopRequireDefault(_allVideos);

	var _BaseTpl2 = __webpack_require__(14);

	var _BaseTpl3 = _interopRequireDefault(_BaseTpl2);

	var _VideosTpl = __webpack_require__(10);

	var _VideosTpl2 = _interopRequireDefault(_VideosTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AllVideosTpl = function (_BaseTpl) {
	    _inherits(AllVideosTpl, _BaseTpl);

	    function AllVideosTpl(data) {
	        _classCallCheck(this, AllVideosTpl);

	        var _this = _possibleConstructorReturn(this, (AllVideosTpl.__proto__ || Object.getPrototypeOf(AllVideosTpl)).call(this, data));

	        _this.videos = data.videos;
	        return _this;
	    }

	    _createClass(AllVideosTpl, [{
	        key: "renderVideosTpl",
	        value: function renderVideosTpl(videos) {
	            var tpl = new _VideosTpl2.default({ videos: videos });
	            var content = tpl.render();
	            return content;
	        }
	    }, {
	        key: "jade",
	        get: function get() {
	            return _allVideos2.default;
	        }
	    }], [{
	        key: "renderTo",
	        value: function renderTo(data, dom, append) {
	            var tpl = new AllVideosTpl(data);
	            tpl.renderTo(dom, append);
	        }
	    }]);

	    return AllVideosTpl;
	}(_BaseTpl3.default);

	exports.default = AllVideosTpl;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(12);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var _jade_interp2;
	  ;var locals_for_with = locals || {};(function (data) {

	    jade_mixins["SearchControl"] = _jade_interp2 = function jade_interp(value, name, placeholder) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div class=\"search-control\"><input type=\"text\"" + jade.attr("name", name, true, true) + jade.attr("value", value, true, true) + jade.attr("placeholder", placeholder, true, true) + " class=\"search-input\"><div class=\"search-glass\"></div><div class=\"close-btn clear-filter clear-search hidden\"></div></div>");
	    };
	    jade_mixins["PaginatedForm"] = _jade_interp2 = function jade_interp(name, classes, data) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<form" + jade.attrs(jade.merge([{ "name": jade.escape(name), "class": (_jade_interp2 = [true], jade.joinClasses([classes].map(jade.joinClasses).map(function (cls, i) {
	          return _jade_interp2[i] ? jade.escape(cls) : cls;
	        }))) }, attributes]), true) + ">");
	      block && block();
	      buf.push("</form>");
	    };

	    jade_mixins["VideosFilters"] = _jade_interp2 = function _jade_interp() {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div class=\"search-filters\">");
	      jade_mixins["SearchControl"]("", "searchQuery", " Search Youtube");
	      buf.push("</div>");
	    };
	    jade_mixins["ActionLinkButton"] = _jade_interp2 = function _jade_interp(link, displayName) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<span class=\"chlk-button action-button\"><span><span><a" + jade.attrs(jade.merge([{ "href": jade.escape(link), "class": "action-link not-blue" }, attributes]), true) + ">" + jade.escape(null == (_jade_interp2 = displayName) ? "" : _jade_interp2) + "</a></span></span></span>");
	    };
	    jade_mixins["ActionBar"] = _jade_interp2 = function _jade_interp2() {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push("<div class=\"action-bar\"><div class=\"items\">");
	      block && block();
	      buf.push("</div></div>");
	    };
	    jade_mixins["RenderVideos"] = _jade_interp2 = function _jade_interp2(tpl, videos) {
	      var block = this && this.block,
	          attributes = this && this.attributes || {};
	      buf.push(tpl.renderVideosTpl(videos));
	    };
	    jade_mixins["PaginatedForm"].call({
	      block: function block() {
	        jade_mixins["VideosFilters"]();
	        jade_mixins["ActionBar"].call({
	          block: function block() {
	            if (!data.isAllViewOnly() && !data.isAdmin()) {
	              jade_mixins["ActionLinkButton"].call({
	                attributes: { "class": "all-action" }
	              }, "javascript:", "Recommended");
	            }
	            buf.push("<div class=\"pressed\">All</div>");
	          }
	        });
	        buf.push("<div class=\"videos-container\"><div class=\"attachments-and-applications\">");
	        jade_mixins["RenderVideos"](data, data.videos);
	        buf.push("</div></div>");
	      }
	    }, "searchVideosForm", 'search-videos-form', data);
	  }).call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined);;return buf.join("");
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _BaseView2 = __webpack_require__(9);

	var _BaseView3 = _interopRequireDefault(_BaseView2);

	var _VideoViewTpl = __webpack_require__(23);

	var _VideoViewTpl2 = _interopRequireDefault(_VideoViewTpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VideoView = function (_BaseView) {
	    _inherits(VideoView, _BaseView);

	    function VideoView(videosController) {
	        _classCallCheck(this, VideoView);

	        var _this = _possibleConstructorReturn(this, (VideoView.__proto__ || Object.getPrototypeOf(VideoView)).call(this, videosController));

	        _this.name = 'VideoView';
	        return _this;
	    }

	    _createClass(VideoView, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {
	            var _this2 = this;

	            _get(VideoView.prototype.__proto__ || Object.getPrototypeOf(VideoView.prototype), 'bindEvents_', this).call(this);
	            this.dom.on('click', '.cancel-button', function (event) {
	                _this2.controller.recommendedVideosAction();
	            });
	        }
	    }, {
	        key: 'cssClass_',
	        get: function get() {
	            return 'video-view-page';
	        }
	    }, {
	        key: 'templateClass_',
	        get: function get() {
	            return _VideoViewTpl2.default;
	        }
	    }]);

	    return VideoView;
	}(_BaseView3.default);

	exports.default = VideoView;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _videoView = __webpack_require__(24);

	var _videoView2 = _interopRequireDefault(_videoView);

	var _BaseTpl2 = __webpack_require__(14);

	var _BaseTpl3 = _interopRequireDefault(_BaseTpl2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VideoViewTpl = function (_BaseTpl) {
	    _inherits(VideoViewTpl, _BaseTpl);

	    function VideoViewTpl(data) {
	        _classCallCheck(this, VideoViewTpl);

	        var _this = _possibleConstructorReturn(this, (VideoViewTpl.__proto__ || Object.getPrototypeOf(VideoViewTpl)).call(this, data));

	        _this.video = data.video;
	        return _this;
	    }

	    _createClass(VideoViewTpl, [{
	        key: "jade",
	        get: function get() {
	            return _videoView2.default;
	        }
	    }], [{
	        key: "renderTo",
	        value: function renderTo(data, dom, append) {
	            new VideoViewTpl(data).renderTo(dom, append);
	        }
	    }]);

	    return VideoViewTpl;
	}(_BaseTpl3.default);

	exports.default = VideoViewTpl;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(12);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;
	  ;var locals_for_with = locals || {};(function (data) {
	    var video = data.video;
	    buf.push("<div class=\"video-content\"><h2 class=\"video-title\">" + jade.escape(null == (jade_interp = video.Title) ? "" : jade_interp) + "</h2><iframe" + jade.attr("src", video.Url, true, true) + " allowfullscreen class=\"video-iframe\"></iframe><div class=\"video-info\"><div class=\"video-author\"><b>" + jade.escape(null == (jade_interp = "Contributed by") ? "" : jade_interp) + "</b></div>" + jade.escape(null == (jade_interp = "_" + video.Author) ? "" : jade_interp) + "<div class=\"video-views-count\"><b>" + jade.escape(null == (jade_interp = video.Views + " views") ? "" : jade_interp) + "</b></div><div class=\"video-description\"><span>" + jade.escape(null == (jade_interp = 'Description:') ? "" : jade_interp) + "</span><span>" + jade.escape(null == (jade_interp = video.Description) ? "" : jade_interp) + "</span></div></div></div><div class=\"video-view-footer\">");
	    if (data.isTeacherOrAdmin() && !data.isViewMode()) {
	      buf.push("<button name=\"Cancel\" class=\"cancel-button\">" + jade.escape(null == (jade_interp = "Cancel") ? "" : jade_interp) + "</button>");
	    }
	    buf.push("</div>");
	  }).call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined);;return buf.join("");
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseControl = function () {
	    function BaseControl() {
	        _classCallCheck(this, BaseControl);

	        this.bindEvents_();
	    }

	    _createClass(BaseControl, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {}
	    }, {
	        key: 'dom',
	        get: function get() {
	            return $('body');
	        }
	    }]);

	    return BaseControl;
	}();

	var ENTER_KEY = 13;

	var SearchControl = exports.SearchControl = function (_BaseControl) {
	    _inherits(SearchControl, _BaseControl);

	    function SearchControl() {
	        _classCallCheck(this, SearchControl);

	        return _possibleConstructorReturn(this, (SearchControl.__proto__ || Object.getPrototypeOf(SearchControl)).apply(this, arguments));
	    }

	    _createClass(SearchControl, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {
	            _get(SearchControl.prototype.__proto__ || Object.getPrototypeOf(SearchControl.prototype), 'bindEvents_', this).call(this);
	            this.dom.on('input', 'input', function (event) {
	                var target = $(event.target);
	                if ($(event.target).val().length == 0) target.parent().find('.clear-filter').addClass('hidden');else target.parent().find('.clear-filter').removeClass('hidden');
	            }).on('keypress', 'input', function (event) {
	                var keyCode = event.which || event.keyCode; //depends on browser
	                if (keyCode == ENTER_KEY) event.preventDefault();
	            }).on('click', '.clear-filter', function (event) {
	                var node = $(event.target).parent().find('input');
	                node.val('');
	                node.trigger('input');
	            });
	        }
	    }]);

	    return SearchControl;
	}(BaseControl);

	var CloseOpenControl = exports.CloseOpenControl = function (_BaseControl2) {
	    _inherits(CloseOpenControl, _BaseControl2);

	    function CloseOpenControl() {
	        _classCallCheck(this, CloseOpenControl);

	        return _possibleConstructorReturn(this, (CloseOpenControl.__proto__ || Object.getPrototypeOf(CloseOpenControl)).apply(this, arguments));
	    }

	    _createClass(CloseOpenControl, [{
	        key: 'bindEvents_',
	        value: function bindEvents_() {
	            _get(CloseOpenControl.prototype.__proto__ || Object.getPrototypeOf(CloseOpenControl.prototype), 'bindEvents_', this).call(this);
	            this.dom.on('click', '.co-open, .co-close', function (event) {
	                var timeout;
	                var node = $(event.target).parents('.close-open-control');
	                var closeOpenBlock = node.find('.close-open-block');
	                timeout && clearTimeout(timeout);
	                if (node.hasClass('co-opened')) {
	                    closeOpenBlock.css('height', 0);
	                    node.removeClass('co-opened');
	                } else {
	                    closeOpenBlock.css('height', 'auto');
	                    node.addClass('co-opened');
	                }
	                timeout = setTimeout(function () {
	                    return node.addClass('co-finished');
	                }, 200);
	            });
	        }
	    }]);

	    return CloseOpenControl;
	}(BaseControl);

	var YoutubeControls = function () {
	    function YoutubeControls() {
	        _classCallCheck(this, YoutubeControls);
	    }

	    _createClass(YoutubeControls, null, [{
	        key: 'Create',
	        value: function Create() {
	            return {
	                SearchControl: new SearchControl(),
	                CloseOpenControl: new CloseOpenControl()
	            };
	        }
	    }]);

	    return YoutubeControls;
	}();

	exports.default = YoutubeControls;

/***/ }
/******/ ]);