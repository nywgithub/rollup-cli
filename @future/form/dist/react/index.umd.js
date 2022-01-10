(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.future = global.future || {}, global.React));
}(this, (function (exports, React) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var isArray$1 = Array.isArray;
	var keyList = Object.keys;
	var hasProp = Object.prototype.hasOwnProperty;
	var hasElementType = typeof Element !== 'undefined';

	function equal(a, b) {
	  // fast-deep-equal index.js 2.0.1
	  if (a === b) return true;

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    var arrA = isArray$1(a)
	      , arrB = isArray$1(b)
	      , i
	      , length
	      , key;

	    if (arrA && arrB) {
	      length = a.length;
	      if (length != b.length) return false;
	      for (i = length; i-- !== 0;)
	        if (!equal(a[i], b[i])) return false;
	      return true;
	    }

	    if (arrA != arrB) return false;

	    var dateA = a instanceof Date
	      , dateB = b instanceof Date;
	    if (dateA != dateB) return false;
	    if (dateA && dateB) return a.getTime() == b.getTime();

	    var regexpA = a instanceof RegExp
	      , regexpB = b instanceof RegExp;
	    if (regexpA != regexpB) return false;
	    if (regexpA && regexpB) return a.toString() == b.toString();

	    var keys = keyList(a);
	    length = keys.length;

	    if (length !== keyList(b).length)
	      return false;

	    for (i = length; i-- !== 0;)
	      if (!hasProp.call(b, keys[i])) return false;
	    // end fast-deep-equal

	    // start react-fast-compare
	    // custom handling for DOM elements
	    if (hasElementType && a instanceof Element && b instanceof Element)
	      return a === b;

	    // custom handling for React
	    for (i = length; i-- !== 0;) {
	      key = keys[i];
	      if (key === '_owner' && a.$$typeof) {
	        // React-specific: avoid traversing React elements' _owner.
	        //  _owner contains circular references
	        // and is not needed when comparing the actual elements (and not their owners)
	        // .$$typeof and ._store on just reasonable markers of a react element
	        continue;
	      } else {
	        // all other properties should be traversed as usual
	        if (!equal(a[key], b[key])) return false;
	      }
	    }
	    // end react-fast-compare

	    // fast-deep-equal index.js 2.0.1
	    return true;
	  }

	  return a !== a && b !== b;
	}
	// end fast-deep-equal

	var reactFastCompare = function exportedEqual(a, b) {
	  try {
	    return equal(a, b);
	  } catch (error) {
	    if ((error.message && error.message.match(/stack|recursion/i)) || (error.number === -2146828260)) {
	      // warn on circular references, don't crash
	      // browsers give this different errors name and messages:
	      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
	      // firefox: "InternalError", too much recursion"
	      // edge: "Error", "Out of stack space"
	      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
	      return false;
	    }
	    // some other error. we should definitely know about these
	    throw error;
	  }
	};

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			Object.keys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		Object.keys(source).forEach(function(key) {
			if (!options.isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			} else {
				destination[key] = deepmerge(target[key], source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Built-in value references. */
	var Symbol$2 = root.Symbol;

	/** Used for built-in method references. */
	var objectProto$d = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$b = objectProto$d.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$d.toString;

	/** Built-in value references. */
	var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto$c.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	/** `Object#toString` result references. */
	var objectTag$3 = '[object Object]';

	/** Used for built-in method references. */
	var funcProto$2 = Function.prototype,
	    objectProto$b = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$2 = funcProto$2.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$a = objectProto$b.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString$2.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$a.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString$2.call(Ctor) == objectCtorString;
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$9(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag$2 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$1(value) {
	  if (!isObject$9(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
	}

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString$1.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto$a = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject$9(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED$1 ? undefined : result;
	  }
	  return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
	}

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
	}

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	var defineProperty$2 = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty$2) {
	    defineProperty$2(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
	}

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
	    !propertyIsEnumerable$1.call(value, 'callee');
	};

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	/** Detect free variable `exports`. */
	var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

	/** Built-in value references. */
	var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    boolTag$2 = '[object Boolean]',
	    dateTag$2 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag$4 = '[object Map]',
	    numberTag$2 = '[object Number]',
	    objectTag$2 = '[object Object]',
	    regexpTag$2 = '[object RegExp]',
	    setTag$4 = '[object Set]',
	    stringTag$2 = '[object String]',
	    weakMapTag$2 = '[object WeakMap]';

	var arrayBufferTag$2 = '[object ArrayBuffer]',
	    dataViewTag$3 = '[object DataView]',
	    float32Tag$2 = '[object Float32Array]',
	    float64Tag$2 = '[object Float64Array]',
	    int8Tag$2 = '[object Int8Array]',
	    int16Tag$2 = '[object Int16Array]',
	    int32Tag$2 = '[object Int32Array]',
	    uint8Tag$2 = '[object Uint8Array]',
	    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	    uint16Tag$2 = '[object Uint16Array]',
	    uint32Tag$2 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
	typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
	typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
	typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
	typedArrayTags[uint32Tag$2] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
	typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
	typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
	typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
	typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
	typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
	typedArrayTags[weakMapTag$2] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	/** Detect free variable `exports`. */
	var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports$1 && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$4.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

	  return value === proto;
	}

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction$1(value);
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys$1(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys$1(source), object);
	}

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$2 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject$9(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys$1, getSymbols);
	}

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	/* Built-in method references that are verified to be native. */
	var Promise$2 = getNative(root, 'Promise');

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	/* Built-in method references that are verified to be native. */
	var WeakMap$3 = getNative(root, 'WeakMap');

	/** `Object#toString` result references. */
	var mapTag$3 = '[object Map]',
	    objectTag$1 = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag$3 = '[object Set]',
	    weakMapTag$1 = '[object WeakMap]';

	var dataViewTag$2 = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise$2),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap$3);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
	    (Map && getTag(new Map) != mapTag$3) ||
	    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag$3) ||
	    (WeakMap$3 && getTag(new WeakMap$3) != weakMapTag$1)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag$1 ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag$2;
	        case mapCtorString: return mapTag$3;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag$3;
	        case weakMapCtorString: return weakMapTag$1;
	      }
	    }
	    return result;
	  };
	}

	var getTag$1 = getTag;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	/** Used to convert symbols to primitives and strings. */
	var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
	    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/** `Object#toString` result references. */
	var boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag$2 = '[object Symbol]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$1 = '[object DataView]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag$1:
	      return cloneArrayBuffer(object);

	    case boolTag$1:
	    case dateTag$1:
	      return new Ctor(+object);

	    case dataViewTag$1:
	      return cloneDataView(object, isDeep);

	    case float32Tag$1: case float64Tag$1:
	    case int8Tag$1: case int16Tag$1: case int32Tag$1:
	    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
	      return cloneTypedArray(object, isDeep);

	    case mapTag$2:
	      return new Ctor;

	    case numberTag$1:
	    case stringTag$1:
	      return new Ctor(object);

	    case regexpTag$1:
	      return cloneRegExp(object);

	    case setTag$2:
	      return new Ctor;

	    case symbolTag$2:
	      return cloneSymbol(object);
	  }
	}

	/** Built-in value references. */
	var objectCreate$1 = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject$9(proto)) {
	      return {};
	    }
	    if (objectCreate$1) {
	      return objectCreate$1(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	/** `Object#toString` result references. */
	var mapTag$1 = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike(value) && getTag$1(value) == mapTag$1;
	}

	/* Node.js helper references. */
	var nodeIsMap = nodeUtil && nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

	/** `Object#toString` result references. */
	var setTag$1 = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike(value) && getTag$1(value) == setTag$1;
	}

	/* Node.js helper references. */
	var nodeIsSet = nodeUtil && nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG$1 = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG$2 = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag$1 = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag$1] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG$1,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG$2;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject$9(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag$1(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });
	  }

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys$1);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	/** Used to compose bitmasks for cloning. */
	var CLONE_SYMBOLS_FLAG$1 = 4;

	/**
	 * Creates a shallow clone of `value`.
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	 * and supports cloning arrays, array buffers, booleans, date objects, maps,
	 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	 * arrays. The own enumerable properties of `arguments` objects are cloned
	 * as plain objects. An empty object is returned for uncloneable values such
	 * as error objects, functions, DOM nodes, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @returns {*} Returns the cloned value.
	 * @see _.cloneDeep
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var shallow = _.clone(objects);
	 * console.log(shallow[0] === objects[0]);
	 * // => true
	 */
	function clone(value) {
	  return baseClone(value, CLONE_SYMBOLS_FLAG$1);
	}

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (string.charCodeAt(0) === 46 /* . */) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	/** Used as references for various `Number` constants. */
	var INFINITY$1 = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
	}

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString$1(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Converts `value` to a property path array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Util
	 * @param {*} value The value to convert.
	 * @returns {Array} Returns the new property path array.
	 * @example
	 *
	 * _.toPath('a.b.c');
	 * // => ['a', 'b', 'c']
	 *
	 * _.toPath('a[0].b.c');
	 * // => ['a', '0', 'b', 'c']
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return arrayMap(value, toKey);
	  }
	  return isSymbol(value) ? [value] : copyArray(stringToPath(toString$1(value)));
	}

	var isProduction = process.env.NODE_ENV === 'production';
	function warning(condition, message) {
	  if (!isProduction) {
	    if (condition) {
	      return;
	    }

	    var text = "Warning: " + message;

	    if (typeof console !== 'undefined') {
	      console.warn(text);
	    }

	    try {
	      throw Error(text);
	    } catch (x) {}
	  }
	}

	var reactIs$1 = {exports: {}};

	var reactIs_production_min = {};

	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
	reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
	reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;

	var reactIs_development = {};

	/** @license React v16.13.1
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */



	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development.AsyncMode = AsyncMode;
	reactIs_development.ConcurrentMode = ConcurrentMode;
	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}

	if (process.env.NODE_ENV === 'production') {
	  reactIs$1.exports = reactIs_production_min;
	} else {
	  reactIs$1.exports = reactIs_development;
	}

	var reactIs = reactIs$1.exports;

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	var REACT_STATICS = {
	  childContextTypes: true,
	  contextType: true,
	  contextTypes: true,
	  defaultProps: true,
	  displayName: true,
	  getDefaultProps: true,
	  getDerivedStateFromError: true,
	  getDerivedStateFromProps: true,
	  mixins: true,
	  propTypes: true,
	  type: true
	};
	var KNOWN_STATICS = {
	  name: true,
	  length: true,
	  prototype: true,
	  caller: true,
	  callee: true,
	  arguments: true,
	  arity: true
	};
	var FORWARD_REF_STATICS = {
	  '$$typeof': true,
	  render: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true
	};
	var MEMO_STATICS = {
	  '$$typeof': true,
	  compare: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true,
	  type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

	function getStatics(component) {
	  // React v16.11 and below
	  if (reactIs.isMemo(component)) {
	    return MEMO_STATICS;
	  } // React v16.12 and above


	  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
	}

	var defineProperty$1 = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;
	var getPrototypeOf$2 = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	  if (typeof sourceComponent !== 'string') {
	    // don't hoist over string (html) components
	    if (objectPrototype) {
	      var inheritedComponent = getPrototypeOf$2(sourceComponent);

	      if (inheritedComponent && inheritedComponent !== objectPrototype) {
	        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	      }
	    }

	    var keys = getOwnPropertyNames(sourceComponent);

	    if (getOwnPropertySymbols) {
	      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
	    }

	    var targetStatics = getStatics(targetComponent);
	    var sourceStatics = getStatics(sourceComponent);

	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i];

	      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
	        var descriptor = getOwnPropertyDescriptor$3(sourceComponent, key);

	        try {
	          // Avoid failures from read-only properties
	          defineProperty$1(targetComponent, key, descriptor);
	        } catch (e) {}
	      }
	    }
	  }

	  return targetComponent;
	}

	var hoistNonReactStatics_cjs = hoistNonReactStatics;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	function _extends$1() {
	  _extends$1 = Object.assign || function (target) {
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

	  return _extends$1.apply(this, arguments);
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	function _objectWithoutPropertiesLoose$1(source, excluded) {
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

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	/** @private is the value an empty array? */

	var isEmptyArray = function isEmptyArray(value) {
	  return Array.isArray(value) && value.length === 0;
	};
	/** @private is the given object a Function? */

	var isFunction = function isFunction(obj) {
	  return typeof obj === 'function';
	};
	/** @private is the given object an Object? */

	var isObject$8 = function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	};
	/** @private is the given object an integer? */

	var isInteger = function isInteger(obj) {
	  return String(Math.floor(Number(obj))) === obj;
	};
	/** @private is the given object a string? */

	var isString = function isString(obj) {
	  return Object.prototype.toString.call(obj) === '[object String]';
	};
	/** @private Does a React component have exactly 0 children? */

	var isEmptyChildren = function isEmptyChildren(children) {
	  return React.Children.count(children) === 0;
	};
	/** @private is the given object/value a promise? */

	var isPromise = function isPromise(value) {
	  return isObject$8(value) && isFunction(value.then);
	};
	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 *
	 * @param {?Document} doc Defaults to current document.
	 * @return {Element | null}
	 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/dom/getActiveElement.js
	 */

	function getActiveElement(doc) {
	  doc = doc || (typeof document !== 'undefined' ? document : undefined);

	  if (typeof doc === 'undefined') {
	    return null;
	  }

	  try {
	    return doc.activeElement || doc.body;
	  } catch (e) {
	    return doc.body;
	  }
	}
	/**
	 * Deeply get a value from an object via its path.
	 */

	function getIn(obj, key, def, p) {
	  if (p === void 0) {
	    p = 0;
	  }

	  var path = toPath(key);

	  while (obj && p < path.length) {
	    obj = obj[path[p++]];
	  }

	  return obj === undefined ? def : obj;
	}
	/**
	 * Deeply set a value from in object via it's path. If the value at `path`
	 * has changed, return a shallow copy of obj with `value` set at `path`.
	 * If `value` has not changed, return the original `obj`.
	 *
	 * Existing objects / arrays along `path` are also shallow copied. Sibling
	 * objects along path retain the same internal js reference. Since new
	 * objects / arrays are only created along `path`, we can test if anything
	 * changed in a nested structure by comparing the object's reference in
	 * the old and new object, similar to how russian doll cache invalidation
	 * works.
	 *
	 * In earlier versions of this function, which used cloneDeep, there were
	 * issues whereby settings a nested value would mutate the parent
	 * instead of creating a new object. `clone` avoids that bug making a
	 * shallow copy of the objects along the update path
	 * so no object is mutated in place.
	 *
	 * Before changing this function, please read through the following
	 * discussions.
	 *
	 * @see https://github.com/developit/linkstate
	 * @see https://github.com/jaredpalmer/formik/pull/123
	 */

	function setIn(obj, path, value) {
	  var res = clone(obj); // this keeps inheritance when obj is a class

	  var resVal = res;
	  var i = 0;
	  var pathArray = toPath(path);

	  for (; i < pathArray.length - 1; i++) {
	    var currentPath = pathArray[i];
	    var currentObj = getIn(obj, pathArray.slice(0, i + 1));

	    if (currentObj && (isObject$8(currentObj) || Array.isArray(currentObj))) {
	      resVal = resVal[currentPath] = clone(currentObj);
	    } else {
	      var nextPath = pathArray[i + 1];
	      resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
	    }
	  } // Return original object if new value is the same as current


	  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
	    return obj;
	  }

	  if (value === undefined) {
	    delete resVal[pathArray[i]];
	  } else {
	    resVal[pathArray[i]] = value;
	  } // If the path array has a single element, the loop did not run.
	  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.


	  if (i === 0 && value === undefined) {
	    delete res[pathArray[i]];
	  }

	  return res;
	}
	/**
	 * Recursively a set the same value for all keys and arrays nested object, cloning
	 * @param object
	 * @param value
	 * @param visited
	 * @param response
	 */

	function setNestedObjectValues(object, value, visited, response) {
	  if (visited === void 0) {
	    visited = new WeakMap();
	  }

	  if (response === void 0) {
	    response = {};
	  }

	  for (var _i = 0, _Object$keys = Object.keys(object); _i < _Object$keys.length; _i++) {
	    var k = _Object$keys[_i];
	    var val = object[k];

	    if (isObject$8(val)) {
	      if (!visited.get(val)) {
	        visited.set(val, true); // In order to keep array values consistent for both dot path  and
	        // bracket syntax, we need to check if this is an array so that
	        // this will output  { friends: [true] } and not { friends: { "0": true } }

	        response[k] = Array.isArray(val) ? [] : {};
	        setNestedObjectValues(val, value, visited, response[k]);
	      }
	    } else {
	      response[k] = value;
	    }
	  }

	  return response;
	}

	var FormikContext = /*#__PURE__*/React.createContext(undefined);
	FormikContext.displayName = 'FormikContext';
	var FormikProvider = FormikContext.Provider;
	var FormikConsumer = FormikContext.Consumer;
	function useFormikContext() {
	  var formik = React.useContext(FormikContext);
	  !!!formik ? process.env.NODE_ENV !== "production" ? warning(false, "Formik context is undefined, please verify you are calling useFormikContext() as child of a <Formik> component.") : warning(false) : void 0;
	  return formik;
	}

	function formikReducer(state, msg) {
	  switch (msg.type) {
	    case 'SET_VALUES':
	      return _extends$1({}, state, {
	        values: msg.payload
	      });

	    case 'SET_TOUCHED':
	      return _extends$1({}, state, {
	        touched: msg.payload
	      });

	    case 'SET_ERRORS':
	      if (reactFastCompare(state.errors, msg.payload)) {
	        return state;
	      }

	      return _extends$1({}, state, {
	        errors: msg.payload
	      });

	    case 'SET_STATUS':
	      return _extends$1({}, state, {
	        status: msg.payload
	      });

	    case 'SET_ISSUBMITTING':
	      return _extends$1({}, state, {
	        isSubmitting: msg.payload
	      });

	    case 'SET_ISVALIDATING':
	      return _extends$1({}, state, {
	        isValidating: msg.payload
	      });

	    case 'SET_FIELD_VALUE':
	      return _extends$1({}, state, {
	        values: setIn(state.values, msg.payload.field, msg.payload.value)
	      });

	    case 'SET_FIELD_TOUCHED':
	      return _extends$1({}, state, {
	        touched: setIn(state.touched, msg.payload.field, msg.payload.value)
	      });

	    case 'SET_FIELD_ERROR':
	      return _extends$1({}, state, {
	        errors: setIn(state.errors, msg.payload.field, msg.payload.value)
	      });

	    case 'RESET_FORM':
	      return _extends$1({}, state, msg.payload);

	    case 'SET_FORMIK_STATE':
	      return msg.payload(state);

	    case 'SUBMIT_ATTEMPT':
	      return _extends$1({}, state, {
	        touched: setNestedObjectValues(state.values, true),
	        isSubmitting: true,
	        submitCount: state.submitCount + 1
	      });

	    case 'SUBMIT_FAILURE':
	      return _extends$1({}, state, {
	        isSubmitting: false
	      });

	    case 'SUBMIT_SUCCESS':
	      return _extends$1({}, state, {
	        isSubmitting: false
	      });

	    default:
	      return state;
	  }
	} // Initial empty states // objects


	var emptyErrors = {};
	var emptyTouched = {};
	function useFormik(_ref) {
	  var _ref$validateOnChange = _ref.validateOnChange,
	      validateOnChange = _ref$validateOnChange === void 0 ? true : _ref$validateOnChange,
	      _ref$validateOnBlur = _ref.validateOnBlur,
	      validateOnBlur = _ref$validateOnBlur === void 0 ? true : _ref$validateOnBlur,
	      _ref$validateOnMount = _ref.validateOnMount,
	      validateOnMount = _ref$validateOnMount === void 0 ? false : _ref$validateOnMount,
	      isInitialValid = _ref.isInitialValid,
	      _ref$enableReinitiali = _ref.enableReinitialize,
	      enableReinitialize = _ref$enableReinitiali === void 0 ? false : _ref$enableReinitiali,
	      onSubmit = _ref.onSubmit,
	      rest = _objectWithoutPropertiesLoose$1(_ref, ["validateOnChange", "validateOnBlur", "validateOnMount", "isInitialValid", "enableReinitialize", "onSubmit"]);

	  var props = _extends$1({
	    validateOnChange: validateOnChange,
	    validateOnBlur: validateOnBlur,
	    validateOnMount: validateOnMount,
	    onSubmit: onSubmit
	  }, rest);

	  var initialValues = React.useRef(props.initialValues);
	  var initialErrors = React.useRef(props.initialErrors || emptyErrors);
	  var initialTouched = React.useRef(props.initialTouched || emptyTouched);
	  var initialStatus = React.useRef(props.initialStatus);
	  var isMounted = React.useRef(false);
	  var fieldRegistry = React.useRef({});

	  if (process.env.NODE_ENV !== "production") {
	    // eslint-disable-next-line react-hooks/rules-of-hooks
	    React.useEffect(function () {
	      !(typeof isInitialValid === 'undefined') ? process.env.NODE_ENV !== "production" ? warning(false, 'isInitialValid has been deprecated and will be removed in future versions of Formik. Please use initialErrors or validateOnMount instead.') : warning(false) : void 0; // eslint-disable-next-line
	    }, []);
	  }

	  React.useEffect(function () {
	    isMounted.current = true;
	    return function () {
	      isMounted.current = false;
	    };
	  }, []);

	  var _React$useReducer = React.useReducer(formikReducer, {
	    values: props.initialValues,
	    errors: props.initialErrors || emptyErrors,
	    touched: props.initialTouched || emptyTouched,
	    status: props.initialStatus,
	    isSubmitting: false,
	    isValidating: false,
	    submitCount: 0
	  }),
	      state = _React$useReducer[0],
	      dispatch = _React$useReducer[1];

	  var runValidateHandler = React.useCallback(function (values, field) {
	    return new Promise(function (resolve, reject) {
	      var maybePromisedErrors = props.validate(values, field);

	      if (maybePromisedErrors == null) {
	        // use loose null check here on purpose
	        resolve(emptyErrors);
	      } else if (isPromise(maybePromisedErrors)) {
	        maybePromisedErrors.then(function (errors) {
	          resolve(errors || emptyErrors);
	        }, function (actualException) {
	          if (process.env.NODE_ENV !== 'production') {
	            console.warn("Warning: An unhandled error was caught during validation in <Formik validate />", actualException);
	          }

	          reject(actualException);
	        });
	      } else {
	        resolve(maybePromisedErrors);
	      }
	    });
	  }, [props.validate]);
	  /**
	   * Run validation against a Yup schema and optionally run a function if successful
	   */

	  var runValidationSchema = React.useCallback(function (values, field) {
	    var validationSchema = props.validationSchema;
	    var schema = isFunction(validationSchema) ? validationSchema(field) : validationSchema;
	    var promise = field && schema.validateAt ? schema.validateAt(field, values) : validateYupSchema(values, schema);
	    return new Promise(function (resolve, reject) {
	      promise.then(function () {
	        resolve(emptyErrors);
	      }, function (err) {
	        // Yup will throw a validation error if validation fails. We catch those and
	        // resolve them into Formik errors. We can sniff if something is a Yup error
	        // by checking error.name.
	        // @see https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
	        if (err.name === 'ValidationError') {
	          resolve(yupToFormErrors(err));
	        } else {
	          // We throw any other errors
	          if (process.env.NODE_ENV !== 'production') {
	            console.warn("Warning: An unhandled error was caught during validation in <Formik validationSchema />", err);
	          }

	          reject(err);
	        }
	      });
	    });
	  }, [props.validationSchema]);
	  var runSingleFieldLevelValidation = React.useCallback(function (field, value) {
	    return new Promise(function (resolve) {
	      return resolve(fieldRegistry.current[field].validate(value));
	    });
	  }, []);
	  var runFieldLevelValidations = React.useCallback(function (values) {
	    var fieldKeysWithValidation = Object.keys(fieldRegistry.current).filter(function (f) {
	      return isFunction(fieldRegistry.current[f].validate);
	    }); // Construct an array with all of the field validation functions

	    var fieldValidations = fieldKeysWithValidation.length > 0 ? fieldKeysWithValidation.map(function (f) {
	      return runSingleFieldLevelValidation(f, getIn(values, f));
	    }) : [Promise.resolve('DO_NOT_DELETE_YOU_WILL_BE_FIRED')]; // use special case ;)

	    return Promise.all(fieldValidations).then(function (fieldErrorsList) {
	      return fieldErrorsList.reduce(function (prev, curr, index) {
	        if (curr === 'DO_NOT_DELETE_YOU_WILL_BE_FIRED') {
	          return prev;
	        }

	        if (curr) {
	          prev = setIn(prev, fieldKeysWithValidation[index], curr);
	        }

	        return prev;
	      }, {});
	    });
	  }, [runSingleFieldLevelValidation]); // Run all validations and return the result

	  var runAllValidations = React.useCallback(function (values) {
	    return Promise.all([runFieldLevelValidations(values), props.validationSchema ? runValidationSchema(values) : {}, props.validate ? runValidateHandler(values) : {}]).then(function (_ref2) {
	      var fieldErrors = _ref2[0],
	          schemaErrors = _ref2[1],
	          validateErrors = _ref2[2];
	      var combinedErrors = deepmerge_1.all([fieldErrors, schemaErrors, validateErrors], {
	        arrayMerge: arrayMerge
	      });
	      return combinedErrors;
	    });
	  }, [props.validate, props.validationSchema, runFieldLevelValidations, runValidateHandler, runValidationSchema]); // Run all validations methods and update state accordingly

	  var validateFormWithHighPriority = useEventCallback(function (values) {
	    if (values === void 0) {
	      values = state.values;
	    }

	    dispatch({
	      type: 'SET_ISVALIDATING',
	      payload: true
	    });
	    return runAllValidations(values).then(function (combinedErrors) {
	      if (!!isMounted.current) {
	        dispatch({
	          type: 'SET_ISVALIDATING',
	          payload: false
	        });
	        dispatch({
	          type: 'SET_ERRORS',
	          payload: combinedErrors
	        });
	      }

	      return combinedErrors;
	    });
	  });
	  React.useEffect(function () {
	    if (validateOnMount && isMounted.current === true && reactFastCompare(initialValues.current, props.initialValues)) {
	      validateFormWithHighPriority(initialValues.current);
	    }
	  }, [validateOnMount, validateFormWithHighPriority]);
	  var resetForm = React.useCallback(function (nextState) {
	    var values = nextState && nextState.values ? nextState.values : initialValues.current;
	    var errors = nextState && nextState.errors ? nextState.errors : initialErrors.current ? initialErrors.current : props.initialErrors || {};
	    var touched = nextState && nextState.touched ? nextState.touched : initialTouched.current ? initialTouched.current : props.initialTouched || {};
	    var status = nextState && nextState.status ? nextState.status : initialStatus.current ? initialStatus.current : props.initialStatus;
	    initialValues.current = values;
	    initialErrors.current = errors;
	    initialTouched.current = touched;
	    initialStatus.current = status;

	    var dispatchFn = function dispatchFn() {
	      dispatch({
	        type: 'RESET_FORM',
	        payload: {
	          isSubmitting: !!nextState && !!nextState.isSubmitting,
	          errors: errors,
	          touched: touched,
	          status: status,
	          values: values,
	          isValidating: !!nextState && !!nextState.isValidating,
	          submitCount: !!nextState && !!nextState.submitCount && typeof nextState.submitCount === 'number' ? nextState.submitCount : 0
	        }
	      });
	    };

	    if (props.onReset) {
	      var maybePromisedOnReset = props.onReset(state.values, imperativeMethods);

	      if (isPromise(maybePromisedOnReset)) {
	        maybePromisedOnReset.then(dispatchFn);
	      } else {
	        dispatchFn();
	      }
	    } else {
	      dispatchFn();
	    }
	  }, [props.initialErrors, props.initialStatus, props.initialTouched]);
	  React.useEffect(function () {
	    if (isMounted.current === true && !reactFastCompare(initialValues.current, props.initialValues)) {
	      if (enableReinitialize) {
	        initialValues.current = props.initialValues;
	        resetForm();
	      }

	      if (validateOnMount) {
	        validateFormWithHighPriority(initialValues.current);
	      }
	    }
	  }, [enableReinitialize, props.initialValues, resetForm, validateOnMount, validateFormWithHighPriority]);
	  React.useEffect(function () {
	    if (enableReinitialize && isMounted.current === true && !reactFastCompare(initialErrors.current, props.initialErrors)) {
	      initialErrors.current = props.initialErrors || emptyErrors;
	      dispatch({
	        type: 'SET_ERRORS',
	        payload: props.initialErrors || emptyErrors
	      });
	    }
	  }, [enableReinitialize, props.initialErrors]);
	  React.useEffect(function () {
	    if (enableReinitialize && isMounted.current === true && !reactFastCompare(initialTouched.current, props.initialTouched)) {
	      initialTouched.current = props.initialTouched || emptyTouched;
	      dispatch({
	        type: 'SET_TOUCHED',
	        payload: props.initialTouched || emptyTouched
	      });
	    }
	  }, [enableReinitialize, props.initialTouched]);
	  React.useEffect(function () {
	    if (enableReinitialize && isMounted.current === true && !reactFastCompare(initialStatus.current, props.initialStatus)) {
	      initialStatus.current = props.initialStatus;
	      dispatch({
	        type: 'SET_STATUS',
	        payload: props.initialStatus
	      });
	    }
	  }, [enableReinitialize, props.initialStatus, props.initialTouched]);
	  var validateField = useEventCallback(function (name) {
	    // This will efficiently validate a single field by avoiding state
	    // changes if the validation function is synchronous. It's different from
	    // what is called when using validateForm.
	    if (fieldRegistry.current[name] && isFunction(fieldRegistry.current[name].validate)) {
	      var value = getIn(state.values, name);
	      var maybePromise = fieldRegistry.current[name].validate(value);

	      if (isPromise(maybePromise)) {
	        // Only flip isValidating if the function is async.
	        dispatch({
	          type: 'SET_ISVALIDATING',
	          payload: true
	        });
	        return maybePromise.then(function (x) {
	          return x;
	        }).then(function (error) {
	          dispatch({
	            type: 'SET_FIELD_ERROR',
	            payload: {
	              field: name,
	              value: error
	            }
	          });
	          dispatch({
	            type: 'SET_ISVALIDATING',
	            payload: false
	          });
	        });
	      } else {
	        dispatch({
	          type: 'SET_FIELD_ERROR',
	          payload: {
	            field: name,
	            value: maybePromise
	          }
	        });
	        return Promise.resolve(maybePromise);
	      }
	    } else if (props.validationSchema) {
	      dispatch({
	        type: 'SET_ISVALIDATING',
	        payload: true
	      });
	      return runValidationSchema(state.values, name).then(function (x) {
	        return x;
	      }).then(function (error) {
	        dispatch({
	          type: 'SET_FIELD_ERROR',
	          payload: {
	            field: name,
	            value: error[name]
	          }
	        });
	        dispatch({
	          type: 'SET_ISVALIDATING',
	          payload: false
	        });
	      });
	    }

	    return Promise.resolve();
	  });
	  var registerField = React.useCallback(function (name, _ref3) {
	    var validate = _ref3.validate;
	    fieldRegistry.current[name] = {
	      validate: validate
	    };
	  }, []);
	  var unregisterField = React.useCallback(function (name) {
	    delete fieldRegistry.current[name];
	  }, []);
	  var setTouched = useEventCallback(function (touched, shouldValidate) {
	    dispatch({
	      type: 'SET_TOUCHED',
	      payload: touched
	    });
	    var willValidate = shouldValidate === undefined ? validateOnBlur : shouldValidate;
	    return willValidate ? validateFormWithHighPriority(state.values) : Promise.resolve();
	  });
	  var setErrors = React.useCallback(function (errors) {
	    dispatch({
	      type: 'SET_ERRORS',
	      payload: errors
	    });
	  }, []);
	  var setValues = useEventCallback(function (values, shouldValidate) {
	    var resolvedValues = isFunction(values) ? values(state.values) : values;
	    dispatch({
	      type: 'SET_VALUES',
	      payload: resolvedValues
	    });
	    var willValidate = shouldValidate === undefined ? validateOnChange : shouldValidate;
	    return willValidate ? validateFormWithHighPriority(resolvedValues) : Promise.resolve();
	  });
	  var setFieldError = React.useCallback(function (field, value) {
	    dispatch({
	      type: 'SET_FIELD_ERROR',
	      payload: {
	        field: field,
	        value: value
	      }
	    });
	  }, []);
	  var setFieldValue = useEventCallback(function (field, value, shouldValidate) {
	    dispatch({
	      type: 'SET_FIELD_VALUE',
	      payload: {
	        field: field,
	        value: value
	      }
	    });
	    var willValidate = shouldValidate === undefined ? validateOnChange : shouldValidate;
	    return willValidate ? validateFormWithHighPriority(setIn(state.values, field, value)) : Promise.resolve();
	  });
	  var executeChange = React.useCallback(function (eventOrTextValue, maybePath) {
	    // By default, assume that the first argument is a string. This allows us to use
	    // handleChange with React Native and React Native Web's onChangeText prop which
	    // provides just the value of the input.
	    var field = maybePath;
	    var val = eventOrTextValue;
	    var parsed; // If the first argument is not a string though, it has to be a synthetic React Event (or a fake one),
	    // so we handle like we would a normal HTML change event.

	    if (!isString(eventOrTextValue)) {
	      // If we can, persist the event
	      // @see https://reactjs.org/docs/events.html#event-pooling
	      if (eventOrTextValue.persist) {
	        eventOrTextValue.persist();
	      }

	      var target = eventOrTextValue.target ? eventOrTextValue.target : eventOrTextValue.currentTarget;
	      var type = target.type,
	          name = target.name,
	          id = target.id,
	          value = target.value,
	          checked = target.checked,
	          outerHTML = target.outerHTML,
	          options = target.options,
	          multiple = target.multiple;
	      field = maybePath ? maybePath : name ? name : id;

	      if (!field && process.env.NODE_ENV !== "production") {
	        warnAboutMissingIdentifier({
	          htmlContent: outerHTML,
	          documentationAnchorLink: 'handlechange-e-reactchangeeventany--void',
	          handlerName: 'handleChange'
	        });
	      }

	      val = /number|range/.test(type) ? (parsed = parseFloat(value), isNaN(parsed) ? '' : parsed) : /checkbox/.test(type) // checkboxes
	      ? getValueForCheckbox(getIn(state.values, field), checked, value) : options && multiple // <select multiple>
	      ? getSelectedValues(options) : value;
	    }

	    if (field) {
	      // Set form fields by name
	      setFieldValue(field, val);
	    }
	  }, [setFieldValue, state.values]);
	  var handleChange = useEventCallback(function (eventOrPath) {
	    if (isString(eventOrPath)) {
	      return function (event) {
	        return executeChange(event, eventOrPath);
	      };
	    } else {
	      executeChange(eventOrPath);
	    }
	  });
	  var setFieldTouched = useEventCallback(function (field, touched, shouldValidate) {
	    if (touched === void 0) {
	      touched = true;
	    }

	    dispatch({
	      type: 'SET_FIELD_TOUCHED',
	      payload: {
	        field: field,
	        value: touched
	      }
	    });
	    var willValidate = shouldValidate === undefined ? validateOnBlur : shouldValidate;
	    return willValidate ? validateFormWithHighPriority(state.values) : Promise.resolve();
	  });
	  var executeBlur = React.useCallback(function (e, path) {
	    if (e.persist) {
	      e.persist();
	    }

	    var _e$target = e.target,
	        name = _e$target.name,
	        id = _e$target.id,
	        outerHTML = _e$target.outerHTML;
	    var field = path ? path : name ? name : id;

	    if (!field && process.env.NODE_ENV !== "production") {
	      warnAboutMissingIdentifier({
	        htmlContent: outerHTML,
	        documentationAnchorLink: 'handleblur-e-any--void',
	        handlerName: 'handleBlur'
	      });
	    }

	    setFieldTouched(field, true);
	  }, [setFieldTouched]);
	  var handleBlur = useEventCallback(function (eventOrString) {
	    if (isString(eventOrString)) {
	      return function (event) {
	        return executeBlur(event, eventOrString);
	      };
	    } else {
	      executeBlur(eventOrString);
	    }
	  });
	  var setFormikState = React.useCallback(function (stateOrCb) {
	    if (isFunction(stateOrCb)) {
	      dispatch({
	        type: 'SET_FORMIK_STATE',
	        payload: stateOrCb
	      });
	    } else {
	      dispatch({
	        type: 'SET_FORMIK_STATE',
	        payload: function payload() {
	          return stateOrCb;
	        }
	      });
	    }
	  }, []);
	  var setStatus = React.useCallback(function (status) {
	    dispatch({
	      type: 'SET_STATUS',
	      payload: status
	    });
	  }, []);
	  var setSubmitting = React.useCallback(function (isSubmitting) {
	    dispatch({
	      type: 'SET_ISSUBMITTING',
	      payload: isSubmitting
	    });
	  }, []);
	  var submitForm = useEventCallback(function () {
	    dispatch({
	      type: 'SUBMIT_ATTEMPT'
	    });
	    return validateFormWithHighPriority().then(function (combinedErrors) {
	      // In case an error was thrown and passed to the resolved Promise,
	      // `combinedErrors` can be an instance of an Error. We need to check
	      // that and abort the submit.
	      // If we don't do that, calling `Object.keys(new Error())` yields an
	      // empty array, which causes the validation to pass and the form
	      // to be submitted.
	      var isInstanceOfError = combinedErrors instanceof Error;
	      var isActuallyValid = !isInstanceOfError && Object.keys(combinedErrors).length === 0;

	      if (isActuallyValid) {
	        // Proceed with submit...
	        //
	        // To respect sync submit fns, we can't simply wrap executeSubmit in a promise and
	        // _always_ dispatch SUBMIT_SUCCESS because isSubmitting would then always be false.
	        // This would be fine in simple cases, but make it impossible to disable submit
	        // buttons where people use callbacks or promises as side effects (which is basically
	        // all of v1 Formik code). Instead, recall that we are inside of a promise chain already,
	        //  so we can try/catch executeSubmit(), if it returns undefined, then just bail.
	        // If there are errors, throw em. Otherwise, wrap executeSubmit in a promise and handle
	        // cleanup of isSubmitting on behalf of the consumer.
	        var promiseOrUndefined;

	        try {
	          promiseOrUndefined = executeSubmit(); // Bail if it's sync, consumer is responsible for cleaning up
	          // via setSubmitting(false)

	          if (promiseOrUndefined === undefined) {
	            return;
	          }
	        } catch (error) {
	          throw error;
	        }

	        return Promise.resolve(promiseOrUndefined).then(function (result) {
	          if (!!isMounted.current) {
	            dispatch({
	              type: 'SUBMIT_SUCCESS'
	            });
	          }

	          return result;
	        })["catch"](function (_errors) {
	          if (!!isMounted.current) {
	            dispatch({
	              type: 'SUBMIT_FAILURE'
	            }); // This is a legit error rejected by the onSubmit fn
	            // so we don't want to break the promise chain

	            throw _errors;
	          }
	        });
	      } else if (!!isMounted.current) {
	        // ^^^ Make sure Formik is still mounted before updating state
	        dispatch({
	          type: 'SUBMIT_FAILURE'
	        }); // throw combinedErrors;

	        if (isInstanceOfError) {
	          throw combinedErrors;
	        }
	      }

	      return;
	    });
	  });
	  var handleSubmit = useEventCallback(function (e) {
	    if (e && e.preventDefault && isFunction(e.preventDefault)) {
	      e.preventDefault();
	    }

	    if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
	      e.stopPropagation();
	    } // Warn if form submission is triggered by a <button> without a
	    // specified `type` attribute during development. This mitigates
	    // a common gotcha in forms with both reset and submit buttons,
	    // where the dev forgets to add type="button" to the reset button.


	    if (process.env.NODE_ENV !== "production" && typeof document !== 'undefined') {
	      // Safely get the active element (works with IE)
	      var activeElement = getActiveElement();

	      if (activeElement !== null && activeElement instanceof HTMLButtonElement) {
	        !(activeElement.attributes && activeElement.attributes.getNamedItem('type')) ? process.env.NODE_ENV !== "production" ? warning(false, 'You submitted a Formik form using a button with an unspecified `type` attribute.  Most browsers default button elements to `type="submit"`. If this is not a submit button, please add `type="button"`.') : warning(false) : void 0;
	      }
	    }

	    submitForm()["catch"](function (reason) {
	      console.warn("Warning: An unhandled error was caught from submitForm()", reason);
	    });
	  });
	  var imperativeMethods = {
	    resetForm: resetForm,
	    validateForm: validateFormWithHighPriority,
	    validateField: validateField,
	    setErrors: setErrors,
	    setFieldError: setFieldError,
	    setFieldTouched: setFieldTouched,
	    setFieldValue: setFieldValue,
	    setStatus: setStatus,
	    setSubmitting: setSubmitting,
	    setTouched: setTouched,
	    setValues: setValues,
	    setFormikState: setFormikState,
	    submitForm: submitForm
	  };
	  var executeSubmit = useEventCallback(function () {
	    return onSubmit(state.values, imperativeMethods);
	  });
	  var handleReset = useEventCallback(function (e) {
	    if (e && e.preventDefault && isFunction(e.preventDefault)) {
	      e.preventDefault();
	    }

	    if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
	      e.stopPropagation();
	    }

	    resetForm();
	  });
	  var getFieldMeta = React.useCallback(function (name) {
	    return {
	      value: getIn(state.values, name),
	      error: getIn(state.errors, name),
	      touched: !!getIn(state.touched, name),
	      initialValue: getIn(initialValues.current, name),
	      initialTouched: !!getIn(initialTouched.current, name),
	      initialError: getIn(initialErrors.current, name)
	    };
	  }, [state.errors, state.touched, state.values]);
	  var getFieldHelpers = React.useCallback(function (name) {
	    return {
	      setValue: function setValue(value, shouldValidate) {
	        return setFieldValue(name, value, shouldValidate);
	      },
	      setTouched: function setTouched(value, shouldValidate) {
	        return setFieldTouched(name, value, shouldValidate);
	      },
	      setError: function setError(value) {
	        return setFieldError(name, value);
	      }
	    };
	  }, [setFieldValue, setFieldTouched, setFieldError]);
	  var getFieldProps = React.useCallback(function (nameOrOptions) {
	    var isAnObject = isObject$8(nameOrOptions);
	    var name = isAnObject ? nameOrOptions.name : nameOrOptions;
	    var valueState = getIn(state.values, name);
	    var field = {
	      name: name,
	      value: valueState,
	      onChange: handleChange,
	      onBlur: handleBlur
	    };

	    if (isAnObject) {
	      var type = nameOrOptions.type,
	          valueProp = nameOrOptions.value,
	          is = nameOrOptions.as,
	          multiple = nameOrOptions.multiple;

	      if (type === 'checkbox') {
	        if (valueProp === undefined) {
	          field.checked = !!valueState;
	        } else {
	          field.checked = !!(Array.isArray(valueState) && ~valueState.indexOf(valueProp));
	          field.value = valueProp;
	        }
	      } else if (type === 'radio') {
	        field.checked = valueState === valueProp;
	        field.value = valueProp;
	      } else if (is === 'select' && multiple) {
	        field.value = field.value || [];
	        field.multiple = true;
	      }
	    }

	    return field;
	  }, [handleBlur, handleChange, state.values]);
	  var dirty = React.useMemo(function () {
	    return !reactFastCompare(initialValues.current, state.values);
	  }, [initialValues.current, state.values]);
	  var isValid = React.useMemo(function () {
	    return typeof isInitialValid !== 'undefined' ? dirty ? state.errors && Object.keys(state.errors).length === 0 : isInitialValid !== false && isFunction(isInitialValid) ? isInitialValid(props) : isInitialValid : state.errors && Object.keys(state.errors).length === 0;
	  }, [isInitialValid, dirty, state.errors, props]);

	  var ctx = _extends$1({}, state, {
	    initialValues: initialValues.current,
	    initialErrors: initialErrors.current,
	    initialTouched: initialTouched.current,
	    initialStatus: initialStatus.current,
	    handleBlur: handleBlur,
	    handleChange: handleChange,
	    handleReset: handleReset,
	    handleSubmit: handleSubmit,
	    resetForm: resetForm,
	    setErrors: setErrors,
	    setFormikState: setFormikState,
	    setFieldTouched: setFieldTouched,
	    setFieldValue: setFieldValue,
	    setFieldError: setFieldError,
	    setStatus: setStatus,
	    setSubmitting: setSubmitting,
	    setTouched: setTouched,
	    setValues: setValues,
	    submitForm: submitForm,
	    validateForm: validateFormWithHighPriority,
	    validateField: validateField,
	    isValid: isValid,
	    dirty: dirty,
	    unregisterField: unregisterField,
	    registerField: registerField,
	    getFieldProps: getFieldProps,
	    getFieldMeta: getFieldMeta,
	    getFieldHelpers: getFieldHelpers,
	    validateOnBlur: validateOnBlur,
	    validateOnChange: validateOnChange,
	    validateOnMount: validateOnMount
	  });

	  return ctx;
	}
	function Formik(props) {
	  var formikbag = useFormik(props);
	  var component = props.component,
	      children = props.children,
	      render = props.render,
	      innerRef = props.innerRef; // This allows folks to pass a ref to <Formik />

	  React.useImperativeHandle(innerRef, function () {
	    return formikbag;
	  });

	  if (process.env.NODE_ENV !== "production") {
	    // eslint-disable-next-line react-hooks/rules-of-hooks
	    React.useEffect(function () {
	      !!props.render ? process.env.NODE_ENV !== "production" ? warning(false, "<Formik render> has been deprecated and will be removed in future versions of Formik. Please use a child callback function instead. To get rid of this warning, replace <Formik render={(props) => ...} /> with <Formik>{(props) => ...}</Formik>") : warning(false) : void 0; // eslint-disable-next-line
	    }, []);
	  }

	  return React.createElement(FormikProvider, {
	    value: formikbag
	  }, component ? React.createElement(component, formikbag) : render ? render(formikbag) : children // children come last, always called
	  ? isFunction(children) ? children(formikbag) : !isEmptyChildren(children) ? React.Children.only(children) : null : null);
	}

	function warnAboutMissingIdentifier(_ref4) {
	  var htmlContent = _ref4.htmlContent,
	      documentationAnchorLink = _ref4.documentationAnchorLink,
	      handlerName = _ref4.handlerName;
	  console.warn("Warning: Formik called `" + handlerName + "`, but you forgot to pass an `id` or `name` attribute to your input:\n    " + htmlContent + "\n    Formik cannot determine which value to update. For more info see https://formik.org/docs/api/formik#" + documentationAnchorLink + "\n  ");
	}
	/**
	 * Transform Yup ValidationError to a more usable object
	 */


	function yupToFormErrors(yupError) {
	  var errors = {};

	  if (yupError.inner) {
	    if (yupError.inner.length === 0) {
	      return setIn(errors, yupError.path, yupError.message);
	    }

	    for (var _iterator = yupError.inner, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref5;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref5 = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref5 = _i.value;
	      }

	      var err = _ref5;

	      if (!getIn(errors, err.path)) {
	        errors = setIn(errors, err.path, err.message);
	      }
	    }
	  }

	  return errors;
	}
	/**
	 * Validate a yup schema.
	 */

	function validateYupSchema(values, schema, sync, context) {
	  if (sync === void 0) {
	    sync = false;
	  }

	  if (context === void 0) {
	    context = {};
	  }

	  var validateData = prepareDataForValidation(values);
	  return schema[sync ? 'validateSync' : 'validate'](validateData, {
	    abortEarly: false,
	    context: context
	  });
	}
	/**
	 * Recursively prepare values.
	 */

	function prepareDataForValidation(values) {
	  var data = Array.isArray(values) ? [] : {};

	  for (var k in values) {
	    if (Object.prototype.hasOwnProperty.call(values, k)) {
	      var key = String(k);

	      if (Array.isArray(values[key]) === true) {
	        data[key] = values[key].map(function (value) {
	          if (Array.isArray(value) === true || isPlainObject(value)) {
	            return prepareDataForValidation(value);
	          } else {
	            return value !== '' ? value : undefined;
	          }
	        });
	      } else if (isPlainObject(values[key])) {
	        data[key] = prepareDataForValidation(values[key]);
	      } else {
	        data[key] = values[key] !== '' ? values[key] : undefined;
	      }
	    }
	  }

	  return data;
	}
	/**
	 * deepmerge array merging algorithm
	 * https://github.com/KyleAMathews/deepmerge#combine-array
	 */

	function arrayMerge(target, source, options) {
	  var destination = target.slice();
	  source.forEach(function merge(e, i) {
	    if (typeof destination[i] === 'undefined') {
	      var cloneRequested = options.clone !== false;
	      var shouldClone = cloneRequested && options.isMergeableObject(e);
	      destination[i] = shouldClone ? deepmerge_1(Array.isArray(e) ? [] : {}, e, options) : e;
	    } else if (options.isMergeableObject(e)) {
	      destination[i] = deepmerge_1(target[i], e, options);
	    } else if (target.indexOf(e) === -1) {
	      destination.push(e);
	    }
	  });
	  return destination;
	}
	/** Return multi select values based on an array of options */


	function getSelectedValues(options) {
	  return Array.from(options).filter(function (el) {
	    return el.selected;
	  }).map(function (el) {
	    return el.value;
	  });
	}
	/** Return the next value for a checkbox */


	function getValueForCheckbox(currentValue, checked, valueProp) {
	  // If the current value was a boolean, return a boolean
	  if (typeof currentValue === 'boolean') {
	    return Boolean(checked);
	  } // If the currentValue was not a boolean we want to return an array


	  var currentArrayOfValues = [];
	  var isValueInArray = false;
	  var index = -1;

	  if (!Array.isArray(currentValue)) {
	    // eslint-disable-next-line eqeqeq
	    if (!valueProp || valueProp == 'true' || valueProp == 'false') {
	      return Boolean(checked);
	    }
	  } else {
	    // If the current value is already an array, use it
	    currentArrayOfValues = currentValue;
	    index = currentValue.indexOf(valueProp);
	    isValueInArray = index >= 0;
	  } // If the checkbox was checked and the value is not already present in the aray we want to add the new value to the array of values


	  if (checked && valueProp && !isValueInArray) {
	    return currentArrayOfValues.concat(valueProp);
	  } // If the checkbox was unchecked and the value is not in the array, simply return the already existing array of values


	  if (!isValueInArray) {
	    return currentArrayOfValues;
	  } // If the checkbox was unchecked and the value is in the array, remove the value and return the array


	  return currentArrayOfValues.slice(0, index).concat(currentArrayOfValues.slice(index + 1));
	} // React currently throws a warning when using useLayoutEffect on the server.
	// To get around it, we can conditionally useEffect on the server (no-op) and
	// useLayoutEffect in the browser.
	// @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85


	var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? React.useLayoutEffect : React.useEffect;

	function useEventCallback(fn) {
	  var ref = React.useRef(fn); // we copy a ref to the callback scoped to the current state/props on each render

	  useIsomorphicLayoutEffect(function () {
	    ref.current = fn;
	  });
	  return React.useCallback(function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return ref.current.apply(void 0, args);
	  }, []);
	}

	function useField(propsOrFieldName) {
	  var formik = useFormikContext();
	  var getFieldProps = formik.getFieldProps,
	      getFieldMeta = formik.getFieldMeta,
	      getFieldHelpers = formik.getFieldHelpers,
	      registerField = formik.registerField,
	      unregisterField = formik.unregisterField;
	  var isAnObject = isObject$8(propsOrFieldName); // Normalize propsOrFieldName to FieldHookConfig<Val>

	  var props = isAnObject ? propsOrFieldName : {
	    name: propsOrFieldName
	  };
	  var fieldName = props.name,
	      validateFn = props.validate;
	  React.useEffect(function () {
	    if (fieldName) {
	      registerField(fieldName, {
	        validate: validateFn
	      });
	    }

	    return function () {
	      if (fieldName) {
	        unregisterField(fieldName);
	      }
	    };
	  }, [registerField, unregisterField, fieldName, validateFn]);

	  if (process.env.NODE_ENV !== "production") {
	    !formik ? process.env.NODE_ENV !== "production" ? warning(false, 'useField() / <Field /> must be used underneath a <Formik> component or withFormik() higher order component') : warning(false) : void 0;
	  }

	  !fieldName ? process.env.NODE_ENV !== "production" ? warning(false, 'Invalid field name. Either pass `useField` a string or an object containing a `name` key.') : warning(false) : void 0;
	  return [getFieldProps(props), getFieldMeta(fieldName), getFieldHelpers(fieldName)];
	}

	var Form$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
	  // iOS needs an "action" attribute for nice input: https://stackoverflow.com/a/39485162/406725
	  // We default the action to "#" in case the preventDefault fails (just updates the URL hash)
	  var action = props.action,
	      rest = _objectWithoutPropertiesLoose$1(props, ["action"]);

	  var _action = action != null ? action : '#';

	  var _useFormikContext = useFormikContext(),
	      handleReset = _useFormikContext.handleReset,
	      handleSubmit = _useFormikContext.handleSubmit;

	  return React.createElement("form", Object.assign({
	    onSubmit: handleSubmit,
	    ref: ref,
	    onReset: handleReset,
	    action: _action
	  }, rest));
	});
	Form$1.displayName = 'Form';

	/**
	 * Connect any component to Formik context, and inject as a prop called `formik`;
	 * @param Comp React Component
	 */

	function connect(Comp) {
	  var C = function C(props) {
	    return React.createElement(FormikConsumer, null, function (formik) {
	      !!!formik ? process.env.NODE_ENV !== "production" ? warning(false, "Formik context is undefined, please verify you are rendering <Form>, <Field>, <FastField>, <FieldArray>, or your custom context-using component as a child of a <Formik> component. Component name: " + Comp.name) : warning(false) : void 0;
	      return React.createElement(Comp, Object.assign({}, props, {
	        formik: formik
	      }));
	    });
	  };

	  var componentDisplayName = Comp.displayName || Comp.name || Comp.constructor && Comp.constructor.name || 'Component'; // Assign Comp to C.WrappedComponent so we can access the inner component in tests
	  // For example, <Field.WrappedComponent /> gets us <FieldInner/>

	  C.WrappedComponent = Comp;
	  C.displayName = "FormikConnect(" + componentDisplayName + ")";
	  return hoistNonReactStatics_cjs(C, Comp // cast type to ComponentClass (even if SFC)
	  );
	}

	/**
	 * Some array helpers!
	 */

	var move = function move(array, from, to) {
	  var copy = copyArrayLike(array);
	  var value = copy[from];
	  copy.splice(from, 1);
	  copy.splice(to, 0, value);
	  return copy;
	};
	var swap = function swap(arrayLike, indexA, indexB) {
	  var copy = copyArrayLike(arrayLike);
	  var a = copy[indexA];
	  copy[indexA] = copy[indexB];
	  copy[indexB] = a;
	  return copy;
	};
	var insert = function insert(arrayLike, index, value) {
	  var copy = copyArrayLike(arrayLike);
	  copy.splice(index, 0, value);
	  return copy;
	};
	var replace$1 = function replace(arrayLike, index, value) {
	  var copy = copyArrayLike(arrayLike);
	  copy[index] = value;
	  return copy;
	};

	var copyArrayLike = function copyArrayLike(arrayLike) {
	  if (!arrayLike) {
	    return [];
	  } else if (Array.isArray(arrayLike)) {
	    return [].concat(arrayLike);
	  } else {
	    var maxIndex = Object.keys(arrayLike).map(function (key) {
	      return parseInt(key);
	    }).reduce(function (max, el) {
	      return el > max ? el : max;
	    }, 0);
	    return Array.from(_extends$1({}, arrayLike, {
	      length: maxIndex + 1
	    }));
	  }
	};

	var FieldArrayInner = /*#__PURE__*/function (_React$Component) {
	  _inheritsLoose(FieldArrayInner, _React$Component);

	  function FieldArrayInner(props) {
	    var _this;

	    _this = _React$Component.call(this, props) || this;

	    _this.updateArrayField = function (fn, alterTouched, alterErrors) {
	      var _this$props = _this.props,
	          name = _this$props.name,
	          setFormikState = _this$props.formik.setFormikState;
	      setFormikState(function (prevState) {
	        var updateErrors = typeof alterErrors === 'function' ? alterErrors : fn;
	        var updateTouched = typeof alterTouched === 'function' ? alterTouched : fn; // values fn should be executed before updateErrors and updateTouched,
	        // otherwise it causes an error with unshift.

	        var values = setIn(prevState.values, name, fn(getIn(prevState.values, name)));
	        var fieldError = alterErrors ? updateErrors(getIn(prevState.errors, name)) : undefined;
	        var fieldTouched = alterTouched ? updateTouched(getIn(prevState.touched, name)) : undefined;

	        if (isEmptyArray(fieldError)) {
	          fieldError = undefined;
	        }

	        if (isEmptyArray(fieldTouched)) {
	          fieldTouched = undefined;
	        }

	        return _extends$1({}, prevState, {
	          values: values,
	          errors: alterErrors ? setIn(prevState.errors, name, fieldError) : prevState.errors,
	          touched: alterTouched ? setIn(prevState.touched, name, fieldTouched) : prevState.touched
	        });
	      });
	    };

	    _this.push = function (value) {
	      return _this.updateArrayField(function (arrayLike) {
	        return [].concat(copyArrayLike(arrayLike), [cloneDeep(value)]);
	      }, false, false);
	    };

	    _this.handlePush = function (value) {
	      return function () {
	        return _this.push(value);
	      };
	    };

	    _this.swap = function (indexA, indexB) {
	      return _this.updateArrayField(function (array) {
	        return swap(array, indexA, indexB);
	      }, true, true);
	    };

	    _this.handleSwap = function (indexA, indexB) {
	      return function () {
	        return _this.swap(indexA, indexB);
	      };
	    };

	    _this.move = function (from, to) {
	      return _this.updateArrayField(function (array) {
	        return move(array, from, to);
	      }, true, true);
	    };

	    _this.handleMove = function (from, to) {
	      return function () {
	        return _this.move(from, to);
	      };
	    };

	    _this.insert = function (index, value) {
	      return _this.updateArrayField(function (array) {
	        return insert(array, index, value);
	      }, function (array) {
	        return insert(array, index, null);
	      }, function (array) {
	        return insert(array, index, null);
	      });
	    };

	    _this.handleInsert = function (index, value) {
	      return function () {
	        return _this.insert(index, value);
	      };
	    };

	    _this.replace = function (index, value) {
	      return _this.updateArrayField(function (array) {
	        return replace$1(array, index, value);
	      }, false, false);
	    };

	    _this.handleReplace = function (index, value) {
	      return function () {
	        return _this.replace(index, value);
	      };
	    };

	    _this.unshift = function (value) {
	      var length = -1;

	      _this.updateArrayField(function (array) {
	        var arr = array ? [value].concat(array) : [value];

	        if (length < 0) {
	          length = arr.length;
	        }

	        return arr;
	      }, function (array) {
	        var arr = array ? [null].concat(array) : [null];

	        if (length < 0) {
	          length = arr.length;
	        }

	        return arr;
	      }, function (array) {
	        var arr = array ? [null].concat(array) : [null];

	        if (length < 0) {
	          length = arr.length;
	        }

	        return arr;
	      });

	      return length;
	    };

	    _this.handleUnshift = function (value) {
	      return function () {
	        return _this.unshift(value);
	      };
	    };

	    _this.handleRemove = function (index) {
	      return function () {
	        return _this.remove(index);
	      };
	    };

	    _this.handlePop = function () {
	      return function () {
	        return _this.pop();
	      };
	    }; // We need TypeScript generics on these, so we'll bind them in the constructor
	    // @todo Fix TS 3.2.1


	    _this.remove = _this.remove.bind(_assertThisInitialized(_this));
	    _this.pop = _this.pop.bind(_assertThisInitialized(_this));
	    return _this;
	  }

	  var _proto = FieldArrayInner.prototype;

	  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
	    if (this.props.validateOnChange && this.props.formik.validateOnChange && !reactFastCompare(getIn(prevProps.formik.values, prevProps.name), getIn(this.props.formik.values, this.props.name))) {
	      this.props.formik.validateForm(this.props.formik.values);
	    }
	  };

	  _proto.remove = function remove(index) {
	    // We need to make sure we also remove relevant pieces of `touched` and `errors`
	    var result;
	    this.updateArrayField( // so this gets call 3 times
	    function (array) {
	      var copy = array ? copyArrayLike(array) : [];

	      if (!result) {
	        result = copy[index];
	      }

	      if (isFunction(copy.splice)) {
	        copy.splice(index, 1);
	      }

	      return copy;
	    }, true, true);
	    return result;
	  };

	  _proto.pop = function pop() {
	    // Remove relevant pieces of `touched` and `errors` too!
	    var result;
	    this.updateArrayField( // so this gets call 3 times
	    function (array) {
	      var tmp = array;

	      if (!result) {
	        result = tmp && tmp.pop && tmp.pop();
	      }

	      return tmp;
	    }, true, true);
	    return result;
	  };

	  _proto.render = function render() {
	    var arrayHelpers = {
	      push: this.push,
	      pop: this.pop,
	      swap: this.swap,
	      move: this.move,
	      insert: this.insert,
	      replace: this.replace,
	      unshift: this.unshift,
	      remove: this.remove,
	      handlePush: this.handlePush,
	      handlePop: this.handlePop,
	      handleSwap: this.handleSwap,
	      handleMove: this.handleMove,
	      handleInsert: this.handleInsert,
	      handleReplace: this.handleReplace,
	      handleUnshift: this.handleUnshift,
	      handleRemove: this.handleRemove
	    };

	    var _this$props2 = this.props,
	        component = _this$props2.component,
	        render = _this$props2.render,
	        children = _this$props2.children,
	        name = _this$props2.name,
	        _this$props2$formik = _this$props2.formik,
	        restOfFormik = _objectWithoutPropertiesLoose$1(_this$props2$formik, ["validate", "validationSchema"]);

	    var props = _extends$1({}, arrayHelpers, {
	      form: restOfFormik,
	      name: name
	    });

	    return component ? React.createElement(component, props) : render ? render(props) : children // children come last, always called
	    ? typeof children === 'function' ? children(props) : !isEmptyChildren(children) ? React.Children.only(children) : null : null;
	  };

	  return FieldArrayInner;
	}(React.Component);

	FieldArrayInner.defaultProps = {
	  validateOnChange: true
	};
	var FieldArray = /*#__PURE__*/connect(FieldArrayInner);

	var ErrorMessageImpl = /*#__PURE__*/function (_React$Component) {
	  _inheritsLoose(ErrorMessageImpl, _React$Component);

	  function ErrorMessageImpl() {
	    return _React$Component.apply(this, arguments) || this;
	  }

	  var _proto = ErrorMessageImpl.prototype;

	  _proto.shouldComponentUpdate = function shouldComponentUpdate(props) {
	    if (getIn(this.props.formik.errors, this.props.name) !== getIn(props.formik.errors, this.props.name) || getIn(this.props.formik.touched, this.props.name) !== getIn(props.formik.touched, this.props.name) || Object.keys(this.props).length !== Object.keys(props).length) {
	      return true;
	    } else {
	      return false;
	    }
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        component = _this$props.component,
	        formik = _this$props.formik,
	        render = _this$props.render,
	        children = _this$props.children,
	        name = _this$props.name,
	        rest = _objectWithoutPropertiesLoose$1(_this$props, ["component", "formik", "render", "children", "name"]);

	    var touch = getIn(formik.touched, name);
	    var error = getIn(formik.errors, name);
	    return !!touch && !!error ? render ? isFunction(render) ? render(error) : null : children ? isFunction(children) ? children(error) : null : component ? React.createElement(component, rest, error) : error : null;
	  };

	  return ErrorMessageImpl;
	}(React.Component);

	var ErrorMessage = /*#__PURE__*/connect(ErrorMessageImpl);

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

	var fails$f = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var toString = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var fails$e = fails$f;
	var classof$4 = classofRaw$1;

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$e(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$4(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$5 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$4 = requireObjectCoercible$5;

	var toIndexedObject$4 = function (it) {
	  return IndexedObject$1(requireObjectCoercible$4(it));
	};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$j =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var shared$4 = {exports: {}};

	var fails$d = fails$f;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var objectDefineProperty = {};

	var isObject$7 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var global$i = global$j;
	var isObject$6 = isObject$7;

	var document$3 = global$i.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$6(document$3) && isObject$6(document$3.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$5 = descriptors;
	var fails$c = fails$f;
	var createElement$1 = documentCreateElement$1;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$5 && !fails$c(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var isObject$5 = isObject$7;

	var anObject$b = function (it) {
	  if (!isObject$5(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var isObject$4 = isObject$7;

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive$2 = function (input, PREFERRED_STRING) {
	  if (!isObject$4(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$4(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$4(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$4(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var DESCRIPTORS$4 = descriptors;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var anObject$a = anObject$b;
	var toPrimitive$1 = toPrimitive$2;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$4 ? $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$a(O);
	  P = toPrimitive$1(P, true);
	  anObject$a(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$8 = DESCRIPTORS$3 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$h = global$j;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;

	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$7(global$h, key, value);
	  } catch (error) {
	    global$h[key] = value;
	  } return value;
	};

	var global$g = global$j;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$g[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.15.2',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var requireObjectCoercible$3 = requireObjectCoercible$5;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$4 = function (argument) {
	  return Object(requireObjectCoercible$3(argument));
	};

	var toObject$3 = toObject$4;

	var hasOwnProperty = {}.hasOwnProperty;

	var has$9 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty.call(toObject$3(it), key);
	};

	var id = 0;
	var postfix = Math.random();

	var uid$2 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var global$f = global$j;

	var path$1 = global$f;

	var path = path$1;
	var global$e = global$j;

	var aFunction$6 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$5 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$6(path[namespace]) || aFunction$6(global$e[namespace])
	    : path[namespace] && path[namespace][method] || global$e[namespace] && global$e[namespace][method];
	};

	var getBuiltIn$4 = getBuiltIn$5;

	var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

	var global$d = global$j;
	var userAgent$2 = engineUserAgent;

	var process$4 = global$d.process;
	var versions = process$4 && process$4.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] < 4 ? 1 : match[0] + match[1];
	} else if (userAgent$2) {
	  match = userAgent$2.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$2.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$1 = engineV8Version;
	var fails$b = fails$f;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$b(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$c = global$j;
	var shared$3 = shared$4.exports;
	var has$8 = has$9;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$3('wks');
	var Symbol$1 = global$c.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$f = function (name) {
	  if (!has$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    if (NATIVE_SYMBOL && has$8(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger$4 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
	};

	var toInteger$3 = toInteger$4;

	var min$4 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$4 = function (argument) {
	  return argument > 0 ? min$4(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$2 = toInteger$4;

	var max$3 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$2(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
	};

	var toIndexedObject$3 = toIndexedObject$4;
	var toLength$3 = toLength$4;
	var toAbsoluteIndex = toAbsoluteIndex$1;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$3 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = toLength$3(O.length);
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
	  includes: createMethod$3(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$3(false)
	};

	var hiddenKeys$4 = {};

	var has$7 = has$9;
	var toIndexedObject$2 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$4;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$7(hiddenKeys$3, key) && has$7(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$7(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
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

	var DESCRIPTORS$2 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$9 = anObject$b;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var objectDefineProperties = DESCRIPTORS$2 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$9(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var getBuiltIn$3 = getBuiltIn$5;

	var html$2 = getBuiltIn$3('document', 'documentElement');

	var shared$2 = shared$4.exports;
	var uid = uid$2;

	var keys = shared$2('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var anObject$8 = anObject$b;
	var defineProperties = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$2 = hiddenKeys$4;
	var html$1 = html$2;
	var documentCreateElement = documentCreateElement$1;
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
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe);
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
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
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
	    EmptyConstructor[PROTOTYPE] = anObject$8(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : defineProperties(result, Properties);
	};

	var wellKnownSymbol$e = wellKnownSymbol$f;
	var create$2 = objectCreate;
	var definePropertyModule$2 = objectDefineProperty;

	var UNSCOPABLES = wellKnownSymbol$e('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  definePropertyModule$2.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$2(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var store$1 = sharedStore;

	var functionToString = Function.toString;

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof store$1.inspectSource != 'function') {
	  store$1.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var global$b = global$j;
	var inspectSource$2 = inspectSource$3;

	var WeakMap$2 = global$b.WeakMap;

	var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource$2(WeakMap$2));

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$a = global$j;
	var isObject$3 = isObject$7;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
	var objectHas = has$9;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$3;
	var hiddenKeys$1 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap$1 = global$a.WeakMap;
	var set$1, get, has$6;

	var enforce = function (it) {
	  return has$6(it) ? get(it) : set$1(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap$1());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set$1 = function (it, metadata) {
	    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$6 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$1[STATE] = true;
	  set$1 = function (it, metadata) {
	    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$6(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };
	  has$6 = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has$6,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var objectGetOwnPropertyDescriptor = {};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var DESCRIPTORS$1 = descriptors;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;
	var toIndexedObject$1 = toIndexedObject$4;
	var toPrimitive = toPrimitive$2;
	var has$5 = has$9;
	var IE8_DOM_DEFINE = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$1(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
	};

	var redefine$5 = {exports: {}};

	var global$9 = global$j;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
	var has$4 = has$9;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$1 = inspectSource$3;
	var InternalStateModule$2 = internalState;

	var getInternalState$3 = InternalStateModule$2.get;
	var enforceInternalState = InternalStateModule$2.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$5.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$4(value, 'name')) {
	      createNonEnumerableProperty$5(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
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
	  else createNonEnumerableProperty$5(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState$3(this).source || inspectSource$1(this);
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

	var getBuiltIn$2 = getBuiltIn$5;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$7 = anObject$b;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$7(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$3 = has$9;
	var ownKeys$2 = ownKeys$3;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$1 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys$2(source);
	  var defineProperty = definePropertyModule$1.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$3(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$a = fails$f;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails$a(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var global$8 = global$j;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;
	var redefine$4 = redefine$5.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced$1 = isForced_1;

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
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$4(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$4(target, key, sourceProperty, options);
	  }
	};

	var fails$9 = fails$f;

	var correctPrototypeGetter = !fails$9(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var has$2 = has$9;
	var toObject$2 = toObject$4;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
	  O = toObject$2(O);
	  if (has$2(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var fails$8 = fails$f;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;
	var has$1 = has$9;
	var wellKnownSymbol$d = wellKnownSymbol$f;

	var ITERATOR$5 = wellKnownSymbol$d('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	var returnThis$2 = function () { return this; };

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

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$8(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!has$1(IteratorPrototype$2, ITERATOR$5)) {
	  createNonEnumerableProperty$3(IteratorPrototype$2, ITERATOR$5, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty = objectDefineProperty.f;
	var has = has$9;
	var wellKnownSymbol$c = wellKnownSymbol$f;

	var TO_STRING_TAG$3 = wellKnownSymbol$c('toStringTag');

	var setToStringTag$3 = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
	    defineProperty(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$1 = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$3;
	var setToStringTag$2 = setToStringTag$3;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var isObject$2 = isObject$7;

	var aPossiblePrototype$1 = function (it) {
	  if (!isObject$2(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	/* eslint-disable no-proto -- safe */

	var anObject$6 = anObject$b;
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
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$6(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$4 = _export;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var setToStringTag$1 = setToStringTag$3;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;
	var redefine$3 = redefine$5.exports;
	var wellKnownSymbol$b = wellKnownSymbol$f;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol$b('iterator');
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
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$1) {
	          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty$2(CurrentIteratorPrototype, ITERATOR$4, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty$2(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  Iterators$3[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$3(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$4({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var toIndexedObject = toIndexedObject$4;
	var addToUnscopables = addToUnscopables$1;
	var Iterators$2 = iterators;
	var InternalStateModule$1 = internalState;
	var defineIterator = defineIterator$1;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$2 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

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
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
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

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	Iterators$2.Arguments = Iterators$2.Array;

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

	var global$7 = global$j;
	var DOMIterables = domIterables;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
	var wellKnownSymbol$a = wellKnownSymbol$f;

	var ITERATOR$3 = wellKnownSymbol$a('iterator');
	var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$7[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$3] !== ArrayValues) try {
	      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$3, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$3] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$2]) {
	      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$2, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	}

	var global$6 = global$j;

	var nativePromiseConstructor = global$6.Promise;

	var redefine$2 = redefine$5.exports;

	var redefineAll$1 = function (target, src, options) {
	  for (var key in src) redefine$2(target, key, src[key], options);
	  return target;
	};

	var getBuiltIn$1 = getBuiltIn$5;
	var definePropertyModule = objectDefineProperty;
	var wellKnownSymbol$9 = wellKnownSymbol$f;
	var DESCRIPTORS = descriptors;

	var SPECIES$3 = wellKnownSymbol$9('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule.f;

	  if (DESCRIPTORS && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var aFunction$5 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var anInstance$1 = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var wellKnownSymbol$8 = wellKnownSymbol$f;
	var Iterators$1 = iterators;

	var ITERATOR$2 = wellKnownSymbol$8('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
	};

	var aFunction$4 = aFunction$5;

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$4(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var wellKnownSymbol$7 = wellKnownSymbol$f;

	var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$6 = wellKnownSymbol$f;

	var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');
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
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var classof$2 = classof$3;
	var Iterators = iterators;
	var wellKnownSymbol$5 = wellKnownSymbol$f;

	var ITERATOR$1 = wellKnownSymbol$5('iterator');

	var getIteratorMethod$1 = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || Iterators[classof$2(it)];
	};

	var anObject$5 = anObject$b;

	var iteratorClose$1 = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject$5(returnMethod.call(iterator)).value;
	  }
	};

	var anObject$4 = anObject$b;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var toLength$2 = toLength$4;
	var bind$2 = functionBindContext;
	var getIteratorMethod = getIteratorMethod$1;
	var iteratorClose = iteratorClose$1;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate$1 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$2(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$4(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength$2(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	var wellKnownSymbol$4 = wellKnownSymbol$f;

	var ITERATOR = wellKnownSymbol$4('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var anObject$3 = anObject$b;
	var aFunction$3 = aFunction$5;
	var wellKnownSymbol$3 = wellKnownSymbol$f;

	var SPECIES$2 = wellKnownSymbol$3('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$3(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$3(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$3(S);
	};

	var userAgent$1 = engineUserAgent;

	var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

	var classof$1 = classofRaw$1;
	var global$5 = global$j;

	var engineIsNode = classof$1(global$5.process) == 'process';

	var global$4 = global$j;
	var fails$7 = fails$f;
	var bind$1 = functionBindContext;
	var html = html$2;
	var createElement = documentCreateElement$1;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$3 = engineIsNode;

	var location = global$4.location;
	var set = global$4.setImmediate;
	var clear = global$4.clearImmediate;
	var process$3 = global$4.process;
	var MessageChannel = global$4.MessageChannel;
	var Dispatch = global$4.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global$4.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$3) {
	    defer = function (id) {
	      process$3.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bind$1(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$4.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global$4.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails$7(post)
	  ) {
	    defer = post;
	    global$4.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var userAgent = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$3 = global$j;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var IS_IOS = engineIsIos;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$2 = engineIsNode;

	var MutationObserver = global$3.MutationObserver || global$3.WebKitMutationObserver;
	var document$2 = global$3.document;
	var process$2 = global$3.process;
	var Promise$1 = global$3.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$3, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE$2 && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = promise.then;
	    notify$1 = function () {
	      then.call(promise, flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$2) {
	    notify$1 = function () {
	      process$2.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify$1 = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$3, flush);
	    };
	  }
	}

	var microtask$1 = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var newPromiseCapability$2 = {};

	var aFunction$2 = aFunction$5;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$2(resolve);
	  this.reject = aFunction$2(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var anObject$2 = anObject$b;
	var isObject$1 = isObject$7;
	var newPromiseCapability$1 = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject$2(C);
	  if (isObject$1(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var global$2 = global$j;

	var hostReportErrors$1 = function (a, b) {
	  var console = global$2.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$1 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var engineIsBrowser = typeof window == 'object';

	var $$3 = _export;
	var global$1 = global$j;
	var getBuiltIn = getBuiltIn$5;
	var NativePromise = nativePromiseConstructor;
	var redefine$1 = redefine$5.exports;
	var redefineAll = redefineAll$1;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag = setToStringTag$3;
	var setSpecies = setSpecies$1;
	var isObject = isObject$7;
	var aFunction$1 = aFunction$5;
	var anInstance = anInstance$1;
	var inspectSource = inspectSource$3;
	var iterate = iterate$1;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
	var speciesConstructor = speciesConstructor$1;
	var task = task$1.set;
	var microtask = microtask$1;
	var promiseResolve = promiseResolve$1;
	var hostReportErrors = hostReportErrors$1;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var perform = perform$1;
	var InternalStateModule = internalState;
	var isForced = isForced_1;
	var wellKnownSymbol$2 = wellKnownSymbol$f;
	var IS_BROWSER = engineIsBrowser;
	var IS_NODE$1 = engineIsNode;
	var V8_VERSION = engineV8Version;

	var SPECIES$1 = wellKnownSymbol$2('species');
	var PROMISE = 'Promise';
	var getInternalState$1 = InternalStateModule.get;
	var setInternalState = InternalStateModule.set;
	var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
	var NativePromisePrototype = NativePromise && NativePromise.prototype;
	var PromiseConstructor = NativePromise;
	var PromiseConstructorPrototype = NativePromisePrototype;
	var TypeError$1 = global$1.TypeError;
	var document$1 = global$1.document;
	var process$1 = global$1.process;
	var newPromiseCapability = newPromiseCapabilityModule.f;
	var newGenericPromiseCapability = newPromiseCapability;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var SUBCLASSING = false;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED = isForced(PROMISE, function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$1] = FakePromise;
	  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	  if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
	});

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task.call(global$1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$1.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  task.call(global$1, function () {
	    var promise = state.facade;
	    if (IS_NODE$1) {
	      process$1.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$1(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  PromiseConstructorPrototype = PromiseConstructor.prototype;
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$1.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify(state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$1(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
	    nativeThen = NativePromisePrototype.then;

	    if (!SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      redefine$1(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          nativeThen.call(that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });

	      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	      redefine$1(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
	    }
	  }
	}

	$$3({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	$$3({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	$$3({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	$$3({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// a string of all valid unicode whitespaces
	var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var requireObjectCoercible$2 = requireObjectCoercible$5;
	var whitespaces$1 = whitespaces$2;

	var whitespace = '[' + whitespaces$1 + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible$2($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var fails$6 = fails$f;
	var whitespaces = whitespaces$2;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$6(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $$2 = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$2({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var anObject$1 = anObject$b;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$1(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var regexpStickyHelpers = {};

	var fails$5 = fails$f;

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	var RE = function (s, f) {
	  return RegExp(s, f);
	};

	regexpStickyHelpers.UNSUPPORTED_Y = fails$5(function () {
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	regexpStickyHelpers.BROKEN_CARET = fails$5(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var fails$4 = fails$f;

	var regexpUnsupportedDotAll = fails$4(function () {
	  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	  var re = RegExp('.', (typeof '').charAt(0));
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$3 = fails$f;

	var regexpUnsupportedNcg = fails$3(function () {
	  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
	  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = shared$4.exports;
	var create = objectCreate;
	var getInternalState = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeExec = RegExp.prototype.exec;
	var nativeReplace = shared('native-string-replace', String.prototype.replace);

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  // eslint-disable-next-line max-statements -- TODO
	  patchedExec = function exec(str) {
	    var re = this;
	    var state = getInternalState(re);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = patchedExec.call(raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$1 = _export;
	var exec = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$1({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var redefine = redefine$5.exports;
	var regexpExec$1 = regexpExec$2;
	var fails$2 = fails$f;
	var wellKnownSymbol$1 = wellKnownSymbol$f;
	var createNonEnumerableProperty = createNonEnumerableProperty$8;

	var SPECIES = wellKnownSymbol$1('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$1(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$2(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    redefine(String.prototype, KEY, methods[0]);
	    redefine(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var toInteger$1 = toInteger$4;
	var requireObjectCoercible$1 = requireObjectCoercible$5;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$1($this));
	    var position = toInteger$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	var toObject$1 = toObject$4;

	var floor = Math.floor;
	var replace = ''.replace;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$1(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace.call(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (ch.charAt(0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return str.slice(0, position);
	      case "'": return str.slice(tailPos);
	      case '<':
	        capture = namedCaptures[ch.slice(1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var classof = classofRaw$1;
	var regexpExec = regexpExec$2;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classof(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails$1 = fails$f;
	var anObject = anObject$b;
	var toLength$1 = toLength$4;
	var toInteger = toInteger$4;
	var requireObjectCoercible = requireObjectCoercible$5;
	var advanceStringIndex = advanceStringIndex$1;
	var getSubstitution = getSubstitution$1;
	var regExpExec = regexpExecAbstract;
	var wellKnownSymbol = wellKnownSymbol$f;

	var REPLACE = wellKnownSymbol('replace');
	var max$2 = Math.max;
	var min$2 = Math.min;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$1(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      if (
	        typeof replaceValue === 'string' &&
	        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
	        replaceValue.indexOf('$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, this, string, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(this);
	      var S = String(string);

	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$1(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$2(min$2(toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	const required$1 = value => {
	  return Array.isArray(value) ? value.length > 0 : !!value;
	};
	const email$1 = value => {
	  var email = value.trim();

	  if (email === "") {
	    return true;
	  }

	  if (!/^[-\.\w]+@[-\.a-zA-Z0-9]+\.[-\.a-zA-Z0-9]+$/.test(email)) {
	    return false;
	  }

	  var emailPrex = email.split("@")[0];
	  var emailAfter = email.split("@")[1];

	  if (!/^.*[A-Za-z0-9]+.*$/.test(emailPrex)) {
	    return false;
	  }

	  if (/(^\..*)|(.*\.$)/.test(emailPrex)) {
	    return false;
	  }

	  if (/(\.){2,}/.test(emailPrex)) {
	    return false;
	  }

	  var splitIndex = emailAfter.lastIndexOf(".");
	  var splitPrex = emailAfter.substr(0, splitIndex);
	  var splitAfter = emailAfter.substr(splitIndex + 1);

	  if (/(^[\.-].*)|(.*[\.-]$)/.test(splitPrex)) {
	    return false;
	  }

	  if (/(\.){2,}/.test(splitPrex)) {
	    return false;
	  }

	  if (!/^[a-zA-Z]+$/.test(splitAfter)) {
	    return false;
	  }

	  return true;
	};
	const number$1 = value => {
	  return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
	};
	const digits$1 = value => {
	  return /^\d+$/.test(value);
	};
	const date$1 = function (value) {
	  return !required$1(value) || !/Invalid|NaN/.test(new Date(value.replace(/-/g, '/')).toString());
	};
	const creditcard$1 = value => {
	  if (/[^0-9 \-]+/.test(value)) {
	    return false;
	  }

	  var nCheck = 0,
	      nDigit = 0,
	      bEven = false;
	  value = value.replace(/\D/g, "");

	  for (var n = value.length - 1; n >= 0; n--) {
	    var cDigit = value.charAt(n);
	    nDigit = parseInt(cDigit, 10);

	    if (bEven) {
	      if ((nDigit *= 2) > 9) {
	        nDigit -= 9;
	      }
	    }

	    nCheck += nDigit;
	    bEven = !bEven;
	  }

	  return nCheck % 10 === 0;
	};
	const url$1 = function (value) {
	  value = value.trim();
	  return !required$1(value) || /^((?:https?):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
	};
	const enonly$1 = function (value) {
	  return !/[^\x00-\x7f]/.test(value);
	};
	const min$1 = (value, param) => {
	  return value >= param;
	};
	const max$1 = (value, param) => {
	  return value <= param;
	};
	const minlength$1 = (value, param) => {
	  const length = Array.isArray(value) ? value.length : value.length;
	  return length >= param;
	};
	const maxlength$1 = (value, param) => {
	  const length = Array.isArray(value) ? value.length : value.length;
	  return length <= param;
	};
	const range$1 = (value, param) => {
	  return value >= param[0] && value <= param[1];
	};
	const equalTo$1 = (value, param) => {
	  return value === param;
	};

	var builtinRules = /*#__PURE__*/Object.freeze({
		__proto__: null,
		required: required$1,
		email: email$1,
		number: number$1,
		digits: digits$1,
		date: date$1,
		creditcard: creditcard$1,
		url: url$1,
		enonly: enonly$1,
		min: min$1,
		max: max$1,
		minlength: minlength$1,
		maxlength: maxlength$1,
		range: range$1,
		equalTo: equalTo$1
	});

	const required = "This field is required.";
	const remote = "Please fix this field.";
	const email = "Please enter a valid email address.";
	const url = "Please enter a valid URL.";
	const date = "Please enter a valid date.";
	const dateISO = "Please enter a valid date (ISO).";
	const number = "Please enter a valid number.";
	const digits = "Please enter only digits.";
	const creditcard = "Please enter a valid credit card number.";
	const equalTo = "Please enter the same value again.";
	const maxlength = ruleValue => `Please enter no more than ${ruleValue} characters.`;
	const minlength = `Please enter at least {0} characters.`;
	const rangelength = `Please enter a value between {0} and {1} characters long.`;
	const range = `Please enter a value between {0} and {1}.`;
	const max = `Please enter a value less than or equal to {0}.`;
	const min = `Please enter a value greater than or equal to {0}.`;
	const enonly = "Please enter in English only.";

	var builtinMessages = /*#__PURE__*/Object.freeze({
		__proto__: null,
		required: required,
		remote: remote,
		email: email,
		url: url,
		date: date,
		dateISO: dateISO,
		number: number,
		digits: digits,
		creditcard: creditcard,
		equalTo: equalTo,
		maxlength: maxlength,
		minlength: minlength,
		rangelength: rangelength,
		range: range,
		max: max,
		min: min,
		enonly: enonly
	});

	const validateByFutureValidation = async (value, validation, values) => {
	  const {
	    rules,
	    messages = {}
	  } = validation;
	  const builtinRuleNames = Object.keys(builtinRules);
	  const defaultErrorMessages = builtinMessages;
	  const ruleNames = Object.keys(rules);
	  let errorMessage;

	  for (const ruleKey of ruleNames) {
	    const rule = rules[ruleKey];
	    const matchMessage = messages && messages[ruleKey];

	    if (builtinRuleNames.includes(ruleKey)) {
	      if (!validateByRules(value, ruleKey, rule)) {
	        errorMessage = matchMessage || (typeof defaultErrorMessages[ruleKey] === "string" ? defaultErrorMessages[ruleKey] : defaultErrorMessages[ruleKey](rule));
	        break;
	      }
	    } else if (typeof rule === "function") {
	      const valid = await rule(value, values);

	      if (!valid) {
	        errorMessage = matchMessage || "Error";
	        break;
	      }
	    }
	  }

	  return errorMessage;
	};
	const validateByRules = (value, ruleName, ruleParams) => {
	  let valid = true;
	  const method = builtinRules[ruleName];

	  if (method && ruleParams !== false) {
	    valid = method(value, ruleParams);
	  }

	  return valid;
	};

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

	const FutureErrorMessage = props => {
	  return /*#__PURE__*/React__default['default'].createElement(ErrorMessage, _extends({}, props, {
	    children: props.children || (error => /*#__PURE__*/React__default['default'].createElement("div", {
	      className: "ft-form-feedback"
	    }, error))
	  }));
	};

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	const FutureField = props => {
	  const formik = useFormikContext();
	  const {
	    setFieldValue,
	    validateOnChange,
	    validateOnBlur
	  } = formik;
	  const values = formik.values;
	  const touched = formik.touched;
	  const {
	    name,
	    type,
	    dependencies = [],
	    onDependenciesChange,
	    futureValidation,
	    thirdPartyValidateOnChange,
	    thirdPartyTouchOnChange,
	    errorMessage = true,
	    children
	  } = props;
	  const [field, meta, helper] = useField({
	    name,
	    type,
	    validate: futureValidation ? value => validateByFutureValidation(value, futureValidation, values) : undefined
	  });
	  const realDependencies = dependencies.filter(name => getIn(values, name) !== undefined);
	  const dependentValueList = realDependencies.map(name => getIn(values, name));
	  const dependentTouchedList = realDependencies.map(name => getIn(touched, name));
	  React.useEffect(() => {
	    if (dependentValueList.length > 0 && dependentTouchedList.every(Boolean) && onDependenciesChange) {
	      let dependentValues = {};
	      realDependencies.forEach((name, i) => {
	        dependentValues = setIn(dependentValues, name, dependentValueList[i]);
	      });
	      let isCurrent = true;
	      const resultOrPromise = onDependenciesChange({
	        value: field.value,
	        dependentValues
	      });

	      if (resultOrPromise !== undefined) {
	        if (resultOrPromise instanceof Promise) {
	          resultOrPromise.then(result => {
	            isCurrent && setFieldValue(props.name, result);
	          });
	        } else {
	          setFieldValue(props.name, resultOrPromise);
	        }
	      }

	      return () => {
	        isCurrent = false;
	      };
	    }
	  }, [JSON.stringify(dependentValueList), JSON.stringify(dependentTouchedList), setFieldValue, props.name]);
	  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].cloneElement(children, _objectSpread$1(_objectSpread$1({}, field), {}, {
	    error: Boolean(meta.error && meta.touched),

	    onChange(eventOrValue) {
	      const event = eventOrValue;
	      const userOnChange = children.props.onChange;

	      if (event && event.target && event.nativeEvent) {
	        userOnChange && userOnChange(event);
	        !event.defaultPrevented && field.onChange(event);
	      } else {
	        if (!userOnChange || userOnChange(eventOrValue) !== false) {
	          const shouldValidateOnChange = thirdPartyValidateOnChange || validateOnChange;

	          if (shouldValidateOnChange || thirdPartyTouchOnChange) {
	            helper.setTouched(true);
	          }

	          helper.setValue(eventOrValue, shouldValidateOnChange);
	        }
	      }
	    },

	    onBlur(eventOrValue) {
	      const event = eventOrValue;
	      const userHandler = children.props.onBlur;

	      if (event && event.target && event.nativeEvent) {
	        userHandler && userHandler(event);
	        !event.defaultPrevented && field.onBlur(event);
	      } else {
	        (!userHandler || userHandler(eventOrValue) !== false) && helper.setTouched(true, validateOnBlur);
	      }
	    }

	  })), errorMessage !== false && /*#__PURE__*/React__default['default'].createElement(FutureErrorMessage, {
	    name: name
	  }));
	};

	function formikConnect(component) {
	  return connect(component);
	}

	var aFunction = aFunction$5;
	var toObject = toObject$4;
	var IndexedObject = indexedObject;
	var toLength = toLength$4;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction(callbackfn);
	    var O = toObject(that);
	    var self = IndexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};

	var fails = fails$f;

	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $ = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict = arrayMethodIsStrict$1;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE = engineIsNode;

	var STRICT_METHOD = arrayMethodIsStrict('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	const OBJECT_DELIMITERS = ".";
	const ARRAY_START_DELIMITER = "[";
	const ARRAY_END_DELIMITER = "]";
	function flattenToLodashFormat(target) {
	  const output = {};

	  function step(value, prev = "") {
	    const type = Object.prototype.toString.call(value);
	    const isObject = type === "[object Object]" || type === "[object Array]";
	    const isArray = Array.isArray(value);

	    if (!isArray && isObject) {
	      Object.keys(value).forEach(function (key) {
	        let newKey = prev ? prev + OBJECT_DELIMITERS + key : key;
	        step(value[key], newKey);
	      });
	    } else if (isArray) {
	      value.forEach((arrayValue, index) => {
	        const arrayKey = prev + ARRAY_START_DELIMITER + index + ARRAY_END_DELIMITER;
	        step(arrayValue, arrayKey);
	      });
	    } else {
	      output[prev] = value;
	    }
	  }

	  step(target);
	  return output;
	}

	/**
	 * This component focus the first error in the Formik form after the validation.
	 * Note: The first is not necessary the first on the screen, it's just the first
	 * key in the touched object, order is not guaranteed.
	 * */

	function FocusError({
	  formik: {
	    isSubmitting,
	    touched,
	    isValidating,
	    errors
	  },
	  options,
	  focusDelay = 100,
	  onFocus
	}) {
	  React.useEffect(() => {
	    if (isSubmitting && !isValidating) {
	      // Flatten touched as a way to check nested keys easily and
	      // fix the depth problem when the error text is created
	      // by a React component like react-intl.
	      const flattedTouched = flattenToLodashFormat(touched);
	      const errorNames = Object.keys(flattedTouched).reduce((prev, key) => {
	        if (getIn(errors, key)) {
	          prev.push(key);
	        }

	        return prev;
	      }, []);

	      if (errorNames.length && typeof document !== "undefined") {
	        let errorElement;
	        errorNames.forEach(errorKey => {
	          if (!errorElement) {
	            errorElement = document.querySelector(`[name="${errorKey}"]`) || document.querySelector(`[data-name='${errorKey}']`);
	            return;
	          }
	        }); // This is to avoid the other components autofocus when submitting

	        setTimeout(() => {
	          errorElement && errorElement.scrollIntoView(options);
	        }, focusDelay);
	      }
	    }
	  }, [isSubmitting, isValidating, errors, touched, focusDelay]);
	  return /*#__PURE__*/React__default['default'].createElement(React.Fragment, null);
	}

	/**
	 * This component focus the first error in the Formik form after the validation.
	 * Note: The first is not necessary the first on the screen, it's just the first
	 * key in the touched object.
	 * */

	const ConnectedFocusError = formikConnect(FocusError);

	class FutureFormik extends React__default['default'].Component {
	  constructor(props) {
	    super(props);

	    _defineProperty(this, "convert2Validate", validation => {
	      return async values => {
	        const {
	          rules,
	          messages
	        } = validation;
	        const fieldNames = Object.keys(values);
	        let errors = {};

	        for (const fieldName of fieldNames) {
	          const fieldValue = getIn(values, fieldName);
	          const fieldRules = rules[fieldName];

	          if (fieldRules) {
	            const error = await validateByFutureValidation(fieldValue, {
	              rules: fieldRules,
	              messages: messages[fieldName]
	            }, values);

	            if (error) {
	              errors = setIn(errors, fieldName, error);
	            }
	          }
	        }

	        return errors;
	      };
	    });
	  }

	  render() {
	    const {
	      validate,
	      futureValidation,
	      scrollToFirstError,
	      children
	    } = this.props;
	    const connectedFocusError = scrollToFirstError && /*#__PURE__*/React__default['default'].createElement(ConnectedFocusError, typeof scrollToFirstError === "object" ? scrollToFirstError : {});
	    return /*#__PURE__*/React__default['default'].createElement(Formik, _extends({}, this.props, {
	      validate: futureValidation ? this.convert2Validate(futureValidation) : validate
	    }), scrollToFirstError ? typeof children === "function" ? props => /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, connectedFocusError, children(props)) : /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, connectedFocusError, children) : children);
	  }

	  componentDidMount() {}

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

	var classnames = {exports: {}};

	/*!
	  Copyright (c) 2018 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function (module) {
	/* global define */

	(function () {

		var hasOwn = {}.hasOwnProperty;

		function classNames() {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					if (arg.length) {
						var inner = classNames.apply(null, arg);
						if (inner) {
							classes.push(inner);
						}
					}
				} else if (argType === 'object') {
					if (arg.toString === Object.prototype.toString) {
						for (var key in arg) {
							if (hasOwn.call(arg, key) && arg[key]) {
								classes.push(key);
							}
						}
					} else {
						classes.push(arg.toString());
					}
				}
			}

			return classes.join(' ');
		}

		if (module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	}());
	}(classnames));

	var classNames = classnames.exports;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	const Form = props => {
	  const {
	    className,
	    layout,
	    children
	  } = props;
	  const layoutClassName = layout ? `is-${layout}` : "is-horizontal";
	  const formik = useFormikContext();
	  const FormTag = formik ? Form$1 : "form";

	  const formProps = (_ref => {
	    let rest = _objectWithoutProperties(_ref, ["layout"]);

	    return _objectSpread({}, rest);
	  })(props);

	  return /*#__PURE__*/React__default['default'].createElement(FormTag, _extends({}, formProps, {
	    className: classNames("ft-form", layoutClassName, className)
	  }), children);
	};

	const FormItem = props => {
	  const {
	    className,
	    label,
	    required,
	    children
	  } = props;
	  return /*#__PURE__*/React__default['default'].createElement("div", {
	    className: classNames("ft-form-item", className)
	  }, label !== undefined && /*#__PURE__*/React__default['default'].createElement("div", {
	    className: "ft-form-item-label"
	  }, required && /*#__PURE__*/React__default['default'].createElement("span", {
	    className: "ft-form-item-required"
	  }, "*"), label), /*#__PURE__*/React__default['default'].createElement("div", {
	    className: "ft-form-item-control"
	  }, /*#__PURE__*/React__default['default'].createElement("div", {
	    className: "ft-form-item-input"
	  }, children)));
	};

	exports.Form = Form;
	exports.FormItem = FormItem;
	exports.FutureErrorMessage = FutureErrorMessage;
	exports.FutureField = FutureField;
	exports.FutureFieldArray = FieldArray;
	exports.FutureFormik = FutureFormik;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
