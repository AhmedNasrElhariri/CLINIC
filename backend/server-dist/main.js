/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./src";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@casl/ability/dist/es5m/index.js":
/*!********************************************************!*\
  !*** ../node_modules/@casl/ability/dist/es5m/index.js ***!
  \********************************************************/
/*! exports provided: Ability, AbilityBuilder, ForbiddenError, PureAbility, buildMongoQueryMatcher, createAliasResolver, defineAbility, detectSubjectType, fieldPatternMatcher, getDefaultErrorMessage, mongoQueryMatcher, subject, wrapArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ability\", function() { return q; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbilityBuilder\", function() { return B; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ForbiddenError\", function() { return G; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PureAbility\", function() { return E; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildMongoQueryMatcher\", function() { return x; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createAliasResolver\", function() { return $; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defineAbility\", function() { return D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detectSubjectType\", function() { return g; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fieldPatternMatcher\", function() { return F; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDefaultErrorMessage\", function() { return P; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mongoQueryMatcher\", function() { return M; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"subject\", function() { return w; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wrapArray\", function() { return p; });\n/* harmony import */ var sift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sift */ \"../node_modules/sift/es5m/index.js\");\nfunction d(){return(d=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function y(t,i){t.prototype=Object.create(i.prototype),t.prototype.constructor=t,t.__proto__=i}function p(t){return Array.isArray(t)?t:[t]}var b=\"__caslSubjectType__\";function w(t,i){if(i)if(i.hasOwnProperty(b)){if(t!==i[b])throw new Error(\"Trying to cast object to subject type \"+t+\" but previously it was casted to \"+i[b])}else Object.defineProperty(i,b,{value:t});return i}function g(t){if(!t)return\"all\";if(\"string\"==typeof t)return t;if(t.hasOwnProperty(b))return t[b];var i=\"function\"==typeof t?t:t.constructor;return i.modelName||i.name}var j=function(t){return t};function $(t){return true&&function(t){if(t.manage)throw new Error('Cannot add alias for \"manage\" action because it is reserved');Object.keys(t).forEach((function(i){if(i===t[i]||Array.isArray(t[i])&&(-1!==t[i].indexOf(i)||-1!==t[i].indexOf(\"manage\")))throw new Error(\"Attempt to alias action to itself: \"+i+\" -> \"+t[i])}))}(t),function(i){return function(t,i){for(var n=p(i),r=0;r<n.length;){var e=n[r++];t.hasOwnProperty(e)&&(n=n.concat(t[e]))}return n}(t,i)}}var O=function(){function t(t,i){this.t=void 0,this.i=void 0,this.action=i.resolveAction(t.actions||t.action),this.subject=t.subject,this.inverted=!!t.inverted,this.conditions=t.conditions,this.reason=t.reason,this.fields=t.fields&&0!==t.fields.length?p(t.fields):void 0,\"actions\"in t&&console.warn(\"Rule `actions` field is deprecated. Use `action` field instead\"),this.conditions&&i.conditionsMatcher&&(this.t=i.conditionsMatcher(this.conditions)),this.fields&&i.fieldMatcher&&(this.i=i.fieldMatcher(this.fields))}var i=t.prototype;return i.matchesConditions=function(t){return!this.t||(t&&\"string\"!=typeof t&&\"function\"!=typeof t?this.t(t):!this.inverted)},i.matchesField=function(t){return!this.i||(t?this.i(t):!this.inverted)},t}(),m=function(){function t(t){this.o=void 0,this.s=!1,this.u=!1,this.o=t,this.h=this.h.bind(this)}var i=t.prototype;return i.h=function(t){var i=t.fields,n=t.inverted;this.o=this.o&&!!n,this.u||!Array.isArray(i)||i.length||(this.u=!0),!this.s&&i&&i.length&&(this.s=!0)},i.l=function(t){if(this.o&&console.warn(\"Make sure your ability has direct rules, not only inverted ones. Otherwise `ability.can` will always return `false`.\"),this.u&&console.warn(\"[error in next major version]: There are rules with `fields` property being an empty array. This results in the same as not passing fields at all. Make sure to remove empty array or pass fields.\"),this.s&&!t.fieldMatcher)throw new Error('Field level restrictions are ignored because \"fieldMatcher\" option is not specified. Did you unintentionally used PureAbility instead of Ability?')},t}(),E=function(){function t(t,i){var n=this;void 0===t&&(t=[]),void 0===i&&(i={}),this.s=!1,this.v={},this.p=Object.create(null),this.g={},this.j=[],this.$={conditionsMatcher:i.conditionsMatcher,fieldMatcher:i.fieldMatcher,resolveAction:i.resolveAction||j},Object.defineProperty(this,\"detectSubjectType\",{value:i.detectSubjectType||i.subjectName||g}),Object.defineProperty(this,\"rules\",{get:function(){return n.j}}),this.update(t)}var i=t.prototype;return i.update=function(t){var i={rules:t,ability:this};this.O(\"update\",i),this.v=Object.create(null);var n=new m(t.length>0),r=this.m(t,n.h);return n.l(this.$),this.g=r,this.j=t,this.s=n.s,this.O(\"updated\",i),this},i.m=function(t,i){void 0===i&&(i=j);for(var n=Object.create(null),r=0;r<t.length;r++){i(t[r],r);for(var e=new O(t[r],this.$),o=t.length-r-1,s=p(e.action),u=p(e.subject),a=0;a<u.length;a++){var h=this.detectSubjectType(u[a]);n[h]=n[h]||Object.create(null);for(var c=0;c<s.length;c++){var f=s[c];n[h][f]=n[h][f]||Object.create(null),n[h][f][o]=e}}}return n},i.can=function(){var t=this.relevantRuleFor.apply(this,arguments);return!!t&&!t.inverted},i.relevantRuleFor=function(){for(var t=this.rulesFor.apply(this,arguments),i=arguments.length<=1?void 0:arguments[1],n=0;n<t.length;n++)if(t[n].matchesConditions(i))return t[n];return null},i.possibleRulesFor=function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];var r=i[0],e=i[1],o=this.detectSubjectType(e),s=this.v,u=o+\"_\"+r;return s[u]||(s[u]=this.A(r,o)),s[u]},i.A=function(t,i){var n=this;return(\"all\"===i?[i]:[i,\"all\"]).reduce((function(i,r){var e=n.g[r];return e?Object.assign(i,e[t],e.manage):i}),[]).filter(Boolean)},i.rulesFor=function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];var r=i[0],e=i[1],o=i[2],s=this.possibleRulesFor(r,e);if(o&&\"string\"!=typeof o)throw new Error(\"The 3rd, `field` parameter is expected to be a string. See https://stalniy.github.io/casl/en/api/casl-ability#can-of-pure-ability for details\");return this.s?s.filter((function(t){return t.matchesField(o)})):s},i.cannot=function(){return!this.can.apply(this,arguments)},i.on=function(t,i){var n=this.p,r=!0;return n[t]||(n[t]=[]),n[t].push(i),function(){if(r){var e=n[t].indexOf(i);n[t].splice(e,1),r=!1}}},i.O=function(t,i){var n=this.p[t];n&&n.slice(0).forEach((function(t){return t(i)}))},t}(),A={$eq:sift__WEBPACK_IMPORTED_MODULE_0__[\"$eq\"],$ne:sift__WEBPACK_IMPORTED_MODULE_0__[\"$ne\"],$lt:sift__WEBPACK_IMPORTED_MODULE_0__[\"$lt\"],$lte:sift__WEBPACK_IMPORTED_MODULE_0__[\"$lte\"],$gt:sift__WEBPACK_IMPORTED_MODULE_0__[\"$gt\"],$gte:sift__WEBPACK_IMPORTED_MODULE_0__[\"$gte\"],$in:sift__WEBPACK_IMPORTED_MODULE_0__[\"$in\"],$nin:sift__WEBPACK_IMPORTED_MODULE_0__[\"$nin\"],$all:sift__WEBPACK_IMPORTED_MODULE_0__[\"$all\"],$size:sift__WEBPACK_IMPORTED_MODULE_0__[\"$size\"],$regex:sift__WEBPACK_IMPORTED_MODULE_0__[\"$regex\"],$elemMatch:sift__WEBPACK_IMPORTED_MODULE_0__[\"$elemMatch\"],$exists:sift__WEBPACK_IMPORTED_MODULE_0__[\"$exists\"]};function x(i){var n={operations:d({},A,i)};return function(i){return Object(sift__WEBPACK_IMPORTED_MODULE_0__[\"createQueryTester\"])(i,n)}}var M=x({}),T=/[-/\\\\^$+?.()|[\\]{}]/g,_=/\\.?\\*+\\.?/g,R=/\\*+/,S=/\\./g;function k(t,i,n){var r=\"*\"===n[0]||\".\"===t[0]&&\".\"===t[t.length-1]?\"+\":\"*\",e=-1===t.indexOf(\"**\")?\"[^.]\":\".\",o=t.replace(S,\"\\\\$&\").replace(R,e+r);return i+t.length===n.length?\"(?:\"+o+\")?\":o}function C(t,i,n){return\".\"!==t||\"*\"!==n[i-1]&&\"*\"!==n[i+1]?\"\\\\\"+t:t}var F=function(t){var i;return function(n){return void 0===i&&(i=-1===t.join(\"\").indexOf(\"*\")?null:function(t){var i=t.map((function(t){return t.replace(T,C).replace(_,k)})),n=i.length>1?\"(?:\"+i.join(\"|\")+\")\":i[0];return new RegExp(\"^\"+n+\"$\")}(t)),null===i||-1!==n.indexOf(\"*\")?-1!==t.indexOf(n):i.test(n)}},q=function(t){function i(i,n){return t.call(this,i,d({conditionsMatcher:M,fieldMatcher:F},n))||this}return y(i,t),i}(E),z=function(){function t(t){this.rule=t}return t.prototype.because=function(t){return this.rule.reason=t,this},t}(),B=function(){function t(t){void 0===t&&(t=E),this.rules=[],this.M=t;this.can=this.can.bind(this),this.cannot=this.cannot.bind(this),this.build=this.build.bind(this)}var i=t.prototype;return i.can=function(t,i,n,r){var e={action:t};return i&&(e.subject=i,Array.isArray(n)||\"string\"==typeof n?e.fields=n:void 0!==n&&(e.conditions=n),void 0!==r&&(e.conditions=r)),this.rules.push(e),new z(e)},i.cannot=function(t,i,n,r){var e=this.can(t,i,n,r);return e.rule.inverted=!0,e},i.build=function(t){return new this.M(this.rules,t)},t}();function D(t,i){var n,r;if(\"function\"==typeof t)r=t,n={};else{if(\"function\"!=typeof i)throw new Error(\"`defineAbility` expects to receive either options and dsl function or only dsl function\");n=t,r=i}var e=new B(q),o=r(e.can,e.cannot);return o&&\"function\"==typeof o.then?o.then((function(){return e.build(n)})):e.build(n)}var P=function(t){return'Cannot execute \"'+t.action+'\" on \"'+t.subjectType+'\"'},U=function(t){this.message=t};U.prototype=Object.create(Error.prototype);var G=function(t){function i(i){var n;return(n=t.call(this,\"\")||this).ability=void 0,n.field=void 0,n.ability=i,\"function\"==typeof Error.captureStackTrace&&(n.name=\"ForbiddenError\",Error.captureStackTrace(function(t){if(void 0===t)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return t}(n),n.constructor)),n}y(i,t),i.setDefaultMessage=function(t){this.T=\"string\"==typeof t?function(){return t}:t},i.from=function(t){return new this(t)};var n=i.prototype;return n.setMessage=function(t){return this.message=t,this},n.throwUnlessCan=function(){var t,i=(t=this.ability).relevantRuleFor.apply(t,arguments);if(!i||i.inverted){this.action=arguments.length<=0?void 0:arguments[0],this.subject=arguments.length<=1?void 0:arguments[1],this.subjectType=this.ability.detectSubjectType(arguments.length<=1?void 0:arguments[1]),this.field=arguments.length<=2?void 0:arguments[2];var n=i?i.reason:\"\";throw this.message=this.message||n||this.constructor.T(this),this}},i}(U);G.T=P;\n//# sourceMappingURL=index.js.map\n\n\n//# sourceURL=webpack:///../node_modules/@casl/ability/dist/es5m/index.js?");

/***/ }),

/***/ "../node_modules/sift/es5m/index.js":
/*!******************************************!*\
  !*** ../node_modules/sift/es5m/index.js ***!
  \******************************************/
