(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.future = global.future || {}));
}(this, (function (exports) { 'use strict';

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$s =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$c = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$b = fails$c;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$b(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var call$6 = Function.prototype.call;

	var functionCall = call$6.bind ? call$6.bind(call$6) : function () {
	  return call$6.apply(call$6, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$4 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var FunctionPrototype$2 = Function.prototype;
	var bind$3 = FunctionPrototype$2.bind;
	var call$5 = FunctionPrototype$2.call;
	var callBind = bind$3 && bind$3.bind(call$5);

	var functionUncurryThis = bind$3 ? function (fn) {
	  return fn && callBind(call$5, fn);
	} : function (fn) {
	  return fn && function () {
	    return call$5.apply(fn, arguments);
	  };
	};

	var uncurryThis$e = functionUncurryThis;

	var toString$2 = uncurryThis$e({}.toString);
	var stringSlice = uncurryThis$e(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice(toString$2(it), 8, -1);
	};

	var global$r = global$s;
	var uncurryThis$d = functionUncurryThis;
	var fails$a = fails$c;
	var classof$5 = classofRaw$1;

	var Object$4 = global$r.Object;
	var split = uncurryThis$d(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$a(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$5(it) == 'String' ? split(it, '') : Object$4(it);
	} : Object$4;

	var global$q = global$s;

	var TypeError$9 = global$q.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (it == undefined) throw TypeError$9("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;

	var toIndexedObject$9 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$1(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$c = function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$b = isCallable$c;

	var isObject$8 = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$b(it);
	};

	var global$p = global$s;
	var isCallable$a = isCallable$c;

	var aFunction = function (argument) {
	  return isCallable$a(argument) ? argument : undefined;
	};

	var getBuiltIn$6 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$p[namespace]) : global$p[namespace] && global$p[namespace][method];
	};

	var uncurryThis$c = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

	var getBuiltIn$5 = getBuiltIn$6;

	var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

	var global$o = global$s;
	var userAgent = engineUserAgent;

	var process$1 = global$o.process;
	var Deno = global$o.Deno;
	var versions = process$1 && process$1.versions || Deno && Deno.version;
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

	var V8_VERSION$2 = engineV8Version;
	var fails$9 = fails$c;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$9(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$n = global$s;
	var getBuiltIn$4 = getBuiltIn$6;
	var isCallable$9 = isCallable$c;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$3 = global$n.Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$4('Symbol');
	  return isCallable$9($Symbol) && isPrototypeOf$1($Symbol.prototype, Object$3(it));
	};

	var global$m = global$s;

	var String$3 = global$m.String;

	var tryToString$1 = function (argument) {
	  try {
	    return String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$l = global$s;
	var isCallable$8 = isCallable$c;
	var tryToString = tryToString$1;

	var TypeError$8 = global$l.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$2 = function (argument) {
	  if (isCallable$8(argument)) return argument;
	  throw TypeError$8(tryToString(argument) + ' is not a function');
	};

	var aCallable$1 = aCallable$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$1(func);
	};

	var global$k = global$s;
	var call$4 = functionCall;
	var isCallable$7 = isCallable$c;
	var isObject$7 = isObject$8;

	var TypeError$7 = global$k.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$7(val = call$4(fn, input))) return val;
	  if (isCallable$7(fn = input.valueOf) && !isObject$7(val = call$4(fn, input))) return val;
	  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$7(val = call$4(fn, input))) return val;
	  throw TypeError$7("Can't convert object to primitive value");
	};

	var shared$4 = {exports: {}};

	var global$j = global$s;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$2 = Object.defineProperty;

	var setGlobal$3 = function (key, value) {
	  try {
	    defineProperty$2(global$j, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$j[key] = value;
	  } return value;
	};

	var global$i = global$s;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$i[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.19.1',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var global$h = global$s;
	var requireObjectCoercible = requireObjectCoercible$2;

	var Object$2 = global$h.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$5 = function (argument) {
	  return Object$2(requireObjectCoercible(argument));
	};

	var uncurryThis$b = functionUncurryThis;
	var toObject$4 = toObject$5;

	var hasOwnProperty$1 = uncurryThis$b({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty$1(toObject$4(it), key);
	};

	var uncurryThis$a = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$1 = uncurryThis$a(1.0.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
	};

	var global$g = global$s;
	var shared$3 = shared$4.exports;
	var hasOwn$9 = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$3('wks');
	var Symbol$1 = global$g.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

	var wellKnownSymbol$9 = function (name) {
	  if (!hasOwn$9(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$1 && hasOwn$9(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var global$f = global$s;
	var call$3 = functionCall;
	var isObject$6 = isObject$8;
	var isSymbol$2 = isSymbol$3;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$8 = wellKnownSymbol$9;

	var TypeError$6 = global$f.TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$8('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$6(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$3(exoticToPrim, input, pref);
	    if (!isObject$6(result) || isSymbol$2(result)) return result;
	    throw TypeError$6("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$4 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var global$e = global$s;
	var isObject$5 = isObject$8;

	var document$1 = global$e.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$5(document$1) && isObject$5(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$8 = descriptors;
	var fails$8 = fails$c;
	var createElement = documentCreateElement$2;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$8 && !fails$8(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$7 = descriptors;
	var call$2 = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;
	var toIndexedObject$8 = toIndexedObject$9;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$8 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$8(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$8(O, P)) return createPropertyDescriptor$3(!call$2(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var global$d = global$s;
	var isObject$4 = isObject$8;

	var String$2 = global$d.String;
	var TypeError$5 = global$d.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$5 = function (argument) {
	  if (isObject$4(argument)) return argument;
	  throw TypeError$5(String$2(argument) + ' is not an object');
	};

	var global$c = global$s;
	var DESCRIPTORS$6 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$4 = anObject$5;
	var toPropertyKey$2 = toPropertyKey$4;

	var TypeError$4 = global$c.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$6 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$4(O);
	  P = toPropertyKey$2(P);
	  anObject$4(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$4('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$5 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;

	var createNonEnumerableProperty$4 = DESCRIPTORS$5 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$2 = {exports: {}};

	var uncurryThis$9 = functionUncurryThis;
	var isCallable$6 = isCallable$c;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$9(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$6(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var global$b = global$s;
	var isCallable$5 = isCallable$c;
	var inspectSource$2 = inspectSource$3;

	var WeakMap$1 = global$b.WeakMap;

	var nativeWeakMap = isCallable$5(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

	var shared$2 = shared$4.exports;
	var uid$1 = uid$3;

	var keys = shared$2('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	var hiddenKeys$5 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$a = global$s;
	var uncurryThis$8 = functionUncurryThis;
	var isObject$3 = isObject$8;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
	var hasOwn$7 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$4 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$3 = global$a.TypeError;
	var WeakMap = global$a.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = uncurryThis$8(store.get);
	  var wmhas = uncurryThis$8(store.has);
	  var wmset = uncurryThis$8(store.set);
	  set = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
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
	  var STATE = sharedKey$2('state');
	  hiddenKeys$4[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$7(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$3(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$7(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$7(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var DESCRIPTORS$4 = descriptors;
	var hasOwn$6 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var global$9 = global$s;
	var isCallable$4 = isCallable$c;
	var hasOwn$5 = hasOwnProperty_1;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$1 = inspectSource$3;
	var InternalStateModule$1 = internalState;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

	var getInternalState$1 = InternalStateModule$1.get;
	var enforceInternalState = InternalStateModule$1.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$2.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  var state;
	  if (isCallable$4(value)) {
	    if (String(name).slice(0, 7) === 'Symbol(') {
	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	    }
	    if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	      createNonEnumerableProperty$2(value, 'name', name);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	    }
	  }
	  if (O === global$9) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$2(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return isCallable$4(this) && getInternalState$1(this).source || inspectSource$1(this);
	});

	var objectGetOwnPropertyNames = {};

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

	var max$1 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$1(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
	};

	var toIntegerOrInfinity = toIntegerOrInfinity$2;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$1(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$3 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$7 = toIndexedObject$9;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$2 = lengthOfArrayLike$3;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$7($this);
	    var length = lengthOfArrayLike$2(O);
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
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var uncurryThis$7 = functionUncurryThis;
	var hasOwn$4 = hasOwnProperty_1;
	var toIndexedObject$6 = toIndexedObject$9;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;

	var push$2 = uncurryThis$7([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$6(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$4(hiddenKeys$3, key) && hasOwn$4(O, key) && push$2(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$4(O, key = names[i++])) {
	    ~indexOf(result, key) || push$2(result, key);
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

	var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$3 = getBuiltIn$6;
	var uncurryThis$6 = functionUncurryThis;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$3 = anObject$5;

	var concat = uncurryThis$6([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$3(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$3 = hasOwnProperty_1;
	var ownKeys$2 = ownKeys$3;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys$2(source);
	  var defineProperty = definePropertyModule$3.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$3(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$7 = fails$c;
	var isCallable$3 = isCallable$c;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$3(detection) ? fails$7(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$8 = global$s;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
	var redefine$1 = redefine$2.exports;
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
	    target = global$8;
	  } else if (STATIC) {
	    target = global$8[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$8[TARGET] || {}).prototype;
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
	      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$1(target, key, sourceProperty, options);
	  }
	};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$2 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var $$6 = _export;
	var toObject$3 = toObject$5;
	var nativeKeys = objectKeys$2;
	var fails$6 = fails$c;

	var FAILS_ON_PRIMITIVES$1 = fails$6(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$6({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$3(it));
	  }
	});

	var FunctionPrototype = Function.prototype;
	var apply$1 = FunctionPrototype.apply;
	var bind$2 = FunctionPrototype.bind;
	var call$1 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$2 ? call$1.bind(apply$1) : function () {
	  return call$1.apply(apply$1, arguments);
	});

	var classof$4 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$4(argument) == 'Array';
	};

	var wellKnownSymbol$7 = wellKnownSymbol$9;

	var TO_STRING_TAG$2 = wellKnownSymbol$7('toStringTag');
	var test = {};

	test[TO_STRING_TAG$2] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$7 = global$s;
	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable$2 = isCallable$c;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$6 = wellKnownSymbol$9;

	var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag');
	var Object$1 = global$7.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$3 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$2(O.callee) ? 'Arguments' : result;
	};

	var global$6 = global$s;
	var classof$2 = classof$3;

	var String$1 = global$6.String;

	var toString = function (argument) {
	  if (classof$2(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$1(argument);
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$2 = anObject$5;
	var toIndexedObject$5 = toIndexedObject$9;
	var objectKeys$1 = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var objectDefineProperties = DESCRIPTORS$3 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$2(O);
	  var props = toIndexedObject$5(Properties);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$2 = getBuiltIn$6;

	var html$1 = getBuiltIn$2('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$1 = anObject$5;
	var defineProperties = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$1 = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey$1('IE_PROTO');

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
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$1(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : defineProperties(result, Properties);
	};

	var objectGetOwnPropertyNamesExternal = {};

	var uncurryThis$5 = functionUncurryThis;

	var arraySlice$2 = uncurryThis$5([].slice);

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var classof$1 = classofRaw$1;
	var toIndexedObject$4 = toIndexedObject$9;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$1 = arraySlice$2;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$1(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$1(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$4(it));
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$5 = wellKnownSymbol$9;

	wellKnownSymbolWrapped.f = wellKnownSymbol$5;

	var global$5 = global$s;

	var path$1 = global$5;

	var path = path$1;
	var hasOwn$2 = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$1 = objectDefineProperty.f;

	var defineWellKnownSymbol$1 = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!hasOwn$2(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var defineProperty = objectDefineProperty.f;
	var hasOwn$1 = hasOwnProperty_1;
	var wellKnownSymbol$4 = wellKnownSymbol$9;

	var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');

	var setToStringTag$1 = function (it, TAG, STATIC) {
	  if (it && !hasOwn$1(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var uncurryThis$4 = functionUncurryThis;
	var aCallable = aCallable$2;

	var bind$1 = uncurryThis$4(uncurryThis$4.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : bind$1 ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var uncurryThis$3 = functionUncurryThis;
	var fails$5 = fails$c;
	var isCallable$1 = isCallable$c;
	var classof = classof$3;
	var getBuiltIn$1 = getBuiltIn$6;
	var inspectSource = inspectSource$3;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis$3(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function (argument) {
	  if (!isCallable$1(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function (argument) {
	  if (!isCallable$1(argument)) return false;
	  switch (classof(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	    // we can't check .prototype since constructors produced by .bind haven't it
	  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	};

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct || fails$5(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var global$4 = global$s;
	var isArray$2 = isArray$3;
	var isConstructor = isConstructor$1;
	var isObject$2 = isObject$8;
	var wellKnownSymbol$3 = wellKnownSymbol$9;

	var SPECIES$1 = wellKnownSymbol$3('species');
	var Array$1 = global$4.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === Array$1 || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$2(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$1 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind = functionBindContext;
	var uncurryThis$2 = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toObject$2 = toObject$5;
	var lengthOfArrayLike$1 = lengthOfArrayLike$3;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;

	var push$1 = uncurryThis$2([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$2($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind(callbackfn, that);
	    var length = lengthOfArrayLike$1(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$1;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$1(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$1(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};

	var $$5 = _export;
	var global$3 = global$s;
	var getBuiltIn = getBuiltIn$6;
	var apply = functionApply;
	var call = functionCall;
	var uncurryThis$1 = functionUncurryThis;
	var DESCRIPTORS$2 = descriptors;
	var NATIVE_SYMBOL = nativeSymbol;
	var fails$4 = fails$c;
	var hasOwn = hasOwnProperty_1;
	var isArray$1 = isArray$3;
	var isCallable = isCallable$c;
	var isObject$1 = isObject$8;
	var isPrototypeOf = objectIsPrototypeOf;
	var isSymbol = isSymbol$3;
	var anObject = anObject$5;
	var toObject$1 = toObject$5;
	var toIndexedObject$3 = toIndexedObject$9;
	var toPropertyKey$1 = toPropertyKey$4;
	var $toString = toString;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$2;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$1 = objectDefineProperty;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var arraySlice = arraySlice$2;
	var redefine = redefine$2.exports;
	var shared = shared$4.exports;
	var sharedKey = sharedKey$3;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol$2 = wellKnownSymbol$9;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol = defineWellKnownSymbol$1;
	var setToStringTag = setToStringTag$1;
	var InternalStateModule = internalState;
	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(SYMBOL);

	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$3.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$2 = global$3.TypeError;
	var QObject = global$3.QObject;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
	var nativeDefineProperty = definePropertyModule$1.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push = uncurryThis$1([].push);

	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$2 && fails$4(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$2) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPropertyKey$1(P);
	  anObject(Attributes);
	  if (hasOwn(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject$3(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!DESCRIPTORS$2 || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPropertyKey$1(V);
	  var enumerable = call(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$3(O);
	  var key = toPropertyKey$1(P);
	  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
	      push(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError$2('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (DESCRIPTORS$2 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  redefine(SymbolPrototype, 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule$1.f = $defineProperty;
	  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$2(name), name);
	  };

	  if (DESCRIPTORS$2) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	$$5({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	$$5({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = $toString(key);
	    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError$2(sym + ' is not a symbol');
	    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$5({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$2 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$5({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$5({ target: 'Object', stat: true, forced: fails$4(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject$1(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$4(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$5({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$1(replacer)) replacer = function (key, value) {
	        if (isCallable($replacer)) value = call($replacer, this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return apply($stringify, null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!SymbolPrototype[TO_PRIMITIVE]) {
	  var valueOf = SymbolPrototype.valueOf;
	  // eslint-disable-next-line no-unused-vars -- required for .length
	  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	    // TODO: improve hint logic
	    return call(valueOf, this);
	  });
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var $$4 = _export;
	var fails$3 = fails$c;
	var toIndexedObject$2 = toIndexedObject$9;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var DESCRIPTORS$1 = descriptors;

	var FAILS_ON_PRIMITIVES = fails$3(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED$1 = !DESCRIPTORS$1 || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$$4({ target: 'Object', stat: true, forced: FORCED$1, sham: !DESCRIPTORS$1 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject$2(it), key);
	  }
	});

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

	var fails$2 = fails$c;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$2(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

	var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$2 = global$s;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty = createNonEnumerableProperty$4;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(global$2[COLLECTION_NAME] && global$2[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	var toPropertyKey = toPropertyKey$4;
	var definePropertyModule = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$4;

	var createProperty$2 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var $$3 = _export;
	var DESCRIPTORS = descriptors;
	var ownKeys$1 = ownKeys$3;
	var toIndexedObject$1 = toIndexedObject$9;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var createProperty$1 = createProperty$2;

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	$$3({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject$1(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    var keys = ownKeys$1(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty$1(result, key, descriptor);
	    }
	    return result;
	  }
	});

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

	var $$2 = _export;
	var uncurryThis = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toIndexedObject = toIndexedObject$9;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var un$Join = uncurryThis([].join);

	var ES3_STRINGS = IndexedObject != Object;
	var STRICT_METHOD = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$2({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
	  join: function join(separator) {
	    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var fails$1 = fails$c;
	var wellKnownSymbol$1 = wellKnownSymbol$9;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES = wellKnownSymbol$1('species');

	var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$1(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$1 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $ = _export;
	var global$1 = global$s;
	var fails = fails$c;
	var isArray = isArray$3;
	var isObject = isObject$8;
	var toObject = toObject$5;
	var lengthOfArrayLike = lengthOfArrayLike$3;
	var createProperty = createProperty$2;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
	var wellKnownSymbol = wellKnownSymbol$9;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$1 = global$1.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$({ target: 'Array', proto: true, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike(E);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var css_248z = ".ft-tooltip[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.ft-tooltip{border-radius:3px;box-shadow:0 9px 16px 8px rgba(0,0,0,.03),0 6px 10px 0 rgba(0,0,0,.06),0 3px 6px -3px rgba(0,0,0,.12);background-color:#fff;color:#555;font-size:14px;line-height:1.5;white-space:normal;outline:0;transition-property:transform,visibility,opacity;position:relative}.ft-tooltip[data-placement^=top]>.ft-tooltip-arrow{bottom:0}.ft-tooltip[data-placement^=top]>.ft-tooltip-arrow:before{bottom:-5px;left:0;border-width:6px 6px 0;border-top-color:initial;transform-origin:center top}.ft-tooltip[data-placement^=bottom]>.ft-tooltip-arrow{top:0}.ft-tooltip[data-placement^=bottom]>.ft-tooltip-arrow:before{top:-5px;left:0;border-width:0 6px 6px;border-bottom-color:initial;transform-origin:center bottom}.ft-tooltip[data-placement^=left]>.ft-tooltip-arrow{right:0}.ft-tooltip[data-placement^=left]>.ft-tooltip-arrow:before{border-width:6px 0 6px 6px;border-left-color:initial;right:-5px;transform-origin:center}.ft-tooltip[data-placement^=right]>.ft-tooltip-arrow{left:0}.ft-tooltip[data-placement^=right]>.ft-tooltip-arrow:before{left:-5px;border-width:6px 6px 6px 0;border-right-color:initial;transform-origin:center}.ft-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.ft-tooltip-arrow{width:12px;height:12px;color:#fff}.ft-tooltip-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.ft-tooltip-content{padding:10px;position:relative;z-index:1}.ft-tooltip.is-dark{color:#fff;background-color:#222}.ft-tooltip.is-dark .ft-tooltip-arrow{color:#222}";
	styleInject(css_248z, {id: "future-tooltip-2.0.0"});

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement$1(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement$1(placement) {
	  return placement.split('-')[0];
	}

	// import { isHTMLElement } from './instanceOf';
	function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
	includeScale) {

	  var rect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1; // FIXME:
	  // `offsetWidth` returns an integer while `getBoundingClientRect`
	  // returns a float. This results in `scaleX` or `scaleY` being
	  // non-1 when it should be for elements that aren't a full pixel in
	  // width or height.
	  // if (isHTMLElement(element) && includeScale) {
	  //   const offsetHeight = element.offsetHeight;
	  //   const offsetWidth = element.offsetWidth;
	  //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
	  //   // Fallback to 1 in case both values are `0`
	  //   if (offsetWidth > 0) {
	  //     scaleX = rect.width / offsetWidth || 1;
	  //   }
	  //   if (offsetHeight > 0) {
	  //     scaleY = rect.height / offsetHeight || 1;
	  //   }
	  // }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement$1(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (process.env.NODE_ENV !== "production") {
	    if (!isHTMLElement(arrowElement)) {
	      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {
	    if (process.env.NODE_ENV !== "production") {
	      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
	    }

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(round(x * dpr) / dpr) || 0,
	    y: round(round(y * dpr) / dpr) || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets;

	  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
	      _ref3$x = _ref3.x,
	      x = _ref3$x === void 0 ? 0 : _ref3$x,
	      _ref3$y = _ref3.y,
	      y = _ref3$y === void 0 ? 0 : _ref3$y;

	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom; // $FlowFixMe[prop-missing]

	      y -= offsetParent[heightProp] - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right; // $FlowFixMe[prop-missing]

	      x -= offsetParent[widthProp] - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref4) {
	  var state = _ref4.state,
	      options = _ref4.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  if (process.env.NODE_ENV !== "production") {
	    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

	    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
	      return transitionProperty.indexOf(property) >= 0;
	    })) {
	      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
	    }
	  }

	  var commonStyles = {
	    placement: getBasePlacement$1(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement$1(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement$1(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;

	    if (process.env.NODE_ENV !== "production") {
	      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
	    }
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement$1(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement$1(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement$1(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement$1(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement$1(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement$1(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis || checkAltAxis) {
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
	    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
	    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

	    if (checkMainAxis) {
	      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	      popperOffsets[mainAxis] = preventedOffset;
	      data[mainAxis] = preventedOffset - offset;
	    }

	    if (checkAltAxis) {
	      var _mainSide = mainAxis === 'x' ? top : left;

	      var _altSide = mainAxis === 'x' ? bottom : right;

	      var _offset = popperOffsets[altAxis];

	      var _min = _offset + overflow[_mainSide];

	      var _max = _offset - overflow[_altSide];

	      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

	      popperOffsets[altAxis] = _preventedOffset;
	      data[altAxis] = _preventedOffset - _offset;
	    }
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = rect.width / element.offsetWidth || 1;
	  var scaleY = rect.height / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce$1(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function format(str) {
	  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [].concat(args).reduce(function (p, c) {
	    return p.replace(/%s/, c);
	  }, str);
	}

	var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
	var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
	var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
	function validateModifiers(modifiers) {
	  modifiers.forEach(function (modifier) {
	    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
	    .filter(function (value, index, self) {
	      return self.indexOf(value) === index;
	    }).forEach(function (key) {
	      switch (key) {
	        case 'name':
	          if (typeof modifier.name !== 'string') {
	            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
	          }

	          break;

	        case 'enabled':
	          if (typeof modifier.enabled !== 'boolean') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
	          }

	          break;

	        case 'phase':
	          if (modifierPhases.indexOf(modifier.phase) < 0) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
	          }

	          break;

	        case 'fn':
	          if (typeof modifier.fn !== 'function') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
	          }

	          break;

	        case 'effect':
	          if (modifier.effect != null && typeof modifier.effect !== 'function') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
	          }

	          break;

	        case 'requires':
	          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
	          }

	          break;

	        case 'requiresIfExists':
	          if (!Array.isArray(modifier.requiresIfExists)) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
	          }

	          break;

	        case 'options':
	        case 'data':
	          break;

	        default:
	          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
	            return "\"" + s + "\"";
	          }).join(', ') + "; but \"" + key + "\" was provided.");
	      }

	      modifier.requires && modifier.requires.forEach(function (requirement) {
	        if (modifiers.find(function (mod) {
	          return mod.name === requirement;
	        }) == null) {
	          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
	        }
	      });
	    });
	  });
	}

	function uniqueBy(arr, fn) {
	  var identifiers = new Set();
	  return arr.filter(function (item) {
	    var identifier = fn(item);

	    if (!identifiers.has(identifier)) {
	      identifiers.add(identifier);
	      return true;
	    }
	  });
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
	var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        // if one of the modifiers is invalid for any reason

	        if (process.env.NODE_ENV !== "production") {
	          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
	            var name = _ref.name;
	            return name;
	          });
	          validateModifiers(modifiers);

	          if (getBasePlacement$1(state.options.placement) === auto) {
	            var flipModifier = state.orderedModifiers.find(function (_ref2) {
	              var name = _ref2.name;
	              return name === 'flip';
	            });

	            if (!flipModifier) {
	              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
	            }
	          }

	          var _getComputedStyle = getComputedStyle(popper),
	              marginTop = _getComputedStyle.marginTop,
	              marginRight = _getComputedStyle.marginRight,
	              marginBottom = _getComputedStyle.marginBottom,
	              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
	          // cause bugs with positioning, so we'll warn the consumer


	          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
	            return parseFloat(margin);
	          })) {
	            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
	          }
	        }

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          if (process.env.NODE_ENV !== "production") {
	            console.error(INVALID_ELEMENT_ERROR);
	          }

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        var __debug_loops__ = 0;

	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (process.env.NODE_ENV !== "production") {
	            __debug_loops__ += 1;

	            if (__debug_loops__ > 100) {
	              console.error(INFINITE_LOOP_ERROR);
	              break;
	            }
	          }

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce$1(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {
	      if (process.env.NODE_ENV !== "production") {
	        console.error(INVALID_ELEMENT_ERROR);
	      }

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	/**!
	* tippy.js v6.3.7
	* (c) 2017-2021 atomiks
	* MIT License
	*/
	var BOX_CLASS = "tippy-box";
	var CONTENT_CLASS = "tippy-content";
	var BACKDROP_CLASS = "tippy-backdrop";
	var ARROW_CLASS = "tippy-arrow";
	var SVG_ARROW_CLASS = "tippy-svg-arrow";
	var TOUCH_OPTIONS = {
	  passive: true,
	  capture: true
	};
	var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
	  return document.body;
	};

	function hasOwnProperty(obj, key) {
	  return {}.hasOwnProperty.call(obj, key);
	}
	function getValueAtIndexOrReturn(value, index, defaultValue) {
	  if (Array.isArray(value)) {
	    var v = value[index];
	    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
	  }

	  return value;
	}
	function isType(value, type) {
	  var str = {}.toString.call(value);
	  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
	}
	function invokeWithArgsOrReturn(value, args) {
	  return typeof value === 'function' ? value.apply(void 0, args) : value;
	}
	function debounce(fn, ms) {
	  // Avoid wrapping in `setTimeout` if ms is 0 anyway
	  if (ms === 0) {
	    return fn;
	  }

	  var timeout;
	  return function (arg) {
	    clearTimeout(timeout);
	    timeout = setTimeout(function () {
	      fn(arg);
	    }, ms);
	  };
	}
	function removeProperties(obj, keys) {
	  var clone = Object.assign({}, obj);
	  keys.forEach(function (key) {
	    delete clone[key];
	  });
	  return clone;
	}
	function splitBySpaces(value) {
	  return value.split(/\s+/).filter(Boolean);
	}
	function normalizeToArray(value) {
	  return [].concat(value);
	}
	function pushIfUnique(arr, value) {
	  if (arr.indexOf(value) === -1) {
	    arr.push(value);
	  }
	}
	function unique(arr) {
	  return arr.filter(function (item, index) {
	    return arr.indexOf(item) === index;
	  });
	}
	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}
	function arrayFrom(value) {
	  return [].slice.call(value);
	}
	function removeUndefinedProps(obj) {
	  return Object.keys(obj).reduce(function (acc, key) {
	    if (obj[key] !== undefined) {
	      acc[key] = obj[key];
	    }

	    return acc;
	  }, {});
	}

	function div() {
	  return document.createElement('div');
	}
	function isElement(value) {
	  return ['Element', 'Fragment'].some(function (type) {
	    return isType(value, type);
	  });
	}
	function isNodeList(value) {
	  return isType(value, 'NodeList');
	}
	function isMouseEvent(value) {
	  return isType(value, 'MouseEvent');
	}
	function isReferenceElement(value) {
	  return !!(value && value._tippy && value._tippy.reference === value);
	}
	function getArrayOfElements(value) {
	  if (isElement(value)) {
	    return [value];
	  }

	  if (isNodeList(value)) {
	    return arrayFrom(value);
	  }

	  if (Array.isArray(value)) {
	    return value;
	  }

	  return arrayFrom(document.querySelectorAll(value));
	}
	function setTransitionDuration(els, value) {
	  els.forEach(function (el) {
	    if (el) {
	      el.style.transitionDuration = value + "ms";
	    }
	  });
	}
	function setVisibilityState(els, state) {
	  els.forEach(function (el) {
	    if (el) {
	      el.setAttribute('data-state', state);
	    }
	  });
	}
	function getOwnerDocument(elementOrElements) {
	  var _element$ownerDocumen;

	  var _normalizeToArray = normalizeToArray(elementOrElements),
	      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


	  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
	}
	function isCursorOutsideInteractiveBorder(popperTreeData, event) {
	  var clientX = event.clientX,
	      clientY = event.clientY;
	  return popperTreeData.every(function (_ref) {
	    var popperRect = _ref.popperRect,
	        popperState = _ref.popperState,
	        props = _ref.props;
	    var interactiveBorder = props.interactiveBorder;
	    var basePlacement = getBasePlacement(popperState.placement);
	    var offsetData = popperState.modifiersData.offset;

	    if (!offsetData) {
	      return true;
	    }

	    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
	    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
	    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
	    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
	    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
	    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
	    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
	    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
	    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
	  });
	}
	function updateTransitionEndListener(box, action, listener) {
	  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
	  // `webkitTransitionEnd`...

	  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
	    box[method](event, listener);
	  });
	}
	/**
	 * Compared to xxx.contains, this function works for dom structures with shadow
	 * dom
	 */

	function actualContains(parent, child) {
	  var target = child;

	  while (target) {
	    var _target$getRootNode;

	    if (parent.contains(target)) {
	      return true;
	    }

	    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
	  }

	  return false;
	}

	var currentInput = {
	  isTouch: false
	};
	var lastMouseMoveTime = 0;
	/**
	 * When a `touchstart` event is fired, it's assumed the user is using touch
	 * input. We'll bind a `mousemove` event listener to listen for mouse input in
	 * the future. This way, the `isTouch` property is fully dynamic and will handle
	 * hybrid devices that use a mix of touch + mouse input.
	 */

	function onDocumentTouchStart() {
	  if (currentInput.isTouch) {
	    return;
	  }

	  currentInput.isTouch = true;

	  if (window.performance) {
	    document.addEventListener('mousemove', onDocumentMouseMove);
	  }
	}
	/**
	 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
	 * the user is using mouse input again. `mousemove` can fire on touch devices as
	 * well, but very rarely that quickly.
	 */

	function onDocumentMouseMove() {
	  var now = performance.now();

	  if (now - lastMouseMoveTime < 20) {
	    currentInput.isTouch = false;
	    document.removeEventListener('mousemove', onDocumentMouseMove);
	  }

	  lastMouseMoveTime = now;
	}
	/**
	 * When an element is in focus and has a tippy, leaving the tab/window and
	 * returning causes it to show again. For mouse users this is unexpected, but
	 * for keyboard use it makes sense.
	 * TODO: find a better technique to solve this problem
	 */

	function onWindowBlur() {
	  var activeElement = document.activeElement;

	  if (isReferenceElement(activeElement)) {
	    var instance = activeElement._tippy;

	    if (activeElement.blur && !instance.state.isVisible) {
	      activeElement.blur();
	    }
	  }
	}
	function bindGlobalEventListeners() {
	  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
	  window.addEventListener('blur', onWindowBlur);
	}

	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
	var isIE11 = isBrowser ? // @ts-ignore
	!!window.msCrypto : false;

	function createMemoryLeakWarning(method) {
	  var txt = method === 'destroy' ? 'n already-' : ' ';
	  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
	}
	function clean(value) {
	  var spacesAndTabs = /[ \t]{2,}/g;
	  var lineStartWithSpaces = /^[ \t]*/gm;
	  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
	}

	function getDevMessage(message) {
	  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
	}

	function getFormattedMessage(message) {
	  return [getDevMessage(message), // title
	  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
	  'line-height: 1.5', // footer
	  'color: #a6a095;'];
	} // Assume warnings and errors never have the same message

	var visitedMessages;

	if (process.env.NODE_ENV !== "production") {
	  resetVisitedMessages();
	}

	function resetVisitedMessages() {
	  visitedMessages = new Set();
	}
	function warnWhen(condition, message) {
	  if (condition && !visitedMessages.has(message)) {
	    var _console;

	    visitedMessages.add(message);

	    (_console = console).warn.apply(_console, getFormattedMessage(message));
	  }
	}
	function errorWhen(condition, message) {
	  if (condition && !visitedMessages.has(message)) {
	    var _console2;

	    visitedMessages.add(message);

	    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
	  }
	}
	function validateTargets(targets) {
	  var didPassFalsyValue = !targets;
	  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
	  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
	  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
	}

	var pluginProps = {
	  animateFill: false,
	  followCursor: false,
	  inlinePositioning: false,
	  sticky: false
	};
	var renderProps = {
	  allowHTML: false,
	  animation: 'fade',
	  arrow: true,
	  content: '',
	  inertia: false,
	  maxWidth: 350,
	  role: 'tooltip',
	  theme: '',
	  zIndex: 9999
	};
	var defaultProps = Object.assign({
	  appendTo: TIPPY_DEFAULT_APPEND_TO,
	  aria: {
	    content: 'auto',
	    expanded: 'auto'
	  },
	  delay: 0,
	  duration: [300, 250],
	  getReferenceClientRect: null,
	  hideOnClick: true,
	  ignoreAttributes: false,
	  interactive: false,
	  interactiveBorder: 2,
	  interactiveDebounce: 0,
	  moveTransition: '',
	  offset: [0, 10],
	  onAfterUpdate: function onAfterUpdate() {},
	  onBeforeUpdate: function onBeforeUpdate() {},
	  onCreate: function onCreate() {},
	  onDestroy: function onDestroy() {},
	  onHidden: function onHidden() {},
	  onHide: function onHide() {},
	  onMount: function onMount() {},
	  onShow: function onShow() {},
	  onShown: function onShown() {},
	  onTrigger: function onTrigger() {},
	  onUntrigger: function onUntrigger() {},
	  onClickOutside: function onClickOutside() {},
	  placement: 'top',
	  plugins: [],
	  popperOptions: {},
	  render: null,
	  showOnCreate: false,
	  touch: true,
	  trigger: 'mouseenter focus',
	  triggerTarget: null
	}, pluginProps, renderProps);
	var defaultKeys = Object.keys(defaultProps);
	var setDefaultProps = function setDefaultProps(partialProps) {
	  /* istanbul ignore else */
	  if (process.env.NODE_ENV !== "production") {
	    validateProps(partialProps, []);
	  }

	  var keys = Object.keys(partialProps);
	  keys.forEach(function (key) {
	    defaultProps[key] = partialProps[key];
	  });
	};
	function getExtendedPassedProps(passedProps) {
	  var plugins = passedProps.plugins || [];
	  var pluginProps = plugins.reduce(function (acc, plugin) {
	    var name = plugin.name,
	        defaultValue = plugin.defaultValue;

	    if (name) {
	      var _name;

	      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
	    }

	    return acc;
	  }, {});
	  return Object.assign({}, passedProps, pluginProps);
	}
	function getDataAttributeProps(reference, plugins) {
	  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
	    plugins: plugins
	  }))) : defaultKeys;
	  var props = propKeys.reduce(function (acc, key) {
	    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

	    if (!valueAsString) {
	      return acc;
	    }

	    if (key === 'content') {
	      acc[key] = valueAsString;
	    } else {
	      try {
	        acc[key] = JSON.parse(valueAsString);
	      } catch (e) {
	        acc[key] = valueAsString;
	      }
	    }

	    return acc;
	  }, {});
	  return props;
	}
	function evaluateProps(reference, props) {
	  var out = Object.assign({}, props, {
	    content: invokeWithArgsOrReturn(props.content, [reference])
	  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
	  out.aria = Object.assign({}, defaultProps.aria, out.aria);
	  out.aria = {
	    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
	    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
	  };
	  return out;
	}
	function validateProps(partialProps, plugins) {
	  if (partialProps === void 0) {
	    partialProps = {};
	  }

	  if (plugins === void 0) {
	    plugins = [];
	  }

	  var keys = Object.keys(partialProps);
	  keys.forEach(function (prop) {
	    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
	    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

	    if (didPassUnknownProp) {
	      didPassUnknownProp = plugins.filter(function (plugin) {
	        return plugin.name === prop;
	      }).length === 0;
	    }

	    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
	  });
	}

	var innerHTML = function innerHTML() {
	  return 'innerHTML';
	};

	function dangerouslySetInnerHTML(element, html) {
	  element[innerHTML()] = html;
	}

	function createArrowElement(value) {
	  var arrow = div();

	  if (value === true) {
	    arrow.className = ARROW_CLASS;
	  } else {
	    arrow.className = SVG_ARROW_CLASS;

	    if (isElement(value)) {
	      arrow.appendChild(value);
	    } else {
	      dangerouslySetInnerHTML(arrow, value);
	    }
	  }

	  return arrow;
	}

	function setContent(content, props) {
	  if (isElement(props.content)) {
	    dangerouslySetInnerHTML(content, '');
	    content.appendChild(props.content);
	  } else if (typeof props.content !== 'function') {
	    if (props.allowHTML) {
	      dangerouslySetInnerHTML(content, props.content);
	    } else {
	      content.textContent = props.content;
	    }
	  }
	}
	function getChildren(popper) {
	  var box = popper.firstElementChild;
	  var boxChildren = arrayFrom(box.children);
	  return {
	    box: box,
	    content: boxChildren.find(function (node) {
	      return node.classList.contains(CONTENT_CLASS);
	    }),
	    arrow: boxChildren.find(function (node) {
	      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
	    }),
	    backdrop: boxChildren.find(function (node) {
	      return node.classList.contains(BACKDROP_CLASS);
	    })
	  };
	}
	function render(instance) {
	  var popper = div();
	  var box = div();
	  box.className = BOX_CLASS;
	  box.setAttribute('data-state', 'hidden');
	  box.setAttribute('tabindex', '-1');
	  var content = div();
	  content.className = CONTENT_CLASS;
	  content.setAttribute('data-state', 'hidden');
	  setContent(content, instance.props);
	  popper.appendChild(box);
	  box.appendChild(content);
	  onUpdate(instance.props, instance.props);

	  function onUpdate(prevProps, nextProps) {
	    var _getChildren = getChildren(popper),
	        box = _getChildren.box,
	        content = _getChildren.content,
	        arrow = _getChildren.arrow;

	    if (nextProps.theme) {
	      box.setAttribute('data-theme', nextProps.theme);
	    } else {
	      box.removeAttribute('data-theme');
	    }

	    if (typeof nextProps.animation === 'string') {
	      box.setAttribute('data-animation', nextProps.animation);
	    } else {
	      box.removeAttribute('data-animation');
	    }

	    if (nextProps.inertia) {
	      box.setAttribute('data-inertia', '');
	    } else {
	      box.removeAttribute('data-inertia');
	    }

	    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

	    if (nextProps.role) {
	      box.setAttribute('role', nextProps.role);
	    } else {
	      box.removeAttribute('role');
	    }

	    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
	      setContent(content, instance.props);
	    }

	    if (nextProps.arrow) {
	      if (!arrow) {
	        box.appendChild(createArrowElement(nextProps.arrow));
	      } else if (prevProps.arrow !== nextProps.arrow) {
	        box.removeChild(arrow);
	        box.appendChild(createArrowElement(nextProps.arrow));
	      }
	    } else if (arrow) {
	      box.removeChild(arrow);
	    }
	  }

	  return {
	    popper: popper,
	    onUpdate: onUpdate
	  };
	} // Runtime check to identify if the render function is the default one; this
	// way we can apply default CSS transitions logic and it can be tree-shaken away

	render.$$tippy = true;

	var idCounter = 1;
	var mouseMoveListeners = []; // Used by `hideAll()`

	var mountedInstances = [];
	function createTippy(reference, passedProps) {
	  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
	  // 🔒 Private members
	  // ===========================================================================

	  var showTimeout;
	  var hideTimeout;
	  var scheduleHideAnimationFrame;
	  var isVisibleFromClick = false;
	  var didHideDueToDocumentMouseDown = false;
	  var didTouchMove = false;
	  var ignoreOnFirstUpdate = false;
	  var lastTriggerEvent;
	  var currentTransitionEndListener;
	  var onFirstUpdate;
	  var listeners = [];
	  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
	  var currentTarget; // ===========================================================================
	  // 🔑 Public members
	  // ===========================================================================

	  var id = idCounter++;
	  var popperInstance = null;
	  var plugins = unique(props.plugins);
	  var state = {
	    // Is the instance currently enabled?
	    isEnabled: true,
	    // Is the tippy currently showing and not transitioning out?
	    isVisible: false,
	    // Has the instance been destroyed?
	    isDestroyed: false,
	    // Is the tippy currently mounted to the DOM?
	    isMounted: false,
	    // Has the tippy finished transitioning in?
	    isShown: false
	  };
	  var instance = {
	    // properties
	    id: id,
	    reference: reference,
	    popper: div(),
	    popperInstance: popperInstance,
	    props: props,
	    state: state,
	    plugins: plugins,
	    // methods
	    clearDelayTimeouts: clearDelayTimeouts,
	    setProps: setProps,
	    setContent: setContent,
	    show: show,
	    hide: hide,
	    hideWithInteractivity: hideWithInteractivity,
	    enable: enable,
	    disable: disable,
	    unmount: unmount,
	    destroy: destroy
	  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
	  // it doesn't seem to happen in the browser

	  /* istanbul ignore if */

	  if (!props.render) {
	    if (process.env.NODE_ENV !== "production") {
	      errorWhen(true, 'render() function has not been supplied.');
	    }

	    return instance;
	  } // ===========================================================================
	  // Initial mutations
	  // ===========================================================================


	  var _props$render = props.render(instance),
	      popper = _props$render.popper,
	      onUpdate = _props$render.onUpdate;

	  popper.setAttribute('data-tippy-root', '');
	  popper.id = "tippy-" + instance.id;
	  instance.popper = popper;
	  reference._tippy = instance;
	  popper._tippy = instance;
	  var pluginsHooks = plugins.map(function (plugin) {
	    return plugin.fn(instance);
	  });
	  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
	  addListeners();
	  handleAriaExpandedAttribute();
	  handleStyles();
	  invokeHook('onCreate', [instance]);

	  if (props.showOnCreate) {
	    scheduleShow();
	  } // Prevent a tippy with a delay from hiding if the cursor left then returned
	  // before it started hiding


	  popper.addEventListener('mouseenter', function () {
	    if (instance.props.interactive && instance.state.isVisible) {
	      instance.clearDelayTimeouts();
	    }
	  });
	  popper.addEventListener('mouseleave', function () {
	    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
	      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
	    }
	  });
	  return instance; // ===========================================================================
	  // 🔒 Private methods
	  // ===========================================================================

	  function getNormalizedTouchSettings() {
	    var touch = instance.props.touch;
	    return Array.isArray(touch) ? touch : [touch, 0];
	  }

	  function getIsCustomTouchBehavior() {
	    return getNormalizedTouchSettings()[0] === 'hold';
	  }

	  function getIsDefaultRenderFn() {
	    var _instance$props$rende;

	    // @ts-ignore
	    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
	  }

	  function getCurrentTarget() {
	    return currentTarget || reference;
	  }

	  function getDocument() {
	    var parent = getCurrentTarget().parentNode;
	    return parent ? getOwnerDocument(parent) : document;
	  }

	  function getDefaultTemplateChildren() {
	    return getChildren(popper);
	  }

	  function getDelay(isShow) {
	    // For touch or keyboard input, force `0` delay for UX reasons
	    // Also if the instance is mounted but not visible (transitioning out),
	    // ignore delay
	    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
	      return 0;
	    }

	    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
	  }

	  function handleStyles(fromHide) {
	    if (fromHide === void 0) {
	      fromHide = false;
	    }

	    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
	    popper.style.zIndex = "" + instance.props.zIndex;
	  }

	  function invokeHook(hook, args, shouldInvokePropsHook) {
	    if (shouldInvokePropsHook === void 0) {
	      shouldInvokePropsHook = true;
	    }

	    pluginsHooks.forEach(function (pluginHooks) {
	      if (pluginHooks[hook]) {
	        pluginHooks[hook].apply(pluginHooks, args);
	      }
	    });

	    if (shouldInvokePropsHook) {
	      var _instance$props;

	      (_instance$props = instance.props)[hook].apply(_instance$props, args);
	    }
	  }

	  function handleAriaContentAttribute() {
	    var aria = instance.props.aria;

	    if (!aria.content) {
	      return;
	    }

	    var attr = "aria-" + aria.content;
	    var id = popper.id;
	    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
	    nodes.forEach(function (node) {
	      var currentValue = node.getAttribute(attr);

	      if (instance.state.isVisible) {
	        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
	      } else {
	        var nextValue = currentValue && currentValue.replace(id, '').trim();

	        if (nextValue) {
	          node.setAttribute(attr, nextValue);
	        } else {
	          node.removeAttribute(attr);
	        }
	      }
	    });
	  }

	  function handleAriaExpandedAttribute() {
	    if (hasAriaExpanded || !instance.props.aria.expanded) {
	      return;
	    }

	    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
	    nodes.forEach(function (node) {
	      if (instance.props.interactive) {
	        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
	      } else {
	        node.removeAttribute('aria-expanded');
	      }
	    });
	  }

	  function cleanupInteractiveMouseListeners() {
	    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
	    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
	      return listener !== debouncedOnMouseMove;
	    });
	  }

	  function onDocumentPress(event) {
	    // Moved finger to scroll instead of an intentional tap outside
	    if (currentInput.isTouch) {
	      if (didTouchMove || event.type === 'mousedown') {
	        return;
	      }
	    }

	    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

	    if (instance.props.interactive && actualContains(popper, actualTarget)) {
	      return;
	    } // Clicked on the event listeners target


	    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
	      return actualContains(el, actualTarget);
	    })) {
	      if (currentInput.isTouch) {
	        return;
	      }

	      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
	        return;
	      }
	    } else {
	      invokeHook('onClickOutside', [instance, event]);
	    }

	    if (instance.props.hideOnClick === true) {
	      instance.clearDelayTimeouts();
	      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
	      // currentTarget. This lets a tippy with `focus` trigger know that it
	      // should not show

	      didHideDueToDocumentMouseDown = true;
	      setTimeout(function () {
	        didHideDueToDocumentMouseDown = false;
	      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
	      // before it shows, and hide()'s early bail-out behavior can prevent it
	      // from being cleaned up

	      if (!instance.state.isMounted) {
	        removeDocumentPress();
	      }
	    }
	  }

	  function onTouchMove() {
	    didTouchMove = true;
	  }

	  function onTouchStart() {
	    didTouchMove = false;
	  }

	  function addDocumentPress() {
	    var doc = getDocument();
	    doc.addEventListener('mousedown', onDocumentPress, true);
	    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
	    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
	    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
	  }

	  function removeDocumentPress() {
	    var doc = getDocument();
	    doc.removeEventListener('mousedown', onDocumentPress, true);
	    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
	    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
	    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
	  }

	  function onTransitionedOut(duration, callback) {
	    onTransitionEnd(duration, function () {
	      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
	        callback();
	      }
	    });
	  }

	  function onTransitionedIn(duration, callback) {
	    onTransitionEnd(duration, callback);
	  }

	  function onTransitionEnd(duration, callback) {
	    var box = getDefaultTemplateChildren().box;

	    function listener(event) {
	      if (event.target === box) {
	        updateTransitionEndListener(box, 'remove', listener);
	        callback();
	      }
	    } // Make callback synchronous if duration is 0
	    // `transitionend` won't fire otherwise


	    if (duration === 0) {
	      return callback();
	    }

	    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
	    updateTransitionEndListener(box, 'add', listener);
	    currentTransitionEndListener = listener;
	  }

	  function on(eventType, handler, options) {
	    if (options === void 0) {
	      options = false;
	    }

	    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
	    nodes.forEach(function (node) {
	      node.addEventListener(eventType, handler, options);
	      listeners.push({
	        node: node,
	        eventType: eventType,
	        handler: handler,
	        options: options
	      });
	    });
	  }

	  function addListeners() {
	    if (getIsCustomTouchBehavior()) {
	      on('touchstart', onTrigger, {
	        passive: true
	      });
	      on('touchend', onMouseLeave, {
	        passive: true
	      });
	    }

	    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
	      if (eventType === 'manual') {
	        return;
	      }

	      on(eventType, onTrigger);

	      switch (eventType) {
	        case 'mouseenter':
	          on('mouseleave', onMouseLeave);
	          break;

	        case 'focus':
	          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
	          break;

	        case 'focusin':
	          on('focusout', onBlurOrFocusOut);
	          break;
	      }
	    });
	  }

	  function removeListeners() {
	    listeners.forEach(function (_ref) {
	      var node = _ref.node,
	          eventType = _ref.eventType,
	          handler = _ref.handler,
	          options = _ref.options;
	      node.removeEventListener(eventType, handler, options);
	    });
	    listeners = [];
	  }

	  function onTrigger(event) {
	    var _lastTriggerEvent;

	    var shouldScheduleClickHide = false;

	    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
	      return;
	    }

	    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
	    lastTriggerEvent = event;
	    currentTarget = event.currentTarget;
	    handleAriaExpandedAttribute();

	    if (!instance.state.isVisible && isMouseEvent(event)) {
	      // If scrolling, `mouseenter` events can be fired if the cursor lands
	      // over a new target, but `mousemove` events don't get fired. This
	      // causes interactive tooltips to get stuck open until the cursor is
	      // moved
	      mouseMoveListeners.forEach(function (listener) {
	        return listener(event);
	      });
	    } // Toggle show/hide when clicking click-triggered tooltips


	    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
	      shouldScheduleClickHide = true;
	    } else {
	      scheduleShow(event);
	    }

	    if (event.type === 'click') {
	      isVisibleFromClick = !shouldScheduleClickHide;
	    }

	    if (shouldScheduleClickHide && !wasFocused) {
	      scheduleHide(event);
	    }
	  }

	  function onMouseMove(event) {
	    var target = event.target;
	    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

	    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
	      return;
	    }

	    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
	      var _instance$popperInsta;

	      var instance = popper._tippy;
	      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

	      if (state) {
	        return {
	          popperRect: popper.getBoundingClientRect(),
	          popperState: state,
	          props: props
	        };
	      }

	      return null;
	    }).filter(Boolean);

	    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
	      cleanupInteractiveMouseListeners();
	      scheduleHide(event);
	    }
	  }

	  function onMouseLeave(event) {
	    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

	    if (shouldBail) {
	      return;
	    }

	    if (instance.props.interactive) {
	      instance.hideWithInteractivity(event);
	      return;
	    }

	    scheduleHide(event);
	  }

	  function onBlurOrFocusOut(event) {
	    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
	      return;
	    } // If focus was moved to within the popper


	    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
	      return;
	    }

	    scheduleHide(event);
	  }

	  function isEventListenerStopped(event) {
	    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
	  }

	  function createPopperInstance() {
	    destroyPopperInstance();
	    var _instance$props2 = instance.props,
	        popperOptions = _instance$props2.popperOptions,
	        placement = _instance$props2.placement,
	        offset = _instance$props2.offset,
	        getReferenceClientRect = _instance$props2.getReferenceClientRect,
	        moveTransition = _instance$props2.moveTransition;
	    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
	    var computedReference = getReferenceClientRect ? {
	      getBoundingClientRect: getReferenceClientRect,
	      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
	    } : reference;
	    var tippyModifier = {
	      name: '$$tippy',
	      enabled: true,
	      phase: 'beforeWrite',
	      requires: ['computeStyles'],
	      fn: function fn(_ref2) {
	        var state = _ref2.state;

	        if (getIsDefaultRenderFn()) {
	          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
	              box = _getDefaultTemplateCh.box;

	          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
	            if (attr === 'placement') {
	              box.setAttribute('data-placement', state.placement);
	            } else {
	              if (state.attributes.popper["data-popper-" + attr]) {
	                box.setAttribute("data-" + attr, '');
	              } else {
	                box.removeAttribute("data-" + attr);
	              }
	            }
	          });
	          state.attributes.popper = {};
	        }
	      }
	    };
	    var modifiers = [{
	      name: 'offset',
	      options: {
	        offset: offset
	      }
	    }, {
	      name: 'preventOverflow',
	      options: {
	        padding: {
	          top: 2,
	          bottom: 2,
	          left: 5,
	          right: 5
	        }
	      }
	    }, {
	      name: 'flip',
	      options: {
	        padding: 5
	      }
	    }, {
	      name: 'computeStyles',
	      options: {
	        adaptive: !moveTransition
	      }
	    }, tippyModifier];

	    if (getIsDefaultRenderFn() && arrow) {
	      modifiers.push({
	        name: 'arrow',
	        options: {
	          element: arrow,
	          padding: 3
	        }
	      });
	    }

	    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
	    instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
	      placement: placement,
	      onFirstUpdate: onFirstUpdate,
	      modifiers: modifiers
	    }));
	  }

	  function destroyPopperInstance() {
	    if (instance.popperInstance) {
	      instance.popperInstance.destroy();
	      instance.popperInstance = null;
	    }
	  }

	  function mount() {
	    var appendTo = instance.props.appendTo;
	    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
	    // it's directly after the reference element so the elements inside the
	    // tippy can be tabbed to
	    // If there are clipping issues, the user can specify a different appendTo
	    // and ensure focus management is handled correctly manually

	    var node = getCurrentTarget();

	    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
	      parentNode = node.parentNode;
	    } else {
	      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
	    } // The popper element needs to exist on the DOM before its position can be
	    // updated as Popper needs to read its dimensions


	    if (!parentNode.contains(popper)) {
	      parentNode.appendChild(popper);
	    }

	    instance.state.isMounted = true;
	    createPopperInstance();
	    /* istanbul ignore else */

	    if (process.env.NODE_ENV !== "production") {
	      // Accessibility check
	      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
	    }
	  }

	  function getNestedPopperTree() {
	    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
	  }

	  function scheduleShow(event) {
	    instance.clearDelayTimeouts();

	    if (event) {
	      invokeHook('onTrigger', [instance, event]);
	    }

	    addDocumentPress();
	    var delay = getDelay(true);

	    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
	        touchValue = _getNormalizedTouchSe[0],
	        touchDelay = _getNormalizedTouchSe[1];

	    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
	      delay = touchDelay;
	    }

	    if (delay) {
	      showTimeout = setTimeout(function () {
	        instance.show();
	      }, delay);
	    } else {
	      instance.show();
	    }
	  }

	  function scheduleHide(event) {
	    instance.clearDelayTimeouts();
	    invokeHook('onUntrigger', [instance, event]);

	    if (!instance.state.isVisible) {
	      removeDocumentPress();
	      return;
	    } // For interactive tippies, scheduleHide is added to a document.body handler
	    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
	    // events when trigger contains mouseenter and click, and the tip is
	    // currently shown as a result of a click.


	    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
	      return;
	    }

	    var delay = getDelay(false);

	    if (delay) {
	      hideTimeout = setTimeout(function () {
	        if (instance.state.isVisible) {
	          instance.hide();
	        }
	      }, delay);
	    } else {
	      // Fixes a `transitionend` problem when it fires 1 frame too
	      // late sometimes, we don't want hide() to be called.
	      scheduleHideAnimationFrame = requestAnimationFrame(function () {
	        instance.hide();
	      });
	    }
	  } // ===========================================================================
	  // 🔑 Public methods
	  // ===========================================================================


	  function enable() {
	    instance.state.isEnabled = true;
	  }

	  function disable() {
	    // Disabling the instance should also hide it
	    // https://github.com/atomiks/tippy.js-react/issues/106
	    instance.hide();
	    instance.state.isEnabled = false;
	  }

	  function clearDelayTimeouts() {
	    clearTimeout(showTimeout);
	    clearTimeout(hideTimeout);
	    cancelAnimationFrame(scheduleHideAnimationFrame);
	  }

	  function setProps(partialProps) {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
	    }

	    if (instance.state.isDestroyed) {
	      return;
	    }

	    invokeHook('onBeforeUpdate', [instance, partialProps]);
	    removeListeners();
	    var prevProps = instance.props;
	    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
	      ignoreAttributes: true
	    }));
	    instance.props = nextProps;
	    addListeners();

	    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
	      cleanupInteractiveMouseListeners();
	      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
	    } // Ensure stale aria-expanded attributes are removed


	    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
	      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
	        node.removeAttribute('aria-expanded');
	      });
	    } else if (nextProps.triggerTarget) {
	      reference.removeAttribute('aria-expanded');
	    }

	    handleAriaExpandedAttribute();
	    handleStyles();

	    if (onUpdate) {
	      onUpdate(prevProps, nextProps);
	    }

	    if (instance.popperInstance) {
	      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
	      // and the nested ones get re-rendered first.
	      // https://github.com/atomiks/tippyjs-react/issues/177
	      // TODO: find a cleaner / more efficient solution(!)

	      getNestedPopperTree().forEach(function (nestedPopper) {
	        // React (and other UI libs likely) requires a rAF wrapper as it flushes
	        // its work in one
	        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
	      });
	    }

	    invokeHook('onAfterUpdate', [instance, partialProps]);
	  }

	  function setContent(content) {
	    instance.setProps({
	      content: content
	    });
	  }

	  function show() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
	    } // Early bail-out


	    var isAlreadyVisible = instance.state.isVisible;
	    var isDestroyed = instance.state.isDestroyed;
	    var isDisabled = !instance.state.isEnabled;
	    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
	    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

	    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
	      return;
	    } // Normalize `disabled` behavior across browsers.
	    // Firefox allows events on disabled elements, but Chrome doesn't.
	    // Using a wrapper element (i.e. <span>) is recommended.


	    if (getCurrentTarget().hasAttribute('disabled')) {
	      return;
	    }

	    invokeHook('onShow', [instance], false);

	    if (instance.props.onShow(instance) === false) {
	      return;
	    }

	    instance.state.isVisible = true;

	    if (getIsDefaultRenderFn()) {
	      popper.style.visibility = 'visible';
	    }

	    handleStyles();
	    addDocumentPress();

	    if (!instance.state.isMounted) {
	      popper.style.transition = 'none';
	    } // If flipping to the opposite side after hiding at least once, the
	    // animation will use the wrong placement without resetting the duration


	    if (getIsDefaultRenderFn()) {
	      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
	          box = _getDefaultTemplateCh2.box,
	          content = _getDefaultTemplateCh2.content;

	      setTransitionDuration([box, content], 0);
	    }

	    onFirstUpdate = function onFirstUpdate() {
	      var _instance$popperInsta2;

	      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
	        return;
	      }

	      ignoreOnFirstUpdate = true; // reflow

	      void popper.offsetHeight;
	      popper.style.transition = instance.props.moveTransition;

	      if (getIsDefaultRenderFn() && instance.props.animation) {
	        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
	            _box = _getDefaultTemplateCh3.box,
	            _content = _getDefaultTemplateCh3.content;

	        setTransitionDuration([_box, _content], duration);
	        setVisibilityState([_box, _content], 'visible');
	      }

	      handleAriaContentAttribute();
	      handleAriaExpandedAttribute();
	      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
	      // popper has been positioned for the first time

	      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
	      invokeHook('onMount', [instance]);

	      if (instance.props.animation && getIsDefaultRenderFn()) {
	        onTransitionedIn(duration, function () {
	          instance.state.isShown = true;
	          invokeHook('onShown', [instance]);
	        });
	      }
	    };

	    mount();
	  }

	  function hide() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
	    } // Early bail-out


	    var isAlreadyHidden = !instance.state.isVisible;
	    var isDestroyed = instance.state.isDestroyed;
	    var isDisabled = !instance.state.isEnabled;
	    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

	    if (isAlreadyHidden || isDestroyed || isDisabled) {
	      return;
	    }

	    invokeHook('onHide', [instance], false);

	    if (instance.props.onHide(instance) === false) {
	      return;
	    }

	    instance.state.isVisible = false;
	    instance.state.isShown = false;
	    ignoreOnFirstUpdate = false;
	    isVisibleFromClick = false;

	    if (getIsDefaultRenderFn()) {
	      popper.style.visibility = 'hidden';
	    }

	    cleanupInteractiveMouseListeners();
	    removeDocumentPress();
	    handleStyles(true);

	    if (getIsDefaultRenderFn()) {
	      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
	          box = _getDefaultTemplateCh4.box,
	          content = _getDefaultTemplateCh4.content;

	      if (instance.props.animation) {
	        setTransitionDuration([box, content], duration);
	        setVisibilityState([box, content], 'hidden');
	      }
	    }

	    handleAriaContentAttribute();
	    handleAriaExpandedAttribute();

	    if (instance.props.animation) {
	      if (getIsDefaultRenderFn()) {
	        onTransitionedOut(duration, instance.unmount);
	      }
	    } else {
	      instance.unmount();
	    }
	  }

	  function hideWithInteractivity(event) {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
	    }

	    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
	    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
	    debouncedOnMouseMove(event);
	  }

	  function unmount() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
	    }

	    if (instance.state.isVisible) {
	      instance.hide();
	    }

	    if (!instance.state.isMounted) {
	      return;
	    }

	    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
	    // tree by default. This seems mainly for interactive tippies, but we should
	    // find a workaround if possible

	    getNestedPopperTree().forEach(function (nestedPopper) {
	      nestedPopper._tippy.unmount();
	    });

	    if (popper.parentNode) {
	      popper.parentNode.removeChild(popper);
	    }

	    mountedInstances = mountedInstances.filter(function (i) {
	      return i !== instance;
	    });
	    instance.state.isMounted = false;
	    invokeHook('onHidden', [instance]);
	  }

	  function destroy() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
	    }

	    if (instance.state.isDestroyed) {
	      return;
	    }

	    instance.clearDelayTimeouts();
	    instance.unmount();
	    removeListeners();
	    delete reference._tippy;
	    instance.state.isDestroyed = true;
	    invokeHook('onDestroy', [instance]);
	  }
	}

	function tippy(targets, optionalProps) {
	  if (optionalProps === void 0) {
	    optionalProps = {};
	  }

	  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
	  /* istanbul ignore else */

	  if (process.env.NODE_ENV !== "production") {
	    validateTargets(targets);
	    validateProps(optionalProps, plugins);
	  }

	  bindGlobalEventListeners();
	  var passedProps = Object.assign({}, optionalProps, {
	    plugins: plugins
	  });
	  var elements = getArrayOfElements(targets);
	  /* istanbul ignore else */

	  if (process.env.NODE_ENV !== "production") {
	    var isSingleContentElement = isElement(passedProps.content);
	    var isMoreThanOneReferenceElement = elements.length > 1;
	    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
	  }

	  var instances = elements.reduce(function (acc, reference) {
	    var instance = reference && createTippy(reference, passedProps);

	    if (instance) {
	      acc.push(instance);
	    }

	    return acc;
	  }, []);
	  return isElement(targets) ? instances[0] : instances;
	}

	tippy.defaultProps = defaultProps;
	tippy.setDefaultProps = setDefaultProps;
	tippy.currentInput = currentInput;

	// every time the popper is destroyed (i.e. a new target), removing the styles
	// and causing transitions to break for singletons when the console is open, but
	// most notably for non-transform styles being used, `gpuAcceleration: false`.

	Object.assign({}, applyStyles$1, {
	  effect: function effect(_ref) {
	    var state = _ref.state;
	    var initialStyles = {
	      popper: {
	        position: state.options.strategy,
	        left: '0',
	        top: '0',
	        margin: '0'
	      },
	      arrow: {
	        position: 'absolute'
	      },
	      reference: {}
	    };
	    Object.assign(state.elements.popper.style, initialStyles.popper);
	    state.styles = initialStyles;

	    if (state.elements.arrow) {
	      Object.assign(state.elements.arrow.style, initialStyles.arrow);
	    } // intentionally return no cleanup function
	    // return () => { ... }

	  }
	});

	var mouseCoords = {
	  clientX: 0,
	  clientY: 0
	};
	var activeInstances = [];

	function storeMouseCoords(_ref) {
	  var clientX = _ref.clientX,
	      clientY = _ref.clientY;
	  mouseCoords = {
	    clientX: clientX,
	    clientY: clientY
	  };
	}

	function addMouseCoordsListener(doc) {
	  doc.addEventListener('mousemove', storeMouseCoords);
	}

	function removeMouseCoordsListener(doc) {
	  doc.removeEventListener('mousemove', storeMouseCoords);
	}

	var followCursor = {
	  name: 'followCursor',
	  defaultValue: false,
	  fn: function fn(instance) {
	    var reference = instance.reference;
	    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
	    var isInternalUpdate = false;
	    var wasFocusEvent = false;
	    var isUnmounted = true;
	    var prevProps = instance.props;

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
	      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
	      var followCursor = instance.props.followCursor;
	      var clientX = event.clientX,
	          clientY = event.clientY;
	      var rect = reference.getBoundingClientRect();
	      var relativeX = clientX - rect.left;
	      var relativeY = clientY - rect.top;

	      if (isCursorOverReference || !instance.props.interactive) {
	        instance.setProps({
	          // @ts-ignore - unneeded DOMRect properties
	          getReferenceClientRect: function getReferenceClientRect() {
	            var rect = reference.getBoundingClientRect();
	            var x = clientX;
	            var y = clientY;

	            if (followCursor === 'initial') {
	              x = rect.left + relativeX;
	              y = rect.top + relativeY;
	            }

	            var top = followCursor === 'horizontal' ? rect.top : y;
	            var right = followCursor === 'vertical' ? rect.right : x;
	            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
	            var left = followCursor === 'vertical' ? rect.left : x;
	            return {
	              width: right - left,
	              height: bottom - top,
	              top: top,
	              right: right,
	              bottom: bottom,
	              left: left
	            };
	          }
	        });
	      }
	    }

	    function create() {
	      if (instance.props.followCursor) {
	        activeInstances.push({
	          instance: instance,
	          doc: doc
	        });
	        addMouseCoordsListener(doc);
	      }
	    }

	    function destroy() {
	      activeInstances = activeInstances.filter(function (data) {
	        return data.instance !== instance;
	      });

	      if (activeInstances.filter(function (data) {
	        return data.doc === doc;
	      }).length === 0) {
	        removeMouseCoordsListener(doc);
	      }
	    }

	    return {
	      onCreate: create,
	      onDestroy: destroy,
	      onBeforeUpdate: function onBeforeUpdate() {
	        prevProps = instance.props;
	      },
	      onAfterUpdate: function onAfterUpdate(_, _ref2) {
	        var followCursor = _ref2.followCursor;

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
	      onMount: function onMount() {
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
	      onTrigger: function onTrigger(_, event) {
	        if (isMouseEvent(event)) {
	          mouseCoords = {
	            clientX: event.clientX,
	            clientY: event.clientY
	          };
	        }

	        wasFocusEvent = event.type === 'focus';
	      },
	      onHidden: function onHidden() {
	        if (instance.props.followCursor) {
	          unsetGetReferenceClientRect();
	          removeListener();
	          isUnmounted = true;
	        }
	      }
	    };
	  }
	};

	tippy.setDefaultProps({
	  render: render
	});

	function updateClassName(box, action, classNames) {
	  classNames.split(/\s+/).forEach(name => {
	    if (name) {
	      box.classList[action](name);
	    }
	  });
	}

	const classNamePlugin = {
	  name: 'className',
	  defaultValue: '',

	  fn(instance) {
	    const box = instance.popper.firstElementChild;

	    const isDefaultRenderFn = () => {
	      var _instance$props$rende;

	      return !!((_instance$props$rende = instance.props.render) !== null && _instance$props$rende !== void 0 && _instance$props$rende.$$tippy);
	    };

	    function add() {
	      if (instance.props.className && !isDefaultRenderFn()) {
	        if (process.env.NODE_ENV !== 'production') {
	          console.warn(['Cannot use `className` prop in conjunction with', '`render` prop. Place the className on the element you are', 'rendering.'].join(' '));
	        }

	        return;
	      }

	      updateClassName(box, 'add', instance.props.className);
	    }

	    function remove() {
	      if (isDefaultRenderFn()) {
	        updateClassName(box, 'remove', instance.props.className);
	      }
	    }

	    return {
	      onCreate: add,
	      onBeforeUpdate: remove,
	      onAfterUpdate: add
	    };
	  }

	};

	const appendClassName = (container, selector, className) => {
	  const target = container.querySelector(selector);

	  if (target) {
	    target.classList.add(className);
	  }
	};

	const prefixClassNamePlugin = {
	  name: "prefixClassName",
	  defaultValue: "",

	  fn(instance) {
	    return {
	      onCreate(instance) {
	        const box = instance.popper.firstElementChild;
	        const prefixCls = instance.props.prefixClassName || "ft-popover";

	        if (box) {
	          box.classList.add(prefixCls);
	          appendClassName(box, ".tippy-content", `${prefixCls}-content`);
	          appendClassName(box, ".tippy-arrow", `${prefixCls}-arrow`);
	          appendClassName(box, ".tippy-backdrop", `${prefixCls}-backdrop`);
	        }
	      }

	    };
	  }

	};

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var tooltip = function tooltip(el, props) {
	  var extendedProps = function (_ref) {
	    var className = _ref.className,
	        theme = _ref.theme,
	        plugins = _ref.plugins,
	        rest = _objectWithoutProperties(_ref, ["className", "theme", "plugins"]);

	    return _objectSpread({
	      className: [className, theme && "is-".concat(theme)].filter(Boolean).join(" "),
	      plugins: [prefixClassNamePlugin, classNamePlugin].concat(_toConsumableArray(plugins || [])),
	      prefixClassName: "ft-tooltip"
	    }, rest);
	  }(props);

	  return tippy(el, extendedProps);
	};
	var hoverTitle = function hoverTitle(el, props) {
	  var extendedProps = function (_ref2) {
	    var offset = _ref2.offset,
	        rest = _objectWithoutProperties(_ref2, ["offset"]);

	    return _objectSpread({
	      offset: Array.isArray(offset) && offset.length >= 2 ? [offset[1], offset[0]] : [10, 12]
	    }, rest);
	  }(props);

	  return tippy(el, _objectSpread(_objectSpread({}, extendedProps), {}, {
	    plugins: [prefixClassNamePlugin, classNamePlugin, followCursor],
	    prefixClassName: "ft-hover-title",
	    followCursor: true,
	    placement: "right-start",
	    arrow: false,
	    animation: false
	  }));
	};

	exports.hoverTitle = hoverTitle;
	exports.tooltip = tooltip;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
