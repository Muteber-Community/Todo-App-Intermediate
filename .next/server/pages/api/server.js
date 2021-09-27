(function() {
var exports = {};
exports.id = 355;
exports.ids = [355];
exports.modules = {

/***/ 37:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

const pdfKit = __webpack_require__(863);

const blobStream = __webpack_require__(779);

const doc = new pdfKit();
const todos = JSON.parse(localStorage.getItem('todos'));
const categories = JSON.parse(localStorage.getItem('categories'));
doc.fontSize(20);
doc.font('Helvetica');
todos.map((todo, key) => {
  doc.text(key + 1 + ") " + "Todo Name: " + todo.name);
  todo.todoCategories.map(category => {
    doc.text("Category: " + category.name);
  });
  doc.text(" ");
});
const stream = doc.pipe(blobStream());
doc.end();
stream.on('finish', function () {
  const url = stream.toBlobURL("application/pdf");
  const element = document.getElementById("pdf");
  element.setAttribute("href", url);
});

/***/ }),

/***/ 779:
/***/ (function(module) {

"use strict";
module.exports = require("blob-stream");;

/***/ }),

/***/ 863:
/***/ (function(module) {

"use strict";
module.exports = require("pdfkit");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(37));
module.exports = __webpack_exports__;

})();