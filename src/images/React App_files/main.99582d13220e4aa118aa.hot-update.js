webpackHotUpdate("main",{

/***/ "./src/utils/PaperTextfields/index.jsx":
/*!*********************************************!*\
  !*** ./src/utils/PaperTextfields/index.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _LongButtonSecondary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../LongButtonSecondary */ "./src/utils/LongButtonSecondary/index.jsx");
var _jsxFileName = "/Users/candelasarrabayrouse/Documents/Coding/Hashple/hashple/src/utils/PaperTextfields/index.jsx";





const useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(theme => ({
  rootReg: {
    "&:not(.Mui-disabled):hover::before": {
      borderColor: theme.palette.secondary.dark
    }
  },
  root: {
    '&:hover $notchedOutline': {
      borderColor: theme.palette.secondary.main
    },
    borderRadius: 0
  },
  disabled: {},
  notchedOutline: {
    borderColor: '#ffffff00'
  },
  basicWhiteCompSubtext: {
    textAlign: 'center',
    color: theme.palette.primary.sub // [theme.breakpoints.down("sm")]: {
    //   width: '60%'
    // },
    // [theme.breakpoints.down("xs")]: {
    //   width: '90%',
    // },

  },
  paperTextfields: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 80px",
    [theme.breakpoints.down("md")]: {
      padding: "30px 40px"
    },
    alignItems: 'center',
    borderRadius: 17
  }
}));

const PaperTextfields = ({
  data,
  children
}) => {
  const classes = useStyles();
  const theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
    className: classes.paperTextfields,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 5
    }
  }, data.map(item => {
    if (item.type === "TEXTFIELD_REGULAR") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], Object.assign({
        placeholder: item.placeholder,
        style: {
          width: "100%",
          marginTop: 30,
          ...item.style
        },
        color: "secondary"
      }, item.props, {
        InputProps: {
          classes: {
            root: classes.rootReg
          }
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 20
        }
      }));
    } else if (item.type === "TEXTFIELD_MULTILINE") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], Object.assign({
        variant: "outlined",
        color: "secondary",
        placeholder: item.placeholder
      }, item.props, {
        rows: 5,
        multiline: true,
        style: {
          width: '100%',
          height: '100%',
          marginTop: 20,
          ...item.style
        },
        InputProps: {
          classes: {
            root: classes.root,
            notchedOutline: classes.notchedOutline
          }
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58,
          columnNumber: 20
        }
      }));
    } else if (item.type === "BUTTON") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: item.style,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 20
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LongButtonSecondary__WEBPACK_IMPORTED_MODULE_4__["default"], {
        label: item.label,
        style: {
          width: '100%',
          marginTop: 0,
          height: '100%'
        },
        onClick: item.onClick,
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 44
        }
      }));
    } else if (item.type === "TITLE") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
        variant: "h4",
        style: {
          color: theme.palette.primary.darkGrey,
          margin: '50px 0px',
          ...item.style
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 20
        }
      }, item.title);
    } else if (item.type === "SUBTITLE") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
        variant: "h6",
        className: classes.basicWhiteCompSubtext,
        style: { ...item.style
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71,
          columnNumber: 20
        }
      }, item.subtitle);
    } else if (item.type === "SIDE_LINK") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
        variant: "caption",
        style: {
          marginTop: 30,
          color: theme.palette.primary.sub,
          ...item.style
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 20
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
        to: item.link,
        style: {
          textDecoration: 'none',
          color: theme.palette.primary.sub
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 15
        }
      }, item.text));
    } else if (item.type === "TEXT_AND_LINK") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
        variant: "caption",
        style: {
          marginTop: 30,
          color: theme.palette.primary.sub,
          ...item.style
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79,
          columnNumber: 20
        }
      }, item.text, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
        to: item.link,
        style: {
          textDecoration: 'none',
          color: theme.palette.secondary.main
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 27
        }
      }, item.linkText));
    } else {
      return null;
    }
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (PaperTextfields);

/***/ })

})
//# sourceMappingURL=main.99582d13220e4aa118aa.hot-update.js.map