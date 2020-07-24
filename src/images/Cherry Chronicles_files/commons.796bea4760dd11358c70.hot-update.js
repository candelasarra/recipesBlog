webpackHotUpdate("commons",{

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "./node_modules/core-js/modules/es6.function.name.js");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.string.link */ "./node_modules/core-js/modules/es6.string.link.js");
/* harmony import */ var core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _templates_MainWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/MainWrapper */ "./src/templates/MainWrapper.js");
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/header */ "./src/components/header.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _commons_customBreadcrumbs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../commons/customBreadcrumbs */ "./src/commons/customBreadcrumbs.js");
/* harmony import */ var _vectors_burgerHome_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../vectors/burgerHome.svg */ "./src/vectors/burgerHome.svg");
/* harmony import */ var _vectors_burgerHome_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_vectors_burgerHome_svg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _vectors_milkshake_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../vectors/milkshake.svg */ "./src/vectors/milkshake.svg");
/* harmony import */ var _vectors_milkshake_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_vectors_milkshake_svg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _vectors_drink_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../vectors/drink.svg */ "./src/vectors/drink.svg");
/* harmony import */ var _vectors_drink_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_vectors_drink_svg__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _images_star_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../images/star.svg */ "./src/images/star.svg");
/* harmony import */ var _images_star_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_star_svg__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _vectors_walnuts_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../vectors/walnuts.svg */ "./src/vectors/walnuts.svg");
/* harmony import */ var _vectors_walnuts_svg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_vectors_walnuts_svg__WEBPACK_IMPORTED_MODULE_13__);



var _this = undefined,
    _jsxFileName = "/Users/candelasarrabayrouse/Documents/Coding/recipesBlog/src/pages/index.js";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};













var useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_5__["makeStyles"])(function () {
  return {
    font: {// fontFamily: " 'Barrio', cursive",
    },
    serviceContainer: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // border: '1px solid white', borderRadius: 2,
      padding: 20,
      width: "100%",
      maxWidth: 100,
      alignSelf: "center",
      cursor: "pointer",
      margin: 20,
      minHeight: 100,
      "&:hover": {
        backgroundColor: "rgba(211, 211, 211, 0.1)"
      }
    },
    border: {
      //271 fill, 19px
      borderImageSource: "url(" + _images_star_svg__WEBPACK_IMPORTED_MODULE_12___default.a + ")",
      borderImageRepeat: "round",
      borderImageWidth: "9px",
      borderImageSlice: "259 fill",
      borderStyle: "solid"
    },
    rowOneItem: {
      display: "flex",
      flexDirection: "column",
      padding: 20
    },
    color: {
      transition: "filter .9s",
      filter: "brightness(0%) grayscale(0) contrast(100%)",
      "&:hover": {
        filter: "brightness(100%) grayscale(0) contrast(100%);"
      }
    },
    rowOneItemInside: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: 30,
      maxHeight: 950
    },
    gridRoot: {
      maxHeight: 2450
    },
    drinks: {
      flex: 2
    },
    dozen: {
      padding: 20
    }
  };
});

var returnRightSvg = function returnRightSvg(value) {
  switch (value) {
    case "sweets":
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_vectors_milkshake_svg__WEBPACK_IMPORTED_MODULE_10___default.a, {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 14
        }
      });
      break;

    case "salty":
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_vectors_burgerHome_svg__WEBPACK_IMPORTED_MODULE_9___default.a, {
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 14
        }
      });
      break;

    default:
      console.log("no value", value);
  }
};

