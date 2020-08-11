"use strict";

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = waitForUI5;

var _testcafe = require("testcafe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint-disable no-unused-vars*/
function waitForUI5() {

    return (0, _testcafe.ClientFunction)(() => {
        return new _promise2.default((resolve, reject) => {
            var fnTest = function fnTest() {
                if (typeof sap === "undefined" || typeof sap.ui === "undefined" || typeof sap.ui.getCore === "undefined" || !sap.ui.getCore() || !sap.ui.getCore().isInitialized()) {
                    setTimeout(100, fnTest);
                    return;
                }
                if (sap.ui.getCore().getUIDirty() === true) {
                    setTimeout(100, fnTest);
                    return;
                }
                resolve();
            };
            fnTest();
        });
    })();
}
module.exports = exports.default;