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

exports.wrap = function (obj) {
    if (obj === null) {
        return {
            get: function () {
                return null;
            },
            isNull: function () {
                return true;
            }
        };
    }
    exports.init.bind(obj);
    return obj;
};

function getMethods(obj) {
    var res = getRequiredMethods(obj);
    Object.defineProperty(res, 'not', {
        get: function () {
            return !getRequiredMethods(obj);
        }
    });
    return res;
}

function getRequiredMethods(obj) {
    return {
        containsKeys: function (keys) {
            if (Object.getPrototypeOf(obj) === Object.prototype ||
                Object.getPrototypeOf(obj) === Array.prototype) {
                var ownKeys = keys.filter(function (key) {
                    return obj.hasOwnProperty(key);
                });
                return ownKeys.length === keys.length;
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
                return res;
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
                return res;
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
                return ownValues.length === values.length;
            }
        },
        hasValueType: function (key, type) {
            if (Object.getPrototypeOf(obj) === Array.prototype ||
                Object.getPrototypeOf(obj) === Object.prototype) {
                return Object.getPrototypeOf(type()) === Object.getPrototypeOf(obj[key]);
            }
        },
        hasLength: function (length) {
            if (Object.getPrototypeOf(obj) === Array.prototype ||
                Object.getPrototypeOf(obj) === String.prototype) {
                return obj.length === length;
            }
        },
        hasParamsCount: function (count) {
            if (Object.getPrototypeOf(obj) === Function.prototype) {
                return count === obj.length;
            }
        },
        hasWordsCount: function (count) {
            if (Object.getPrototypeOf(obj) === String.prototype) {
                return obj.split(' ').length === count;
            }
        },
        isNull: function () {
            return false;
        }
    };
}
