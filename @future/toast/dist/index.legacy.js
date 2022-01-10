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

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
      return this;
    });

    define(Gp, "toString", function() {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
  }(runtime));

  var regenerator = runtime.exports;

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$n =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var shared$4 = {exports: {}};

  var fails$h = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$g = fails$h;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$g(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectDefineProperty = {};

  var isObject$h = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var global$m = global$n;
  var isObject$g = isObject$h;

  var document$3 = global$m.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$g(document$3) && isObject$g(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$9 = descriptors;
  var fails$f = fails$h;
  var createElement$1 = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$9 && !fails$f(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var isObject$f = isObject$h;

  var anObject$c = function (it) {
    if (!isObject$f(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var isObject$e = isObject$h;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$4 = function (input, PREFERRED_STRING) {
    if (!isObject$e(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$e(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$e(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$e(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var DESCRIPTORS$8 = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var anObject$b = anObject$c;
  var toPrimitive$3 = toPrimitive$4;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$b(O);
    P = toPrimitive$3(P, true);
    anObject$b(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var createPropertyDescriptor$5 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var DESCRIPTORS$7 = descriptors;
  var definePropertyModule$6 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$5;

  var createNonEnumerableProperty$9 = DESCRIPTORS$7 ? function (object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var global$l = global$n;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$8(global$l, key, value);
    } catch (error) {
      global$l[key] = value;
    } return value;
  };

  var global$k = global$n;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$3 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var requireObjectCoercible$2 = requireObjectCoercible$3;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$7 = function (argument) {
    return Object(requireObjectCoercible$2(argument));
  };

  var toObject$6 = toObject$7;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$c = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$6(it), key);
  };

  var id$2 = 0;
  var postfix = Math.random();

  var uid$4 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$2 + postfix).toString(36);
  };

  var global$j = global$n;

  var path$2 = global$j;

  var path$1 = path$2;
  var global$i = global$n;

  var aFunction$7 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$7 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$7(path$1[namespace]) || aFunction$7(global$i[namespace])
      : path$1[namespace] && path$1[namespace][method] || global$i[namespace] && global$i[namespace][method];
  };

  var getBuiltIn$6 = getBuiltIn$7;

  var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || '';

  var global$h = global$n;
  var userAgent$2 = engineUserAgent;

  var process$3 = global$h.process;
  var versions = process$3 && process$3.versions;
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

  var V8_VERSION$3 = engineV8Version;
  var fails$e = fails$h;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$e(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$2 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$2
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$g = global$n;
  var shared$3 = shared$4.exports;
  var has$b = has$c;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var WellKnownSymbolsStore$1 = shared$3('wks');
  var Symbol$1 = global$g.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

  var wellKnownSymbol$i = function (name) {
    if (!has$b(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (NATIVE_SYMBOL$1 && has$b(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var wellKnownSymbol$h = wellKnownSymbol$i;

  var TO_STRING_TAG$3 = wellKnownSymbol$h('toStringTag');
  var test = {};

  test[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var redefine$7 = {exports: {}};

  var store$1 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store$1.inspectSource != 'function') {
    store$1.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var global$f = global$n;
  var inspectSource$2 = inspectSource$3;

  var WeakMap$2 = global$f.WeakMap;

  var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource$2(WeakMap$2));

  var shared$2 = shared$4.exports;
  var uid$2 = uid$4;

  var keys = shared$2('keys');

  var sharedKey$4 = function (key) {
    return keys[key] || (keys[key] = uid$2(key));
  };

  var hiddenKeys$6 = {};

  var NATIVE_WEAK_MAP$1 = nativeWeakMap;
  var global$e = global$n;
  var isObject$d = isObject$h;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var objectHas = has$c;
  var shared$1 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$5 = hiddenKeys$6;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$1 = global$e.WeakMap;
  var set$1, get, has$a;

  var enforce = function (it) {
    return has$a(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$d(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP$1 || shared$1.state) {
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
    has$a = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$5[STATE] = true;
    set$1 = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$a = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has$a,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$d = global$n;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var has$9 = has$c;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule$6 = internalState;

  var getInternalState$4 = InternalStateModule$6.get;
  var enforceInternalState = InternalStateModule$6.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$7.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$9(value, 'name')) {
        createNonEnumerableProperty$6(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$d) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$6(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$4(this).source || inspectSource$1(this);
  });

  var toString$2 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$2.call(it).slice(8, -1);
  };

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$g = wellKnownSymbol$i;

  var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$4 = classof$5;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$4(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$6 = redefine$7.exports;
  var toString$1 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$6(Object.prototype, 'toString', toString$1, { unsafe: true });
  }

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var fails$d = fails$h;
  var classof$3 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$d(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$3(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$1 = requireObjectCoercible$3;

  var toIndexedObject$9 = function (it) {
    return IndexedObject$2(requireObjectCoercible$1(it));
  };

  var DESCRIPTORS$6 = descriptors;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$5;
  var toIndexedObject$8 = toIndexedObject$9;
  var toPrimitive$2 = toPrimitive$4;
  var has$8 = has$c;
  var IE8_DOM_DEFINE = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$8(O);
    P = toPrimitive$2(P, true);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (has$8(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$4 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var toInteger$3 = toInteger$4;

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$5 = function (argument) {
    return argument > 0 ? min$2(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$2 = toInteger$4;

  var max$1 = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toInteger$2(index);
    return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$7 = toIndexedObject$9;
  var toLength$4 = toLength$5;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$7($this);
      var length = toLength$4(O.length);
      var index = toAbsoluteIndex$1(fromIndex, length);
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
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var has$7 = has$c;
  var toIndexedObject$6 = toIndexedObject$9;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$4 = hiddenKeys$6;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$6(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$7(hiddenKeys$4, key) && has$7(O, key) && result.push(key);
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

  var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$3);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$5 = getBuiltIn$7;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$a = anObject$c;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$5 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$a(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$6 = has$c;
  var ownKeys$4 = ownKeys$5;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$5 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys$4(source);
    var defineProperty = definePropertyModule$5.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$6(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$c = fails$h;

  var replacement = /#|\.prototype\./;

  var isForced$3 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails$c(detection)
      : !!detection;
  };

  var normalize = isForced$3.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$3.data = {};
  var NATIVE = isForced$3.NATIVE = 'N';
  var POLYFILL = isForced$3.POLYFILL = 'P';

  var isForced_1 = isForced$3;

  var global$c = global$n;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
  var redefine$5 = redefine$7.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$2 = isForced_1;

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
      target = global$c;
    } else if (STATIC) {
      target = global$c[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$c[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$5(target, key, sourceProperty, options);
    }
  };

  var global$b = global$n;

  var nativePromiseConstructor = global$b.Promise;

  var redefine$4 = redefine$7.exports;

  var redefineAll$4 = function (target, src, options) {
    for (var key in src) redefine$4(target, key, src[key], options);
    return target;
  };

  var isObject$c = isObject$h;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$c(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  var anObject$9 = anObject$c;
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
      anObject$9(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var defineProperty$3 = objectDefineProperty.f;
  var has$5 = has$c;
  var wellKnownSymbol$f = wellKnownSymbol$i;

  var TO_STRING_TAG$1 = wellKnownSymbol$f('toStringTag');

  var setToStringTag$5 = function (it, TAG, STATIC) {
    if (it && !has$5(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
      defineProperty$3(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
  };

  var getBuiltIn$4 = getBuiltIn$7;
  var definePropertyModule$4 = objectDefineProperty;
  var wellKnownSymbol$e = wellKnownSymbol$i;
  var DESCRIPTORS$5 = descriptors;

  var SPECIES$4 = wellKnownSymbol$e('species');

  var setSpecies$2 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$4(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$4.f;

    if (DESCRIPTORS$5 && Constructor && !Constructor[SPECIES$4]) {
      defineProperty(Constructor, SPECIES$4, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var aFunction$6 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var anInstance$4 = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var iterators = {};

  var wellKnownSymbol$d = wellKnownSymbol$i;
  var Iterators$4 = iterators;

  var ITERATOR$5 = wellKnownSymbol$d('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
  };

  var aFunction$5 = aFunction$6;

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$5(fn);
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

  var classof$2 = classof$5;
  var Iterators$3 = iterators;
  var wellKnownSymbol$c = wellKnownSymbol$i;

  var ITERATOR$4 = wellKnownSymbol$c('iterator');

  var getIteratorMethod$1 = function (it) {
    if (it != undefined) return it[ITERATOR$4]
      || it['@@iterator']
      || Iterators$3[classof$2(it)];
  };

  var anObject$8 = anObject$c;

  var iteratorClose$1 = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject$8(returnMethod.call(iterator)).value;
    }
  };

  var anObject$7 = anObject$c;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var toLength$3 = toLength$5;
  var bind$5 = functionBindContext;
  var getIteratorMethod = getIteratorMethod$1;
  var iteratorClose = iteratorClose$1;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate$4 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$5(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$7(value);
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
        for (index = 0, length = toLength$3(iterable.length); length > index; index++) {
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

  var wellKnownSymbol$b = wellKnownSymbol$i;

  var ITERATOR$3 = wellKnownSymbol$b('iterator');
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
    iteratorWithReturn[ITERATOR$3] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$3] = function () {
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

  var anObject$6 = anObject$c;
  var aFunction$4 = aFunction$6;
  var wellKnownSymbol$a = wellKnownSymbol$i;

  var SPECIES$3 = wellKnownSymbol$a('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$6(O).constructor;
    var S;
    return C === undefined || (S = anObject$6(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$4(S);
  };

  var getBuiltIn$3 = getBuiltIn$7;

  var html$2 = getBuiltIn$3('document', 'documentElement');

  var userAgent$1 = engineUserAgent;

  var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

  var classof$1 = classofRaw$1;
  var global$a = global$n;

  var engineIsNode = classof$1(global$a.process) == 'process';

  var global$9 = global$n;
  var fails$b = fails$h;
  var bind$4 = functionBindContext;
  var html$1 = html$2;
  var createElement = documentCreateElement$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;

  var location = global$9.location;
  var set = global$9.setImmediate;
  var clear = global$9.clearImmediate;
  var process$2 = global$9.process;
  var MessageChannel = global$9.MessageChannel;
  var Dispatch = global$9.Dispatch;
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
    global$9.postMessage(id + '', location.protocol + '//' + location.host);
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
    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
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
      defer = bind$4(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$9.addEventListener &&
      typeof postMessage == 'function' &&
      !global$9.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails$b(post)
    ) {
      defer = post;
      global$9.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html$1.removeChild(this);
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

  var global$8 = global$n;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;

  var MutationObserver = global$8.MutationObserver || global$8.WebKitMutationObserver;
  var document$2 = global$8.document;
  var process$1 = global$8.process;
  var Promise$1 = global$8.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$8, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
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
    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
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
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
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
        macrotask.call(global$8, flush);
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

  var aFunction$3 = aFunction$6;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$3(resolve);
    this.reject = aFunction$3(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject$5 = anObject$c;
  var isObject$b = isObject$h;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$5(C);
    if (isObject$b(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$7 = global$n;

  var hostReportErrors$1 = function (a, b) {
    var console = global$7.console;
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

  var $$e = _export;
  var global$6 = global$n;
  var getBuiltIn$2 = getBuiltIn$7;
  var NativePromise = nativePromiseConstructor;
  var redefine$3 = redefine$7.exports;
  var redefineAll$3 = redefineAll$4;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var setToStringTag$4 = setToStringTag$5;
  var setSpecies$1 = setSpecies$2;
  var isObject$a = isObject$h;
  var aFunction$2 = aFunction$6;
  var anInstance$3 = anInstance$4;
  var inspectSource = inspectSource$3;
  var iterate$3 = iterate$4;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
  var speciesConstructor = speciesConstructor$1;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve = promiseResolve$1;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$1;
  var InternalStateModule$5 = internalState;
  var isForced$1 = isForced_1;
  var wellKnownSymbol$9 = wellKnownSymbol$i;
  var IS_BROWSER = engineIsBrowser;
  var IS_NODE = engineIsNode;
  var V8_VERSION$2 = engineV8Version;

  var SPECIES$2 = wellKnownSymbol$9('species');
  var PROMISE = 'Promise';
  var getInternalState$3 = InternalStateModule$5.get;
  var setInternalState$5 = InternalStateModule$5.set;
  var getInternalPromiseState = InternalStateModule$5.getterFor(PROMISE);
  var NativePromisePrototype = NativePromise && NativePromise.prototype;
  var PromiseConstructor = NativePromise;
  var PromiseConstructorPrototype = NativePromisePrototype;
  var TypeError$1 = global$6.TypeError;
  var document$1 = global$6.document;
  var process = global$6.process;
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$6.dispatchEvent);
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

  var FORCED$3 = isForced$1(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$2 === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION$2 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$2] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION = FORCED$3 || !checkCorrectnessOfIteration$1(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$a(it) && typeof (then = it.then) == 'function' ? then : false;
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
      global$6.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$6['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task.call(global$6, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task.call(global$6, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$3 = function (fn, state, unwrap) {
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
              bind$3(internalResolve, wrapper, state),
              bind$3(internalReject, wrapper, state)
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
  if (FORCED$3) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance$3(this, PromiseConstructor, PROMISE);
      aFunction$2(executor);
      Internal.call(this);
      var state = getInternalState$3(this);
      try {
        executor(bind$3(internalResolve, state), bind$3(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromiseConstructorPrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$5(this, {
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
    Internal.prototype = redefineAll$3(PromiseConstructorPrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE ? process.domain : undefined;
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
      var state = getInternalState$3(promise);
      this.promise = promise;
      this.resolve = bind$3(internalResolve, state);
      this.reject = bind$3(internalReject, state);
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
        redefine$3(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
        redefine$3(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf$2) {
        setPrototypeOf$2(NativePromisePrototype, PromiseConstructorPrototype);
      }
    }
  }

  $$e({ global: true, wrap: true, forced: FORCED$3 }, {
    Promise: PromiseConstructor
  });

  setToStringTag$4(PromiseConstructor, PROMISE, false);
  setSpecies$1(PROMISE);

  PromiseWrapper = getBuiltIn$2(PROMISE);

  // statics
  $$e({ target: PROMISE, stat: true, forced: FORCED$3 }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  $$e({ target: PROMISE, stat: true, forced: FORCED$3 }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  $$e({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$2(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$3(iterable, function (promise) {
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
        var $promiseResolve = aFunction$2(C.resolve);
        iterate$3(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$4 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var anObject$4 = anObject$c;
  var objectKeys$1 = objectKeys$2;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS$4 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$4(O);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$3.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var anObject$3 = anObject$c;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$2 = hiddenKeys$6;
  var html = html$2;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$2 = sharedKey$4;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
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
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$2[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$3(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var wellKnownSymbol$8 = wellKnownSymbol$i;
  var create$3 = objectCreate;
  var definePropertyModule$2 = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$8('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule$2.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$3(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var fails$a = fails$h;

  var correctPrototypeGetter = !fails$a(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$4 = has$c;
  var toObject$5 = toObject$7;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey$1('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$5(O);
    if (has$4(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var fails$9 = fails$h;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
  var has$3 = has$c;
  var wellKnownSymbol$7 = wellKnownSymbol$i;

  var ITERATOR$2 = wellKnownSymbol$7('iterator');
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

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$9(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!has$3(IteratorPrototype$2, ITERATOR$2)) {
    createNonEnumerableProperty$4(IteratorPrototype$2, ITERATOR$2, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$5;
  var setToStringTag$3 = setToStringTag$5;
  var Iterators$2 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2(1, next) });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$d = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$5;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
  var redefine$2 = redefine$7.exports;
  var wellKnownSymbol$6 = wellKnownSymbol$i;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$6('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$1) {
            setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            createNonEnumerableProperty$3(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty$3(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    Iterators$1[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$d({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var toIndexedObject$5 = toIndexedObject$9;
  var addToUnscopables = addToUnscopables$1;
  var Iterators = iterators;
  var InternalStateModule$4 = internalState;
  var defineIterator$2 = defineIterator$3;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$4 = InternalStateModule$4.set;
  var getInternalState$2 = InternalStateModule$4.getterFor(ARRAY_ITERATOR);

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
  var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
    setInternalState$4(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$5(iterated), // target
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
  Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var toInteger$1 = toInteger$4;
  var requireObjectCoercible = requireObjectCoercible$3;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
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
  var InternalStateModule$3 = internalState;
  var defineIterator$1 = defineIterator$3;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$1 = InternalStateModule$3.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator$1(String, 'String', function (iterated) {
    setInternalState$3(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var internalMetadata = {exports: {}};

  var fails$8 = fails$h;

  var freezing = !fails$8(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var hiddenKeys$1 = hiddenKeys$6;
  var isObject$9 = isObject$h;
  var has$2 = has$c;
  var defineProperty$2 = objectDefineProperty.f;
  var uid$1 = uid$4;
  var FREEZING = freezing;

  var METADATA = uid$1('meta');
  var id$1 = 0;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible$1 = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty$2(it, METADATA, { value: {
      objectID: 'O' + id$1++, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$9(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has$2(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData$1 = function (it, create) {
    if (!has$2(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && meta.REQUIRED && isExtensible$1(it) && !has$2(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = internalMetadata.exports = {
    REQUIRED: false,
    fastKey: fastKey$1,
    getWeakData: getWeakData$1,
    onFreeze: onFreeze
  };

  hiddenKeys$1[METADATA] = true;

  var isObject$8 = isObject$h;
  var setPrototypeOf = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject$8(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var $$c = _export;
  var global$5 = global$n;
  var isForced = isForced_1;
  var redefine$1 = redefine$7.exports;
  var InternalMetadataModule$1 = internalMetadata.exports;
  var iterate$2 = iterate$4;
  var anInstance$2 = anInstance$4;
  var isObject$7 = isObject$h;
  var fails$7 = fails$h;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
  var setToStringTag$1 = setToStringTag$5;
  var inheritIfRequired = inheritIfRequired$1;

  var collection$2 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$5[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine$1(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject$7(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject$7(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject$7(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced(
      CONSTRUCTOR_NAME,
      typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails$7(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule$1.REQUIRED = true;
    } else if (isForced(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$7(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$7(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$2(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate$2(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$c({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag$1(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var classof = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$3 = Array.isArray || function isArray(arg) {
    return classof(arg) == 'Array';
  };

  var isObject$6 = isObject$h;
  var isArray$2 = isArray$3;
  var wellKnownSymbol$5 = wellKnownSymbol$i;

  var SPECIES$1 = wellKnownSymbol$5('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$3 = function (originalArray, length) {
    var C;
    if (isArray$2(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;
      else if (isObject$6(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind$2 = functionBindContext;
  var IndexedObject$1 = indexedObject;
  var toObject$4 = toObject$7;
  var toLength$2 = toLength$5;
  var arraySpeciesCreate$2 = arraySpeciesCreate$3;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$4($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$2(callbackfn, that, 3);
      var length = toLength$2(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$2;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
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
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterOut
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
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod(7)
  };

  var redefineAll$2 = redefineAll$4;
  var getWeakData = internalMetadata.exports.getWeakData;
  var anObject$2 = anObject$c;
  var isObject$5 = isObject$h;
  var anInstance$1 = anInstance$4;
  var iterate$1 = iterate$4;
  var ArrayIterationModule = arrayIteration;
  var $has = has$c;
  var InternalStateModule$2 = internalState;

  var setInternalState$2 = InternalStateModule$2.set;
  var internalStateGetterFor$1 = InternalStateModule$2.getterFor;
  var find = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var id = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    'delete': function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    }
  };

  var collectionWeak$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$1(that, C, CONSTRUCTOR_NAME);
        setInternalState$2(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined
        });
        if (iterable != undefined) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$2(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      redefineAll$2(C.prototype, {
        // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
        // https://tc39.es/ecma262/#sec-weakset.prototype.delete
        'delete': function (key) {
          var state = getInternalState(this);
          if (!isObject$5(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && $has(data, state.id) && delete data[state.id];
        },
        // `{ WeakMap, WeakSet }.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-weakmap.prototype.has
        // https://tc39.es/ecma262/#sec-weakset.prototype.has
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$5(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && $has(data, state.id);
        }
      });

      redefineAll$2(C.prototype, IS_MAP ? {
        // `WeakMap.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.get
        get: function get(key) {
          var state = getInternalState(this);
          if (isObject$5(key)) {
            var data = getWeakData(key);
            if (data === true) return uncaughtFrozenStore(state).get(key);
            return data ? data[state.id] : undefined;
          }
        },
        // `WeakMap.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-weakmap.prototype.set
        set: function set(key, value) {
          return define(this, key, value);
        }
      } : {
        // `WeakSet.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-weakset.prototype.add
        add: function add(value) {
          return define(this, value, true);
        }
      });

      return C;
    }
  };

  var global$4 = global$n;
  var redefineAll$1 = redefineAll$4;
  var InternalMetadataModule = internalMetadata.exports;
  var collection$1 = collection$2;
  var collectionWeak = collectionWeak$1;
  var isObject$4 = isObject$h;
  var enforceIternalState = internalState.enforce;
  var NATIVE_WEAK_MAP = nativeWeakMap;

  var IS_IE11 = !global$4.ActiveXObject && 'ActiveXObject' in global$4;
  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  };

  // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor
  var $WeakMap = collection$1('WeakMap', wrapper, collectionWeak);

  // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485
  if (NATIVE_WEAK_MAP && IS_IE11) {
    InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
    InternalMetadataModule.REQUIRED = true;
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll$1(WeakMapPrototype, {
      'delete': function (key) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        } return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        } return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
        } return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject$4(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);
        return this;
      }
    });
  }

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

  var global$3 = global$n;
  var DOMIterables$1 = domIterables;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var wellKnownSymbol$4 = wellKnownSymbol$i;

  var ITERATOR = wellKnownSymbol$4('iterator');
  var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    var Collection$1 = global$3[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty$2(CollectionPrototype$1, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype$1[ITERATOR] = ArrayValues;
      }
      if (!CollectionPrototype$1[TO_STRING_TAG]) {
        createNonEnumerableProperty$2(CollectionPrototype$1, TO_STRING_TAG, COLLECTION_NAME$1);
      }
      if (DOMIterables$1[COLLECTION_NAME$1]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype$1[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$2(CollectionPrototype$1, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype$1[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  }

  var $$b = _export;
  var toObject$3 = toObject$7;
  var nativeKeys = objectKeys$2;
  var fails$6 = fails$h;

  var FAILS_ON_PRIMITIVES$1 = fails$6(function () { nativeKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  $$b({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return nativeKeys(toObject$3(it));
    }
  });

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var toIndexedObject$4 = toIndexedObject$9;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

  var toString = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$4(it));
  };

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$3 = wellKnownSymbol$i;

  wellKnownSymbolWrapped.f = wellKnownSymbol$3;

  var path = path$2;
  var has$1 = has$c;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$1 = objectDefineProperty.f;

  var defineWellKnownSymbol$1 = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has$1(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var $$a = _export;
  var global$2 = global$n;
  var getBuiltIn$1 = getBuiltIn$7;
  var DESCRIPTORS$3 = descriptors;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var fails$5 = fails$h;
  var has = has$c;
  var isArray$1 = isArray$3;
  var isObject$3 = isObject$h;
  var anObject$1 = anObject$c;
  var toObject$2 = toObject$7;
  var toIndexedObject$3 = toIndexedObject$9;
  var toPrimitive$1 = toPrimitive$4;
  var createPropertyDescriptor$1 = createPropertyDescriptor$5;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  var redefine = redefine$7.exports;
  var shared = shared$4.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys = hiddenKeys$6;
  var uid = uid$4;
  var wellKnownSymbol$2 = wellKnownSymbol$i;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol = defineWellKnownSymbol$1;
  var setToStringTag = setToStringTag$5;
  var InternalStateModule$1 = internalState;
  var $forEach$1 = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState = InternalStateModule$1.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$2.Symbol;
  var $stringify = getBuiltIn$1('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var nativeDefineProperty = definePropertyModule$1.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$2.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$3 && fails$5(function () {
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
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState$1(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$3) symbol.description = description;
    return symbol;
  };

  var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$1(O);
    var key = toPrimitive$1(P, true);
    anObject$1(Attributes);
    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$1(O);
    var properties = toIndexedObject$3(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!DESCRIPTORS$3 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive$1(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$3(O);
    var key = toPrimitive$1(P, true);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
      };
      if (DESCRIPTORS$3 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
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

    if (DESCRIPTORS$3) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
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

  $$a({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  $$a({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = String(key);
      if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  $$a({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$3 }, {
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

  $$a({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  $$a({ target: 'Object', stat: true, forced: fails$5(function () { getOwnPropertySymbolsModule.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule.f(toObject$2(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$5(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    $$a({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject$3(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!isArray$1(replacer)) replacer = function (key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty$1($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys[HIDDEN] = true;

  var fails$4 = fails$h;
  var wellKnownSymbol$1 = wellKnownSymbol$i;
  var V8_VERSION$1 = engineV8Version;

  var SPECIES = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$4(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$9 = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  $$9({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$8 = _export;
  var fails$3 = fails$h;
  var toIndexedObject$2 = toIndexedObject$9;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var DESCRIPTORS$2 = descriptors;

  var FAILS_ON_PRIMITIVES = fails$3(function () { nativeGetOwnPropertyDescriptor(1); });
  var FORCED$2 = !DESCRIPTORS$2 || FAILS_ON_PRIMITIVES;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  $$8({ target: 'Object', stat: true, forced: FORCED$2, sham: !DESCRIPTORS$2 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject$2(it), key);
    }
  });

  var fails$2 = fails$h;

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

  var global$1 = global$n;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty = createNonEnumerableProperty$9;

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  }

  var toPrimitive = toPrimitive$4;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$5;

  var createProperty$3 = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var $$7 = _export;
  var DESCRIPTORS$1 = descriptors;
  var ownKeys$3 = ownKeys$5;
  var toIndexedObject$1 = toIndexedObject$9;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var createProperty$2 = createProperty$3;

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  $$7({ target: 'Object', stat: true, sham: !DESCRIPTORS$1 }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject$1(object);
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      var keys = ownKeys$3(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty$2(result, key, descriptor);
      }
      return result;
    }
  });

  var css_248z = "@charset \"UTF-8\";.ft-toast-container{position:fixed;z-index:5000}.ft-toast-container.is-above{transform:translate(-50%,-100%)}.ft-toast-container.is-center{transform:translate(-50%,-50%)}.ft-toast-container.is-bottom-center,.ft-toast-container.is-top-center{transform:translate(-50%)}.ft-toast{padding:14px 15px;width:auto;border-radius:4px;box-shadow:0 9px 16px 8px rgba(0,0,0,.03),0 6px 10px 0 rgba(0,0,0,.06),0 3px 6px -3px rgba(0,0,0,.12);background:#fff;line-height:1.5;display:block;position:relative}.ft-toast+.ft-toast{margin-top:10px}.ft-toast-body{display:flex;align-items:center;font-size:0}.ft-toast-icon{font-size:32px;line-height:1}.ft-toast-content{font-size:16px;line-height:1.5}.ft-toast .ft-toast-icon+.ft-toast-content{margin-left:10px}.ft-toast-closable{padding-right:20px}.ft-toast-close{position:absolute;right:5px;top:3px;color:#000;cursor:pointer;outline:none;font-size:16px;font-weight:700;line-height:1;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2;text-decoration:none}.ft-toast-close-x:after{content:\"×\"}.ft-toast-close:hover{opacity:1;filter:alpha(opacity=100);text-decoration:none}.ft-toast.is-info .ft-toast-icon{color:#2e8ae6}.ft-toast.is-success .ft-toast-icon{color:#13bf13}.ft-toast.is-warning .ft-toast-icon{color:#ff9500}.ft-toast.is-error .ft-toast-icon{color:#e64545}.ft-toast-fade-appear,.ft-toast-fade-enter,.ft-toast-fade-leave{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:cubic-bezier(.55,0,.55,.2);animation-timing-function:cubic-bezier(.55,0,.55,.2)}.ft-toast-fade-appear,.ft-toast-fade-enter{opacity:0;-webkit-animation-play-state:paused;animation-play-state:paused}.ft-toast-fade-leave{-webkit-animation-play-state:paused;animation-play-state:paused}.ft-toast-fade-appear.ft-toast-fade-appear-active,.ft-toast-fade-enter.ft-toast-fade-enter-active{-webkit-animation-name:RcToastFadeIn;animation-name:RcToastFadeIn;-webkit-animation-play-state:running;animation-play-state:running}.ft-toast-fade-leave.ft-toast-fade-leave-active{-webkit-animation-name:RcToastFadeOut;animation-name:RcToastFadeOut;-webkit-animation-play-state:running;animation-play-state:running}@-webkit-keyframes RcToastFadeIn{0%{opacity:0}to{opacity:1}}@keyframes RcToastFadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes RcToastFadeOut{0%{opacity:1}to{opacity:0}}@keyframes RcToastFadeOut{0%{opacity:1}to{opacity:0}}";
  styleInject(css_248z, {id: "future-toast-2.0.0"});

  var aFunction$1 = aFunction$6;
  var isObject$2 = isObject$h;

  var slice = [].slice;
  var factories = {};

  var construct = function (C, argsLength, args) {
    if (!(argsLength in factories)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
      factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
    } return factories[argsLength](C, args);
  };

  // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind
  var functionBind = Function.bind || function bind(that /* , ...args */) {
    var fn = aFunction$1(this);
    var partArgs = slice.call(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = partArgs.concat(slice.call(arguments));
      return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
    };
    if (isObject$2(fn.prototype)) boundFunction.prototype = fn.prototype;
    return boundFunction;
  };

  var $$6 = _export;
  var getBuiltIn = getBuiltIn$7;
  var aFunction = aFunction$6;
  var anObject = anObject$c;
  var isObject$1 = isObject$h;
  var create$1 = objectCreate;
  var bind$1 = functionBind;
  var fails$1 = fails$h;

  var nativeConstruct = getBuiltIn('Reflect', 'construct');

  // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails$1(function () {
    function F() { /* empty */ }
    return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
  });
  var ARGS_BUG = !fails$1(function () {
    nativeConstruct(function () { /* empty */ });
  });
  var FORCED$1 = NEW_TARGET_BUG || ARGS_BUG;

  $$6({ target: 'Reflect', stat: true, forced: FORCED$1, sham: FORCED$1 }, {
    construct: function construct(Target, args /* , newTarget */) {
      aFunction(Target);
      anObject(args);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind$1.apply(Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = create$1(isObject$1(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return isObject$1(result) ? result : instance;
    }
  });

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var $$5 = _export;
  var fails = fails$h;
  var isArray = isArray$3;
  var isObject = isObject$h;
  var toObject$1 = toObject$7;
  var toLength$1 = toLength$5;
  var createProperty$1 = createProperty$3;
  var arraySpeciesCreate$1 = arraySpeciesCreate$3;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
  var wellKnownSymbol = wellKnownSymbol$i;
  var V8_VERSION = engineV8Version;

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$5({ target: 'Array', proto: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$1(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength$1(E.length);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$1(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var defineProperty = objectDefineProperty.f;
  var create = objectCreate;
  var redefineAll = redefineAll$4;
  var bind = functionBindContext;
  var anInstance = anInstance$4;
  var iterate = iterate$4;
  var defineIterator = defineIterator$3;
  var setSpecies = setSpecies$2;
  var DESCRIPTORS = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule = internalState;

  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;

  var collectionStrong$1 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS) state.size = 0;
          else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS) state.size--;
            else that.size--;
          } return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  var collection = collection$2;
  var collectionStrong = collectionStrong$1;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var $$4 = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$3 = _export;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var toInteger = toInteger$4;
  var toLength = toLength$5;
  var toObject = toObject$7;
  var arraySpeciesCreate = arraySpeciesCreate$3;
  var createProperty = createProperty$3;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  var max = Math.max;
  var min = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var n,u$1,i$1,t$1,o$1,r$1={},f$1=[],e$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c$1(n,l){for(var u in l)n[u]=l[u];return n}function s$1(n){var l=n.parentNode;l&&l.removeChild(n);}function a$1(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v$1(n,f,i,t,null)}function v$1(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function h$1(){return {current:null}}function y$1(n){return n.children}function p$1(n,l){this.props=n,this.context=l;}function d$1(n,l){if(null==l)return n.__?d$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?d$1(n):null}function _$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _$1(n)}}function k$2(l){(!l.__d&&(l.__d=!0)&&u$1.push(l)&&!b$1.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$1)(b$1);}function b$1(){for(var n;b$1.__r=u$1.length;)n=u$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),u$1=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c$1({},t)).__v=t.__v+1,I$1(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d$1(t):o,t.__h),T$2(u,t),t.__e!=o&&_$1(t)));});}function m$1(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f$1,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v$1(null,k,null,null,k):Array.isArray(k)?v$1(y$1,{children:k},null,null,null):k.__b>0?v$1(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null;}I$1(n,k,_=_||r$1,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g$2(k,s,n):s=x$2(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d$1(_));}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d$1(i,h+1)),L$1(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z$1(w[h],w[++h],w[++h]);}function g$2(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g$2(t,l,u):x$2(u,t,t,n.__k,t.__e,l));return l}function w$2(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w$2(n,l);}):l.push(n)),l}function x$2(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else {for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function A$2(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C$1(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C$1(n,o,l[o],u[o],i);}function P$1(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e$1.test(l)?u:u+"px";}function C$1(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P$1(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P$1(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H$1:$$2,o):n.removeEventListener(l,o?H$1:$$2,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function $$2(l){this.l[l.type+!1](n.event?n.event(l):l);}function H$1(l){this.l[l.type+!0](n.event?n.event(l):l);}function I$1(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p$1(g,x),v.constructor=P,v.render=M$1),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c$1({},v.__s)),c$1(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k);});}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c$1(c$1({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y$1&&null==a.key?a.props.children:a,m$1(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j$2(i.__e,u,i,t,o,r,f,s);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),n.__e(l,u,i);}}function T$2(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function j$2(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1;}if(null===_)p===d||c&&n.data===d||(n.data=d);else {if(o=o&&f$1.slice.call(n.childNodes),v=(p=u.props||r$1).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""));}if(A$2(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m$1(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s$1(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C$1(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C$1(n,"checked",k,p.checked,!1));}return n}function z$1(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L$1(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z$1(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L$1(t[r],u,i);null!=o&&s$1(o);}function M$1(n,l,u){return this.constructor(n,u)}function N$1(l,u,i){var t,o,e;n.__&&n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I$1(u,l=(!t&&i||u).__k=a$1(y$1,null,[l]),o||r$1,r$1,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f$1.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T$2(e,l);}function O$1(n,l){N$1(n,l,O$1);}function S$1(n,l,u){var i,t,o,r=arguments,f=c$1({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v$1(n.type,f,i||n.key,t||n.ref,null)}function q$1(n,l){var u={__c:l="__cC"+o$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k$2);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n},__v:0},p$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c$1({},this.state),"function"==typeof n&&(n=n(c$1({},u),this.props)),n&&c$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k$2(this));},p$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k$2(this));},p$1.prototype.render=y$1,u$1=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b$1.__r=0,o$1=0;

  var t,u,r,o=0,i=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(t,r){n.__h&&n.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w$1,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w$1(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function h(r,o){var i=m(t++,4);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function _(n,t,u){o=6,h(function(){"function"==typeof n?n(t()):n&&(n.current=t());},null==u?u:u.concat(n));}function d(n,u){var r=m(t++,7);return k$1(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A$1(n,t){return o=8,d(function(){return n},t)}function F$1(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T$1(t,u){n.useDebugValue&&n.useDebugValue(u?u(t):t);}function x$1(){i.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g$1),t.__H.__h.forEach(j$1),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i=[];}n.__b=function(n){u=null,c&&c(n);},n.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g$1),r.__h.forEach(j$1),r.__h=[]);},n.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x$1)),u=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g$1),t.__h=t.__h.filter(function(n){return !n.__||j$1(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a&&a(t,u);},n.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g$1);}catch(t){n.__e(t,u.__v);}};var b="function"==typeof requestAnimationFrame;function g$1(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t;}function j$1(n){var t=u;n.__c=n.__(),u=t;}function k$1(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w$1(n,t){return "function"==typeof t?t(n):t}

  function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function E(n){this.props=n;}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,a$1(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new p$1).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=n.__b;n.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t,e){var r=C({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:w$2(w$2(n).map(t))},k={map:N,forEach:N,count:function(n){return n?w$2(n).length:0},only:function(n){var t=w$2(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:w$2},A=n.__e;n.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);A(n,t,e);};var O=n.unmount;function L(){this.__u=0,this.t=null,this.__b=null;}function U(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function D(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return a$1(e,u)}return u.displayName="Lazy",u.__f=!0,u}function F(){this.u=null,this.o=null;}n.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),O&&O(n);},(L.prototype=new p$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate();}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P);}this.__b=null;}var u=t.__e&&a$1(y$1,null,n.fallback);return u&&(u.__h=null),[a$1(y$1,null,t.__e?null:n.children),u]};var M=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function T(n){return this.getChildContext=function(){return n.context},n.children}function j(n){var t=this,e=n.i;t.componentWillUnmount=function(){N$1(null,t.l),t.l=null,t.i=null;},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n);},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n);}}),N$1(a$1(T,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount();}function I(n,t){return a$1(j,{__v:n,i:t})}(F.prototype=new p$1).__e=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),M(t,n,r)):u();};e?e(o):o();}},F.prototype.render=function(n){this.u=null,this.o=new Map;var t=w$2(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},F.prototype.componentDidUpdate=F.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){M(n,e,t);});};var W="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,P=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,V=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function z(n,t,e){return null==t.__k&&(t.textContent=""),N$1(n,t),"function"==typeof e&&e(),n?n.__c:null}function B(n,t,e){return O$1(n,t),"function"==typeof e&&e(),n?n.__c:null}p$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(p$1.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var H=n.event;function Z(){}function Y(){return this.cancelBubble}function $$1(){return this.defaultPrevented}n.event=function(n){return H&&(n=H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=$$1,n.nativeEvent=n};var q,G={configurable:!0,get:function(){return this.class}},J=n.vnode;n.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"value"===u&&"defaultValue"in e&&null==o||("defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!V(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():P.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o);}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),"select"==t&&null!=r.defaultValue&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value;})),n.props=r;}t&&e.class!=e.className&&(G.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",G)),n.$$typeof=W,J&&J(n);};var K=n.__r;n.__r=function(n){K&&K(n),q=n.__c;};var Q={ReactCurrentDispatcher:{current:{readContext:function(n){return q.__n[n.__c].props.value}}}};"object"==typeof performance&&"function"==typeof performance.now?performance.now.bind(performance):function(){return Date.now()};function fn(n){return a$1.bind(null,n)}function cn(n){return !!n&&n.$$typeof===W}function an(n){return cn(n)?S$1.apply(null,arguments):n}function sn(n){return !!n.__k&&(N$1(null,n),!0)}function hn(n){return n&&(n.base||1===n.nodeType&&n)||null}var pn=function(n,t){return n(t)};var ReactDOM = {useState:l,useReducer:p,useEffect:y,useLayoutEffect:h,useRef:s,useImperativeHandle:_,useMemo:d,useCallback:A$1,useContext:F$1,useDebugValue:T$1,version:"16.8.0",Children:k,render:z,hydrate:B,unmountComponentAtNode:sn,createPortal:I,createElement:a$1,createContext:q$1,createFactory:fn,cloneElement:an,createRef:h$1,Fragment:y$1,isValidElement:cn,findDOMNode:hn,Component:p$1,PureComponent:E,memo:g,forwardRef:x,unstable_batchedUpdates:pn,StrictMode:y$1,Suspense:L,SuspenseList:F,lazy:D,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Q};

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

  function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$2(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  /**
   * Return if a node is a DOM node. Else will return by `findDOMNode`
   */

  function findDOMNode(node) {
    if (node instanceof HTMLElement) {
      return node;
    }

    return ReactDOM.findDOMNode(node);
  }

  function fillRef(ref, node) {
    if (typeof ref === 'function') {
      ref(node);
    } else if (_typeof(ref) === 'object' && ref && 'current' in ref) {
      ref.current = node;
    }
  }
  /* eslint-enable */

  function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

  // Event wrapper. Copy from react source code

  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit".concat(styleProp)] = "webkit".concat(eventName);
    prefixes["Moz".concat(styleProp)] = "moz".concat(eventName);
    prefixes["ms".concat(styleProp)] = "MS".concat(eventName);
    prefixes["O".concat(styleProp)] = "o".concat(eventName.toLowerCase());
    return prefixes;
  }

  function getVendorPrefixes(domSupport, win) {
    var prefixes = {
      animationend: makePrefixMap('Animation', 'AnimationEnd'),
      transitionend: makePrefixMap('Transition', 'TransitionEnd')
    };

    if (domSupport) {
      if (!('AnimationEvent' in win)) {
        delete prefixes.animationend.animation;
      }

      if (!('TransitionEvent' in win)) {
        delete prefixes.transitionend.transition;
      }
    }

    return prefixes;
  }
  var vendorPrefixes = getVendorPrefixes(canUseDom(), typeof window !== 'undefined' ? window : {});
  var style = {};

  if (canUseDom()) {
    var _document$createEleme = document.createElement('div');

    style = _document$createEleme.style;
  }

  var prefixedEventNames = {};
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
      return prefixedEventNames[eventName];
    }

    var prefixMap = vendorPrefixes[eventName];

    if (prefixMap) {
      var stylePropList = Object.keys(prefixMap);
      var len = stylePropList.length;

      for (var i = 0; i < len; i += 1) {
        var styleProp = stylePropList[i];

        if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
          prefixedEventNames[eventName] = prefixMap[styleProp];
          return prefixedEventNames[eventName];
        }
      }
    }

    return '';
  }
  var internalAnimationEndName = getVendorPrefixedEventName('animationend');
  var internalTransitionEndName = getVendorPrefixedEventName('transitionend');
  var supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
  var animationEndName = internalAnimationEndName || 'animationend';
  var transitionEndName = internalTransitionEndName || 'transitionend';
  function getTransitionName(transitionName, transitionType) {
    if (!transitionName) return null;

    if (_typeof(transitionName) === 'object') {
      var type = transitionType.replace(/-\w/g, function (match) {
        return match[1].toUpperCase();
      });
      return transitionName[type];
    }

    return "".concat(transitionName, "-").concat(transitionType);
  }

  var STATUS_NONE = 'none';
  var STATUS_APPEAR = 'appear';
  var STATUS_ENTER = 'enter';
  var STATUS_LEAVE = 'leave';
  var STEP_NONE = 'none';
  var STEP_PREPARE = 'prepare';
  var STEP_START = 'start';
  var STEP_ACTIVE = 'active';
  var STEP_ACTIVATED = 'end';

  function useMountStatus(defaultValue) {
    var destroyRef = s(false);

    var _useState = l(defaultValue),
        _useState2 = _slicedToArray(_useState, 2),
        val = _useState2[0],
        setVal = _useState2[1];

    function setValue(next) {
      if (!destroyRef.current) {
        setVal(next);
      }
    }

    y(function () {
      return function () {
        destroyRef.current = true;
      };
    }, []);
    return [val, setValue];
  }

  var useIsomorphicLayoutEffect = canUseDom() ? h : y;

  var raf = function raf(callback) {
    return +setTimeout(callback, 16);
  };

  var caf = function caf(num) {
    return clearTimeout(num);
  };

  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    raf = function raf(callback) {
      return window.requestAnimationFrame(callback);
    };

    caf = function caf(handle) {
      return window.cancelAnimationFrame(handle);
    };
  }

  var rafUUID = 0;
  var rafIds = new Map();

  function cleanup(id) {
    rafIds.delete(id);
  }

  function wrapperRaf(callback) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    rafUUID += 1;
    var id = rafUUID;

    function callRef(leftTimes) {
      if (leftTimes === 0) {
        // Clean up
        cleanup(id); // Trigger

        callback();
      } else {
        // Next raf
        var realId = raf(function () {
          callRef(leftTimes - 1);
        }); // Bind real raf id

        rafIds.set(id, realId);
      }
    }

    callRef(times);
    return id;
  }

  wrapperRaf.cancel = function (id) {
    var realId = rafIds.get(id);
    cleanup(realId);
    return caf(realId);
  };

  var useNextFrame = (function () {
    var nextFrameRef = s(null);

    function cancelNextFrame() {
      wrapperRaf.cancel(nextFrameRef.current);
    }

    function nextFrame(callback) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      cancelNextFrame();
      var nextFrameId = wrapperRaf(function () {
        if (delay <= 1) {
          callback({
            isCanceled: function isCanceled() {
              return nextFrameId !== nextFrameRef.current;
            }
          });
        } else {
          nextFrame(callback, delay - 1);
        }
      });
      nextFrameRef.current = nextFrameId;
    }

    y(function () {
      return function () {
        cancelNextFrame();
      };
    }, []);
    return [nextFrame, cancelNextFrame];
  });

  var STEP_QUEUE = [STEP_PREPARE, STEP_START, STEP_ACTIVE, STEP_ACTIVATED];
  /** Skip current step */

  var SkipStep = false;
  /** Current step should be update in */

  var DoStep = true;
  function isActive(step) {
    return step === STEP_ACTIVE || step === STEP_ACTIVATED;
  }
  var useStepQueue = (function (status, callback) {
    var _React$useState = l(STEP_NONE),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        step = _React$useState2[0],
        setStep = _React$useState2[1];

    var _useNextFrame = useNextFrame(),
        _useNextFrame2 = _slicedToArray(_useNextFrame, 2),
        nextFrame = _useNextFrame2[0],
        cancelNextFrame = _useNextFrame2[1];

    function startQueue() {
      setStep(STEP_PREPARE);
    }

    useIsomorphicLayoutEffect(function () {
      if (step !== STEP_NONE && step !== STEP_ACTIVATED) {
        var index = STEP_QUEUE.indexOf(step);
        var nextStep = STEP_QUEUE[index + 1];
        var result = callback(step);

        if (result === SkipStep) {
          // Skip when no needed
          setStep(nextStep);
        } else {
          // Do as frame for step update
          nextFrame(function (info) {
            function doNext() {
              // Skip since current queue is ood
              if (info.isCanceled()) return;
              setStep(nextStep);
            }

            if (result === true) {
              doNext();
            } else {
              // Only promise should be async
              Promise.resolve(result).then(doNext);
            }
          });
        }
      }
    }, [status, step]);
    y(function () {
      return function () {
        cancelNextFrame();
      };
    }, []);
    return [startQueue, step];
  });

  var useDomMotionEvents = (function (callback) {
    var cacheElementRef = s(); // Cache callback

    var callbackRef = s(callback);
    callbackRef.current = callback; // Internal motion event handler

    var onInternalMotionEnd = A$1(function (event) {
      callbackRef.current(event);
    }, []); // Remove events

    function removeMotionEvents(element) {
      if (element) {
        element.removeEventListener(transitionEndName, onInternalMotionEnd);
        element.removeEventListener(animationEndName, onInternalMotionEnd);
      }
    } // Patch events


    function patchMotionEvents(element) {
      if (cacheElementRef.current && cacheElementRef.current !== element) {
        removeMotionEvents(cacheElementRef.current);
      }

      if (element && element !== cacheElementRef.current) {
        element.addEventListener(transitionEndName, onInternalMotionEnd);
        element.addEventListener(animationEndName, onInternalMotionEnd); // Save as cache in case dom removed trigger by `motionDeadline`

        cacheElementRef.current = element;
      }
    } // Clean up when removed


    y(function () {
      return function () {
        removeMotionEvents(cacheElementRef.current);
      };
    }, []);
    return [patchMotionEvents, removeMotionEvents];
  });

  function useStatus(supportMotion, visible, getElement, _ref) {
    var _ref$motionEnter = _ref.motionEnter,
        motionEnter = _ref$motionEnter === void 0 ? true : _ref$motionEnter,
        _ref$motionAppear = _ref.motionAppear,
        motionAppear = _ref$motionAppear === void 0 ? true : _ref$motionAppear,
        _ref$motionLeave = _ref.motionLeave,
        motionLeave = _ref$motionLeave === void 0 ? true : _ref$motionLeave,
        motionDeadline = _ref.motionDeadline,
        motionLeaveImmediately = _ref.motionLeaveImmediately,
        onAppearPrepare = _ref.onAppearPrepare,
        onEnterPrepare = _ref.onEnterPrepare,
        onLeavePrepare = _ref.onLeavePrepare,
        onAppearStart = _ref.onAppearStart,
        onEnterStart = _ref.onEnterStart,
        onLeaveStart = _ref.onLeaveStart,
        onAppearActive = _ref.onAppearActive,
        onEnterActive = _ref.onEnterActive,
        onLeaveActive = _ref.onLeaveActive,
        onAppearEnd = _ref.onAppearEnd,
        onEnterEnd = _ref.onEnterEnd,
        onLeaveEnd = _ref.onLeaveEnd,
        onVisibleChanged = _ref.onVisibleChanged;

    // Used for outer render usage to avoid `visible: false & status: none` to render nothing
    var _useState = useMountStatus(),
        _useState2 = _slicedToArray(_useState, 2),
        asyncVisible = _useState2[0],
        setAsyncVisible = _useState2[1];

    var _useState3 = useMountStatus(STATUS_NONE),
        _useState4 = _slicedToArray(_useState3, 2),
        status = _useState4[0],
        setStatus = _useState4[1];

    var _useState5 = useMountStatus(null),
        _useState6 = _slicedToArray(_useState5, 2),
        style = _useState6[0],
        setStyle = _useState6[1];

    var mountedRef = s(false);
    var deadlineRef = s(null);
    var destroyedRef = s(false); // =========================== Dom Node ===========================

    var cacheElementRef = s(null);

    function getDomElement() {
      var element = getElement();
      return element || cacheElementRef.current;
    } // ========================== Motion End ==========================


    var activeRef = s(false);

    function onInternalMotionEnd(event) {
      var element = getDomElement();

      if (event && !event.deadline && event.target !== element) {
        // event exists
        // not initiated by deadline
        // transitionEnd not fired by inner elements
        return;
      }

      var canEnd;

      if (status === STATUS_APPEAR && activeRef.current) {
        canEnd = onAppearEnd === null || onAppearEnd === void 0 ? void 0 : onAppearEnd(element, event);
      } else if (status === STATUS_ENTER && activeRef.current) {
        canEnd = onEnterEnd === null || onEnterEnd === void 0 ? void 0 : onEnterEnd(element, event);
      } else if (status === STATUS_LEAVE && activeRef.current) {
        canEnd = onLeaveEnd === null || onLeaveEnd === void 0 ? void 0 : onLeaveEnd(element, event);
      } // Only update status when `canEnd` and not destroyed


      if (canEnd !== false && !destroyedRef.current) {
        setStatus(STATUS_NONE);
        setStyle(null);
      }
    }

    var _useDomMotionEvents = useDomMotionEvents(onInternalMotionEnd),
        _useDomMotionEvents2 = _slicedToArray(_useDomMotionEvents, 1),
        patchMotionEvents = _useDomMotionEvents2[0]; // ============================= Step =============================


    var eventHandlers = d(function () {
      var _ref2, _ref3, _ref4;

      switch (status) {
        case 'appear':
          return _ref2 = {}, _defineProperty(_ref2, STEP_PREPARE, onAppearPrepare), _defineProperty(_ref2, STEP_START, onAppearStart), _defineProperty(_ref2, STEP_ACTIVE, onAppearActive), _ref2;

        case 'enter':
          return _ref3 = {}, _defineProperty(_ref3, STEP_PREPARE, onEnterPrepare), _defineProperty(_ref3, STEP_START, onEnterStart), _defineProperty(_ref3, STEP_ACTIVE, onEnterActive), _ref3;

        case 'leave':
          return _ref4 = {}, _defineProperty(_ref4, STEP_PREPARE, onLeavePrepare), _defineProperty(_ref4, STEP_START, onLeaveStart), _defineProperty(_ref4, STEP_ACTIVE, onLeaveActive), _ref4;

        default:
          return {};
      }
    }, [status]);

    var _useStepQueue = useStepQueue(status, function (newStep) {
      // Only prepare step can be skip
      if (newStep === STEP_PREPARE) {
        var onPrepare = eventHandlers[STEP_PREPARE];

        if (!onPrepare) {
          return SkipStep;
        }

        return onPrepare(getDomElement());
      } // Rest step is sync update


      // Rest step is sync update
      if (step in eventHandlers) {
        var _eventHandlers$step;

        setStyle(((_eventHandlers$step = eventHandlers[step]) === null || _eventHandlers$step === void 0 ? void 0 : _eventHandlers$step.call(eventHandlers, getDomElement(), null)) || null);
      }

      if (step === STEP_ACTIVE) {
        // Patch events when motion needed
        patchMotionEvents(getDomElement());

        if (motionDeadline > 0) {
          clearTimeout(deadlineRef.current);
          deadlineRef.current = setTimeout(function () {
            onInternalMotionEnd({
              deadline: true
            });
          }, motionDeadline);
        }
      }

      return DoStep;
    }),
        _useStepQueue2 = _slicedToArray(_useStepQueue, 2),
        startStep = _useStepQueue2[0],
        step = _useStepQueue2[1];

    var active = isActive(step);
    activeRef.current = active; // ============================ Status ============================
    // Update with new status

    useIsomorphicLayoutEffect(function () {
      setAsyncVisible(visible);
      var isMounted = mountedRef.current;
      mountedRef.current = true;

      if (!supportMotion) {
        return;
      }

      var nextStatus; // Appear

      if (!isMounted && visible && motionAppear) {
        nextStatus = STATUS_APPEAR;
      } // Enter


      if (isMounted && visible && motionEnter) {
        nextStatus = STATUS_ENTER;
      } // Leave


      if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
        nextStatus = STATUS_LEAVE;
      } // Update to next status


      if (nextStatus) {
        setStatus(nextStatus);
        startStep();
      }
    }, [visible]); // ============================ Effect ============================
    // Reset when motion changed

    y(function () {
      if ( // Cancel appear
      status === STATUS_APPEAR && !motionAppear || // Cancel enter
      status === STATUS_ENTER && !motionEnter || // Cancel leave
      status === STATUS_LEAVE && !motionLeave) {
        setStatus(STATUS_NONE);
      }
    }, [motionAppear, motionEnter, motionLeave]);
    y(function () {
      return function () {
        clearTimeout(deadlineRef.current);
        destroyedRef.current = true;
      };
    }, []); // Trigger `onVisibleChanged`

    y(function () {
      if (asyncVisible !== undefined && status === STATUS_NONE) {
        onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(asyncVisible);
      }
    }, [asyncVisible, status]); // ============================ Styles ============================

    var mergedStyle = style;

    if (eventHandlers[STEP_PREPARE] && step === STEP_START) {
      mergedStyle = _objectSpread2({
        transition: 'none'
      }, mergedStyle);
    }

    return [status, step, mergedStyle, asyncVisible !== null && asyncVisible !== void 0 ? asyncVisible : visible];
  }

  function _isNativeReflectConstruct$2() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _createSuper$2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var DomWrapper = /*#__PURE__*/function (_React$Component) {
    _inherits(DomWrapper, _React$Component);

    var _super = _createSuper$2(DomWrapper);

    function DomWrapper() {
      _classCallCheck(this, DomWrapper);

      return _super.apply(this, arguments);
    }

    _createClass(DomWrapper, [{
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return DomWrapper;
  }(p$1);

  /**
   * `transitionSupport` is used for none transition test case.
   * Default we use browser transition event support check.
   */

  function genCSSMotion(config) {
    var transitionSupport = config;

    if (_typeof(config) === 'object') {
      transitionSupport = config.transitionSupport;
    }

    function isSupportTransition(props) {
      return !!(props.motionName && transitionSupport);
    }

    var CSSMotion = /*#__PURE__*/x(function (props, ref) {
      var _props$visible = props.visible,
          visible = _props$visible === void 0 ? true : _props$visible,
          _props$removeOnLeave = props.removeOnLeave,
          removeOnLeave = _props$removeOnLeave === void 0 ? true : _props$removeOnLeave,
          forceRender = props.forceRender,
          children = props.children,
          motionName = props.motionName,
          leavedClassName = props.leavedClassName,
          eventProps = props.eventProps;
      var supportMotion = isSupportTransition(props); // Ref to the react node, it may be a HTMLElement

      var nodeRef = s(); // Ref to the dom wrapper in case ref can not pass to HTMLElement

      var wrapperNodeRef = s();

      function getDomElement() {
        try {
          return findDOMNode(nodeRef.current || wrapperNodeRef.current);
        } catch (e) {
          // Only happen when `motionDeadline` trigger but element removed.
          return null;
        }
      }

      var _useStatus = useStatus(supportMotion, visible, getDomElement, props),
          _useStatus2 = _slicedToArray(_useStatus, 4),
          status = _useStatus2[0],
          statusStep = _useStatus2[1],
          statusStyle = _useStatus2[2],
          mergedVisible = _useStatus2[3]; // Record whether content has rended
      // Will return null for un-rendered even when `removeOnLeave={false}`


      var renderedRef = s(mergedVisible);

      if (mergedVisible) {
        renderedRef.current = true;
      } // ====================== Refs ======================


      var originRef = s(ref);
      originRef.current = ref;
      var setNodeRef = A$1(function (node) {
        nodeRef.current = node;
        fillRef(originRef.current, node);
      }, []); // ===================== Render =====================

      var motionChildren;

      var mergedProps = _objectSpread2(_objectSpread2({}, eventProps), {}, {
        visible: visible
      });

      if (!children) {
        // No children
        motionChildren = null;
      } else if (status === STATUS_NONE || !isSupportTransition(props)) {
        // Stable children
        if (mergedVisible) {
          motionChildren = children(_objectSpread2({}, mergedProps), setNodeRef);
        } else if (!removeOnLeave && renderedRef.current) {
          motionChildren = children(_objectSpread2(_objectSpread2({}, mergedProps), {}, {
            className: leavedClassName
          }), setNodeRef);
        } else if (forceRender) {
          motionChildren = children(_objectSpread2(_objectSpread2({}, mergedProps), {}, {
            style: {
              display: 'none'
            }
          }), setNodeRef);
        } else {
          motionChildren = null;
        }
      } else {
        var _classNames;

        // In motion
        var statusSuffix;

        if (statusStep === STEP_PREPARE) {
          statusSuffix = 'prepare';
        } else if (isActive(statusStep)) {
          statusSuffix = 'active';
        } else if (statusStep === STEP_START) {
          statusSuffix = 'start';
        }

        motionChildren = children(_objectSpread2(_objectSpread2({}, mergedProps), {}, {
          className: classNames(getTransitionName(motionName, status), (_classNames = {}, _defineProperty(_classNames, getTransitionName(motionName, "".concat(status, "-").concat(statusSuffix)), statusSuffix), _defineProperty(_classNames, motionName, typeof motionName === 'string'), _classNames)),
          style: statusStyle
        }), setNodeRef);
      }

      return /*#__PURE__*/a$1(DomWrapper, {
        ref: wrapperNodeRef
      }, motionChildren);
    });
    CSSMotion.displayName = 'CSSMotion';
    return CSSMotion;
  }
  var CSSMotion = genCSSMotion(supportTransition);

  var STATUS_ADD = 'add';
  var STATUS_KEEP = 'keep';
  var STATUS_REMOVE = 'remove';
  var STATUS_REMOVED = 'removed';
  function wrapKeyToObject(key) {
    var keyObj;

    if (key && _typeof(key) === 'object' && 'key' in key) {
      keyObj = key;
    } else {
      keyObj = {
        key: key
      };
    }

    return _objectSpread2(_objectSpread2({}, keyObj), {}, {
      key: String(keyObj.key)
    });
  }
  function parseKeys() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return keys.map(wrapKeyToObject);
  }
  function diffKeys() {
    var prevKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var currentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var list = [];
    var currentIndex = 0;
    var currentLen = currentKeys.length;
    var prevKeyObjects = parseKeys(prevKeys);
    var currentKeyObjects = parseKeys(currentKeys); // Check prev keys to insert or keep

    prevKeyObjects.forEach(function (keyObj) {
      var hit = false;

      for (var i = currentIndex; i < currentLen; i += 1) {
        var currentKeyObj = currentKeyObjects[i];

        if (currentKeyObj.key === keyObj.key) {
          // New added keys should add before current key
          if (currentIndex < i) {
            list = list.concat(currentKeyObjects.slice(currentIndex, i).map(function (obj) {
              return _objectSpread2(_objectSpread2({}, obj), {}, {
                status: STATUS_ADD
              });
            }));
            currentIndex = i;
          }

          list.push(_objectSpread2(_objectSpread2({}, currentKeyObj), {}, {
            status: STATUS_KEEP
          }));
          currentIndex += 1;
          hit = true;
          break;
        }
      } // If not hit, it means key is removed


      if (!hit) {
        list.push(_objectSpread2(_objectSpread2({}, keyObj), {}, {
          status: STATUS_REMOVE
        }));
      }
    }); // Add rest to the list

    if (currentIndex < currentLen) {
      list = list.concat(currentKeyObjects.slice(currentIndex).map(function (obj) {
        return _objectSpread2(_objectSpread2({}, obj), {}, {
          status: STATUS_ADD
        });
      }));
    }
    /**
     * Merge same key when it remove and add again:
     *    [1 - add, 2 - keep, 1 - remove] -> [1 - keep, 2 - keep]
     */


    var keys = {};
    list.forEach(function (_ref) {
      var key = _ref.key;
      keys[key] = (keys[key] || 0) + 1;
    });
    var duplicatedKeys = Object.keys(keys).filter(function (key) {
      return keys[key] > 1;
    });
    duplicatedKeys.forEach(function (matchKey) {
      // Remove `STATUS_REMOVE` node.
      list = list.filter(function (_ref2) {
        var key = _ref2.key,
            status = _ref2.status;
        return key !== matchKey || status !== STATUS_REMOVE;
      }); // Update `STATUS_ADD` to `STATUS_KEEP`

      list.forEach(function (node) {
        if (node.key === matchKey) {
          // eslint-disable-next-line no-param-reassign
          node.status = STATUS_KEEP;
        }
      });
    });
    return list;
  }

  var MOTION_PROP_NAMES = ['eventProps', 'visible', 'children', 'motionName', 'motionAppear', 'motionEnter', 'motionLeave', 'motionLeaveImmediately', 'motionDeadline', 'removeOnLeave', 'leavedClassName', 'onAppearStart', 'onAppearActive', 'onAppearEnd', 'onEnterStart', 'onEnterActive', 'onEnterEnd', 'onLeaveStart', 'onLeaveActive', 'onLeaveEnd'];
  /**
   * Generate a CSSMotionList component with config
   * @param transitionSupport No need since CSSMotionList no longer depends on transition support
   * @param CSSMotion CSSMotion component
   */

  function genCSSMotionList(transitionSupport) {
    var CSSMotion$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CSSMotion;

    var CSSMotionList = /*#__PURE__*/function (_React$Component) {
      _inherits(CSSMotionList, _React$Component);

      var _super = _createSuper$2(CSSMotionList);

      function CSSMotionList() {
        var _this;

        _classCallCheck(this, CSSMotionList);

        _this = _super.apply(this, arguments);
        _this.state = {
          keyEntities: []
        };

        _this.removeKey = function (removeKey) {
          _this.setState(function (_ref) {
            var keyEntities = _ref.keyEntities;
            return {
              keyEntities: keyEntities.map(function (entity) {
                if (entity.key !== removeKey) return entity;
                return _objectSpread2(_objectSpread2({}, entity), {}, {
                  status: STATUS_REMOVED
                });
              })
            };
          });
        };

        return _this;
      }

      _createClass(CSSMotionList, [{
        key: "render",
        value: function render() {
          var _this2 = this;

          var keyEntities = this.state.keyEntities;

          var _this$props = this.props,
              component = _this$props.component,
              children = _this$props.children,
              _onVisibleChanged = _this$props.onVisibleChanged,
              restProps = _objectWithoutProperties(_this$props, ["component", "children", "onVisibleChanged"]);

          var Component = component || y$1;
          var motionProps = {};
          MOTION_PROP_NAMES.forEach(function (prop) {
            motionProps[prop] = restProps[prop];
            delete restProps[prop];
          });
          delete restProps.keys;
          return /*#__PURE__*/a$1(Component, restProps, keyEntities.map(function (_ref2) {
            var status = _ref2.status,
                eventProps = _objectWithoutProperties(_ref2, ["status"]);

            var visible = status === STATUS_ADD || status === STATUS_KEEP;
            return /*#__PURE__*/a$1(CSSMotion$1, _extends({}, motionProps, {
              key: eventProps.key,
              visible: visible,
              eventProps: eventProps,
              onVisibleChanged: function onVisibleChanged(changedVisible) {
                _onVisibleChanged === null || _onVisibleChanged === void 0 ? void 0 : _onVisibleChanged(changedVisible, {
                  key: eventProps.key
                });

                if (!changedVisible) {
                  _this2.removeKey(eventProps.key);
                }
              }
            }), children);
          }));
        }
      }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(_ref3, _ref4) {
          var keys = _ref3.keys;
          var keyEntities = _ref4.keyEntities;
          var parsedKeyObjects = parseKeys(keys);
          var mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);
          return {
            keyEntities: mixedKeyEntities.filter(function (entity) {
              var prevEntity = keyEntities.find(function (_ref5) {
                var key = _ref5.key;
                return entity.key === key;
              }); // Remove if already mark as removed

              if (prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE) {
                return false;
              }

              return true;
            })
          };
        }
      }]);

      return CSSMotionList;
    }(p$1);

    CSSMotionList.defaultProps = {
      component: 'div'
    };
    return CSSMotionList;
  }
  var CSSMotionList = genCSSMotionList(supportTransition);

  var $ = _export;
  var IndexedObject = indexedObject;
  var toIndexedObject = toIndexedObject$9;
  var arrayMethodIsStrict = arrayMethodIsStrict$2;

  var nativeJoin = [].join;

  var ES3_STRINGS = IndexedObject != Object;
  var STRICT_METHOD = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  $({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var getToastClassName = function getToastClassName(namespace) {
    return [namespace, "toast"].filter(Boolean).join("-");
  };
  var getAbovePositionStyle = function getAbovePositionStyle(above) {
    var _above$getBoundingCli = above.getBoundingClientRect(),
        left = _above$getBoundingCli.left,
        top = _above$getBoundingCli.top,
        width = _above$getBoundingCli.width;

    return {
      top: top - 20,
      left: left + Math.floor(width / 2)
    };
  };

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var Notice = /*#__PURE__*/function (_Component) {
    _inherits(Notice, _Component);

    var _super = _createSuper$1(Notice);

    function Notice() {
      var _this;

      _classCallCheck(this, Notice);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "closeTimer", null);

      _defineProperty(_assertThisInitialized(_this), "close", function (e) {
        if (e) {
          e.stopPropagation();
        }

        _this.clearCloseTimer();

        var _this$props = _this.props,
            onClose = _this$props.onClose,
            noticeKey = _this$props.noticeKey;

        if (onClose) {
          onClose(noticeKey);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "startCloseTimer", function () {
        if (_this.props.duration) {
          _this.closeTimer = window.setTimeout(function () {
            _this.close();
          }, _this.props.duration);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "clearCloseTimer", function () {
        if (_this.closeTimer) {
          clearTimeout(_this.closeTimer);
          _this.closeTimer = null;
        }
      });

      return _this;
    }

    _createClass(Notice, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.startCloseTimer();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.duration !== prevProps.duration || this.props.updateMark !== prevProps.updateMark || // Visible again need reset timer
        this.props.visible !== prevProps.visible && this.props.visible) {
          this.restartCloseTimer();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearCloseTimer();
      }
    }, {
      key: "restartCloseTimer",
      value: function restartCloseTimer() {
        this.clearCloseTimer();
        this.startCloseTimer();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
            namespace = _this$props2.namespace,
            className = _this$props2.className,
            closable = _this$props2.closable,
            type = _this$props2.type,
            icon = _this$props2.icon,
            closeIcon = _this$props2.closeIcon,
            style = _this$props2.style,
            onClick = _this$props2.onClick,
            children = _this$props2.children,
            holder = _this$props2.holder;
        var toastClass = getToastClassName(namespace);
        var dataOrAriaAttributeProps = Object.keys(this.props).reduce(function (acc, key) {
          if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
            acc[key] = _this2.props[key];
          }

          return acc;
        }, {});
        var buildInIconClass = type && {
          "success": "icon-yes",
          "error": "icon-error",
          "warning": "icon-caution",
          "info": "icon-info"
        }[type];
        var computedIcon = icon !== false && /*#__PURE__*/cn(icon) ? icon : buildInIconClass && /*#__PURE__*/a$1("i", {
          className: classNames("ft-icon ft-toast-icon", buildInIconClass)
        });
        var node = /*#__PURE__*/a$1("div", _extends({
          className: classNames(toastClass, type && "is-".concat(type), className, closable && "".concat(toastClass, "-closable")),
          style: style,
          onMouseEnter: this.clearCloseTimer,
          onMouseLeave: this.startCloseTimer,
          onClick: onClick
        }, dataOrAriaAttributeProps), /*#__PURE__*/a$1("div", {
          className: "".concat(toastClass, "-body")
        }, computedIcon, /*#__PURE__*/a$1("div", {
          className: "ft-toast-content"
        }, children)), closable && /*#__PURE__*/a$1("a", {
          tabIndex: 0,
          onClick: this.close,
          className: "".concat(toastClass, "-close")
        }, closeIcon || /*#__PURE__*/a$1("span", {
          className: "".concat(toastClass, "-close-x")
        })));

        if (holder) {
          return /*#__PURE__*/ReactDOM.createPortal(node, holder);
        }

        return node;
      }
    }]);

    return Notice;
  }(p$1);

  _defineProperty(Notice, "defaultProps", {
    onClose: function onClose() {},
    duration: 1500
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var seed = 0;
  var now = Date.now();

  function getUuid() {
    var id = seed;
    seed += 1;
    return "rcNotification_".concat(now, "_").concat(id);
  }

  var Notification = /*#__PURE__*/function (_Component) {
    _inherits(Notification, _Component);

    var _super = _createSuper(Notification);

    function Notification() {
      var _this;

      _classCallCheck(this, Notification);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "state", {
        notices: []
      });

      _defineProperty(_assertThisInitialized(_this), "hookRefs", new Map());

      _defineProperty(_assertThisInitialized(_this), "add", function (originNotice, holderCallback) {
        var key = originNotice.key || getUuid();

        var notice = _objectSpread$1(_objectSpread$1({}, originNotice), {}, {
          key: key
        });

        var maxCount = _this.props.maxCount;

        _this.setState(function (previousState) {
          var notices = previousState.notices;
          var noticeIndex = notices.map(function (v) {
            return v.notice.key;
          }).indexOf(key);
          var updatedNotices = notices.concat();

          if (noticeIndex !== -1) {
            updatedNotices.splice(noticeIndex, 1, {
              notice: notice,
              holderCallback: holderCallback
            });
          } else {
            if (maxCount && notices.length >= maxCount) {
              // XXX, use key of first item to update new added (let React to move exsiting
              // instead of remove and mount). Same key was used before for both a) external
              // manual control and b) internal react 'key' prop , which is not that good.
              // eslint-disable-next-line no-param-reassign
              // zombieJ: Not know why use `updateKey`. This makes Notice infinite loop in jest.
              // Change to `updateMark` for compare instead.
              // https://github.com/react-component/notification/commit/32299e6be396f94040bfa82517eea940db947ece
              notice.key = updatedNotices[0].notice.key;
              notice.updateMark = getUuid(); // zombieJ: That's why. User may close by key directly.
              // We need record this but not re-render to avoid upper issue
              // https://github.com/react-component/notification/issues/129

              notice.userPassKey = key;
              updatedNotices.shift();
            }

            updatedNotices.push({
              notice: notice,
              holderCallback: holderCallback
            });
          }

          return {
            notices: updatedNotices
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "remove", function (removeKey) {
        _this.setState(function (_ref) {
          var notices = _ref.notices;
          return {
            notices: notices.filter(function (_ref2) {
              var _ref2$notice = _ref2.notice,
                  key = _ref2$notice.key,
                  userPassKey = _ref2$notice.userPassKey;
              var mergedKey = userPassKey || key;
              return mergedKey !== removeKey;
            })
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "noticePropsMap", {});

      return _this;
    }

    _createClass(Notification, [{
      key: "getTransitionName",
      value: function getTransitionName() {
        var _this$props = this.props,
            namespace = _this$props.namespace,
            animation = _this$props.animation;
        var transitionName = this.props.transitionName;

        if (!transitionName && animation) {
          transitionName = "".concat(getToastClassName(namespace), "-").concat(animation);
        }

        return transitionName;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var notices = this.state.notices;
        var _this$props2 = this.props,
            namespace = _this$props2.namespace,
            className = _this$props2.className,
            closeIcon = _this$props2.closeIcon,
            style = _this$props2.style;
        var noticeKeys = [];
        notices.forEach(function (_ref3, index) {
          var notice = _ref3.notice,
              holderCallback = _ref3.holderCallback;
          var updateMark = index === notices.length - 1 ? notice.updateMark : undefined;
          var key = notice.key,
              userPassKey = notice.userPassKey;

          var noticeProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
            namespace: namespace,
            closeIcon: closeIcon
          }, notice), notice.props), {}, {
            key: key,
            noticeKey: userPassKey || key,
            updateMark: updateMark,
            onClose: function onClose(noticeKey) {
              var _notice$onClose;

              _this2.remove(noticeKey);

              (_notice$onClose = notice.onClose) === null || _notice$onClose === void 0 ? void 0 : _notice$onClose.call(notice);
            },
            onClick: notice.onClick,
            children: notice.content
          }); // Give to motion


          noticeKeys.push(key);
          _this2.noticePropsMap[key] = {
            props: noticeProps,
            holderCallback: holderCallback
          };
        });
        return /*#__PURE__*/a$1("div", {
          className: classNames("".concat(getToastClassName(namespace), "-container"), className),
          style: style
        }, /*#__PURE__*/a$1(CSSMotionList, {
          keys: noticeKeys,
          motionName: this.getTransitionName(),
          onVisibleChanged: function onVisibleChanged(changedVisible, _ref4) {
            var key = _ref4.key;

            if (!changedVisible) {
              delete _this2.noticePropsMap[key];
            }
          }
        }, function (_ref5) {
          var key = _ref5.key,
              motionClassName = _ref5.className,
              motionStyle = _ref5.style,
              visible = _ref5.visible;
          var _this2$noticePropsMap = _this2.noticePropsMap[key],
              noticeProps = _this2$noticePropsMap.props,
              holderCallback = _this2$noticePropsMap.holderCallback;

          if (holderCallback) {
            return /*#__PURE__*/a$1("div", {
              key: key,
              className: classNames(motionClassName, "".concat(getToastClassName(namespace), "-hook-holder")),
              style: _objectSpread$1({}, motionStyle),
              ref: function ref(div) {
                if (typeof key === 'undefined') {
                  return;
                }

                if (div) {
                  _this2.hookRefs.set(key, div);

                  holderCallback(div, noticeProps);
                } else {
                  _this2.hookRefs.delete(key);
                }
              }
            });
          }

          return /*#__PURE__*/a$1(Notice, _extends({}, noticeProps, {
            className: classNames(motionClassName, noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.className),
            style: _objectSpread$1(_objectSpread$1({}, motionStyle), noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.style),
            visible: visible
          }));
        }));
      }
    }]);

    return Notification;
  }(p$1);

  _defineProperty(Notification, "defaultProps", {
    namespace: "ft",
    animation: 'fade',
    style: {
      top: 65,
      left: '50%'
    }
  });

  Notification.newInstance = function newNotificationInstance(properties, callback) {
    var _ref6 = properties || {},
        getContainer = _ref6.getContainer,
        props = _objectWithoutProperties(_ref6, ["getContainer"]);

    var div = document.createElement('div');

    if (getContainer) {
      var root = getContainer();
      root.appendChild(div);
    } else {
      document.body.appendChild(div);
    }

    var called = false;

    function ref(notification) {
      if (called) {
        return;
      }

      called = true;
      callback({
        notice: function notice(noticeProps) {
          notification.add(noticeProps);
        },
        removeNotice: function removeNotice(key) {
          notification.remove(key);
        },
        component: notification,
        destroy: function destroy() {
          ReactDOM.unmountComponentAtNode(div);

          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }
      });
    }

    ReactDOM.render( /*#__PURE__*/a$1(Notification, _extends({}, props, {
      ref: ref
    })), div);
  };

  var ToastPositionEnum;

  (function (ToastPositionEnum) {
    ToastPositionEnum["Center"] = "center";
    ToastPositionEnum["TopLeft"] = "top-left";
    ToastPositionEnum["TopCenter"] = "top-center";
    ToastPositionEnum["TopRight"] = "top-right";
    ToastPositionEnum["BottomLeft"] = "bottom-left";
    ToastPositionEnum["BottomCenter"] = "bottom-center";
    ToastPositionEnum["BottomRight"] = "bottom-right";
  })(ToastPositionEnum || (ToastPositionEnum = {}));

  var _positionStyle;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var createToastInstance = function createToastInstance(props) {
    return new Promise(function (resolve) {
      Notification.newInstance(props, function (instance) {
        resolve(instance);
      });
    });
  };

  var defaultOffsetTop = 65;
  var defaultOffsetLeft = 20;
  var positionStyle = (_positionStyle = {}, _defineProperty(_positionStyle, ToastPositionEnum.Center, {
    top: "38.2%",
    left: "50%"
  }), _defineProperty(_positionStyle, ToastPositionEnum.TopLeft, {
    top: defaultOffsetTop,
    left: defaultOffsetLeft
  }), _defineProperty(_positionStyle, ToastPositionEnum.TopCenter, {
    top: defaultOffsetTop,
    left: "50%"
  }), _defineProperty(_positionStyle, ToastPositionEnum.TopRight, {
    top: defaultOffsetTop,
    right: defaultOffsetLeft
  }), _defineProperty(_positionStyle, ToastPositionEnum.BottomLeft, {
    bottom: defaultOffsetTop,
    left: defaultOffsetLeft
  }), _defineProperty(_positionStyle, ToastPositionEnum.BottomCenter, {
    bottom: defaultOffsetTop,
    left: "50%"
  }), _defineProperty(_positionStyle, ToastPositionEnum.BottomRight, {
    bottom: defaultOffsetTop,
    right: defaultOffsetLeft
  }), _positionStyle);
  var positionMap = {};
  var aboveMap = new WeakMap();
  var toast = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(content, options) {
      var _ref2, _ref2$namespace, namespace, _ref2$position, position, offset, above, instance, containerStyle;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2 = options || {}, _ref2$namespace = _ref2.namespace, namespace = _ref2$namespace === void 0 ? "ft" : _ref2$namespace, _ref2$position = _ref2.position, position = _ref2$position === void 0 ? ToastPositionEnum.TopCenter : _ref2$position, offset = _ref2.offset, above = _ref2.above;
              instance = above ? aboveMap.get(above) : positionMap[position];

              if (instance) {
                _context.next = 8;
                break;
              }

              containerStyle = above ? getAbovePositionStyle(above) : positionStyle[position];
              _context.next = 6;
              return createToastInstance({
                namespace: namespace,
                className: "is-".concat(above ? "above" : position),
                style: containerStyle
              });

            case 6:
              instance = _context.sent;

              if (above) {
                aboveMap.set(above, instance);
              } else {
                positionMap[position] = instance;
              }

            case 8:
              return _context.abrupt("return", instance.notice(_objectSpread(_objectSpread(_objectSpread({}, options), offset ? {
                style: {
                  top: offset[0],
                  left: offset[1]
                }
              } : {}), {}, {
                content: content
              })));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function toast(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.toast = toast;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
