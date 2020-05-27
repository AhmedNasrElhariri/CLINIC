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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: prisma */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"prisma\", function() { return prisma; });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-yoga */ \"graphql-yoga\");\n/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_yoga__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-server-core */ \"apollo-server-core\");\n/* harmony import */ var apollo_server_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_server_core__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _schema_gql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schema.gql */ \"./src/schema.gql\");\n/* harmony import */ var _schema_gql__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_schema_gql__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resolvers */ \"./src/resolvers/index.js\");\n/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/services/auth.service */ \"./src/services/auth.service.js\");\n/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! graphql-shield */ \"graphql-shield\");\n/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(graphql_shield__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_4__[\"PrismaClient\"]();\nconst options = {\n  endpoint: '/graphql',\n  playground: '/playground'\n};\nconst isAuthenticated = Object(graphql_shield__WEBPACK_IMPORTED_MODULE_8__[\"rule\"])({\n  cache: 'contextual'\n})(async (_, __, ctx) => {\n  const {\n    request\n  } = ctx;\n  const {\n    userId,\n    organizationId\n  } = Object(_services_auth_service__WEBPACK_IMPORTED_MODULE_7__[\"getUserPayloads\"])(request);\n  ctx.userId = userId;\n  ctx.organizationId = organizationId;\n  return true;\n});\nconst permissions = Object(graphql_shield__WEBPACK_IMPORTED_MODULE_8__[\"shield\"])({\n  Query: {\n    '*': isAuthenticated,\n    hello: graphql_shield__WEBPACK_IMPORTED_MODULE_8__[\"allow\"]\n  },\n  Mutation: {\n    '*': isAuthenticated,\n    login: graphql_shield__WEBPACK_IMPORTED_MODULE_8__[\"allow\"],\n    verify: graphql_shield__WEBPACK_IMPORTED_MODULE_8__[\"allow\"]\n  }\n}, {\n  fallbackError: new apollo_server_core__WEBPACK_IMPORTED_MODULE_3__[\"AuthenticationError\"]('Not Authenticated'),\n  debug: true\n});\nconst server = new graphql_yoga__WEBPACK_IMPORTED_MODULE_2__[\"GraphQLServer\"]({\n  typeDefs: (_schema_gql__WEBPACK_IMPORTED_MODULE_5___default()),\n  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  middlewares: [permissions],\n  context: ({\n    request\n  }) => ({\n    request\n  })\n});\nconst app = server.express;\n\nif (false) {}\n\nserver.start(options, () => console.log('Server is running on localhost:4000'));\n\n//# sourceURL=webpack:///./src/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ \"./src/resolvers/query/index.js\");\n/* harmony import */ var _mutation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation */ \"./src/resolvers/mutation/index.js\");\n/* harmony import */ var _appointment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointment */ \"./src/resolvers/appointment/index.js\");\n/* harmony import */ var _patient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patient */ \"./src/resolvers/patient/index.js\");\n/* harmony import */ var _appointment_field___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appointment-field/ */ \"./src/resolvers/appointment-field/index.js\");\n/* harmony import */ var _custom_resolvers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom-resolvers */ \"./src/resolvers/custom-resolvers/index.js\");\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Query: _query__WEBPACK_IMPORTED_MODULE_0__,\n  Mutation: _mutation__WEBPACK_IMPORTED_MODULE_1__,\n  Appointment: _appointment__WEBPACK_IMPORTED_MODULE_2__,\n  Patient: _patient__WEBPACK_IMPORTED_MODULE_3__,\n  AppointmentField: _appointment_field___WEBPACK_IMPORTED_MODULE_4__,\n  ..._custom_resolvers__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceURL=webpack:///./src/resolvers/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _services_date_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/date.service */ \"./src/services/date.service.js\");\n/* harmony import */ var _services_appointment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/services/appointment.service */ \"./src/services/appointment.service.js\");\n\n\n\n\nconst getDayAppointments = day => {\n  const start = Object(_services_date_service__WEBPACK_IMPORTED_MODULE_1__[\"getStartOfDay\"])(day);\n  const end = Object(_services_date_service__WEBPACK_IMPORTED_MODULE_1__[\"getEndOfDay\"])(day);\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findMany({\n    where: {\n      date: {\n        gte: start,\n        lte: end\n      }\n    }\n  });\n};\n\nconst createAppointment = async (_, {\n  input: {\n    patient,\n    ...appointment\n  }\n}, {\n  userId\n}) => {\n  const appointments = await getDayAppointments();\n  const date = Object(_services_appointment_service__WEBPACK_IMPORTED_MODULE_2__[\"calculateAppointmentTime\"])(appointments, appointment.date);\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.create({\n    data: { ...appointment,\n      specialty: 'Dentistry',\n      status: 'Scheduled',\n      patient: {\n        connect: {\n          id: patient\n        }\n      },\n      date,\n      doctor: {\n        connect: {\n          id: userId\n        }\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createAppointment);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-appointment.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-default-view.js":
/*!*******************************************************!*\
  !*** ./src/resolvers/mutation/create-default-view.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\nconst view = {\n  name: 'Default View',\n  fieldGroups: [{\n    name: 'Vital Data',\n    order: 0,\n    fields: [{\n      name: 'Height',\n      required: false,\n      type: 'Number',\n      order: 0\n    }, {\n      name: 'Weight',\n      required: false,\n      type: 'Number',\n      order: 1\n    }, {\n      name: 'Glucose Level',\n      required: false,\n      type: 'Number',\n      order: 2\n    }, {\n      name: 'Pressure',\n      required: false,\n      type: 'Number',\n      order: 3\n    }]\n  }, {\n    name: 'Complain And Symptoms',\n    order: 1,\n    fields: [{\n      name: 'Complain',\n      required: false,\n      type: 'LongText',\n      order: 0\n    }, {\n      name: 'Signs',\n      required: false,\n      type: 'LongText',\n      order: 1\n    }, {\n      name: 'Symptoms',\n      required: false,\n      type: 'LongText',\n      order: 2\n    }]\n  }, {\n    name: 'Recommendations',\n    order: 2,\n    fields: [{\n      name: 'Prescription',\n      required: false,\n      type: 'LongText',\n      order: 0\n    }, {\n      name: 'Recommendations',\n      required: false,\n      type: 'LongText',\n      order: 1\n    }]\n  }]\n};\n\nconst createView = async (_, __, {\n  userId\n}) => {\n  const {\n    name,\n    fieldGroups\n  } = view;\n  const {\n    id\n  } = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].view.create({\n    data: {\n      name,\n      user: {\n        connect: {\n          id: userId\n        }\n      },\n      fieldGroups: {\n        create: fieldGroups.map(fg => ({ ...fg,\n          fields: {\n            create: fg.fields\n          }\n        }))\n      }\n    }\n  });\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].viewStatus.create({\n    data: {\n      user: {\n        connect: {\n          id: userId\n        }\n      },\n      activeView: {\n        connect: {\n          id: id\n        }\n      },\n      defaultView: {\n        connect: {\n          id: id\n        }\n      }\n    }\n  }).then(() => true).catch(() => false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createView);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-default-view.js?");

/***/ }),

