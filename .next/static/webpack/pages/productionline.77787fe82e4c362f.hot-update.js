"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/productionline",{

/***/ "./ethereum/bottleProduction.js":
/*!**************************************!*\
  !*** ./ethereum/bottleProduction.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _web3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web3 */ \"./ethereum/web3.js\");\n/* harmony import */ var _build_BottleProduction_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build/BottleProduction.json */ \"./ethereum/build/BottleProduction.json\");\n/*\r\npurpose: To access the contract (register.sol) instance from inside the application without repeating these steps \r\nEtherscan: https://ropsten.etherscan.io/tx/0xdd82c9e0dbc600e899aa03ef1232cbf193b16b7617335ea07f37e47a37d275c3\r\n*/ \n\nconst instance = new _web3__WEBPACK_IMPORTED_MODULE_0__[\"default\"].eth.Contract(_build_BottleProduction_json__WEBPACK_IMPORTED_MODULE_1__.abi);\n/* harmony default export */ __webpack_exports__[\"default\"] = (instance);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ldGhlcmV1bS9ib3R0bGVQcm9kdWN0aW9uLmpzIiwibWFwcGluZ3MiOiI7OztBQUFBOzs7QUFHQSxHQUMwQjtBQUNtQztBQUU3RCxNQUFNRSxXQUFXLElBQUlGLGlEQUFRLENBQUNJLFFBQVEsQ0FDbENILDZEQUFvQjtBQUt4QiwrREFBZUMsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9ldGhlcmV1bS9ib3R0bGVQcm9kdWN0aW9uLmpzP2JmNmUiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxucHVycG9zZTogVG8gYWNjZXNzIHRoZSBjb250cmFjdCAocmVnaXN0ZXIuc29sKSBpbnN0YW5jZSBmcm9tIGluc2lkZSB0aGUgYXBwbGljYXRpb24gd2l0aG91dCByZXBlYXRpbmcgdGhlc2Ugc3RlcHMgXHJcbkV0aGVyc2NhbjogaHR0cHM6Ly9yb3BzdGVuLmV0aGVyc2Nhbi5pby90eC8weGRkODJjOWUwZGJjNjAwZTg5OWFhMDNlZjEyMzJjYmYxOTNiMTZiNzYxNzMzNWVhMDdmMzdlNDdhMzdkMjc1YzNcclxuKi9cclxuaW1wb3J0IHdlYjMgZnJvbSAnLi93ZWIzJzsgXHJcbmltcG9ydCBCb3R0bGVQcm9kdWN0aW9uIGZyb20gJy4vYnVpbGQvQm90dGxlUHJvZHVjdGlvbi5qc29uJzsgXHJcblxyXG5jb25zdCBpbnN0YW5jZSA9IG5ldyB3ZWIzLmV0aC5Db250cmFjdChcclxuICAgIEJvdHRsZVByb2R1Y3Rpb24uYWJpLFxyXG4gICAgLy8gICcweDI0ODIxNzU4OENGZDA1Mjk1NTcyMzlGM0M3NTZiOTM3MTAzYzBCZmMnXHJcbiAgICAgLy8gQWRkcmVzcyBvZiB0aGUgYm90dGxlcHJvZHVjdGlvbi5zb2wgY29udHJhY3QgaW4gcm9wc3RlbiBuZXR3b3JrXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsgIl0sIm5hbWVzIjpbIndlYjMiLCJCb3R0bGVQcm9kdWN0aW9uIiwiaW5zdGFuY2UiLCJldGgiLCJDb250cmFjdCIsImFiaSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./ethereum/bottleProduction.js\n"));

/***/ })

});