/*! exports provided: default, $all, $and, $elemMatch, $eq, $exists, $gt, $gte, $in, $lt, $lte, $mod, $ne, $nin, $nor, $not, $options, $or, $regex, $size, $type, $where, EqualsOperation, createDefaultQueryOperation, createEqualsOperation, createOperationTester, createQueryOperation, createQueryTester */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$all\", function() { return $all; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$and\", function() { return $and; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$elemMatch\", function() { return $elemMatch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$eq\", function() { return $eq; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$exists\", function() { return $exists; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$gt\", function() { return $gt; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$gte\", function() { return $gte; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$in\", function() { return $in; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$lt\", function() { return $lt; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$lte\", function() { return $lte; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$mod\", function() { return $mod; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$ne\", function() { return $ne; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$nin\", function() { return $nin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$nor\", function() { return $nor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$not\", function() { return $not; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$options\", function() { return $options; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$or\", function() { return $or; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$regex\", function() { return $regex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$size\", function() { return $size; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$type\", function() { return $type; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$where\", function() { return $where; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EqualsOperation\", function() { return EqualsOperation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createDefaultQueryOperation\", function() { return createDefaultQueryOperation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEqualsOperation\", function() { return createEqualsOperation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createOperationTester\", function() { return createOperationTester; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createQueryOperation\", function() { return createQueryOperation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createQueryTester\", function() { return createQueryTester; });\n/*! *****************************************************************************\r\nCopyright (c) Microsoft Corporation.\r\n\r\nPermission to use, copy, modify, and/or distribute this software for any\r\npurpose with or without fee is hereby granted.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\r\nREGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\r\nAND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\r\nINDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\r\nLOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\r\nOTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\r\nPERFORMANCE OF THIS SOFTWARE.\r\n***************************************************************************** */\r\n/* global Reflect, Promise */\r\n\r\nvar extendStatics = function(d, b) {\r\n    extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n    return extendStatics(d, b);\r\n};\r\n\r\nfunction __extends(d, b) {\r\n    extendStatics(d, b);\r\n    function __() { this.constructor = d; }\r\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n}\n\nvar typeChecker = function (type) {\n    var typeString = \"[object \" + type + \"]\";\n    return function (value) {\n        return getClassName(value) === typeString;\n    };\n};\nvar getClassName = function (value) { return Object.prototype.toString.call(value); };\nvar comparable = function (value) {\n    if (value instanceof Date) {\n        return value.getTime();\n    }\n    else if (isArray(value)) {\n        return value.map(comparable);\n    }\n    else if (value && typeof value.toJSON === \"function\") {\n        return value.toJSON();\n    }\n    return value;\n};\nvar isArray = typeChecker(\"Array\");\nvar isObject = typeChecker(\"Object\");\nvar isFunction = typeChecker(\"Function\");\nvar isVanillaObject = function (value) {\n    return (value &&\n        (value.constructor === Object ||\n            value.constructor === Array ||\n            value.constructor.toString() === \"function Object() { [native code] }\" ||\n            value.constructor.toString() === \"function Array() { [native code] }\") &&\n        !value.toJSON);\n};\nvar equals = function (a, b) {\n    if (a == null && a == b) {\n        return true;\n    }\n    if (a === b) {\n        return true;\n    }\n    if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {\n        return false;\n    }\n    if (isArray(a)) {\n        if (a.length !== b.length) {\n            return false;\n        }\n        for (var i = 0, length_1 = a.length; i < length_1; i++) {\n            if (!equals(a[i], b[i]))\n                return false;\n        }\n        return true;\n    }\n    else if (isObject(a)) {\n        if (Object.keys(a).length !== Object.keys(b).length) {\n            return false;\n        }\n        for (var key in a) {\n            if (!equals(a[key], b[key]))\n                return false;\n        }\n        return true;\n    }\n    return false;\n};\n\n/**\n * Walks through each value given the context - used for nested operations. E.g:\n * { \"person.address\": { $eq: \"blarg\" }}\n */\nvar walkKeyPathValues = function (item, keyPath, next, depth, key, owner) {\n    var currentKey = keyPath[depth];\n    // if array, then try matching. Might fall through for cases like:\n    // { $eq: [1, 2, 3] }, [ 1, 2, 3 ].\n    if (isArray(item) && isNaN(Number(currentKey))) {\n        for (var i = 0, length_1 = item.length; i < length_1; i++) {\n            // if FALSE is returned, then terminate walker. For operations, this simply\n            // means that the search critera was met.\n            if (!walkKeyPathValues(item[i], keyPath, next, depth, i, item)) {\n                return false;\n            }\n        }\n    }\n    if (depth === keyPath.length || item == null) {\n        return next(item, key, owner);\n    }\n    return walkKeyPathValues(item[currentKey], keyPath, next, depth + 1, currentKey, item);\n};\nvar BaseOperation = /** @class */ (function () {\n    function BaseOperation(params, owneryQuery, options) {\n        this.params = params;\n        this.owneryQuery = owneryQuery;\n        this.options = options;\n        this.init();\n    }\n    BaseOperation.prototype.init = function () { };\n    BaseOperation.prototype.reset = function () {\n        this.done = false;\n        this.success = false;\n    };\n    return BaseOperation;\n}());\nvar NamedBaseOperation = /** @class */ (function (_super) {\n    __extends(NamedBaseOperation, _super);\n    function NamedBaseOperation(params, owneryQuery, options, name) {\n        var _this = _super.call(this, params, owneryQuery, options) || this;\n        _this.name = name;\n        return _this;\n    }\n    return NamedBaseOperation;\n}(BaseOperation));\nvar GroupOperation = /** @class */ (function (_super) {\n    __extends(GroupOperation, _super);\n    function GroupOperation(params, owneryQuery, options, children) {\n        var _this = _super.call(this, params, owneryQuery, options) || this;\n        _this.children = children;\n        return _this;\n    }\n    /**\n     */\n    GroupOperation.prototype.reset = function () {\n        this.success = false;\n        this.done = false;\n        for (var i = 0, length_2 = this.children.length; i < length_2; i++) {\n            this.children[i].reset();\n        }\n    };\n    /**\n     */\n    GroupOperation.prototype.childrenNext = function (item, key, owner) {\n        var done = true;\n        var success = true;\n        for (var i = 0, length_3 = this.children.length; i < length_3; i++) {\n            var childOperation = this.children[i];\n            childOperation.next(item, key, owner);\n            if (!childOperation.success) {\n                success = false;\n            }\n            if (childOperation.done) {\n                if (!childOperation.success) {\n                    break;\n                }\n            }\n            else {\n                done = false;\n            }\n        }\n        // console.log(\"DONE\", this.params, done, success);\n        this.done = done;\n        this.success = success;\n    };\n    return GroupOperation;\n}(BaseOperation));\nvar NamedGroupOperation = /** @class */ (function (_super) {\n    __extends(NamedGroupOperation, _super);\n    function NamedGroupOperation(params, owneryQuery, options, children, name) {\n        var _this = _super.call(this, params, owneryQuery, options, children) || this;\n        _this.name = name;\n        return _this;\n    }\n    return NamedGroupOperation;\n}(GroupOperation));\nvar QueryOperation = /** @class */ (function (_super) {\n    __extends(QueryOperation, _super);\n    function QueryOperation() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    /**\n     */\n    QueryOperation.prototype.next = function (item, key, parent) {\n        this.childrenNext(item, key, parent);\n    };\n    return QueryOperation;\n}(GroupOperation));\nvar NestedOperation = /** @class */ (function (_super) {\n    __extends(NestedOperation, _super);\n    function NestedOperation(keyPath, params, owneryQuery, options, children) {\n        var _this = _super.call(this, params, owneryQuery, options, children) || this;\n        _this.keyPath = keyPath;\n        /**\n         */\n        _this._nextNestedValue = function (value, key, owner) {\n            _this.childrenNext(value, key, owner);\n            return !_this.done;\n        };\n        return _this;\n    }\n    /**\n     */\n    NestedOperation.prototype.next = function (item, key, parent) {\n        walkKeyPathValues(item, this.keyPath, this._nextNestedValue, 0, key, parent);\n    };\n    return NestedOperation;\n}(GroupOperation));\nvar createTester = function (a, compare) {\n    if (a instanceof Function) {\n        return a;\n    }\n    if (a instanceof RegExp) {\n        return function (b) {\n            var result = typeof b === \"string\" && a.test(b);\n            a.lastIndex = 0;\n            return result;\n        };\n    }\n    var comparableA = comparable(a);\n    return function (b) { return compare(comparableA, comparable(b)); };\n};\nvar EqualsOperation = /** @class */ (function (_super) {\n    __extends(EqualsOperation, _super);\n    function EqualsOperation() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    EqualsOperation.prototype.init = function () {\n        this._test = createTester(this.params, this.options.compare);\n    };\n    EqualsOperation.prototype.next = function (item, key, parent) {\n        if (this._test(item, key, parent) &&\n            (!parent || parent.hasOwnProperty(key))) {\n            this.done = true;\n            this.success = true;\n        }\n    };\n    return EqualsOperation;\n}(BaseOperation));\nvar createEqualsOperation = function (params, owneryQuery, options) { return new EqualsOperation(params, owneryQuery, options); };\nvar NopeOperation = /** @class */ (function (_super) {\n    __extends(NopeOperation, _super);\n    function NopeOperation() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    NopeOperation.prototype.next = function () {\n        this.done = true;\n        this.success = false;\n    };\n    return NopeOperation;\n}(BaseOperation));\nvar numericalOperationCreator = function (createNumericalOperation) { return function (params, owneryQuery, options, name) {\n    if (params == null) {\n        return new NopeOperation(params, owneryQuery, options);\n    }\n    return createNumericalOperation(params, owneryQuery, options, name);\n}; };\nvar numericalOperation = function (createTester) {\n    return numericalOperationCreator(function (params, owneryQuery, options) {\n        var typeofParams = typeof comparable(params);\n        var test = createTester(params);\n        return new EqualsOperation(function (b) {\n            return typeof comparable(b) === typeofParams && test(b);\n        }, owneryQuery, options);\n    });\n};\nvar createNamedOperation = function (name, params, parentQuery, options) {\n    var operationCreator = options.operations[name];\n    if (!operationCreator) {\n        throw new Error(\"Unsupported operation: \" + name);\n    }\n    return operationCreator(params, parentQuery, options, name);\n};\nvar containsOperation = function (query) {\n    for (var key in query) {\n        if (key.charAt(0) === \"$\")\n            return true;\n    }\n    return false;\n};\nvar createNestedOperation = function (keyPath, nestedQuery, owneryQuery, options) {\n    if (containsOperation(nestedQuery)) {\n        var _a = createQueryOperations(nestedQuery, options), selfOperations = _a[0], nestedOperations = _a[1];\n        if (nestedOperations.length) {\n            throw new Error(\"Property queries must contain only operations, or exact objects.\");\n        }\n        return new NestedOperation(keyPath, nestedQuery, owneryQuery, options, selfOperations);\n    }\n    return new NestedOperation(keyPath, nestedQuery, owneryQuery, options, [\n        new EqualsOperation(nestedQuery, owneryQuery, options)\n    ]);\n};\nvar createQueryOperation = function (query, owneryQuery, _a) {\n    if (owneryQuery === void 0) { owneryQuery = null; }\n    var _b = _a === void 0 ? {} : _a, compare = _b.compare, operations = _b.operations;\n    var options = {\n        compare: compare || equals,\n        operations: Object.assign({}, operations || {})\n    };\n    var _c = createQueryOperations(query, options), selfOperations = _c[0], nestedOperations = _c[1];\n    var ops = [];\n    if (selfOperations.length) {\n        ops.push(new NestedOperation([], query, owneryQuery, options, selfOperations));\n    }\n    ops.push.apply(ops, nestedOperations);\n    if (ops.length === 1) {\n        return ops[0];\n    }\n    return new QueryOperation(query, owneryQuery, options, ops);\n};\nvar createQueryOperations = function (query, options) {\n    var selfOperations = [];\n    var nestedOperations = [];\n    if (!isVanillaObject(query)) {\n        selfOperations.push(new EqualsOperation(query, query, options));\n        return [selfOperations, nestedOperations];\n    }\n    for (var key in query) {\n        if (key.charAt(0) === \"$\") {\n            var op = createNamedOperation(key, query[key], query, options);\n            // probably just a flag for another operation (like $options)\n            if (op != null) {\n                selfOperations.push(op);\n            }\n        }\n        else {\n            nestedOperations.push(createNestedOperation(key.split(\".\"), query[key], query, options));\n        }\n    }\n    return [selfOperations, nestedOperations];\n};\nvar createOperationTester = function (operation) { return function (item, key, owner) {\n    operation.reset();\n    operation.next(item, key, owner);\n    return operation.success;\n}; };\nvar createQueryTester = function (query, options) {\n    if (options === void 0) { options = {}; }\n    return createOperationTester(createQueryOperation(query, null, options));\n};\n\nvar $Ne = /** @class */ (function (_super) {\n    __extends($Ne, _super);\n    function $Ne() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $Ne.prototype.init = function () {\n        this._test = createTester(this.params, this.options.compare);\n    };\n    $Ne.prototype.reset = function () {\n        _super.prototype.reset.call(this);\n        this.success = true;\n    };\n    $Ne.prototype.next = function (item) {\n        if (this._test(item)) {\n            this.done = true;\n            this.success = false;\n        }\n    };\n    return $Ne;\n}(NamedBaseOperation));\n// https://docs.mongodb.com/manual/reference/operator/query/elemMatch/\nvar $ElemMatch = /** @class */ (function (_super) {\n    __extends($ElemMatch, _super);\n    function $ElemMatch() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $ElemMatch.prototype.init = function () {\n        this._queryOperation = createQueryOperation(this.params, this.owneryQuery, this.options);\n    };\n    $ElemMatch.prototype.reset = function () {\n        this._queryOperation.reset();\n    };\n    $ElemMatch.prototype.next = function (item, key, owner) {\n        this._queryOperation.reset();\n        if (isArray(owner)) {\n            this._queryOperation.next(item, key, owner);\n            this.done =\n                this.done || this._queryOperation.done || key === owner.length - 1;\n            this.success = this.success || this._queryOperation.success;\n        }\n        else {\n            this.done = true;\n            this.success = false;\n        }\n    };\n    return $ElemMatch;\n}(NamedBaseOperation));\nvar $Not = /** @class */ (function (_super) {\n    __extends($Not, _super);\n    function $Not() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $Not.prototype.init = function () {\n        this._queryOperation = createQueryOperation(this.params, this.owneryQuery, this.options);\n    };\n    $Not.prototype.reset = function () {\n        this._queryOperation.reset();\n    };\n    $Not.prototype.next = function (item, key, owner) {\n        this._queryOperation.next(item, key, owner);\n        this.done = this._queryOperation.done;\n        this.success = !this._queryOperation.success;\n    };\n    return $Not;\n}(NamedBaseOperation));\nvar $Or = /** @class */ (function (_super) {\n    __extends($Or, _super);\n    function $Or() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $Or.prototype.init = function () {\n        var _this = this;\n        this._ops = this.params.map(function (op) {\n            return createQueryOperation(op, null, _this.options);\n        });\n    };\n    $Or.prototype.reset = function () {\n        this.done = false;\n        this.success = false;\n        for (var i = 0, length_1 = this._ops.length; i < length_1; i++) {\n            this._ops[i].reset();\n        }\n    };\n    $Or.prototype.next = function (item, key, owner) {\n        var done = false;\n        var success = false;\n        for (var i = 0, length_2 = this._ops.length; i < length_2; i++) {\n            var op = this._ops[i];\n            op.next(item, key, owner);\n            if (op.success) {\n                done = true;\n                success = op.success;\n                break;\n            }\n        }\n        this.success = success;\n        this.done = done;\n    };\n    return $Or;\n}(NamedBaseOperation));\nvar $Nor = /** @class */ (function (_super) {\n    __extends($Nor, _super);\n    function $Nor() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $Nor.prototype.next = function (item, key, owner) {\n        _super.prototype.next.call(this, item, key, owner);\n        this.success = !this.success;\n    };\n    return $Nor;\n}($Or));\nvar $In = /** @class */ (function (_super) {\n    __extends($In, _super);\n    function $In() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $In.prototype.init = function () {\n        var _this = this;\n        this._testers = this.params.map(function (value) {\n            if (containsOperation(value)) {\n                throw new Error(\"cannot nest $ under \" + _this.constructor.name.toLowerCase());\n            }\n            return createTester(value, _this.options.compare);\n        });\n    };\n    $In.prototype.next = function (item, key, owner) {\n        var done = false;\n        var success = false;\n        for (var i = 0, length_3 = this._testers.length; i < length_3; i++) {\n            var test = this._testers[i];\n            if (test(item)) {\n                done = true;\n                success = true;\n                break;\n            }\n        }\n        this.success = success;\n        this.done = done;\n    };\n    return $In;\n}(NamedBaseOperation));\nvar $Nin = /** @class */ (function (_super) {\n    __extends($Nin, _super);\n    function $Nin() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $Nin.prototype.next = function (item, key, owner) {\n        _super.prototype.next.call(this, item, key, owner);\n        this.success = !this.success;\n    };\n    return $Nin;\n}($In));\nvar $Exists = /** @class */ (function (_super) {\n    __extends($Exists, _super);\n    function $Exists() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    $Exists.prototype.next = function (item, key, owner) {\n        if (owner.hasOwnProperty(key) === this.params) {\n            this.done = true;\n            this.success = true;\n        }\n    };\n    return $Exists;\n}(NamedBaseOperation));\nvar $And = /** @class */ (function (_super) {\n    __extends($And, _super);\n    function $And(params, owneryQuery, options, name) {\n        return _super.call(this, params, owneryQuery, options, params.map(function (query) { return createQueryOperation(query, owneryQuery, options); }), name) || this;\n    }\n    $And.prototype.next = function (item, key, owner) {\n        this.childrenNext(item, key, owner);\n    };\n    return $And;\n}(NamedGroupOperation));\nvar $eq = function (params, owneryQuery, options) {\n    return new EqualsOperation(params, owneryQuery, options);\n};\nvar $ne = function (params, owneryQuery, options, name) { return new $Ne(params, owneryQuery, options, name); };\nvar $or = function (params, owneryQuery, options, name) { return new $Or(params, owneryQuery, options, name); };\nvar $nor = function (params, owneryQuery, options, name) { return new $Nor(params, owneryQuery, options, name); };\nvar $elemMatch = function (params, owneryQuery, options, name) { return new $ElemMatch(params, owneryQuery, options, name); };\nvar $nin = function (params, owneryQuery, options, name) { return new $Nin(params, owneryQuery, options, name); };\nvar $in = function (params, owneryQuery, options, name) { return new $In(params, owneryQuery, options, name); };\nvar $lt = numericalOperation(function (params) { return function (b) { return b < params; }; });\nvar $lte = numericalOperation(function (params) { return function (b) { return b <= params; }; });\nvar $gt = numericalOperation(function (params) { return function (b) { return b > params; }; });\nvar $gte = numericalOperation(function (params) { return function (b) { return b >= params; }; });\nvar $mod = function (_a, owneryQuery, options) {\n    var mod = _a[0], equalsValue = _a[1];\n    return new EqualsOperation(function (b) { return comparable(b) % mod === equalsValue; }, owneryQuery, options);\n};\nvar $exists = function (params, owneryQuery, options, name) { return new $Exists(params, owneryQuery, options, name); };\nvar $regex = function (pattern, owneryQuery, options) {\n    return new EqualsOperation(new RegExp(pattern, owneryQuery.$options), owneryQuery, options);\n};\nvar $not = function (params, owneryQuery, options, name) { return new $Not(params, owneryQuery, options, name); };\nvar $type = function (clazz, owneryQuery, options) {\n    return new EqualsOperation(function (b) { return (b != null ? b instanceof clazz || b.constructor === clazz : false); }, owneryQuery, options);\n};\nvar $and = function (params, ownerQuery, options, name) { return new $And(params, ownerQuery, options, name); };\nvar $all = $and;\nvar $size = function (params, ownerQuery, options) { return new EqualsOperation(function (b) { return b && b.length === params; }, ownerQuery, options); };\nvar $options = function () { return null; };\nvar $where = function (params, ownerQuery, options) {\n    var test;\n    if (isFunction(params)) {\n        test = params;\n    }\n    else if (!process.env.CSP_ENABLED) {\n        test = new Function(\"obj\", \"return \" + params);\n    }\n    else {\n        throw new Error(\"In CSP mode, sift does not support strings in \\\"$where\\\" condition\");\n    }\n    return new EqualsOperation(function (b) { return test.bind(b)(b); }, ownerQuery, options);\n};\n\nvar defaultOperations = /*#__PURE__*/Object.freeze({\n    __proto__: null,\n    $eq: $eq,\n    $ne: $ne,\n    $or: $or,\n    $nor: $nor,\n    $elemMatch: $elemMatch,\n    $nin: $nin,\n    $in: $in,\n    $lt: $lt,\n    $lte: $lte,\n    $gt: $gt,\n    $gte: $gte,\n    $mod: $mod,\n    $exists: $exists,\n    $regex: $regex,\n    $not: $not,\n    $type: $type,\n    $and: $and,\n    $all: $all,\n    $size: $size,\n    $options: $options,\n    $where: $where\n});\n\nvar createDefaultQueryOperation = function (query, ownerQuery, _a) {\n    var _b = _a === void 0 ? {} : _a, compare = _b.compare, operations = _b.operations;\n    return createQueryOperation(query, ownerQuery, {\n        compare: compare,\n        operations: Object.assign({}, defaultOperations, operations || {})\n    });\n};\nvar createDefaultQueryTester = function (query, options) {\n    if (options === void 0) { options = {}; }\n    var op = createDefaultQueryOperation(query, null, options);\n    return createOperationTester(op);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createDefaultQueryTester);\n\n//# sourceMappingURL=index.js.map\n\n\n//# sourceURL=webpack:///../node_modules/sift/es5m/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: UPLOAD_DIR, prisma */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPLOAD_DIR\", function() { return UPLOAD_DIR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prisma\", function() { return prisma; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-yoga */ \"graphql-yoga\");\n/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_yoga__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-fileupload */ \"express-fileupload\");\n/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_fileupload__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment-timezone */ \"moment-timezone\");\n/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var mkdirp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mkdirp */ \"mkdirp\");\n/* harmony import */ var mkdirp__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mkdirp__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _schema_gql__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./schema.gql */ \"./src/schema.gql\");\n/* harmony import */ var _schema_gql__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_schema_gql__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resolvers */ \"./src/resolvers/index.js\");\n/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./middlewares */ \"./src/middlewares/index.js\");\n/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/upload.service */ \"./src/services/upload.service.js\");\n/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/auth.service */ \"./src/services/auth.service.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst UPLOAD_DIR = '/uploads';\nmkdirp__WEBPACK_IMPORTED_MODULE_6___default.a.sync(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, UPLOAD_DIR));\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_7__[\"PrismaClient\"]();\nconst options = {\n  endpoint: '/graphql',\n  playground: '/playground'\n};\nmoment__WEBPACK_IMPORTED_MODULE_4___default.a.tz.setDefault('Africa/Cairo');\nmoment__WEBPACK_IMPORTED_MODULE_4___default.a.updateLocale('en', {\n  week: {\n    dow: 6,\n    doy: 12\n  }\n});\nconst server = new graphql_yoga__WEBPACK_IMPORTED_MODULE_2__[\"GraphQLServer\"]({\n  typeDefs: (_schema_gql__WEBPACK_IMPORTED_MODULE_8___default()),\n  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  middlewares: _middlewares__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  context: async ctx => ({ ...ctx,\n    ...(await Object(_services_auth_service__WEBPACK_IMPORTED_MODULE_12__[\"getContextData\"])(ctx))\n  })\n});\nconst app = server.express;\napp.use('/uploads', express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, UPLOAD_DIR)));\napp.use(express_fileupload__WEBPACK_IMPORTED_MODULE_3___default()());\napp.post('/upload', async function (req, res) {\n  if (!req.files || Object.keys(req.files).length === 0) {\n    return res.status(400).send('No files were uploaded.');\n  }\n\n  let file = req.files.file;\n  res.send(await Object(_services_upload_service__WEBPACK_IMPORTED_MODULE_11__[\"upload\"])(file));\n});\n\nif (false) {}\n\nserver.start(options, () => console.log('Server is running on localhost:4000'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/middlewares/index.js":
/*!**********************************!*\
  !*** ./src/middlewares/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _permission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permission */ \"./src/middlewares/permission.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([_permission__WEBPACK_IMPORTED_MODULE_0__[\"default\"]]);\n\n//# sourceURL=webpack:///./src/middlewares/index.js?");