/***/ "./src/resolvers/mutation/create-patient.js":
/*!**************************************************!*\
  !*** ./src/resolvers/mutation/create-patient.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst createPatient = (_, {\n  input: patient\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.create({\n    data: patient\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createPatient);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/create-patient.js?");

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
/*! exports provided: createPatient, createAppointment, updateAppointment, archiveAppointment, setAppointmentDone, login, verify, createView, editView, activateView, createDefaultView, adjustAppointment, cancelAppointment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _create_patient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-patient */ \"./src/resolvers/mutation/create-patient.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createPatient\", function() { return _create_patient__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _create_appointment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-appointment */ \"./src/resolvers/mutation/create-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createAppointment\", function() { return _create_appointment__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _update_appointment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./update-appointment */ \"./src/resolvers/mutation/update-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"updateAppointment\", function() { return _update_appointment__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _archive_appointment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./archive-appointment */ \"./src/resolvers/mutation/archive-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"archiveAppointment\", function() { return _archive_appointment__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _set_appointment_done__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./set-appointment-done */ \"./src/resolvers/mutation/set-appointment-done.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"setAppointmentDone\", function() { return _set_appointment_done__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login */ \"./src/resolvers/mutation/login.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return _login__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _verify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./verify */ \"./src/resolvers/mutation/verify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"verify\", function() { return _verify__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _create_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-view */ \"./src/resolvers/mutation/create-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createView\", function() { return _create_view__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _edit_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./edit-view */ \"./src/resolvers/mutation/edit-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"editView\", function() { return _edit_view__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _activate_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./activate-view */ \"./src/resolvers/mutation/activate-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"activateView\", function() { return _activate_view__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _create_default_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./create-default-view */ \"./src/resolvers/mutation/create-default-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createDefaultView\", function() { return _create_default_view__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _adjust_appointment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./adjust-appointment */ \"./src/resolvers/mutation/adjust-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"adjustAppointment\", function() { return _adjust_appointment__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _cancel_appointment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cancel-appointment */ \"./src/resolvers/mutation/cancel-appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cancelAppointment\", function() { return _cancel_appointment__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/resolvers/mutation/index.js?");

