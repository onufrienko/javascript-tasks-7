'use strict';

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            var obj = this;
            var isNot = false;
            return getMethods(obj, isNot);
        }
    });
    /*Object.defineProperty(Object.prototype.check, 'not', {
        get: function () {
            var obj = this;
            var isNot = true;
            return getMethods(obj, isNot);
        }
    });*/
};

function getMethods(obj) {
    var res = getRequiredMethods(obj, false);
    Object.defineProperty(res, 'not', {
        get: function () {
            return getRequiredMethods(obj, true);
        }
    });
    return res;
}

function getRequiredMethods(obj, isNot) {
    return {
        containsKeys: function (keys) {
            if (Object.getPrototypeOf(obj) === Object.prototype ||
                Object.getPrototypeOf(obj) === Array.prototype) {
                var ownKeys = keys.filter(function (key) {
                    return obj.hasOwnProperty(key);
                });
                return this.returnResult(ownKeys.length === keys.length);
            }
        },
        hasKeys: function (keys) {
            if (Object.getPrototypeOf(obj) === Object.prototype ||
                Object.getPrototypeOf(obj) === Array.prototype) {
                var ownKeys = Object.keys(obj).filter(function (key) {
                    return keys.indexOf(key) != -1;
                });
                var res = ownKeys.length === keys.length &&
                    ownKeys.length === Object.keys(obj).length;
                return this.returnResult(res);
            }
        },
        hasValues: function (values) {
            if (Object.getPrototypeOf(obj) === Array.prototype ||
            Object.getPrototypeOf(obj) === Object.prototype) {
                var objValues = Object.keys(obj).map(function (key) {
                    return obj[key];
                });
                var ownKeys = objValues.filter(function (value) {
                    return values.indexOf(value) != -1;
                });
                var res = ownKeys.length === objValues.length &&
                ownKeys.length === values.length;
                return this.returnResult(res);
            }
        },
        containsValues: function (values) {
            if (Object.getPrototypeOf(obj) === Array.prototype ||
            Object.getPrototypeOf(obj) === Object.prototype) {
                var objValues = Object.keys(obj).map(function (key) {
                    return obj[key];
                });
                var ownValues = values.filter(function (value) {
                    return objValues.indexOf(value) != -1;
                });
                return this.returnResult(ownValues.length === values.length);
            }
        },
        hasValueType: function (key, type) {
            if (Object.getPrototypeOf(obj) === Array.prototype ||
                Object.getPrototypeOf(obj) === Object.prototype) {
                var res = typeof obj[key] === 'function' ?
                    true : obj[key] == type(obj[key]);
                return this.returnResult(res);
            }
        },
        hasLength: function (length) {
            if (Object.getPrototypeOf(obj) === Array.prototype ||
                Object.getPrototypeOf(obj) === String.prototype) {
                return this.returnResult(obj.length === length);
            }
        },
        hasParamsCount: function (count) {
            if (Object.getPrototypeOf(obj) === Function.prototype) {
                return this.returnResult(count === obj.length);
            }
        },
        hasWordsCount: function (count) {
            if (Object.getPrototypeOf(obj) === String.prototype) {
                return this.returnResult(obj.split(' ').length === count);
            }
        },
        returnResult: function (condition) {
            return isNot ? !condition : condition;
        }
    };
}