/***/ }),

/***/ "./src/middlewares/permission.js":
/*!***************************************!*\
  !*** ./src/middlewares/permission.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-core */ \"apollo-server-core\");\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-shield */ \"graphql-shield\");\n/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_shield__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/auth.service */ \"./src/services/auth.service.js\");\n/* harmony import */ var _services_erros_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/erros.service */ \"./src/services/erros.service.js\");\n\n\n\n\n\nconst isAuthenticated = Object(graphql_shield__WEBPACK_IMPORTED_MODULE_1__[\"rule\"])()(async (parent, args, {\n  user\n}) => {\n  if (user === null) {\n    throw new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__[\"AuthenticationError\"]();\n  }\n\n  return true;\n});\nconst canCreatePatient = Object(graphql_shield__WEBPACK_IMPORTED_MODULE_1__[\"rule\"])()(async (parent, args, {\n  user,\n  ability\n}) => {\n  console.log({\n    ability: ability.can('create', 'Appointment')\n  });\n  return ability.can('create', 'Appointments');\n}); // const isAuthenticated = rule({ cache: 'no_cache' })(async (_, __, ctx) => {\n//   console.log({ user: ctx.user });\n//   return true;\n//   // const { request } = ctx;\n//   // const { userId, organizationId } = getUserPayloads(request);\n//   // const { permissions } = await prisma.user.findOne({ where: { id: userId } });\n//   // ctx.userId = userId;\n//   // ctx.organizationId = organizationId;\n//   // ctx.permissions = permissions;\n//   // return true;\n// });\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(graphql_shield__WEBPACK_IMPORTED_MODULE_1__[\"shield\"])({\n  Query: {\n    '*': isAuthenticated,\n    hello: graphql_shield__WEBPACK_IMPORTED_MODULE_1__[\"allow\"] // patients: canCreatePatient,\n\n  },\n  Mutation: {\n    '*': isAuthenticated,\n    login: graphql_shield__WEBPACK_IMPORTED_MODULE_1__[\"allow\"],\n    verify: graphql_shield__WEBPACK_IMPORTED_MODULE_1__[\"allow\"]\n  }\n}, {\n  fallbackError: thrownThing => {\n    console.log(thrownThing);\n\n    if (thrownThing instanceof _services_erros_service__WEBPACK_IMPORTED_MODULE_4__[\"APIExceptcion\"]) {\n      return thrownThing;\n    } else if (thrownThing instanceof apollo_server_core__WEBPACK_IMPORTED_MODULE_0__[\"AuthenticationError\"]) {\n      return thrownThing;\n    } else {\n      return new apollo_server_core__WEBPACK_IMPORTED_MODULE_0__[\"AuthenticationError\"]('not Authenticated');\n    }\n  },\n  debug: true\n}));\n\n//# sourceURL=webpack:///./src/middlewares/permission.js?");