/***/ }),

/***/ "./src/resolvers/mutation/login.js":
/*!*****************************************!*\
  !*** ./src/resolvers/mutation/login.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/constants */ \"./src/utils/constants.js\");\n\n\n\n\n\nconst login = async (_, {\n  email,\n  password\n}) => {\n  const user = await ___WEBPACK_IMPORTED_MODULE_2__[\"prisma\"].user.findOne({\n    where: {\n      email\n    }\n  });\n\n  if (!user) {\n    throw new Error('No such user found');\n  }\n\n  const valid = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.compare(password, user.password);\n\n  if (!valid) {\n    throw new Error('Invalid password');\n  }\n\n  const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.sign({\n    userId: user.id,\n    organizationId: user.organizationId\n  }, _utils_constants__WEBPACK_IMPORTED_MODULE_3__[\"APP_SECRET\"]);\n  return {\n    token,\n    user\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/login.js?");

/***/ }),

/***/ "./src/resolvers/mutation/set-appointment-done.js":
/*!********************************************************!*\
  !*** ./src/resolvers/mutation/set-appointment-done.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst setAppointmentDone = (_, {\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.update({\n    data: {\n      status: 'Done'\n    },\n    where: {\n      id\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (setAppointmentDone);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/set-appointment-done.js?");

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

/***/ "./src/resolvers/mutation/verify.js":
/*!******************************************!*\
  !*** ./src/resolvers/mutation/verify.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services/auth.service */ \"./src/services/auth.service.js\");\n\n\n\nconst login = async (_, __, {\n  request\n}) => {\n  const {\n    userId\n  } = Object(_services_auth_service__WEBPACK_IMPORTED_MODULE_1__[\"getUserPayloads\"])(request);\n  const user = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].user.findOne({\n    where: {\n      id: userId\n    }\n  });\n  return user;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n//# sourceURL=webpack:///./src/resolvers/mutation/verify.js?");

/***/ }),

/***/ "./src/resolvers/patient/appointments.js":
/*!***********************************************!*\
  !*** ./src/resolvers/patient/appointments.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst appointments = ({\n  id\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient({\n    id\n  }).appointments();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointments);\n\n//# sourceURL=webpack:///./src/resolvers/patient/appointments.js?");

/***/ }),

/***/ "./src/resolvers/patient/index.js":
/*!****************************************!*\
  !*** ./src/resolvers/patient/index.js ***!
  \****************************************/
