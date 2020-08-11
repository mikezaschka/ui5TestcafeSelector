'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _testcafe = require('testcafe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Utils {
    constructor() {}

    launchpadLogin(t, userName, password) {
        return (0, _asyncToGenerator3.default)(function* () {
            yield t.maximizeWindow().typeText((0, _testcafe.Selector)('#USERNAME_FIELD-inner'), userName).typeText((0, _testcafe.Selector)('#PASSWORD_FIELD-inner'), password).click((0, _testcafe.Selector)('#LOGIN_LINK'));
        })();
    }

    supportAssistant(t) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(function* () {
            yield t.click((0, _testcafe.Selector)(".sapUiBody")); //only reason: wait for xhr requests to be finished..
            const oClientFunction = _this._supportAssistant().with({ boundTestRun: t });
            return yield oClientFunction();
        })();
    }

    _supportAssistant(sComponent) {
        return (0, _testcafe.ClientFunction)(() => {
            return new _promise2.default(function (resolve) {
                var oReturn = { "High": [], "Medium": [], "Low": [] };
                var oComponentCpy;
                if (sComponent) {
                    oComponentCpy = {
                        type: "components",
                        components: [sComponent]
                    };
                }
                sap.ui.require(["sap/ui/support/Bootstrap"], function (Bootstrap) {
                    Bootstrap.initSupportRules(["silent"]);
                    setTimeout(function () {
                        jQuery.sap.support.analyze(oComponentCpy).then(function () {
                            var aIssues = jQuery.sap.support.getLastAnalysisHistory();
                            if (!aIssues) {
                                resolve(oReturn);
                                return;
                            }
                            for (var i = 0; i < aIssues.issues.length; i++) {
                                var oIssue = aIssues.issues[i];
                                if (typeof oReturn[oIssue.severity] === "undefined") {
                                    continue;
                                }

                                //ignore webpage scopes for the moment..
                                if (oIssue.context && oIssue.context.id === 'WEBPAGE') {
                                    continue;
                                }

                                oReturn[oIssue.severity].push({
                                    severity: oIssue.severity,
                                    context: oIssue.context,
                                    details: oIssue.details
                                });
                            }

                            resolve(oReturn);
                        });
                    }, 0);
                });
            });
        }, { dependencies: { sComponent } });
    }
}

exports.default = new Utils();
module.exports = exports.default;