/***/ }),

/***/ "./src/resolvers/appointment-field/field.js":
/*!**************************************************!*\
  !*** ./src/resolvers/appointment-field/field.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst field = ({\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointmentField.findOne({\n    where: {\n      id\n    }\n  }).field();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (field);\n\n//# sourceURL=webpack:///./src/resolvers/appointment-field/field.js?");

/***/ }),

/***/ "./src/resolvers/appointment-field/index.js":
/*!**************************************************!*\
  !*** ./src/resolvers/appointment-field/index.js ***!
  \**************************************************/
/*! exports provided: field */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ \"./src/resolvers/appointment-field/field.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"field\", function() { return _field__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/resolvers/appointment-field/index.js?");

/***/ }),

/***/ "./src/resolvers/appointment/data.js":
/*!*******************************************!*\
  !*** ./src/resolvers/appointment/data.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst data = ({\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findOne({\n    where: {\n      id\n    }\n  }).data();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (data);\n\n//# sourceURL=webpack:///./src/resolvers/appointment/data.js?");

/***/ }),

/***/ "./src/resolvers/appointment/index.js":
/*!********************************************!*\
  !*** ./src/resolvers/appointment/index.js ***!
  \********************************************/
/*! exports provided: patient, data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _patient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patient */ \"./src/resolvers/appointment/patient.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patient\", function() { return _patient__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./src/resolvers/appointment/data.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return _data__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/resolvers/appointment/index.js?");

/***/ }),

/***/ "./src/resolvers/appointment/patient.js":
/*!**********************************************!*\
  !*** ./src/resolvers/appointment/patient.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst patient = ({\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findOne({\n    where: {\n      id\n    }\n  }).patient();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (patient);\n\n//# sourceURL=webpack:///./src/resolvers/appointment/patient.js?");

/***/ }),

/***/ "./src/resolvers/clinic/index.js":
/*!***************************************!*\
  !*** ./src/resolvers/clinic/index.js ***!
  \***************************************/
/*! exports provided: logo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logo */ \"./src/resolvers/clinic/logo.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"logo\", function() { return _logo__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/resolvers/clinic/index.js?");

/***/ }),

/***/ "./src/resolvers/clinic/logo.js":
/*!**************************************!*\
  !*** ./src/resolvers/clinic/logo.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst logo = ({\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].clinic.findOne({\n    where: {\n      id\n    }\n  }).logo();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (logo);\n\n//# sourceURL=webpack:///./src/resolvers/clinic/logo.js?");

/***/ }),

/***/ "./src/resolvers/custom-resolvers/index.js":
/*!*************************************************!*\
  !*** ./src/resolvers/custom-resolvers/index.js ***!
  \*************************************************/
/*! exports provided: JSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json */ \"./src/resolvers/custom-resolvers/json.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"JSON\", function() { return _json__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/resolvers/custom-resolvers/index.js?");

/***/ }),

/***/ "./src/resolvers/custom-resolvers/json.js":
/*!************************************************!*\
  !*** ./src/resolvers/custom-resolvers/json.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ \"graphql\");\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);\n\nconst jsonScalarType = new graphql__WEBPACK_IMPORTED_MODULE_0__[\"GraphQLScalarType\"]({\n  name: 'JSON',\n  description: 'json',\n\n  serialize(value) {\n    return JSON.parse(value);\n  },\n\n  parseValue(value) {\n    return JSON.stringify(value);\n  },\n\n  parseLiteral(ast) {\n    switch (ast.kind) {\n      case Kind.Int:\n    }\n  }\n\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (jsonScalarType);\n\n//# sourceURL=webpack:///./src/resolvers/custom-resolvers/json.js?");

/***/ }),

/***/ "./src/resolvers/index.js":
/*!********************************!*\
  !*** ./src/resolvers/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ \"./src/resolvers/query/index.js\");\n/* harmony import */ var _mutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation */ \"./src/resolvers/mutation/index.js\");\n/* harmony import */ var _appointment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointment */ \"./src/resolvers/appointment/index.js\");\n/* harmony import */ var _patient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patient */ \"./src/resolvers/patient/index.js\");\n/* harmony import */ var _appointment_field___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appointment-field/ */ \"./src/resolvers/appointment-field/index.js\");\n/* harmony import */ var _clinic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clinic */ \"./src/resolvers/clinic/index.js\");\n/* harmony import */ var _snippet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./snippet */ \"./src/resolvers/snippet/index.js\");\n/* harmony import */ var _custom_resolvers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom-resolvers */ \"./src/resolvers/custom-resolvers/index.js\");\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Query: _query__WEBPACK_IMPORTED_MODULE_0__,\n  Mutation: _mutation__WEBPACK_IMPORTED_MODULE_1__,\n  Appointment: _appointment__WEBPACK_IMPORTED_MODULE_2__,\n  Patient: _patient__WEBPACK_IMPORTED_MODULE_3__,\n  AppointmentField: _appointment_field___WEBPACK_IMPORTED_MODULE_4__,\n  Clinic: _clinic__WEBPACK_IMPORTED_MODULE_5__,\n  Snippet: _snippet__WEBPACK_IMPORTED_MODULE_6__,\n  ..._custom_resolvers__WEBPACK_IMPORTED_MODULE_7__\n});\n\n//# sourceURL=webpack:///./src/resolvers/index.js?");

/***/ }),

/***/ "./src/resolvers/mutation/activate-view.js":
/*!*************************************************!*\
  !*** ./src/resolvers/mutation/activate-view.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst setActiveView = async (_, {\n  viewId\n}, {\n  userId\n}) => {\n  const viewStatus = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].viewStatus.findMany({\n    where: {\n      userId\n    }\n  }).then(results => results[0]);\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].viewStatus.update({\n    data: {\n      activeView: {\n        connect: {\n          id: viewId\n        }\n      }\n    },\n    where: {\n      id: viewStatus.id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setActiveView);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/activate-view.js?");

/***/ }),

/***/ "./src/resolvers/mutation/add-lab-docs.js":
/*!************************************************!*\
  !*** ./src/resolvers/mutation/add-lab-docs.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst addLabDocs = async (_, {\n  patientLab\n}) => {\n  const {\n    patientId,\n    name,\n    documents\n  } = patientLab;\n  let persistedPatientLab = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patientLab.findOne({\n    where: {\n      name_patientId_unique_constraint: {\n        name,\n        patientId\n      }\n    },\n    include: {\n      documents: true\n    }\n  });\n\n  if (!persistedPatientLab) {\n    return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patientLab.create({\n      data: {\n        name,\n        patient: {\n          connect: {\n            id: patientId\n          }\n        },\n        documents: {\n          create: documents.map(id => ({\n            file: {\n              connect: {\n                id\n              }\n            }\n          }))\n        }\n      }\n    });\n  }\n\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patientLab.update({\n    data: {\n      documents: {\n        connect: persistedPatientLab.documents.map(({\n          id\n        }) => ({\n          id\n        })),\n        create: documents.map(id => ({\n          file: {\n            connect: {\n              id\n            }\n          }\n        }))\n      }\n    },\n    where: {\n      id: persistedPatientLab.id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (addLabDocs);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/add-lab-docs.js?");

/***/ }),

/***/ "./src/resolvers/mutation/adjust-appointment.js":
/*!******************************************************!*\
  !*** ./src/resolvers/mutation/adjust-appointment.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst adjustAppointment = (_, {\n  id,\n  date\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.update({\n    data: {\n      date\n    },\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (adjustAppointment);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/adjust-appointment.js?");

/***/ }),

/***/ "./src/resolvers/mutation/archive-appointment.js":
/*!*******************************************************!*\
  !*** ./src/resolvers/mutation/archive-appointment.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst archiveAppointment = (_, {\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.update({\n    data: {\n      status: 'Archived'\n    },\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (archiveAppointment);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/archive-appointment.js?");

/***/ }),

/***/ "./src/resolvers/mutation/cancel-appointment.js":
/*!******************************************************!*\
  !*** ./src/resolvers/mutation/cancel-appointment.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst cancelAppointment = (_, {\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.delete({\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (cancelAppointment);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/cancel-appointment.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-appointment.js":
/*!******************************************************!*\
  !*** ./src/resolvers/mutation/create-appointment.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_date_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/date.service */ \"./src/services/date.service.js\");\n/* harmony import */ var _services_appointment_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/services/appointment.service */ \"./src/services/appointment.service.js\");\n/* harmony import */ var _services_erros_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/erros.service */ \"./src/services/erros.service.js\");\n\n\n\n\n\n\nconst getDayAppointments = day => {\n  const start = Object(_services_date_service__WEBPACK_IMPORTED_MODULE_2__[\"getStartOfDay\"])(day);\n  const end = Object(_services_date_service__WEBPACK_IMPORTED_MODULE_2__[\"getEndOfDay\"])(day);\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findMany({\n    where: {\n      date: {\n        gte: start,\n        lte: end\n      }\n    }\n  });\n};\n\nconst isBeforeNow = date => moment__WEBPACK_IMPORTED_MODULE_1___default()(date).isBefore(moment__WEBPACK_IMPORTED_MODULE_1___default()(), 'minute');\n\nconst createAppointment = async (_, {\n  input: {\n    patient,\n    clinicId,\n    ...appointment\n  }\n}, {\n  userId\n}) => {\n  const appointments = await getDayAppointments(appointment.date);\n\n  if (!Object(_services_appointment_service__WEBPACK_IMPORTED_MODULE_3__[\"validDate\"])(appointment.date, appointments)) {\n    throw new _services_erros_service__WEBPACK_IMPORTED_MODULE_4__[\"APIExceptcion\"]('Time slot already reversed');\n  }\n\n  if (isBeforeNow(appointment.date)) {\n    throw new _services_erros_service__WEBPACK_IMPORTED_MODULE_4__[\"APIExceptcion\"]('Can not set to past time');\n  }\n\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.create({\n    data: { ...appointment,\n      specialty: 'Dentistry',\n      status: 'Scheduled',\n      patient: {\n        connect: {\n          id: patient\n        }\n      },\n      clinic: {\n        connect: {\n          id: clinicId\n        }\n      },\n      doctor: {\n        connect: {\n          id: userId\n        }\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createAppointment);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-appointment.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-default-view.js":