/*! exports provided: appointments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appointments */ \"./src/resolvers/patient/appointments.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointments\", function() { return _appointments__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/resolvers/patient/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst appointmentHistory = async (_, {\n  id\n}) => {\n  const appointment = await ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findOne({\n    where: {\n      id\n    }\n  });\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findMany({\n    where: {\n      status: 'Archived',\n      patient: {\n        id: appointment.patientId\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointmentHistory);\n\n//# sourceURL=webpack:///./src/resolvers/query/appointment-history.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst appointments = (_, {\n  input\n}) => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].appointment.findMany({\n    where: {\n      date: {\n        gte: ramda__WEBPACK_IMPORTED_MODULE_1__[\"prop\"]('fromDate')(input),\n        lte: ramda__WEBPACK_IMPORTED_MODULE_1__[\"prop\"]('toDate')(input)\n      }\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appointments);\n\n//# sourceURL=webpack:///./src/resolvers/query/appointments.js?");

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
/*! exports provided: hello, patients, appointments, appointment, appointmentHistory, patient, listMyViews, listMyViewsStatus, activeView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hello */ \"./src/resolvers/query/hello.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hello\", function() { return _hello__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _patients__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patients */ \"./src/resolvers/query/patients.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patients\", function() { return _patients__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _appointments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appointments */ \"./src/resolvers/query/appointments.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointments\", function() { return _appointments__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _appointment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appointment */ \"./src/resolvers/query/appointment.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointment\", function() { return _appointment__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _appointment_history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./appointment-history */ \"./src/resolvers/query/appointment-history.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"appointmentHistory\", function() { return _appointment_history__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _patient__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./patient */ \"./src/resolvers/query/patient.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"patient\", function() { return _patient__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _list_my_views__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list-my-views */ \"./src/resolvers/query/list-my-views.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"listMyViews\", function() { return _list_my_views__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _list_my_views_status__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list-my-views-status */ \"./src/resolvers/query/list-my-views-status.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"listMyViewsStatus\", function() { return _list_my_views_status__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _active_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./active-view */ \"./src/resolvers/query/active-view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"activeView\", function() { return _active_view__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/resolvers/query/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ */ \"./src/index.js\");\n\n\nconst patients = () => {\n  return ___WEBPACK_IMPORTED_MODULE_0__[\"prisma\"].patient.findMany();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (patients);\n\n//# sourceURL=webpack:///./src/resolvers/query/patients.js?");

/***/ }),

