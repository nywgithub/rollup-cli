import React from 'react';
import { Popover } from '@future/popover/dist/react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
const Tooltip = props => {
  const subset = (_ref => {
    let {
      className,
      theme
    } = _ref,
        rest = _objectWithoutProperties(_ref, ["className", "theme"]);

    return _objectSpread$1({
      className: [className, theme && `is-${theme}`].filter(Boolean).join(" ")
    }, rest);
  })(props);

  return /*#__PURE__*/React.createElement(Popover, _extends({}, subset, {
    prefixClassName: "ft-tooltip"
  }));
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$o =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var FunctionPrototype$1 = Function.prototype;
var bind = FunctionPrototype$1.bind;
var call$5 = FunctionPrototype$1.call;
var callBind = bind && bind.bind(call$5);

var functionUncurryThis = bind ? function (fn) {
  return fn && callBind(call$5, fn);
} : function (fn) {
  return fn && function () {
    return call$5.apply(fn, arguments);
  };
};

var fails$7 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var uncurryThis$9 = functionUncurryThis;

var toString$1 = uncurryThis$9({}.toString);
var stringSlice = uncurryThis$9(''.slice);

var classofRaw = function (it) {
  return stringSlice(toString$1(it), 8, -1);
};

var global$n = global$o;
var uncurryThis$8 = functionUncurryThis;
var fails$6 = fails$7;
var classof = classofRaw;

var Object$4 = global$n.Object;
var split = uncurryThis$8(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$6(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object$4(it);
} : Object$4;

var global$m = global$o;

var TypeError$7 = global$m.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (it == undefined) throw TypeError$7("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$5 = function (it) {
  return IndexedObject(requireObjectCoercible$1(it));
};

var shared$3 = {exports: {}};

var global$l = global$o;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$1(global$l, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$l[key] = value;
  } return value;
};

var global$k = global$o;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var global$j = global$o;
var requireObjectCoercible = requireObjectCoercible$2;

var Object$3 = global$j.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$2 = function (argument) {
  return Object$3(requireObjectCoercible(argument));
};

var uncurryThis$7 = functionUncurryThis;
var toObject$1 = toObject$2;

var hasOwnProperty = uncurryThis$7({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};

var uncurryThis$6 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString = uncurryThis$6(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$d = function (argument) {
  return typeof argument == 'function';
};

var global$i = global$o;
var isCallable$c = isCallable$d;

var aFunction = function (argument) {
  return isCallable$c(argument) ? argument : undefined;
};

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$i[namespace]) : global$i[namespace] && global$i[namespace][method];
};

var getBuiltIn$3 = getBuiltIn$4;

var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || '';

var global$h = global$o;
var userAgent = engineUserAgent;

var process = global$h.process;
var Deno = global$h.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$5 = fails$7;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$5(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$g = global$o;
var shared$2 = shared$3.exports;
var hasOwn$8 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$g.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$6 = function (name) {
  if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var isCallable$b = isCallable$d;

var isObject$5 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$b(it);
};

var global$f = global$o;
var isObject$4 = isObject$5;

var String$3 = global$f.String;
var TypeError$6 = global$f.TypeError;

// `Assert: Type(argument) is Object`
var anObject$5 = function (argument) {
  if (isObject$4(argument)) return argument;
  throw TypeError$6(String$3(argument) + ' is not an object');
};

var fails$4 = fails$7;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$4(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectDefineProperty = {};

var global$e = global$o;
var isObject$3 = isObject$5;

var document$1 = global$e.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$3(document$1) && isObject$3(document$1.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$5 = descriptors;
var fails$3 = fails$7;
var createElement = documentCreateElement$2;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$5 && !fails$3(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var call$4 = Function.prototype.call;

var functionCall = call$4.bind ? call$4.bind(call$4) : function () {
  return call$4.apply(call$4, arguments);
};

var uncurryThis$5 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$5({}.isPrototypeOf);

var global$d = global$o;
var getBuiltIn$2 = getBuiltIn$4;
var isCallable$a = isCallable$d;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Object$2 = global$d.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$2('Symbol');
  return isCallable$a($Symbol) && isPrototypeOf($Symbol.prototype, Object$2(it));
};

var global$c = global$o;

var String$2 = global$c.String;

var tryToString$1 = function (argument) {
  try {
    return String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$b = global$o;
var isCallable$9 = isCallable$d;
var tryToString = tryToString$1;

var TypeError$5 = global$b.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$1 = function (argument) {
  if (isCallable$9(argument)) return argument;
  throw TypeError$5(tryToString(argument) + ' is not a function');
};

var aCallable = aCallable$1;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

var global$a = global$o;
var call$3 = functionCall;
var isCallable$8 = isCallable$d;
var isObject$2 = isObject$5;

var TypeError$4 = global$a.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$8(fn = input.toString) && !isObject$2(val = call$3(fn, input))) return val;
  if (isCallable$8(fn = input.valueOf) && !isObject$2(val = call$3(fn, input))) return val;
  if (pref !== 'string' && isCallable$8(fn = input.toString) && !isObject$2(val = call$3(fn, input))) return val;
  throw TypeError$4("Can't convert object to primitive value");
};

var global$9 = global$o;
var call$2 = functionCall;
var isObject$1 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$5 = wellKnownSymbol$6;

var TypeError$3 = global$9.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$1(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$2(exoticToPrim, input, pref);
    if (!isObject$1(result) || isSymbol$1(result)) return result;
    throw TypeError$3("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$8 = global$o;
var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var anObject$4 = anObject$5;
var toPropertyKey$1 = toPropertyKey$2;

var TypeError$2 = global$8.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$4 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$4(O);
  P = toPropertyKey$1(P);
  anObject$4(Attributes);
  if (IE8_DOM_DEFINE$1) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$2('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$1 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$4 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$4($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var hiddenKeys$4 = {};

var uncurryThis$4 = functionUncurryThis;
var hasOwn$7 = hasOwnProperty_1;
var toIndexedObject$3 = toIndexedObject$5;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$4;

var push = uncurryThis$4([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$3(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$7(hiddenKeys$3, key) && hasOwn$7(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$7(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys$1(O, enumBugKeys$2);
};

var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var anObject$3 = anObject$5;
var toIndexedObject$2 = toIndexedObject$5;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = DESCRIPTORS$3 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$3(O);
  var props = toIndexedObject$2(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$1 = getBuiltIn$4;

var html$1 = getBuiltIn$1('document', 'documentElement');

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/* global ActiveXObject -- old IE, WSH */

var anObject$2 = anObject$5;
var defineProperties = objectDefineProperties;
var enumBugKeys$1 = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$4;
var html = html$1;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$2 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys$1.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
  return NullProtoObject();
};

hiddenKeys$2[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$2(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

var wellKnownSymbol$4 = wellKnownSymbol$6;
var create$1 = objectCreate;
var definePropertyModule$2 = objectDefineProperty;

var UNSCOPABLES = wellKnownSymbol$4('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule$2.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$1(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var uncurryThis$3 = functionUncurryThis;
var isCallable$7 = isCallable$d;
var store$1 = sharedStore;

var functionToString = uncurryThis$3(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$7(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var global$7 = global$o;
var isCallable$6 = isCallable$d;
var inspectSource$1 = inspectSource$2;

var WeakMap$1 = global$7.WeakMap;

var nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;

var createNonEnumerableProperty$5 = DESCRIPTORS$2 ? function (object, key, value) {
  return definePropertyModule$1.f(object, key, createPropertyDescriptor$2(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$6 = global$o;
var uncurryThis$2 = functionUncurryThis;
var isObject = isObject$5;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$6 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey$1 = sharedKey$3;
var hiddenKeys$1 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$6.TypeError;
var WeakMap = global$6.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis$2(store.get);
  var wmhas = uncurryThis$2(store.has);
  var wmset = uncurryThis$2(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$1('state');
  hiddenKeys$1[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$6(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$6(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$6(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var DESCRIPTORS$1 = descriptors;
var call$1 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;
var toIndexedObject$1 = toIndexedObject$5;
var toPropertyKey = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$1(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!call$1(propertyIsEnumerableModule.f, O, P), O[P]);
};

var redefine$3 = {exports: {}};

var DESCRIPTORS = descriptors;
var hasOwn$4 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$4(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var global$5 = global$o;
var isCallable$5 = isCallable$d;
var hasOwn$3 = hasOwnProperty_1;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var setGlobal$1 = setGlobal$3;
var inspectSource = inspectSource$2;
var InternalStateModule$1 = internalState;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

var getInternalState$1 = InternalStateModule$1.get;
var enforceInternalState = InternalStateModule$1.enforce;
var TEMPLATE = String(String).split('String');

(redefine$3.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable$5(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn$3(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
      createNonEnumerableProperty$3(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global$5) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$3(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$5(this) && getInternalState$1(this).source || inspectSource(this);
});

var objectGetOwnPropertyNames = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$3;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn = getBuiltIn$4;
var uncurryThis$1 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$1 = anObject$5;

var concat = uncurryThis$1([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$2 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$1(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$2 = hasOwnProperty_1;
var ownKeys$1 = ownKeys$2;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source) {
  var keys = ownKeys$1(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$2 = fails$7;
var isCallable$4 = isCallable$d;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$4(detection) ? fails$2(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$4 = global$o;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var redefine$2 = redefine$3.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$4;
  } else if (STATIC) {
    target = global$4[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$4[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$2(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$2(target, key, sourceProperty, options);
  }
};

var fails$1 = fails$7;

var correctPrototypeGetter = !fails$1(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var global$3 = global$o;
var hasOwn$1 = hasOwnProperty_1;
var isCallable$3 = isCallable$d;
var toObject = toObject$2;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var Object$1 = global$3.Object;
var ObjectPrototype = Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$3(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object$1 ? ObjectPrototype : null;
};

var fails = fails$7;
var isCallable$2 = isCallable$d;
var getPrototypeOf$1 = objectGetPrototypeOf;
var redefine$1 = redefine$3.exports;
var wellKnownSymbol$3 = wellKnownSymbol$6;

var ITERATOR$2 = wellKnownSymbol$3('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$2(IteratorPrototype$2[ITERATOR$2])) {
  redefine$1(IteratorPrototype$2, ITERATOR$2, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty = objectDefineProperty.f;
var hasOwn = hasOwnProperty_1;
var wellKnownSymbol$2 = wellKnownSymbol$6;

var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');

var setToStringTag$2 = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
    defineProperty(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$3;
var setToStringTag$1 = setToStringTag$2;

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
  return IteratorConstructor;
};

var global$2 = global$o;
var isCallable$1 = isCallable$d;

var String$1 = global$2.String;
var TypeError = global$2.TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$1(argument)) return argument;
  throw TypeError("Can't set " + String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis = functionUncurryThis;
var anObject = anObject$5;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $ = _export;
var call = functionCall;
var FunctionName = functionName;
var isCallable = isCallable$d;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag = setToStringTag$2;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var redefine = redefine$3.exports;
var wellKnownSymbol$1 = wellKnownSymbol$6;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol$1('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
          redefine(CurrentIteratorPrototype, ITERATOR$1, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
  }

  return methods;
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables = addToUnscopables$1;
var InternalStateModule = internalState;
var defineIterator = defineIterator$1;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var global$1 = global$o;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var wellKnownSymbol = wellKnownSymbol$6;

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

function isType(value, type) {
  const str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(`${type}]`) > -1;
}
function normalizeToArray(value) {
  return [].concat(value);
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  const element = normalizeToArray(elementOrElements)[0]; // Elements created via a <template> have an ownerDocument with no reference to the body

  return element !== null && element !== void 0 && (_element$ownerDocumen = element.ownerDocument) !== null && _element$ownerDocumen !== void 0 && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
let mouseCoords = {
  clientX: 0,
  clientY: 0
};
let activeInstances = [];

function storeMouseCoords({
  clientX,
  clientY
}) {
  mouseCoords = {
    clientX,
    clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

const followCursor = {
  name: 'followCursor',
  defaultValue: false,

  fn(instance) {
    const reference = instance.reference;
    const doc = getOwnerDocument(instance.props.triggerTarget || reference);
    let isInternalUpdate = false;
    let wasFocusEvent = false;
    let isUnmounted = true;
    let prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      const isCursorOverReference = event.target ? reference.contains(event.target) : true;
      const {
        followCursor
      } = instance.props;
      const {
        clientX,
        clientY
      } = event;
      const rect = reference.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          // @ts-ignore - unneeded DOMRect properties
          getReferenceClientRect() {
            const rect = reference.getBoundingClientRect();
            let x = clientX;
            let y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            const top = followCursor === 'horizontal' ? rect.top : y;
            const right = followCursor === 'vertical' ? rect.right : x;
            const bottom = followCursor === 'horizontal' ? rect.bottom : y;
            const left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top,
              right,
              bottom,
              left
            };
          }

        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance,
          doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(data => data.instance !== instance);

      if (activeInstances.filter(data => data.doc === doc).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,

      onBeforeUpdate() {
        prevProps = instance.props;
      },

      onAfterUpdate(_, {
        followCursor
      }) {
        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },

      onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },

      onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },

      onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }

    };
  }

};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
const HoverTitle = props => {
  const subset = (_ref => {
    let {
      offset,
      plugins
    } = _ref,
        rest = _objectWithoutProperties(_ref, ["offset", "plugins"]);

    return _objectSpread({
      offset: Array.isArray(offset) && offset.length >= 2 ? [offset[1], offset[0]] : [10, 12],
      plugins: [followCursor, ...(plugins || [])],
      prefixClassName: "ft-hover-title",
      followCursor: true
    }, rest);
  })(props);

  return /*#__PURE__*/React.createElement(Popover, _extends({}, subset, {
    placement: "right-start",
    arrow: false,
    animation: false
  }));
};

export { HoverTitle, Tooltip };