/*!*******************************************************!*\
  !*** ./src/resolvers/mutation/create-default-view.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\nconst view = {\n  name: 'Default View',\n  fieldGroups: [{\n    name: 'Vital Data',\n    order: 0,\n    fields: [{\n      name: 'Height',\n      required: false,\n      type: 'Number',\n      order: 0\n    }, {\n      name: 'Weight',\n      required: false,\n      type: 'Number',\n      order: 1\n    }, {\n      name: 'Glucose Level',\n      required: false,\n      type: 'Number',\n      order: 2\n    }, {\n      name: 'Pressure',\n      required: false,\n      type: 'Text',\n      order: 3\n    }]\n  }, {\n    name: 'Complain And Symptoms',\n    order: 1,\n    fields: [{\n      name: 'Complain',\n      required: false,\n      type: 'LongText',\n      order: 0\n    }, {\n      name: 'Signs',\n      required: false,\n      type: 'LongText',\n      order: 1\n    }, {\n      name: 'Symptoms',\n      required: false,\n      type: 'LongText',\n      order: 2\n    }]\n  }, {\n    name: 'Recommendations',\n    order: 2,\n    fields: [{\n      name: 'Prescription',\n      required: false,\n      type: 'LongText',\n      order: 0\n    }, {\n      name: 'Recommendations',\n      required: false,\n      type: 'LongText',\n      order: 1\n    }]\n  }]\n};\n\nconst createView = async (_, __, {\n  userId\n}) => {\n  const {\n    name,\n    fieldGroups\n  } = view;\n  console.log('on');\n  const {\n    id\n  } = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].view.create({\n    data: {\n      name,\n      user: {\n        connect: {\n          id: userId\n        }\n      },\n      fieldGroups: {\n        create: fieldGroups.map(fg => ({ ...fg,\n          fields: {\n            create: fg.fields\n          }\n        }))\n      }\n    }\n  });\n  console.log('ss');\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].viewStatus.create({\n    data: {\n      user: {\n        connect: {\n          id: userId\n        }\n      },\n      activeView: {\n        connect: {\n          id: id\n        }\n      },\n      defaultView: {\n        connect: {\n          id: id\n        }\n      }\n    }\n  }).then(() => true).catch(() => false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createView);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-default-view.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-expense.js":
/*!**************************************************!*\
  !*** ./src/resolvers/mutation/create-expense.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createExpense = async (_, {\n  expense: {\n    clinicId,\n    ...expense\n  }\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].expense.create({\n    data: {\n      clinic: {\n        connect: {\n          id: clinicId\n        }\n      },\n      ...expense\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createExpense);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-expense.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-family-history.js":
/*!*********************************************************!*\
  !*** ./src/resolvers/mutation/create-family-history.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createFamilyHistory = async (_, {\n  familyHistory: {\n    patientId,\n    ...familyHistory\n  }\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].familyHistory.create({\n    data: {\n      patient: {\n        connect: {\n          id: patientId\n        }\n      },\n      ...familyHistory\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createFamilyHistory);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-family-history.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-medical-history.js":
/*!**********************************************************!*\
  !*** ./src/resolvers/mutation/create-medical-history.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createMedicalHistory = async (_, {\n  medicalHistory: {\n    patientId,\n    ...medicalHistory\n  }\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].medicalHistory.create({\n    data: {\n      patient: {\n        connect: {\n          id: patientId\n        }\n      },\n      ...medicalHistory\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMedicalHistory);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-medical-history.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-patient.js":
/*!**************************************************!*\
  !*** ./src/resolvers/mutation/create-patient.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createPatient = (_, {\n  input: patient\n}, {\n  organizationId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.create({\n    data: { ...patient,\n      organizationId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createPatient);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-patient.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-snippet.js":
/*!**************************************************!*\
  !*** ./src/resolvers/mutation/create-snippet.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createSnippet = (_, {\n  snippet\n}, {\n  userId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].snippet.create({\n    data: { ...snippet,\n      user: {\n        connect: {\n          id: userId\n        }\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createSnippet);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-snippet.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-view.js":
/*!***********************************************!*\
  !*** ./src/resolvers/mutation/create-view.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createView = async (_, {\n  view\n}, {\n  userId\n}) => {\n  const {\n    name,\n    fieldGroups\n  } = view;\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].view.create({\n    data: {\n      name,\n      user: {\n        connect: {\n          id: userId\n        }\n      },\n      fieldGroups: {\n        create: fieldGroups.map(fg => ({ ...fg,\n          fields: {\n            create: fg.fields\n          }\n        }))\n      }\n    }\n  }).then(() => true).catch(() => false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createView);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-view.js?");

/***/ }),

/***/ "./src/resolvers/mutation/edit-view.js":
/*!*********************************************!*\
  !*** ./src/resolvers/mutation/edit-view.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst flattenFields = groups => {\n  const fields = groups.map(group => group.fields.map(f => ({ ...f,\n    group\n  })));\n  return ramda__WEBPACK_IMPORTED_MODULE_1__[\"flatten\"](fields);\n};\n\nconst getFieldValues = field => ramda__WEBPACK_IMPORTED_MODULE_1__[\"pick\"](['id', 'name', 'order', 'type', 'required'])(field);\n\nconst editView = async (_, {\n  groups\n}) => {\n  const newGroups = groups.filter(g => !g.id);\n  const oldGroups = groups.filter(g => g.id); //create new group fields\n\n  const newGroups$ = newGroups.map(g => ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].fieldGroup.create({\n    data: ramda__WEBPACK_IMPORTED_MODULE_1__[\"omit\"](['fields'])(g)\n  })); // eslint-disable-next-line no-undef\n\n  const persistedGroups = await Promise.all(newGroups$); // update existedGroups\n\n  const oldGroups$ = oldGroups.map(({\n    id,\n    name\n  }) => ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].fieldGroup.updateMany({\n    data: {\n      name\n    },\n    where: {\n      id\n    }\n  })); // eslint-disable-next-line no-undef\n\n  await Promise.all(oldGroups$); //update ids\n\n  newGroups.forEach((g, idx) => {\n    g.id = persistedGroups[idx].id;\n  });\n  const fields = flattenFields(oldGroups.concat(newGroups));\n  await await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].raw`UPDATE public.\"Field\" SET \"fieldGroupId\"= null`; // update all fields\n\n  const updateFields$ = fields.map(f => {\n    const args = {\n      data: { ...getFieldValues(f),\n        fieldGroup: {\n          connect: {\n            id: f.group.id\n          }\n        }\n      }\n    };\n    return f.id ? ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].field.update({ ...args,\n      where: {\n        id: f.id\n      }\n    }) : ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].field.create(args);\n  }); // eslint-disable-next-line no-undef\n\n  return Promise.all(updateFields$).then(() => true).catch(() => false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (editView);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/edit-view.js?");

/***/ }),

/***/ "./src/resolvers/mutation/index.js":
/*!*****************************************!*\
  !*** ./src/resolvers/mutation/index.js ***!
  \*****************************************/
/*! exports provided: createPatient, createAppointment, updateAppointment, archiveAppointment, setAppointmentDone, login, verify, createView, editView, activateView, createDefaultView, adjustAppointment, cancelAppointment, singleUpload, multipleUpload, updateClinic, createSnippet, addLabDocs, createMedicalHistory, createFamilyHistory, createExpense, updateUserPermissions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create_patient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-patient */ \"./src/resolvers/mutation/create-patient.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createPatient\", function() { return _create_patient__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _create_appointment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-appointment */ \"./src/resolvers/mutation/create-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createAppointment\", function() { return _create_appointment__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _update_appointment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update-appointment */ \"./src/resolvers/mutation/update-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateAppointment\", function() { return _update_appointment__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _archive_appointment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./archive-appointment */ \"./src/resolvers/mutation/archive-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"archiveAppointment\", function() { return _archive_appointment__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _set_appointment_done__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./set-appointment-done */ \"./src/resolvers/mutation/set-appointment-done.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setAppointmentDone\", function() { return _set_appointment_done__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login */ \"./src/resolvers/mutation/login.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return _login__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _verify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./verify */ \"./src/resolvers/mutation/verify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"verify\", function() { return _verify__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _create_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-view */ \"./src/resolvers/mutation/create-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createView\", function() { return _create_view__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _edit_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./edit-view */ \"./src/resolvers/mutation/edit-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"editView\", function() { return _edit_view__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _activate_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./activate-view */ \"./src/resolvers/mutation/activate-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"activateView\", function() { return _activate_view__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _create_default_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./create-default-view */ \"./src/resolvers/mutation/create-default-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createDefaultView\", function() { return _create_default_view__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _adjust_appointment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./adjust-appointment */ \"./src/resolvers/mutation/adjust-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"adjustAppointment\", function() { return _adjust_appointment__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _cancel_appointment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cancel-appointment */ \"./src/resolvers/mutation/cancel-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cancelAppointment\", function() { return _cancel_appointment__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _single_upload__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./single-upload */ \"./src/resolvers/mutation/single-upload.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"singleUpload\", function() { return _single_upload__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/* harmony import */ var _multiple_upload__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./multiple-upload */ \"./src/resolvers/mutation/multiple-upload.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"multipleUpload\", function() { return _multiple_upload__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony import */ var _update_clinic__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./update-clinic */ \"./src/resolvers/mutation/update-clinic.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateClinic\", function() { return _update_clinic__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony import */ var _create_snippet__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./create-snippet */ \"./src/resolvers/mutation/create-snippet.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createSnippet\", function() { return _create_snippet__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _add_lab_docs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./add-lab-docs */ \"./src/resolvers/mutation/add-lab-docs.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"addLabDocs\", function() { return _add_lab_docs__WEBPACK_IMPORTED_MODULE_17__[\"default\"]; });\n\n/* harmony import */ var _create_medical_history__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./create-medical-history */ \"./src/resolvers/mutation/create-medical-history.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createMedicalHistory\", function() { return _create_medical_history__WEBPACK_IMPORTED_MODULE_18__[\"default\"]; });\n\n/* harmony import */ var _create_family_history__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./create-family-history */ \"./src/resolvers/mutation/create-family-history.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createFamilyHistory\", function() { return _create_family_history__WEBPACK_IMPORTED_MODULE_19__[\"default\"]; });\n\n/* harmony import */ var _create_expense__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./create-expense */ \"./src/resolvers/mutation/create-expense.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createExpense\", function() { return _create_expense__WEBPACK_IMPORTED_MODULE_20__[\"default\"]; });\n\n/* harmony import */ var _update_user_permissions__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./update-user-permissions */ \"./src/resolvers/mutation/update-user-permissions.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateUserPermissions\", function() { return _update_user_permissions__WEBPACK_IMPORTED_MODULE_21__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/resolvers/mutation/index.js?");

/***/ }),

/***/ "./src/resolvers/mutation/login.js":
/*!*****************************************!*\
  !*** ./src/resolvers/mutation/login.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/constants */ \"./src/utils/constants.js\");\n\n\n\n\n\nconst login = async (_, {\n  email = '',\n  password\n}) => {\n  const user = await ___WEBPACK_IMPORTED_MODULE_2__[\"prisma\"].user.findOne({\n    where: {\n      email: email.toLowerCase()\n    }\n  });\n\n  if (!user) {\n    throw new Error('No such user found');\n  }\n\n  const valid = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.compare(password, user.password);\n\n  if (!valid) {\n    throw new Error('Invalid password');\n  }\n\n  const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.sign({\n    userId: user.id,\n    organizationId: user.organizationId\n  }, _utils_constants__WEBPACK_IMPORTED_MODULE_3__[\"APP_SECRET\"]);\n  return {\n    token,\n    user\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/login.js?");

/***/ }),

/***/ "./src/resolvers/mutation/multiple-upload.js":
/*!***************************************************!*\
  !*** ./src/resolvers/mutation/multiple-upload.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/upload.service */ \"./src/services/upload.service.js\");\n\n\nconst multipleUpload = (_, {\n  files\n}) => {\n  return Promise.all(files.map(_services_upload_service__WEBPACK_IMPORTED_MODULE_0__[\"processUpload\"]));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (multipleUpload);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/multiple-upload.js?");

/***/ }),

/***/ "./src/resolvers/mutation/set-appointment-done.js":
/*!********************************************************!*\
  !*** ./src/resolvers/mutation/set-appointment-done.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _services_revenue_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/revenue.service */ \"./src/services/revenue.service.js\");\n\n\n\nconst setAppointmentDone = async (_, {\n  id\n}) => {\n  const appointment = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.update({\n    data: {\n      status: 'Done'\n    },\n    where: {\n      id\n    }\n  });\n  await Object(_services_revenue_service__WEBPACK_IMPORTED_MODULE_1__[\"createAppointmentRevenue\"])(appointment);\n  return appointment;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setAppointmentDone);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/set-appointment-done.js?");

/***/ }),

/***/ "./src/resolvers/mutation/single-upload.js":
/*!*************************************************!*\
  !*** ./src/resolvers/mutation/single-upload.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/upload.service */ \"./src/services/upload.service.js\");\n\n\nconst singleUpload = (_, {\n  file\n}) => {\n  return Object(_services_upload_service__WEBPACK_IMPORTED_MODULE_0__[\"processUpload\"])(file);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (singleUpload);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/single-upload.js?");

/***/ }),

/***/ "./src/resolvers/mutation/update-appointment.js":
/*!******************************************************!*\
  !*** ./src/resolvers/mutation/update-appointment.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var ramda_adjunct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda-adjunct */ \"ramda-adjunct\");\n/* harmony import */ var ramda_adjunct__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda_adjunct__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst updateAppointment = (_, {\n  appointment\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.update({\n    data: {\n      data: {\n        upsert: appointment.data.map(({\n          id,\n          value,\n          fieldId\n        }) => ({\n          create: {\n            value: value,\n            field: {\n              connect: {\n                id: fieldId\n              }\n            }\n          },\n          update: {\n            value: value,\n            field: {\n              connect: {\n                id: fieldId\n              }\n            }\n          },\n          where: {\n            id: id || fieldId\n          }\n        }))\n      }\n    },\n    where: {\n      id: appointment.id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (updateAppointment);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/update-appointment.js?");

/***/ }),

/***/ "./src/resolvers/mutation/update-clinic.js":
/*!*************************************************!*\
  !*** ./src/resolvers/mutation/update-clinic.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst updateClinic = async (_, {\n  clinic: {\n    id,\n    logoId,\n    ...clinic\n  }\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].clinic.update({\n    data: Object.assign(clinic, logoId && {\n      logo: {\n        connect: {\n          id: logoId\n        }\n      }\n    }),\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (updateClinic);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/update-clinic.js?");

/***/ }),

/***/ "./src/resolvers/mutation/update-user-permissions.js":
/*!***********************************************************!*\
  !*** ./src/resolvers/mutation/update-user-permissions.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _services_erros_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/erros.service */ \"./src/services/erros.service.js\");\n\n\n\nconst updateUserPermissions = async (_, {\n  userId,\n  permissions\n}, {\n  isAdmin\n}) => {\n  // FIXME also check if user belongs to same clinic of admin\n  if (!isAdmin) {\n    throw new _services_erros_service__WEBPACK_IMPORTED_MODULE_1__[\"APIExceptcion\"]('not authroized');\n  }\n\n  ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].user.update({\n    data: {\n      permissions\n    },\n    where: {\n      id: userId\n    }\n  }).then(() => true).catch(() => false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (updateUserPermissions);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/update-user-permissions.js?");

