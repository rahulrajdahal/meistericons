import { readdirSync, existsSync as existsSync$1, unlinkSync, appendFileSync as appendFileSync$1 } from 'node:fs';
import path$1 from 'node:path';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => toCamelCase(string).charAt(0).toUpperCase() + toCamelCase(string).slice(1);
const getCurrentDir$1 = (filePath) => fileURLToPath(new URL(filePath));

var generateExportFile = (iconFile, pkg = "react") => {
  const currentDir = getCurrentDir$1(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../${pkg}/icons`);
  const importIconString = `export {default as  ${toPascalCase(
    iconFile
  )}} from './${toPascalCase(iconFile)}';
`;
  appendFileSync(path.resolve(targetDir, `index.ts`), importIconString, "utf-8");
};

var generateIconFile = (iconNodes, iconPackage = "react") => {
  const name = Object.keys(iconNodes)[0];
  const paths = Object.values(iconNodes)[0];
  const currentDir = getCurrentDir$1(import.meta.url);
  const targetDir = path.resolve(currentDir, `../../${iconPackage}/icons`);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
  }
  const template = `
  import createMeisterIcons from '../src/createMeisterIcons';

  const ${toPascalCase(name)} = createMeisterIcons("${name}", ${JSON.stringify(
    paths
  )})


  export default ${toPascalCase(name)}
  `;
  writeFileSync(path.join(targetDir, `${toPascalCase(name)}.ts`), template, "utf-8");
};

const getCurrentDir = (filePath) => fileURLToPath$1(new URL(filePath));
const readIconFiles = (iconDir) => readdirSync(iconDir).map((iconFile) => iconFile.replace(/.svg/, ""));
const readSvgCode = async (file) => {
  const svg = Bun.file(file);
  return await svg.text();
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function hasKey(obj, keys) {
	var o = obj;
	keys.slice(0, -1).forEach(function (key) {
		o = o[key] || {};
	});

	var key = keys[keys.length - 1];
	return key in o;
}

function isNumber(x) {
	if (typeof x === 'number') { return true; }
	if ((/^0x[0-9a-f]+$/i).test(x)) { return true; }
	return (/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/).test(x);
}

function isConstructorOrProto(obj, key) {
	return (key === 'constructor' && typeof obj[key] === 'function') || key === '__proto__';
}

var minimist = function (args, opts) {
	if (!opts) { opts = {}; }

	var flags = {
		bools: {},
		strings: {},
		unknownFn: null,
	};

	if (typeof opts.unknown === 'function') {
		flags.unknownFn = opts.unknown;
	}

	if (typeof opts.boolean === 'boolean' && opts.boolean) {
		flags.allBools = true;
	} else {
		[].concat(opts.boolean).filter(Boolean).forEach(function (key) {
			flags.bools[key] = true;
		});
	}

	var aliases = {};

	function aliasIsBoolean(key) {
		return aliases[key].some(function (x) {
			return flags.bools[x];
		});
	}

	Object.keys(opts.alias || {}).forEach(function (key) {
		aliases[key] = [].concat(opts.alias[key]);
		aliases[key].forEach(function (x) {
			aliases[x] = [key].concat(aliases[key].filter(function (y) {
				return x !== y;
			}));
		});
	});

	[].concat(opts.string).filter(Boolean).forEach(function (key) {
		flags.strings[key] = true;
		if (aliases[key]) {
			[].concat(aliases[key]).forEach(function (k) {
				flags.strings[k] = true;
			});
		}
	});

	var defaults = opts.default || {};

	var argv = { _: [] };

	function argDefined(key, arg) {
		return (flags.allBools && (/^--[^=]+$/).test(arg))
			|| flags.strings[key]
			|| flags.bools[key]
			|| aliases[key];
	}

	function setKey(obj, keys, value) {
		var o = obj;
		for (var i = 0; i < keys.length - 1; i++) {
			var key = keys[i];
			if (isConstructorOrProto(o, key)) { return; }
			if (o[key] === undefined) { o[key] = {}; }
			if (
				o[key] === Object.prototype
				|| o[key] === Number.prototype
				|| o[key] === String.prototype
			) {
				o[key] = {};
			}
			if (o[key] === Array.prototype) { o[key] = []; }
			o = o[key];
		}

		var lastKey = keys[keys.length - 1];
		if (isConstructorOrProto(o, lastKey)) { return; }
		if (
			o === Object.prototype
			|| o === Number.prototype
			|| o === String.prototype
		) {
			o = {};
		}
		if (o === Array.prototype) { o = []; }
		if (o[lastKey] === undefined || flags.bools[lastKey] || typeof o[lastKey] === 'boolean') {
			o[lastKey] = value;
		} else if (Array.isArray(o[lastKey])) {
			o[lastKey].push(value);
		} else {
			o[lastKey] = [o[lastKey], value];
		}
	}

	function setArg(key, val, arg) {
		if (arg && flags.unknownFn && !argDefined(key, arg)) {
			if (flags.unknownFn(arg) === false) { return; }
		}

		var value = !flags.strings[key] && isNumber(val)
			? Number(val)
			: val;
		setKey(argv, key.split('.'), value);

		(aliases[key] || []).forEach(function (x) {
			setKey(argv, x.split('.'), value);
		});
	}

	Object.keys(flags.bools).forEach(function (key) {
		setArg(key, defaults[key] === undefined ? false : defaults[key]);
	});

	var notFlags = [];

	if (args.indexOf('--') !== -1) {
		notFlags = args.slice(args.indexOf('--') + 1);
		args = args.slice(0, args.indexOf('--'));
	}

	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		var key;
		var next;

		if ((/^--.+=/).test(arg)) {
			// Using [\s\S] instead of . because js doesn't support the
			// 'dotall' regex modifier. See:
			// http://stackoverflow.com/a/1068308/13216
			var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
			key = m[1];
			var value = m[2];
			if (flags.bools[key]) {
				value = value !== 'false';
			}
			setArg(key, value, arg);
		} else if ((/^--no-.+/).test(arg)) {
			key = arg.match(/^--no-(.+)/)[1];
			setArg(key, false, arg);
		} else if ((/^--.+/).test(arg)) {
			key = arg.match(/^--(.+)/)[1];
			next = args[i + 1];
			if (
				next !== undefined
				&& !(/^(-|--)[^-]/).test(next)
				&& !flags.bools[key]
				&& !flags.allBools
				&& (aliases[key] ? !aliasIsBoolean(key) : true)
			) {
				setArg(key, next, arg);
				i += 1;
			} else if ((/^(true|false)$/).test(next)) {
				setArg(key, next === 'true', arg);
				i += 1;
			} else {
				setArg(key, flags.strings[key] ? '' : true, arg);
			}
		} else if ((/^-[^-]+/).test(arg)) {
			var letters = arg.slice(1, -1).split('');

			var broken = false;
			for (var j = 0; j < letters.length; j++) {
				next = arg.slice(j + 2);

				if (next === '-') {
					setArg(letters[j], next, arg);
					continue;
				}

				if ((/[A-Za-z]/).test(letters[j]) && next[0] === '=') {
					setArg(letters[j], next.slice(1), arg);
					broken = true;
					break;
				}

				if (
					(/[A-Za-z]/).test(letters[j])
					&& (/-?\d+(\.\d*)?(e-?\d+)?$/).test(next)
				) {
					setArg(letters[j], next, arg);
					broken = true;
					break;
				}

				if (letters[j + 1] && letters[j + 1].match(/\W/)) {
					setArg(letters[j], arg.slice(j + 2), arg);
					broken = true;
					break;
				} else {
					setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
				}
			}

			key = arg.slice(-1)[0];
			if (!broken && key !== '-') {
				if (
					args[i + 1]
					&& !(/^(-|--)[^-]/).test(args[i + 1])
					&& !flags.bools[key]
					&& (aliases[key] ? !aliasIsBoolean(key) : true)
				) {
					setArg(key, args[i + 1], arg);
					i += 1;
				} else if (args[i + 1] && (/^(true|false)$/).test(args[i + 1])) {
					setArg(key, args[i + 1] === 'true', arg);
					i += 1;
				} else {
					setArg(key, flags.strings[key] ? '' : true, arg);
				}
			}
		} else {
			if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
				argv._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg));
			}
			if (opts.stopEarly) {
				argv._.push.apply(argv._, args.slice(i + 1));
				break;
			}
		}
	}

	Object.keys(defaults).forEach(function (k) {
		if (!hasKey(argv, k.split('.'))) {
			setKey(argv, k.split('.'), defaults[k]);

			(aliases[k] || []).forEach(function (x) {
				setKey(argv, x.split('.'), defaults[k]);
			});
		}
	});

	if (opts['--']) {
		argv['--'] = notFlags.slice();
	} else {
		notFlags.forEach(function (k) {
			argv._.push(k);
		});
	}

	return argv;
};

var getCliArguments = /*@__PURE__*/getDefaultExportFromCjs(minimist);

var svgson_umd = {exports: {}};

(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /*!
	   * Determine if an object is a Buffer
	   *
	   * @author   Feross Aboukhadijeh <https://feross.org>
	   * @license  MIT
	   */

	  // The _isBuffer check is for Safari 5-7 support, because it's missing
	  // Object.prototype.constructor. Remove this eventually
	  var isBuffer_1 = function (obj) {
	    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	  };

	  function isBuffer (obj) {
	    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	  }

	  // For Node v0.10 support. Remove this eventually.
	  function isSlowBuffer (obj) {
	    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	  }

	  var toString = Object.prototype.toString;

	  /**
	   * Get the native `typeof` a value.
	   *
	   * @param  {*} `val`
	   * @return {*} Native javascript type
	   */

	  var kindOf = function kindOf(val) {
	    // primitivies
	    if (typeof val === 'undefined') {
	      return 'undefined';
	    }
	    if (val === null) {
	      return 'null';
	    }
	    if (val === true || val === false || val instanceof Boolean) {
	      return 'boolean';
	    }
	    if (typeof val === 'string' || val instanceof String) {
	      return 'string';
	    }
	    if (typeof val === 'number' || val instanceof Number) {
	      return 'number';
	    }

	    // functions
	    if (typeof val === 'function' || val instanceof Function) {
	      return 'function';
	    }

	    // array
	    if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
	      return 'array';
	    }

	    // check for instances of RegExp and Date before calling `toString`
	    if (val instanceof RegExp) {
	      return 'regexp';
	    }
	    if (val instanceof Date) {
	      return 'date';
	    }

	    // other objects
	    var type = toString.call(val);

	    if (type === '[object RegExp]') {
	      return 'regexp';
	    }
	    if (type === '[object Date]') {
	      return 'date';
	    }
	    if (type === '[object Arguments]') {
	      return 'arguments';
	    }
	    if (type === '[object Error]') {
	      return 'error';
	    }

	    // buffer
	    if (isBuffer_1(val)) {
	      return 'buffer';
	    }

	    // es6: Map, WeakMap, Set, WeakSet
	    if (type === '[object Set]') {
	      return 'set';
	    }
	    if (type === '[object WeakSet]') {
	      return 'weakset';
	    }
	    if (type === '[object Map]') {
	      return 'map';
	    }
	    if (type === '[object WeakMap]') {
	      return 'weakmap';
	    }
	    if (type === '[object Symbol]') {
	      return 'symbol';
	    }

	    // typed arrays
	    if (type === '[object Int8Array]') {
	      return 'int8array';
	    }
	    if (type === '[object Uint8Array]') {
	      return 'uint8array';
	    }
	    if (type === '[object Uint8ClampedArray]') {
	      return 'uint8clampedarray';
	    }
	    if (type === '[object Int16Array]') {
	      return 'int16array';
	    }
	    if (type === '[object Uint16Array]') {
	      return 'uint16array';
	    }
	    if (type === '[object Int32Array]') {
	      return 'int32array';
	    }
	    if (type === '[object Uint32Array]') {
	      return 'uint32array';
	    }
	    if (type === '[object Float32Array]') {
	      return 'float32array';
	    }
	    if (type === '[object Float64Array]') {
	      return 'float64array';
	    }

	    // must be a plain object
	    return 'object';
	  };

	  function createCommonjsModule(fn, module) {
	  	return module = { exports: {} }, fn(module, module.exports), module.exports;
	  }

	  var renameKeys = createCommonjsModule(function (module) {
	  (function() {

	    function rename(obj, fn) {
	      if (typeof fn !== 'function') {
	        return obj;
	      }

	      var res = {};
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) {
	          res[fn(key, obj[key]) || key] = obj[key];
	        }
	      }
	      return res;
	    }

	    if (module.exports) {
	      module.exports = rename;
	    } else {
	      {
	        window.rename = rename;
	      }
	    }
	  })();
	  });

	  /**
	   * Expose `renameDeep`
	   */

	  var deepRenameKeys = function renameDeep(obj, cb) {
	    var type = kindOf(obj);

	    if (type !== 'object' && type !== 'array') {
	      throw new Error('expected an object');
	    }

	    var res = [];
	    if (type === 'object') {
	      obj = renameKeys(obj, cb);
	      res = {};
	    }

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var val = obj[key];
	        if (kindOf(val) === 'object' || kindOf(val) === 'array') {
	          res[key] = renameDeep(val, cb);
	        } else {
	          res[key] = val;
	        }
	      }
	    }
	    return res;
	  };

	  var eventemitter3 = createCommonjsModule(function (module) {

	  var has = Object.prototype.hasOwnProperty
	    , prefix = '~';

	  /**
	   * Constructor to create a storage for our `EE` objects.
	   * An `Events` instance is a plain object whose properties are event names.
	   *
	   * @constructor
	   * @api private
	   */
	  function Events() {}

	  //
	  // We try to not inherit from `Object.prototype`. In some engines creating an
	  // instance in this way is faster than calling `Object.create(null)` directly.
	  // If `Object.create(null)` is not supported we prefix the event names with a
	  // character to make sure that the built-in object properties are not
	  // overridden or used as an attack vector.
	  //
	  if (Object.create) {
	    Events.prototype = Object.create(null);

	    //
	    // This hack is needed because the `__proto__` property is still inherited in
	    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	    //
	    if (!new Events().__proto__) prefix = false;
	  }

	  /**
	   * Representation of a single event listener.
	   *
	   * @param {Function} fn The listener function.
	   * @param {Mixed} context The context to invoke the listener with.
	   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	   * @constructor
	   * @api private
	   */
	  function EE(fn, context, once) {
	    this.fn = fn;
	    this.context = context;
	    this.once = once || false;
	  }

	  /**
	   * Minimal `EventEmitter` interface that is molded against the Node.js
	   * `EventEmitter` interface.
	   *
	   * @constructor
	   * @api public
	   */
	  function EventEmitter() {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  /**
	   * Return an array listing the events for which the emitter has registered
	   * listeners.
	   *
	   * @returns {Array}
	   * @api public
	   */
	  EventEmitter.prototype.eventNames = function eventNames() {
	    var names = []
	      , events
	      , name;

	    if (this._eventsCount === 0) return names;

	    for (name in (events = this._events)) {
	      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	    }

	    if (Object.getOwnPropertySymbols) {
	      return names.concat(Object.getOwnPropertySymbols(events));
	    }

	    return names;
	  };

	  /**
	   * Return the listeners registered for a given event.
	   *
	   * @param {String|Symbol} event The event name.
	   * @param {Boolean} exists Only check if there are listeners.
	   * @returns {Array|Boolean}
	   * @api public
	   */
	  EventEmitter.prototype.listeners = function listeners(event, exists) {
	    var evt = prefix ? prefix + event : event
	      , available = this._events[evt];

	    if (exists) return !!available;
	    if (!available) return [];
	    if (available.fn) return [available.fn];

	    for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	      ee[i] = available[i].fn;
	    }

	    return ee;
	  };

	  /**
	   * Calls each of the listeners registered for a given event.
	   *
	   * @param {String|Symbol} event The event name.
	   * @returns {Boolean} `true` if the event had listeners, else `false`.
	   * @api public
	   */
	  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	    var evt = prefix ? prefix + event : event;

	    if (!this._events[evt]) return false;

	    var listeners = this._events[evt]
	      , len = arguments.length
	      , args
	      , i;

	    if (listeners.fn) {
	      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	      switch (len) {
	        case 1: return listeners.fn.call(listeners.context), true;
	        case 2: return listeners.fn.call(listeners.context, a1), true;
	        case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	        case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	        case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	        case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	      }

	      for (i = 1, args = new Array(len -1); i < len; i++) {
	        args[i - 1] = arguments[i];
	      }

	      listeners.fn.apply(listeners.context, args);
	    } else {
	      var length = listeners.length
	        , j;

	      for (i = 0; i < length; i++) {
	        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	        switch (len) {
	          case 1: listeners[i].fn.call(listeners[i].context); break;
	          case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	          case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	          case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	          default:
	            if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	              args[j - 1] = arguments[j];
	            }

	            listeners[i].fn.apply(listeners[i].context, args);
	        }
	      }
	    }

	    return true;
	  };

	  /**
	   * Add a listener for a given event.
	   *
	   * @param {String|Symbol} event The event name.
	   * @param {Function} fn The listener function.
	   * @param {Mixed} [context=this] The context to invoke the listener with.
	   * @returns {EventEmitter} `this`.
	   * @api public
	   */
	  EventEmitter.prototype.on = function on(event, fn, context) {
	    var listener = new EE(fn, context || this)
	      , evt = prefix ? prefix + event : event;

	    if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	    else if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [this._events[evt], listener];

	    return this;
	  };

	  /**
	   * Add a one-time listener for a given event.
	   *
	   * @param {String|Symbol} event The event name.
	   * @param {Function} fn The listener function.
	   * @param {Mixed} [context=this] The context to invoke the listener with.
	   * @returns {EventEmitter} `this`.
	   * @api public
	   */
	  EventEmitter.prototype.once = function once(event, fn, context) {
	    var listener = new EE(fn, context || this, true)
	      , evt = prefix ? prefix + event : event;

	    if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	    else if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [this._events[evt], listener];

	    return this;
	  };

	  /**
	   * Remove the listeners of a given event.
	   *
	   * @param {String|Symbol} event The event name.
	   * @param {Function} fn Only remove the listeners that match this function.
	   * @param {Mixed} context Only remove the listeners that have this context.
	   * @param {Boolean} once Only remove one-time listeners.
	   * @returns {EventEmitter} `this`.
	   * @api public
	   */
	  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	    var evt = prefix ? prefix + event : event;

	    if (!this._events[evt]) return this;
	    if (!fn) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	      return this;
	    }

	    var listeners = this._events[evt];

	    if (listeners.fn) {
	      if (
	           listeners.fn === fn
	        && (!once || listeners.once)
	        && (!context || listeners.context === context)
	      ) {
	        if (--this._eventsCount === 0) this._events = new Events();
	        else delete this._events[evt];
	      }
	    } else {
	      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }

	      //
	      // Reset the array, or remove it completely if we have no more listeners.
	      //
	      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	      else if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }

	    return this;
	  };

	  /**
	   * Remove all listeners, or those of the specified event.
	   *
	   * @param {String|Symbol} [event] The event name.
	   * @returns {EventEmitter} `this`.
	   * @api public
	   */
	  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	    var evt;

	    if (event) {
	      evt = prefix ? prefix + event : event;
	      if (this._events[evt]) {
	        if (--this._eventsCount === 0) this._events = new Events();
	        else delete this._events[evt];
	      }
	    } else {
	      this._events = new Events();
	      this._eventsCount = 0;
	    }

	    return this;
	  };

	  //
	  // Alias methods names because people roll like that.
	  //
	  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  //
	  // This function doesn't apply anymore.
	  //
	  EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	    return this;
	  };

	  //
	  // Expose the prefix.
	  //
	  EventEmitter.prefixed = prefix;

	  //
	  // Allow `EventEmitter` to be imported as module namespace.
	  //
	  EventEmitter.EventEmitter = EventEmitter;

	  //
	  // Expose the module.
	  //
	  {
	    module.exports = EventEmitter;
	  }
	  });

	  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


	  var noop = function noop() {};

	  var State = {
	      data: 'state-data',
	      cdata: 'state-cdata',
	      tagBegin: 'state-tag-begin',
	      tagName: 'state-tag-name',
	      tagEnd: 'state-tag-end',
	      attributeNameStart: 'state-attribute-name-start',
	      attributeName: 'state-attribute-name',
	      attributeNameEnd: 'state-attribute-name-end',
	      attributeValueBegin: 'state-attribute-value-begin',
	      attributeValue: 'state-attribute-value'
	  };

	  var Action = {
	      lt: 'action-lt',
	      gt: 'action-gt',
	      space: 'action-space',
	      equal: 'action-equal',
	      quote: 'action-quote',
	      slash: 'action-slash',
	      char: 'action-char',
	      error: 'action-error'
	  };

	  var Type$1 = {
	      text: 'text',
	      openTag: 'open-tag',
	      closeTag: 'close-tag',
	      attributeName: 'attribute-name',
	      attributeValue: 'attribute-value'
	  };

	  var charToAction = {
	      ' ': Action.space,
	      '\t': Action.space,
	      '\n': Action.space,
	      '\r': Action.space,
	      '<': Action.lt,
	      '>': Action.gt,
	      '"': Action.quote,
	      "'": Action.quote,
	      '=': Action.equal,
	      '/': Action.slash
	  };

	  var getAction = function getAction(char) {
	      return charToAction[char] || Action.char;
	  };

	  /**
	   * @param  {Object} options
	   * @param  {Boolean} options.debug
	   * @return {Object}
	   */
	  var create$1 = function create(options) {
	      var _State$data, _State$tagBegin, _State$tagName, _State$tagEnd, _State$attributeNameS, _State$attributeName, _State$attributeNameE, _State$attributeValue, _State$attributeValue2, _lexer$stateMachine;

	      options = Object.assign({ debug: false }, options);
	      var lexer = new eventemitter3();
	      var state = State.data;
	      var data = '';
	      var tagName = '';
	      var attrName = '';
	      var attrValue = '';
	      var isClosing = '';
	      var openingQuote = '';

	      var emit = function emit(type, value) {
	          // for now, ignore tags like: '?xml', '!DOCTYPE' or comments
	          if (tagName[0] === '?' || tagName[0] === '!') {
	              return;
	          }
	          var event = { type: type, value: value };
	          if (options.debug) {
	              console.log('emit:', event);
	          }
	          lexer.emit('data', event);
	      };

	      lexer.stateMachine = (_lexer$stateMachine = {}, _defineProperty(_lexer$stateMachine, State.data, (_State$data = {}, _defineProperty(_State$data, Action.lt, function () {
	          if (data.trim()) {
	              emit(Type$1.text, data);
	          }
	          tagName = '';
	          isClosing = false;
	          state = State.tagBegin;
	      }), _defineProperty(_State$data, Action.char, function (char) {
	          data += char;
	      }), _State$data)), _defineProperty(_lexer$stateMachine, State.cdata, _defineProperty({}, Action.char, function (char) {
	          data += char;
	          if (data.substr(-3) === ']]>') {
	              emit(Type$1.text, data.slice(0, -3));
	              data = '';
	              state = State.data;
	          }
	      })), _defineProperty(_lexer$stateMachine, State.tagBegin, (_State$tagBegin = {}, _defineProperty(_State$tagBegin, Action.space, noop), _defineProperty(_State$tagBegin, Action.char, function (char) {
	          tagName = char;
	          state = State.tagName;
	      }), _defineProperty(_State$tagBegin, Action.slash, function () {
	          tagName = '';
	          isClosing = true;
	      }), _State$tagBegin)), _defineProperty(_lexer$stateMachine, State.tagName, (_State$tagName = {}, _defineProperty(_State$tagName, Action.space, function () {
	          if (isClosing) {
	              state = State.tagEnd;
	          } else {
	              state = State.attributeNameStart;
	              emit(Type$1.openTag, tagName);
	          }
	      }), _defineProperty(_State$tagName, Action.gt, function () {
	          if (isClosing) {
	              emit(Type$1.closeTag, tagName);
	          } else {
	              emit(Type$1.openTag, tagName);
	          }
	          data = '';
	          state = State.data;
	      }), _defineProperty(_State$tagName, Action.slash, function () {
	          state = State.tagEnd;
	          emit(Type$1.openTag, tagName);
	      }), _defineProperty(_State$tagName, Action.char, function (char) {
	          tagName += char;
	          if (tagName === '![CDATA[') {
	              state = State.cdata;
	              data = '';
	              tagName = '';
	          }
	      }), _State$tagName)), _defineProperty(_lexer$stateMachine, State.tagEnd, (_State$tagEnd = {}, _defineProperty(_State$tagEnd, Action.gt, function () {
	          emit(Type$1.closeTag, tagName);
	          data = '';
	          state = State.data;
	      }), _defineProperty(_State$tagEnd, Action.char, noop), _State$tagEnd)), _defineProperty(_lexer$stateMachine, State.attributeNameStart, (_State$attributeNameS = {}, _defineProperty(_State$attributeNameS, Action.char, function (char) {
	          attrName = char;
	          state = State.attributeName;
	      }), _defineProperty(_State$attributeNameS, Action.gt, function () {
	          data = '';
	          state = State.data;
	      }), _defineProperty(_State$attributeNameS, Action.space, noop), _defineProperty(_State$attributeNameS, Action.slash, function () {
	          isClosing = true;
	          state = State.tagEnd;
	      }), _State$attributeNameS)), _defineProperty(_lexer$stateMachine, State.attributeName, (_State$attributeName = {}, _defineProperty(_State$attributeName, Action.space, function () {
	          state = State.attributeNameEnd;
	      }), _defineProperty(_State$attributeName, Action.equal, function () {
	          emit(Type$1.attributeName, attrName);
	          state = State.attributeValueBegin;
	      }), _defineProperty(_State$attributeName, Action.gt, function () {
	          attrValue = '';
	          emit(Type$1.attributeName, attrName);
	          emit(Type$1.attributeValue, attrValue);
	          data = '';
	          state = State.data;
	      }), _defineProperty(_State$attributeName, Action.slash, function () {
	          isClosing = true;
	          attrValue = '';
	          emit(Type$1.attributeName, attrName);
	          emit(Type$1.attributeValue, attrValue);
	          state = State.tagEnd;
	      }), _defineProperty(_State$attributeName, Action.char, function (char) {
	          attrName += char;
	      }), _State$attributeName)), _defineProperty(_lexer$stateMachine, State.attributeNameEnd, (_State$attributeNameE = {}, _defineProperty(_State$attributeNameE, Action.space, noop), _defineProperty(_State$attributeNameE, Action.equal, function () {
	          emit(Type$1.attributeName, attrName);
	          state = State.attributeValueBegin;
	      }), _defineProperty(_State$attributeNameE, Action.gt, function () {
	          attrValue = '';
	          emit(Type$1.attributeName, attrName);
	          emit(Type$1.attributeValue, attrValue);
	          data = '';
	          state = State.data;
	      }), _defineProperty(_State$attributeNameE, Action.char, function (char) {
	          attrValue = '';
	          emit(Type$1.attributeName, attrName);
	          emit(Type$1.attributeValue, attrValue);
	          attrName = char;
	          state = State.attributeName;
	      }), _State$attributeNameE)), _defineProperty(_lexer$stateMachine, State.attributeValueBegin, (_State$attributeValue = {}, _defineProperty(_State$attributeValue, Action.space, noop), _defineProperty(_State$attributeValue, Action.quote, function (char) {
	          openingQuote = char;
	          attrValue = '';
	          state = State.attributeValue;
	      }), _defineProperty(_State$attributeValue, Action.gt, function () {
	          attrValue = '';
	          emit(Type$1.attributeValue, attrValue);
	          data = '';
	          state = State.data;
	      }), _defineProperty(_State$attributeValue, Action.char, function (char) {
	          openingQuote = '';
	          attrValue = char;
	          state = State.attributeValue;
	      }), _State$attributeValue)), _defineProperty(_lexer$stateMachine, State.attributeValue, (_State$attributeValue2 = {}, _defineProperty(_State$attributeValue2, Action.space, function (char) {
	          if (openingQuote) {
	              attrValue += char;
	          } else {
	              emit(Type$1.attributeValue, attrValue);
	              state = State.attributeNameStart;
	          }
	      }), _defineProperty(_State$attributeValue2, Action.quote, function (char) {
	          if (openingQuote === char) {
	              emit(Type$1.attributeValue, attrValue);
	              state = State.attributeNameStart;
	          } else {
	              attrValue += char;
	          }
	      }), _defineProperty(_State$attributeValue2, Action.gt, function (char) {
	          if (openingQuote) {
	              attrValue += char;
	          } else {
	              emit(Type$1.attributeValue, attrValue);
	              data = '';
	              state = State.data;
	          }
	      }), _defineProperty(_State$attributeValue2, Action.slash, function (char) {
	          if (openingQuote) {
	              attrValue += char;
	          } else {
	              emit(Type$1.attributeValue, attrValue);
	              isClosing = true;
	              state = State.tagEnd;
	          }
	      }), _defineProperty(_State$attributeValue2, Action.char, function (char) {
	          attrValue += char;
	      }), _State$attributeValue2)), _lexer$stateMachine);

	      var step = function step(char) {
	          if (options.debug) {
	              console.log(state, char);
	          }
	          var actions = lexer.stateMachine[state];
	          var action = actions[getAction(char)] || actions[Action.error] || actions[Action.char];
	          action(char);
	      };

	      lexer.write = function (str) {
	          var len = str.length;
	          for (var i = 0; i < len; i++) {
	              step(str[i]);
	          }
	      };

	      return lexer;
	  };

	  var lexer = {
	      State: State,
	      Action: Action,
	      Type: Type$1,
	      create: create$1
	  };

	  var Type = lexer.Type;

	  var NodeType = {
	      element: 'element',
	      text: 'text'
	  };

	  var createNode = function createNode(params) {
	      return Object.assign({
	          name: '',
	          type: NodeType.element,
	          value: '',
	          parent: null,
	          attributes: {},
	          children: []
	      }, params);
	  };

	  var create = function create(options) {
	      options = Object.assign({
	          stream: false,
	          parentNodes: true,
	          doneEvent: 'done',
	          tagPrefix: 'tag:',
	          emitTopLevelOnly: false,
	          debug: false
	      }, options);

	      var lexer$1 = void 0,
	          rootNode = void 0,
	          current = void 0,
	          attrName = void 0;

	      var reader = new eventemitter3();

	      var handleLexerData = function handleLexerData(data) {
	          switch (data.type) {

	              case Type.openTag:
	                  if (current === null) {
	                      current = rootNode;
	                      current.name = data.value;
	                  } else {
	                      var node = createNode({
	                          name: data.value,
	                          parent: current
	                      });
	                      current.children.push(node);
	                      current = node;
	                  }
	                  break;

	              case Type.closeTag:
	                  var parent = current.parent;
	                  if (!options.parentNodes) {
	                      current.parent = null;
	                  }
	                  if (current.name !== data.value) {
	                      // ignore unexpected closing tag
	                      break;
	                  }
	                  if (options.stream && parent === rootNode) {
	                      rootNode.children = [];
	                      // do not expose parent node in top level nodes
	                      current.parent = null;
	                  }
	                  if (!options.emitTopLevelOnly || parent === rootNode) {
	                      reader.emit(options.tagPrefix + current.name, current);
	                      reader.emit('tag', current.name, current);
	                  }
	                  if (current === rootNode) {
	                      // end of document, stop listening
	                      lexer$1.removeAllListeners('data');
	                      reader.emit(options.doneEvent, current);
	                      rootNode = null;
	                  }
	                  current = parent;
	                  break;

	              case Type.text:
	                  if (current) {
	                      current.children.push(createNode({
	                          type: NodeType.text,
	                          value: data.value,
	                          parent: options.parentNodes ? current : null
	                      }));
	                  }
	                  break;

	              case Type.attributeName:
	                  attrName = data.value;
	                  current.attributes[attrName] = '';
	                  break;

	              case Type.attributeValue:
	                  current.attributes[attrName] = data.value;
	                  break;
	          }
	      };

	      reader.reset = function () {
	          lexer$1 = lexer.create({ debug: options.debug });
	          lexer$1.on('data', handleLexerData);
	          rootNode = createNode();
	          current = null;
	          attrName = '';
	          reader.parse = lexer$1.write;
	      };

	      reader.reset();
	      return reader;
	  };

	  var parseSync = function parseSync(xml, options) {
	      options = Object.assign({}, options, { stream: false, tagPrefix: ':' });
	      var reader = create(options);
	      var res = void 0;
	      reader.on('done', function (ast) {
	          res = ast;
	      });
	      reader.parse(xml);
	      return res;
	  };

	  var reader = {
	      parseSync: parseSync,
	      create: create,
	      NodeType: NodeType
	  };
	  var reader_1 = reader.parseSync;

	  var parseInput = function parseInput(input) {
	    var parsed = reader_1("<root>".concat(input, "</root>"), {
	      parentNodes: false
	    });
	    var isValid = parsed.children && parsed.children.length > 0 && parsed.children.every(function (node) {
	      return node.name === 'svg';
	    });
	    if (isValid) {
	      return parsed.children.length === 1 ? parsed.children[0] : parsed.children;
	    } else {
	      throw Error('nothing to parse');
	    }
	  };
	  var camelize = function camelize(node) {
	    return deepRenameKeys(node, function (key) {
	      if (!notCamelcase(key)) {
	        return toCamelCase(key);
	      }
	      return key;
	    });
	  };
	  var toCamelCase = function toCamelCase(prop) {
	    return prop.replace(/[-|:]([a-z])/gi, function (all, letter) {
	      return letter.toUpperCase();
	    });
	  };
	  var notCamelcase = function notCamelcase(prop) {
	    return /^(data|aria)(-\w+)/.test(prop);
	  };
	  var escapeText = function escapeText(text) {
	    if (text) {
	      var str = String(text);
	      return /[&<>]/.test(str) ? "<![CDATA[".concat(str.replace(/]]>/, ']]]]><![CDATA[>'), "]]>") : str;
	    }
	    return '';
	  };
	  var escapeAttr = function escapeAttr(attr) {
	    return String(attr).replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  };

	  var svgsonSync = function svgsonSync(input) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$transformNode = _ref.transformNode,
	      transformNode = _ref$transformNode === void 0 ? function (node) {
	        return node;
	      } : _ref$transformNode,
	      _ref$camelcase = _ref.camelcase,
	      camelcase = _ref$camelcase === void 0 ? false : _ref$camelcase;
	    var applyFilters = function applyFilters(input) {
	      var n;
	      n = transformNode(input);
	      if (camelcase) {
	        n = camelize(n);
	      }
	      return n;
	    };
	    return applyFilters(parseInput(input));
	  };
	  function svgson() {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    return new Promise(function (resolve, reject) {
	      try {
	        var res = svgsonSync.apply(void 0, args);
	        resolve(res);
	      } catch (e) {
	        reject(e);
	      }
	    });
	  }

	  var stringify = function stringify(_ast) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$transformAttr = _ref.transformAttr,
	      transformAttr = _ref$transformAttr === void 0 ? function (key, value, escape) {
	        return "".concat(key, "=\"").concat(escape(value), "\"");
	      } : _ref$transformAttr,
	      _ref$transformNode = _ref.transformNode,
	      transformNode = _ref$transformNode === void 0 ? function (node) {
	        return node;
	      } : _ref$transformNode,
	      _ref$selfClose = _ref.selfClose,
	      selfClose = _ref$selfClose === void 0 ? true : _ref$selfClose;
	    if (Array.isArray(_ast)) {
	      return _ast.map(function (ast) {
	        return stringify(ast, {
	          transformAttr: transformAttr,
	          selfClose: selfClose,
	          transformNode: transformNode
	        });
	      }).join('');
	    }
	    var ast = transformNode(_ast);
	    if (ast.type === 'text') {
	      return escapeText(ast.value);
	    }
	    var attributes = '';
	    for (var attr in ast.attributes) {
	      var attrStr = transformAttr(attr, ast.attributes[attr], escapeAttr, ast.name);
	      attributes += attrStr ? " ".concat(attrStr) : '';
	    }
	    return ast.children && ast.children.length > 0 || !selfClose ? "<".concat(ast.name).concat(attributes, ">").concat(stringify(ast.children, {
	      transformAttr: transformAttr,
	      transformNode: transformNode,
	      selfClose: selfClose
	    }), "</").concat(ast.name, ">") : "<".concat(ast.name).concat(attributes, "/>");
	  };

	  var indexUmd = Object.assign({}, {
	    parse: svgson,
	    parseSync: svgsonSync,
	    stringify: stringify
	  });

	  return indexUmd;

	})); 
} (svgson_umd));

var svgson_umdExports = svgson_umd.exports;

const { pkg = "react" } = getCliArguments(process.argv.slice(2));
const currentDir = getCurrentDir(import.meta.url);
const iconsDir = path$1.resolve(currentDir, "../../static/icons");
const iconNodesJson = path$1.resolve(currentDir, "../../static/icon-nodes.json");
const targetDir = path$1.resolve(currentDir, `../../${pkg}/icons`);
let totalIcons = 0;
if (existsSync$1(`${targetDir}/index.ts`)) {
  unlinkSync(`${targetDir}/index.ts`);
}
if (existsSync$1(targetDir)) {
  unlinkSync(iconNodesJson);
}
readdirSync(iconsDir).forEach(async (category, i) => {
  if (category !== "index.ts") {
    const categoryDir = path$1.resolve(iconsDir, category);
    const iconCategories = readIconFiles(categoryDir).sort((a, b) => a.localeCompare(b));
    iconCategories.forEach(async (iconFile) => {
      const svgFile = path$1.resolve(iconsDir, `${category}/${iconFile}.svg`);
      const svgCode = await readSvgCode(svgFile);
      const parsedSvg = svgson_umdExports.parseSync(svgCode);
      parsedSvg.children.forEach((child) => {
        if (!child.attributes.key) {
          child.attributes.key = crypto.randomBytes(20).toString("hex");
        }
        if (child.attributes.fill === "#000") {
          child.attributes.fill = "currentColor";
        }
      });
      const iconNodes = iconCategories.reduce((acc, { name }) => {
        acc[iconFile] = parsedSvg.children.map(({ name: name2, attributes }) => [
          name2,
          attributes
        ]);
        return acc;
      }, {});
      appendFileSync$1(iconNodesJson, `${JSON.stringify(iconNodes, null, 2)},
`);
      generateIconFile(iconNodes, pkg);
      generateExportFile(iconFile, pkg);
    });
    totalIcons += iconCategories.length;
    console.log(`Generated ${iconCategories.length} icons for ${category} category`);
  }
});
console.log(`Generated ${totalIcons} icons.- ${pkg}`);
