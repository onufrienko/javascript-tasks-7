'use strict';

exports.init = function () {
    Object.prototype.checkContainsKeys = function (keys) {
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            var ownKeys = keys.filter(function (key) {
                return this.hasOwnProperty(key);
            });
            return ownKeys.length === keys.length;
        }
    }
    Object.prototype.checkHasKeys = function (keys) {
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            var ownKeys = Object.keys(this).filter(function (key) {
                return keys.indexOf(key) != -1;
            });
            return ownKeys.length === Object.keys(this).length;
        }
    }
    Object.prototype.checkHasValues = function (values) {
        if (Object.getPrototypeOf(this) === Array.prototype ||
            Object.getPrototypeOf(this) === Object.prototype) {
            var obj = this;
            var objValues = Object.keys(obj).map(function (key) {
                return obj[key];
            });
            var ownKeys = objValues.filter(function (value) {
                return values.indexOf(value) != -1;
            });
            return ownKeys.length === objValues.length;
        }
    }
    Object.prototype.checkContainsValues = function (values) {
        if (Object.getPrototypeOf(this) === Array.prototype ||
            Object.getPrototypeOf(this) === Object.prototype) {
            var obj = this;
            var objValues = Object.keys(obj).map(function (key) {
                return obj[key];
            });
            var ownValues = values.filter(function (value) {
                return objValues.indexOf(value) != -1;
            });
            return ownValues.length === values.length;
        }
    }
    Object.prototype.checkHasValueType = function (key, type) {
        if (Object.getPrototypeOf(this) === Array.prototype ||
            Object.getPrototypeOf(this) === Object.prototype) {
            return this[key] == type(this[key]);
        }
    }
    Object.prototype.checkHasLength = function (length) {
        if (Object.getPrototypeOf(this) === Array.prototype ||
            Object.getPrototypeOf(this) === String.prototype) {
            return this.length === length;
        }
    }
    Function.prototype.checkHasParamsCount = function (count) {
        return count === this.length;
    }
    String.prototype.checkHasWordsCount = function (count) {
        return this.split(' ').length === count;
    }
};