/***/ }),

/***/ "./src/resolvers/mutation/verify.js":
/*!******************************************!*\
  !*** ./src/resolvers/mutation/verify.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/auth.service */ \"./src/services/auth.service.js\");\n\n\n\nconst verify = async (_, __, {\n  request\n}) => {\n  const {\n    userId\n  } = Object(_services_auth_service__WEBPACK_IMPORTED_MODULE_1__[\"getUserPayloads\"])(request);\n  const user = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].user.findOne({\n    where: {\n      id: userId\n    }\n  });\n  return user;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (verify);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/verify.js?");

/***/ }),

/***/ "./src/resolvers/patient/appointments.js":
/*!***********************************************!*\
  !*** ./src/resolvers/patient/appointments.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst appointments = ({\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.findOne({\n    where: {\n      id\n    }\n  }).appointments();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointments);\n\n//# sourceURL=webpack:///./src/resolvers/patient/appointments.js?");

/***/ }),

/***/ "./src/resolvers/patient/index.js":
/*!****************************************!*\
  !*** ./src/resolvers/patient/index.js ***!
  \****************************************/
/*! exports provided: appointments, searchName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appointments */ \"./src/resolvers/patient/appointments.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointments\", function() { return _appointments__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _search_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search-name */ \"./src/resolvers/patient/search-name.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"searchName\", function() { return _search_name__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/resolvers/patient/index.js?");

/***/ }),

/***/ "./src/resolvers/patient/search-name.js":
/*!**********************************************!*\
  !*** ./src/resolvers/patient/search-name.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst searchName = ({\n  name\n}) => {\n  return name;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (searchName);\n\n//# sourceURL=webpack:///./src/resolvers/patient/search-name.js?");

/***/ }),

/***/ "./src/resolvers/query/active-view.js":
/*!********************************************!*\
  !*** ./src/resolvers/query/active-view.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst activeView = async (_, __, {\n  userId\n}) => {\n  const viewStatus = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].viewStatus.findMany({\n    where: {\n      userId\n    }\n  }).then(results => results[0]);\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].view.findOne({\n    include: {\n      fieldGroups: {\n        orderBy: {\n          order: 'asc'\n        },\n        include: {\n          fields: {\n            orderBy: {\n              order: 'asc'\n            }\n          }\n        }\n      }\n    },\n    where: {\n      id: viewStatus.activeViewId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (activeView);\n\n//# sourceURL=webpack:///./src/resolvers/query/active-view.js?");

/***/ }),

/***/ "./src/resolvers/query/appointment-history.js":
/*!****************************************************!*\
  !*** ./src/resolvers/query/appointment-history.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst appointmentHistory = async (_, {\n  appointmentId,\n  patientId\n}) => {\n  if (appointmentId) {\n    const patient = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.findMany({\n      where: {\n        appointments: {\n          some: {\n            id: appointmentId\n          }\n        }\n      },\n      take: 1\n    }).then(ramda__WEBPACK_IMPORTED_MODULE_1__[\"propOr\"]({}, '0'));\n    patientId = patient.id;\n  }\n\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findMany({\n    where: {\n      status: 'Archived',\n      patient: {\n        id: patientId\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointmentHistory);\n\n//# sourceURL=webpack:///./src/resolvers/query/appointment-history.js?");

/***/ }),

/***/ "./src/resolvers/query/appointment.js":
/*!********************************************!*\
  !*** ./src/resolvers/query/appointment.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst appointment = (_, {\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findOne({\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointment);\n\n//# sourceURL=webpack:///./src/resolvers/query/appointment.js?");

/***/ }),

/***/ "./src/resolvers/query/appointments.js":
/*!*********************************************!*\
  !*** ./src/resolvers/query/appointments.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst appointments = async (_, {\n  input\n}, {\n  userId\n}) => {\n  let {\n    clinicIds\n  } = input;\n\n  if (!clinicIds.length) {\n    clinicIds = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].clinic.findMany({\n      where: {\n        users: {\n          some: {\n            id: userId\n          }\n        }\n      },\n      select: {\n        id: true\n      }\n    }).then(clinics => clinics.map(({\n      id\n    }) => id));\n  }\n\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findMany({\n    where: {\n      date: {\n        gte: ramda__WEBPACK_IMPORTED_MODULE_1__[\"prop\"]('fromDate')(input),\n        lte: ramda__WEBPACK_IMPORTED_MODULE_1__[\"prop\"]('toDate')(input)\n      },\n      clinicId: {\n        in: clinicIds\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointments);\n\n//# sourceURL=webpack:///./src/resolvers/query/appointments.js?");

/***/ }),

/***/ "./src/resolvers/query/clinic-users.js":
/*!*********************************************!*\
  !*** ./src/resolvers/query/clinic-users.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst clinicUsers = (_, {\n  clinicId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].user.findMany({\n    where: {\n      clinics: {\n        some: {\n          id: clinicId\n        }\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (clinicUsers);\n\n//# sourceURL=webpack:///./src/resolvers/query/clinic-users.js?");

/***/ }),

/***/ "./src/resolvers/query/expenses.js":
/*!*****************************************!*\
  !*** ./src/resolvers/query/expenses.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst expenses = (_, {\n  clinicId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].expense.findMany({\n    where: {\n      clinicId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (expenses);\n\n//# sourceURL=webpack:///./src/resolvers/query/expenses.js?");

/***/ }),

/***/ "./src/resolvers/query/family-history.js":
/*!***********************************************!*\
  !*** ./src/resolvers/query/family-history.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst familyHistory = (_, {\n  patientId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].familyHistory.findMany({\n    where: {\n      patientId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (familyHistory);\n\n//# sourceURL=webpack:///./src/resolvers/query/family-history.js?");

/***/ }),

/***/ "./src/resolvers/query/hello.js":
/*!**************************************!*\
  !*** ./src/resolvers/query/hello.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst hello = (_, __, {\n  userId\n}) => {\n  return 'Hello To Clinic R';\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (hello);\n\n//# sourceURL=webpack:///./src/resolvers/query/hello.js?");

/***/ }),

/***/ "./src/resolvers/query/index.js":
/*!**************************************!*\
  !*** ./src/resolvers/query/index.js ***!
  \**************************************/
/*! exports provided: hello, patients, appointments, appointment, appointmentHistory, patient, listMyViews, listMyViewsStatus, activeView, myClinics, mySnippets, patientLabs, medicalHistory, familyHistory, expenses, revenues, search, clinicUsers, user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hello */ \"./src/resolvers/query/hello.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hello\", function() { return _hello__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _patients__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patients */ \"./src/resolvers/query/patients.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patients\", function() { return _patients__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointments */ \"./src/resolvers/query/appointments.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointments\", function() { return _appointments__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _appointment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appointment */ \"./src/resolvers/query/appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointment\", function() { return _appointment__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _appointment_history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appointment-history */ \"./src/resolvers/query/appointment-history.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointmentHistory\", function() { return _appointment_history__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _patient__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./patient */ \"./src/resolvers/query/patient.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patient\", function() { return _patient__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _list_my_views__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list-my-views */ \"./src/resolvers/query/list-my-views.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"listMyViews\", function() { return _list_my_views__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _list_my_views_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list-my-views-status */ \"./src/resolvers/query/list-my-views-status.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"listMyViewsStatus\", function() { return _list_my_views_status__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _active_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./active-view */ \"./src/resolvers/query/active-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"activeView\", function() { return _active_view__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _my_clinics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./my-clinics */ \"./src/resolvers/query/my-clinics.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"myClinics\", function() { return _my_clinics__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _my_snippets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./my-snippets */ \"./src/resolvers/query/my-snippets.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mySnippets\", function() { return _my_snippets__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _patient_labs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./patient-labs */ \"./src/resolvers/query/patient-labs.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patientLabs\", function() { return _patient_labs__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _medical_history__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./medical-history */ \"./src/resolvers/query/medical-history.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"medicalHistory\", function() { return _medical_history__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _family_history__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./family-history */ \"./src/resolvers/query/family-history.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"familyHistory\", function() { return _family_history__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/* harmony import */ var _expenses__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./expenses */ \"./src/resolvers/query/expenses.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"expenses\", function() { return _expenses__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony import */ var _revenues__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./revenues */ \"./src/resolvers/query/revenues.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"revenues\", function() { return _revenues__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./search */ \"./src/resolvers/query/search.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"search\", function() { return _search__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _clinic_users__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./clinic-users */ \"./src/resolvers/query/clinic-users.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"clinicUsers\", function() { return _clinic_users__WEBPACK_IMPORTED_MODULE_17__[\"default\"]; });\n\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./user */ \"./src/resolvers/query/user.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"user\", function() { return _user__WEBPACK_IMPORTED_MODULE_18__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/resolvers/query/index.js?");

/***/ }),

/***/ "./src/resolvers/query/list-my-views-status.js":
/*!*****************************************************!*\
  !*** ./src/resolvers/query/list-my-views-status.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst listViewStatus = (_, __, {\n  userId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].viewStatus.findMany({\n    where: {\n      userId\n    }\n  }).then(result => result.length ? result[0] : null);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (listViewStatus);\n\n//# sourceURL=webpack:///./src/resolvers/query/list-my-views-status.js?");

/***/ }),

/***/ "./src/resolvers/query/list-my-views.js":
/*!**********************************************!*\
  !*** ./src/resolvers/query/list-my-views.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst listView = (_, __, {\n  userId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].view.findMany({\n    include: {\n      fieldGroups: {\n        orderBy: {\n          order: 'asc'\n        },\n        include: {\n          fields: {\n            orderBy: {\n              order: 'asc'\n            }\n          }\n        }\n      }\n    },\n    orderBy: {\n      id: 'asc'\n    },\n    where: {\n      userId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (listView);\n\n//# sourceURL=webpack:///./src/resolvers/query/list-my-views.js?");

/***/ }),

/***/ "./src/resolvers/query/medical-history.js":
/*!************************************************!*\
  !*** ./src/resolvers/query/medical-history.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst medicalHistory = (_, {\n  patientId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].medicalHistory.findMany({\n    where: {\n      patientId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (medicalHistory);\n\n//# sourceURL=webpack:///./src/resolvers/query/medical-history.js?");

/***/ }),

/***/ "./src/resolvers/query/my-clinics.js":
/*!*******************************************!*\
  !*** ./src/resolvers/query/my-clinics.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst myClinic = (_, __, {\n  userId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].clinic.findMany({\n    where: {\n      users: {\n        some: {\n          id: userId\n        }\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (myClinic);\n\n//# sourceURL=webpack:///./src/resolvers/query/my-clinics.js?");

/***/ }),

/***/ "./src/resolvers/query/my-snippets.js":
/*!********************************************!*\
  !*** ./src/resolvers/query/my-snippets.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst mySnippets = (_, __, {\n  userId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].snippet.findMany({\n    where: {\n      userId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mySnippets);\n\n//# sourceURL=webpack:///./src/resolvers/query/my-snippets.js?");

/***/ }),

/***/ "./src/resolvers/query/patient-labs.js":
/*!*********************************************!*\
  !*** ./src/resolvers/query/patient-labs.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst patients = (_, {\n  patientId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patientLab.findMany({\n    where: {\n      patientId\n    },\n    include: {\n      documents: {\n        include: {\n          file: true\n        }\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (patients);\n\n//# sourceURL=webpack:///./src/resolvers/query/patient-labs.js?");

/***/ }),

/***/ "./src/resolvers/query/patient.js":
/*!****************************************!*\
  !*** ./src/resolvers/query/patient.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst patient = (_, {\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.findOne({\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (patient);\n\n//# sourceURL=webpack:///./src/resolvers/query/patient.js?");

/***/ }),

/***/ "./src/resolvers/query/patients.js":
/*!*****************************************!*\
  !*** ./src/resolvers/query/patients.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst patients = async (_, __, {\n  organizationId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.findMany({\n    where: {\n      organizationId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (patients);\n\n//# sourceURL=webpack:///./src/resolvers/query/patients.js?");

/***/ }),

/***/ "./src/resolvers/query/revenues.js":
/*!*****************************************!*\
  !*** ./src/resolvers/query/revenues.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst revenues = (_, {\n  clinicId\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].revenue.findMany({\n    where: {\n      clinicId\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (revenues);\n\n//# sourceURL=webpack:///./src/resolvers/query/revenues.js?");

/***/ }),

