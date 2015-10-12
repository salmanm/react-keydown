/**
 * @module keydown
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsClass_decorator = require('./decorators/class_decorator');

var _decoratorsClass_decorator2 = _interopRequireDefault(_decoratorsClass_decorator);

var _decoratorsMethod_decorator = require('./decorators/method_decorator');

var _decoratorsMethod_decorator2 = _interopRequireDefault(_decoratorsMethod_decorator);

var _decoratorsMethod_decorator_scoped = require('./decorators/method_decorator_scoped');

var _decoratorsMethod_decorator_scoped2 = _interopRequireDefault(_decoratorsMethod_decorator_scoped);

var _libKeys = require('./lib/keys');

var _libKeys2 = _interopRequireDefault(_libKeys);

var _libList_bindings = require('./lib/list_bindings');

var _libList_bindings2 = _interopRequireDefault(_libList_bindings);

/**
 * _decorator
 *
 * @access private
 * @param {Function} methodFn The method wrapper to delegate to, based on whether user has specified a scoped decorator or not
 * @param {Array} ...args Remainder of arguments passed in
 * @return {Function} The decorated class or method
 */
function _decorator(methodFn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // check the first argument to see if it's a user-supplied keycode or array
  // of keycodes, or if it's the wrapped class or method
  var testArg = args[0];
  var isArray = Array.isArray(testArg);

  // if the test argument is not an object or function, it is user-supplied
  // keycodes. else there are no arguments and it's just the wrapped class
  // (method decorators must have keycode arguments).
  if (isArray || ~['string', 'number'].indexOf(typeof testArg)) {
    var _ret = (function () {
      var keys = isArray ? testArg : args;

      // return the decorator function, which on the next call will look for
      // the presence of a method name to determine if this is a wrapped method
      // or component
      return {
        v: function (target, methodName, descriptor) {
          return methodName ? methodFn({ target: target, descriptor: descriptor, keys: keys }) : (0, _decoratorsClass_decorator2['default'])(target, keys);
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  } else {
    var methodName = args[1];

    // method decorators without keycode (which) arguments are not allowed.
    if (!methodName) {
      return _decoratorsClass_decorator2['default'].apply(undefined, args);
    } else {
      console.warn(methodName + ': Method decorators must have keycode arguments, so the decorator for this method will not do anything');
    }
  }
}

/**
 * keydownScoped
 *
 * Method decorator that will look for changes to its targeted component's
 * `keydown` props to decide when to trigger, rather than responding directly
 * to keydown events. This lets you specify a @keydown decorated class higher
 * up in the view hierarchy for larger scoping of keydown events, or for
 * programmatically sending keydown events as props into the components in order
 * to trigger decorated methods with matching keys.
 *
 * @access public
 * @param {Array} ...args  All (or no) arguments passed in from decoration
 * @return {Function} The decorated class or method
 */
function keydownScoped() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _decorator.apply(undefined, [_decoratorsMethod_decorator_scoped2['default']].concat(args));
}

/**
 * keydown
 *
 * The main decorator and default export, handles both classes and methods.
 *
 * @access public
 * @param {Array} ...args  All (or no) arguments passed in from decoration
 * @return {Function} The decorated class or method
 */
function keydown() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return _decorator.apply(undefined, [_decoratorsMethod_decorator2['default']].concat(args));
}

exports['default'] = keydown;
exports.listBindings = _libList_bindings2['default'];
exports.Keys = _libKeys2['default'];
exports.keydownScoped = keydownScoped;