/***/ "./src/schema.gql":
/*!************************!*\
  !*** ./src/schema.gql ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"},\"directives\":[]},{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"VitalData\"},\"directives\":[]},{\"kind\":\"ScalarTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"},\"directives\":[]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientMembershipType\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Primary\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Secondary\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Examination\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Followup\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Sex\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Female\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Male\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldType\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Text\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Number\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"LongText\"},\"directives\":[]}]},{\"kind\":\"EnumTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentStatus\"},\"directives\":[],\"values\":[{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Scheduled\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Cancelled\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Missed\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Changed\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Archived\"},\"directives\":[]},{\"kind\":\"EnumValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Done\"},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Query\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"hello\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patients\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointments\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"input\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentQueryInput\"}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointmentHistory\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"listMyViews\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activeView\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"listMyViewsStatus\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewStatus\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Mutation\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createPatient\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"input\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"input\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"updateAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointment\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"UpdateAppointmentInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"archiveAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"setAppointmentDone\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createView\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"view\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"editView\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"groups\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroupInput\"}}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"login\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"email\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"password\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AuthPayload\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"verify\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"token\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activateView\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"viewId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewStatus\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"createDefaultView\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"adjustAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"cancelAppointment\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AuthPayload\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"token\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"UserLoginInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"email\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"password\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"email\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientMembershipType\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"phoneNo\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"age\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"sex\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Sex\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"appointments\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"phoneNo\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"age\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"sex\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Sex\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PatientMembershipType\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Appointment\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"status\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentStatus\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"labs\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Patient\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentField\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentField\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"value\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"field\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Field\"}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patient\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"date\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"labs\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"UpdateAppointmentInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"labs\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentFieldInput\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentQueryInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ids\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"patients\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fromDate\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"toDate\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Date\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentType\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"AppointmentFieldInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"value\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"JSON\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fieldId\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"default\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"userId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fieldGroups\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroup\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroup\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fields\"},\"arguments\":[],\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Field\"}}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Field\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldType\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"required\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewStatus\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"user\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"User\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"userId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"defaultView\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"defaultViewId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activeView\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"View\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"activeViewId\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"ViewInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fieldGroups\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroupInput\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldGroupInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"fields\"},\"type\":{\"kind\":\"ListType\",\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldInput\"}}}},\"directives\":[]}]},{\"kind\":\"InputObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldInput\"},\"directives\":[],\"fields\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"order\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"type\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"FieldType\"}}},\"directives\":[]},{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"required\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Boolean\"}}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":3505}};\n    doc.loc.source = {\"body\":\"scalar Date\\nscalar VitalData\\nscalar JSON\\n\\nenum PatientMembershipType {\\n  Primary\\n  Secondary\\n}\\n\\nenum AppointmentType {\\n  Examination\\n  Followup\\n}\\n\\nenum Sex {\\n  Female\\n  Male\\n}\\n\\nenum FieldType {\\n  Text\\n  Number\\n  LongText\\n}\\n\\nenum AppointmentStatus {\\n  Scheduled\\n  Cancelled\\n  Missed\\n  Changed\\n  Archived\\n  Done\\n}\\n\\n########################### Query ##################################\\n\\ntype Query {\\n  hello(name: String): String!\\n  patients: [Patient!]\\n  appointments(input: AppointmentQueryInput): [Appointment!]\\n  appointment(id: ID!): Appointment\\n  appointmentHistory(id: ID!): [Appointment!]\\n  patient(id: ID!): Patient\\n  listMyViews: [View!]\\n  activeView: View!\\n  listMyViewsStatus: ViewStatus\\n}\\n\\n########################### Mutation ##################################\\n\\ntype Mutation {\\n  createPatient(input: PatientInput!): Patient!\\n  createAppointment(input: AppointmentInput!): Appointment!\\n  updateAppointment(appointment: UpdateAppointmentInput!): Appointment!\\n  archiveAppointment(id: ID!): Appointment!\\n  setAppointmentDone(id: ID!): Appointment!\\n  createView(view: ViewInput!): Boolean\\n  editView(groups: [FieldGroupInput!]): Boolean\\n  login(email: String!, password: String!): AuthPayload\\n  verify(token: String): User\\n  activateView(viewId: ID!): ViewStatus!\\n  createDefaultView: Boolean\\n  adjustAppointment(id: ID!, date: Date!): Appointment!\\n  cancelAppointment(id: ID!): Appointment!\\n}\\n\\n########################### Auth ##################################\\n\\ntype AuthPayload {\\n  token: String\\n  user: User\\n}\\n\\ninput UserLoginInput {\\n  email: String!\\n  password: String!\\n}\\n\\n########################### User ##################################\\n\\ntype User {\\n  id: ID!\\n  name: String!\\n  email: String!\\n}\\n\\n########################### Patient ##################################\\n\\ntype Patient {\\n  id: ID!\\n  type: PatientMembershipType!\\n  name: String!\\n  phoneNo: String!\\n  age: Int!\\n  sex: Sex!\\n  appointments: [Appointment!]\\n}\\n\\ninput PatientInput {\\n  name: String!\\n  phoneNo: String!\\n  age: Int!\\n  sex: Sex!\\n  type: PatientMembershipType!\\n}\\n\\n########################### Appointment ##################################\\n\\ntype Appointment {\\n  id: ID!\\n  date: Date\\n  type: AppointmentType!\\n  status: AppointmentStatus!\\n  labs: JSON\\n  patient: Patient!\\n  data: [AppointmentField!]\\n}\\n\\ntype AppointmentField {\\n  id: ID!\\n  value: JSON\\n  field: Field!\\n}\\n\\ninput AppointmentInput {\\n  patient: ID!\\n  date: Date!\\n  type: AppointmentType!\\n  labs: JSON\\n}\\n\\ninput UpdateAppointmentInput {\\n  id: ID!\\n  labs: JSON\\n  data: [AppointmentFieldInput!]\\n}\\n\\ninput AppointmentQueryInput {\\n  ids: [ID]\\n  patients: [ID]\\n  fromDate: Date\\n  toDate: Date\\n  type: AppointmentType\\n}\\n\\ninput AppointmentFieldInput {\\n  id: ID\\n  value: JSON\\n  fieldId: ID!\\n}\\n\\n########################### views ##################################\\n\\ntype View {\\n  id: ID!\\n  name: String\\n  default: Boolean\\n  user: User\\n  userId: String\\n  fieldGroups: [FieldGroup!]\\n}\\n\\ntype FieldGroup {\\n  id: ID!\\n  name: String!\\n  order: Int!\\n  fields: [Field!]\\n}\\n\\ntype Field {\\n  id: ID!\\n  name: String!\\n  order: Int!\\n  type: FieldType!\\n  required: Boolean!\\n}\\n\\ntype ViewStatus {\\n  id: ID!\\n  user: User\\n  userId: String\\n  defaultView: View\\n  defaultViewId: String\\n  activeView: View\\n  activeViewId: String\\n}\\n\\ninput ViewInput {\\n  id: ID\\n  name: String!\\n  fieldGroups: [FieldGroupInput!]\\n}\\n\\ninput FieldGroupInput {\\n  id: ID\\n  name: String!\\n  order: Int!\\n  fields: [FieldInput!]\\n}\\n\\ninput FieldInput {\\n  id: ID\\n  name: String!\\n  order: Int!\\n  type: FieldType!\\n  required: Boolean!\\n}\\n\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n\n\n//# sourceURL=webpack:///./src/schema.gql?");

/***/ }),