/***/ "./src/resolvers/query/search.js":
/*!***************************************!*\
  !*** ./src/resolvers/query/search.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst getPatients = q => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].raw(`SELECT * FROM \"Patient\" WHERE \"name\" ILIKE '%${q}%' OR \"phoneNo\" ILIKE '%${q}%';`);\n};\n\nconst getSnippets = q => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].raw(`SELECT * FROM \"Snippet\" WHERE title ILIKE '%${q}%' OR \"body\" ILIKE '%${q}%';`);\n};\n\nconst search = (_, {\n  q,\n  patient = true,\n  sinppet = true\n}) => {\n  /* eslint-disable no-undef */\n  return Promise.all([getPatients(q), getSnippets(q)]).then(([patients, snippets]) => ({\n    patients,\n    snippets\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (search);\n\n//# sourceURL=webpack:///./src/resolvers/query/search.js?");

/***/ }),

/***/ "./src/resolvers/query/user.js":
/*!*************************************!*\
  !*** ./src/resolvers/query/user.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst user = (_, {\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].user.findOne({\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (user);\n\n//# sourceURL=webpack:///./src/resolvers/query/user.js?");

/***/ }),

/***/ "./src/resolvers/snippet/index.js":
/*!****************************************!*\
  !*** ./src/resolvers/snippet/index.js ***!
  \****************************************/
/*! exports provided: searchName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _search_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search-name */ \"./src/resolvers/snippet/search-name.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"searchName\", function() { return _search_name__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/resolvers/snippet/index.js?");

/***/ }),

/***/ "./src/resolvers/snippet/search-name.js":
/*!**********************************************!*\
  !*** ./src/resolvers/snippet/search-name.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst searchName = ({\n  title\n}) => {\n  return title;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (searchName);\n\n//# sourceURL=webpack:///./src/resolvers/snippet/search-name.js?");

/***/ }),

/***/ "./src/schema.gql":
/*!************************!*\
  !*** ./src/schema.gql ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"},\"directives\":[]},{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"VitalData\"},\"directives\":[]},{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"},\"directives\":[]},{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Upload\"},\"directives\":[]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientMembershipType\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Primary\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Secondary\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Examination\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Followup\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Sex\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Female\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Male\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldType\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Text\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Number\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"LongText\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentStatus\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Scheduled\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Cancelled\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Missed\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Changed\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Archived\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Done\"},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Query\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"hello\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patients\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicPatients\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointments\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"input\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentQueryInput\"}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointmentHistory\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointmentId\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"listMyViews\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activeView\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"listMyViewsStatus\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewStatus\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"myClinics\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Clinic\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"mySnippets\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Snippet\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientLabs\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientLab\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"medicalHistory\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"MedicalHistory\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"familyHistory\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FamilyHistory\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"expenses\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Expense\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"revenues\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Revenue\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"search\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"q\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"snippet\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"SearchResult\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicUsers\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Mutation\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createPatient\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"input\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"input\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"updateAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointment\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"UpdateAppointmentInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"archiveAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"setAppointmentDone\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createView\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"view\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"editView\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"groups\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroupInput\"}}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"login\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"email\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"password\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AuthPayload\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"verify\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"token\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activateView\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"viewId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewStatus\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createDefaultView\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"adjustAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"cancelAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"singleUpload\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"file\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Upload\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"File\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"multipleUpload\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"files\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Upload\"}}}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"File\"}}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"updateClinic\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinic\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ClinicInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Clinic\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createSnippet\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"snippet\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"SnippetInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Snippet\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"addLabDocs\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientLab\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientLabInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientLab\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createMedicalHistory\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"medicalHistory\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"MedicalHistoryInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"MedicalHistory\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createFamilyHistory\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"familyHistory\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FamilyHistoryInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FamilyHistory\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createExpense\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"expense\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ExpenseInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Expense\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"updateUserPermissions\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"userId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"permissions\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PermissionInput\"}}}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AuthPayload\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"token\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"UserLoginInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"email\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"password\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"email\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"permissions\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Permission\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Permission\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"action\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"subject\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PermissionInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"action\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"subject\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"InterfaceTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Searchable\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"searchName\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"SearchResult\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patients\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"snippets\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Snippet\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"},\"interfaces\":[{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Searchable\"}}],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientMembershipType\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"searchName\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"phoneNo\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"age\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"sex\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Sex\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointments\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"phoneNo\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"age\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"sex\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Sex\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientMembershipType\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"guardianName\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"status\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentStatus\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"labs\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentField\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentField\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"value\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"field\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Field\"}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"labs\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"UpdateAppointmentInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"labs\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentFieldInput\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentQueryInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicIds\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patients\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fromDate\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"toDate\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentFieldInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"value\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fieldId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"default\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"userId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fieldGroups\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroup\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroup\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fields\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Field\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Field\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldType\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"required\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewStatus\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"userId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"defaultView\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"defaultViewId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activeView\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activeViewId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fieldGroups\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroupInput\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroupInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fields\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldInput\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldType\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"required\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Clinic\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"examinationPrice\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"followupPrice\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"duration\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointmentsCount\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"doctorName\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"doctorTitle\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"doctorJobDescription\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"address\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"phoneNo\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"logo\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"File\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ClinicInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"doctorName\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"doctorTitle\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"doctorJobDescription\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"address\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"phoneNo\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"logoId\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"examinationPrice\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"followupPrice\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"duration\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointmentsCount\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"File\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"filename\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"mimetype\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"encoding\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"url\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Snippet\"},\"interfaces\":[{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Searchable\"}}],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"searchName\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"body\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"SnippetInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"body\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientLab\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"documents\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"LabDocument\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"LabDocument\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"file\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"File\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientLabInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"documents\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"MedicalHistory\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"medicineName\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"frequency\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"dose\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fromDate\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FamilyHistory\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"disease\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"relative\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"MedicalHistoryInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"medicineName\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"frequency\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"dose\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fromDate\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FamilyHistoryInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"disease\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"relative\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patientId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Expense\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"amount\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"invoiceNo\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ExpenseInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"amount\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"invoiceNo\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"clinicId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Revenue\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"amount\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"invoiceNo\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":7008}};\n    doc.loc.source = {\"body\":\"scalar Date\\nscalar VitalData\\nscalar JSON\\nscalar Upload\\n\\nenum PatientMembershipType {\\n  Primary\\n  Secondary\\n}\\n\\nenum AppointmentType {\\n  Examination\\n  Followup\\n}\\n\\nenum Sex {\\n  Female\\n  Male\\n}\\n\\nenum FieldType {\\n  Text\\n  Number\\n  LongText\\n}\\n\\nenum AppointmentStatus {\\n  Scheduled\\n  Cancelled\\n  Missed\\n  Changed\\n  Archived\\n  Done\\n}\\n\\n########################### Query ##################################\\n\\ntype Query {\\n  hello(name: String): String!\\n  patients: [Patient!]\\n  clinicPatients(clinicId: ID!): [Patient!]\\n  appointments(input: AppointmentQueryInput): [Appointment!]\\n  appointment(id: ID!): Appointment\\n  appointmentHistory(appointmentId: ID, patientId: ID): [Appointment!]\\n  patient(id: ID!): Patient\\n  listMyViews: [View!]\\n  activeView: View!\\n  listMyViewsStatus: ViewStatus\\n  myClinics: [Clinic!]\\n  mySnippets: [Snippet!]\\n  patientLabs(patientId: ID!): [PatientLab!]\\n  medicalHistory(patientId: ID!): [MedicalHistory!]\\n  familyHistory(patientId: ID!): [FamilyHistory!]\\n  expenses(clinicId: ID!): [Expense!]\\n  revenues(clinicId: ID!): [Revenue!]\\n  search(q: String!, patient: Boolean, snippet: Boolean): SearchResult\\n  clinicUsers(clinicId: ID!): [User!]\\n  user(id: ID!): User\\n}\\n\\n########################### Mutation ##################################\\n\\ntype Mutation {\\n  createPatient(input: PatientInput!): Patient!\\n  createAppointment(input: AppointmentInput!): Appointment!\\n  updateAppointment(appointment: UpdateAppointmentInput!): Appointment!\\n  archiveAppointment(id: ID!): Appointment!\\n  setAppointmentDone(id: ID!): Appointment!\\n  createView(view: ViewInput!): Boolean\\n  editView(groups: [FieldGroupInput!]): Boolean\\n  login(email: String!, password: String!): AuthPayload\\n  verify(token: String): User\\n  activateView(viewId: ID!): ViewStatus!\\n  createDefaultView: Boolean\\n  adjustAppointment(id: ID!, date: Date!): Appointment!\\n  cancelAppointment(id: ID!): Appointment!\\n  singleUpload(file: Upload!): File!\\n  multipleUpload(files: [Upload!]!): [File!]!\\n  updateClinic(clinic: ClinicInput!): Clinic\\n  createSnippet(snippet: SnippetInput!): Snippet!\\n  addLabDocs(patientLab: PatientLabInput!): PatientLab!\\n  createMedicalHistory(medicalHistory: MedicalHistoryInput!): MedicalHistory!\\n  createFamilyHistory(familyHistory: FamilyHistoryInput!): FamilyHistory!\\n  createExpense(expense: ExpenseInput!): Expense\\n  updateUserPermissions(userId: ID!, permissions: [PermissionInput!]!): Boolean\\n}\\n\\n########################### Auth ##################################\\n\\ntype AuthPayload {\\n  token: String\\n  user: User\\n}\\n\\ninput UserLoginInput {\\n  email: String!\\n  password: String!\\n}\\n\\n########################### User ##################################\\n\\ntype User {\\n  id: ID!\\n  name: String!\\n  email: String!\\n  permissions: [Permission!]\\n}\\n\\ntype Permission {\\n  action: String\\n  subject: String\\n}\\n\\ninput PermissionInput {\\n  action: String\\n  subject: String\\n}\\n\\n########################### Search ##################################\\n\\ninterface Searchable {\\n  searchName: String!\\n}\\n\\ntype SearchResult {\\n  patients: [Patient!]\\n  snippets: [Snippet!]\\n}\\n\\n########################### Patient ##################################\\n\\ntype Patient implements Searchable {\\n  id: ID!\\n  type: PatientMembershipType!\\n  name: String!\\n  searchName: String!\\n  phoneNo: String!\\n  age: Int!\\n  sex: Sex!\\n  appointments: [Appointment!]\\n}\\n\\ninput PatientInput {\\n  name: String!\\n  phoneNo: String!\\n  age: Int!\\n  sex: Sex!\\n  type: PatientMembershipType!\\n  guardianName: String\\n}\\n\\n########################### Appointment ##################################\\n\\ntype Appointment {\\n  id: ID!\\n  date: Date\\n  type: AppointmentType!\\n  status: AppointmentStatus!\\n  labs: JSON\\n  patient: Patient!\\n  data: [AppointmentField!]\\n}\\n\\ntype AppointmentField {\\n  id: ID!\\n  value: JSON\\n  field: Field!\\n}\\n\\ninput AppointmentInput {\\n  patient: ID!\\n  date: Date!\\n  type: AppointmentType!\\n  clinicId: ID!\\n  labs: JSON\\n}\\n\\ninput UpdateAppointmentInput {\\n  id: ID!\\n  labs: JSON\\n  data: [AppointmentFieldInput!]\\n}\\n\\ninput AppointmentQueryInput {\\n  clinicIds: [ID!]!\\n  patients: [ID]\\n  fromDate: Date\\n  toDate: Date\\n  type: AppointmentType\\n}\\n\\ninput AppointmentFieldInput {\\n  id: ID\\n  value: JSON\\n  fieldId: ID!\\n}\\n\\n########################### views ##################################\\n\\ntype View {\\n  id: ID!\\n  name: String\\n  default: Boolean\\n  user: User\\n  userId: String\\n  fieldGroups: [FieldGroup!]\\n}\\n\\ntype FieldGroup {\\n  id: ID!\\n  name: String!\\n  order: Int!\\n  fields: [Field!]\\n}\\n\\ntype Field {\\n  id: ID!\\n  name: String!\\n  order: Int!\\n  type: FieldType!\\n  required: Boolean!\\n}\\n\\ntype ViewStatus {\\n  id: ID!\\n  user: User\\n  userId: String\\n  defaultView: View\\n  defaultViewId: String\\n  activeView: View\\n  activeViewId: String\\n}\\n\\ninput ViewInput {\\n  id: ID\\n  name: String!\\n  fieldGroups: [FieldGroupInput!]\\n}\\n\\ninput FieldGroupInput {\\n  id: ID\\n  name: String!\\n  order: Int!\\n  fields: [FieldInput!]\\n}\\n\\ninput FieldInput {\\n  id: ID\\n  name: String!\\n  order: Int!\\n  type: FieldType!\\n  required: Boolean!\\n}\\n\\n########################### File ##################################\\n\\ntype Clinic {\\n  id: ID\\n  name: String!\\n  examinationPrice: Int\\n  followupPrice: Int\\n  duration: Int\\n  appointmentsCount: Int\\n  doctorName: String\\n  doctorTitle: String\\n  doctorJobDescription: String\\n  address: String\\n  phoneNo: String\\n  logo: File\\n}\\n\\ninput ClinicInput {\\n  id: ID\\n  doctorName: String\\n  doctorTitle: String\\n  doctorJobDescription: String\\n  address: String\\n  phoneNo: String\\n  logoId: ID\\n  examinationPrice: Int\\n  followupPrice: Int\\n  duration: Int\\n  appointmentsCount: Int\\n}\\n\\ntype File {\\n  id: ID!\\n  filename: String!\\n  mimetype: String\\n  encoding: String\\n  url: String\\n}\\n\\n########################### Snippet ##################################\\n\\ntype Snippet implements Searchable {\\n  id: ID!\\n  title: String!\\n  searchName: String!\\n  body: String!\\n}\\n\\ninput SnippetInput {\\n  title: String!\\n  body: String!\\n}\\n\\n########################### Labs ##################################\\n\\ntype PatientLab {\\n  id: ID\\n  patient: Patient\\n  name: String\\n  documents: [LabDocument!]\\n}\\n\\ntype LabDocument {\\n  id: ID\\n  file: File\\n}\\n\\ninput PatientLabInput {\\n  patientId: ID!\\n  name: String!\\n  documents: [ID!]\\n}\\n\\n########################### History ##################################\\n\\ntype MedicalHistory {\\n  id: ID!\\n  medicineName: String!\\n  frequency: String\\n  dose: String\\n  fromDate: Date\\n}\\n\\ntype FamilyHistory {\\n  id: ID!\\n  disease: String!\\n  relative: String!\\n}\\n\\ninput MedicalHistoryInput {\\n  medicineName: String!\\n  frequency: String\\n  dose: String\\n  fromDate: Date\\n  patientId: ID!\\n}\\n\\ninput FamilyHistoryInput {\\n  disease: String!\\n  relative: String!\\n  patientId: ID!\\n}\\n\\n########################### Expense ##################################\\n\\ntype Expense {\\n  id: ID!\\n  name: String!\\n  amount: Int!\\n  date: Date!\\n  invoiceNo: String\\n}\\n\\ninput ExpenseInput {\\n  name: String!\\n  amount: Int!\\n  date: Date!\\n  invoiceNo: String\\n  clinicId: ID!\\n}\\n\\n########################### Revenue ##################################\\n\\ntype Revenue {\\n  id: ID!\\n  name: String!\\n  amount: Int!\\n  date: Date!\\n  invoiceNo: String\\n}\\n\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n\n\n//# sourceURL=webpack:///./src/schema.gql?");

/***/ }),