var Index = function Index(props) {
  var classes = useStyles();
  var breadcrumbArray = [{
    label: "Home"
  }];
  var rows = {};
  var query = Object(gatsby__WEBPACK_IMPORTED_MODULE_7__["useStaticQuery"])("473727163");
  console.log(query.site.siteMetadata); //creating the array of objects with row one data to map over for UI

  var makeRowOneObjects = query.site.siteMetadata.menuLinks.map(function (item) {
    var title = item.title,
        link = item.link,
        name = item.name;
    return {
      title: title,
      link: link,
      name: name,
      image: returnRightSvg(name)
    };
  });
  var gridItems = [{
    title: "Banana Text",
    cols: 4
  }, {
    title: "Sweets",
    cols: 6
  }, {
    title: "Salty",
    cols: 5
  }, {
    title: "Long",
    cols: 5,
    rows: 2
  }, {
    title: "Bread",
    cols: 10
  }];
  console.log(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: {
      backgroundImage: 'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 164,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_templates_MainWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "mainContainer",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "headerContainer",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_header__WEBPACK_IMPORTED_MODULE_4__["default"], {
    titleStyle: "h3",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 13
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_commons_customBreadcrumbs__WEBPACK_IMPORTED_MODULE_8__["default"], {
    array: breadcrumbArray,
    location: props.location,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 11
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, makeRowOneObjects.map(function (row) {
    var title = row.title,
        link = row.link,
        name = row.name,
        image = row.image;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      onClick: function onClick() {
        return Object(gatsby__WEBPACK_IMPORTED_MODULE_7__["navigate"])(link + "/");
      },
      key: name,
      className: classes.rowOneItem + " " + name + " shadow " + classes.color,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 186,
        columnNumber: 19
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: classes.border + " " + classes.rowOneItemInside,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 21
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
      style: {
        color: "#e25a5f",
        fontFamily: "'Shrikhand', cursive"
      },
      variant: "h2",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 23
      }
    }, title), image));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "general shadow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 15
    }
  }, "Salty")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "drinks shadow " + classes.color,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
    variant: "h4",
    style: {
      fontFamily: "'Shrikhand', cursive"
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 15
    }
  }, "Drinks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_vectors_drink_svg__WEBPACK_IMPORTED_MODULE_11___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 15
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: classes.color + " " + classes.dozen + " dozen shadow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_vectors_walnuts_svg__WEBPACK_IMPORTED_MODULE_13___default.a, {
    className: "walnuts " + classes.color,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 15
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
    variant: "button",
    className: "homeTextNuts",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 15
    }
  }, "djslfkj sdlfdjslfkj sdlfdjslfkjsdl fdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlfdjsl fkjsdlfdjslfkj sdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlfddjslfkjsdlf djslfkjsdlf djslfkjsdlfjslfkjsd lfdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkj sdlfdjslfkj sdlfdjslfkjsdl fdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlfdjsl fkjsdlfdjslfkj sdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlfddjslfkjsdlf djslfkjsdlf djslfkjsdlfjslfkjsd lfdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkj sdlfdjslfkj sdlfdjslfkjsdl fdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlfdjsl fkjsdlfdjslfkj sdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlfddjslfkjsdlf djslfkjsdlf djslfkjsdlfjslfkjsd lfdjslfkjsdlf djslfkjsdlfdjslfkjsdlf")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "contactMe shadow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 15
    }
  }, "Bread")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "buyMeCoffee shadow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 13
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 15
    }
  }, "Bread")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "empty shadow",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 13
    }
  })))));
};

__signature__(Index, "useStyles{classes}\nuseStaticQuery{query}", function () {
  return [useStyles, gatsby__WEBPACK_IMPORTED_MODULE_7__["useStaticQuery"]];
});

var _default = Index;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(useStyles, "useStyles", "/Users/candelasarrabayrouse/Documents/Coding/recipesBlog/src/pages/index.js");
  reactHotLoader.register(returnRightSvg, "returnRightSvg", "/Users/candelasarrabayrouse/Documents/Coding/recipesBlog/src/pages/index.js");
  reactHotLoader.register(Index, "Index", "/Users/candelasarrabayrouse/Documents/Coding/recipesBlog/src/pages/index.js");
  reactHotLoader.register(_default, "default", "/Users/candelasarrabayrouse/Documents/Coding/recipesBlog/src/pages/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=commons.796bea4760dd11358c70.hot-update.js.map