/***/ "./src/services/appointment.service.js":
/*!*********************************************!*\
  !*** ./src/services/appointment.service.js ***!
  \*********************************************/
/*! exports provided: getAppointmentLength, getSessionsStartingHour, calculateAppointmentTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAppointmentLength\", function() { return getAppointmentLength; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSessionsStartingHour\", function() { return getSessionsStartingHour; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateAppointmentTime\", function() { return calculateAppointmentTime; });\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/constants */ \"./src/utils/constants.js\");\n\n\nconst getAppointmentLength = () => _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"EXMAINTATION_LENGTH\"];\nconst getSessionsStartingHour = () => _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"EXMATION_STARTING_HOUR\"];\nconst calculateAppointmentTime = (appointments = [], date = new Date()) => moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('day').set('hour', getSessionsStartingHour()).add(getAppointmentLength() * appointments.length, 'minute').toDate();\n\n//# sourceURL=webpack:///./src/services/appointment.service.js?");

/***/ }),

/***/ "./src/services/auth.service.js":
/*!**************************************!*\
  !*** ./src/services/auth.service.js ***!
  \**************************************/
/*! exports provided: getUserPayloads, verify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserPayloads\", function() { return getUserPayloads; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verify\", function() { return verify; });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ \"./src/utils/constants.js\");\n\n\nconst getUserPayloads = request => {\n  const authorizationHeader = request.get('authorization') || '';\n  const token = authorizationHeader.replace('Bearer ', '');\n  const {\n    userId,\n    organizationId\n  } = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.verify(token, _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"APP_SECRET\"]);\n  return {\n    userId: userId,\n    organizationId: organizationId\n  };\n};\nconst verify = token => jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.verify(token, _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"APP_SECRET\"]);\n\n//# sourceURL=webpack:///./src/services/auth.service.js?");

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

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: EXMATION_STARTING_HOUR, EXMAINTATION_LENGTH, APP_SECRET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXMATION_STARTING_HOUR\", function() { return EXMATION_STARTING_HOUR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXMAINTATION_LENGTH\", function() { return EXMAINTATION_LENGTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP_SECRET\", function() { return APP_SECRET; });\nconst EXMATION_STARTING_HOUR = 19;\nconst EXMAINTATION_LENGTH = 15;\nconst APP_SECRET = 'sdfsdf39f';\n\n//# sourceURL=webpack:///./src/utils/constants.js?");

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

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

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

/***/ })

/******/ });