/***/ "./src/services/ability.service.js":
/*!*****************************************!*\
  !*** ./src/services/ability.service.js ***!
  \*****************************************/
/*! exports provided: actions, subjects, can, createAbility, isAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return actions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"subjects\", function() { return subjects; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"can\", function() { return can; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createAbility\", function() { return createAbility; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isAdmin\", function() { return isAdmin; });\n/* harmony import */ var _casl_ability__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @casl/ability */ \"../node_modules/@casl/ability/dist/es5m/index.js\");\n\nconst actions = ['manage', 'create', 'read', 'update', 'delete'];\nconst subjects = ['Article', 'all'];\nconst can = ({\n  ability,\n  action,\n  subject\n}) => _casl_ability__WEBPACK_IMPORTED_MODULE_0__[\"ForbiddenError\"].from(ability).throwUnlessCan(action, subject);\nconst createAbility = rules => new _casl_ability__WEBPACK_IMPORTED_MODULE_0__[\"Ability\"](rules);\nconst isAdmin = ability => ability.can('manage', 'all');\n\n//# sourceURL=webpack:///./src/services/ability.service.js?");

/***/ }),

/***/ "./src/services/appointment.service.js":
/*!*********************************************!*\
  !*** ./src/services/appointment.service.js ***!
  \*********************************************/
/*! exports provided: getAppointmentLength, getSessionsStartingHour, calculateAppointmentTime, validDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAppointmentLength\", function() { return getAppointmentLength; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSessionsStartingHour\", function() { return getSessionsStartingHour; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateAppointmentTime\", function() { return calculateAppointmentTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validDate\", function() { return validDate; });\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/constants */ \"./src/utils/constants.js\");\n\n\nconst getAppointmentLength = () => _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"EXMAINTATION_LENGTH\"];\nconst getSessionsStartingHour = () => _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"EXMATION_STARTING_HOUR\"];\nconst calculateAppointmentTime = (appointments = [], date = new Date()) => moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('day').set('hour', getSessionsStartingHour()).add(getAppointmentLength() * appointments.length, 'minute').toDate();\nconst validDate = (newDate, appointments) => {\n  return appointments.every(({\n    date\n  }) => {\n    const startDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(date);\n    const endDate = moment__WEBPACK_IMPORTED_MODULE_0___default()(startDate).add(15, 'minutes');\n    return !moment__WEBPACK_IMPORTED_MODULE_0___default()(newDate).isBetween(startDate, endDate, 'minutes', '[)');\n  });\n};\n\n//# sourceURL=webpack:///./src/services/appointment.service.js?");

/***/ }),

/***/ "./src/services/auth.service.js":
/*!**************************************!*\
  !*** ./src/services/auth.service.js ***!
  \**************************************/
/*! exports provided: getUserPayloads, getUser, getAbility, getContextData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserPayloads\", function() { return getUserPayloads; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUser\", function() { return getUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAbility\", function() { return getAbility; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getContextData\", function() { return getContextData; });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/constants */ \"./src/utils/constants.js\");\n/* harmony import */ var _services_ability_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/services/ability.service */ \"./src/services/ability.service.js\");\n\n\n\n\n\n\nconst getUserPayloads = request => {\n  const authorizationHeader = request.get('authorization') || '';\n  const token = authorizationHeader.replace('Bearer ', '');\n\n  try {\n    const {\n      userId,\n      organizationId\n    } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.verify(token, _utils_constants__WEBPACK_IMPORTED_MODULE_3__[\"APP_SECRET\"]);\n    return {\n      userId: userId,\n      organizationId: organizationId\n    };\n  } catch (error) {\n    return null;\n  }\n};\nconst getUser = userId => {\n  if (!userId) return null;\n  const user = ___WEBPACK_IMPORTED_MODULE_2__[\"prisma\"].user.findOne({\n    where: {\n      id: userId\n    }\n  });\n  return user;\n};\nconst getAbility = user => {\n  const permissions = ramda__WEBPACK_IMPORTED_MODULE_1__[\"propOr\"]([], 'permissions')(user);\n  const ability = Object(_services_ability_service__WEBPACK_IMPORTED_MODULE_4__[\"createAbility\"])(permissions);\n  return ability;\n};\nconst getContextData = async ({\n  request\n}) => {\n  const {\n    userId,\n    organizationId\n  } = getUserPayloads(request) || {};\n  const user = await getUser(userId);\n  const ability = getAbility(user);\n  return {\n    user,\n    userId,\n    organizationId,\n    ability: getAbility(user),\n    isAdmin: Object(_services_ability_service__WEBPACK_IMPORTED_MODULE_4__[\"isAdmin\"])(ability)\n  };\n};\n\n//# sourceURL=webpack:///./src/services/auth.service.js?");

/***/ }),

/***/ "./src/services/date.service.js":
/*!**************************************!*\
  !*** ./src/services/date.service.js ***!
  \**************************************/
/*! exports provided: getStartOfDay, getEndOfDay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStartOfDay\", function() { return getStartOfDay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getEndOfDay\", function() { return getEndOfDay; });\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n\nconst getStartOfDay = date => moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('day').toDate();\nconst getEndOfDay = date => moment__WEBPACK_IMPORTED_MODULE_0___default()(date).endOf('day').toDate();\n\n//# sourceURL=webpack:///./src/services/date.service.js?");

/***/ }),

/***/ "./src/services/erros.service.js":
/*!***************************************!*\
  !*** ./src/services/erros.service.js ***!
  \***************************************/
/*! exports provided: APIExceptcion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APIExceptcion\", function() { return APIExceptcion; });\nclass APIExceptcion extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'APIExceptcionError';\n  }\n\n}\n\n//# sourceURL=webpack:///./src/services/erros.service.js?");

/***/ }),

/***/ "./src/services/revenue.service.js":
/*!*****************************************!*\
  !*** ./src/services/revenue.service.js ***!
  \*****************************************/
/*! exports provided: createAppointmentRevenue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createAppointmentRevenue\", function() { return createAppointmentRevenue; });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\nconst createAppointmentRevenue = async ({\n  id\n}) => {\n  const appointment = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findOne({\n    where: {\n      id\n    },\n    include: {\n      clinic: {\n        select: {\n          id: true,\n          examinationPrice: true,\n          followupPrice: true\n        }\n      }\n    }\n  });\n  const {\n    clinic,\n    type\n  } = appointment;\n  const revenue = {\n    name: type,\n    date: new Date(),\n    amount: type === 'Examination' ? clinic.examinationPrice : clinic.followupPrice\n  };\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].revenue.create({\n    data: {\n      clinic: {\n        connect: {\n          id: clinic.id\n        }\n      },\n      ...revenue\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/services/revenue.service.js?");

/***/ }),

/***/ "./src/services/upload.service.js":
/*!****************************************!*\
  !*** ./src/services/upload.service.js ***!
  \****************************************/
/*! exports provided: processUpload, upload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"processUpload\", function() { return processUpload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"upload\", function() { return upload; });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! shortid */ \"shortid\");\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst storeUpload = async ({\n  stream,\n  filename\n}) => {\n  const id = shortid__WEBPACK_IMPORTED_MODULE_3___default.a.generate();\n  const url = `${___WEBPACK_IMPORTED_MODULE_0__[\"UPLOAD_DIR\"]}/${id}-${filename}`; // eslint-disable-next-line no-undef\n\n  return new Promise((resolve, reject) => stream.pipe(Object(fs__WEBPACK_IMPORTED_MODULE_1__[\"createWriteStream\"])(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, url))).on('finish', () => resolve(url)).on('error', reject));\n};\n\nconst recordFile = file => ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].file.create({\n  data: file\n});\n\nconst processUpload = async upload => {\n  const {\n    createReadStream,\n    filename,\n    mimetype,\n    encoding\n  } = await upload;\n  const stream = createReadStream();\n  const url = await storeUpload({\n    stream,\n    filename\n  });\n  return recordFile({\n    filename,\n    mimetype,\n    encoding,\n    url\n  });\n};\n\nconst recordFile2 = (file, url) => {\n  const {\n    name: filename,\n    mimetype,\n    encoding\n  } = file;\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].file.create({\n    data: {\n      filename,\n      mimetype,\n      url,\n      encoding\n    }\n  });\n};\n\nconst upload = async file => {\n  const {\n    name\n  } = file;\n  const id = shortid__WEBPACK_IMPORTED_MODULE_3___default.a.generate();\n  const url = `${___WEBPACK_IMPORTED_MODULE_0__[\"UPLOAD_DIR\"]}/${id}-${name}`; // eslint-disable-next-line no-undef\n\n  file.mv(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(__dirname, url));\n  return recordFile2(file, url);\n};\n\n//# sourceURL=webpack:///./src/services/upload.service.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: EXMATION_STARTING_HOUR, EXMAINTATION_LENGTH, APP_SECRET, SUBJECTS, ACTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXMATION_STARTING_HOUR\", function() { return EXMATION_STARTING_HOUR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXMAINTATION_LENGTH\", function() { return EXMAINTATION_LENGTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP_SECRET\", function() { return APP_SECRET; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SUBJECTS\", function() { return SUBJECTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ACTIONS\", function() { return ACTIONS; });\nconst EXMATION_STARTING_HOUR = 19;\nconst EXMAINTATION_LENGTH = 15;\nconst APP_SECRET = 'sdfsdf39f';\nconst SUBJECTS = {\n  ALL: 'all',\n  APPOINTMENT: 'Appointment',\n  PATIENT: 'Patient',\n  REPORT: 'Report'\n};\nconst ACTIONS = {\n  MANAGE: 'manage',\n  VIEW: 'view',\n  CREATE: 'create',\n  UPDATE: 'update',\n  DELETE: 'delete'\n};\n\n//# sourceURL=webpack:///./src/utils/constants.js?");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@prisma/client\");\n\n//# sourceURL=webpack:///external_%22@prisma/client%22?");

/***/ }),

/***/ "apollo-server-core":
/*!*************************************!*\
  !*** external "apollo-server-core" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-core\");\n\n//# sourceURL=webpack:///external_%22apollo-server-core%22?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-fileupload\");\n\n//# sourceURL=webpack:///external_%22express-fileupload%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ }),

/***/ "graphql-shield":
/*!*********************************!*\
  !*** external "graphql-shield" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-shield\");\n\n//# sourceURL=webpack:///external_%22graphql-shield%22?");

/***/ }),

/***/ "graphql-yoga":
/*!*******************************!*\
  !*** external "graphql-yoga" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql-yoga\");\n\n//# sourceURL=webpack:///external_%22graphql-yoga%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mkdirp\");\n\n//# sourceURL=webpack:///external_%22mkdirp%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment-timezone\");\n\n//# sourceURL=webpack:///external_%22moment-timezone%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ }),

/***/ "ramda-adjunct":
/*!********************************!*\
  !*** external "ramda-adjunct" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda-adjunct\");\n\n//# sourceURL=webpack:///external_%22ramda-adjunct%22?");

/***/ }),

/***/ "shortid":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"shortid\");\n\n//# sourceURL=webpack:///external_%22shortid%22?");

/***/ })

/******/ });