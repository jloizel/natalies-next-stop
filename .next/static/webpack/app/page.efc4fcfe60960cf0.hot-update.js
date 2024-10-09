"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/projects/projectCard/projectCard.tsx":
/*!*********************************************************!*\
  !*** ./components/projects/projectCard/projectCard.tsx ***!
  \*********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _projectCard_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectCard.module.css */ \"(app-pages-browser)/./components/projects/projectCard/projectCard.module.css\");\n/* harmony import */ var _projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_FaGithub_react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=FaGithub!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_IoIosLink_react_icons_io__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=IoIosLink!=!react-icons/io */ \"(app-pages-browser)/./node_modules/react-icons/io/index.mjs\");\n/* harmony import */ var _scrollAnimations_bounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../scrollAnimations/bounce */ \"(app-pages-browser)/./components/scrollAnimations/bounce.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst ProjectCard = ()=>{\n    _s();\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            id: \"\",\n            image: \"\",\n            title: \"\",\n            details: \"\",\n            languages: \"\",\n            summary: \"\",\n            href: \"\"\n        }\n    ]);\n    const getData = ()=>{\n        fetch(\"/data/projects.json\", {\n            headers: {\n                \"Content-Type\": \"application/json\",\n                \"Accept\": \"application/json\"\n            }\n        }).then(function(response) {\n            return response.json();\n        }).then(function(myJson) {\n            setData(myJson);\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        getData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().projectCardContainer),\n        children: data.map((projectCard, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_scrollAnimations_bounce__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().card),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().card),\n                    href: projectCard.href,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().imageContainer),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().image),\n                                    src: projectCard.image,\n                                    alt: projectCard.title\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                    lineNumber: 50,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().showProject),\n                                    children: \"Show Project\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                    lineNumber: 51,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                            lineNumber: 49,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().content),\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().top),\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().title),\n                                            children: projectCard.title\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                            lineNumber: 55,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().line)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                            lineNumber: 57,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().icons),\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaGithub_react_icons_fa__WEBPACK_IMPORTED_MODULE_4__.FaGithub, {\n                                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().icon)\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                                    lineNumber: 59,\n                                                    columnNumber: 19\n                                                }, undefined),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_IoIosLink_react_icons_io__WEBPACK_IMPORTED_MODULE_5__.IoIosLink, {\n                                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().icon)\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                                    lineNumber: 60,\n                                                    columnNumber: 19\n                                                }, undefined)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                            lineNumber: 58,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                    lineNumber: 54,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().languages),\n                                    children: projectCard.languages\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                    lineNumber: 63,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: (_projectCard_module_css__WEBPACK_IMPORTED_MODULE_2___default().summary),\n                                    children: [\n                                        projectCard.summary,\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            onClick: ()=>window.open(\"/projects/metroguessr\"),\n                                            children: \" Learn more >\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                            lineNumber: 66,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                            lineNumber: 53,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                    lineNumber: 48,\n                    columnNumber: 11\n                }, undefined)\n            }, projectCard.id, false, {\n                fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n                lineNumber: 47,\n                columnNumber: 11\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\jacky\\\\OneDrive\\\\Desktop\\\\GitHub\\\\jloizel.github.io\\\\components\\\\projects\\\\projectCard\\\\projectCard.tsx\",\n        lineNumber: 45,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ProjectCard, \"qWT6Pr5srgCDH7WrXpLHIel4f9g=\");\n_c = ProjectCard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProjectCard);\nvar _c;\n$RefreshReg$(_c, \"ProjectCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcHJvamVjdHMvcHJvamVjdENhcmQvcHJvamVjdENhcmQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRWtEO0FBQ0w7QUFFSDtBQUNDO0FBQ1E7QUFFbkQsTUFBTU8sY0FBd0I7O0lBQzVCLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHUCwrQ0FBUUEsQ0FBQztRQUMvQjtZQUNFUSxJQUFJO1lBQ0pDLE9BQU87WUFDUEMsT0FBTztZQUNQQyxTQUFTO1lBQ1RDLFdBQVc7WUFDWEMsU0FBUztZQUNUQyxNQUFNO1FBQ1I7S0FDRDtJQUVELE1BQU1DLFVBQVE7UUFDWkMsTUFBTSx1QkFBc0I7WUFDeEJDLFNBQVU7Z0JBQ1IsZ0JBQWdCO2dCQUNoQixVQUFVO1lBQ1o7UUFDRixHQUVDQyxJQUFJLENBQUMsU0FBU0MsUUFBUTtZQUNyQixPQUFPQSxTQUFTQyxJQUFJO1FBQ3RCLEdBQ0NGLElBQUksQ0FBQyxTQUFTRyxNQUFNO1lBQ25CZCxRQUFRYztRQUNWO0lBQ0Y7SUFFRnRCLGdEQUFTQSxDQUFDO1FBQ1JnQjtJQUNGLEdBQUUsRUFBRTtJQUdKLHFCQUNFLDhEQUFDTztRQUFJQyxXQUFXdEIscUZBQTJCO2tCQUN0Q0ssS0FBS21CLEdBQUcsQ0FBQyxDQUFDQyxhQUFhQyxzQkFDdEIsOERBQUN2QixnRUFBTUE7Z0JBQUNtQixXQUFXdEIscUVBQVc7MEJBQzlCLDRFQUFDNEI7b0JBQUVOLFdBQVd0QixxRUFBVztvQkFBRWEsTUFBTVksWUFBWVosSUFBSTs7c0NBQy9DLDhEQUFDUTs0QkFBSUMsV0FBV3RCLCtFQUFxQjs7OENBQ25DLDhEQUFDOEI7b0NBQUlSLFdBQVd0QixzRUFBWTtvQ0FBRStCLEtBQUtOLFlBQVlqQixLQUFLO29DQUFFd0IsS0FBS1AsWUFBWWhCLEtBQUs7Ozs7Ozs4Q0FDNUUsOERBQUN3QjtvQ0FBS1gsV0FBV3RCLDRFQUFrQjs4Q0FBRTs7Ozs7Ozs7Ozs7O3NDQUV2Qyw4REFBQ3FCOzRCQUFJQyxXQUFXdEIsd0VBQWM7OzhDQUM1Qiw4REFBQ3FCO29DQUFJQyxXQUFXdEIsb0VBQVU7O3NEQUN4Qiw4REFBQ3FCOzRDQUFJQyxXQUFXdEIsc0VBQVk7c0RBQUd5QixZQUFZaEIsS0FBSzs7Ozs7O3NEQUVoRCw4REFBQ1k7NENBQUlDLFdBQVd0QixxRUFBVzs7Ozs7O3NEQUMzQiw4REFBQ3FCOzRDQUFJQyxXQUFXdEIsc0VBQVk7OzhEQUMxQiw4REFBQ0Msb0ZBQVFBO29EQUFDcUIsV0FBV3RCLHFFQUFXOzs7Ozs7OERBQ2hDLDhEQUFDRSxzRkFBU0E7b0RBQUNvQixXQUFXdEIscUVBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FHckMsOERBQUNxQjtvQ0FBSUMsV0FBV3RCLDBFQUFnQjs4Q0FBR3lCLFlBQVlkLFNBQVM7Ozs7Ozs4Q0FDeEQsOERBQUNVO29DQUFJQyxXQUFXdEIsd0VBQWM7O3dDQUMzQnlCLFlBQVliLE9BQU87c0RBQ3BCLDhEQUFDcUI7NENBQUtPLFNBQVMsSUFBTUMsT0FBT0MsSUFBSSxDQUFDO3NEQUEwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBbkI1QmpCLFlBQVlsQixFQUFFOzs7Ozs7Ozs7O0FBNEI3RDtHQWpFTUg7S0FBQUE7QUFtRU4sK0RBQWVBLFdBQVdBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9wcm9qZWN0cy9wcm9qZWN0Q2FyZC9wcm9qZWN0Q2FyZC50c3g/NzU4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Byb2plY3RDYXJkLm1vZHVsZS5jc3MnXHJcbmltcG9ydCB7IEZhTGluayB9IGZyb20gXCJyZWFjdC1pY29ucy9mYTZcIjtcclxuaW1wb3J0IHsgRmFHaXRodWIgfSBmcm9tIFwicmVhY3QtaWNvbnMvZmFcIjtcclxuaW1wb3J0IHsgSW9Jb3NMaW5rIH0gZnJvbSBcInJlYWN0LWljb25zL2lvXCI7XHJcbmltcG9ydCBCb3VuY2UgZnJvbSAnLi4vLi4vc2Nyb2xsQW5pbWF0aW9ucy9ib3VuY2UnO1xyXG5cclxuY29uc3QgUHJvamVjdENhcmQ6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtcclxuICAgIHtcclxuICAgICAgaWQ6IFwiXCIsXHJcbiAgICAgIGltYWdlOiBcIlwiLFxyXG4gICAgICB0aXRsZTogXCJcIixcclxuICAgICAgZGV0YWlsczogXCJcIixcclxuICAgICAgbGFuZ3VhZ2VzOiBcIlwiLFxyXG4gICAgICBzdW1tYXJ5OiBcIlwiLFxyXG4gICAgICBocmVmOiBcIlwiXHJcbiAgICB9LFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBnZXREYXRhPSgpPT57XHJcbiAgICBmZXRjaCgnL2RhdGEvcHJvamVjdHMuanNvbicse1xyXG4gICAgICAgIGhlYWRlcnMgOiB7IFxyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIClcclxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKG15SnNvbikge1xyXG4gICAgICAgIHNldERhdGEobXlKc29uKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgdXNlRWZmZWN0KCgpPT57XHJcbiAgICBnZXREYXRhKClcclxuICB9LFtdKVxyXG5cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucHJvamVjdENhcmRDb250YWluZXJ9PlxyXG4gICAgICAgIHtkYXRhLm1hcCgocHJvamVjdENhcmQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8Qm91bmNlIGNsYXNzTmFtZT17c3R5bGVzLmNhcmR9IGtleT17cHJvamVjdENhcmQuaWR9PlxyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtzdHlsZXMuY2FyZH0gaHJlZj17cHJvamVjdENhcmQuaHJlZn0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaW1hZ2VDb250YWluZXJ9PlxyXG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPXtzdHlsZXMuaW1hZ2V9IHNyYz17cHJvamVjdENhcmQuaW1hZ2V9IGFsdD17cHJvamVjdENhcmQudGl0bGV9Lz5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5zaG93UHJvamVjdH0+U2hvdyBQcm9qZWN0PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250ZW50fT5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRvcH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT57cHJvamVjdENhcmQudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kZXRhaWxzfT57cHJvamVjdENhcmQuZGV0YWlsc308L2Rpdj4gKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxpbmV9PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5pY29uc30+XHJcbiAgICAgICAgICAgICAgICAgIDxGYUdpdGh1YiBjbGFzc05hbWU9e3N0eWxlcy5pY29ufS8+XHJcbiAgICAgICAgICAgICAgICAgIDxJb0lvc0xpbmsgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbn0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5sYW5ndWFnZXN9Pntwcm9qZWN0Q2FyZC5sYW5ndWFnZXN9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zdW1tYXJ5fT5cclxuICAgICAgICAgICAgICAgIHtwcm9qZWN0Q2FyZC5zdW1tYXJ5fVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4gd2luZG93Lm9wZW4oXCIvcHJvamVjdHMvbWV0cm9ndWVzc3JcIil9PiBMZWFybiBtb3JlICZndDs8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICA8L0JvdW5jZT5cclxuICAgICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdENhcmQiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInN0eWxlcyIsIkZhR2l0aHViIiwiSW9Jb3NMaW5rIiwiQm91bmNlIiwiUHJvamVjdENhcmQiLCJkYXRhIiwic2V0RGF0YSIsImlkIiwiaW1hZ2UiLCJ0aXRsZSIsImRldGFpbHMiLCJsYW5ndWFnZXMiLCJzdW1tYXJ5IiwiaHJlZiIsImdldERhdGEiLCJmZXRjaCIsImhlYWRlcnMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibXlKc29uIiwiZGl2IiwiY2xhc3NOYW1lIiwicHJvamVjdENhcmRDb250YWluZXIiLCJtYXAiLCJwcm9qZWN0Q2FyZCIsImluZGV4IiwiY2FyZCIsImEiLCJpbWFnZUNvbnRhaW5lciIsImltZyIsInNyYyIsImFsdCIsInNwYW4iLCJzaG93UHJvamVjdCIsImNvbnRlbnQiLCJ0b3AiLCJsaW5lIiwiaWNvbnMiLCJpY29uIiwib25DbGljayIsIndpbmRvdyIsIm9wZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/projects/projectCard/projectCard.tsx\n"));

/***/ })

});