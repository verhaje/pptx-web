function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* === vendor: jszip.min.js === */
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function (e) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
  }
}(function () {
  return function s(a, o, h) {
    function u(r, e) {
      if (!o[r]) {
        if (!a[r]) {
          var t = "function" == typeof require && require;
          if (!e && t) return t(r, !0);
          if (l) return l(r, !0);
          var n = new Error("Cannot find module '" + r + "'");
          throw n.code = "MODULE_NOT_FOUND", n;
        }
        var i = o[r] = {
          exports: {}
        };
        a[r][0].call(i.exports, function (e) {
          var t = a[r][1][e];
          return u(t || e);
        }, i, i.exports, s, a, o, h);
      }
      return o[r].exports;
    }
    for (var l = "function" == typeof require && require, e = 0; e < h.length; e++) u(h[e]);
    return u;
  }({
    1: [function (e, t, r) {
      "use strict";

      var d = e("./utils"),
        c = e("./support"),
        p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      r.encode = function (e) {
        for (var t, r, n, i, s, a, o, h = [], u = 0, l = e.length, f = l, c = "string" !== d.getTypeOf(e); u < e.length;) f = l - u, n = c ? (t = e[u++], r = u < l ? e[u++] : 0, u < l ? e[u++] : 0) : (t = e.charCodeAt(u++), r = u < l ? e.charCodeAt(u++) : 0, u < l ? e.charCodeAt(u++) : 0), i = t >> 2, s = (3 & t) << 4 | r >> 4, a = 1 < f ? (15 & r) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
        return h.join("");
      }, r.decode = function (e) {
        var t,
          r,
          n,
          i,
          s,
          a,
          o = 0,
          h = 0,
          u = "data:";
        if (e.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
        var l,
          f = 3 * (e = e.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (e.charAt(e.length - 1) === p.charAt(64) && f--, e.charAt(e.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e.length;) t = p.indexOf(e.charAt(o++)) << 2 | (i = p.indexOf(e.charAt(o++))) >> 4, r = (15 & i) << 4 | (s = p.indexOf(e.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e.charAt(o++))), l[h++] = t, 64 !== s && (l[h++] = r), 64 !== a && (l[h++] = n);
        return l;
      };
    }, {
      "./support": 30,
      "./utils": 32
    }],
    2: [function (e, t, r) {
      "use strict";

      var n = e("./external"),
        i = e("./stream/DataWorker"),
        s = e("./stream/Crc32Probe"),
        a = e("./stream/DataLengthProbe");
      function o(e, t, r, n, i) {
        this.compressedSize = e, this.uncompressedSize = t, this.crc32 = r, this.compression = n, this.compressedContent = i;
      }
      o.prototype = {
        getContentWorker: function getContentWorker() {
          var e = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
            t = this;
          return e.on("end", function () {
            if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), e;
        },
        getCompressedWorker: function getCompressedWorker() {
          return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        }
      }, o.createWorkerFrom = function (e, t, r) {
        return e.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", t);
      }, t.exports = o;
    }, {
      "./external": 6,
      "./stream/Crc32Probe": 25,
      "./stream/DataLengthProbe": 26,
      "./stream/DataWorker": 27
    }],
    3: [function (e, t, r) {
      "use strict";

      var n = e("./stream/GenericWorker");
      r.STORE = {
        magic: "\0\0",
        compressWorker: function compressWorker() {
          return new n("STORE compression");
        },
        uncompressWorker: function uncompressWorker() {
          return new n("STORE decompression");
        }
      }, r.DEFLATE = e("./flate");
    }, {
      "./flate": 7,
      "./stream/GenericWorker": 28
    }],
    4: [function (e, t, r) {
      "use strict";

      var n = e("./utils");
      var o = function () {
        for (var e, t = [], r = 0; r < 256; r++) {
          e = r;
          for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
          t[r] = e;
        }
        return t;
      }();
      t.exports = function (e, t) {
        return void 0 !== e && e.length ? "string" !== n.getTypeOf(e) ? function (e, t, r, n) {
          var i = o,
            s = n + r;
          e ^= -1;
          for (var a = n; a < s; a++) e = e >>> 8 ^ i[255 & (e ^ t[a])];
          return -1 ^ e;
        }(0 | t, e, e.length, 0) : function (e, t, r, n) {
          var i = o,
            s = n + r;
          e ^= -1;
          for (var a = n; a < s; a++) e = e >>> 8 ^ i[255 & (e ^ t.charCodeAt(a))];
          return -1 ^ e;
        }(0 | t, e, e.length, 0) : 0;
      };
    }, {
      "./utils": 32
    }],
    5: [function (e, t, r) {
      "use strict";

      r.base64 = !1, r.binary = !1, r.dir = !1, r.createFolders = !0, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
    }, {}],
    6: [function (e, t, r) {
      "use strict";

      var n = null;
      n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = {
        Promise: n
      };
    }, {
      lie: 37
    }],
    7: [function (e, t, r) {
      "use strict";

      var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
        i = e("pako"),
        s = e("./utils"),
        a = e("./stream/GenericWorker"),
        o = n ? "uint8array" : "array";
      function h(e, t) {
        a.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
      }
      r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function (e) {
        this.meta = e.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e.data), !1);
      }, h.prototype.flush = function () {
        a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0);
      }, h.prototype.cleanUp = function () {
        a.prototype.cleanUp.call(this), this._pako = null;
      }, h.prototype._createPako = function () {
        this._pako = new i[this._pakoAction]({
          raw: !0,
          level: this._pakoOptions.level || -1
        });
        var t = this;
        this._pako.onData = function (e) {
          t.push({
            data: e,
            meta: t.meta
          });
        };
      }, r.compressWorker = function (e) {
        return new h("Deflate", e);
      }, r.uncompressWorker = function () {
        return new h("Inflate", {});
      };
    }, {
      "./stream/GenericWorker": 28,
      "./utils": 32,
      pako: 38
    }],
    8: [function (e, t, r) {
      "use strict";

      function A(e, t) {
        var r,
          n = "";
        for (r = 0; r < t; r++) n += String.fromCharCode(255 & e), e >>>= 8;
        return n;
      }
      function n(e, t, r, n, i, s) {
        var a,
          o,
          h = e.file,
          u = e.compression,
          l = s !== O.utf8encode,
          f = I.transformTo("string", s(h.name)),
          c = I.transformTo("string", O.utf8encode(h.name)),
          d = h.comment,
          p = I.transformTo("string", s(d)),
          m = I.transformTo("string", O.utf8encode(d)),
          _ = c.length !== h.name.length,
          g = m.length !== d.length,
          b = "",
          v = "",
          y = "",
          w = h.dir,
          k = h.date,
          x = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
        t && !r || (x.crc32 = e.crc32, x.compressedSize = e.compressedSize, x.uncompressedSize = e.uncompressedSize);
        var S = 0;
        t && (S |= 8), l || !_ && !g || (S |= 2048);
        var z = 0,
          C = 0;
        w && (z |= 16), "UNIX" === i ? (C = 798, z |= function (e, t) {
          var r = e;
          return e || (r = t ? 16893 : 33204), (65535 & r) << 16;
        }(h.unixPermissions, w)) : (C = 20, z |= function (e) {
          return 63 & (e || 0);
        }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
        var E = "";
        return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), {
          fileRecord: R.LOCAL_FILE_HEADER + E + f + b,
          dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n, 4) + f + b + p
        };
      }
      var I = e("../utils"),
        i = e("../stream/GenericWorker"),
        O = e("../utf8"),
        B = e("../crc32"),
        R = e("../signature");
      function s(e, t, r, n) {
        i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = r, this.encodeFileName = n, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      I.inherits(s, i), s.prototype.push = function (e) {
        var t = e.meta.percent || 0,
          r = this.entriesCount,
          n = this._sources.length;
        this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, i.prototype.push.call(this, {
          data: e.data,
          meta: {
            currentFile: this.currentFile,
            percent: r ? (t + 100 * (r - n - 1)) / r : 100
          }
        }));
      }, s.prototype.openedSource = function (e) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
        var t = this.streamFiles && !e.file.dir;
        if (t) {
          var r = n(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({
            data: r.fileRecord,
            meta: {
              percent: 0
            }
          });
        } else this.accumulate = !0;
      }, s.prototype.closedSource = function (e) {
        this.accumulate = !1;
        var t = this.streamFiles && !e.file.dir,
          r = n(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(r.dirRecord), t) this.push({
          data: function (e) {
            return R.DATA_DESCRIPTOR + A(e.crc32, 4) + A(e.compressedSize, 4) + A(e.uncompressedSize, 4);
          }(e),
          meta: {
            percent: 100
          }
        });else for (this.push({
          data: r.fileRecord,
          meta: {
            percent: 0
          }
        }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, s.prototype.flush = function () {
        for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
          data: this.dirRecords[t],
          meta: {
            percent: 100
          }
        });
        var r = this.bytesWritten - e,
          n = function (e, t, r, n, i) {
            var s = I.transformTo("string", i(n));
            return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e, 2) + A(e, 2) + A(t, 4) + A(r, 4) + A(s.length, 2) + s;
          }(this.dirRecords.length, r, e, this.zipComment, this.encodeFileName);
        this.push({
          data: n,
          meta: {
            percent: 100
          }
        });
      }, s.prototype.prepareNextSource = function () {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, s.prototype.registerPrevious = function (e) {
        this._sources.push(e);
        var t = this;
        return e.on("data", function (e) {
          t.processChunk(e);
        }), e.on("end", function () {
          t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
        }), e.on("error", function (e) {
          t.error(e);
        }), this;
      }, s.prototype.resume = function () {
        return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, s.prototype.error = function (e) {
        var t = this._sources;
        if (!i.prototype.error.call(this, e)) return !1;
        for (var r = 0; r < t.length; r++) try {
          t[r].error(e);
        } catch (e) {}
        return !0;
      }, s.prototype.lock = function () {
        i.prototype.lock.call(this);
        for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock();
      }, t.exports = s;
    }, {
      "../crc32": 4,
      "../signature": 23,
      "../stream/GenericWorker": 28,
      "../utf8": 31,
      "../utils": 32
    }],
    9: [function (e, t, r) {
      "use strict";

      var u = e("../compressions"),
        n = e("./ZipFileWorker");
      r.generateWorker = function (e, a, t) {
        var o = new n(a.streamFiles, t, a.platform, a.encodeFileName),
          h = 0;
        try {
          e.forEach(function (e, t) {
            h++;
            var r = function (e, t) {
                var r = e || t,
                  n = u[r];
                if (!n) throw new Error(r + " is not a valid compression method !");
                return n;
              }(t.options.compression, a.compression),
              n = t.options.compressionOptions || a.compressionOptions || {},
              i = t.dir,
              s = t.date;
            t._compressWorker(r, n).withStreamInfo("file", {
              name: e,
              dir: i,
              date: s,
              comment: t.comment || "",
              unixPermissions: t.unixPermissions,
              dosPermissions: t.dosPermissions
            }).pipe(o);
          }), o.entriesCount = h;
        } catch (e) {
          o.error(e);
        }
        return o;
      };
    }, {
      "../compressions": 3,
      "./ZipFileWorker": 8
    }],
    10: [function (e, t, r) {
      "use strict";

      function n() {
        if (!(this instanceof n)) return new n();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function () {
          var e = new n();
          for (var t in this) "function" != typeof this[t] && (e[t] = this[t]);
          return e;
        };
      }
      (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function (e, t) {
        return new n().loadAsync(e, t);
      }, n.external = e("./external"), t.exports = n;
    }, {
      "./defaults": 5,
      "./external": 6,
      "./load": 11,
      "./object": 15,
      "./support": 30
    }],
    11: [function (e, t, r) {
      "use strict";

      var u = e("./utils"),
        i = e("./external"),
        n = e("./utf8"),
        s = e("./zipEntries"),
        a = e("./stream/Crc32Probe"),
        l = e("./nodejsUtils");
      function f(n) {
        return new i.Promise(function (e, t) {
          var r = n.decompressed.getContentWorker().pipe(new a());
          r.on("error", function (e) {
            t(e);
          }).on("end", function () {
            r.streamInfo.crc32 !== n.decompressed.crc32 ? t(new Error("Corrupted zip : CRC32 mismatch")) : e();
          }).resume();
        });
      }
      t.exports = function (e, o) {
        var h = this;
        return o = u.extend(o || {}, {
          base64: !1,
          checkCRC32: !1,
          optimizedBinaryString: !1,
          createFolders: !1,
          decodeFileName: n.utf8decode
        }), l.isNode && l.isStream(e) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e, !0, o.optimizedBinaryString, o.base64).then(function (e) {
          var t = new s(o);
          return t.load(e), t;
        }).then(function (e) {
          var t = [i.Promise.resolve(e)],
            r = e.files;
          if (o.checkCRC32) for (var n = 0; n < r.length; n++) t.push(f(r[n]));
          return i.Promise.all(t);
        }).then(function (e) {
          for (var t = e.shift(), r = t.files, n = 0; n < r.length; n++) {
            var i = r[n],
              s = i.fileNameStr,
              a = u.resolve(i.fileNameStr);
            h.file(a, i.decompressed, {
              binary: !0,
              optimizedBinaryString: !0,
              date: i.date,
              dir: i.dir,
              comment: i.fileCommentStr.length ? i.fileCommentStr : null,
              unixPermissions: i.unixPermissions,
              dosPermissions: i.dosPermissions,
              createFolders: o.createFolders
            }), i.dir || (h.file(a).unsafeOriginalName = s);
          }
          return t.zipComment.length && (h.comment = t.zipComment), h;
        });
      };
    }, {
      "./external": 6,
      "./nodejsUtils": 14,
      "./stream/Crc32Probe": 25,
      "./utf8": 31,
      "./utils": 32,
      "./zipEntries": 33
    }],
    12: [function (e, t, r) {
      "use strict";

      var n = e("../utils"),
        i = e("../stream/GenericWorker");
      function s(e, t) {
        i.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
      }
      n.inherits(s, i), s.prototype._bindStream = function (e) {
        var t = this;
        (this._stream = e).pause(), e.on("data", function (e) {
          t.push({
            data: e,
            meta: {
              percent: 0
            }
          });
        }).on("error", function (e) {
          t.isPaused ? this.generatedError = e : t.error(e);
        }).on("end", function () {
          t.isPaused ? t._upstreamEnded = !0 : t.end();
        });
      }, s.prototype.pause = function () {
        return !!i.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, s.prototype.resume = function () {
        return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, t.exports = s;
    }, {
      "../stream/GenericWorker": 28,
      "../utils": 32
    }],
    13: [function (e, t, r) {
      "use strict";

      var i = e("readable-stream").Readable;
      function n(e, t, r) {
        i.call(this, t), this._helper = e;
        var n = this;
        e.on("data", function (e, t) {
          n.push(e) || n._helper.pause(), r && r(t);
        }).on("error", function (e) {
          n.emit("error", e);
        }).on("end", function () {
          n.push(null);
        });
      }
      e("../utils").inherits(n, i), n.prototype._read = function () {
        this._helper.resume();
      }, t.exports = n;
    }, {
      "../utils": 32,
      "readable-stream": 16
    }],
    14: [function (e, t, r) {
      "use strict";

      t.exports = {
        isNode: "undefined" != typeof Buffer,
        newBufferFrom: function newBufferFrom(e, t) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e, t);
          if ("number" == typeof e) throw new Error('The "data" argument must not be a number');
          return new Buffer(e, t);
        },
        allocBuffer: function allocBuffer(e) {
          if (Buffer.alloc) return Buffer.alloc(e);
          var t = new Buffer(e);
          return t.fill(0), t;
        },
        isBuffer: function isBuffer(e) {
          return Buffer.isBuffer(e);
        },
        isStream: function isStream(e) {
          return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume;
        }
      };
    }, {}],
    15: [function (e, t, r) {
      "use strict";

      function s(e, t, r) {
        var n,
          i = u.getTypeOf(t),
          s = u.extend(r || {}, f);
        s.date = s.date || new Date(), null !== s.compression && (s.compression = s.compression.toUpperCase()), "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (e = g(e)), s.createFolders && (n = _(e)) && b.call(this, n, !0);
        var a = "string" === i && !1 === s.binary && !1 === s.base64;
        r && void 0 !== r.binary || (s.binary = !a), (t instanceof c && 0 === t.uncompressedSize || s.dir || !t || 0 === t.length) && (s.base64 = !1, s.binary = !0, t = "", s.compression = "STORE", i = "string");
        var o = null;
        o = t instanceof c || t instanceof l ? t : p.isNode && p.isStream(t) ? new m(e, t) : u.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
        var h = new d(e, o, s);
        this.files[e] = h;
      }
      var i = e("./utf8"),
        u = e("./utils"),
        l = e("./stream/GenericWorker"),
        a = e("./stream/StreamHelper"),
        f = e("./defaults"),
        c = e("./compressedObject"),
        d = e("./zipObject"),
        o = e("./generate"),
        p = e("./nodejsUtils"),
        m = e("./nodejs/NodejsStreamInputAdapter"),
        _ = function _(e) {
          "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
          var t = e.lastIndexOf("/");
          return 0 < t ? e.substring(0, t) : "";
        },
        g = function g(e) {
          return "/" !== e.slice(-1) && (e += "/"), e;
        },
        b = function b(e, t) {
          return t = void 0 !== t ? t : f.createFolders, e = g(e), this.files[e] || s.call(this, e, null, {
            dir: !0,
            createFolders: t
          }), this.files[e];
        };
      function h(e) {
        return "[object RegExp]" === Object.prototype.toString.call(e);
      }
      var n = {
        load: function load() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        },
        forEach: function forEach(e) {
          var t, r, n;
          for (t in this.files) n = this.files[t], (r = t.slice(this.root.length, t.length)) && t.slice(0, this.root.length) === this.root && e(r, n);
        },
        filter: function filter(r) {
          var n = [];
          return this.forEach(function (e, t) {
            r(e, t) && n.push(t);
          }), n;
        },
        file: function file(e, t, r) {
          if (1 !== arguments.length) return e = this.root + e, s.call(this, e, t, r), this;
          if (h(e)) {
            var n = e;
            return this.filter(function (e, t) {
              return !t.dir && n.test(e);
            });
          }
          var i = this.files[this.root + e];
          return i && !i.dir ? i : null;
        },
        folder: function folder(r) {
          if (!r) return this;
          if (h(r)) return this.filter(function (e, t) {
            return t.dir && r.test(e);
          });
          var e = this.root + r,
            t = b.call(this, e),
            n = this.clone();
          return n.root = t.name, n;
        },
        remove: function remove(r) {
          r = this.root + r;
          var e = this.files[r];
          if (e || ("/" !== r.slice(-1) && (r += "/"), e = this.files[r]), e && !e.dir) delete this.files[r];else for (var t = this.filter(function (e, t) {
              return t.name.slice(0, r.length) === r;
            }), n = 0; n < t.length; n++) delete this.files[t[n].name];
          return this;
        },
        generate: function generate() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        },
        generateInternalStream: function generateInternalStream(e) {
          var t,
            r = {};
          try {
            if ((r = u.extend(e || {}, {
              streamFiles: !1,
              compression: "STORE",
              compressionOptions: null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: "application/zip",
              encodeFileName: i.utf8encode
            })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type) throw new Error("No output type specified.");
            u.checkSupport(r.type), "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
            var n = r.comment || this.comment || "";
            t = o.generateWorker(this, r, n);
          } catch (e) {
            (t = new l("error")).error(e);
          }
          return new a(t, r.type || "string", r.mimeType);
        },
        generateAsync: function generateAsync(e, t) {
          return this.generateInternalStream(e).accumulate(t);
        },
        generateNodeStream: function generateNodeStream(e, t) {
          return (e = e || {}).type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
        }
      };
      t.exports = n;
    }, {
      "./compressedObject": 2,
      "./defaults": 5,
      "./generate": 9,
      "./nodejs/NodejsStreamInputAdapter": 12,
      "./nodejsUtils": 14,
      "./stream/GenericWorker": 28,
      "./stream/StreamHelper": 29,
      "./utf8": 31,
      "./utils": 32,
      "./zipObject": 35
    }],
    16: [function (e, t, r) {
      "use strict";

      t.exports = e("stream");
    }, {
      stream: void 0
    }],
    17: [function (e, t, r) {
      "use strict";

      var n = e("./DataReader");
      function i(e) {
        n.call(this, e);
        for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t];
      }
      e("../utils").inherits(i, n), i.prototype.byteAt = function (e) {
        return this.data[this.zero + e];
      }, i.prototype.lastIndexOfSignature = function (e) {
        for (var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t && this.data[s + 1] === r && this.data[s + 2] === n && this.data[s + 3] === i) return s - this.zero;
        return -1;
      }, i.prototype.readAndCheckSignature = function (e) {
        var t = e.charCodeAt(0),
          r = e.charCodeAt(1),
          n = e.charCodeAt(2),
          i = e.charCodeAt(3),
          s = this.readData(4);
        return t === s[0] && r === s[1] && n === s[2] && i === s[3];
      }, i.prototype.readData = function (e) {
        if (this.checkOffset(e), 0 === e) return [];
        var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = i;
    }, {
      "../utils": 32,
      "./DataReader": 18
    }],
    18: [function (e, t, r) {
      "use strict";

      var n = e("../utils");
      function i(e) {
        this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
      }
      i.prototype = {
        checkOffset: function checkOffset(e) {
          this.checkIndex(this.index + e);
        },
        checkIndex: function checkIndex(e) {
          if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
        },
        setIndex: function setIndex(e) {
          this.checkIndex(e), this.index = e;
        },
        skip: function skip(e) {
          this.setIndex(this.index + e);
        },
        byteAt: function byteAt() {},
        readInt: function readInt(e) {
          var t,
            r = 0;
          for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) r = (r << 8) + this.byteAt(t);
          return this.index += e, r;
        },
        readString: function readString(e) {
          return n.transformTo("string", this.readData(e));
        },
        readData: function readData() {},
        lastIndexOfSignature: function lastIndexOfSignature() {},
        readAndCheckSignature: function readAndCheckSignature() {},
        readDate: function readDate() {
          var e = this.readInt(4);
          return new Date(Date.UTC(1980 + (e >> 25 & 127), (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1));
        }
      }, t.exports = i;
    }, {
      "../utils": 32
    }],
    19: [function (e, t, r) {
      "use strict";

      var n = e("./Uint8ArrayReader");
      function i(e) {
        n.call(this, e);
      }
      e("../utils").inherits(i, n), i.prototype.readData = function (e) {
        this.checkOffset(e);
        var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = i;
    }, {
      "../utils": 32,
      "./Uint8ArrayReader": 21
    }],
    20: [function (e, t, r) {
      "use strict";

      var n = e("./DataReader");
      function i(e) {
        n.call(this, e);
      }
      e("../utils").inherits(i, n), i.prototype.byteAt = function (e) {
        return this.data.charCodeAt(this.zero + e);
      }, i.prototype.lastIndexOfSignature = function (e) {
        return this.data.lastIndexOf(e) - this.zero;
      }, i.prototype.readAndCheckSignature = function (e) {
        return e === this.readData(4);
      }, i.prototype.readData = function (e) {
        this.checkOffset(e);
        var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = i;
    }, {
      "../utils": 32,
      "./DataReader": 18
    }],
    21: [function (e, t, r) {
      "use strict";

      var n = e("./ArrayReader");
      function i(e) {
        n.call(this, e);
      }
      e("../utils").inherits(i, n), i.prototype.readData = function (e) {
        if (this.checkOffset(e), 0 === e) return new Uint8Array(0);
        var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
        return this.index += e, t;
      }, t.exports = i;
    }, {
      "../utils": 32,
      "./ArrayReader": 17
    }],
    22: [function (e, t, r) {
      "use strict";

      var n = e("../utils"),
        i = e("../support"),
        s = e("./ArrayReader"),
        a = e("./StringReader"),
        o = e("./NodeBufferReader"),
        h = e("./Uint8ArrayReader");
      t.exports = function (e) {
        var t = n.getTypeOf(e);
        return n.checkSupport(t), "string" !== t || i.uint8array ? "nodebuffer" === t ? new o(e) : i.uint8array ? new h(n.transformTo("uint8array", e)) : new s(n.transformTo("array", e)) : new a(e);
      };
    }, {
      "../support": 30,
      "../utils": 32,
      "./ArrayReader": 17,
      "./NodeBufferReader": 19,
      "./StringReader": 20,
      "./Uint8ArrayReader": 21
    }],
    23: [function (e, t, r) {
      "use strict";

      r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\b";
    }, {}],
    24: [function (e, t, r) {
      "use strict";

      var n = e("./GenericWorker"),
        i = e("../utils");
      function s(e) {
        n.call(this, "ConvertWorker to " + e), this.destType = e;
      }
      i.inherits(s, n), s.prototype.processChunk = function (e) {
        this.push({
          data: i.transformTo(this.destType, e.data),
          meta: e.meta
        });
      }, t.exports = s;
    }, {
      "../utils": 32,
      "./GenericWorker": 28
    }],
    25: [function (e, t, r) {
      "use strict";

      var n = e("./GenericWorker"),
        i = e("../crc32");
      function s() {
        n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      e("../utils").inherits(s, n), s.prototype.processChunk = function (e) {
        this.streamInfo.crc32 = i(e.data, this.streamInfo.crc32 || 0), this.push(e);
      }, t.exports = s;
    }, {
      "../crc32": 4,
      "../utils": 32,
      "./GenericWorker": 28
    }],
    26: [function (e, t, r) {
      "use strict";

      var n = e("../utils"),
        i = e("./GenericWorker");
      function s(e) {
        i.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
      }
      n.inherits(s, i), s.prototype.processChunk = function (e) {
        if (e) {
          var t = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = t + e.data.length;
        }
        i.prototype.processChunk.call(this, e);
      }, t.exports = s;
    }, {
      "../utils": 32,
      "./GenericWorker": 28
    }],
    27: [function (e, t, r) {
      "use strict";

      var n = e("../utils"),
        i = e("./GenericWorker");
      function s(e) {
        i.call(this, "DataWorker");
        var t = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function (e) {
          t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = n.getTypeOf(e), t.isPaused || t._tickAndRepeat();
        }, function (e) {
          t.error(e);
        });
      }
      n.inherits(s, i), s.prototype.cleanUp = function () {
        i.prototype.cleanUp.call(this), this.data = null;
      }, s.prototype.resume = function () {
        return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, n.delay(this._tickAndRepeat, [], this)), !0);
      }, s.prototype._tickAndRepeat = function () {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, s.prototype._tick = function () {
        if (this.isPaused || this.isFinished) return !1;
        var e = null,
          t = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            e = this.data.substring(this.index, t);
            break;
          case "uint8array":
            e = this.data.subarray(this.index, t);
            break;
          case "array":
          case "nodebuffer":
            e = this.data.slice(this.index, t);
        }
        return this.index = t, this.push({
          data: e,
          meta: {
            percent: this.max ? this.index / this.max * 100 : 0
          }
        });
      }, t.exports = s;
    }, {
      "../utils": 32,
      "./GenericWorker": 28
    }],
    28: [function (e, t, r) {
      "use strict";

      function n(e) {
        this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
          data: [],
          end: [],
          error: []
        }, this.previous = null;
      }
      n.prototype = {
        push: function push(e) {
          this.emit("data", e);
        },
        end: function end() {
          if (this.isFinished) return !1;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = !0;
          } catch (e) {
            this.emit("error", e);
          }
          return !0;
        },
        error: function error(e) {
          return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
        },
        on: function on(e, t) {
          return this._listeners[e].push(t), this;
        },
        cleanUp: function cleanUp() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        },
        emit: function emit(e, t) {
          if (this._listeners[e]) for (var r = 0; r < this._listeners[e].length; r++) this._listeners[e][r].call(this, t);
        },
        pipe: function pipe(e) {
          return e.registerPrevious(this);
        },
        registerPrevious: function registerPrevious(e) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
          var t = this;
          return e.on("data", function (e) {
            t.processChunk(e);
          }), e.on("end", function () {
            t.end();
          }), e.on("error", function (e) {
            t.error(e);
          }), this;
        },
        pause: function pause() {
          return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
        },
        resume: function resume() {
          if (!this.isPaused || this.isFinished) return !1;
          var e = this.isPaused = !1;
          return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
        },
        flush: function flush() {},
        processChunk: function processChunk(e) {
          this.push(e);
        },
        withStreamInfo: function withStreamInfo(e, t) {
          return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
        },
        mergeStreamInfo: function mergeStreamInfo() {
          for (var e in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
        },
        lock: function lock() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = !0, this.previous && this.previous.lock();
        },
        toString: function toString() {
          var e = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + e : e;
        }
      }, t.exports = n;
    }, {}],
    29: [function (e, t, r) {
      "use strict";

      var h = e("../utils"),
        i = e("./ConvertWorker"),
        s = e("./GenericWorker"),
        u = e("../base64"),
        n = e("../support"),
        a = e("../external"),
        o = null;
      if (n.nodestream) try {
        o = e("../nodejs/NodejsStreamOutputAdapter");
      } catch (e) {}
      function l(e, o) {
        return new a.Promise(function (t, r) {
          var n = [],
            i = e._internalType,
            s = e._outputType,
            a = e._mimeType;
          e.on("data", function (e, t) {
            n.push(e), o && o(t);
          }).on("error", function (e) {
            n = [], r(e);
          }).on("end", function () {
            try {
              var e = function (e, t, r) {
                switch (e) {
                  case "blob":
                    return h.newBlob(h.transformTo("arraybuffer", t), r);
                  case "base64":
                    return u.encode(t);
                  default:
                    return h.transformTo(e, t);
                }
              }(s, function (e, t) {
                var r,
                  n = 0,
                  i = null,
                  s = 0;
                for (r = 0; r < t.length; r++) s += t[r].length;
                switch (e) {
                  case "string":
                    return t.join("");
                  case "array":
                    return Array.prototype.concat.apply([], t);
                  case "uint8array":
                    for (i = new Uint8Array(s), r = 0; r < t.length; r++) i.set(t[r], n), n += t[r].length;
                    return i;
                  case "nodebuffer":
                    return Buffer.concat(t);
                  default:
                    throw new Error("concat : unsupported type '" + e + "'");
                }
              }(i, n), a);
              t(e);
            } catch (e) {
              r(e);
            }
            n = [];
          }).resume();
        });
      }
      function f(e, t, r) {
        var n = t;
        switch (t) {
          case "blob":
          case "arraybuffer":
            n = "uint8array";
            break;
          case "base64":
            n = "string";
        }
        try {
          this._internalType = n, this._outputType = t, this._mimeType = r, h.checkSupport(n), this._worker = e.pipe(new i(n)), e.lock();
        } catch (e) {
          this._worker = new s("error"), this._worker.error(e);
        }
      }
      f.prototype = {
        accumulate: function accumulate(e) {
          return l(this, e);
        },
        on: function on(e, t) {
          var r = this;
          return "data" === e ? this._worker.on(e, function (e) {
            t.call(r, e.data, e.meta);
          }) : this._worker.on(e, function () {
            h.delay(t, arguments, r);
          }), this;
        },
        resume: function resume() {
          return h.delay(this._worker.resume, [], this._worker), this;
        },
        pause: function pause() {
          return this._worker.pause(), this;
        },
        toNodejsStream: function toNodejsStream(e) {
          if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
          return new o(this, {
            objectMode: "nodebuffer" !== this._outputType
          }, e);
        }
      }, t.exports = f;
    }, {
      "../base64": 1,
      "../external": 6,
      "../nodejs/NodejsStreamOutputAdapter": 13,
      "../support": 30,
      "../utils": 32,
      "./ConvertWorker": 24,
      "./GenericWorker": 28
    }],
    30: [function (e, t, r) {
      "use strict";

      if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = !1;else {
        var n = new ArrayBuffer(0);
        try {
          r.blob = 0 === new Blob([n], {
            type: "application/zip"
          }).size;
        } catch (e) {
          try {
            var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
          } catch (e) {
            r.blob = !1;
          }
        }
      }
      try {
        r.nodestream = !!e("readable-stream").Readable;
      } catch (e) {
        r.nodestream = !1;
      }
    }, {
      "readable-stream": 16
    }],
    31: [function (e, t, s) {
      "use strict";

      for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
      u[254] = u[254] = 1;
      function a() {
        n.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function l() {
        n.call(this, "utf-8 encode");
      }
      s.utf8encode = function (e) {
        return h.nodebuffer ? r.newBufferFrom(e, "utf-8") : function (e) {
          var t,
            r,
            n,
            i,
            s,
            a = e.length,
            o = 0;
          for (i = 0; i < a; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
          for (t = h.uint8array ? new Uint8Array(o) : new Array(o), i = s = 0; s < o; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), r < 128 ? t[s++] = r : (r < 2048 ? t[s++] = 192 | r >>> 6 : (r < 65536 ? t[s++] = 224 | r >>> 12 : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63), t[s++] = 128 | r >>> 6 & 63), t[s++] = 128 | 63 & r);
          return t;
        }(e);
      }, s.utf8decode = function (e) {
        return h.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : function (e) {
          var t,
            r,
            n,
            i,
            s = e.length,
            a = new Array(2 * s);
          for (t = r = 0; t < s;) if ((n = e[t++]) < 128) a[r++] = n;else if (4 < (i = u[n])) a[r++] = 65533, t += i - 1;else {
            for (n &= 2 === i ? 31 : 3 === i ? 15 : 7; 1 < i && t < s;) n = n << 6 | 63 & e[t++], i--;
            1 < i ? a[r++] = 65533 : n < 65536 ? a[r++] = n : (n -= 65536, a[r++] = 55296 | n >> 10 & 1023, a[r++] = 56320 | 1023 & n);
          }
          return a.length !== r && (a.subarray ? a = a.subarray(0, r) : a.length = r), o.applyFromCharCode(a);
        }(e = o.transformTo(h.uint8array ? "uint8array" : "array", e));
      }, o.inherits(a, n), a.prototype.processChunk = function (e) {
        var t = o.transformTo(h.uint8array ? "uint8array" : "array", e.data);
        if (this.leftOver && this.leftOver.length) {
          if (h.uint8array) {
            var r = t;
            (t = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), t.set(r, this.leftOver.length);
          } else t = this.leftOver.concat(t);
          this.leftOver = null;
        }
        var n = function (e, t) {
            var r;
            for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]);) r--;
            return r < 0 ? t : 0 === r ? t : r + u[e[r]] > t ? r : t;
          }(t),
          i = t;
        n !== t.length && (h.uint8array ? (i = t.subarray(0, n), this.leftOver = t.subarray(n, t.length)) : (i = t.slice(0, n), this.leftOver = t.slice(n, t.length))), this.push({
          data: s.utf8decode(i),
          meta: e.meta
        });
      }, a.prototype.flush = function () {
        this.leftOver && this.leftOver.length && (this.push({
          data: s.utf8decode(this.leftOver),
          meta: {}
        }), this.leftOver = null);
      }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function (e) {
        this.push({
          data: s.utf8encode(e.data),
          meta: e.meta
        });
      }, s.Utf8EncodeWorker = l;
    }, {
      "./nodejsUtils": 14,
      "./stream/GenericWorker": 28,
      "./support": 30,
      "./utils": 32
    }],
    32: [function (e, t, a) {
      "use strict";

      var o = e("./support"),
        h = e("./base64"),
        r = e("./nodejsUtils"),
        u = e("./external");
      function n(e) {
        return e;
      }
      function l(e, t) {
        for (var r = 0; r < e.length; ++r) t[r] = 255 & e.charCodeAt(r);
        return t;
      }
      e("setimmediate"), a.newBlob = function (t, r) {
        a.checkSupport("blob");
        try {
          return new Blob([t], {
            type: r
          });
        } catch (e) {
          try {
            var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return n.append(t), n.getBlob(r);
          } catch (e) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var i = {
        stringifyByChunk: function stringifyByChunk(e, t, r) {
          var n = [],
            i = 0,
            s = e.length;
          if (s <= r) return String.fromCharCode.apply(null, e);
          for (; i < s;) "array" === t || "nodebuffer" === t ? n.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + r, s)))) : n.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + r, s)))), i += r;
          return n.join("");
        },
        stringifyByChar: function stringifyByChar(e) {
          for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
          return t;
        },
        applyCanBeUsed: {
          uint8array: function () {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e) {
              return !1;
            }
          }(),
          nodebuffer: function () {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e) {
              return !1;
            }
          }()
        }
      };
      function s(e) {
        var t = 65536,
          r = a.getTypeOf(e),
          n = !0;
        if ("uint8array" === r ? n = i.applyCanBeUsed.uint8array : "nodebuffer" === r && (n = i.applyCanBeUsed.nodebuffer), n) for (; 1 < t;) try {
          return i.stringifyByChunk(e, r, t);
        } catch (e) {
          t = Math.floor(t / 2);
        }
        return i.stringifyByChar(e);
      }
      function f(e, t) {
        for (var r = 0; r < e.length; r++) t[r] = e[r];
        return t;
      }
      a.applyFromCharCode = s;
      var c = {};
      c.string = {
        string: n,
        array: function array(e) {
          return l(e, new Array(e.length));
        },
        arraybuffer: function arraybuffer(e) {
          return c.string.uint8array(e).buffer;
        },
        uint8array: function uint8array(e) {
          return l(e, new Uint8Array(e.length));
        },
        nodebuffer: function nodebuffer(e) {
          return l(e, r.allocBuffer(e.length));
        }
      }, c.array = {
        string: s,
        array: n,
        arraybuffer: function arraybuffer(e) {
          return new Uint8Array(e).buffer;
        },
        uint8array: function uint8array(e) {
          return new Uint8Array(e);
        },
        nodebuffer: function nodebuffer(e) {
          return r.newBufferFrom(e);
        }
      }, c.arraybuffer = {
        string: function string(e) {
          return s(new Uint8Array(e));
        },
        array: function array(e) {
          return f(new Uint8Array(e), new Array(e.byteLength));
        },
        arraybuffer: n,
        uint8array: function uint8array(e) {
          return new Uint8Array(e);
        },
        nodebuffer: function nodebuffer(e) {
          return r.newBufferFrom(new Uint8Array(e));
        }
      }, c.uint8array = {
        string: s,
        array: function array(e) {
          return f(e, new Array(e.length));
        },
        arraybuffer: function arraybuffer(e) {
          return e.buffer;
        },
        uint8array: n,
        nodebuffer: function nodebuffer(e) {
          return r.newBufferFrom(e);
        }
      }, c.nodebuffer = {
        string: s,
        array: function array(e) {
          return f(e, new Array(e.length));
        },
        arraybuffer: function arraybuffer(e) {
          return c.nodebuffer.uint8array(e).buffer;
        },
        uint8array: function uint8array(e) {
          return f(e, new Uint8Array(e.length));
        },
        nodebuffer: n
      }, a.transformTo = function (e, t) {
        if (t = t || "", !e) return t;
        a.checkSupport(e);
        var r = a.getTypeOf(t);
        return c[r][e](t);
      }, a.resolve = function (e) {
        for (var t = e.split("/"), r = [], n = 0; n < t.length; n++) {
          var i = t[n];
          "." === i || "" === i && 0 !== n && n !== t.length - 1 || (".." === i ? r.pop() : r.push(i));
        }
        return r.join("/");
      }, a.getTypeOf = function (e) {
        return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : o.nodebuffer && r.isBuffer(e) ? "nodebuffer" : o.uint8array && e instanceof Uint8Array ? "uint8array" : o.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, a.checkSupport = function (e) {
        if (!o[e.toLowerCase()]) throw new Error(e + " is not supported by this platform");
      }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function (e) {
        var t,
          r,
          n = "";
        for (r = 0; r < (e || "").length; r++) n += "\\x" + ((t = e.charCodeAt(r)) < 16 ? "0" : "") + t.toString(16).toUpperCase();
        return n;
      }, a.delay = function (e, t, r) {
        setImmediate(function () {
          e.apply(r || null, t || []);
        });
      }, a.inherits = function (e, t) {
        function r() {}
        r.prototype = t.prototype, e.prototype = new r();
      }, a.extend = function () {
        var e,
          t,
          r = {};
        for (e = 0; e < arguments.length; e++) for (t in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], t) && void 0 === r[t] && (r[t] = arguments[e][t]);
        return r;
      }, a.prepareContent = function (r, e, n, i, s) {
        return u.Promise.resolve(e).then(function (n) {
          return o.blob && (n instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n))) && "undefined" != typeof FileReader ? new u.Promise(function (t, r) {
            var e = new FileReader();
            e.onload = function (e) {
              t(e.target.result);
            }, e.onerror = function (e) {
              r(e.target.error);
            }, e.readAsArrayBuffer(n);
          }) : n;
        }).then(function (e) {
          var t = a.getTypeOf(e);
          return t ? ("arraybuffer" === t ? e = a.transformTo("uint8array", e) : "string" === t && (s ? e = h.decode(e) : n && !0 !== i && (e = function (e) {
            return l(e, o.uint8array ? new Uint8Array(e.length) : new Array(e.length));
          }(e))), e) : u.Promise.reject(new Error("Can't read the data of '" + r + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, {
      "./base64": 1,
      "./external": 6,
      "./nodejsUtils": 14,
      "./support": 30,
      setimmediate: 54
    }],
    33: [function (e, t, r) {
      "use strict";

      var n = e("./reader/readerFor"),
        i = e("./utils"),
        s = e("./signature"),
        a = e("./zipEntry"),
        o = e("./support");
      function h(e) {
        this.files = [], this.loadOptions = e;
      }
      h.prototype = {
        checkSignature: function checkSignature(e) {
          if (!this.reader.readAndCheckSignature(e)) {
            this.reader.index -= 4;
            var t = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t) + ", expected " + i.pretty(e) + ")");
          }
        },
        isSignature: function isSignature(e, t) {
          var r = this.reader.index;
          this.reader.setIndex(e);
          var n = this.reader.readString(4) === t;
          return this.reader.setIndex(r), n;
        },
        readBlockEndOfCentral: function readBlockEndOfCentral() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var e = this.reader.readData(this.zipCommentLength),
            t = o.uint8array ? "uint8array" : "array",
            r = i.transformTo(t, e);
          this.zipComment = this.loadOptions.decodeFileName(r);
        },
        readBlockZip64EndOfCentral: function readBlockZip64EndOfCentral() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var e, t, r, n = this.zip64EndOfCentralSize - 44; 0 < n;) e = this.reader.readInt(2), t = this.reader.readInt(4), r = this.reader.readData(t), this.zip64ExtensibleData[e] = {
            id: e,
            length: t,
            value: r
          };
        },
        readBlockZip64EndOfCentralLocator: function readBlockZip64EndOfCentralLocator() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        },
        readLocalFiles: function readLocalFiles() {
          var e, t;
          for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
        },
        readCentralDir: function readCentralDir() {
          var e;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);) (e = new a({
            zip64: this.zip64
          }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e);
          if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        },
        readEndOfCentral: function readEndOfCentral() {
          var e = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
          if (e < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
          this.reader.setIndex(e);
          var t = e;
          if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
            if (this.zip64 = !0, (e = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(e), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var r = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
          var n = t - r;
          if (0 < n) this.isSignature(t, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n);else if (n < 0) throw new Error("Corrupted zip: missing " + Math.abs(n) + " bytes.");
        },
        prepareReader: function prepareReader(e) {
          this.reader = n(e);
        },
        load: function load(e) {
          this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        }
      }, t.exports = h;
    }, {
      "./reader/readerFor": 22,
      "./signature": 23,
      "./support": 30,
      "./utils": 32,
      "./zipEntry": 34
    }],
    34: [function (e, t, r) {
      "use strict";

      var n = e("./reader/readerFor"),
        s = e("./utils"),
        i = e("./compressedObject"),
        a = e("./crc32"),
        o = e("./utf8"),
        h = e("./compressions"),
        u = e("./support");
      function l(e, t) {
        this.options = e, this.loadOptions = t;
      }
      l.prototype = {
        isEncrypted: function isEncrypted() {
          return 1 == (1 & this.bitFlag);
        },
        useUTF8: function useUTF8() {
          return 2048 == (2048 & this.bitFlag);
        },
        readLocalPart: function readLocalPart(e) {
          var t, r;
          if (e.skip(22), this.fileNameLength = e.readInt(2), r = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if (null === (t = function (e) {
            for (var t in h) if (Object.prototype.hasOwnProperty.call(h, t) && h[t].magic === e) return h[t];
            return null;
          }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
          this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
        },
        readCentralPart: function readCentralPart(e) {
          this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
          var t = e.readInt(2);
          if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
        },
        processAttributes: function processAttributes() {
          this.unixPermissions = null, this.dosPermissions = null;
          var e = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), 0 == e && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0);
        },
        parseZIP64ExtraField: function parseZIP64ExtraField() {
          if (this.extraFields[1]) {
            var e = n(this.extraFields[1].value);
            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
          }
        },
        readExtraFields: function readExtraFields(e) {
          var t,
            r,
            n,
            i = e.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); e.index + 4 < i;) t = e.readInt(2), r = e.readInt(2), n = e.readData(r), this.extraFields[t] = {
            id: t,
            length: r,
            value: n
          };
          e.setIndex(i);
        },
        handleUTF8: function handleUTF8() {
          var e = u.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);else {
            var t = this.findExtraFieldUnicodePath();
            if (null !== t) this.fileNameStr = t;else {
              var r = s.transformTo(e, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(r);
            }
            var n = this.findExtraFieldUnicodeComment();
            if (null !== n) this.fileCommentStr = n;else {
              var i = s.transformTo(e, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(i);
            }
          }
        },
        findExtraFieldUnicodePath: function findExtraFieldUnicodePath() {
          var e = this.extraFields[28789];
          if (e) {
            var t = n(e.value);
            return 1 !== t.readInt(1) ? null : a(this.fileName) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5));
          }
          return null;
        },
        findExtraFieldUnicodeComment: function findExtraFieldUnicodeComment() {
          var e = this.extraFields[25461];
          if (e) {
            var t = n(e.value);
            return 1 !== t.readInt(1) ? null : a(this.fileComment) !== t.readInt(4) ? null : o.utf8decode(t.readData(e.length - 5));
          }
          return null;
        }
      }, t.exports = l;
    }, {
      "./compressedObject": 2,
      "./compressions": 3,
      "./crc32": 4,
      "./reader/readerFor": 22,
      "./support": 30,
      "./utf8": 31,
      "./utils": 32
    }],
    35: [function (e, t, r) {
      "use strict";

      function n(e, t, r) {
        this.name = e, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = t, this._dataBinary = r.binary, this.options = {
          compression: r.compression,
          compressionOptions: r.compressionOptions
        };
      }
      var s = e("./stream/StreamHelper"),
        i = e("./stream/DataWorker"),
        a = e("./utf8"),
        o = e("./compressedObject"),
        h = e("./stream/GenericWorker");
      n.prototype = {
        internalStream: function internalStream(e) {
          var t = null,
            r = "string";
          try {
            if (!e) throw new Error("No output type specified.");
            var n = "string" === (r = e.toLowerCase()) || "text" === r;
            "binarystring" !== r && "text" !== r || (r = "string"), t = this._decompressWorker();
            var i = !this._dataBinary;
            i && !n && (t = t.pipe(new a.Utf8EncodeWorker())), !i && n && (t = t.pipe(new a.Utf8DecodeWorker()));
          } catch (e) {
            (t = new h("error")).error(e);
          }
          return new s(t, r, "");
        },
        async: function async(e, t) {
          return this.internalStream(e).accumulate(t);
        },
        nodeStream: function nodeStream(e, t) {
          return this.internalStream(e || "nodebuffer").toNodejsStream(t);
        },
        _compressWorker: function _compressWorker(e, t) {
          if (this._data instanceof o && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
          var r = this._decompressWorker();
          return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r, e, t);
        },
        _decompressWorker: function _decompressWorker() {
          return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
        }
      };
      for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function l() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
      t.exports = n;
    }, {
      "./compressedObject": 2,
      "./stream/DataWorker": 27,
      "./stream/GenericWorker": 28,
      "./stream/StreamHelper": 29,
      "./utf8": 31
    }],
    36: [function (e, l, t) {
      (function (t) {
        "use strict";

        var r,
          n,
          e = t.MutationObserver || t.WebKitMutationObserver;
        if (e) {
          var i = 0,
            s = new e(u),
            a = t.document.createTextNode("");
          s.observe(a, {
            characterData: !0
          }), r = function r() {
            a.data = i = ++i % 2;
          };
        } else if (t.setImmediate || void 0 === t.MessageChannel) r = "document" in t && "onreadystatechange" in t.document.createElement("script") ? function () {
          var e = t.document.createElement("script");
          e.onreadystatechange = function () {
            u(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null;
          }, t.document.documentElement.appendChild(e);
        } : function () {
          setTimeout(u, 0);
        };else {
          var o = new t.MessageChannel();
          o.port1.onmessage = u, r = function r() {
            o.port2.postMessage(0);
          };
        }
        var h = [];
        function u() {
          var e, t;
          n = !0;
          for (var r = h.length; r;) {
            for (t = h, h = [], e = -1; ++e < r;) t[e]();
            r = h.length;
          }
          n = !1;
        }
        l.exports = function (e) {
          1 !== h.push(e) || n || r();
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    37: [function (e, t, r) {
      "use strict";

      var i = e("immediate");
      function u() {}
      var l = {},
        s = ["REJECTED"],
        a = ["FULFILLED"],
        n = ["PENDING"];
      function o(e) {
        if ("function" != typeof e) throw new TypeError("resolver must be a function");
        this.state = n, this.queue = [], this.outcome = void 0, e !== u && d(this, e);
      }
      function h(e, t, r) {
        this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected);
      }
      function f(t, r, n) {
        i(function () {
          var e;
          try {
            e = r(n);
          } catch (e) {
            return l.reject(t, e);
          }
          e === t ? l.reject(t, new TypeError("Cannot resolve promise with itself")) : l.resolve(t, e);
        });
      }
      function c(e) {
        var t = e && e.then;
        if (e && ("object" == _typeof(e) || "function" == typeof e) && "function" == typeof t) return function () {
          t.apply(e, arguments);
        };
      }
      function d(t, e) {
        var r = !1;
        function n(e) {
          r || (r = !0, l.reject(t, e));
        }
        function i(e) {
          r || (r = !0, l.resolve(t, e));
        }
        var s = p(function () {
          e(i, n);
        });
        "error" === s.status && n(s.value);
      }
      function p(e, t) {
        var r = {};
        try {
          r.value = e(t), r.status = "success";
        } catch (e) {
          r.status = "error", r.value = e;
        }
        return r;
      }
      (t.exports = o).prototype.finally = function (t) {
        if ("function" != typeof t) return this;
        var r = this.constructor;
        return this.then(function (e) {
          return r.resolve(t()).then(function () {
            return e;
          });
        }, function (e) {
          return r.resolve(t()).then(function () {
            throw e;
          });
        });
      }, o.prototype.catch = function (e) {
        return this.then(null, e);
      }, o.prototype.then = function (e, t) {
        if ("function" != typeof e && this.state === a || "function" != typeof t && this.state === s) return this;
        var r = new this.constructor(u);
        this.state !== n ? f(r, this.state === a ? e : t, this.outcome) : this.queue.push(new h(r, e, t));
        return r;
      }, h.prototype.callFulfilled = function (e) {
        l.resolve(this.promise, e);
      }, h.prototype.otherCallFulfilled = function (e) {
        f(this.promise, this.onFulfilled, e);
      }, h.prototype.callRejected = function (e) {
        l.reject(this.promise, e);
      }, h.prototype.otherCallRejected = function (e) {
        f(this.promise, this.onRejected, e);
      }, l.resolve = function (e, t) {
        var r = p(c, t);
        if ("error" === r.status) return l.reject(e, r.value);
        var n = r.value;
        if (n) d(e, n);else {
          e.state = a, e.outcome = t;
          for (var i = -1, s = e.queue.length; ++i < s;) e.queue[i].callFulfilled(t);
        }
        return e;
      }, l.reject = function (e, t) {
        e.state = s, e.outcome = t;
        for (var r = -1, n = e.queue.length; ++r < n;) e.queue[r].callRejected(t);
        return e;
      }, o.resolve = function (e) {
        if (e instanceof this) return e;
        return l.resolve(new this(u), e);
      }, o.reject = function (e) {
        var t = new this(u);
        return l.reject(t, e);
      }, o.all = function (e) {
        var r = this;
        if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var n = e.length,
          i = !1;
        if (!n) return this.resolve([]);
        var s = new Array(n),
          a = 0,
          t = -1,
          o = new this(u);
        for (; ++t < n;) h(e[t], t);
        return o;
        function h(e, t) {
          r.resolve(e).then(function (e) {
            s[t] = e, ++a !== n || i || (i = !0, l.resolve(o, s));
          }, function (e) {
            i || (i = !0, l.reject(o, e));
          });
        }
      }, o.race = function (e) {
        var t = this;
        if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var r = e.length,
          n = !1;
        if (!r) return this.resolve([]);
        var i = -1,
          s = new this(u);
        for (; ++i < r;) a = e[i], t.resolve(a).then(function (e) {
          n || (n = !0, l.resolve(s, e));
        }, function (e) {
          n || (n = !0, l.reject(s, e));
        });
        var a;
        return s;
      };
    }, {
      immediate: 36
    }],
    38: [function (e, t, r) {
      "use strict";

      var n = {};
      (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
    }, {
      "./lib/deflate": 39,
      "./lib/inflate": 40,
      "./lib/utils/common": 41,
      "./lib/zlib/constants": 44
    }],
    39: [function (e, t, r) {
      "use strict";

      var a = e("./zlib/deflate"),
        o = e("./utils/common"),
        h = e("./utils/strings"),
        i = e("./zlib/messages"),
        s = e("./zlib/zstream"),
        u = Object.prototype.toString,
        l = 0,
        f = -1,
        c = 0,
        d = 8;
      function p(e) {
        if (!(this instanceof p)) return new p(e);
        this.options = o.assign({
          level: f,
          method: d,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: c,
          to: ""
        }, e || {});
        var t = this.options;
        t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
        var r = a.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
        if (r !== l) throw new Error(i[r]);
        if (t.header && a.deflateSetHeader(this.strm, t.header), t.dictionary) {
          var n;
          if (n = "string" == typeof t.dictionary ? h.string2buf(t.dictionary) : "[object ArrayBuffer]" === u.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (r = a.deflateSetDictionary(this.strm, n)) !== l) throw new Error(i[r]);
          this._dict_set = !0;
        }
      }
      function n(e, t) {
        var r = new p(t);
        if (r.push(e, !0), r.err) throw r.msg || i[r.err];
        return r.result;
      }
      p.prototype.push = function (e, t) {
        var r,
          n,
          i = this.strm,
          s = this.options.chunkSize;
        if (this.ended) return !1;
        n = t === ~~t ? t : !0 === t ? 4 : 0, "string" == typeof e ? i.input = h.string2buf(e) : "[object ArrayBuffer]" === u.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;
        do {
          if (0 === i.avail_out && (i.output = new o.Buf8(s), i.next_out = 0, i.avail_out = s), 1 !== (r = a.deflate(i, n)) && r !== l) return this.onEnd(r), !(this.ended = !0);
          0 !== i.avail_out && (0 !== i.avail_in || 4 !== n && 2 !== n) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i.output, i.next_out))) : this.onData(o.shrinkBuf(i.output, i.next_out)));
        } while ((0 < i.avail_in || 0 === i.avail_out) && 1 !== r);
        return 4 === n ? (r = a.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l) : 2 !== n || (this.onEnd(l), !(i.avail_out = 0));
      }, p.prototype.onData = function (e) {
        this.chunks.push(e);
      }, p.prototype.onEnd = function (e) {
        e === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, r.Deflate = p, r.deflate = n, r.deflateRaw = function (e, t) {
        return (t = t || {}).raw = !0, n(e, t);
      }, r.gzip = function (e, t) {
        return (t = t || {}).gzip = !0, n(e, t);
      };
    }, {
      "./utils/common": 41,
      "./utils/strings": 42,
      "./zlib/deflate": 46,
      "./zlib/messages": 51,
      "./zlib/zstream": 53
    }],
    40: [function (e, t, r) {
      "use strict";

      var c = e("./zlib/inflate"),
        d = e("./utils/common"),
        p = e("./utils/strings"),
        m = e("./zlib/constants"),
        n = e("./zlib/messages"),
        i = e("./zlib/zstream"),
        s = e("./zlib/gzheader"),
        _ = Object.prototype.toString;
      function a(e) {
        if (!(this instanceof a)) return new a(e);
        this.options = d.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ""
        }, e || {});
        var t = this.options;
        t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
        var r = c.inflateInit2(this.strm, t.windowBits);
        if (r !== m.Z_OK) throw new Error(n[r]);
        this.header = new s(), c.inflateGetHeader(this.strm, this.header);
      }
      function o(e, t) {
        var r = new a(t);
        if (r.push(e, !0), r.err) throw r.msg || n[r.err];
        return r.result;
      }
      a.prototype.push = function (e, t) {
        var r,
          n,
          i,
          s,
          a,
          o,
          h = this.strm,
          u = this.options.chunkSize,
          l = this.options.dictionary,
          f = !1;
        if (this.ended) return !1;
        n = t === ~~t ? t : !0 === t ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e ? h.input = p.binstring2buf(e) : "[object ArrayBuffer]" === _.call(e) ? h.input = new Uint8Array(e) : h.input = e, h.next_in = 0, h.avail_in = h.input.length;
        do {
          if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r = c.inflateSetDictionary(this.strm, o)), r === m.Z_BUF_ERROR && !0 === f && (r = m.Z_OK, f = !1), r !== m.Z_STREAM_END && r !== m.Z_OK) return this.onEnd(r), !(this.ended = !0);
          h.next_out && (0 !== h.avail_out && r !== m.Z_STREAM_END && (0 !== h.avail_in || n !== m.Z_FINISH && n !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = p.utf8border(h.output, h.next_out), s = h.next_out - i, a = p.buf2string(h.output, i), h.next_out = s, h.avail_out = u - s, s && d.arraySet(h.output, h.output, i, s, 0), this.onData(a)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = !0);
        } while ((0 < h.avail_in || 0 === h.avail_out) && r !== m.Z_STREAM_END);
        return r === m.Z_STREAM_END && (n = m.Z_FINISH), n === m.Z_FINISH ? (r = c.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === m.Z_OK) : n !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
      }, a.prototype.onData = function (e) {
        this.chunks.push(e);
      }, a.prototype.onEnd = function (e) {
        e === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
      }, r.Inflate = a, r.inflate = o, r.inflateRaw = function (e, t) {
        return (t = t || {}).raw = !0, o(e, t);
      }, r.ungzip = o;
    }, {
      "./utils/common": 41,
      "./utils/strings": 42,
      "./zlib/constants": 44,
      "./zlib/gzheader": 47,
      "./zlib/inflate": 49,
      "./zlib/messages": 51,
      "./zlib/zstream": 53
    }],
    41: [function (e, t, r) {
      "use strict";

      var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      r.assign = function (e) {
        for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
          var r = t.shift();
          if (r) {
            if ("object" != _typeof(r)) throw new TypeError(r + "must be non-object");
            for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
          }
        }
        return e;
      }, r.shrinkBuf = function (e, t) {
        return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
      };
      var i = {
          arraySet: function arraySet(e, t, r, n, i) {
            if (t.subarray && e.subarray) e.set(t.subarray(r, r + n), i);else for (var s = 0; s < n; s++) e[i + s] = t[r + s];
          },
          flattenChunks: function flattenChunks(e) {
            var t, r, n, i, s, a;
            for (t = n = 0, r = e.length; t < r; t++) n += e[t].length;
            for (a = new Uint8Array(n), t = i = 0, r = e.length; t < r; t++) s = e[t], a.set(s, i), i += s.length;
            return a;
          }
        },
        s = {
          arraySet: function arraySet(e, t, r, n, i) {
            for (var s = 0; s < n; s++) e[i + s] = t[r + s];
          },
          flattenChunks: function flattenChunks(e) {
            return [].concat.apply([], e);
          }
        };
      r.setTyped = function (e) {
        e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
      }, r.setTyped(n);
    }, {}],
    42: [function (e, t, r) {
      "use strict";

      var h = e("./common"),
        i = !0,
        s = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (e) {
        i = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (e) {
        s = !1;
      }
      for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
      function l(e, t) {
        if (t < 65537 && (e.subarray && s || !e.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e, t));
        for (var r = "", n = 0; n < t; n++) r += String.fromCharCode(e[n]);
        return r;
      }
      u[254] = u[254] = 1, r.string2buf = function (e) {
        var t,
          r,
          n,
          i,
          s,
          a = e.length,
          o = 0;
        for (i = 0; i < a; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
        for (t = new h.Buf8(o), i = s = 0; s < o; i++) 55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < a && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), r < 128 ? t[s++] = r : (r < 2048 ? t[s++] = 192 | r >>> 6 : (r < 65536 ? t[s++] = 224 | r >>> 12 : (t[s++] = 240 | r >>> 18, t[s++] = 128 | r >>> 12 & 63), t[s++] = 128 | r >>> 6 & 63), t[s++] = 128 | 63 & r);
        return t;
      }, r.buf2binstring = function (e) {
        return l(e, e.length);
      }, r.binstring2buf = function (e) {
        for (var t = new h.Buf8(e.length), r = 0, n = t.length; r < n; r++) t[r] = e.charCodeAt(r);
        return t;
      }, r.buf2string = function (e, t) {
        var r,
          n,
          i,
          s,
          a = t || e.length,
          o = new Array(2 * a);
        for (r = n = 0; r < a;) if ((i = e[r++]) < 128) o[n++] = i;else if (4 < (s = u[i])) o[n++] = 65533, r += s - 1;else {
          for (i &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a;) i = i << 6 | 63 & e[r++], s--;
          1 < s ? o[n++] = 65533 : i < 65536 ? o[n++] = i : (i -= 65536, o[n++] = 55296 | i >> 10 & 1023, o[n++] = 56320 | 1023 & i);
        }
        return l(o, n);
      }, r.utf8border = function (e, t) {
        var r;
        for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; 0 <= r && 128 == (192 & e[r]);) r--;
        return r < 0 ? t : 0 === r ? t : r + u[e[r]] > t ? r : t;
      };
    }, {
      "./common": 41
    }],
    43: [function (e, t, r) {
      "use strict";

      t.exports = function (e, t, r, n) {
        for (var i = 65535 & e | 0, s = e >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
          for (r -= a = 2e3 < r ? 2e3 : r; s = s + (i = i + t[n++] | 0) | 0, --a;);
          i %= 65521, s %= 65521;
        }
        return i | s << 16 | 0;
      };
    }, {}],
    44: [function (e, t, r) {
      "use strict";

      t.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
      };
    }, {}],
    45: [function (e, t, r) {
      "use strict";

      var o = function () {
        for (var e, t = [], r = 0; r < 256; r++) {
          e = r;
          for (var n = 0; n < 8; n++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
          t[r] = e;
        }
        return t;
      }();
      t.exports = function (e, t, r, n) {
        var i = o,
          s = n + r;
        e ^= -1;
        for (var a = n; a < s; a++) e = e >>> 8 ^ i[255 & (e ^ t[a])];
        return -1 ^ e;
      };
    }, {}],
    46: [function (e, t, r) {
      "use strict";

      var h,
        c = e("../utils/common"),
        u = e("./trees"),
        d = e("./adler32"),
        p = e("./crc32"),
        n = e("./messages"),
        l = 0,
        f = 4,
        m = 0,
        _ = -2,
        g = -1,
        b = 4,
        i = 2,
        v = 8,
        y = 9,
        s = 286,
        a = 30,
        o = 19,
        w = 2 * s + 1,
        k = 15,
        x = 3,
        S = 258,
        z = S + x + 1,
        C = 42,
        E = 113,
        A = 1,
        I = 2,
        O = 3,
        B = 4;
      function R(e, t) {
        return e.msg = n[t], t;
      }
      function T(e) {
        return (e << 1) - (4 < e ? 9 : 0);
      }
      function D(e) {
        for (var t = e.length; 0 <= --t;) e[t] = 0;
      }
      function F(e) {
        var t = e.state,
          r = t.pending;
        r > e.avail_out && (r = e.avail_out), 0 !== r && (c.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, 0 === t.pending && (t.pending_out = 0));
      }
      function N(e, t) {
        u._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, F(e.strm);
      }
      function U(e, t) {
        e.pending_buf[e.pending++] = t;
      }
      function P(e, t) {
        e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t;
      }
      function L(e, t) {
        var r,
          n,
          i = e.max_chain_length,
          s = e.strstart,
          a = e.prev_length,
          o = e.nice_match,
          h = e.strstart > e.w_size - z ? e.strstart - (e.w_size - z) : 0,
          u = e.window,
          l = e.w_mask,
          f = e.prev,
          c = e.strstart + S,
          d = u[s + a - 1],
          p = u[s + a];
        e.prev_length >= e.good_match && (i >>= 2), o > e.lookahead && (o = e.lookahead);
        do {
          if (u[(r = t) + a] === p && u[r + a - 1] === d && u[r] === u[s] && u[++r] === u[s + 1]) {
            s += 2, r++;
            do {} while (u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && s < c);
            if (n = S - (c - s), s = c - S, a < n) {
              if (e.match_start = t, o <= (a = n)) break;
              d = u[s + a - 1], p = u[s + a];
            }
          }
        } while ((t = f[t & l]) > h && 0 != --i);
        return a <= e.lookahead ? a : e.lookahead;
      }
      function j(e) {
        var t,
          r,
          n,
          i,
          s,
          a,
          o,
          h,
          u,
          l,
          f = e.w_size;
        do {
          if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= f + (f - z)) {
            for (c.arraySet(e.window, e.window, f, f, 0), e.match_start -= f, e.strstart -= f, e.block_start -= f, t = r = e.hash_size; n = e.head[--t], e.head[t] = f <= n ? n - f : 0, --r;);
            for (t = r = f; n = e.prev[--t], e.prev[t] = f <= n ? n - f : 0, --r;);
            i += f;
          }
          if (0 === e.strm.avail_in) break;
          if (a = e.strm, o = e.window, h = e.strstart + e.lookahead, u = i, l = void 0, l = a.avail_in, u < l && (l = u), r = 0 === l ? 0 : (a.avail_in -= l, c.arraySet(o, a.input, a.next_in, l, h), 1 === a.state.wrap ? a.adler = d(a.adler, o, l, h) : 2 === a.state.wrap && (a.adler = p(a.adler, o, l, h)), a.next_in += l, a.total_in += l, l), e.lookahead += r, e.lookahead + e.insert >= x) for (s = e.strstart - e.insert, e.ins_h = e.window[s], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[s + x - 1]) & e.hash_mask, e.prev[s & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = s, s++, e.insert--, !(e.lookahead + e.insert < x)););
        } while (e.lookahead < z && 0 !== e.strm.avail_in);
      }
      function Z(e, t) {
        for (var r, n;;) {
          if (e.lookahead < z) {
            if (j(e), e.lookahead < z && t === l) return A;
            if (0 === e.lookahead) break;
          }
          if (r = 0, e.lookahead >= x && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== r && e.strstart - r <= e.w_size - z && (e.match_length = L(e, r)), e.match_length >= x) {
            if (n = u._tr_tally(e, e.strstart - e.match_start, e.match_length - x), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= x) {
              for (e.match_length--; e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart, 0 != --e.match_length;);
              e.strstart++;
            } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
          } else n = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
          if (n && (N(e, !1), 0 === e.strm.avail_out)) return A;
        }
        return e.insert = e.strstart < x - 1 ? e.strstart : x - 1, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
      }
      function W(e, t) {
        for (var r, n, i;;) {
          if (e.lookahead < z) {
            if (j(e), e.lookahead < z && t === l) return A;
            if (0 === e.lookahead) break;
          }
          if (r = 0, e.lookahead >= x && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = x - 1, 0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - z && (e.match_length = L(e, r), e.match_length <= 5 && (1 === e.strategy || e.match_length === x && 4096 < e.strstart - e.match_start) && (e.match_length = x - 1)), e.prev_length >= x && e.match_length <= e.prev_length) {
            for (i = e.strstart + e.lookahead - x, n = u._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - x), e.lookahead -= e.prev_length - 1, e.prev_length -= 2; ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + x - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 != --e.prev_length;);
            if (e.match_available = 0, e.match_length = x - 1, e.strstart++, n && (N(e, !1), 0 === e.strm.avail_out)) return A;
          } else if (e.match_available) {
            if ((n = u._tr_tally(e, 0, e.window[e.strstart - 1])) && N(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return A;
          } else e.match_available = 1, e.strstart++, e.lookahead--;
        }
        return e.match_available && (n = u._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < x - 1 ? e.strstart : x - 1, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
      }
      function M(e, t, r, n, i) {
        this.good_length = e, this.max_lazy = t, this.nice_length = r, this.max_chain = n, this.func = i;
      }
      function H() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function G(e) {
        var t;
        return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = i, (t = e.state).pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? C : E, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = l, u._tr_init(t), m) : R(e, _);
      }
      function K(e) {
        var t = G(e);
        return t === m && function (e) {
          e.window_size = 2 * e.w_size, D(e.head), e.max_lazy_match = h[e.level].max_lazy, e.good_match = h[e.level].good_length, e.nice_match = h[e.level].nice_length, e.max_chain_length = h[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = x - 1, e.match_available = 0, e.ins_h = 0;
        }(e.state), t;
      }
      function Y(e, t, r, n, i, s) {
        if (!e) return _;
        var a = 1;
        if (t === g && (t = 6), n < 0 ? (a = 0, n = -n) : 15 < n && (a = 2, n -= 16), i < 1 || y < i || r !== v || n < 8 || 15 < n || t < 0 || 9 < t || s < 0 || b < s) return R(e, _);
        8 === n && (n = 9);
        var o = new H();
        return (e.state = o).strm = e, o.wrap = a, o.gzhead = null, o.w_bits = n, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = i + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + x - 1) / x), o.window = new c.Buf8(2 * o.w_size), o.head = new c.Buf16(o.hash_size), o.prev = new c.Buf16(o.w_size), o.lit_bufsize = 1 << i + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new c.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = t, o.strategy = s, o.method = r, K(e);
      }
      h = [new M(0, 0, 0, 0, function (e, t) {
        var r = 65535;
        for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5);;) {
          if (e.lookahead <= 1) {
            if (j(e), 0 === e.lookahead && t === l) return A;
            if (0 === e.lookahead) break;
          }
          e.strstart += e.lookahead, e.lookahead = 0;
          var n = e.block_start + r;
          if ((0 === e.strstart || e.strstart >= n) && (e.lookahead = e.strstart - n, e.strstart = n, N(e, !1), 0 === e.strm.avail_out)) return A;
          if (e.strstart - e.block_start >= e.w_size - z && (N(e, !1), 0 === e.strm.avail_out)) return A;
        }
        return e.insert = 0, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : (e.strstart > e.block_start && (N(e, !1), e.strm.avail_out), A);
      }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function (e, t) {
        return Y(e, t, v, 15, 8, 0);
      }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function (e, t) {
        return e && e.state ? 2 !== e.state.wrap ? _ : (e.state.gzhead = t, m) : _;
      }, r.deflate = function (e, t) {
        var r, n, i, s;
        if (!e || !e.state || 5 < t || t < 0) return e ? R(e, _) : _;
        if (n = e.state, !e.output || !e.input && 0 !== e.avail_in || 666 === n.status && t !== f) return R(e, 0 === e.avail_out ? -5 : _);
        if (n.strm = e, r = n.last_flush, n.last_flush = t, n.status === C) if (2 === n.wrap) e.adler = 0, U(n, 31), U(n, 139), U(n, 8), n.gzhead ? (U(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), U(n, 255 & n.gzhead.time), U(n, n.gzhead.time >> 8 & 255), U(n, n.gzhead.time >> 16 & 255), U(n, n.gzhead.time >> 24 & 255), U(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), U(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (U(n, 255 & n.gzhead.extra.length), U(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = p(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (U(n, 0), U(n, 0), U(n, 0), U(n, 0), U(n, 0), U(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), U(n, 3), n.status = E);else {
          var a = v + (n.w_bits - 8 << 4) << 8;
          a |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6, 0 !== n.strstart && (a |= 32), a += 31 - a % 31, n.status = E, P(n, a), 0 !== n.strstart && (P(n, e.adler >>> 16), P(n, 65535 & e.adler)), e.adler = 1;
        }
        if (69 === n.status) if (n.gzhead.extra) {
          for (i = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), i = n.pending, n.pending !== n.pending_buf_size));) U(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
          n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);
        } else n.status = 73;
        if (73 === n.status) if (n.gzhead.name) {
          i = n.pending;
          do {
            if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), i = n.pending, n.pending === n.pending_buf_size)) {
              s = 1;
              break;
            }
            s = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, U(n, s);
          } while (0 !== s);
          n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), 0 === s && (n.gzindex = 0, n.status = 91);
        } else n.status = 91;
        if (91 === n.status) if (n.gzhead.comment) {
          i = n.pending;
          do {
            if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), F(e), i = n.pending, n.pending === n.pending_buf_size)) {
              s = 1;
              break;
            }
            s = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, U(n, s);
          } while (0 !== s);
          n.gzhead.hcrc && n.pending > i && (e.adler = p(e.adler, n.pending_buf, n.pending - i, i)), 0 === s && (n.status = 103);
        } else n.status = 103;
        if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && F(e), n.pending + 2 <= n.pending_buf_size && (U(n, 255 & e.adler), U(n, e.adler >> 8 & 255), e.adler = 0, n.status = E)) : n.status = E), 0 !== n.pending) {
          if (F(e), 0 === e.avail_out) return n.last_flush = -1, m;
        } else if (0 === e.avail_in && T(t) <= T(r) && t !== f) return R(e, -5);
        if (666 === n.status && 0 !== e.avail_in) return R(e, -5);
        if (0 !== e.avail_in || 0 !== n.lookahead || t !== l && 666 !== n.status) {
          var o = 2 === n.strategy ? function (e, t) {
            for (var r;;) {
              if (0 === e.lookahead && (j(e), 0 === e.lookahead)) {
                if (t === l) return A;
                break;
              }
              if (e.match_length = 0, r = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (N(e, !1), 0 === e.strm.avail_out)) return A;
            }
            return e.insert = 0, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
          }(n, t) : 3 === n.strategy ? function (e, t) {
            for (var r, n, i, s, a = e.window;;) {
              if (e.lookahead <= S) {
                if (j(e), e.lookahead <= S && t === l) return A;
                if (0 === e.lookahead) break;
              }
              if (e.match_length = 0, e.lookahead >= x && 0 < e.strstart && (n = a[i = e.strstart - 1]) === a[++i] && n === a[++i] && n === a[++i]) {
                s = e.strstart + S;
                do {} while (n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && n === a[++i] && i < s);
                e.match_length = S - (s - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
              }
              if (e.match_length >= x ? (r = u._tr_tally(e, 1, e.match_length - x), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = u._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (N(e, !1), 0 === e.strm.avail_out)) return A;
            }
            return e.insert = 0, t === f ? (N(e, !0), 0 === e.strm.avail_out ? O : B) : e.last_lit && (N(e, !1), 0 === e.strm.avail_out) ? A : I;
          }(n, t) : h[n.level].func(n, t);
          if (o !== O && o !== B || (n.status = 666), o === A || o === O) return 0 === e.avail_out && (n.last_flush = -1), m;
          if (o === I && (1 === t ? u._tr_align(n) : 5 !== t && (u._tr_stored_block(n, 0, 0, !1), 3 === t && (D(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), F(e), 0 === e.avail_out)) return n.last_flush = -1, m;
        }
        return t !== f ? m : n.wrap <= 0 ? 1 : (2 === n.wrap ? (U(n, 255 & e.adler), U(n, e.adler >> 8 & 255), U(n, e.adler >> 16 & 255), U(n, e.adler >> 24 & 255), U(n, 255 & e.total_in), U(n, e.total_in >> 8 & 255), U(n, e.total_in >> 16 & 255), U(n, e.total_in >> 24 & 255)) : (P(n, e.adler >>> 16), P(n, 65535 & e.adler)), F(e), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? m : 1);
      }, r.deflateEnd = function (e) {
        var t;
        return e && e.state ? (t = e.state.status) !== C && 69 !== t && 73 !== t && 91 !== t && 103 !== t && t !== E && 666 !== t ? R(e, _) : (e.state = null, t === E ? R(e, -3) : m) : _;
      }, r.deflateSetDictionary = function (e, t) {
        var r,
          n,
          i,
          s,
          a,
          o,
          h,
          u,
          l = t.length;
        if (!e || !e.state) return _;
        if (2 === (s = (r = e.state).wrap) || 1 === s && r.status !== C || r.lookahead) return _;
        for (1 === s && (e.adler = d(e.adler, t, l, 0)), r.wrap = 0, l >= r.w_size && (0 === s && (D(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), u = new c.Buf8(r.w_size), c.arraySet(u, t, l - r.w_size, r.w_size, 0), t = u, l = r.w_size), a = e.avail_in, o = e.next_in, h = e.input, e.avail_in = l, e.next_in = 0, e.input = t, j(r); r.lookahead >= x;) {
          for (n = r.strstart, i = r.lookahead - (x - 1); r.ins_h = (r.ins_h << r.hash_shift ^ r.window[n + x - 1]) & r.hash_mask, r.prev[n & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = n, n++, --i;);
          r.strstart = n, r.lookahead = x - 1, j(r);
        }
        return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = x - 1, r.match_available = 0, e.next_in = o, e.input = h, e.avail_in = a, r.wrap = s, m;
      }, r.deflateInfo = "pako deflate (from Nodeca project)";
    }, {
      "../utils/common": 41,
      "./adler32": 43,
      "./crc32": 45,
      "./messages": 51,
      "./trees": 52
    }],
    47: [function (e, t, r) {
      "use strict";

      t.exports = function () {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}],
    48: [function (e, t, r) {
      "use strict";

      t.exports = function (e, t) {
        var r, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
        r = e.state, n = e.next_in, z = e.input, i = n + (e.avail_in - 5), s = e.next_out, C = e.output, a = s - (t - e.avail_out), o = s + (e.avail_out - 257), h = r.dmax, u = r.wsize, l = r.whave, f = r.wnext, c = r.window, d = r.hold, p = r.bits, m = r.lencode, _ = r.distcode, g = (1 << r.lenbits) - 1, b = (1 << r.distbits) - 1;
        e: do {
          p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
          t: for (;;) {
            if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;else {
              if (!(16 & y)) {
                if (0 == (64 & y)) {
                  v = m[(65535 & v) + (d & (1 << y) - 1)];
                  continue t;
                }
                if (32 & y) {
                  r.mode = 12;
                  break e;
                }
                e.msg = "invalid literal/length code", r.mode = 30;
                break e;
              }
              w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
              r: for (;;) {
                if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                  if (0 == (64 & y)) {
                    v = _[(65535 & v) + (d & (1 << y) - 1)];
                    continue r;
                  }
                  e.msg = "invalid distance code", r.mode = 30;
                  break e;
                }
                if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                  e.msg = "invalid distance too far back", r.mode = 30;
                  break e;
                }
                if (d >>>= y, p -= y, (y = s - a) < k) {
                  if (l < (y = k - y) && r.sane) {
                    e.msg = "invalid distance too far back", r.mode = 30;
                    break e;
                  }
                  if (S = c, (x = 0) === f) {
                    if (x += u - y, y < w) {
                      for (w -= y; C[s++] = c[x++], --y;);
                      x = s - k, S = C;
                    }
                  } else if (f < y) {
                    if (x += u + f - y, (y -= f) < w) {
                      for (w -= y; C[s++] = c[x++], --y;);
                      if (x = 0, f < w) {
                        for (w -= y = f; C[s++] = c[x++], --y;);
                        x = s - k, S = C;
                      }
                    }
                  } else if (x += f - y, y < w) {
                    for (w -= y; C[s++] = c[x++], --y;);
                    x = s - k, S = C;
                  }
                  for (; 2 < w;) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                  w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                } else {
                  for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3););
                  w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                }
                break;
              }
            }
            break;
          }
        } while (n < i && s < o);
        n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e.next_in = n, e.next_out = s, e.avail_in = n < i ? i - n + 5 : 5 - (n - i), e.avail_out = s < o ? o - s + 257 : 257 - (s - o), r.hold = d, r.bits = p;
      };
    }, {}],
    49: [function (e, t, r) {
      "use strict";

      var I = e("../utils/common"),
        O = e("./adler32"),
        B = e("./crc32"),
        R = e("./inffast"),
        T = e("./inftrees"),
        D = 1,
        F = 2,
        N = 0,
        U = -2,
        P = 1,
        n = 852,
        i = 592;
      function L(e) {
        return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
      }
      function s() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function a(e) {
        var t;
        return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new I.Buf32(n), t.distcode = t.distdyn = new I.Buf32(i), t.sane = 1, t.back = -1, N) : U;
      }
      function o(e) {
        var t;
        return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, a(e)) : U;
      }
      function h(e, t) {
        var r, n;
        return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? U : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, o(e))) : U;
      }
      function u(e, t) {
        var r, n;
        return e ? (n = new s(), (e.state = n).window = null, (r = h(e, t)) !== N && (e.state = null), r) : U;
      }
      var l,
        f,
        c = !0;
      function j(e) {
        if (c) {
          var t;
          for (l = new I.Buf32(512), f = new I.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
          for (; t < 256;) e.lens[t++] = 9;
          for (; t < 280;) e.lens[t++] = 7;
          for (; t < 288;) e.lens[t++] = 8;
          for (T(D, e.lens, 0, 288, l, 0, e.work, {
            bits: 9
          }), t = 0; t < 32;) e.lens[t++] = 5;
          T(F, e.lens, 0, 32, f, 0, e.work, {
            bits: 5
          }), c = !1;
        }
        e.lencode = l, e.lenbits = 9, e.distcode = f, e.distbits = 5;
      }
      function Z(e, t, r, n) {
        var i,
          s = e.state;
        return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new I.Buf8(s.wsize)), n >= s.wsize ? (I.arraySet(s.window, t, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (n < (i = s.wsize - s.wnext) && (i = n), I.arraySet(s.window, t, r - n, i, s.wnext), (n -= i) ? (I.arraySet(s.window, t, r - n, n, 0), s.wnext = n, s.whave = s.wsize) : (s.wnext += i, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += i))), 0;
      }
      r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function (e) {
        return u(e, 15);
      }, r.inflateInit2 = u, r.inflate = function (e, t) {
        var r,
          n,
          i,
          s,
          a,
          o,
          h,
          u,
          l,
          f,
          c,
          d,
          p,
          m,
          _,
          g,
          b,
          v,
          y,
          w,
          k,
          x,
          S,
          z,
          C = 0,
          E = new I.Buf8(4),
          A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return U;
        12 === (r = e.state).mode && (r.mode = 13), a = e.next_out, i = e.output, h = e.avail_out, s = e.next_in, n = e.input, o = e.avail_in, u = r.hold, l = r.bits, f = o, c = h, x = N;
        e: for (;;) switch (r.mode) {
          case P:
            if (0 === r.wrap) {
              r.mode = 13;
              break;
            }
            for (; l < 16;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            if (2 & r.wrap && 35615 === u) {
              E[r.check = 0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0), l = u = 0, r.mode = 2;
              break;
            }
            if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & u) << 8) + (u >> 8)) % 31) {
              e.msg = "incorrect header check", r.mode = 30;
              break;
            }
            if (8 != (15 & u)) {
              e.msg = "unknown compression method", r.mode = 30;
              break;
            }
            if (l -= 4, k = 8 + (15 & (u >>>= 4)), 0 === r.wbits) r.wbits = k;else if (k > r.wbits) {
              e.msg = "invalid window size", r.mode = 30;
              break;
            }
            r.dmax = 1 << k, e.adler = r.check = 1, r.mode = 512 & u ? 10 : 12, l = u = 0;
            break;
          case 2:
            for (; l < 16;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            if (r.flags = u, 8 != (255 & r.flags)) {
              e.msg = "unknown compression method", r.mode = 30;
              break;
            }
            if (57344 & r.flags) {
              e.msg = "unknown header flags set", r.mode = 30;
              break;
            }
            r.head && (r.head.text = u >> 8 & 1), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0, r.mode = 3;
          case 3:
            for (; l < 32;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            r.head && (r.head.time = u), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, E[2] = u >>> 16 & 255, E[3] = u >>> 24 & 255, r.check = B(r.check, E, 4, 0)), l = u = 0, r.mode = 4;
          case 4:
            for (; l < 16;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            r.head && (r.head.xflags = 255 & u, r.head.os = u >> 8), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0, r.mode = 5;
          case 5:
            if (1024 & r.flags) {
              for (; l < 16;) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              r.length = u, r.head && (r.head.extra_len = u), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0;
            } else r.head && (r.head.extra = null);
            r.mode = 6;
          case 6:
            if (1024 & r.flags && (o < (d = r.length) && (d = o), d && (r.head && (k = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), I.arraySet(r.head.extra, n, s, d, k)), 512 & r.flags && (r.check = B(r.check, n, d, s)), o -= d, s += d, r.length -= d), r.length)) break e;
            r.length = 0, r.mode = 7;
          case 7:
            if (2048 & r.flags) {
              if (0 === o) break e;
              for (d = 0; k = n[s + d++], r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k)), k && d < o;);
              if (512 & r.flags && (r.check = B(r.check, n, d, s)), o -= d, s += d, k) break e;
            } else r.head && (r.head.name = null);
            r.length = 0, r.mode = 8;
          case 8:
            if (4096 & r.flags) {
              if (0 === o) break e;
              for (d = 0; k = n[s + d++], r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k)), k && d < o;);
              if (512 & r.flags && (r.check = B(r.check, n, d, s)), o -= d, s += d, k) break e;
            } else r.head && (r.head.comment = null);
            r.mode = 9;
          case 9:
            if (512 & r.flags) {
              for (; l < 16;) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              if (u !== (65535 & r.check)) {
                e.msg = "header crc mismatch", r.mode = 30;
                break;
              }
              l = u = 0;
            }
            r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = 12;
            break;
          case 10:
            for (; l < 32;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            e.adler = r.check = L(u), l = u = 0, r.mode = 11;
          case 11:
            if (0 === r.havedict) return e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = o, r.hold = u, r.bits = l, 2;
            e.adler = r.check = 1, r.mode = 12;
          case 12:
            if (5 === t || 6 === t) break e;
          case 13:
            if (r.last) {
              u >>>= 7 & l, l -= 7 & l, r.mode = 27;
              break;
            }
            for (; l < 3;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            switch (r.last = 1 & u, l -= 1, 3 & (u >>>= 1)) {
              case 0:
                r.mode = 14;
                break;
              case 1:
                if (j(r), r.mode = 20, 6 !== t) break;
                u >>>= 2, l -= 2;
                break e;
              case 2:
                r.mode = 17;
                break;
              case 3:
                e.msg = "invalid block type", r.mode = 30;
            }
            u >>>= 2, l -= 2;
            break;
          case 14:
            for (u >>>= 7 & l, l -= 7 & l; l < 32;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            if ((65535 & u) != (u >>> 16 ^ 65535)) {
              e.msg = "invalid stored block lengths", r.mode = 30;
              break;
            }
            if (r.length = 65535 & u, l = u = 0, r.mode = 15, 6 === t) break e;
          case 15:
            r.mode = 16;
          case 16:
            if (d = r.length) {
              if (o < d && (d = o), h < d && (d = h), 0 === d) break e;
              I.arraySet(i, n, s, d, a), o -= d, s += d, h -= d, a += d, r.length -= d;
              break;
            }
            r.mode = 12;
            break;
          case 17:
            for (; l < 14;) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            if (r.nlen = 257 + (31 & u), u >>>= 5, l -= 5, r.ndist = 1 + (31 & u), u >>>= 5, l -= 5, r.ncode = 4 + (15 & u), u >>>= 4, l -= 4, 286 < r.nlen || 30 < r.ndist) {
              e.msg = "too many length or distance symbols", r.mode = 30;
              break;
            }
            r.have = 0, r.mode = 18;
          case 18:
            for (; r.have < r.ncode;) {
              for (; l < 3;) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              r.lens[A[r.have++]] = 7 & u, u >>>= 3, l -= 3;
            }
            for (; r.have < 19;) r.lens[A[r.have++]] = 0;
            if (r.lencode = r.lendyn, r.lenbits = 7, S = {
              bits: r.lenbits
            }, x = T(0, r.lens, 0, 19, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
              e.msg = "invalid code lengths set", r.mode = 30;
              break;
            }
            r.have = 0, r.mode = 19;
          case 19:
            for (; r.have < r.nlen + r.ndist;) {
              for (; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              if (b < 16) u >>>= _, l -= _, r.lens[r.have++] = b;else {
                if (16 === b) {
                  for (z = _ + 2; l < z;) {
                    if (0 === o) break e;
                    o--, u += n[s++] << l, l += 8;
                  }
                  if (u >>>= _, l -= _, 0 === r.have) {
                    e.msg = "invalid bit length repeat", r.mode = 30;
                    break;
                  }
                  k = r.lens[r.have - 1], d = 3 + (3 & u), u >>>= 2, l -= 2;
                } else if (17 === b) {
                  for (z = _ + 3; l < z;) {
                    if (0 === o) break e;
                    o--, u += n[s++] << l, l += 8;
                  }
                  l -= _, k = 0, d = 3 + (7 & (u >>>= _)), u >>>= 3, l -= 3;
                } else {
                  for (z = _ + 7; l < z;) {
                    if (0 === o) break e;
                    o--, u += n[s++] << l, l += 8;
                  }
                  l -= _, k = 0, d = 11 + (127 & (u >>>= _)), u >>>= 7, l -= 7;
                }
                if (r.have + d > r.nlen + r.ndist) {
                  e.msg = "invalid bit length repeat", r.mode = 30;
                  break;
                }
                for (; d--;) r.lens[r.have++] = k;
              }
            }
            if (30 === r.mode) break;
            if (0 === r.lens[256]) {
              e.msg = "invalid code -- missing end-of-block", r.mode = 30;
              break;
            }
            if (r.lenbits = 9, S = {
              bits: r.lenbits
            }, x = T(D, r.lens, 0, r.nlen, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
              e.msg = "invalid literal/lengths set", r.mode = 30;
              break;
            }
            if (r.distbits = 6, r.distcode = r.distdyn, S = {
              bits: r.distbits
            }, x = T(F, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S), r.distbits = S.bits, x) {
              e.msg = "invalid distances set", r.mode = 30;
              break;
            }
            if (r.mode = 20, 6 === t) break e;
          case 20:
            r.mode = 21;
          case 21:
            if (6 <= o && 258 <= h) {
              e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = o, r.hold = u, r.bits = l, R(e, c), a = e.next_out, i = e.output, h = e.avail_out, s = e.next_in, n = e.input, o = e.avail_in, u = r.hold, l = r.bits, 12 === r.mode && (r.back = -1);
              break;
            }
            for (r.back = 0; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            if (g && 0 == (240 & g)) {
              for (v = _, y = g, w = b; g = (C = r.lencode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              u >>>= v, l -= v, r.back += v;
            }
            if (u >>>= _, l -= _, r.back += _, r.length = b, 0 === g) {
              r.mode = 26;
              break;
            }
            if (32 & g) {
              r.back = -1, r.mode = 12;
              break;
            }
            if (64 & g) {
              e.msg = "invalid literal/length code", r.mode = 30;
              break;
            }
            r.extra = 15 & g, r.mode = 22;
          case 22:
            if (r.extra) {
              for (z = r.extra; l < z;) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              r.length += u & (1 << r.extra) - 1, u >>>= r.extra, l -= r.extra, r.back += r.extra;
            }
            r.was = r.length, r.mode = 23;
          case 23:
            for (; g = (C = r.distcode[u & (1 << r.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
              if (0 === o) break e;
              o--, u += n[s++] << l, l += 8;
            }
            if (0 == (240 & g)) {
              for (v = _, y = g, w = b; g = (C = r.distcode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              u >>>= v, l -= v, r.back += v;
            }
            if (u >>>= _, l -= _, r.back += _, 64 & g) {
              e.msg = "invalid distance code", r.mode = 30;
              break;
            }
            r.offset = b, r.extra = 15 & g, r.mode = 24;
          case 24:
            if (r.extra) {
              for (z = r.extra; l < z;) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              r.offset += u & (1 << r.extra) - 1, u >>>= r.extra, l -= r.extra, r.back += r.extra;
            }
            if (r.offset > r.dmax) {
              e.msg = "invalid distance too far back", r.mode = 30;
              break;
            }
            r.mode = 25;
          case 25:
            if (0 === h) break e;
            if (d = c - h, r.offset > d) {
              if ((d = r.offset - d) > r.whave && r.sane) {
                e.msg = "invalid distance too far back", r.mode = 30;
                break;
              }
              p = d > r.wnext ? (d -= r.wnext, r.wsize - d) : r.wnext - d, d > r.length && (d = r.length), m = r.window;
            } else m = i, p = a - r.offset, d = r.length;
            for (h < d && (d = h), h -= d, r.length -= d; i[a++] = m[p++], --d;);
            0 === r.length && (r.mode = 21);
            break;
          case 26:
            if (0 === h) break e;
            i[a++] = r.length, h--, r.mode = 21;
            break;
          case 27:
            if (r.wrap) {
              for (; l < 32;) {
                if (0 === o) break e;
                o--, u |= n[s++] << l, l += 8;
              }
              if (c -= h, e.total_out += c, r.total += c, c && (e.adler = r.check = r.flags ? B(r.check, i, c, a - c) : O(r.check, i, c, a - c)), c = h, (r.flags ? u : L(u)) !== r.check) {
                e.msg = "incorrect data check", r.mode = 30;
                break;
              }
              l = u = 0;
            }
            r.mode = 28;
          case 28:
            if (r.wrap && r.flags) {
              for (; l < 32;) {
                if (0 === o) break e;
                o--, u += n[s++] << l, l += 8;
              }
              if (u !== (4294967295 & r.total)) {
                e.msg = "incorrect length check", r.mode = 30;
                break;
              }
              l = u = 0;
            }
            r.mode = 29;
          case 29:
            x = 1;
            break e;
          case 30:
            x = -3;
            break e;
          case 31:
            return -4;
          case 32:
          default:
            return U;
        }
        return e.next_out = a, e.avail_out = h, e.next_in = s, e.avail_in = o, r.hold = u, r.bits = l, (r.wsize || c !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t)) && Z(e, e.output, e.next_out, c - e.avail_out) ? (r.mode = 31, -4) : (f -= e.avail_in, c -= e.avail_out, e.total_in += f, e.total_out += c, r.total += c, r.wrap && c && (e.adler = r.check = r.flags ? B(r.check, i, c, e.next_out - c) : O(r.check, i, c, e.next_out - c)), e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 == f && 0 === c || 4 === t) && x === N && (x = -5), x);
      }, r.inflateEnd = function (e) {
        if (!e || !e.state) return U;
        var t = e.state;
        return t.window && (t.window = null), e.state = null, N;
      }, r.inflateGetHeader = function (e, t) {
        var r;
        return e && e.state ? 0 == (2 & (r = e.state).wrap) ? U : ((r.head = t).done = !1, N) : U;
      }, r.inflateSetDictionary = function (e, t) {
        var r,
          n = t.length;
        return e && e.state ? 0 !== (r = e.state).wrap && 11 !== r.mode ? U : 11 === r.mode && O(1, t, n, 0) !== r.check ? -3 : Z(e, t, n, n) ? (r.mode = 31, -4) : (r.havedict = 1, N) : U;
      }, r.inflateInfo = "pako inflate (from Nodeca project)";
    }, {
      "../utils/common": 41,
      "./adler32": 43,
      "./crc32": 45,
      "./inffast": 48,
      "./inftrees": 50
    }],
    50: [function (e, t, r) {
      "use strict";

      var D = e("../utils/common"),
        F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
        U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
        P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t.exports = function (e, t, r, n, i, s, a, o) {
        var h,
          u,
          l,
          f,
          c,
          d,
          p,
          m,
          _,
          g = o.bits,
          b = 0,
          v = 0,
          y = 0,
          w = 0,
          k = 0,
          x = 0,
          S = 0,
          z = 0,
          C = 0,
          E = 0,
          A = null,
          I = 0,
          O = new D.Buf16(16),
          B = new D.Buf16(16),
          R = null,
          T = 0;
        for (b = 0; b <= 15; b++) O[b] = 0;
        for (v = 0; v < n; v++) O[t[r + v]]++;
        for (k = g, w = 15; 1 <= w && 0 === O[w]; w--);
        if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
        for (y = 1; y < w && 0 === O[y]; y++);
        for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
        if (0 < z && (0 === e || 1 !== w)) return -1;
        for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
        for (v = 0; v < n; v++) 0 !== t[r + v] && (a[B[t[r + v]]++] = v);
        if (d = 0 === e ? (A = R = a, 19) : 1 === e ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e && 852 < C || 2 === e && 592 < C) return 1;
        for (;;) {
          for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u;);
          for (h = 1 << b - 1; E & h;) h >>= 1;
          if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
            if (b === w) break;
            b = t[r + a[v]];
          }
          if (k < b && (E & f) !== l) {
            for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0);) x++, z <<= 1;
            if (C += 1 << x, 1 === e && 852 < C || 2 === e && 592 < C) return 1;
            i[l = E & f] = k << 24 | x << 16 | c - s | 0;
          }
        }
        return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
      };
    }, {
      "../utils/common": 41
    }],
    51: [function (e, t, r) {
      "use strict";

      t.exports = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
      };
    }, {}],
    52: [function (e, t, r) {
      "use strict";

      var i = e("../utils/common"),
        o = 0,
        h = 1;
      function n(e) {
        for (var t = e.length; 0 <= --t;) e[t] = 0;
      }
      var s = 0,
        a = 29,
        u = 256,
        l = u + 1 + a,
        f = 30,
        c = 19,
        _ = 2 * l + 1,
        g = 15,
        d = 16,
        p = 7,
        m = 256,
        b = 16,
        v = 17,
        y = 18,
        w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
        k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
        S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        z = new Array(2 * (l + 2));
      n(z);
      var C = new Array(2 * f);
      n(C);
      var E = new Array(512);
      n(E);
      var A = new Array(256);
      n(A);
      var I = new Array(a);
      n(I);
      var O,
        B,
        R,
        T = new Array(f);
      function D(e, t, r, n, i) {
        this.static_tree = e, this.extra_bits = t, this.extra_base = r, this.elems = n, this.max_length = i, this.has_stree = e && e.length;
      }
      function F(e, t) {
        this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
      }
      function N(e) {
        return e < 256 ? E[e] : E[256 + (e >>> 7)];
      }
      function U(e, t) {
        e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255;
      }
      function P(e, t, r) {
        e.bi_valid > d - r ? (e.bi_buf |= t << e.bi_valid & 65535, U(e, e.bi_buf), e.bi_buf = t >> d - e.bi_valid, e.bi_valid += r - d) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r);
      }
      function L(e, t, r) {
        P(e, r[2 * t], r[2 * t + 1]);
      }
      function j(e, t) {
        for (var r = 0; r |= 1 & e, e >>>= 1, r <<= 1, 0 < --t;);
        return r >>> 1;
      }
      function Z(e, t, r) {
        var n,
          i,
          s = new Array(g + 1),
          a = 0;
        for (n = 1; n <= g; n++) s[n] = a = a + r[n - 1] << 1;
        for (i = 0; i <= t; i++) {
          var o = e[2 * i + 1];
          0 !== o && (e[2 * i] = j(s[o]++, o));
        }
      }
      function W(e) {
        var t;
        for (t = 0; t < l; t++) e.dyn_ltree[2 * t] = 0;
        for (t = 0; t < f; t++) e.dyn_dtree[2 * t] = 0;
        for (t = 0; t < c; t++) e.bl_tree[2 * t] = 0;
        e.dyn_ltree[2 * m] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
      }
      function M(e) {
        8 < e.bi_valid ? U(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
      }
      function H(e, t, r, n) {
        var i = 2 * t,
          s = 2 * r;
        return e[i] < e[s] || e[i] === e[s] && n[t] <= n[r];
      }
      function G(e, t, r) {
        for (var n = e.heap[r], i = r << 1; i <= e.heap_len && (i < e.heap_len && H(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !H(t, n, e.heap[i], e.depth));) e.heap[r] = e.heap[i], r = i, i <<= 1;
        e.heap[r] = n;
      }
      function K(e, t, r) {
        var n,
          i,
          s,
          a,
          o = 0;
        if (0 !== e.last_lit) for (; n = e.pending_buf[e.d_buf + 2 * o] << 8 | e.pending_buf[e.d_buf + 2 * o + 1], i = e.pending_buf[e.l_buf + o], o++, 0 === n ? L(e, i, t) : (L(e, (s = A[i]) + u + 1, t), 0 !== (a = w[s]) && P(e, i -= I[s], a), L(e, s = N(--n), r), 0 !== (a = k[s]) && P(e, n -= T[s], a)), o < e.last_lit;);
        L(e, m, t);
      }
      function Y(e, t) {
        var r,
          n,
          i,
          s = t.dyn_tree,
          a = t.stat_desc.static_tree,
          o = t.stat_desc.has_stree,
          h = t.stat_desc.elems,
          u = -1;
        for (e.heap_len = 0, e.heap_max = _, r = 0; r < h; r++) 0 !== s[2 * r] ? (e.heap[++e.heap_len] = u = r, e.depth[r] = 0) : s[2 * r + 1] = 0;
        for (; e.heap_len < 2;) s[2 * (i = e.heap[++e.heap_len] = u < 2 ? ++u : 0)] = 1, e.depth[i] = 0, e.opt_len--, o && (e.static_len -= a[2 * i + 1]);
        for (t.max_code = u, r = e.heap_len >> 1; 1 <= r; r--) G(e, s, r);
        for (i = h; r = e.heap[1], e.heap[1] = e.heap[e.heap_len--], G(e, s, 1), n = e.heap[1], e.heap[--e.heap_max] = r, e.heap[--e.heap_max] = n, s[2 * i] = s[2 * r] + s[2 * n], e.depth[i] = (e.depth[r] >= e.depth[n] ? e.depth[r] : e.depth[n]) + 1, s[2 * r + 1] = s[2 * n + 1] = i, e.heap[1] = i++, G(e, s, 1), 2 <= e.heap_len;);
        e.heap[--e.heap_max] = e.heap[1], function (e, t) {
          var r,
            n,
            i,
            s,
            a,
            o,
            h = t.dyn_tree,
            u = t.max_code,
            l = t.stat_desc.static_tree,
            f = t.stat_desc.has_stree,
            c = t.stat_desc.extra_bits,
            d = t.stat_desc.extra_base,
            p = t.stat_desc.max_length,
            m = 0;
          for (s = 0; s <= g; s++) e.bl_count[s] = 0;
          for (h[2 * e.heap[e.heap_max] + 1] = 0, r = e.heap_max + 1; r < _; r++) p < (s = h[2 * h[2 * (n = e.heap[r]) + 1] + 1] + 1) && (s = p, m++), h[2 * n + 1] = s, u < n || (e.bl_count[s]++, a = 0, d <= n && (a = c[n - d]), o = h[2 * n], e.opt_len += o * (s + a), f && (e.static_len += o * (l[2 * n + 1] + a)));
          if (0 !== m) {
            do {
              for (s = p - 1; 0 === e.bl_count[s];) s--;
              e.bl_count[s]--, e.bl_count[s + 1] += 2, e.bl_count[p]--, m -= 2;
            } while (0 < m);
            for (s = p; 0 !== s; s--) for (n = e.bl_count[s]; 0 !== n;) u < (i = e.heap[--r]) || (h[2 * i + 1] !== s && (e.opt_len += (s - h[2 * i + 1]) * h[2 * i], h[2 * i + 1] = s), n--);
          }
        }(e, t), Z(s, u, e.bl_count);
      }
      function X(e, t, r) {
        var n,
          i,
          s = -1,
          a = t[1],
          o = 0,
          h = 7,
          u = 4;
        for (0 === a && (h = 138, u = 3), t[2 * (r + 1) + 1] = 65535, n = 0; n <= r; n++) i = a, a = t[2 * (n + 1) + 1], ++o < h && i === a || (o < u ? e.bl_tree[2 * i] += o : 0 !== i ? (i !== s && e.bl_tree[2 * i]++, e.bl_tree[2 * b]++) : o <= 10 ? e.bl_tree[2 * v]++ : e.bl_tree[2 * y]++, s = i, u = (o = 0) === a ? (h = 138, 3) : i === a ? (h = 6, 3) : (h = 7, 4));
      }
      function V(e, t, r) {
        var n,
          i,
          s = -1,
          a = t[1],
          o = 0,
          h = 7,
          u = 4;
        for (0 === a && (h = 138, u = 3), n = 0; n <= r; n++) if (i = a, a = t[2 * (n + 1) + 1], !(++o < h && i === a)) {
          if (o < u) for (; L(e, i, e.bl_tree), 0 != --o;);else 0 !== i ? (i !== s && (L(e, i, e.bl_tree), o--), L(e, b, e.bl_tree), P(e, o - 3, 2)) : o <= 10 ? (L(e, v, e.bl_tree), P(e, o - 3, 3)) : (L(e, y, e.bl_tree), P(e, o - 11, 7));
          s = i, u = (o = 0) === a ? (h = 138, 3) : i === a ? (h = 6, 3) : (h = 7, 4);
        }
      }
      n(T);
      var q = !1;
      function J(e, t, r, n) {
        P(e, (s << 1) + (n ? 1 : 0), 3), function (e, t, r, n) {
          M(e), n && (U(e, r), U(e, ~r)), i.arraySet(e.pending_buf, e.window, t, r, e.pending), e.pending += r;
        }(e, t, r, !0);
      }
      r._tr_init = function (e) {
        q || (function () {
          var e,
            t,
            r,
            n,
            i,
            s = new Array(g + 1);
          for (n = r = 0; n < a - 1; n++) for (I[n] = r, e = 0; e < 1 << w[n]; e++) A[r++] = n;
          for (A[r - 1] = n, n = i = 0; n < 16; n++) for (T[n] = i, e = 0; e < 1 << k[n]; e++) E[i++] = n;
          for (i >>= 7; n < f; n++) for (T[n] = i << 7, e = 0; e < 1 << k[n] - 7; e++) E[256 + i++] = n;
          for (t = 0; t <= g; t++) s[t] = 0;
          for (e = 0; e <= 143;) z[2 * e + 1] = 8, e++, s[8]++;
          for (; e <= 255;) z[2 * e + 1] = 9, e++, s[9]++;
          for (; e <= 279;) z[2 * e + 1] = 7, e++, s[7]++;
          for (; e <= 287;) z[2 * e + 1] = 8, e++, s[8]++;
          for (Z(z, l + 1, s), e = 0; e < f; e++) C[2 * e + 1] = 5, C[2 * e] = j(e, 5);
          O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
        }(), q = !0), e.l_desc = new F(e.dyn_ltree, O), e.d_desc = new F(e.dyn_dtree, B), e.bl_desc = new F(e.bl_tree, R), e.bi_buf = 0, e.bi_valid = 0, W(e);
      }, r._tr_stored_block = J, r._tr_flush_block = function (e, t, r, n) {
        var i,
          s,
          a = 0;
        0 < e.level ? (2 === e.strm.data_type && (e.strm.data_type = function (e) {
          var t,
            r = 4093624447;
          for (t = 0; t <= 31; t++, r >>>= 1) if (1 & r && 0 !== e.dyn_ltree[2 * t]) return o;
          if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return h;
          for (t = 32; t < u; t++) if (0 !== e.dyn_ltree[2 * t]) return h;
          return o;
        }(e)), Y(e, e.l_desc), Y(e, e.d_desc), a = function (e) {
          var t;
          for (X(e, e.dyn_ltree, e.l_desc.max_code), X(e, e.dyn_dtree, e.d_desc.max_code), Y(e, e.bl_desc), t = c - 1; 3 <= t && 0 === e.bl_tree[2 * S[t] + 1]; t--);
          return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
        }(e), i = e.opt_len + 3 + 7 >>> 3, (s = e.static_len + 3 + 7 >>> 3) <= i && (i = s)) : i = s = r + 5, r + 4 <= i && -1 !== t ? J(e, t, r, n) : 4 === e.strategy || s === i ? (P(e, 2 + (n ? 1 : 0), 3), K(e, z, C)) : (P(e, 4 + (n ? 1 : 0), 3), function (e, t, r, n) {
          var i;
          for (P(e, t - 257, 5), P(e, r - 1, 5), P(e, n - 4, 4), i = 0; i < n; i++) P(e, e.bl_tree[2 * S[i] + 1], 3);
          V(e, e.dyn_ltree, t - 1), V(e, e.dyn_dtree, r - 1);
        }(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), K(e, e.dyn_ltree, e.dyn_dtree)), W(e), n && M(e);
      }, r._tr_tally = function (e, t, r) {
        return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & r, e.last_lit++, 0 === t ? e.dyn_ltree[2 * r]++ : (e.matches++, t--, e.dyn_ltree[2 * (A[r] + u + 1)]++, e.dyn_dtree[2 * N(t)]++), e.last_lit === e.lit_bufsize - 1;
      }, r._tr_align = function (e) {
        P(e, 2, 3), L(e, m, z), function (e) {
          16 === e.bi_valid ? (U(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8);
        }(e);
      };
    }, {
      "../utils/common": 41
    }],
    53: [function (e, t, r) {
      "use strict";

      t.exports = function () {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}],
    54: [function (e, t, r) {
      (function (e) {
        !function (r, n) {
          "use strict";

          if (!r.setImmediate) {
            var i,
              s,
              t,
              a,
              o = 1,
              h = {},
              u = !1,
              l = r.document,
              e = Object.getPrototypeOf && Object.getPrototypeOf(r);
            e = e && e.setTimeout ? e : r, i = "[object process]" === {}.toString.call(r.process) ? function (e) {
              process.nextTick(function () {
                c(e);
              });
            } : function () {
              if (r.postMessage && !r.importScripts) {
                var e = !0,
                  t = r.onmessage;
                return r.onmessage = function () {
                  e = !1;
                }, r.postMessage("", "*"), r.onmessage = t, e;
              }
            }() ? (a = "setImmediate$" + Math.random() + "$", r.addEventListener ? r.addEventListener("message", d, !1) : r.attachEvent("onmessage", d), function (e) {
              r.postMessage(a + e, "*");
            }) : r.MessageChannel ? ((t = new MessageChannel()).port1.onmessage = function (e) {
              c(e.data);
            }, function (e) {
              t.port2.postMessage(e);
            }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function (e) {
              var t = l.createElement("script");
              t.onreadystatechange = function () {
                c(e), t.onreadystatechange = null, s.removeChild(t), t = null;
              }, s.appendChild(t);
            }) : function (e) {
              setTimeout(c, 0, e);
            }, e.setImmediate = function (e) {
              "function" != typeof e && (e = new Function("" + e));
              for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++) t[r] = arguments[r + 1];
              var n = {
                callback: e,
                args: t
              };
              return h[o] = n, i(o), o++;
            }, e.clearImmediate = f;
          }
          function f(e) {
            delete h[e];
          }
          function c(e) {
            if (u) setTimeout(c, 0, e);else {
              var t = h[e];
              if (t) {
                u = !0;
                try {
                  !function (e) {
                    var t = e.callback,
                      r = e.args;
                    switch (r.length) {
                      case 0:
                        t();
                        break;
                      case 1:
                        t(r[0]);
                        break;
                      case 2:
                        t(r[0], r[1]);
                        break;
                      case 3:
                        t(r[0], r[1], r[2]);
                        break;
                      default:
                        t.apply(n, r);
                    }
                  }(t);
                } finally {
                  f(e), u = !1;
                }
              }
            }
          }
          function d(e) {
            e.source === r && "string" == typeof e.data && 0 === e.data.indexOf(a) && c(+e.data.slice(a.length));
          }
        }("undefined" == typeof self ? void 0 === e ? this : e : self);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}]
  }, {}, [10])(10);
});

/* === parsers/xml-utils.js === */
/**
 * XML Utilities Module
 * Handles XML parsing and file content extraction from PPTX archives
 */
var XMLUtils = /*#__PURE__*/function () {
  function XMLUtils() {
    _classCallCheck(this, XMLUtils);
  }
  return _createClass(XMLUtils, null, [{
    key: "getFileContent",
    value: (
    /**
     * Get file content from the ZIP archive
     * @param {JSZip} zip - The ZIP archive
     * @param {string} path - Path to the file within the archive
     * @returns {Promise<string|null>} - File content as string
     */
    function () {
      var _getFileContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(zip, path) {
        var file;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              file = zip.files[path];
              if (!file) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return file.async('string');
            case 1:
              return _context.a(2, _context.v);
            case 2:
              return _context.a(2, null);
          }
        }, _callee);
      }));
      function getFileContent(_x, _x2) {
        return _getFileContent.apply(this, arguments);
      }
      return getFileContent;
    }()
    /**
     * Parse relationships XML
     * @param {string} xmlContent - The relationships XML content
     * @returns {Array} - Array of relationship objects
     */
    )
  }, {
    key: "parseRelationships",
    value: function parseRelationships(xmlContent) {
      if (!xmlContent) return [];
      var relationships = [];
      var parser = new DOMParser();
      var doc = parser.parseFromString(xmlContent, 'text/xml');
      var rels = doc.getElementsByTagName('Relationship');
      var _iterator = _createForOfIteratorHelper(rels),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rel = _step.value;
          relationships.push({
            id: rel.getAttribute('Id'),
            type: rel.getAttribute('Type'),
            target: rel.getAttribute('Target')
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return relationships;
    }

    /**
     * Get slide order from presentation.xml
     * @param {string} presentationXml - The presentation XML content
     * @returns {Array} - Array of slide relationship IDs in order
     */
  }, {
    key: "getSlideOrder",
    value: function getSlideOrder(presentationXml) {
      if (!presentationXml) return [];
      var slideIds = [];
      var parser = new DOMParser();
      var doc = parser.parseFromString(presentationXml, 'text/xml');
      var slideList = doc.getElementsByTagName('p:sldIdLst')[0];
      if (slideList) {
        var slides = slideList.getElementsByTagName('p:sldId');
        var _iterator2 = _createForOfIteratorHelper(slides),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var slide = _step2.value;
            var rId = slide.getAttribute('r:id');
            if (rId) {
              slideIds.push(rId);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return slideIds;
    }

    /**
     * Parse an XML string into a DOM document
     * @param {string} xmlContent - The XML content
     * @returns {Document} - Parsed DOM document
     */
  }, {
    key: "parseXML",
    value: function parseXML(xmlContent) {
      var parser = new DOMParser();
      return parser.parseFromString(xmlContent, 'text/xml');
    }
  }]);
}(); // Export for use in other modules
window.XMLUtils = XMLUtils;

/* === parsers/theme-extractor.js === */
/**
 * Theme Extractor Module
 * Handles extraction of theme colors and fonts from PPTX theme files
 */
var ThemeExtractor = /*#__PURE__*/function () {
  function ThemeExtractor() {
    _classCallCheck(this, ThemeExtractor);
    this.themeColors = {};
    this.themeFonts = {
      majorFont: 'Calibri Light',
      minorFont: 'Calibri'
    };

    // Fallback Office-like palette when theme is missing or incomplete
    this.defaultThemeColors = {
      dk1: '#000000',
      lt1: '#FFFFFF',
      dk2: '#1F497D',
      lt2: '#EEECE1',
      accent1: '#5B9BD5',
      accent2: '#ED7D31',
      accent3: '#A5A5A5',
      accent4: '#FFC000',
      accent5: '#4472C4',
      accent6: '#70AD47',
      hlink: '#0563C1',
      folHlink: '#954F72'
    };

    // Theme format scheme fill style lists (a:fmtScheme)
    // Stored as arrays of XML Elements (e.g., a:solidFill, a:gradFill, ...)
    this.fillStyleNodes = [];
    this.bgFillStyleNodes = [];

    // Relationships for the theme part (e.g. ppt/theme/_rels/theme1.xml.rels)
    // Used to resolve a:blipFill r:embed ids inside theme fill style lists.
    this.themeRelationships = [];
  }

  /**
   * Provide relationships for the theme XML part so theme blip fills can resolve.
   * @param {Array<{id:string,type?:string,target:string}>} relationships
   */
  return _createClass(ThemeExtractor, [{
    key: "setThemeRelationships",
    value: function setThemeRelationships(relationships) {
      this.themeRelationships = Array.isArray(relationships) ? relationships : [];
    }

    /**
     * Resolve a relationship id (rIdX) to a theme relationship target.
     * @param {string} relId
     * @returns {string|null}
     */
  }, {
    key: "getThemeRelationshipTarget",
    value: function getThemeRelationshipTarget(relId) {
      if (!relId || !Array.isArray(this.themeRelationships)) return null;
      var rel = this.themeRelationships.find(function (r) {
        return r && r.id === relId;
      });
      return rel && typeof rel.target === 'string' ? rel.target : null;
    }

    /**
     * Resolve a theme relationship id to a loaded image URL.
     * @param {string} relId
     * @param {Object<string,string>} images - map from filename -> object URL
     * @returns {string|null}
     */
  }, {
    key: "resolveThemeImageUrl",
    value: function resolveThemeImageUrl(relId, images) {
      var target = this.getThemeRelationshipTarget(relId);
      if (!target || !images) return null;
      var imageName = target.split('/').pop();
      if (!imageName) return null;
      return images[imageName] || null;
    }

    /**
     * Extract theme colors and fonts from a parsed theme XML document
     * @param {Document|null} doc - Parsed theme document (or null if missing)
     * @returns {Promise<void>}
     */
  }, {
    key: "extract",
    value: (function () {
      var _extract = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(doc) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (doc) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this.extractColorScheme(doc);
              this.extractFontScheme(doc);
              this.extractFormatScheme(doc);
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function extract(_x3) {
        return _extract.apply(this, arguments);
      }
      return extract;
    }()
    /**
     * Extract theme format scheme (fills)
     * @param {Document} doc - Parsed theme document
     */
    )
  }, {
    key: "extractFormatScheme",
    value: function extractFormatScheme(doc) {
      var fmtScheme = doc.getElementsByTagName('a:fmtScheme')[0];
      if (!fmtScheme) return;
      var toElementChildren = function toElementChildren(parent) {
        if (!parent) return [];
        return Array.from(parent.childNodes).filter(function (n) {
          return n && n.nodeType === 1;
        }); // ELEMENT_NODE
      };
      var fillStyleLst = fmtScheme.getElementsByTagName('a:fillStyleLst')[0];
      var bgFillStyleLst = fmtScheme.getElementsByTagName('a:bgFillStyleLst')[0];
      this.fillStyleNodes = toElementChildren(fillStyleLst);
      this.bgFillStyleNodes = toElementChildren(bgFillStyleLst);
    }

    /**
     * Get a fill style node by theme index (from a:fillRef/@idx).
     * Note: PPTX files differ on whether idx is 0-based or 1-based.
     * This method attempts both.
     * @param {number} idx - fillRef index
     * @param {Object} options
     * @param {boolean} options.background - Use bgFillStyleLst instead of fillStyleLst
     * @returns {Element|null}
     */
  }, {
    key: "getFillStyleNode",
    value: function getFillStyleNode(idx) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$background = _ref.background,
        background = _ref$background === void 0 ? false : _ref$background;
      var list = background ? this.bgFillStyleNodes : this.fillStyleNodes;
      if (!Array.isArray(list) || list.length === 0) return null;
      if (!Number.isFinite(idx)) return null;

      // Try 0-based
      if (idx >= 0 && idx < list.length) return list[idx];
      // Try 1-based
      var oneBased = idx - 1;
      if (oneBased >= 0 && oneBased < list.length) return list[oneBased];
      return null;
    }

    /**
     * Extract color scheme from theme
     * @param {Document} doc - Parsed theme document
     */
  }, {
    key: "extractColorScheme",
    value: function extractColorScheme(doc) {
      var colorScheme = doc.getElementsByTagName('a:clrScheme')[0];
      if (!colorScheme) return;
      var colorElements = ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink'];
      for (var _i = 0, _colorElements = colorElements; _i < _colorElements.length; _i++) {
        var colorName = _colorElements[_i];
        var colorEl = colorScheme.getElementsByTagName('a:' + colorName)[0];
        if (colorEl) {
          var srgbClr = colorEl.getElementsByTagName('a:srgbClr')[0];
          var sysClr = colorEl.getElementsByTagName('a:sysClr')[0];
          if (srgbClr) {
            this.themeColors[colorName] = '#' + srgbClr.getAttribute('val');
          } else if (sysClr) {
            var lastClr = sysClr.getAttribute('lastClr');
            if (lastClr) {
              this.themeColors[colorName] = '#' + lastClr;
            }
          }
        }
      }
    }

    /**
     * Extract font scheme from theme
     * @param {Document} doc - Parsed theme document
     */
  }, {
    key: "extractFontScheme",
    value: function extractFontScheme(doc) {
      var fontScheme = doc.getElementsByTagName('a:fontScheme')[0];
      if (!fontScheme) return;

      // Major font (typically for headings/titles)
      var majorFont = fontScheme.getElementsByTagName('a:majorFont')[0];
      if (majorFont) {
        var latin = majorFont.getElementsByTagName('a:latin')[0];
        if (latin) {
          this.themeFonts.majorFont = latin.getAttribute('typeface') || 'Calibri Light';
        }
      }

      // Minor font (typically for body text)
      var minorFont = fontScheme.getElementsByTagName('a:minorFont')[0];
      if (minorFont) {
        var _latin = minorFont.getElementsByTagName('a:latin')[0];
        if (_latin) {
          this.themeFonts.minorFont = _latin.getAttribute('typeface') || 'Calibri';
        }
      }
    }

    /**
     * Get resolved color from scheme reference
     * @param {string} colorRef - The scheme color reference (e.g., 'accent1', 'tx1')
     * @returns {string|null} - The resolved hex color
     */
  }, {
    key: "getSchemeColor",
    value: function getSchemeColor(colorRef) {
      var schemeMap = {
        'tx1': 'dk1',
        'tx2': 'dk2',
        'bg1': 'lt1',
        'bg2': 'lt2',
        'accent1': 'accent1',
        'accent2': 'accent2',
        'accent3': 'accent3',
        'accent4': 'accent4',
        'accent5': 'accent5',
        'accent6': 'accent6',
        'hlink': 'hlink',
        'folHlink': 'folHlink',
        'dk1': 'dk1',
        'dk2': 'dk2',
        'lt1': 'lt1',
        'lt2': 'lt2'
      };
      var themeKey = schemeMap[colorRef] || colorRef;
      return this.themeColors[themeKey] || this.defaultThemeColors[themeKey] || null;
    }

    /**
     * Get theme colors
     * @returns {Object} - Theme colors object
     */
  }, {
    key: "getColors",
    value: function getColors() {
      return this.themeColors;
    }

    /**
     * Get theme fonts
     * @returns {Object} - Theme fonts object
     */
  }, {
    key: "getFonts",
    value: function getFonts() {
      return this.themeFonts;
    }

    /**
     * Get default text color (tx1 = dark1)
     * Used when no explicit color is specified
     * @returns {string} - Hex color string
     */
  }, {
    key: "getDefaultTextColor",
    value: function getDefaultTextColor() {
      return this.themeColors['dk1'] || '#000000';
    }

    /**
     * Get default title font (major font)
     * @returns {string} - Font family name
     */
  }, {
    key: "getTitleFont",
    value: function getTitleFont() {
      return this.themeFonts.majorFont || 'Calibri Light';
    }

    /**
     * Get default body font (minor font)
     * @returns {string} - Font family name
     */
  }, {
    key: "getBodyFont",
    value: function getBodyFont() {
      return this.themeFonts.minorFont || 'Calibri';
    }

    /**
     * Get accent color by index (1-6)
     * @param {number} index - Accent color index (1-6)
     * @returns {string|null} - Hex color string or null
     */
  }, {
    key: "getAccentColor",
    value: function getAccentColor(index) {
      var key = "accent".concat(index);
      return this.themeColors[key] || this.defaultThemeColors[key] || null;
    }

    /**
     * Get background color (lt1 = light1)
     * @returns {string} - Hex color string
     */
  }, {
    key: "getBackgroundColor",
    value: function getBackgroundColor() {
      return this.themeColors['lt1'] || '#FFFFFF';
    }

    /**
     * Get secondary text color (tx2 = dark2)
     * @returns {string} - Hex color string
     */
  }, {
    key: "getSecondaryTextColor",
    value: function getSecondaryTextColor() {
      return this.themeColors['dk2'] || '#444444';
    }

    /**
     * Get hyperlink color
     * @returns {string} - Hex color string
     */
  }, {
    key: "getHyperlinkColor",
    value: function getHyperlinkColor() {
      return this.themeColors['hlink'] || '#0563C1';
    }

    /**
     * Reset theme data
     */
  }, {
    key: "reset",
    value: function reset() {
      this.themeColors = {};
      this.themeFonts = {
        majorFont: 'Calibri Light',
        minorFont: 'Calibri'
      };
      this.fillStyleNodes = [];
      this.bgFillStyleNodes = [];
    }
  }]);
}(); // Export for use in other modules
window.ThemeExtractor = ThemeExtractor;

/* === parsers/background-extractor.js === */
/**
 * Background Extractor Module
 * Handles extraction of background styles from PPTX slides, layouts, and masters
 */
var BackgroundExtractor = /*#__PURE__*/function () {
  /**
   * Create a BackgroundExtractor
   * @param {ThemeExtractor} themeExtractor - Reference to theme extractor for color resolution
   * @param {Object} images - Map of image names to blob URLs
   */
  function BackgroundExtractor(themeExtractor, images) {
    _classCallCheck(this, BackgroundExtractor);
    this.themeExtractor = themeExtractor;
    this.images = images;
  }

  /**
   * Extract comprehensive background from a document
   * @param {Document} doc - Parsed XML document (slide, layout, or master)
   * @param {Array} imageRels - Image relationships
   * @returns {Object|null} - Background object or null
   */
  return _createClass(BackgroundExtractor, [{
    key: "extract",
    value: function extract(doc) {
      var _this = this;
      var imageRels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var background = {
        type: null,
        color: null,
        gradient: null,
        image: null
      };

      // Check for background properties
      var bgPr = doc.getElementsByTagName('p:bgPr')[0];
      var bg = doc.getElementsByTagName('p:bg')[0];
      if (bgPr) {
        // Solid fill background
        var solidFill = bgPr.getElementsByTagName('a:solidFill')[0];
        if (solidFill) {
          background.type = 'solid';
          background.color = this.extractColor(solidFill);
          return background;
        }

        // Gradient fill background
        var gradFill = bgPr.getElementsByTagName('a:gradFill')[0];
        if (gradFill) {
          background.type = 'gradient';
          background.gradient = this.extractGradient(gradFill);
          return background;
        }

        // Background image (blipFill)
        var blipFill = bgPr.getElementsByTagName('a:blipFill')[0];
        if (blipFill) {
          var blip = blipFill.getElementsByTagName('a:blip')[0];
          if (blip) {
            var svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
            var svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
            var pngId = blip.getAttribute('r:embed');
            var resolveRel = function resolveRel(embedId) {
              if (!embedId) return null;
              var rel = imageRels.find(function (r) {
                var id = r.getAttribute ? r.getAttribute('Id') : r.id;
                return id === embedId;
              });
              if (!rel) return null;
              var target = rel.getAttribute ? rel.getAttribute('Target') : rel.target;
              var imageName = target.split('/').pop();
              return _this.images[imageName] || null;
            };
            var svgUrl = resolveRel(svgId);
            var pngUrl = resolveRel(pngId);
            var chosen = svgUrl || pngUrl;
            if (chosen) {
              background.type = 'image';
              background.image = chosen;
              return background;
            }
          }
        }

        // Pattern fill
        var pattFill = bgPr.getElementsByTagName('a:pattFill')[0];
        if (pattFill) {
          background.type = 'pattern';
          var fgClr = pattFill.getElementsByTagName('a:fgClr')[0];
          var bgClr = pattFill.getElementsByTagName('a:bgClr')[0];
          background.color = this.extractColor(fgClr) || this.extractColor(bgClr);
          return background;
        }
      }

      // Check for background reference (bgRef) - references theme background
      var bgRef = bg ? bg.getElementsByTagName('p:bgRef')[0] : null;
      if (bgRef) {
        var schemeClr = bgRef.getElementsByTagName('a:schemeClr')[0];
        if (schemeClr) {
          background.type = 'solid';
          background.color = this.extractColor(bgRef);
          return background;
        }
      }
      return background.type ? background : null;
    }

    /**
     * Extract gradient information
     * @param {Element} gradFill - Gradient fill element
     * @returns {Object} - Gradient object with type, angle, and stops
     */
  }, {
    key: "extractGradient",
    value: function extractGradient(gradFill) {
      var gradient = {
        type: 'linear',
        angle: 90,
        stops: []
      };

      // Get gradient type and angle
      var lin = gradFill.getElementsByTagName('a:lin')[0];
      if (lin) {
        // Angle is in 60,000ths of a degree
        var ang = lin.getAttribute('ang');
        if (ang) {
          gradient.angle = parseInt(ang) / 60000;
        }
      }
      var path = gradFill.getElementsByTagName('a:path')[0];
      if (path) {
        gradient.type = path.getAttribute('path') || 'circle';
      }

      // Get gradient stops
      var gsLst = gradFill.getElementsByTagName('a:gsLst')[0];
      if (gsLst) {
        var stops = gsLst.getElementsByTagName('a:gs');
        var _iterator3 = _createForOfIteratorHelper(stops),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var stop = _step3.value;
            var pos = parseInt(stop.getAttribute('pos') || '0') / 1000; // Convert to percentage
            var color = this.extractColor(stop);
            if (color) {
              var stopObj = {
                position: pos,
                color: color
              };

              // Extract opacity for this stop
              var alphaEl = stop.getElementsByTagName('a:alpha')[0];
              if (alphaEl) {
                var alphaVal = parseInt(alphaEl.getAttribute('val') || '100000');
                stopObj.opacity = alphaVal / 100000;
              } else {
                stopObj.opacity = 1;
              }
              gradient.stops.push(stopObj);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      // Sort stops by position
      gradient.stops.sort(function (a, b) {
        return a.position - b.position;
      });
      return gradient;
    }

    /**
     * Extract color from an element
     * @param {Element} element - XML element containing color information
     * @returns {string|null} - Hex color string or null
     */
  }, {
    key: "extractColor",
    value: function extractColor(element) {
      if (!element) return null;

      // Direct RGB color
      var srgbClr = element.getElementsByTagName('a:srgbClr')[0];
      if (srgbClr) {
        var baseColor = '#' + srgbClr.getAttribute('val');
        return this.applyColorTransforms(baseColor, srgbClr);
      }

      // Scheme color reference
      var schemeClr = element.getElementsByTagName('a:schemeClr')[0];
      if (schemeClr) {
        var colorRef = schemeClr.getAttribute('val');
        var _baseColor = this.themeExtractor.getSchemeColor(colorRef);
        if (_baseColor) {
          return this.applyColorTransforms(_baseColor, schemeClr);
        }
        return null;
      }

      // System color (Windows system colors)
      var sysClr = element.getElementsByTagName('a:sysClr')[0];
      if (sysClr) {
        var lastClr = sysClr.getAttribute('lastClr');
        if (lastClr) {
          var _baseColor2 = '#' + lastClr;
          return this.applyColorTransforms(_baseColor2, sysClr);
        }
      }

      // Preset color (named colors like 'red', 'blue', etc.)
      var prstClr = element.getElementsByTagName('a:prstClr')[0];
      if (prstClr) {
        var colorName = prstClr.getAttribute('val');
        var _baseColor3 = this.presetColorToHex(colorName);
        if (_baseColor3) {
          return this.applyColorTransforms(_baseColor3, prstClr);
        }
      }
      return null;
    }

    /**
     * Extract color with opacity from an element
     * @param {Element} element - XML element containing color information
     * @returns {Object|null} - Object with color (hex string) and opacity (0-1), or null
     */
  }, {
    key: "extractColorWithOpacity",
    value: function extractColorWithOpacity(element) {
      if (!element) return null;

      // Get the base color
      var color = this.extractColor(element);
      if (!color) return null;

      // Get opacity/alpha value from a:alpha element
      var opacity = 1;
      var alphaEl = element.getElementsByTagName('a:alpha')[0];
      if (alphaEl) {
        var alphaVal = parseInt(alphaEl.getAttribute('val') || '100000');
        opacity = alphaVal / 100000;
      }
      return {
        color: color,
        opacity: opacity
      };
    }

    /**
     * Apply color transformations (luminance, tint, shade, etc.)
     * @param {string} hexColor - Base hex color
     * @param {Element} colorElement - Element containing transformation children
     * @returns {string} - Transformed hex color
     */
  }, {
    key: "applyColorTransforms",
    value: function applyColorTransforms(hexColor, colorElement) {
      if (!colorElement) return hexColor;
      var _this$hexToRgb = this.hexToRgb(hexColor),
        r = _this$hexToRgb.r,
        g = _this$hexToRgb.g,
        b = _this$hexToRgb.b;
      var _this$rgbToHsl = this.rgbToHsl(r, g, b),
        h = _this$rgbToHsl.h,
        s = _this$rgbToHsl.s,
        l = _this$rgbToHsl.l;

      // Luminance modification (percentage, e.g., 75000 = 75%)
      var lumMod = colorElement.getElementsByTagName('a:lumMod')[0];
      if (lumMod) {
        var val = parseInt(lumMod.getAttribute('val') || '100000') / 100000;
        l = l * val;
      }

      // Luminance offset (percentage added/subtracted)
      var lumOff = colorElement.getElementsByTagName('a:lumOff')[0];
      if (lumOff) {
        var _val = parseInt(lumOff.getAttribute('val') || '0') / 100000;
        l = l + _val;
      }

      // Tint (mix with white)
      var tint = colorElement.getElementsByTagName('a:tint')[0];
      if (tint) {
        var _val2 = parseInt(tint.getAttribute('val') || '100000') / 100000;
        l = l + (1 - l) * (1 - _val2);
      }

      // Shade (mix with black)
      var shade = colorElement.getElementsByTagName('a:shade')[0];
      if (shade) {
        var _val3 = parseInt(shade.getAttribute('val') || '100000') / 100000;
        l = l * _val3;
      }

      // Saturation modification
      var satMod = colorElement.getElementsByTagName('a:satMod')[0];
      if (satMod) {
        var _val4 = parseInt(satMod.getAttribute('val') || '100000') / 100000;
        s = s * _val4;
      }

      // Clamp values
      l = Math.max(0, Math.min(1, l));
      s = Math.max(0, Math.min(1, s));
      var rgb = this.hslToRgb(h, s, l);
      return this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    /**
     * Convert hex color to RGB
     */
  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : {
        r: 0,
        g: 0,
        b: 0
      };
    }

    /**
     * Convert RGB to HSL
     */
  }, {
    key: "rgbToHsl",
    value: function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }
      return {
        h: h,
        s: s,
        l: l
      };
    }

    /**
     * Convert HSL to RGB
     */
  }, {
    key: "hslToRgb",
    value: function hslToRgb(h, s, l) {
      var r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        var hue2rgb = function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    }

    /**
     * Convert RGB to hex
     */
  }, {
    key: "rgbToHex",
    value: function rgbToHex(r, g, b) {
      return '#' + [r, g, b].map(function (x) {
        var hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }

    /**
     * Convert preset color name to hex
     */
  }, {
    key: "presetColorToHex",
    value: function presetColorToHex(colorName) {
      var _presetColors;
      if (!colorName) return null;
      var presetColors = (_presetColors = {
        // Core colors
        'black': '#000000',
        'white': '#FFFFFF',
        'red': '#FF0000',
        'green': '#00FF00',
        'blue': '#0000FF',
        'yellow': '#FFFF00',
        'cyan': '#00FFFF',
        'magenta': '#FF00FF',
        'orange': '#FFA500',
        'brown': '#A52A2A',
        'gray': '#808080',
        'silver': '#C0C0C0',
        'dkGray': '#404040',
        'ltGray': '#D3D3D3',
        // Dark variants
        'darkRed': '#8B0000',
        'darkGreen': '#006400',
        'darkBlue': '#00008B',
        'darkGray': '#404040',
        'dkRed': '#8B0000',
        'dkGreen': '#006400',
        'dkBlue': '#00008B',
        // Light variants
        'lightRed': '#FFA07A',
        'lightGreen': '#90EE90',
        'lightBlue': '#ADD8E6',
        'lightGray': '#D3D3D3',
        'ltRed': '#FFA07A',
        'ltGreen': '#90EE90',
        'ltBlue': '#ADD8E6'
      }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_presetColors, "ltGray", '#D3D3D3'), 'maroon', '#800000'), 'olive', '#808000'), 'navy', '#000080'), 'purple', '#800080'), 'teal', '#008080'), 'aqua', '#00FFFF'), 'lime', '#00FF00'), 'fuchsia', '#FF00FF'), 'gold', '#FFD700'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_presetColors, 'coral', '#FF7F50'), 'crimson', '#DC143C'), 'indigo', '#4B0082'), 'violet', '#EE82EE'), 'plum', '#DDA0DD'), 'tan', '#D2B48C'));
      var hex = presetColors[colorName];
      if (!hex) {
        console.warn("[PPTX] Unmapped preset color '".concat(colorName, "'"));
      }
      return hex || null;
    }
  }]);
}(); // Export for use in other modules
window.BackgroundExtractor = BackgroundExtractor;

/* === parsers/text-extractor.js === */
/**
 * Text Extractor Module
 * Handles extraction of text elements with formatting from PPTX slides
 */
var TextExtractor = /*#__PURE__*/function () {
  /**
   * Create a TextExtractor
   * @param {ThemeExtractor} themeExtractor - For font resolution
   * @param {BackgroundExtractor} backgroundExtractor - For color extraction
   */
  function TextExtractor(themeExtractor, backgroundExtractor) {
    _classCallCheck(this, TextExtractor);
    this.themeExtractor = themeExtractor;
    this.backgroundExtractor = backgroundExtractor;
  }

  /**
   * Extract text elements with formatting from slide
   * @param {Document} doc - Parsed slide document
   * @returns {Array} - Array of text element objects
   */
  return _createClass(TextExtractor, [{
    key: "extractTextElements",
    value: function extractTextElements(doc) {
      var textElements = [];
      var shapes = doc.getElementsByTagName('p:sp');
      var _iterator4 = _createForOfIteratorHelper(shapes),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var shape = _step4.value;
          // Check if this is a placeholder we should skip (slide number, date, footer)
          if (this.shouldSkipPlaceholder(shape)) {
            continue;
          }

          // Determine if this is a title placeholder
          var isTitle = this.isTitlePlaceholder(shape);
          var textBody = shape.getElementsByTagName('p:txBody')[0];
          if (textBody) {
            var shapeText = this.extractTextFromBody(textBody, isTitle);
            if (shapeText) {
              textElements.push(shapeText);
            }
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return textElements;
    }

    /**
     * Check if a shape is a placeholder that should be skipped
     * @param {Element} shape - Shape element
     * @returns {boolean} - True if should skip
     */
  }, {
    key: "shouldSkipPlaceholder",
    value: function shouldSkipPlaceholder(shape) {
      // No longer skip footer, date, or slide number placeholders
      // All text placeholders are now rendered
      return false;
    }

    /**
     * Check if a shape is a title placeholder
     * @param {Element} shape - Shape element
     * @returns {boolean} - True if title placeholder
     */
  }, {
    key: "isTitlePlaceholder",
    value: function isTitlePlaceholder(shape) {
      var nvSpPr = shape.getElementsByTagName('p:nvSpPr')[0];
      if (nvSpPr) {
        var nvPr = nvSpPr.getElementsByTagName('p:nvPr')[0];
        if (nvPr) {
          var ph = nvPr.getElementsByTagName('p:ph')[0];
          if (ph) {
            var phType = ph.getAttribute('type');
            // Title-type placeholders use major font
            return phType === 'title' || phType === 'ctrTitle' || phType === 'subTitle';
          }
        }
      }
      return false;
    }

    /**
     * Extract text from a text body element
     * @param {Element} textBody - Text body element
     * @param {boolean} isTitle - Whether this is title text
     * @returns {Object|null} - Text element object with paragraphs
     */
  }, {
    key: "extractTextFromBody",
    value: function extractTextFromBody(textBody) {
      var isTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var paragraphs = textBody.getElementsByTagName('a:p');
      var shapeTextParts = [];
      var _iterator5 = _createForOfIteratorHelper(paragraphs),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var para = _step5.value;
          var paraContent = this.extractParagraph(para, isTitle);
          if (paraContent.length > 0) {
            shapeTextParts.push(paraContent);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      if (shapeTextParts.length > 0) {
        return {
          paragraphs: shapeTextParts
        };
      }
      return null;
    }

    /**
     * Extract content from a paragraph
     * @param {Element} para - Paragraph element
     * @param {boolean} isTitle - Whether this is title text
     * @returns {Array} - Array of text run objects
     */
  }, {
    key: "extractParagraph",
    value: function extractParagraph(para) {
      var isTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // Get paragraph-level properties
      var pPr = para.getElementsByTagName('a:pPr')[0];
      var paragraphAlign = 'left';
      var defaultFontSize = null;
      var defaultColor = null;
      var defaultFontFamily = null;
      if (pPr) {
        var algn = pPr.getAttribute('algn');
        if (algn === 'ctr') paragraphAlign = 'center';else if (algn === 'r') paragraphAlign = 'right';else if (algn === 'just') paragraphAlign = 'justify';

        // Get default run properties at paragraph level
        var defRPr = pPr.getElementsByTagName('a:defRPr')[0];
        if (defRPr) {
          var sz = defRPr.getAttribute('sz');
          if (sz) defaultFontSize = parseInt(sz) / 100;

          // Default color
          var solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
          defaultColor = this.backgroundExtractor.extractColor(solidFill);

          // Default font family
          var latin = defRPr.getElementsByTagName('a:latin')[0];
          if (latin) {
            var typeface = latin.getAttribute('typeface');
            if (typeface) {
              var themeFonts = this.themeExtractor.getFonts();
              if (typeface === '+mj-lt') {
                defaultFontFamily = themeFonts.majorFont;
              } else if (typeface === '+mn-lt') {
                defaultFontFamily = themeFonts.minorFont;
              } else if (!typeface.startsWith('+')) {
                defaultFontFamily = typeface;
              }
            }
          }
        }
      }
      var runs = para.getElementsByTagName('a:r');
      var paraContent = [];
      var _iterator6 = _createForOfIteratorHelper(runs),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var run = _step6.value;
          var textRun = this.extractTextRun(run, paragraphAlign, isTitle, defaultFontSize, defaultColor, defaultFontFamily);
          if (textRun) {
            paraContent.push(textRun);
          }
        }

        // Check for direct text without runs
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      if (paraContent.length === 0) {
        var directTexts = para.getElementsByTagName('a:t');
        var _iterator7 = _createForOfIteratorHelper(directTexts),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var t = _step7.value;
            if (t.textContent && t.textContent.trim()) {
              paraContent.push({
                text: t.textContent,
                color: defaultColor || this.themeExtractor.getDefaultTextColor(),
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
                superscript: false,
                subscript: false,
                textTransform: 'none',
                fontSize: defaultFontSize,
                fontFamily: defaultFontFamily || (isTitle ? this.themeExtractor.getTitleFont() : this.themeExtractor.getBodyFont()),
                align: paragraphAlign,
                highlight: null,
                shadow: null
              });
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
      return paraContent;
    }

    /**
     * Extract a text run with formatting
     * @param {Element} run - Text run element
     * @param {string} paragraphAlign - Paragraph alignment
     * @param {boolean} isTitle - Whether this is title text (for font selection)
     * @param {number|null} defaultFontSize - Default font size from paragraph
     * @param {string|null} defaultColor - Default color from paragraph
     * @param {string|null} defaultFontFamily - Default font family from paragraph
     * @returns {Object|null} - Text run object with formatting
     */
  }, {
    key: "extractTextRun",
    value: function extractTextRun(run, paragraphAlign) {
      var isTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var defaultFontSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var defaultColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var defaultFontFamily = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var textEl = run.getElementsByTagName('a:t')[0];
      if (!textEl || !textEl.textContent) {
        return null;
      }
      var text = textEl.textContent;
      var rPr = run.getElementsByTagName('a:rPr')[0];
      var color = null;
      var bold = false;
      var italic = false;
      var underline = false;
      var strikethrough = false;
      var fontSize = null;
      var fontFamily = null;
      var highlight = null;
      var superscript = false;
      var subscript = false;
      var textTransform = 'none';
      var shadow = null;
      if (rPr) {
        bold = rPr.getAttribute('b') === '1';
        italic = rPr.getAttribute('i') === '1';
        underline = rPr.getAttribute('u') && rPr.getAttribute('u') !== 'none';
        strikethrough = rPr.getAttribute('strike') && rPr.getAttribute('strike') !== 'noStrike';

        // Superscript/subscript via baseline offset (positive -> super, negative -> sub)
        var baseline = rPr.getAttribute('baseline');
        if (baseline) {
          var val = parseInt(baseline, 10);
          if (!Number.isNaN(val)) {
            superscript = val > 0;
            subscript = val < 0;
          }
        }

        // Capitalization (all caps / small caps)
        var cap = rPr.getAttribute('cap');
        if (cap === 'small') textTransform = 'small-caps';else if (cap === 'all') textTransform = 'uppercase';

        // Get font size (in hundredths of a point)
        var sz = rPr.getAttribute('sz');
        if (sz) {
          fontSize = parseInt(sz) / 100;
        }

        // Get font family
        fontFamily = this.extractFontFamily(rPr);

        // Get color
        var solidFill = rPr.getElementsByTagName('a:solidFill')[0];
        color = this.backgroundExtractor.extractColor(solidFill);

        // Text highlight (background fill behind the run)
        var highlightFill = rPr.getElementsByTagName('a:highlight')[0];
        if (highlightFill) {
          highlight = this.backgroundExtractor.extractColor(highlightFill) || '#ffff00';
        }

        // Basic shadow (outer shadow only)
        var outerShdw = rPr.getElementsByTagName('a:outerShdw')[0];
        if (outerShdw) {
          var dist = parseInt(outerShdw.getAttribute('dist') || '0', 10);
          var dir = parseInt(outerShdw.getAttribute('dir') || '2700000', 10);
          var blur = parseInt(outerShdw.getAttribute('blur') || '0', 10);
          var rad = dir * Math.PI / 10800000; // EMUs to radians
          var offsetX = dist / 12700 * Math.cos(rad);
          var offsetY = dist / 12700 * Math.sin(rad);
          var colorEl = outerShdw.getElementsByTagName('a:srgbClr')[0];
          var colorVal = colorEl ? colorEl.getAttribute('val') : '000000';
          var alphaEl = outerShdw.getElementsByTagName('a:alpha')[0];
          var alpha = alphaEl ? parseInt(alphaEl.getAttribute('val') || '100000', 10) / 100000 : 1;
          shadow = {
            offsetX: offsetX,
            offsetY: offsetY,
            blur: blur / 12700,
            color: "#".concat(colorVal),
            opacity: alpha
          };
        }
      }

      // Apply paragraph defaults when not explicitly set on run
      if (!fontSize && defaultFontSize) {
        fontSize = defaultFontSize;
      }
      if (!color && defaultColor) {
        color = defaultColor;
      }
      if (!fontFamily && defaultFontFamily) {
        fontFamily = defaultFontFamily;
      }

      // Apply theme defaults when not explicitly set
      if (!color) {
        // Use default text color from theme
        color = this.themeExtractor.getDefaultTextColor();
      }
      if (!fontFamily) {
        // Use appropriate theme font based on context
        fontFamily = isTitle ? this.themeExtractor.getTitleFont() : this.themeExtractor.getBodyFont();
      }
      return {
        text: text,
        color: color,
        bold: bold,
        italic: italic,
        underline: underline,
        strikethrough: strikethrough,
        superscript: superscript,
        subscript: subscript,
        textTransform: textTransform,
        fontSize: fontSize,
        fontFamily: fontFamily,
        align: paragraphAlign,
        highlight: highlight,
        shadow: shadow
      };
    }

    /**
     * Extract font family from run properties
     * @param {Element} rPr - Run properties element
     * @returns {string|null} - Font family name or null
     */
  }, {
    key: "extractFontFamily",
    value: function extractFontFamily(rPr) {
      var themeFonts = this.themeExtractor.getFonts();

      // Get font family from latin element
      var latin = rPr.getElementsByTagName('a:latin')[0];
      if (latin) {
        var typeface = latin.getAttribute('typeface');
        if (typeface) {
          // Handle theme font references
          if (typeface === '+mj-lt') {
            return themeFonts.majorFont;
          } else if (typeface === '+mn-lt') {
            return themeFonts.minorFont;
          } else {
            return typeface;
          }
        }
      }

      // Check for East Asian fonts as fallback
      var ea = rPr.getElementsByTagName('a:ea')[0];
      if (ea) {
        var _typeface = ea.getAttribute('typeface');
        if (_typeface && !_typeface.startsWith('+')) {
          return _typeface;
        }
      }

      // Check for Complex Script fonts as fallback
      var cs = rPr.getElementsByTagName('a:cs')[0];
      if (cs) {
        var _typeface2 = cs.getAttribute('typeface');
        if (_typeface2 && !_typeface2.startsWith('+')) {
          return _typeface2;
        }
      }
      return null;
    }
  }]);
}(); // Export for use in other modules
window.TextExtractor = TextExtractor;

/* === parsers/pptx/emf-to-svg.js === */
/**
 * Minimal EMF -> SVG converter with no external dependencies.
 * Supports EMF files that contain a single STRETCHDIBITS record with
 * 24-bit or 32-bit BI_RGB DIB data. For unsupported inputs, returns a
 * lightweight placeholder SVG. This is intentionally small and best-effort.
 */
(function (global) {
  'use strict';

  var EMR_STRETCHDIBITS = 0x51; // 81
  var EMR_BITBLT = 0x4a; // 74
  var BI_RGB = 0; // No compression
  var BI_RLE8 = 1;
  var BI_RLE4 = 2;
  var BI_BITFIELDS = 3;
  var ensureBlob = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(input) {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(input instanceof Blob)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, input);
          case 1:
            if (!(input instanceof ArrayBuffer)) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2, new Blob([input]));
          case 2:
            if (!(input && input.buffer instanceof ArrayBuffer)) {
              _context3.n = 3;
              break;
            }
            return _context3.a(2, new Blob([input.buffer]));
          case 3:
            throw new Error('Unsupported input type for EMF conversion');
          case 4:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function ensureBlob(_x4) {
      return _ref2.apply(this, arguments);
    };
  }();
  var placeholderSvg = function placeholderSvg(label) {
    var safe = (label || 'EMF image').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return {
      width: 400,
      height: 200,
      svgText: '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" role="img" aria-label="' + safe + ' unsupported"><rect width="400" height="200" fill="#f3f4f6" stroke="#d1d5db"/><text x="200" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4b5563">EMF not rendered</text><text x="200" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">Unsupported content</text></svg>'
    };
  };
  var readUint = function readUint(dv, offset, size) {
    if (size === 2) return dv.getUint16(offset, true);
    return dv.getUint32(offset, true);
  };
  var readPalette = function readPalette(dv, start, count) {
    var palette = [];
    for (var i = 0; i < count; i++) {
      var b = dv.getUint8(start + i * 4 + 0);
      var g = dv.getUint8(start + i * 4 + 1);
      var r = dv.getUint8(start + i * 4 + 2);
      var a = 255; // palette entries in EMF are RGBQUAD (alpha unused)
      palette.push({
        r: r,
        g: g,
        b: b,
        a: a
      });
    }
    return palette;
  };
  var computeMaskInfo = function computeMaskInfo(mask) {
    var shift = 0;
    var bits = 0;
    var m = mask >>> 0;
    if (m === 0) return {
      shift: 0,
      bits: 0,
      scale: 0
    };
    while ((m & 1) === 0) {
      shift++;
      m >>>= 1;
    }
    while ((m & 1) === 1) {
      bits++;
      m >>>= 1;
    }
    var scale = bits ? 255 / ((1 << bits) - 1) : 0;
    return {
      shift: shift,
      bits: bits,
      scale: scale
    };
  };
  var decodeBitmap = function decodeBitmap(dv, bmiOff, bitsOff, cbBits) {
    var biSize = readUint(dv, bmiOff, 4);
    if (biSize < 40) return null;
    var width = dv.getInt32(bmiOff + 4, true);
    var heightRaw = dv.getInt32(bmiOff + 8, true);
    var planes = readUint(dv, bmiOff + 12, 2);
    var bitCount = readUint(dv, bmiOff + 14, 2);
    var compression = readUint(dv, bmiOff + 16, 4);
    var clrUsed = readUint(dv, bmiOff + 32, 4);
    if (planes !== 1) return null;
    var topDown = heightRaw < 0;
    var height = Math.abs(heightRaw);
    if (width <= 0 || height <= 0) return null;

    // Determine palette size
    var paletteCount = 0;
    if (bitCount <= 8 && compression !== BI_BITFIELDS) {
      paletteCount = clrUsed && clrUsed > 0 ? clrUsed : 1 << bitCount;
    }
    var palette = paletteCount > 0 ? readPalette(dv, bmiOff + biSize, paletteCount) : null;

    // Bitfields masks
    var rMask = 0,
      gMask = 0,
      bMask = 0,
      aMask = 0;
    if (compression === BI_BITFIELDS) {
      var masksOff = bmiOff + biSize;
      rMask = dv.getUint32(masksOff + 0, true);
      gMask = dv.getUint32(masksOff + 4, true);
      bMask = dv.getUint32(masksOff + 8, true);
      // Optional alpha mask
      aMask = dv.getUint32(masksOff + 12, true);
    }

    // Stride in bytes, aligned to 4-byte rows
    var stride = function () {
      if (bitCount === 1) return width + 31 >> 3 & ~3;
      if (bitCount === 4) return (width + 7 >> 3) * 4 + 3 & ~3;
      if (bitCount === 8) return width + 3 & ~3;
      if (bitCount === 16 || bitCount === 15) return width * 2 + 3 & ~3;
      if (bitCount === 24) return width * 3 + 3 & ~3;
      if (bitCount === 32) return width * 4;
      return null;
    }();
    if (!stride) return null;
    var expectedSize = stride * height;
    var bitsLen = Math.min(cbBits, dv.byteLength - bitsOff);
    if (expectedSize > bitsLen) return null;
    var pixels = new Uint8ClampedArray(width * height * 4);
    var writePixel = function writePixel(row, col, r, g, b) {
      var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 255;
      var dst = (row * width + col) * 4;
      pixels[dst] = r;
      pixels[dst + 1] = g;
      pixels[dst + 2] = b;
      pixels[dst + 3] = a;
    };
    var base = bitsOff;
    var rowLoop = function rowLoop(fnPerRow) {
      for (var row = 0; row < height; row++) {
        var srcRow = topDown ? row : height - 1 - row;
        var srcOff = base + srcRow * stride;
        fnPerRow(row, srcOff);
      }
    };
    if (bitCount === 24 || bitCount === 32) {
      rowLoop(function (row, srcOff) {
        for (var col = 0; col < width; col++) {
          var b = dv.getUint8(srcOff + col * (bitCount / 8) + 0);
          var g = dv.getUint8(srcOff + col * (bitCount / 8) + 1);
          var r = dv.getUint8(srcOff + col * (bitCount / 8) + 2);
          var a = bitCount === 32 ? dv.getUint8(srcOff + col * 4 + 3) : 255;
          writePixel(row, col, r, g, b, a);
        }
      });
      return {
        width: width,
        height: height,
        pixels: pixels
      };
    }
    if (bitCount === 16 || bitCount === 15) {
      var rInfo = computeMaskInfo(rMask || 0x7c00);
      var gInfo = computeMaskInfo(gMask || 0x03e0);
      var bInfo = computeMaskInfo(bMask || 0x001f);
      var aInfo = computeMaskInfo(aMask);
      rowLoop(function (row, srcOff) {
        for (var col = 0; col < width; col++) {
          var v = dv.getUint16(srcOff + col * 2, true);
          var r = rInfo.bits ? ((v & rMask) >>> rInfo.shift) * rInfo.scale : 0;
          var g = gInfo.bits ? ((v & gMask) >>> gInfo.shift) * gInfo.scale : 0;
          var b = bInfo.bits ? ((v & bMask) >>> bInfo.shift) * bInfo.scale : 0;
          var a = aInfo.bits ? ((v & aMask) >>> aInfo.shift) * aInfo.scale : 255;
          writePixel(row, col, r, g, b, a);
        }
      });
      return {
        width: width,
        height: height,
        pixels: pixels
      };
    }
    if (bitCount === 8 || bitCount === 4 || bitCount === 1) {
      if (!palette || palette.length === 0) return null;
      var mask = (1 << bitCount) - 1;
      var pixelsPerByte = 8 / bitCount;
      rowLoop(function (row, srcOff) {
        var bitPos = 0;
        for (var col = 0; col < width; col++) {
          var byteIdx = Math.floor(bitPos / 8);
          var shift = 8 - bitCount - bitPos % 8;
          var idx = dv.getUint8(srcOff + byteIdx) >> shift & mask;
          var pal = palette[idx] || {
            r: 0,
            g: 0,
            b: 0,
            a: 255
          };
          writePixel(row, col, pal.r, pal.g, pal.b, pal.a);
          bitPos += bitCount;
        }
      });
      return {
        width: width,
        height: height,
        pixels: pixels
      };
    }
    if (compression === BI_RLE8 || compression === BI_RLE4) {
      // Not yet supported
      return null;
    }
    return null;
  };
  var decodeStretchDibits = function decodeStretchDibits(dv, pos, size) {
    var offBmi = readUint(dv, pos + 80, 4);
    var cbBmi = readUint(dv, pos + 84, 4);
    var offBits = readUint(dv, pos + 88, 4);
    var cbBits = readUint(dv, pos + 92, 4);
    if (!offBmi || !offBits || !cbBmi || !cbBits) return null;
    if (pos + offBmi + cbBmi > dv.byteLength) return null;
    if (pos + offBits + cbBits > dv.byteLength) return null;
    var bmiOff = pos + offBmi;
    var bitsOff = pos + offBits;
    return decodeBitmap(dv, bmiOff, bitsOff, cbBits);
  };
  var decodeBitBlt = function decodeBitBlt(dv, pos, size) {
    // BITBLT has similar BMI/Bits layout
    var offBmi = readUint(dv, pos + 80, 4);
    var cbBmi = readUint(dv, pos + 84, 4);
    var offBits = readUint(dv, pos + 88, 4);
    var cbBits = readUint(dv, pos + 92, 4);
    if (!offBmi || !offBits || !cbBmi || !cbBits) return null;
    if (pos + offBmi + cbBmi > dv.byteLength) return null;
    if (pos + offBits + cbBits > dv.byteLength) return null;
    var bmiOff = pos + offBmi;
    var bitsOff = pos + offBits;
    var bmp = decodeBitmap(dv, bmiOff, bitsOff, cbBits);
    if (!bmp) return null;
    // Destination size from record: cxDest/cyDest at offsets 96/100
    var cxDest = dv.getInt32(pos + 96, true);
    var cyDest = dv.getInt32(pos + 100, true);
    if (cxDest > 0 && cyDest > 0) {
      bmp.width = cxDest;
      bmp.height = cyDest;
    }
    return bmp;
  };
  var tryDecodeEmf = function tryDecodeEmf(buffer) {
    var dv = new DataView(buffer);
    if (dv.byteLength < 80) return null;
    // EMF header signature at offset 40 should be 0x464D4520 (' EMF')
    var signature = dv.getUint32(40, true);
    if (signature !== 0x464d4520) return null;
    var pos = 0;
    while (pos + 8 <= dv.byteLength) {
      var type = dv.getUint32(pos, true);
      var size = dv.getUint32(pos + 4, true);
      if (size < 8 || pos + size > dv.byteLength) break;
      if (type === EMR_STRETCHDIBITS) {
        var bmp = decodeStretchDibits(dv, pos, size);
        if (bmp) return bmp;
      } else if (type === EMR_BITBLT) {
        var _bmp = decodeBitBlt(dv, pos, size);
        if (_bmp) return _bmp;
      }
      pos += size;
    }
    return null;
  };
  var bitmapToSvg = function bitmapToSvg(bmp, label) {
    var width = bmp.width,
      height = bmp.height,
      pixels = bmp.pixels;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    if (!ctx) return placeholderSvg(label);
    var img = ctx.createImageData(width, height);
    img.data.set(pixels);
    ctx.putImageData(img, 0, 0);
    var dataUrl = canvas.toDataURL('image/png');
    return {
      width: width,
      height: height,
      svgText: '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '"><image href="' + dataUrl + '" width="' + width + '" height="' + height + '"/></svg>'
    };
  };
  var emfToSvg = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(input, label) {
      var blob, buffer, decoded, _t;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return ensureBlob(input);
          case 1:
            blob = _context4.v;
            _context4.n = 2;
            return blob.arrayBuffer();
          case 2:
            buffer = _context4.v;
            decoded = tryDecodeEmf(buffer);
            if (decoded) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2, placeholderSvg(label));
          case 3:
            return _context4.a(2, bitmapToSvg(decoded, label));
          case 4:
            _context4.p = 4;
            _t = _context4.v;
            console.warn('EMF conversion failed', _t);
            return _context4.a(2, placeholderSvg(label));
        }
      }, _callee4, null, [[0, 4]]);
    }));
    return function emfToSvg(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  // UMD-lite export
  var api = {
    emfToSvg: emfToSvg
  };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.EMFLiteConverter = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

/* === parsers/shape-parser.js === */
/**
 * Shape Parser Module
 * Handles parsing of shapes from PPTX slides
 */
var ShapeParser = /*#__PURE__*/function () {
  // 5.625 inches (16:9 ratio)

  /**
   * Create a ShapeParser
   * @param {BackgroundExtractor} backgroundExtractor - For color extraction
   * @param {Object} images - Map of image names to blob URLs
   * @param {ThemeExtractor} themeExtractor - For theme defaults
   */
  function ShapeParser(backgroundExtractor, images) {
    var themeExtractor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, ShapeParser);
    this.backgroundExtractor = backgroundExtractor;
    this.images = images;
    this.themeExtractor = themeExtractor;
  }

  /**
   * Extract shapes from slide document
   * @param {Document} doc - Parsed slide document
   * @param {Array} imageRels - Image relationships
   * @returns {Array} - Array of shape objects
   */
  return _createClass(ShapeParser, [{
    key: "extractShapes",
    value: function extractShapes(doc) {
      var imageRels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var shapes = [];

      // Get all shape elements (sp = shape)
      var spElements = doc.getElementsByTagName('p:sp');
      var _iterator8 = _createForOfIteratorHelper(spElements),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var sp = _step8.value;
          // Parse all shapes, including placeholders, so text inherits master/layout defaults
          var shape = this.parseShape(sp, imageRels);
          if (shape) {
            shapes.push(shape);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return shapes;
    }

    /**
     * Parse a single shape element
     * @param {Element} sp - Shape element
     * @param {Array} imageRels - Image relationships
     * @returns {Object|null} - Shape object or null
     */
  }, {
    key: "parseShape",
    value: function parseShape(sp) {
      var imageRels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var textDefaultsProvider = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var slideNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var shape = {
        type: 'rect',
        x: null,
        y: null,
        width: null,
        height: null,
        fill: null,
        stroke: null,
        strokeWidth: 1,
        rotation: 0,
        text: null,
        shadow: null,
        cornerRadius: null
      };
      var cNvPr = sp.getElementsByTagName('p:cNvPr')[0];
      var shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;

      // Capture placeholder metadata to resolve template defaults
      var nvSpPr = sp.getElementsByTagName('p:nvSpPr')[0];
      if (nvSpPr) {
        var nvPr = nvSpPr.getElementsByTagName('p:nvPr')[0];
        if (nvPr) {
          var ph = nvPr.getElementsByTagName('p:ph')[0];
          if (ph) {
            shape.isPlaceholder = true;
            shape.placeholderType = ph.getAttribute('type') || 'body';
            shape.placeholderIdx = ph.getAttribute('idx');
          }
        }
      }

      // Get shape properties
      var spPr = sp.getElementsByTagName('p:spPr')[0];
      if (!spPr) return null;

      // Get transform (position and size)
      var xfrm = spPr.getElementsByTagName('a:xfrm')[0];
      if (xfrm) {
        var off = xfrm.getElementsByTagName('a:off')[0];
        var ext = xfrm.getElementsByTagName('a:ext')[0];
        if (off) {
          // Convert EMUs to percentage of slide dimensions
          var xEMU = parseInt(off.getAttribute('x') || '0');
          var yEMU = parseInt(off.getAttribute('y') || '0');
          shape.xEMU = xEMU;
          shape.yEMU = yEMU;
          shape.x = xEMU / ShapeParser.SLIDE_WIDTH_EMU * 100;
          shape.y = yEMU / ShapeParser.SLIDE_HEIGHT_EMU * 100;
        }
        if (ext) {
          var cxEMU = parseInt(ext.getAttribute('cx') || '0');
          var cyEMU = parseInt(ext.getAttribute('cy') || '0');
          shape.cxEMU = cxEMU;
          shape.cyEMU = cyEMU;
          shape.width = cxEMU / ShapeParser.SLIDE_WIDTH_EMU * 100;
          shape.height = cyEMU / ShapeParser.SLIDE_HEIGHT_EMU * 100;
        }

        // Rotation (in 60,000ths of a degree)
        var rot = xfrm.getAttribute('rot');
        if (rot) {
          shape.rotation = parseInt(rot) / 60000;
        }
      }

      // Get shape geometry (preset or custom)
      var prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
      if (prstGeom) {
        var prst = prstGeom.getAttribute('prst');
        shape.type = this.mapShapeType(prst);
      }

      // Get custom geometry if present
      var custGeom = spPr.getElementsByTagName('a:custGeom')[0];
      if (custGeom) {
        shape.customGeometry = this.extractCustomGeometry(custGeom);
        if (shape.customGeometry) {
          shape.type = 'custom';
        }
      }

      // Get fill
      shape.fill = this.extractFill(spPr, imageRels);

      // If no fill, check for style reference from theme
      if (shape.fill === null) {
        shape.fill = this.extractStyleFill(sp);
      }

      // Get stroke/outline
      var ln = spPr.getElementsByTagName('a:ln')[0];
      if (ln) {
        var w = ln.getAttribute('w');
        if (w) {
          shape.strokeWidth = parseInt(w) / 914400 * 96; // EMUs to pixels
        }
        var lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
        var lnNoFill = ln.getElementsByTagName('a:noFill')[0];
        if (lnNoFill) {
          shape.stroke = 'none';
        } else if (lnSolidFill) {
          shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
        }
      }

      // If no stroke defined, check for style reference from theme
      if (shape.stroke === null) {
        shape.stroke = this.extractStyleStroke(sp);
      }

      // Get shadow effects
      shape.shadow = this.extractShadow(spPr);

      // Get shape geometry (corner radius for rounded shapes)
      shape.cornerRadius = this.extractCornerRadius(spPr);

      // Persist shape id for connector resolution
      if (shapeIdAttr) {
        var parsedId = parseInt(shapeIdAttr, 10);
        if (!Number.isNaN(parsedId)) {
          shape.shapeId = parsedId;
        }
      }

      // Get text inside shape
      var txBody = sp.getElementsByTagName('p:txBody')[0];
      if (txBody) {
        var level = this.getParagraphLevel(txBody);
        var placeholderType = shape.placeholderType || 'body';
        var textDefaults = textDefaultsProvider ? textDefaultsProvider(placeholderType, level, shape.placeholderIdx) : null;
        var textContent = this.extractShapeText(txBody, textDefaults, imageRels, slideNumber);
        if (textContent) {
          shape.text = textContent;
        }

        // Extract text body properties (vertical anchor, word wrap, etc.)
        var bodyPr = txBody.getElementsByTagName('a:bodyPr')[0];
        if (bodyPr) {
          var anchor = bodyPr.getAttribute('anchor');
          // Only set when present; otherwise allow layout/master inheritance
          if (anchor === 'b') {
            shape.textVAlign = 'bottom';
          } else if (anchor === 'ctr') {
            shape.textVAlign = 'middle';
          } else if (anchor === 't') {
            shape.textVAlign = 'top';
          }

          // Check for word wrap (only set when explicitly defined)
          if (bodyPr.hasAttribute('wrap')) {
            var wrap = bodyPr.getAttribute('wrap');
            shape.textWrap = wrap !== 'none';
          }

          // Auto-fit: a:normAutofit shrinks text to fit box in PPT; we mark it for renderer handling
          if (bodyPr.getElementsByTagName('a:normAutofit')[0]) {
            shape.textAutoFit = 'norm';
          } else if (bodyPr.getElementsByTagName('a:noAutofit')[0]) {
            shape.textAutoFit = 'none';
          }

          // Extract text insets (padding from shape edges)
          // PowerPoint default insets: 0.1" (~91440 EMU) on all sides
          // Store as percentages relative to the shape's own dimensions
          var lIns = bodyPr.getAttribute('lIns');
          var rIns = bodyPr.getAttribute('rIns');
          var tIns = bodyPr.getAttribute('tIns');
          var bIns = bodyPr.getAttribute('bIns');

          // Default PowerPoint insets are 0.1 inches = 91440 EMU
          var defaultInsetEMU = 91440;
          var lInsEMU = lIns ? parseInt(lIns, 10) : defaultInsetEMU;
          var rInsEMU = rIns ? parseInt(rIns, 10) : defaultInsetEMU;
          var tInsEMU = tIns ? parseInt(tIns, 10) : defaultInsetEMU;
          var bInsEMU = bIns ? parseInt(bIns, 10) : defaultInsetEMU;

          // Store insets as percentage of slide dimensions for scaling
          // These will be converted to shape-relative percentages in the renderer
          shape.textInsetsEMU = {
            left: lInsEMU,
            right: rInsEMU,
            top: tInsEMU,
            bottom: bInsEMU
          };
        }
      }
      return shape;
    }

    /**
     * Extract fill from shape properties
     * @param {Element} spPr - Shape properties element
     * @param {Array} imageRels - Image relationships
     * @returns {string|Object|null} - Fill value
     */
  }, {
    key: "extractFill",
    value: function extractFill(spPr, imageRels) {
      var _this2 = this;
      var solidFill = spPr.getElementsByTagName('a:solidFill')[0];
      var gradFill = spPr.getElementsByTagName('a:gradFill')[0];
      var blipFill = spPr.getElementsByTagName('a:blipFill')[0];
      var noFill = spPr.getElementsByTagName('a:noFill')[0];
      if (noFill) {
        return 'none';
      } else if (solidFill) {
        // Extract color with opacity
        var colorWithOpacity = this.backgroundExtractor.extractColorWithOpacity(solidFill);
        if (colorWithOpacity) {
          // If opacity is less than 1, return object with color and opacity
          if (colorWithOpacity.opacity < 1) {
            return {
              type: 'solid',
              color: colorWithOpacity.color,
              opacity: colorWithOpacity.opacity
            };
          }
          // Otherwise just return the color string for backward compatibility
          return colorWithOpacity.color;
        }
        return null;
      } else if (gradFill) {
        return {
          type: 'gradient',
          gradient: this.backgroundExtractor.extractGradient(gradFill)
        };
      } else if (blipFill) {
        var blip = blipFill.getElementsByTagName('a:blip')[0];
        if (blip) {
          var svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
          var svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
          var pngId = blip.getAttribute('r:embed');
          var resolveEmbed = function resolveEmbed(embedId) {
            if (!embedId) return null;
            var rel = imageRels.find(function (r) {
              return r.id === embedId;
            });
            if (rel) {
              var imageName = rel.target.split('/').pop();
              if (_this2.images[imageName]) return _this2.images[imageName];
            }
            return null;
          };

          // Prefer SVG when present, else fallback to bitmap
          var svgUrl = resolveEmbed(svgId);
          var pngUrl = resolveEmbed(pngId);
          var chosen = svgUrl || pngUrl;
          if (chosen) {
            return {
              type: 'image',
              src: chosen
            };
          }
        }
      }
      return null;
    }

    /**
     * Extract fill color from style reference (p:style/a:fillRef)
     * @param {Element} sp - Shape element
     * @returns {string|null} - Fill color or null
     */
  }, {
    key: "extractStyleFill",
    value: function extractStyleFill(sp) {
      var style = sp.getElementsByTagName('p:style')[0];
      if (!style) return null;
      var fillRef = style.getElementsByTagName('a:fillRef')[0];
      if (!fillRef) return null;

      // fillRef can have idx attribute that points to theme fill matrix
      // and can contain a color element that modifies the theme color
      var idx = parseInt(fillRef.getAttribute('idx') || '0', 10);

      // First check for embedded color
      var color = this.backgroundExtractor.extractColor(fillRef);
      if (color) return color;

      // Try to get accent color from theme (idx 1-6 typically map to accent colors)
      if (idx > 0 && idx <= 6 && this.themeExtractor) {
        var accentColor = this.themeExtractor.getAccentColor(idx);
        if (accentColor) {
          return accentColor;
        }
      }

      // Fall back to theme format scheme fill style list (a:fmtScheme/a:fillStyleLst)
      // This is common for placeholders and theme-defined shapes.
      // idx can be 0 (first fill in list) or higher indices
      if (this.themeExtractor && typeof this.themeExtractor.getFillStyleNode === 'function') {
        var fillNode = this.themeExtractor.getFillStyleNode(idx);
        if (fillNode) {
          var tag = fillNode.tagName;
          if (tag === 'a:solidFill') {
            return this.backgroundExtractor.extractColor(fillNode);
          }
          if (tag === 'a:gradFill') {
            return {
              type: 'gradient',
              gradient: this.backgroundExtractor.extractGradient(fillNode)
            };
          }
          if (tag === 'a:pattFill') {
            // Prefer fgClr, fall back to bgClr
            var fg = fillNode.getElementsByTagName('a:fgClr')[0];
            var bg = fillNode.getElementsByTagName('a:bgClr')[0];
            return this.backgroundExtractor.extractColor(fg) || this.backgroundExtractor.extractColor(bg);
          }
          if (tag === 'a:blipFill') {
            var blip = fillNode.getElementsByTagName('a:blip')[0];
            var embedId = blip ? blip.getAttribute('r:embed') : null;
            if (embedId && this.themeExtractor && typeof this.themeExtractor.resolveThemeImageUrl === 'function') {
              var src = this.themeExtractor.resolveThemeImageUrl(embedId, this.images);
              if (src) {
                return {
                  type: 'image',
                  src: src
                };
              }
            }
          }
        }
      }
      return null;
    }

    /**
     * Extract stroke color from style reference (p:style/a:lnRef)
     * @param {Element} sp - Shape element
     * @returns {string|null} - Stroke color or null
     */
  }, {
    key: "extractStyleStroke",
    value: function extractStyleStroke(sp) {
      var style = sp.getElementsByTagName('p:style')[0];
      if (!style) return null;
      var lnRef = style.getElementsByTagName('a:lnRef')[0];
      if (!lnRef) return null;

      // Check for embedded color
      var color = this.backgroundExtractor.extractColor(lnRef);
      if (color) return color;

      // If idx > 0, try to get accent color from theme
      var idx = parseInt(lnRef.getAttribute('idx') || '0', 10);
      if (idx > 0 && idx <= 6 && this.themeExtractor) {
        return this.themeExtractor.getAccentColor(idx);
      }
      return null;
    }

    /**
     * Extract shadow effects from shape properties
     * Supports outerShdw (outer shadow) effects
     * @param {Element} spPr - Shape properties element
     * @returns {Object|null} - Shadow object with blur, distance, direction, color, opacity
     */
  }, {
    key: "extractShadow",
    value: function extractShadow(spPr) {
      // Check for effect list in shape properties
      var effectLst = spPr.getElementsByTagName('a:effectLst')[0];
      if (!effectLst) return null;

      // Look for outer shadow
      var outerShdw = effectLst.getElementsByTagName('a:outerShdw')[0];
      if (!outerShdw) return null;
      var shadow = {};

      // Blur radius in EMUs (1 EMU = 1/914400 inch)
      var blurRad = outerShdw.getAttribute('blurRad');
      if (blurRad) {
        // Convert EMU to pixels (assuming 96 DPI)
        var blurRadEMU = parseInt(blurRad);
        shadow.blur = blurRadEMU / 914400 * 96;
      }

      // Distance (offset) in EMUs
      var dist = outerShdw.getAttribute('dist');
      if (dist) {
        var distEMU = parseInt(dist);
        shadow.distance = distEMU / 914400 * 96;
      }

      // Direction in 60000ths of a degree
      var dir = outerShdw.getAttribute('dir');
      if (dir) {
        shadow.angle = parseInt(dir) / 60000;
      }

      // Extract shadow color
      var srgbClr = outerShdw.getElementsByTagName('a:srgbClr')[0];
      var schemeClr = outerShdw.getElementsByTagName('a:schemeClr')[0];
      if (srgbClr) {
        shadow.color = '#' + srgbClr.getAttribute('val');
      } else if (schemeClr) {
        var schemeColorName = schemeClr.getAttribute('val');
        if (this.themeExtractor) {
          shadow.color = this.themeExtractor.getSchemeColor(schemeColorName) || '#000000';
        } else {
          shadow.color = '#000000';
        }
      } else {
        shadow.color = '#000000';
      }

      // Extract opacity (alpha)
      var alpha = outerShdw.getElementsByTagName('a:alpha')[0];
      if (alpha) {
        var alphaVal = parseInt(alpha.getAttribute('val') || '100000');
        shadow.opacity = alphaVal / 100000;
      } else {
        shadow.opacity = 1;
      }
      return Object.keys(shadow).length > 0 ? shadow : null;
    }

    /**
     * Extract corner radius from shape geometry
     * Handles preset rounded rectangles with adjustments
     * @param {Element} spPr - Shape properties element
     * @returns {number|null} - Corner radius as percentage (0-50), or null
     */
  }, {
    key: "extractCornerRadius",
    value: function extractCornerRadius(spPr) {
      var prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
      if (!prstGeom) return null;
      var prst = prstGeom.getAttribute('prst');
      if (!prst) return null;

      // Presets that have rounded corners
      var roundedShapes = {
        'roundRect': 0.05,
        // Standard rounded rectangle - 5%
        'roundSquare': 0.05,
        // Standard rounded square - 5%
        'round2SameRect': 0.10,
        // round2SameRect (used in slideLayout3) - 10%
        'round1Rect': 0.03,
        // Slightly rounded - 3%
        'round2Rect': 0.10 // More rounded - 10%
      };
      if (!roundedShapes[prst]) return null;

      // Check for adjustment list (adjLst) to override default
      var adjLst = prstGeom.getElementsByTagName('a:adjLst')[0];
      if (adjLst) {
        var adj = adjLst.getElementsByTagName('a:adj')[0];
        if (adj) {
          var val = adj.getAttribute('val');
          if (val) {
            // Adjustment is typically 0-100000 (percentage * 1000)
            var adjVal = parseInt(val);
            // Convert to percentage (0-1 range)
            return adjVal / 100000 * 0.5; // Cap at 50%
          }
        }
      }

      // Return default for the shape type
      return roundedShapes[prst];
    }

    /**
     * Map PowerPoint shape preset to shape types
     * @param {string} prst - Preset shape name
     * @returns {string} - Mapped shape type
     */
  }, {
    key: "mapShapeType",
    value: function mapShapeType(prst) {
      var shapeMap = {
        'rect': 'rect',
        'square': 'square',
        'roundRect': 'roundRect',
        'roundSquare': 'roundSquare',
        'ellipse': 'ellipse',
        'circle': 'circle',
        'triangle': 'triangle',
        'isoscelesTriangle': 'triangle',
        'rtTriangle': 'rightTriangle',
        'parallelogram': 'parallelogram',
        'trapezoid': 'trapezoid',
        'diamond': 'diamond',
        'pentagon': 'pentagon',
        'hexagon': 'hexagon',
        'heptagon': 'heptagon',
        'octagon': 'octagon',
        'star4': 'star4',
        'star5': 'star5',
        'star6': 'star6',
        'arrow': 'arrow',
        'rightArrow': 'rightArrow',
        'leftArrow': 'leftArrow',
        'upArrow': 'upArrow',
        'downArrow': 'downArrow',
        'heart': 'heart',
        'lightningBolt': 'lightning',
        'sun': 'sun',
        'moon': 'moon',
        'cloud': 'cloud',
        'line': 'line',
        'straightConnector1': 'line',
        // Callout/Speech bubble shapes
        'speechBubble': 'speechBubble',
        'speechBubbleOval': 'speechBubbleOval',
        'calloutRectangle': 'calloutRect',
        'calloutRoundRect': 'calloutRoundRect',
        'calloutOval': 'calloutOval',
        // Flowchart shapes (basic)
        'flowChartProcess': 'flowChartProcess',
        'flowChartDecision': 'flowChartDecision',
        'flowChartInputOutput': 'flowChartInputOutput',
        'flowChartTerminator': 'flowChartTerminator',
        'flowChartData': 'flowChartData',
        'flowChartDocument': 'flowChartDocument',
        'flowChartMultidocument': 'flowChartMultidocument',
        'flowChartPredefinedProcess': 'flowChartPredefinedProcess',
        'flowChartOffPageConnector': 'flowChartOffPage',
        'flowChartMerge': 'flowChartMerge',
        'flowChartExtract': 'flowChartExtract',
        'flowChartOr': 'flowChartOr',
        'flowChartSum': 'flowChartSum',
        'flowChartSort': 'flowChartSort',
        'flowChartManualInput': 'flowChartManualInput',
        'flowChartDelay': 'flowChartDelay',
        // 3D shapes
        'cube': 'cube',
        'cylinder': 'cylinder',
        'sphere': 'sphere',
        'cone': 'cone',
        'pyramid': 'pyramid',
        'tetrahedron': 'tetrahedron',
        'octahedron': 'octahedron',
        // Block arrows
        'blockArcRight': 'blockArcRight',
        'blockArcLeft': 'blockArcLeft',
        'blockArcUp': 'blockArcUp',
        'blockArcDown': 'blockArcDown',
        // Additional arrows
        'quadArrow': 'quadArrow',
        'leftRightArrow': 'leftRightArrow',
        'upDownArrow': 'upDownArrow',
        'ribbon': 'ribbon',
        'ribbon2': 'ribbon2',
        'doubleWave': 'doubleWave',
        'chevron': 'chevron',
        'chevronRight': 'chevronRight',
        'curvedUpArrow': 'curvedUpArrow',
        'curvedDownArrow': 'curvedDownArrow',
        'curvedLeftArrow': 'curvedLeftArrow',
        'curvedRightArrow': 'curvedRightArrow',
        'actionButtonHome': 'actionHome',
        'actionButtonHelp': 'actionHelp',
        'actionButtonInformation': 'actionInfo',
        'actionButtonSound': 'actionSound',
        'actionButtonMovie': 'actionMovie',
        'actionButtonDocument': 'actionDocument',
        'actionButtonReturn': 'actionReturn',
        'actionButtonForward': 'actionForward',
        'explosion1': 'explosion16',
        'explosion2': 'explosion32',
        'star7': 'star7',
        'star8': 'star8',
        'star10': 'star10',
        'star12': 'star12',
        'star16': 'star16',
        'star24': 'star24',
        'star32': 'star32'
      };
      var mapped = shapeMap[prst];
      if (!mapped) {
        console.warn("[PPTX] Unmapped preset shape '".concat(prst, "', defaulting to rect"));
      }
      return mapped || 'rect';
    }

    /**
     * Extract text from shape body
     * @param {Element} txBody - Text body element
     * @param {Object} textDefaults - Optional default formatting from master text styles
     * @returns {Array|null} - Array of text parts or null
     */
  }, {
    key: "extractShapeText",
    value: function extractShapeText(txBody) {
      var textDefaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var rels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var slideNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var paragraphs = txBody.getElementsByTagName('a:p');
      var textParts = [];
      var BASE_FONT_SIZE_PT = 18;
      var EMU_PER_POINT = 12700;
      var PERCENT_DENOM = 100000;

      // Get default text color and font from theme (base level)
      var themeColor = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
      var themeFont = this.themeExtractor ? this.themeExtractor.getBodyFont() : 'Calibri';

      // Use text defaults from master if provided (override theme defaults)
      var defaultColor = (textDefaults === null || textDefaults === void 0 ? void 0 : textDefaults.color) || themeColor;
      var defaultFont = (textDefaults === null || textDefaults === void 0 ? void 0 : textDefaults.fontFamily) || themeFont;
      var defaultFontSize = (textDefaults === null || textDefaults === void 0 ? void 0 : textDefaults.fontSize) || null;
      var defaultBold = (textDefaults === null || textDefaults === void 0 ? void 0 : textDefaults.bold) || false;
      var defaultItalic = (textDefaults === null || textDefaults === void 0 ? void 0 : textDefaults.italic) || false;
      var defaultAlign = (textDefaults === null || textDefaults === void 0 ? void 0 : textDefaults.align) || 'left';
      var _iterator9 = _createForOfIteratorHelper(paragraphs),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var para = _step9.value;
          // Get paragraph alignment
          var pPr = para.getElementsByTagName('a:pPr')[0];
          var align = defaultAlign;
          var paraFontSize = defaultFontSize;
          var paraColor = null;
          var paraFontFamily = null;
          var spaceBeforeEm = null;
          var spaceAfterEm = null;
          var lineHeight = null;

          // Bullet / list metadata
          var lvl = 0; // 0-based
          var bullet = null; // { type: 'none' | 'char' | 'auto', ... }
          var marLEm = null;
          var indentEm = null;
          if (pPr) {
            var algn = pPr.getAttribute('algn');
            if (algn === 'ctr') align = 'center';else if (algn === 'r') align = 'right';else if (algn === 'just') align = 'justify';else if (algn === 'l') align = 'left';
            var lvlAttr = pPr.getAttribute('lvl');
            if (lvlAttr !== null) {
              var parsed = parseInt(lvlAttr, 10);
              if (!Number.isNaN(parsed)) lvl = Math.max(0, parsed);
            }
            var marLAttr = pPr.getAttribute('marL');
            if (marLAttr !== null) {
              var marL = parseInt(marLAttr, 10);
              if (!Number.isNaN(marL)) {
                marLEm = marL / EMU_PER_POINT / BASE_FONT_SIZE_PT;
              }
            }
            var indentAttr = pPr.getAttribute('indent');
            if (indentAttr !== null) {
              var indent = parseInt(indentAttr, 10);
              if (!Number.isNaN(indent)) {
                indentEm = indent / EMU_PER_POINT / BASE_FONT_SIZE_PT;
              }
            }
            var buNone = pPr.getElementsByTagName('a:buNone')[0];
            if (buNone) {
              bullet = {
                type: 'none'
              };
            } else {
              var buAutoNum = pPr.getElementsByTagName('a:buAutoNum')[0];
              var buChar = pPr.getElementsByTagName('a:buChar')[0];
              if (buAutoNum) {
                bullet = {
                  type: 'auto',
                  numType: buAutoNum.getAttribute('type') || null,
                  startAt: buAutoNum.getAttribute('startAt') ? parseInt(buAutoNum.getAttribute('startAt'), 10) : null
                };
              } else if (buChar) {
                bullet = {
                  type: 'char',
                  char: buChar.getAttribute('char') || '•'
                };
              } else if (lvlAttr !== null) {
                // Common case: bullets defined by master style; lvl is still present.
                bullet = {
                  type: 'char',
                  char: '•',
                  inferred: true
                };
              }
            }

            // Check for paragraph-level default run properties
            var defRPr = pPr.getElementsByTagName('a:defRPr')[0];
            if (defRPr) {
              var sz = defRPr.getAttribute('sz');
              if (sz) paraFontSize = parseInt(sz) / 100;
              var solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
              paraColor = this.backgroundExtractor.extractColor(solidFill);
              var latin = defRPr.getElementsByTagName('a:latin')[0];
              if (latin) {
                var typeface = latin.getAttribute('typeface');
                if (typeface) {
                  if (typeface === '+mj-lt' && this.themeExtractor) {
                    paraFontFamily = this.themeExtractor.getTitleFont();
                  } else if (typeface === '+mn-lt' && this.themeExtractor) {
                    paraFontFamily = this.themeExtractor.getBodyFont();
                  } else if (!typeface.startsWith('+')) {
                    paraFontFamily = typeface;
                  }
                }
              }
            }

            // Spacing (before/after/line)
            var parseSpacing = function parseSpacing(node) {
              if (!node) return null;
              var spcPts = node.getElementsByTagName('a:spcPts')[0];
              if (spcPts) {
                var val = parseInt(spcPts.getAttribute('val') || '0', 10);
                if (!Number.isNaN(val)) return val / 1000 / BASE_FONT_SIZE_PT;
              }
              var spcPct = node.getElementsByTagName('a:spcPct')[0];
              if (spcPct) {
                var _val5 = parseInt(spcPct.getAttribute('val') || '0', 10);
                if (!Number.isNaN(_val5)) return _val5 / PERCENT_DENOM;
              }
              return null;
            };
            spaceBeforeEm = parseSpacing(pPr.getElementsByTagName('a:spcBef')[0]);
            spaceAfterEm = parseSpacing(pPr.getElementsByTagName('a:spcAft')[0]);
            var lnSpc = pPr.getElementsByTagName('a:lnSpc')[0];
            if (lnSpc) {
              var spcPts = lnSpc.getElementsByTagName('a:spcPts')[0];
              if (spcPts) {
                var val = parseInt(spcPts.getAttribute('val') || '0', 10);
                if (!Number.isNaN(val)) lineHeight = val / 1000 / BASE_FONT_SIZE_PT;
              }
              var spcPct = lnSpc.getElementsByTagName('a:spcPct')[0];
              if (spcPct) {
                var _val6 = parseInt(spcPct.getAttribute('val') || '0', 10);
                if (!Number.isNaN(_val6)) lineHeight = _val6 / PERCENT_DENOM;
              }
            }
          }
          var paraText = [];
          var runNodes = Array.from(para.childNodes).filter(function (n) {
            return n && n.nodeType === 1 && (n.tagName === 'a:r' || n.tagName === 'a:fld');
          });
          var _iterator0 = _createForOfIteratorHelper(runNodes),
            _step0;
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
              var run = _step0.value;
              var isField = run.tagName === 'a:fld';
              var textEl = run.getElementsByTagName('a:t')[0];
              var runText = textEl ? textEl.textContent : '';
              if (isField) {
                var fieldType = (run.getAttribute('type') || '').toLowerCase();
                if (fieldType.includes('slidenum') && slideNumber !== null && slideNumber !== undefined) {
                  runText = String(slideNumber);
                }
              }
              if (runText) {
                var rPr = run.getElementsByTagName('a:rPr')[0];
                var color = null;
                var hasExplicitColor = false;
                var fontSize = null;
                var fontFamily = null;
                var bold = defaultBold;
                var italic = defaultItalic;
                var underline = false;
                var strikethrough = false;
                var superscript = false;
                var subscript = false;
                var textTransform = 'none';
                var highlight = null;
                var shadow = null;
                var link = null;
                if (rPr) {
                  var _solidFill = rPr.getElementsByTagName('a:solidFill')[0];
                  color = this.backgroundExtractor.extractColor(_solidFill);
                  hasExplicitColor = !!color;
                  var _sz = rPr.getAttribute('sz');
                  if (_sz) {
                    fontSize = parseInt(_sz) / 100;
                  }

                  // Get font family
                  var _latin2 = rPr.getElementsByTagName('a:latin')[0];
                  if (_latin2) {
                    var _typeface3 = _latin2.getAttribute('typeface');
                    if (_typeface3) {
                      if (_typeface3 === '+mj-lt' && this.themeExtractor) {
                        fontFamily = this.themeExtractor.getTitleFont();
                      } else if (_typeface3 === '+mn-lt' && this.themeExtractor) {
                        fontFamily = this.themeExtractor.getBodyFont();
                      } else if (!_typeface3.startsWith('+')) {
                        fontFamily = _typeface3;
                      }
                    }
                  }

                  // Bold/italic - only override if explicitly set
                  if (rPr.hasAttribute('b')) bold = rPr.getAttribute('b') === '1';
                  if (rPr.hasAttribute('i')) italic = rPr.getAttribute('i') === '1';
                  underline = rPr.getAttribute('u') && rPr.getAttribute('u') !== 'none';
                  strikethrough = rPr.getAttribute('strike') && rPr.getAttribute('strike') !== 'noStrike';

                  // Superscript/subscript based on baseline offset
                  var baseline = rPr.getAttribute('baseline');
                  if (baseline) {
                    var _val7 = parseInt(baseline, 10);
                    if (!Number.isNaN(_val7)) {
                      superscript = _val7 > 0;
                      subscript = _val7 < 0;
                    }
                  }
                  var cap = rPr.getAttribute('cap');
                  if (cap === 'small') textTransform = 'small-caps';else if (cap === 'all') textTransform = 'uppercase';
                  var highlightFill = rPr.getElementsByTagName('a:highlight')[0];
                  if (highlightFill) {
                    highlight = this.backgroundExtractor.extractColor(highlightFill) || '#ffff00';
                  }
                  var outerShdw = rPr.getElementsByTagName('a:outerShdw')[0];
                  if (outerShdw) {
                    var dist = parseInt(outerShdw.getAttribute('dist') || '0', 10);
                    var dir = parseInt(outerShdw.getAttribute('dir') || '2700000', 10);
                    var blur = parseInt(outerShdw.getAttribute('blur') || '0', 10);
                    var rad = dir * Math.PI / 10800000;
                    var offsetX = dist / EMU_PER_POINT * Math.cos(rad);
                    var offsetY = dist / EMU_PER_POINT * Math.sin(rad);
                    var colorEl = outerShdw.getElementsByTagName('a:srgbClr')[0];
                    var colorVal = colorEl ? colorEl.getAttribute('val') : '000000';
                    var alphaEl = outerShdw.getElementsByTagName('a:alpha')[0];
                    var alpha = alphaEl ? parseInt(alphaEl.getAttribute('val') || '100000', 10) / 100000 : 1;
                    shadow = {
                      offsetX: offsetX,
                      offsetY: offsetY,
                      blur: blur / EMU_PER_POINT,
                      color: "#".concat(colorVal),
                      opacity: alpha
                    };
                  }

                  // Hyperlink (run-level)
                  var hlinkClick = rPr.getElementsByTagName('a:hlinkClick')[0];
                  if (hlinkClick) {
                    var relId = hlinkClick.getAttribute('r:id') || hlinkClick.getAttribute('id');
                    if (relId && Array.isArray(rels)) {
                      link = this.resolveHyperlink(rels, relId);
                    }
                  }
                }

                // Apply inheritance: run -> paragraph -> master -> theme
                // Font size: run > paragraph > master default
                if (!fontSize) {
                  fontSize = paraFontSize || defaultFontSize;
                }

                // Color: run > paragraph > master default > theme
                if (!color) {
                  color = paraColor || defaultColor;
                }

                // Hyperlink default color (only when no explicit run color)
                if (link && !hasExplicitColor && !paraColor && this.themeExtractor) {
                  color = this.themeExtractor.getHyperlinkColor();
                }

                // Font family: run > paragraph > master default > theme
                if (!fontFamily) {
                  fontFamily = paraFontFamily || defaultFont;
                }
                paraText.push({
                  text: runText,
                  color: color,
                  fontSize: fontSize,
                  fontFamily: fontFamily,
                  bold: bold,
                  italic: italic,
                  underline: underline,
                  strikethrough: strikethrough,
                  superscript: superscript,
                  subscript: subscript,
                  textTransform: textTransform,
                  highlight: highlight,
                  shadow: shadow,
                  link: link,
                  align: align
                });
              }
            }

            // Direct text without runs
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
          if (paraText.length === 0) {
            var directTexts = para.getElementsByTagName('a:t');
            var _iterator1 = _createForOfIteratorHelper(directTexts),
              _step1;
            try {
              for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
                var t = _step1.value;
                var txt = t === null || t === void 0 ? void 0 : t.textContent;
                if (txt && txt.trim()) {
                  paraText.push({
                    text: txt,
                    color: paraColor || defaultColor,
                    fontSize: paraFontSize || defaultFontSize,
                    fontFamily: paraFontFamily || defaultFont,
                    bold: defaultBold,
                    italic: defaultItalic,
                    underline: false,
                    strikethrough: false,
                    superscript: false,
                    subscript: false,
                    textTransform: 'none',
                    highlight: null,
                    shadow: null,
                    link: null,
                    align: align
                  });
                }
              }
            } catch (err) {
              _iterator1.e(err);
            } finally {
              _iterator1.f();
            }
          }
          if (paraText.length > 0) {
            // If paragraph lacked explicit marL/indent, fall back to master/layout defaults
            if (marLEm === null && textDefaults && typeof textDefaults.marLEm === 'number') {
              marLEm = textDefaults.marLEm;
            }
            if (indentEm === null && textDefaults && typeof textDefaults.indentEm === 'number') {
              indentEm = textDefaults.indentEm;
            }
            if (spaceBeforeEm === null && textDefaults && typeof textDefaults.spaceBeforeEm === 'number') {
              spaceBeforeEm = textDefaults.spaceBeforeEm;
            }
            if (spaceAfterEm === null && textDefaults && typeof textDefaults.spaceAfterEm === 'number') {
              spaceAfterEm = textDefaults.spaceAfterEm;
            }
            if (lineHeight === null && textDefaults && typeof textDefaults.lineHeight === 'number') {
              lineHeight = textDefaults.lineHeight;
            }
            // Attach paragraph metadata to the first run for renderer consumption
            paraText[0].lvl = lvl;
            if (bullet) paraText[0].bullet = bullet;
            if (typeof marLEm === 'number') paraText[0].marLEm = marLEm;
            if (typeof indentEm === 'number') paraText[0].indentEm = indentEm;
            if (typeof spaceBeforeEm === 'number') paraText[0].spaceBeforeEm = spaceBeforeEm;
            if (typeof spaceAfterEm === 'number') paraText[0].spaceAfterEm = spaceAfterEm;
            if (typeof lineHeight === 'number') paraText[0].lineHeight = lineHeight;
            textParts.push(paraText);
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return textParts.length > 0 ? textParts : null;
    }

    /**
     * Resolve a run hyperlink relationship id into a usable link object.
     * Supports external hyperlinks and simple internal slide targets.
     */
  }, {
    key: "resolveHyperlink",
    value: function resolveHyperlink(rels, relId) {
      if (!Array.isArray(rels) || !relId) return null;
      var rel = rels.find(function (r) {
        return r && r.getAttribute && r.getAttribute('Id') === relId;
      });
      if (!rel) return null;
      var target = rel.getAttribute('Target') || '';
      var targetMode = (rel.getAttribute('TargetMode') || '').toLowerCase();
      var isExternal = targetMode === 'external' || /^https?:\/\//i.test(target) || /^mailto:/i.test(target);
      if (isExternal) {
        return {
          kind: 'url',
          href: target
        };
      }

      // Internal slide link heuristics (e.g. slides/slide2.xml)
      var m = target.match(/slide(\d+)\.xml$/i);
      if (m) {
        var slideIndex = Math.max(0, parseInt(m[1], 10) - 1);
        return {
          kind: 'slide',
          slideIndex: slideIndex
        };
      }
      return {
        kind: 'internal',
        target: target
      };
    }

    /**
     * Infer text level for placeholder defaults (PowerPoint levels are 0-based)
     * @param {Element} txBody - Text body element
     * @returns {number} - Paragraph level (1-9)
     */
  }, {
    key: "getParagraphLevel",
    value: function getParagraphLevel(txBody) {
      var firstPara = txBody.getElementsByTagName('a:p')[0];
      if (firstPara) {
        var pPr = firstPara.getElementsByTagName('a:pPr')[0];
        if (pPr) {
          var lvlAttr = pPr.getAttribute('lvl');
          var lvl = lvlAttr !== null ? parseInt(lvlAttr, 10) : NaN;
          if (!Number.isNaN(lvl)) {
            return Math.min(9, Math.max(1, lvl + 1));
          }
        }
      }
      return 1;
    }

    /**
     * Extract custom geometry from custGeom element
     * Converts PowerPoint custom geometry paths to SVG format
     * @param {Element} custGeom - Custom geometry element
     * @returns {Object|null} - Custom geometry object with SVG path data
     */
  }, {
    key: "extractCustomGeometry",
    value: function extractCustomGeometry(custGeom) {
      if (!custGeom) return null;
      var geometry = {
        paths: [],
        bounds: {
          x: 0,
          y: 0,
          w: 21600,
          h: 21600
        },
        guides: []
      };

      // Extract shape bounds (in EMU units, typically 0-21600)
      var bbox = custGeom.getAttribute('bbox');
      if (bbox) {
        var parts = bbox.split(' ');
        if (parts.length === 4) {
          geometry.bounds = {
            x: parseInt(parts[0]),
            y: parseInt(parts[1]),
            w: parseInt(parts[2]),
            h: parseInt(parts[3])
          };
        }
      }

      // Extract guide lines (for adjustments)
      var gdLst = custGeom.getElementsByTagName('a:gdLst')[0];
      if (gdLst) {
        var guides = gdLst.getElementsByTagName('a:gd');
        var _iterator10 = _createForOfIteratorHelper(guides),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var gd = _step10.value;
            var name = gd.getAttribute('name');
            var fmla = gd.getAttribute('fmla');
            geometry.guides.push({
              name: name,
              fmla: fmla
            });
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }

      // Extract paths (actual shape outline)
      var pathLst = custGeom.getElementsByTagName('a:pathLst')[0];
      if (pathLst) {
        var paths = pathLst.getElementsByTagName('a:path');
        var _iterator11 = _createForOfIteratorHelper(paths),
          _step11;
        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var path = _step11.value;
            var w = parseInt(path.getAttribute('w') || geometry.bounds.w);
            var h = parseInt(path.getAttribute('h') || geometry.bounds.h);
            var fill = path.getAttribute('fill') || 'norm';
            var stroke = path.getAttribute('stroke') !== 'false';

            // Extract path data from moveTo, lnTo, cubicBezTo, etc.
            var pathData = this.extractPathData(path, w, h);
            geometry.paths.push({
              data: pathData,
              w: w,
              h: h,
              fill: fill,
              stroke: stroke
            });
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      }
      return geometry.paths.length > 0 ? geometry : null;
    }

    /**
     * Extract path data from custom geometry path element
     * Converts a:moveTo, a:lnTo, a:cubicBezTo, a:arcTo to SVG path commands
     * @param {Element} pathElement - Path element
     * @param {number} width - Path width
     * @param {number} height - Path height
     * @returns {string} - SVG path data string
     */
  }, {
    key: "extractPathData",
    value: function extractPathData(pathElement, width, height) {
      var commands = [];
      var childNodes = Array.from(pathElement.childNodes).filter(function (n) {
        return n.nodeType === 1;
      }); // Element nodes only
      var _iterator12 = _createForOfIteratorHelper(childNodes),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var child = _step12.value;
          var tag = child.tagName;
          if (tag === 'a:moveTo') {
            var pt = child.getElementsByTagName('a:pt')[0];
            if (pt) {
              var x = parseInt(pt.getAttribute('x') || '0') / width * 100;
              var y = parseInt(pt.getAttribute('y') || '0') / height * 100;
              commands.push("M ".concat(x, " ").concat(y));
            }
          } else if (tag === 'a:lnTo') {
            var _pt = child.getElementsByTagName('a:pt')[0];
            if (_pt) {
              var _x7 = parseInt(_pt.getAttribute('x') || '0') / width * 100;
              var _y = parseInt(_pt.getAttribute('y') || '0') / height * 100;
              commands.push("L ".concat(_x7, " ").concat(_y));
            }
          } else if (tag === 'a:cubicBezTo') {
            var pts = child.getElementsByTagName('a:pt');
            if (pts.length >= 3) {
              var x1 = parseInt(pts[0].getAttribute('x') || '0') / width * 100;
              var y1 = parseInt(pts[0].getAttribute('y') || '0') / height * 100;
              var x2 = parseInt(pts[1].getAttribute('x') || '0') / width * 100;
              var y2 = parseInt(pts[1].getAttribute('y') || '0') / height * 100;
              var _x8 = parseInt(pts[2].getAttribute('x') || '0') / width * 100;
              var _y2 = parseInt(pts[2].getAttribute('y') || '0') / height * 100;
              commands.push("C ".concat(x1, " ").concat(y1, " ").concat(x2, " ").concat(y2, " ").concat(_x8, " ").concat(_y2));
            }
          } else if (tag === 'a:arcTo') {
            // Arc to - for now, approximate with line
            // Full implementation would need rx, ry, xAxisRotation, largeArc, sweep
            var _pt2 = child.getElementsByTagName('a:pt')[0];
            if (_pt2) {
              var _x9 = parseInt(_pt2.getAttribute('x') || '0') / width * 100;
              var _y3 = parseInt(_pt2.getAttribute('y') || '0') / height * 100;
              commands.push("L ".concat(_x9, " ").concat(_y3));
            }
          } else if (tag === 'a:close') {
            commands.push('Z');
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      return commands.join(' ');
    }
  }]);
}(); // Export for use in other modules
// Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
_defineProperty(ShapeParser, "SLIDE_WIDTH_EMU", 9144000);
// 10 inches at 914400 EMU/inch
_defineProperty(ShapeParser, "SLIDE_HEIGHT_EMU", 5143500);
window.ShapeParser = ShapeParser;

/* === parsers/layout/layout-text-style-parser.js === */
/**
 * Layout Text Style Parser Module
 * Handles parsing of text styles from master slides and text extraction
 * Implements font inheritance: Theme -> Master -> Layout -> Slide -> Run
 */
var LayoutTextStyleParser = /*#__PURE__*/function () {
  /**
   * Create a LayoutTextStyleParser
   * @param {BackgroundExtractor} backgroundExtractor - For color extraction
   * @param {ThemeExtractor} themeExtractor - For theme defaults
   */
  function LayoutTextStyleParser(backgroundExtractor, themeExtractor) {
    _classCallCheck(this, LayoutTextStyleParser);
    this.backgroundExtractor = backgroundExtractor;
    this.themeExtractor = themeExtractor;

    // Cache for text styles from masters (titleStyle, bodyStyle, otherStyle)
    this.textStylesCache = new Map();
  }

  /**
   * Parse text styles from a master slide (p:txStyles)
   * These define default formatting for title, body, and other text
   * @param {Document} doc - Parsed master document
   * @returns {Object|null} - Text styles object
   */
  return _createClass(LayoutTextStyleParser, [{
    key: "parseTextStyles",
    value: function parseTextStyles(doc) {
      var txStyles = doc.getElementsByTagName('p:txStyles')[0];
      if (!txStyles) return null;
      var styles = {
        titleStyle: null,
        bodyStyle: null,
        otherStyle: null
      };

      // Parse title style (for title placeholders)
      var titleStyle = txStyles.getElementsByTagName('p:titleStyle')[0];
      if (titleStyle) {
        styles.titleStyle = this.parseLevelStyles(titleStyle);
      }

      // Parse body style (for body/content placeholders)
      var bodyStyle = txStyles.getElementsByTagName('p:bodyStyle')[0];
      if (bodyStyle) {
        styles.bodyStyle = this.parseLevelStyles(bodyStyle);
      }

      // Parse other style (for shapes without placeholders)
      var otherStyle = txStyles.getElementsByTagName('p:otherStyle')[0];
      if (otherStyle) {
        styles.otherStyle = this.parseLevelStyles(otherStyle);
      }
      return styles;
    }

    /**
     * Parse level-based paragraph styles (a:lvl1pPr through a:lvl9pPr)
     * @param {Element} styleEl - Style element containing level definitions
     * @returns {Object} - Object with level 1-9 formatting
     */
  }, {
    key: "parseLevelStyles",
    value: function parseLevelStyles(styleEl) {
      var levels = {};
      for (var i = 1; i <= 9; i++) {
        var lvlPPr = styleEl.getElementsByTagName("a:lvl".concat(i, "pPr"))[0];
        if (lvlPPr) {
          levels[i] = this.parseLevelFormatting(lvlPPr);
        }
      }

      // Also check for defPPr (default paragraph properties)
      var defPPr = styleEl.getElementsByTagName('a:defPPr')[0];
      if (defPPr) {
        levels.default = this.parseLevelFormatting(defPPr);
      }
      return levels;
    }

    /**
     * Parse formatting from a level paragraph properties element
     * @param {Element} pPr - Paragraph properties element
     * @returns {Object} - Formatting object
     */
  }, {
    key: "parseLevelFormatting",
    value: function parseLevelFormatting(pPr) {
      var formatting = {
        fontSize: null,
        fontFamily: null,
        color: null,
        bold: null,
        italic: null,
        align: null,
        marLEm: null,
        indentEm: null,
        spaceBeforeEm: null,
        spaceAfterEm: null,
        lineHeight: null
      };

      // Get alignment
      var algn = pPr.getAttribute('algn');
      if (algn === 'ctr') formatting.align = 'center';else if (algn === 'r') formatting.align = 'right';else if (algn === 'just') formatting.align = 'justify';else if (algn === 'l') formatting.align = 'left';

      // Get default run properties (defRPr)
      var defRPr = pPr.getElementsByTagName('a:defRPr')[0];
      if (defRPr) {
        // Font size (in hundredths of a point)
        var sz = defRPr.getAttribute('sz');
        if (sz) formatting.fontSize = parseInt(sz) / 100;

        // Bold/Italic
        if (defRPr.getAttribute('b') === '1') formatting.bold = true;
        if (defRPr.getAttribute('i') === '1') formatting.italic = true;

        // Font family
        var latin = defRPr.getElementsByTagName('a:latin')[0];
        if (latin) {
          var typeface = latin.getAttribute('typeface');
          if (typeface) {
            if (typeface === '+mj-lt' && this.themeExtractor) {
              formatting.fontFamily = this.themeExtractor.getTitleFont();
            } else if (typeface === '+mn-lt' && this.themeExtractor) {
              formatting.fontFamily = this.themeExtractor.getBodyFont();
            } else if (!typeface.startsWith('+')) {
              formatting.fontFamily = typeface;
            }
          }
        }

        // Color
        var solidFill = defRPr.getElementsByTagName('a:solidFill')[0];
        if (solidFill) {
          formatting.color = this.backgroundExtractor.extractColor(solidFill);
        }
      }

      // Paragraph margins/indentation (EMU values in styles)
      var marLAttr = pPr.getAttribute('marL');
      if (marLAttr !== null) {
        var marL = parseInt(marLAttr, 10);
        if (!Number.isNaN(marL)) {
          formatting.marLEm = marL / LayoutTextStyleParser.EMU_PER_POINT / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
        }
      }
      var indentAttr = pPr.getAttribute('indent');
      if (indentAttr !== null) {
        var indent = parseInt(indentAttr, 10);
        if (!Number.isNaN(indent)) {
          formatting.indentEm = indent / LayoutTextStyleParser.EMU_PER_POINT / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
        }
      }

      // Spacing (before/after/line)
      var parseSpacing = function parseSpacing(node) {
        if (!node) return null;
        var spcPts = node.getElementsByTagName('a:spcPts')[0];
        if (spcPts) {
          var val = parseInt(spcPts.getAttribute('val') || '0', 10);
          if (!Number.isNaN(val)) return val / 1000 / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
        }
        var spcPct = node.getElementsByTagName('a:spcPct')[0];
        if (spcPct) {
          var _val8 = parseInt(spcPct.getAttribute('val') || '0', 10);
          if (!Number.isNaN(_val8)) return _val8 / LayoutTextStyleParser.PERCENT_DENOM;
        }
        return null;
      };
      formatting.spaceBeforeEm = parseSpacing(pPr.getElementsByTagName('a:spcBef')[0]);
      formatting.spaceAfterEm = parseSpacing(pPr.getElementsByTagName('a:spcAft')[0]);
      var lnSpc = pPr.getElementsByTagName('a:lnSpc')[0];
      if (lnSpc) {
        var spcPts = lnSpc.getElementsByTagName('a:spcPts')[0];
        if (spcPts) {
          var val = parseInt(spcPts.getAttribute('val') || '0', 10);
          if (!Number.isNaN(val)) formatting.lineHeight = val / 1000 / LayoutTextStyleParser.BASE_FONT_SIZE_PT;
        }
        var spcPct = lnSpc.getElementsByTagName('a:spcPct')[0];
        if (spcPct) {
          var _val9 = parseInt(spcPct.getAttribute('val') || '0', 10);
          if (!Number.isNaN(_val9)) formatting.lineHeight = _val9 / LayoutTextStyleParser.PERCENT_DENOM;
        }
      }
      return formatting;
    }

    /**
     * Cache text styles for a master path
     * @param {string} masterPath - Path to master
     * @param {Object} textStyles - Parsed text styles
     */
  }, {
    key: "cacheTextStyles",
    value: function cacheTextStyles(masterPath, textStyles) {
      if (textStyles) {
        this.textStylesCache.set(masterPath, textStyles);
      }
    }

    /**
     * Get text style for a placeholder type and level
     * @param {string} masterPath - Path to master
     * @param {string} placeholderType - Type of placeholder (title, body, etc.)
     * @param {number} level - Text level (1-9, default 1)
     * @returns {Object|null} - Formatting object or null
     */
  }, {
    key: "getTextStyleForPlaceholder",
    value: function getTextStyleForPlaceholder(masterPath, placeholderType) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var textStyles = this.textStylesCache.get(masterPath);
      if (!textStyles) return null;

      // Map placeholder type to style
      var style = null;
      if (placeholderType === 'title' || placeholderType === 'ctrTitle' || placeholderType === 'subTitle') {
        style = textStyles.titleStyle;
      } else if (placeholderType === 'body' || placeholderType === 'obj' || placeholderType === 'content') {
        style = textStyles.bodyStyle;
      } else {
        style = textStyles.otherStyle || textStyles.bodyStyle;
      }
      if (!style) return null;

      // Get level formatting (fall back to level 1 or default)
      return style[level] || style[1] || style.default || null;
    }

    /**
     * Get default text formatting for a placeholder type
     * Merges master text styles with theme defaults
     * @param {string} masterPath - Path to master slide
     * @param {string} placeholderType - Placeholder type (title, body, etc.)
     * @param {number} level - Text level (1-9)
     * @returns {Object} - Formatting defaults
     */
  }, {
    key: "getTextDefaults",
    value: function getTextDefaults(masterPath, placeholderType) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      // Start with theme defaults
      var defaults = {
        fontSize: null,
        fontFamily: this.themeExtractor ? this.themeExtractor.getBodyFont() : 'Calibri',
        color: this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000',
        bold: false,
        italic: false,
        align: 'left',
        marLEm: null,
        indentEm: null,
        spaceBeforeEm: null,
        spaceAfterEm: null,
        lineHeight: null
      };

      // Title placeholders use major font
      if (placeholderType === 'title' || placeholderType === 'ctrTitle' || placeholderType === 'subTitle') {
        defaults.fontFamily = this.themeExtractor ? this.themeExtractor.getTitleFont() : 'Calibri Light';
      }

      // Override with master text styles if available
      var styleFromMaster = this.getTextStyleForPlaceholder(masterPath, placeholderType, level);
      if (styleFromMaster) {
        if (styleFromMaster.fontSize) defaults.fontSize = styleFromMaster.fontSize;
        if (styleFromMaster.fontFamily) defaults.fontFamily = styleFromMaster.fontFamily;
        if (styleFromMaster.color) defaults.color = styleFromMaster.color;
        if (styleFromMaster.bold !== null) defaults.bold = styleFromMaster.bold;
        if (styleFromMaster.italic !== null) defaults.italic = styleFromMaster.italic;
        if (styleFromMaster.align) defaults.align = styleFromMaster.align;
        if (styleFromMaster.marLEm !== null && styleFromMaster.marLEm !== undefined) defaults.marLEm = styleFromMaster.marLEm;
        if (styleFromMaster.indentEm !== null && styleFromMaster.indentEm !== undefined) defaults.indentEm = styleFromMaster.indentEm;
        if (styleFromMaster.spaceBeforeEm !== null && styleFromMaster.spaceBeforeEm !== undefined) defaults.spaceBeforeEm = styleFromMaster.spaceBeforeEm;
        if (styleFromMaster.spaceAfterEm !== null && styleFromMaster.spaceAfterEm !== undefined) defaults.spaceAfterEm = styleFromMaster.spaceAfterEm;
        if (styleFromMaster.lineHeight !== null && styleFromMaster.lineHeight !== undefined) defaults.lineHeight = styleFromMaster.lineHeight;
      }
      return defaults;
    }

    /**
     * Extract text from shape body (for layout/master shapes)
     * Implements proper inheritance: run -> paragraph -> theme
     * @param {Element} txBody - Text body element
     * @returns {Array|null} - Array of text parts or null
     */
  }, {
    key: "extractShapeText",
    value: function extractShapeText(txBody) {
      var paragraphs = txBody.getElementsByTagName('a:p');
      var textParts = [];
      var themeColor = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
      var themeFont = this.themeExtractor ? this.themeExtractor.getBodyFont() : 'Calibri';
      var _iterator13 = _createForOfIteratorHelper(paragraphs),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var para = _step13.value;
          var pPr = para.getElementsByTagName('a:pPr')[0];
          var align = 'left';
          var defFontSize = null;
          var defColor = null;
          var defFontFamily = null;
          var defBold = false;
          var defItalic = false;
          if (pPr) {
            var algn = pPr.getAttribute('algn');
            if (algn === 'ctr') align = 'center';else if (algn === 'r') align = 'right';else if (algn === 'just') align = 'justify';else if (algn === 'l') align = 'left';

            // Check for default run properties at paragraph level
            var defRPr = pPr.getElementsByTagName('a:defRPr')[0];
            if (defRPr) {
              var defSz = defRPr.getAttribute('sz');
              if (defSz) defFontSize = parseInt(defSz) / 100;

              // Default color from paragraph
              var defSolidFill = defRPr.getElementsByTagName('a:solidFill')[0];
              defColor = this.backgroundExtractor.extractColor(defSolidFill);

              // Default font from paragraph
              var defLatin = defRPr.getElementsByTagName('a:latin')[0];
              if (defLatin) {
                var typeface = defLatin.getAttribute('typeface');
                if (typeface) {
                  if (typeface === '+mj-lt' && this.themeExtractor) {
                    defFontFamily = this.themeExtractor.getTitleFont();
                  } else if (typeface === '+mn-lt' && this.themeExtractor) {
                    defFontFamily = this.themeExtractor.getBodyFont();
                  } else if (!typeface.startsWith('+')) {
                    defFontFamily = typeface;
                  }
                }
              }

              // Bold/italic defaults
              if (defRPr.getAttribute('b') === '1') defBold = true;
              if (defRPr.getAttribute('i') === '1') defItalic = true;
            }
          }
          var runs = para.getElementsByTagName('a:r');
          var paraText = [];
          var _iterator14 = _createForOfIteratorHelper(runs),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var run = _step14.value;
              var textEl = run.getElementsByTagName('a:t')[0];
              if (textEl && textEl.textContent) {
                var rPr = run.getElementsByTagName('a:rPr')[0];
                var color = null;
                var fontSize = null;
                var fontFamily = null;
                var bold = defBold;
                var italic = defItalic;
                if (rPr) {
                  // Extract color from run
                  var solidFill = rPr.getElementsByTagName('a:solidFill')[0];
                  color = this.backgroundExtractor.extractColor(solidFill);

                  // Extract font size from run
                  var sz = rPr.getAttribute('sz');
                  if (sz) fontSize = parseInt(sz) / 100;

                  // Extract font family from run
                  var latin = rPr.getElementsByTagName('a:latin')[0];
                  if (latin) {
                    var _typeface4 = latin.getAttribute('typeface');
                    if (_typeface4) {
                      if (_typeface4 === '+mj-lt' && this.themeExtractor) {
                        fontFamily = this.themeExtractor.getTitleFont();
                      } else if (_typeface4 === '+mn-lt' && this.themeExtractor) {
                        fontFamily = this.themeExtractor.getBodyFont();
                      } else if (!_typeface4.startsWith('+')) {
                        fontFamily = _typeface4;
                      }
                    }
                  }

                  // Bold/italic - only override if explicitly set
                  if (rPr.hasAttribute('b')) bold = rPr.getAttribute('b') === '1';
                  if (rPr.hasAttribute('i')) italic = rPr.getAttribute('i') === '1';
                }

                // Apply inheritance: run -> paragraph -> theme
                if (!fontSize) fontSize = defFontSize;
                if (!color) color = defColor || themeColor;
                if (!fontFamily) fontFamily = defFontFamily || themeFont;
                paraText.push({
                  text: textEl.textContent,
                  color: color,
                  fontSize: fontSize,
                  fontFamily: fontFamily,
                  bold: bold,
                  italic: italic,
                  align: align
                });
              }
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
          if (paraText.length > 0) {
            textParts.push(paraText);
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      return textParts.length > 0 ? textParts : null;
    }

    /**
     * Clear the text styles cache (call when loading new file)
     */
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.textStylesCache.clear();
    }

    /**
     * Parse placeholder-level text styles defined directly on a slide layout
     * (a:lstStyle under a placeholder's txBody). Returns a Map keyed by
     * placeholder type with level-based formatting objects.
     * @param {Document} doc - Parsed layout document
     * @returns {Map|null}
     */
  }, {
    key: "parseLayoutPlaceholderStyles",
    value: function parseLayoutPlaceholderStyles(doc) {
      var _doc$getElementsByTag;
      if (!doc) return null;
      var map = new Map();
      var spTree = (_doc$getElementsByTag = doc.getElementsByTagName('p:cSld')[0]) === null || _doc$getElementsByTag === void 0 ? void 0 : _doc$getElementsByTag.getElementsByTagName('p:spTree')[0];
      if (!spTree) return null;
      var shapes = Array.from(spTree.getElementsByTagName('p:sp'));
      for (var _i2 = 0, _shapes = shapes; _i2 < _shapes.length; _i2++) {
        var sp = _shapes[_i2];
        var ph = sp.getElementsByTagName('p:ph')[0];
        var placeholderType = (ph === null || ph === void 0 ? void 0 : ph.getAttribute('type')) || null;
        var placeholderIdx = (ph === null || ph === void 0 ? void 0 : ph.getAttribute('idx')) || null;
        if (!placeholderType) continue;
        var txBody = sp.getElementsByTagName('p:txBody')[0];
        var lstStyle = txBody === null || txBody === void 0 ? void 0 : txBody.getElementsByTagName('a:lstStyle')[0];
        if (!lstStyle) continue;
        var levels = {};
        for (var i = 1; i <= 9; i++) {
          var lvlPPr = lstStyle.getElementsByTagName("a:lvl".concat(i, "pPr"))[0];
          if (lvlPPr) {
            levels[i] = this.parseLevelFormatting(lvlPPr);
          }
        }
        var defPPr = lstStyle.getElementsByTagName('a:defPPr')[0];
        if (defPPr) {
          levels.default = this.parseLevelFormatting(defPPr);
        }
        if (Object.keys(levels).length > 0 && placeholderIdx !== null) {
          map.set("".concat(placeholderType, ":").concat(placeholderIdx), levels);
        }
      }
      return map.size > 0 ? map : null;
    }
  }]);
}(); // Export for use in other modules
_defineProperty(LayoutTextStyleParser, "EMU_PER_POINT", 12700);
_defineProperty(LayoutTextStyleParser, "BASE_FONT_SIZE_PT", 18);
_defineProperty(LayoutTextStyleParser, "PERCENT_DENOM", 100000);
window.LayoutTextStyleParser = LayoutTextStyleParser;

/* === parsers/layout/layout-shape-parser.js === */
/**
 * Layout Shape Parser Module
 * Handles parsing of shapes, pictures, groups, and connectors from layouts/masters
 */
var LayoutShapeParser = /*#__PURE__*/function () {
  /**
   * Create a LayoutShapeParser
   * @param {BackgroundExtractor} backgroundExtractor - For color extraction
   * @param {ThemeExtractor} themeExtractor - For theme defaults
   * @param {Object} images - Map of image names to blob URLs
   */
  function LayoutShapeParser(backgroundExtractor, themeExtractor, images) {
    _classCallCheck(this, LayoutShapeParser);
    this.backgroundExtractor = backgroundExtractor;
    this.themeExtractor = themeExtractor;
    this.images = images;
  }

  /**
   * Parse a shape from layout/master
   * @param {Element} sp - Shape element
   * @param {Array} rels - Relationships array
   * @param {LayoutTextStyleParser} textStyleParser - For text extraction
   * @returns {Object|null} - Shape data or null
   */
  return _createClass(LayoutShapeParser, [{
    key: "parseLayoutShape",
    value: function parseLayoutShape(sp, rels) {
      var _this3 = this;
      var textStyleParser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var cNvPr = sp.getElementsByTagName('p:cNvPr')[0];
      var shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;
      var shape = {
        type: 'rect',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fill: null,
        stroke: null,
        strokeWidth: 1,
        rotation: 0,
        text: null,
        isPlaceholder: false,
        placeholderType: null,
        placeholderIdx: null,
        fromLayout: true,
        shadow: null,
        cornerRadius: null,
        customGeometry: null,
        shapeId: shapeIdAttr ? parseInt(shapeIdAttr, 10) : null
      };

      // Check if this is a placeholder
      var nvSpPr = sp.getElementsByTagName('p:nvSpPr')[0];
      if (nvSpPr) {
        var nvPr = nvSpPr.getElementsByTagName('p:nvPr')[0];
        if (nvPr) {
          var ph = nvPr.getElementsByTagName('p:ph')[0];
          if (ph) {
            shape.isPlaceholder = true;
            shape.placeholderType = ph.getAttribute('type') || 'body';
            shape.placeholderIdx = ph.getAttribute('idx');
          }
        }
      }

      // Get shape properties
      var spPr = sp.getElementsByTagName('p:spPr')[0];
      if (!spPr) return shape;
      var xfrm = spPr.getElementsByTagName('a:xfrm')[0];
      if (xfrm) {
        var off = xfrm.getElementsByTagName('a:off')[0];
        var ext = xfrm.getElementsByTagName('a:ext')[0];
        if (off) {
          shape.x = parseInt(off.getAttribute('x') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
          shape.y = parseInt(off.getAttribute('y') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
        }
        if (ext) {
          shape.width = parseInt(ext.getAttribute('cx') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
          shape.height = parseInt(ext.getAttribute('cy') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
        }
        var rot = xfrm.getAttribute('rot');
        if (rot) {
          shape.rotation = parseInt(rot, 10) / 60000;
        }
      }

      // Get shape geometry
      var prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
      if (prstGeom) {
        var prst = prstGeom.getAttribute('prst') || 'rect';
        shape.type = this.mapShapeType(prst);
      }

      // Get custom geometry if present
      var custGeom = spPr.getElementsByTagName('a:custGeom')[0];
      if (custGeom) {
        shape.customGeometry = this.extractCustomGeometry(custGeom);
        if (shape.customGeometry) {
          shape.type = 'custom';
        }
      }

      // Get shadow effects
      shape.shadow = this.extractShadow(spPr);

      // Get corner radius from geometry
      shape.cornerRadius = this.extractCornerRadius(spPr);

      // Get fill (also for placeholders so slide shapes can inherit)
      var solidFill = spPr.getElementsByTagName('a:solidFill')[0];
      var gradFill = spPr.getElementsByTagName('a:gradFill')[0];
      var blipFill = spPr.getElementsByTagName('a:blipFill')[0];
      var noFill = spPr.getElementsByTagName('a:noFill')[0];
      if (noFill) {
        shape.fill = 'none';
      } else if (solidFill) {
        // Extract color with opacity
        var colorWithOpacity = this.backgroundExtractor.extractColorWithOpacity(solidFill);
        if (colorWithOpacity) {
          // If opacity is less than 1, return object with color and opacity
          if (colorWithOpacity.opacity < 1) {
            shape.fill = {
              type: 'solid',
              color: colorWithOpacity.color,
              opacity: colorWithOpacity.opacity
            };
          } else {
            // Otherwise just use the color string for backward compatibility
            shape.fill = colorWithOpacity.color;
          }
        }
      } else if (gradFill) {
        shape.fill = {
          type: 'gradient',
          gradient: this.backgroundExtractor.extractGradient(gradFill)
        };
      } else if (blipFill) {
        var blip = blipFill.getElementsByTagName('a:blip')[0];
        if (blip) {
          var svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
          var svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
          var pngId = blip.getAttribute('r:embed');
          var resolveRel = function resolveRel(embedId) {
            if (!embedId) return null;
            var rel = rels.find(function (r) {
              return r.getAttribute('Id') === embedId;
            });
            if (rel) {
              var imageName = rel.getAttribute('Target').split('/').pop();
              return _this3.images[imageName] || null;
            }
            return null;
          };
          var svgUrl = resolveRel(svgId);
          var pngUrl = resolveRel(pngId);
          var chosen = svgUrl || pngUrl;
          if (chosen) {
            shape.fill = {
              type: 'image',
              src: chosen
            };
          }
        }
      }

      // If no fill, check for style reference from theme
      if (!shape.fill) {
        shape.fill = this.extractStyleFill(sp);
      }

      // Get stroke
      var ln = spPr.getElementsByTagName('a:ln')[0];
      if (ln) {
        var w = ln.getAttribute('w');
        if (w) {
          shape.strokeWidth = parseInt(w) / 914400 * 96;
        }
        var lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
        var lnNoFill = ln.getElementsByTagName('a:noFill')[0];
        if (lnNoFill) {
          shape.stroke = 'none';
        } else if (lnSolidFill) {
          shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
        }
      }

      // If no stroke, check for style reference from theme
      if (shape.stroke === null) {
        shape.stroke = this.extractStyleStroke(sp);
      }

      // Get text for non-placeholder shapes
      var txBody = sp.getElementsByTagName('p:txBody')[0];
      if (!shape.isPlaceholder && txBody && textStyleParser) {
        shape.text = textStyleParser.extractShapeText(txBody);
      }

      // Capture text body properties (vertical anchor, wrapping, insets) for inheritance
      if (txBody) {
        var bodyPr = txBody.getElementsByTagName('a:bodyPr')[0];
        if (bodyPr) {
          var anchor = bodyPr.getAttribute('anchor');
          if (anchor === 'b') {
            shape.textVAlign = 'bottom';
          } else if (anchor === 'ctr') {
            shape.textVAlign = 'middle';
          } else if (anchor === 't') {
            shape.textVAlign = 'top';
          }
          var wrap = bodyPr.getAttribute('wrap');
          shape.textWrap = wrap !== 'none';

          // Auto-fit markers to allow slide shapes to inherit
          if (bodyPr.getElementsByTagName('a:normAutofit')[0]) {
            shape.textAutoFit = 'norm';
          } else if (bodyPr.getElementsByTagName('a:noAutofit')[0]) {
            shape.textAutoFit = 'none';
          }

          // PowerPoint default text insets are 0.1" (91440 EMU) on all sides
          var defaultInsetEMU = 91440;
          var lInsEMU = bodyPr.getAttribute('lIns') ? parseInt(bodyPr.getAttribute('lIns'), 10) : defaultInsetEMU;
          var rInsEMU = bodyPr.getAttribute('rIns') ? parseInt(bodyPr.getAttribute('rIns'), 10) : defaultInsetEMU;
          var tInsEMU = bodyPr.getAttribute('tIns') ? parseInt(bodyPr.getAttribute('tIns'), 10) : defaultInsetEMU;
          var bInsEMU = bodyPr.getAttribute('bIns') ? parseInt(bodyPr.getAttribute('bIns'), 10) : defaultInsetEMU;
          shape.textInsetsEMU = {
            left: lInsEMU,
            right: rInsEMU,
            top: tInsEMU,
            bottom: bInsEMU
          };
        }
      }
      return shape;
    }

    /**
     * Map PowerPoint shape preset to shape types
     * @param {string} prst - Preset shape name
     * @returns {string} - Mapped shape type
     */
  }, {
    key: "mapShapeType",
    value: function mapShapeType(prst) {
      var shapeMap = {
        'rect': 'rect',
        'square': 'square',
        'roundRect': 'roundRect',
        'roundSquare': 'roundSquare',
        'ellipse': 'ellipse',
        'circle': 'circle',
        'triangle': 'triangle',
        'isoscelesTriangle': 'triangle',
        'rtTriangle': 'rightTriangle',
        'parallelogram': 'parallelogram',
        'trapezoid': 'trapezoid',
        'diamond': 'diamond',
        'pentagon': 'pentagon',
        'hexagon': 'hexagon',
        'heptagon': 'heptagon',
        'octagon': 'octagon',
        'star4': 'star4',
        'star5': 'star5',
        'star6': 'star6',
        'arrow': 'arrow',
        'rightArrow': 'rightArrow',
        'leftArrow': 'leftArrow',
        'upArrow': 'upArrow',
        'downArrow': 'downArrow',
        'heart': 'heart',
        'lightningBolt': 'lightning',
        'sun': 'sun',
        'moon': 'moon',
        'cloud': 'cloud',
        'line': 'line',
        'straightConnector1': 'line',
        // Callout/Speech bubble shapes
        'speechBubble': 'speechBubble',
        'speechBubbleOval': 'speechBubbleOval',
        'calloutRectangle': 'calloutRect',
        'calloutRoundRect': 'calloutRoundRect',
        'calloutOval': 'calloutOval',
        // Flowchart shapes (basic)
        'flowChartProcess': 'flowChartProcess',
        'flowChartDecision': 'flowChartDecision',
        'flowChartInputOutput': 'flowChartInputOutput',
        'flowChartTerminator': 'flowChartTerminator',
        'flowChartData': 'flowChartData',
        'flowChartDocument': 'flowChartDocument',
        'flowChartMultidocument': 'flowChartMultidocument',
        'flowChartPredefinedProcess': 'flowChartPredefinedProcess',
        'flowChartOffPageConnector': 'flowChartOffPage',
        'flowChartMerge': 'flowChartMerge',
        'flowChartExtract': 'flowChartExtract',
        'flowChartOr': 'flowChartOr',
        'flowChartSum': 'flowChartSum',
        'flowChartSort': 'flowChartSort',
        'flowChartManualInput': 'flowChartManualInput',
        'flowChartDelay': 'flowChartDelay',
        // 3D shapes
        'cube': 'cube',
        'cylinder': 'cylinder',
        'sphere': 'sphere',
        'cone': 'cone',
        'pyramid': 'pyramid',
        'tetrahedron': 'tetrahedron',
        'octahedron': 'octahedron',
        // Block arrows
        'blockArcRight': 'blockArcRight',
        'blockArcLeft': 'blockArcLeft',
        'blockArcUp': 'blockArcUp',
        'blockArcDown': 'blockArcDown',
        // Additional arrows
        'quadArrow': 'quadArrow',
        'leftRightArrow': 'leftRightArrow',
        'upDownArrow': 'upDownArrow',
        'ribbon': 'ribbon',
        'ribbon2': 'ribbon2',
        'doubleWave': 'doubleWave',
        'chevron': 'chevron',
        'chevronRight': 'chevronRight',
        'curvedUpArrow': 'curvedUpArrow',
        'curvedDownArrow': 'curvedDownArrow',
        'curvedLeftArrow': 'curvedLeftArrow',
        'curvedRightArrow': 'curvedRightArrow',
        'actionButtonHome': 'actionHome',
        'actionButtonHelp': 'actionHelp',
        'actionButtonInformation': 'actionInfo',
        'actionButtonSound': 'actionSound',
        'actionButtonMovie': 'actionMovie',
        'actionButtonDocument': 'actionDocument',
        'actionButtonReturn': 'actionReturn',
        'actionButtonForward': 'actionForward',
        'explosion1': 'explosion16',
        'explosion2': 'explosion32',
        'star7': 'star7',
        'star8': 'star8',
        'star10': 'star10',
        'star12': 'star12',
        'star16': 'star16',
        'star24': 'star24',
        'star32': 'star32'
      };
      return shapeMap[prst] || prst || 'rect';
    }

    /**
     * Extract fill color from style reference (p:style/a:fillRef)
     * @param {Element} sp - Shape element
     * @returns {string|null} - Fill color or null
     */
  }, {
    key: "extractStyleFill",
    value: function extractStyleFill(sp) {
      var style = sp.getElementsByTagName('p:style')[0];
      if (!style) return null;
      var fillRef = style.getElementsByTagName('a:fillRef')[0];
      if (!fillRef) return null;
      var idx = parseInt(fillRef.getAttribute('idx') || '0', 10);

      // First check for embedded color in fillRef
      var color = this.backgroundExtractor.extractColor(fillRef);
      if (color) return color;

      // Try to get accent color from theme (idx 1-6 typically map to accent colors)
      if (idx > 0 && idx <= 6 && this.themeExtractor) {
        var accentColor = this.themeExtractor.getAccentColor(idx);
        if (accentColor) {
          return accentColor;
        }
      }

      // Fall back to theme format scheme fill style list (a:fmtScheme/a:fillStyleLst)
      // idx can be 0 (first fill in list) or higher indices
      if (this.themeExtractor && typeof this.themeExtractor.getFillStyleNode === 'function') {
        var fillNode = this.themeExtractor.getFillStyleNode(idx);
        if (fillNode) {
          var tag = fillNode.tagName;
          if (tag === 'a:solidFill') {
            return this.backgroundExtractor.extractColor(fillNode);
          }
          if (tag === 'a:gradFill') {
            return {
              type: 'gradient',
              gradient: this.backgroundExtractor.extractGradient(fillNode)
            };
          }
          if (tag === 'a:pattFill') {
            var fg = fillNode.getElementsByTagName('a:fgClr')[0];
            var bg = fillNode.getElementsByTagName('a:bgClr')[0];
            return this.backgroundExtractor.extractColor(fg) || this.backgroundExtractor.extractColor(bg);
          }
          if (tag === 'a:blipFill') {
            var blip = fillNode.getElementsByTagName('a:blip')[0];
            var embedId = blip ? blip.getAttribute('r:embed') : null;
            if (embedId && this.themeExtractor && typeof this.themeExtractor.resolveThemeImageUrl === 'function') {
              var src = this.themeExtractor.resolveThemeImageUrl(embedId, this.images);
              if (src) {
                return {
                  type: 'image',
                  src: src
                };
              }
            }
          }
        }
      }
      return null;
    }

    /**
     * Extract stroke color from style reference (p:style/a:lnRef)
     * @param {Element} sp - Shape element
     * @returns {string|null} - Stroke color or null
     */
  }, {
    key: "extractStyleStroke",
    value: function extractStyleStroke(sp) {
      var style = sp.getElementsByTagName('p:style')[0];
      if (!style) return null;
      var lnRef = style.getElementsByTagName('a:lnRef')[0];
      if (!lnRef) return null;

      // Check for embedded color
      var color = this.backgroundExtractor.extractColor(lnRef);
      if (color) return color;

      // If idx > 0, try to get accent color from theme
      var idx = parseInt(lnRef.getAttribute('idx') || '0', 10);
      if (idx > 0 && idx <= 6 && this.themeExtractor) {
        return this.themeExtractor.getAccentColor(idx);
      }
      return null;
    }

    /**
     * Parse a picture from layout/master
     * @param {Element} picEl - Picture element
     * @param {Array} rels - Relationships array
     * @returns {Object|null} - Picture data or null
     */
  }, {
    key: "parseLayoutPicture",
    value: function parseLayoutPicture(picEl, rels) {
      var picture = {
        type: 'picture',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        src: null,
        fromLayout: true
      };
      try {
        var blipFill = picEl.getElementsByTagName('p:blipFill')[0];
        if (blipFill) {
          var blip = blipFill.getElementsByTagName('a:blip')[0];
          if (blip) {
            var embedId = blip.getAttribute('r:embed');
            if (embedId) {
              var imageRel = rels.find(function (r) {
                return r.getAttribute('Id') === embedId;
              });
              if (imageRel) {
                var imageName = imageRel.getAttribute('Target').split('/').pop();
                if (this.images[imageName]) {
                  picture.src = this.images[imageName];
                }
              }
            }
          }
        }

        // Get transform
        var spPr = picEl.getElementsByTagName('p:spPr')[0];
        if (spPr) {
          var xfrm = spPr.getElementsByTagName('a:xfrm')[0];
          if (xfrm) {
            var off = xfrm.getElementsByTagName('a:off')[0];
            var ext = xfrm.getElementsByTagName('a:ext')[0];
            if (off) {
              picture.x = parseInt(off.getAttribute('x') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
              picture.y = parseInt(off.getAttribute('y') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
            }
            if (ext) {
              picture.width = parseInt(ext.getAttribute('cx') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
              picture.height = parseInt(ext.getAttribute('cy') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
            }
          }
        }
        return picture.src ? picture : null;
      } catch (error) {
        return null;
      }
    }

    /**
     * Parse a group shape and return flattened array of child shapes
     * @param {Element} grpSp - Group shape element
     * @param {Array} rels - Relationships array
     * @param {LayoutTextStyleParser} textStyleParser - For text extraction
     * @returns {Array} - Array of child shapes with adjusted positions
     */
  }, {
    key: "parseGroupShape",
    value: function parseGroupShape(grpSp, rels) {
      var textStyleParser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var shapes = [];

      // Get group transform for coordinate adjustment
      var grpSpPr = grpSp.getElementsByTagName('p:grpSpPr')[0];
      var groupOffsetX = 0,
        groupOffsetY = 0;
      var groupScaleX = 1,
        groupScaleY = 1;
      if (grpSpPr) {
        var xfrm = grpSpPr.getElementsByTagName('a:xfrm')[0];
        if (xfrm) {
          var off = xfrm.getElementsByTagName('a:off')[0];
          var chOff = xfrm.getElementsByTagName('a:chOff')[0];
          var ext = xfrm.getElementsByTagName('a:ext')[0];
          var chExt = xfrm.getElementsByTagName('a:chExt')[0];
          if (off && chOff) {
            // Group position offset
            groupOffsetX = (parseInt(off.getAttribute('x') || '0') - parseInt(chOff.getAttribute('x') || '0')) / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
            groupOffsetY = (parseInt(off.getAttribute('y') || '0') - parseInt(chOff.getAttribute('y') || '0')) / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
          }
          if (ext && chExt) {
            // Group scale factor
            var extCx = parseInt(ext.getAttribute('cx') || '1');
            var chExtCx = parseInt(chExt.getAttribute('cx') || '1');
            var extCy = parseInt(ext.getAttribute('cy') || '1');
            var chExtCy = parseInt(chExt.getAttribute('cy') || '1');
            if (chExtCx > 0) groupScaleX = extCx / chExtCx;
            if (chExtCy > 0) groupScaleY = extCy / chExtCy;
          }
        }
      }

      // Parse child shapes
      var _iterator15 = _createForOfIteratorHelper(grpSp.children),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var child = _step15.value;
          var tagName = child.tagName;
          var shapeData = null;
          if (tagName === 'p:sp') {
            shapeData = this.parseLayoutShape(child, rels, textStyleParser);
          } else if (tagName === 'p:pic') {
            shapeData = this.parseLayoutPicture(child, rels);
          } else if (tagName === 'p:cxnSp') {
            shapeData = this.parseConnectionShape(child, rels);
          } else if (tagName === 'p:grpSp') {
            // Recursive group shapes
            var nestedShapes = this.parseGroupShape(child, rels, textStyleParser);
            var _iterator16 = _createForOfIteratorHelper(nestedShapes),
              _step16;
            try {
              for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                var nested = _step16.value;
                // Apply parent group transform
                nested.x = nested.x * groupScaleX + groupOffsetX;
                nested.y = nested.y * groupScaleY + groupOffsetY;
                nested.width = nested.width * groupScaleX;
                nested.height = nested.height * groupScaleY;
                shapes.push(nested);
              }
            } catch (err) {
              _iterator16.e(err);
            } finally {
              _iterator16.f();
            }
            continue;
          }
          if (shapeData && !shapeData.isPlaceholder) {
            // Apply group transform to child shape
            shapeData.x = shapeData.x * groupScaleX + groupOffsetX;
            shapeData.y = shapeData.y * groupScaleY + groupOffsetY;
            shapeData.width = shapeData.width * groupScaleX;
            shapeData.height = shapeData.height * groupScaleY;
            shapes.push(shapeData);
          }
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
      return shapes;
    }

    /**
     * Parse a connection shape (lines/connectors)
     * @param {Element} cxnSp - Connection shape element
     * @param {Array} rels - Relationships array
     * @returns {Object|null} - Connection shape data
     */
  }, {
    key: "parseConnectionShape",
    value: function parseConnectionShape(cxnSp, rels) {
      var cNvPr = cxnSp.getElementsByTagName('p:cNvPr')[0];
      var shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;
      var cNvCxnSpPr = cxnSp.getElementsByTagName('p:cNvCxnSpPr')[0];
      var stCxn = cNvCxnSpPr === null || cNvCxnSpPr === void 0 ? void 0 : cNvCxnSpPr.getElementsByTagName('a:stCxn')[0];
      var endCxn = cNvCxnSpPr === null || cNvCxnSpPr === void 0 ? void 0 : cNvCxnSpPr.getElementsByTagName('a:endCxn')[0];
      var shape = {
        type: 'line',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        fill: 'none',
        stroke: null,
        strokeWidth: 1,
        rotation: 0,
        fromLayout: true,
        shapeId: shapeIdAttr ? parseInt(shapeIdAttr, 10) : null,
        startCxn: stCxn ? {
          shapeId: parseInt(stCxn.getAttribute('id') || '-1', 10),
          idx: parseInt(stCxn.getAttribute('idx') || '-1', 10)
        } : null,
        endCxn: endCxn ? {
          shapeId: parseInt(endCxn.getAttribute('id') || '-1', 10),
          idx: parseInt(endCxn.getAttribute('idx') || '-1', 10)
        } : null
      };
      var spPr = cxnSp.getElementsByTagName('p:spPr')[0];
      if (!spPr) return null;

      // Get transform
      var xfrm = spPr.getElementsByTagName('a:xfrm')[0];
      if (xfrm) {
        var off = xfrm.getElementsByTagName('a:off')[0];
        var ext = xfrm.getElementsByTagName('a:ext')[0];
        if (off) {
          shape.x = parseInt(off.getAttribute('x') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
          shape.y = parseInt(off.getAttribute('y') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
        }
        if (ext) {
          shape.width = parseInt(ext.getAttribute('cx') || '0') / LayoutShapeParser.SLIDE_WIDTH_EMU * 100;
          shape.height = parseInt(ext.getAttribute('cy') || '0') / LayoutShapeParser.SLIDE_HEIGHT_EMU * 100;
        }
        var rot = xfrm.getAttribute('rot');
        if (rot) {
          shape.rotation = parseInt(rot) / 60000;
        }

        // Check for flip
        if (xfrm.getAttribute('flipH') === '1') shape.flipH = true;
        if (xfrm.getAttribute('flipV') === '1') shape.flipV = true;
      }

      // Get geometry type
      var prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
      if (prstGeom) {
        shape.type = prstGeom.getAttribute('prst') || 'line';
      }

      // Get line style
      var ln = spPr.getElementsByTagName('a:ln')[0];
      if (ln) {
        var w = ln.getAttribute('w');
        if (w) {
          shape.strokeWidth = parseInt(w) / 914400 * 96;
        }
        var lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
        if (lnSolidFill) {
          shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
        }
        var headEnd = ln.getElementsByTagName('a:headEnd')[0];
        if (headEnd && headEnd.getAttribute('type') && headEnd.getAttribute('type') !== 'none') {
          shape.arrowHead = headEnd.getAttribute('type');
        }
        var tailEnd = ln.getElementsByTagName('a:tailEnd')[0];
        if (tailEnd && tailEnd.getAttribute('type') && tailEnd.getAttribute('type') !== 'none') {
          shape.arrowTail = tailEnd.getAttribute('type');
        }
      }

      // Default stroke if none specified
      if (!shape.stroke) {
        shape.stroke = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
      }
      return shape;
    }

    /**
     * Extract shadow effects from shape properties
     * Supports outerShdw (outer shadow) effects
     * @param {Element} spPr - Shape properties element
     * @returns {Object|null} - Shadow object
     */
  }, {
    key: "extractShadow",
    value: function extractShadow(spPr) {
      var effectLst = spPr.getElementsByTagName('a:effectLst')[0];
      if (!effectLst) return null;
      var outerShdw = effectLst.getElementsByTagName('a:outerShdw')[0];
      if (!outerShdw) return null;
      var shadow = {};
      var blurRad = outerShdw.getAttribute('blurRad');
      if (blurRad) {
        var blurRadEMU = parseInt(blurRad);
        shadow.blur = blurRadEMU / 914400 * 96;
      }
      var dist = outerShdw.getAttribute('dist');
      if (dist) {
        var distEMU = parseInt(dist);
        shadow.distance = distEMU / 914400 * 96;
      }
      var dir = outerShdw.getAttribute('dir');
      if (dir) {
        shadow.angle = parseInt(dir) / 60000;
      }
      var srgbClr = outerShdw.getElementsByTagName('a:srgbClr')[0];
      var schemeClr = outerShdw.getElementsByTagName('a:schemeClr')[0];
      if (srgbClr) {
        shadow.color = '#' + srgbClr.getAttribute('val');
      } else if (schemeClr) {
        var schemeColorName = schemeClr.getAttribute('val');
        if (this.themeExtractor) {
          shadow.color = this.themeExtractor.getSchemeColor(schemeColorName) || '#000000';
        } else {
          shadow.color = '#000000';
        }
      } else {
        shadow.color = '#000000';
      }
      var alpha = outerShdw.getElementsByTagName('a:alpha')[0];
      if (alpha) {
        var alphaVal = parseInt(alpha.getAttribute('val') || '100000');
        shadow.opacity = alphaVal / 100000;
      } else {
        shadow.opacity = 1;
      }
      return Object.keys(shadow).length > 0 ? shadow : null;
    }

    /**
     * Extract corner radius from shape geometry
     * Handles preset rounded rectangles with adjustments
     * @param {Element} spPr - Shape properties element
     * @returns {number|null} - Corner radius as percentage
     */
  }, {
    key: "extractCornerRadius",
    value: function extractCornerRadius(spPr) {
      var prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
      if (!prstGeom) return null;
      var prst = prstGeom.getAttribute('prst');
      if (!prst) return null;
      var roundedShapes = {
        'roundRect': 0.05,
        'roundSquare': 0.05,
        'round2SameRect': 0.10,
        'round1Rect': 0.03,
        'round2Rect': 0.10
      };
      if (!roundedShapes[prst]) return null;
      var adjLst = prstGeom.getElementsByTagName('a:adjLst')[0];
      if (adjLst) {
        var adj = adjLst.getElementsByTagName('a:adj')[0];
        if (adj) {
          var val = adj.getAttribute('val');
          if (val) {
            var adjVal = parseInt(val);
            return adjVal / 100000 * 0.5;
          }
        }
      }
      return roundedShapes[prst];
    }

    /**
     * Extract custom geometry from custGeom element
     * @param {Element} custGeom - Custom geometry element
     * @returns {Object|null} - Custom geometry object
     */
  }, {
    key: "extractCustomGeometry",
    value: function extractCustomGeometry(custGeom) {
      if (!custGeom) return null;
      var geometry = {
        paths: [],
        bounds: {
          x: 0,
          y: 0,
          w: 21600,
          h: 21600
        },
        guides: []
      };
      var bbox = custGeom.getAttribute('bbox');
      if (bbox) {
        var parts = bbox.split(' ');
        if (parts.length === 4) {
          geometry.bounds = {
            x: parseInt(parts[0]),
            y: parseInt(parts[1]),
            w: parseInt(parts[2]),
            h: parseInt(parts[3])
          };
        }
      }
      var gdLst = custGeom.getElementsByTagName('a:gdLst')[0];
      if (gdLst) {
        var guides = gdLst.getElementsByTagName('a:gd');
        var _iterator17 = _createForOfIteratorHelper(guides),
          _step17;
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var gd = _step17.value;
            var name = gd.getAttribute('name');
            var fmla = gd.getAttribute('fmla');
            geometry.guides.push({
              name: name,
              fmla: fmla
            });
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
      }
      var pathLst = custGeom.getElementsByTagName('a:pathLst')[0];
      if (pathLst) {
        var paths = pathLst.getElementsByTagName('a:path');
        var _iterator18 = _createForOfIteratorHelper(paths),
          _step18;
        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var path = _step18.value;
            var w = parseInt(path.getAttribute('w') || geometry.bounds.w);
            var h = parseInt(path.getAttribute('h') || geometry.bounds.h);
            var fill = path.getAttribute('fill') || 'norm';
            var stroke = path.getAttribute('stroke') !== 'false';
            var pathData = this.extractPathData(path, w, h);
            geometry.paths.push({
              data: pathData,
              w: w,
              h: h,
              fill: fill,
              stroke: stroke
            });
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }
      }
      return geometry.paths.length > 0 ? geometry : null;
    }

    /**
     * Extract path data from custom geometry path element
     * @param {Element} pathElement - Path element
     * @param {number} width - Path width
     * @param {number} height - Path height
     * @returns {string} - SVG path data string
     */
  }, {
    key: "extractPathData",
    value: function extractPathData(pathElement, width, height) {
      var commands = [];
      var childNodes = Array.from(pathElement.childNodes).filter(function (n) {
        return n.nodeType === 1;
      });
      var _iterator19 = _createForOfIteratorHelper(childNodes),
        _step19;
      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var child = _step19.value;
          var tag = child.tagName;
          if (tag === 'a:moveTo') {
            var pt = child.getElementsByTagName('a:pt')[0];
            if (pt) {
              var x = parseInt(pt.getAttribute('x') || '0') / width * 100;
              var y = parseInt(pt.getAttribute('y') || '0') / height * 100;
              commands.push("M ".concat(x, " ").concat(y));
            }
          } else if (tag === 'a:lnTo') {
            var _pt3 = child.getElementsByTagName('a:pt')[0];
            if (_pt3) {
              var _x0 = parseInt(_pt3.getAttribute('x') || '0') / width * 100;
              var _y4 = parseInt(_pt3.getAttribute('y') || '0') / height * 100;
              commands.push("L ".concat(_x0, " ").concat(_y4));
            }
          } else if (tag === 'a:cubicBezTo') {
            var pts = child.getElementsByTagName('a:pt');
            if (pts.length >= 3) {
              var x1 = parseInt(pts[0].getAttribute('x') || '0') / width * 100;
              var y1 = parseInt(pts[0].getAttribute('y') || '0') / height * 100;
              var x2 = parseInt(pts[1].getAttribute('x') || '0') / width * 100;
              var y2 = parseInt(pts[1].getAttribute('y') || '0') / height * 100;
              var _x1 = parseInt(pts[2].getAttribute('x') || '0') / width * 100;
              var _y5 = parseInt(pts[2].getAttribute('y') || '0') / height * 100;
              commands.push("C ".concat(x1, " ").concat(y1, " ").concat(x2, " ").concat(y2, " ").concat(_x1, " ").concat(_y5));
            }
          } else if (tag === 'a:arcTo') {
            var _pt4 = child.getElementsByTagName('a:pt')[0];
            if (_pt4) {
              var _x10 = parseInt(_pt4.getAttribute('x') || '0') / width * 100;
              var _y6 = parseInt(_pt4.getAttribute('y') || '0') / height * 100;
              commands.push("L ".concat(_x10, " ").concat(_y6));
            }
          } else if (tag === 'a:close') {
            commands.push('Z');
          }
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
      return commands.join(' ');
    }
  }]);
}(); // Export for use in other modules
// Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
_defineProperty(LayoutShapeParser, "SLIDE_WIDTH_EMU", 9144000);
_defineProperty(LayoutShapeParser, "SLIDE_HEIGHT_EMU", 5143500);
window.LayoutShapeParser = LayoutShapeParser;

/* === parsers/layout/layout-parser.js === */
/**
 * Layout Parser Module
 * Orchestrates parsing of slide layouts and masters for template support
 * Delegates to LayoutShapeParser and LayoutTextStyleParser for specific parsing tasks
 */
var LayoutParser = /*#__PURE__*/function () {
  /**
   * Create a LayoutParser
   * @param {Object} zip - JSZip instance
   * @param {DOMParser} xmlParser - XML parser
   * @param {BackgroundExtractor} backgroundExtractor - For color extraction
   * @param {ThemeExtractor} themeExtractor - For theme defaults
   * @param {Object} images - Map of image names to blob URLs
   */
  function LayoutParser(zip, xmlParser, backgroundExtractor, themeExtractor, images) {
    _classCallCheck(this, LayoutParser);
    this.zip = zip;
    this.xmlParser = xmlParser;
    this.backgroundExtractor = backgroundExtractor;
    this.themeExtractor = themeExtractor;
    this.images = images;

    // Initialize sub-parsers
    this.textStyleParser = new LayoutTextStyleParser(backgroundExtractor, themeExtractor);
    this.shapeParser = new LayoutShapeParser(backgroundExtractor, themeExtractor, images);

    // Cache for parsed layouts and masters
    this.layoutCache = new Map();
    this.masterCache = new Map();
  }

  /**
   * Resolve a relationship target against a base path (handles ../ segments)
   * @param {string} basePath - The referencing file path
   * @param {string} target - The relationship target
   * @returns {string|null} - Normalized path or null
   */
  return _createClass(LayoutParser, [{
    key: "parseLayout",
    value: (
    /**
     * Parse a slide layout and return its shapes and placeholder definitions
     * @param {string} layoutPath - Path to layout XML file
     * @returns {Promise<Object>} - Layout data with shapes and placeholders
     */
    function () {
      var _parseLayout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(layoutPath) {
        var layoutData, _doc$getElementsByTag2, layoutFileEntry, layoutFile, doc, layoutRelsPath, layoutRels, relsFileEntry, relsFile, relsDoc, masterRel, spTree, layoutTextStyles, _t2, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (!this.layoutCache.has(layoutPath)) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, this.layoutCache.get(layoutPath));
            case 1:
              layoutData = {
                shapes: [],
                // Allow multiple placeholders of the same type (e.g., multiple body boxes)
                placeholders: new Map(),
                textStyles: new Map(),
                masterPath: null,
                _placeholderMaxOrder: -1
              };
              _context5.p = 2;
              layoutFileEntry = this.zip.file(layoutPath);
              if (layoutFileEntry) {
                _context5.n = 3;
                break;
              }
              return _context5.a(2, layoutData);
            case 3:
              _context5.n = 4;
              return layoutFileEntry.async('string');
            case 4:
              layoutFile = _context5.v;
              doc = this.xmlParser.parseFromString(layoutFile, 'text/xml'); // Get layout relationships
              layoutRelsPath = layoutPath.replace('ppt/slideLayouts/', 'ppt/slideLayouts/_rels/').replace('.xml', '.xml.rels');
              layoutRels = [];
              _context5.p = 5;
              relsFileEntry = this.zip.file(layoutRelsPath);
              if (!relsFileEntry) {
                _context5.n = 7;
                break;
              }
              _context5.n = 6;
              return relsFileEntry.async('string');
            case 6:
              relsFile = _context5.v;
              relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
              layoutRels = Array.from(relsDoc.getElementsByTagName('Relationship'));

              // Find master relationship
              masterRel = layoutRels.find(function (r) {
                return (r.getAttribute('Type') || '').includes('slideMaster');
              });
              if (masterRel) {
                layoutData.masterPath = LayoutParser.resolveTarget(layoutPath, masterRel.getAttribute('Target'));
              }
            case 7:
              _context5.n = 9;
              break;
            case 8:
              _context5.p = 8;
              _t2 = _context5.v;
            case 9:
              // Parse shapes from layout
              spTree = (_doc$getElementsByTag2 = doc.getElementsByTagName('p:cSld')[0]) === null || _doc$getElementsByTag2 === void 0 ? void 0 : _doc$getElementsByTag2.getElementsByTagName('p:spTree')[0];
              if (spTree) {
                this.parseShapeTree(spTree, layoutRels, layoutData);
              }

              // Parse placeholder-level text styles defined directly on the layout
              layoutTextStyles = this.textStyleParser.parseLayoutPlaceholderStyles(doc);
              if (layoutTextStyles) {
                layoutData.textStyles = layoutTextStyles;
              }

              // Cache the result
              this.layoutCache.set(layoutPath, layoutData);
              return _context5.a(2, layoutData);
            case 10:
              _context5.p = 10;
              _t3 = _context5.v;
              console.warn('Error parsing layout:', _t3);
              return _context5.a(2, layoutData);
          }
        }, _callee5, this, [[5, 8], [2, 10]]);
      }));
      function parseLayout(_x11) {
        return _parseLayout.apply(this, arguments);
      }
      return parseLayout;
    }()
    /**
     * Parse a slide master and return its shapes
     * @param {string} masterPath - Path to master XML file
     * @returns {Promise<Object>} - Master data with shapes
     */
    )
  }, {
    key: "parseMaster",
    value: (function () {
      var _parseMaster = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(masterPath) {
        var masterData, _doc$getElementsByTag3, masterFileEntry, masterFile, doc, masterRelsPath, masterRels, relsFileEntry, relsFile, relsDoc, spTree, textStyles, _t4, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (!this.masterCache.has(masterPath)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, this.masterCache.get(masterPath));
            case 1:
              masterData = {
                shapes: [],
                placeholders: new Map(),
                _placeholderMaxOrder: -1
              };
              _context6.p = 2;
              masterFileEntry = this.zip.file(masterPath);
              if (masterFileEntry) {
                _context6.n = 3;
                break;
              }
              return _context6.a(2, masterData);
            case 3:
              _context6.n = 4;
              return masterFileEntry.async('string');
            case 4:
              masterFile = _context6.v;
              doc = this.xmlParser.parseFromString(masterFile, 'text/xml'); // Get master relationships
              masterRelsPath = masterPath.replace('ppt/slideMasters/', 'ppt/slideMasters/_rels/').replace('.xml', '.xml.rels');
              masterRels = [];
              _context6.p = 5;
              relsFileEntry = this.zip.file(masterRelsPath);
              if (!relsFileEntry) {
                _context6.n = 7;
                break;
              }
              _context6.n = 6;
              return relsFileEntry.async('string');
            case 6:
              relsFile = _context6.v;
              relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
              masterRels = Array.from(relsDoc.getElementsByTagName('Relationship'));
            case 7:
              _context6.n = 9;
              break;
            case 8:
              _context6.p = 8;
              _t4 = _context6.v;
            case 9:
              // Parse shapes from master
              spTree = (_doc$getElementsByTag3 = doc.getElementsByTagName('p:cSld')[0]) === null || _doc$getElementsByTag3 === void 0 ? void 0 : _doc$getElementsByTag3.getElementsByTagName('p:spTree')[0];
              if (spTree) {
                this.parseShapeTree(spTree, masterRels, masterData);
              }

              // Parse text styles from master (p:txStyles)
              textStyles = this.textStyleParser.parseTextStyles(doc);
              if (textStyles) {
                masterData.textStyles = textStyles;
                this.textStyleParser.cacheTextStyles(masterPath, textStyles);
              }

              // Cache the result
              this.masterCache.set(masterPath, masterData);
              return _context6.a(2, masterData);
            case 10:
              _context6.p = 10;
              _t5 = _context6.v;
              console.warn('Error parsing master:', _t5);
              return _context6.a(2, masterData);
          }
        }, _callee6, this, [[5, 8], [2, 10]]);
      }));
      function parseMaster(_x12) {
        return _parseMaster.apply(this, arguments);
      }
      return parseMaster;
    }()
    /**
     * Parse shape tree and populate data object with shapes and placeholders
     * @param {Element} spTree - Shape tree element
     * @param {Array} rels - Relationships array
     * @param {Object} data - Object to populate with shapes/placeholders
     */
    )
  }, {
    key: "parseShapeTree",
    value: function parseShapeTree(spTree, rels, data) {
      var children = Array.from(spTree.children);
      var addPlaceholder = function addPlaceholder(shapeData) {
        var key = shapeData.placeholderType || 'body';
        var existing = data.placeholders.get(key);
        if (Array.isArray(existing)) {
          existing.push(shapeData);
          data.placeholders.set(key, existing);
        } else if (existing) {
          data.placeholders.set(key, [existing, shapeData]);
        } else {
          data.placeholders.set(key, [shapeData]);
        }
      };
      var isFullSlideGroup = function isFullSlideGroup(grpSp) {
        var grpSpPr = grpSp === null || grpSp === void 0 ? void 0 : grpSp.getElementsByTagName('p:grpSpPr')[0];
        var xfrm = grpSpPr === null || grpSpPr === void 0 ? void 0 : grpSpPr.getElementsByTagName('a:xfrm')[0];
        if (!xfrm) return false;
        var off = xfrm.getElementsByTagName('a:off')[0];
        var ext = xfrm.getElementsByTagName('a:ext')[0];
        if (!off || !ext) return false;
        var x = parseInt(off.getAttribute('x') || '0', 10) / LayoutParser.SLIDE_WIDTH_EMU * 100;
        var y = parseInt(off.getAttribute('y') || '0', 10) / LayoutParser.SLIDE_HEIGHT_EMU * 100;
        var width = parseInt(ext.getAttribute('cx') || '0', 10) / LayoutParser.SLIDE_WIDTH_EMU * 100;
        var height = parseInt(ext.getAttribute('cy') || '0', 10) / LayoutParser.SLIDE_HEIGHT_EMU * 100;
        var tolPos = 1; // percent
        var tolSize = 98; // percent
        var nearZero = function nearZero(v) {
          return Math.abs(v) <= tolPos;
        };
        return nearZero(x) && nearZero(y) && width >= tolSize && height >= tolSize;
      };
      for (var childIndex = 0; childIndex < children.length; childIndex++) {
        var child = children[childIndex];
        var tagName = child.tagName;
        if (tagName === 'p:sp') {
          var shapeData = this.shapeParser.parseLayoutShape(child, rels, this.textStyleParser);
          if (shapeData) {
            if (shapeData.isPlaceholder) {
              var _data$_placeholderMax;
              addPlaceholder(shapeData);
              data._placeholderMaxOrder = Math.max((_data$_placeholderMax = data._placeholderMaxOrder) !== null && _data$_placeholderMax !== void 0 ? _data$_placeholderMax : -1, childIndex);
            } else {
              shapeData._treeOrder = childIndex;
              data.shapes.push(shapeData);
            }
          }
        } else if (tagName === 'p:pic') {
          var picData = this.shapeParser.parseLayoutPicture(child, rels);
          if (picData) {
            picData._treeOrder = childIndex;
            data.shapes.push(picData);
          }
        } else if (tagName === 'p:grpSp') {
          var _data$shapes;
          var groupIsBackground = isFullSlideGroup(child);
          var groupShapes = this.shapeParser.parseGroupShape(child, rels, this.textStyleParser);
          for (var i = 0; i < groupShapes.length; i++) {
            // Keep group children near the group's stacking position while
            // preserving their internal order.
            groupShapes[i]._treeOrder = childIndex + i / 1000;
            if (groupIsBackground) {
              groupShapes[i]._groupIsBackground = true;
            }
          }
          (_data$shapes = data.shapes).push.apply(_data$shapes, _toConsumableArray(groupShapes));
        } else if (tagName === 'p:cxnSp') {
          var cxnData = this.shapeParser.parseConnectionShape(child, rels);
          if (cxnData) {
            cxnData._treeOrder = childIndex;
            data.shapes.push(cxnData);
          }
        }
      }
    }

    /**
     * Get merged shapes for a slide (master + layout + slide shapes)
     * Shapes are ordered back-to-front: master shapes, layout shapes, then slide shapes
     * Each shape gets a zIndex for proper CSS stacking
     * @param {string} layoutPath - Path to the slide's layout
     * @param {Array} slideShapes - Shapes from the slide itself
     * @returns {Promise<Object>} - Object with merged shapes array and textStyles
     */
  }, {
    key: "getMergedShapes",
    value: (function () {
      var _getMergedShapes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(layoutPath) {
        var slideShapes,
          mergedShapes,
          zIndex,
          textStyles,
          masterPath,
          layoutData,
          masterData,
          isFullSlideBackgroundShape,
          sortByTreeOrder,
          splitSlideBackgrounds,
          splitByPlaceholderOrder,
          masterBg,
          masterFg,
          layoutBg,
          layoutFg,
          _split,
          split,
          masterBgSorted,
          masterFgSorted,
          layoutBgSorted,
          layoutFgSorted,
          _iterator22,
          _step22,
          shape,
          _iterator23,
          _step23,
          _shape,
          slideSplit,
          _iterator24,
          _step24,
          _shape2,
          _iterator25,
          _step25,
          _shape3,
          _iterator26,
          _step26,
          _shape4,
          _iterator27,
          _step27,
          _shape5,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              slideShapes = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : [];
              mergedShapes = [];
              zIndex = 0;
              textStyles = null;
              masterPath = null;
              layoutData = null;
              masterData = null;
              isFullSlideBackgroundShape = function isFullSlideBackgroundShape(shape) {
                // Only honor explicit background intent; avoid size heuristics that can misclassify foreground art.
                if (!shape || shape.isPlaceholder) return false;
                return shape._groupIsBackground === true || shape.type === 'background';
              };
              sortByTreeOrder = function sortByTreeOrder() {
                var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                return arr.slice().sort(function (a, b) {
                  var aOrder = typeof (a === null || a === void 0 ? void 0 : a._treeOrder) === 'number' ? a._treeOrder : Number.POSITIVE_INFINITY;
                  var bOrder = typeof (b === null || b === void 0 ? void 0 : b._treeOrder) === 'number' ? b._treeOrder : Number.POSITIVE_INFINITY;
                  if (aOrder !== bOrder) return aOrder - bOrder;
                  return 0;
                });
              };
              splitSlideBackgrounds = function splitSlideBackgrounds(shapes) {
                var bg = [];
                var fg = [];
                var _iterator20 = _createForOfIteratorHelper(shapes || []),
                  _step20;
                try {
                  for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                    var shape = _step20.value;
                    if (isFullSlideBackgroundShape(shape)) bg.push(shape);else fg.push(shape);
                  }
                } catch (err) {
                  _iterator20.e(err);
                } finally {
                  _iterator20.f();
                }
                return {
                  bg: sortByTreeOrder(bg),
                  fg: sortByTreeOrder(fg)
                };
              };
              splitByPlaceholderOrder = function splitByPlaceholderOrder(data) {
                var shapes = (data === null || data === void 0 ? void 0 : data.shapes) || [];
                var maxPh = typeof (data === null || data === void 0 ? void 0 : data._placeholderMaxOrder) === 'number' ? data._placeholderMaxOrder : -1;
                if (maxPh < 0) {
                  return {
                    bg: shapes.slice(),
                    fg: []
                  };
                }
                var bg = [];
                var fg = [];
                var _iterator21 = _createForOfIteratorHelper(shapes),
                  _step21;
                try {
                  for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                    var shape = _step21.value;
                    if (isFullSlideBackgroundShape(shape)) {
                      bg.push(shape);
                      continue;
                    }
                    var order = typeof shape._treeOrder === 'number' ? shape._treeOrder : -1;
                    if (order > maxPh) fg.push(shape);else bg.push(shape);
                  }
                } catch (err) {
                  _iterator21.e(err);
                } finally {
                  _iterator21.f();
                }
                return {
                  bg: sortByTreeOrder(bg),
                  fg: sortByTreeOrder(fg)
                };
              };
              masterBg = [];
              masterFg = [];
              layoutBg = [];
              layoutFg = [];
              if (!layoutPath) {
                _context7.n = 4;
                break;
              }
              _context7.n = 1;
              return this.parseLayout(layoutPath);
            case 1:
              layoutData = _context7.v;
              if (!layoutData.masterPath) {
                _context7.n = 3;
                break;
              }
              masterPath = layoutData.masterPath;
              _context7.n = 2;
              return this.parseMaster(layoutData.masterPath);
            case 2:
              masterData = _context7.v;
              // Get text styles from master
              textStyles = masterData.textStyles || null;
              _split = splitByPlaceholderOrder(masterData);
              masterBg = _split.bg;
              masterFg = _split.fg;
            case 3:
              split = splitByPlaceholderOrder(layoutData);
              layoutBg = split.bg;
              layoutFg = split.fg;
            case 4:
              // Merge order: background graphics -> slide content -> foreground graphics
              masterBgSorted = sortByTreeOrder(masterBg);
              masterFgSorted = sortByTreeOrder(masterFg);
              layoutBgSorted = sortByTreeOrder(layoutBg);
              layoutFgSorted = sortByTreeOrder(layoutFg);
              _iterator22 = _createForOfIteratorHelper(masterBgSorted);
              try {
                for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                  shape = _step22.value;
                  shape.zIndex = zIndex++;
                  shape.layer = 'master-bg';
                  mergedShapes.push(shape);
                }
              } catch (err) {
                _iterator22.e(err);
              } finally {
                _iterator22.f();
              }
              _iterator23 = _createForOfIteratorHelper(layoutBgSorted);
              try {
                for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
                  _shape = _step23.value;
                  _shape.zIndex = zIndex++;
                  _shape.layer = 'layout-bg';
                  mergedShapes.push(_shape);
                }
              } catch (err) {
                _iterator23.e(err);
              } finally {
                _iterator23.f();
              }
              slideSplit = splitSlideBackgrounds(slideShapes);
              _iterator24 = _createForOfIteratorHelper(slideSplit.bg);
              try {
                for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
                  _shape2 = _step24.value;
                  this.applyPlaceholderDefaults(_shape2, layoutData, masterData);
                  _shape2.zIndex = zIndex++;
                  _shape2.layer = 'slide-bg';
                  mergedShapes.push(_shape2);
                }
              } catch (err) {
                _iterator24.e(err);
              } finally {
                _iterator24.f();
              }
              _iterator25 = _createForOfIteratorHelper(slideSplit.fg);
              try {
                for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
                  _shape3 = _step25.value;
                  this.applyPlaceholderDefaults(_shape3, layoutData, masterData);
                  _shape3.zIndex = zIndex++;
                  _shape3.layer = 'slide';
                  mergedShapes.push(_shape3);
                }
              } catch (err) {
                _iterator25.e(err);
              } finally {
                _iterator25.f();
              }
              _iterator26 = _createForOfIteratorHelper(layoutFgSorted);
              try {
                for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
                  _shape4 = _step26.value;
                  _shape4.zIndex = zIndex++;
                  _shape4.layer = 'layout-fg';
                  mergedShapes.push(_shape4);
                }
              } catch (err) {
                _iterator26.e(err);
              } finally {
                _iterator26.f();
              }
              _iterator27 = _createForOfIteratorHelper(masterFgSorted);
              try {
                for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
                  _shape5 = _step27.value;
                  _shape5.zIndex = zIndex++;
                  _shape5.layer = 'master-fg';
                  mergedShapes.push(_shape5);
                }
              } catch (err) {
                _iterator27.e(err);
              } finally {
                _iterator27.f();
              }
              return _context7.a(2, {
                shapes: mergedShapes,
                textStyles: textStyles,
                masterPath: masterPath
              });
          }
        }, _callee7, this);
      }));
      function getMergedShapes(_x13) {
        return _getMergedShapes.apply(this, arguments);
      }
      return getMergedShapes;
    }()
    /**
     * Get text style for a placeholder type and level
     * @param {string} masterPath - Path to master
     * @param {string} placeholderType - Type of placeholder (title, body, etc.)
     * @param {number} level - Text level (1-9, default 1)
     * @returns {Object|null} - Formatting object or null
     */
    )
  }, {
    key: "getTextStyleForPlaceholder",
    value: function getTextStyleForPlaceholder(masterPath, placeholderType) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return this.textStyleParser.getTextStyleForPlaceholder(masterPath, placeholderType, level);
    }

    /**
     * Get default text formatting for a placeholder type
     * @param {string} masterPath - Path to master slide
     * @param {string} placeholderType - Placeholder type (title, body, etc.)
     * @param {number} level - Text level (1-9)
     * @returns {Object} - Formatting defaults
     */
  }, {
    key: "getTextDefaults",
    value: function getTextDefaults(masterPath, placeholderType) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var layoutPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var placeholderIdx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      // Start with theme + master defaults
      var defaults = this.textStyleParser.getTextDefaults(masterPath, placeholderType, level) || {};

      // Apply layout-level overrides (placeholder lstStyle/defRPr)
      if (layoutPath) {
        var layoutInfo = this.layoutCache.get(layoutPath);
        var layoutStyles = layoutInfo === null || layoutInfo === void 0 ? void 0 : layoutInfo.textStyles;
        var placeholderKey = placeholderIdx !== null && placeholderIdx !== undefined ? "".concat(placeholderType, ":").concat(placeholderIdx) : placeholderType;
        var placeholderStyles = (layoutStyles === null || layoutStyles === void 0 ? void 0 : layoutStyles.get(placeholderKey)) || (layoutStyles === null || layoutStyles === void 0 ? void 0 : layoutStyles.get(placeholderType)) || null;
        var levelStyle = placeholderStyles ? placeholderStyles[level] || placeholderStyles[1] || placeholderStyles.default || null : null;
        if (levelStyle) {
          if (levelStyle.fontSize) defaults.fontSize = levelStyle.fontSize;
          if (levelStyle.fontFamily) defaults.fontFamily = levelStyle.fontFamily;
          if (levelStyle.color) defaults.color = levelStyle.color;
          if (levelStyle.bold !== null && levelStyle.bold !== undefined) defaults.bold = levelStyle.bold;
          if (levelStyle.italic !== null && levelStyle.italic !== undefined) defaults.italic = levelStyle.italic;
          if (levelStyle.align) defaults.align = levelStyle.align;
          if (levelStyle.marLEm !== null && levelStyle.marLEm !== undefined) defaults.marLEm = levelStyle.marLEm;
          if (levelStyle.indentEm !== null && levelStyle.indentEm !== undefined) defaults.indentEm = levelStyle.indentEm;
          if (levelStyle.spaceBeforeEm !== null && levelStyle.spaceBeforeEm !== undefined) defaults.spaceBeforeEm = levelStyle.spaceBeforeEm;
          if (levelStyle.spaceAfterEm !== null && levelStyle.spaceAfterEm !== undefined) defaults.spaceAfterEm = levelStyle.spaceAfterEm;
          if (levelStyle.lineHeight !== null && levelStyle.lineHeight !== undefined) defaults.lineHeight = levelStyle.lineHeight;
        }
      }
      return defaults;
    }

    /**
     * Clear caches (call when loading new file)
     */
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.layoutCache.clear();
      this.masterCache.clear();
      this.textStyleParser.clearCache();
    }
    /**
     * Apply placeholder defaults (fill/stroke) from layout/master placeholders to slide shapes
     * @param {Object} shape - Slide shape
     * @param {Object} layoutData - Parsed layout data
     * @param {Object} masterData - Parsed master data
     */
  }, {
    key: "applyPlaceholderDefaults",
    value: function applyPlaceholderDefaults(shape, layoutData, masterData) {
      if (!shape || !shape.isPlaceholder) return;
      var placeholder = this.findPlaceholderDefinition(shape, layoutData, masterData);
      if (!placeholder) return;

      // Many slides omit full transform info for placeholder shapes.
      // In PowerPoint, the layout/master placeholder defines the actual box position/size.
      // If the slide shape doesn't have explicit EMU transform values, inherit them.
      // Treat zero/invalid sizes as missing so we can inherit real geometry from the layout/master placeholder
      var hasX = Number.isFinite(shape.xEMU) || Number.isFinite(shape.x);
      var hasY = Number.isFinite(shape.yEMU) || Number.isFinite(shape.y);
      var hasW = typeof shape.cxEMU === 'number' && shape.cxEMU > 0 || typeof shape.width === 'number' && shape.width > 0;
      var hasH = typeof shape.cyEMU === 'number' && shape.cyEMU > 0 || typeof shape.height === 'number' && shape.height > 0;
      if ((!hasX || !hasY || !hasW || !hasH) && placeholder) {
        if (typeof shape.xEMU !== 'number' && typeof placeholder.x === 'number') {
          shape.x = placeholder.x;
          if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_WIDTH_EMU) {
            shape.xEMU = Math.round(placeholder.x / 100 * ShapeParser.SLIDE_WIDTH_EMU);
          }
        }
        if (typeof shape.yEMU !== 'number' && typeof placeholder.y === 'number') {
          shape.y = placeholder.y;
          if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_HEIGHT_EMU) {
            shape.yEMU = Math.round(placeholder.y / 100 * ShapeParser.SLIDE_HEIGHT_EMU);
          }
        }
        if (typeof shape.cxEMU !== 'number' && typeof placeholder.width === 'number') {
          shape.width = placeholder.width;
          if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_WIDTH_EMU) {
            shape.cxEMU = Math.round(placeholder.width / 100 * ShapeParser.SLIDE_WIDTH_EMU);
          }
        }
        if (typeof shape.cyEMU !== 'number' && typeof placeholder.height === 'number') {
          shape.height = placeholder.height;
          if (typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_HEIGHT_EMU) {
            shape.cyEMU = Math.round(placeholder.height / 100 * ShapeParser.SLIDE_HEIGHT_EMU);
          }
        }
      }
      if (!shape.fill && placeholder.fill) {
        shape.fill = placeholder.fill;
      }
      if ((shape.stroke === null || shape.stroke === undefined) && placeholder.stroke) {
        shape.stroke = placeholder.stroke;
      }
      if ((!shape.strokeWidth || shape.strokeWidth === 1) && placeholder.strokeWidth) {
        shape.strokeWidth = placeholder.strokeWidth;
      }

      // Inherit text box properties (anchor, wrap, insets) when slide shape omits them
      if (!shape.textVAlign && placeholder.textVAlign) {
        shape.textVAlign = placeholder.textVAlign;
      }
      if (shape.textWrap === undefined && placeholder.textWrap !== undefined) {
        shape.textWrap = placeholder.textWrap;
      }
      if (!shape.textInsetsEMU && placeholder.textInsetsEMU) {
        shape.textInsetsEMU = {
          left: placeholder.textInsetsEMU.left,
          right: placeholder.textInsetsEMU.right,
          top: placeholder.textInsetsEMU.top,
          bottom: placeholder.textInsetsEMU.bottom
        };
      }
    }

    /**
     * Locate placeholder definition from layout/master
     * @param {Object} shape - Slide shape
     * @param {Object} layoutData - Parsed layout data
     * @param {Object} masterData - Parsed master data
     * @returns {Object|null} - Matching placeholder definition
     */
  }, {
    key: "findPlaceholderDefinition",
    value: function findPlaceholderDefinition(shape, layoutData, masterData) {
      var normalize = function normalize(value) {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
      };
      var matchFromMap = function matchFromMap(map) {
        if (!map) return null;
        var candidates = normalize(map.get(shape.placeholderType));
        // Prefer exact idx match when present
        if (shape.placeholderIdx) {
          var byIdx = candidates.find(function (p) {
            return p && p.placeholderIdx && p.placeholderIdx === shape.placeholderIdx;
          });
          if (byIdx) return byIdx;
        }
        if (candidates.length > 0) return candidates[0];

        // Fallback: search all placeholders for matching idx
        if (shape.placeholderIdx) {
          var _iterator28 = _createForOfIteratorHelper(map.values()),
            _step28;
          try {
            for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
              var value = _step28.value;
              var arr = normalize(value);
              var hit = arr.find(function (p) {
                return p && p.placeholderIdx && p.placeholderIdx === shape.placeholderIdx;
              });
              if (hit) return hit;
            }
          } catch (err) {
            _iterator28.e(err);
          } finally {
            _iterator28.f();
          }
        }
        return null;
      };
      return matchFromMap(layoutData === null || layoutData === void 0 ? void 0 : layoutData.placeholders) || matchFromMap(masterData === null || masterData === void 0 ? void 0 : masterData.placeholders) || null;
    }
  }], [{
    key: "resolveTarget",
    value: function resolveTarget(basePath, target) {
      if (!basePath || !target) return null;

      // Absolute target within the package (e.g. "/ppt/slideLayouts/slideLayout1.xml")
      if (target.startsWith('/')) {
        return target.replace(/^\/+/, '');
      }

      // If target is already absolute within ppt/, just prefix if missing
      if (!target.startsWith('..') && !target.startsWith('/')) {
        var baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
        return (baseDir + target).replace(/\/+/g, '/');
      }
      var baseParts = basePath.split('/');
      baseParts.pop(); // remove file name
      var targetParts = target.split('/');
      var _iterator29 = _createForOfIteratorHelper(targetParts),
        _step29;
      try {
        for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
          var part = _step29.value;
          if (part === '..') {
            baseParts.pop();
          } else if (part === '.' || part === '') {
            continue;
          } else {
            baseParts.push(part);
          }
        }
      } catch (err) {
        _iterator29.e(err);
      } finally {
        _iterator29.f();
      }
      return baseParts.join('/');
    }
  }]);
}(); // Export for use in other modules
// Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
_defineProperty(LayoutParser, "SLIDE_WIDTH_EMU", 9144000);
_defineProperty(LayoutParser, "SLIDE_HEIGHT_EMU", 5143500);
window.LayoutParser = LayoutParser;

/* === parsers/pptx/chart-parser.js === */
/**
 * ChartParser
 * Minimal PowerPoint chart XML parser for common chart types (column, line, area, pie, doughnut).
 * Extracts series, categories, values, and hole size for doughnut charts.
 */
var ChartParser = /*#__PURE__*/function () {
  function ChartParser() {
    var backgroundExtractor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var themeExtractor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck(this, ChartParser);
    this.COLOR_PALETTE = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'];
    this.backgroundExtractor = backgroundExtractor;
    this.themeExtractor = themeExtractor;
  }
  return _createClass(ChartParser, [{
    key: "parseChart",
    value: function () {
      var _parseChart = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(zip, chartPath) {
        var file, xml, doc, chartSpace, plotArea, typeInfo, categories, series, holeSize, stacking, barDir, gapWidth, overlap, legend, axes;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(!zip || !chartPath)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, null);
            case 1:
              file = zip.file(chartPath.replace(/^\//, ''));
              if (file) {
                _context8.n = 2;
                break;
              }
              return _context8.a(2, null);
            case 2:
              _context8.n = 3;
              return file.async('string');
            case 3:
              xml = _context8.v;
              doc = new DOMParser().parseFromString(xml, 'text/xml');
              chartSpace = doc.getElementsByTagName('c:chartSpace')[0];
              if (chartSpace) {
                _context8.n = 4;
                break;
              }
              return _context8.a(2, null);
            case 4:
              plotArea = chartSpace.getElementsByTagName('c:plotArea')[0];
              if (plotArea) {
                _context8.n = 5;
                break;
              }
              return _context8.a(2, null);
            case 5:
              typeInfo = this.detectChartType(plotArea);
              if (typeInfo) {
                _context8.n = 6;
                break;
              }
              return _context8.a(2, null);
            case 6:
              categories = this.extractCategories(typeInfo.catRef, typeInfo.catLit);
              series = this.extractSeries(typeInfo.seriesNodes, categories);
              holeSize = this.extractHoleSize(plotArea);
              stacking = typeInfo.stacking || 'none';
              barDir = typeInfo.barDir || 'column';
              gapWidth = typeInfo.gapWidth;
              overlap = typeInfo.overlap;
              legend = this.extractLegend(chartSpace);
              axes = this.extractAxes(plotArea);
              return _context8.a(2, {
                chartType: typeInfo.kind,
                categories: categories,
                series: series,
                holeSize: holeSize,
                stacking: stacking,
                barDir: barDir,
                gapWidth: gapWidth,
                overlap: overlap,
                legend: legend,
                axes: axes
              });
          }
        }, _callee8, this);
      }));
      function parseChart(_x14, _x15) {
        return _parseChart.apply(this, arguments);
      }
      return parseChart;
    }()
  }, {
    key: "detectChartType",
    value: function detectChartType(plotArea) {
      var chartKinds = [{
        tag: 'c:barChart',
        kind: 'column'
      }, {
        tag: 'c:lineChart',
        kind: 'line'
      }, {
        tag: 'c:areaChart',
        kind: 'area'
      }, {
        tag: 'c:pieChart',
        kind: 'pie'
      }, {
        tag: 'c:doughnutChart',
        kind: 'doughnut'
      }];
      for (var _i3 = 0, _chartKinds = chartKinds; _i3 < _chartKinds.length; _i3++) {
        var c = _chartKinds[_i3];
        var node = plotArea.getElementsByTagName(c.tag)[0];
        if (node) {
          var _node$getElementsByTa, _node$getElementsByTa2;
          var seriesNodes = Array.from(node.getElementsByTagName('c:ser'));
          var catRef = (_node$getElementsByTa = node.getElementsByTagName('c:cat')[0]) === null || _node$getElementsByTa === void 0 ? void 0 : _node$getElementsByTa.getElementsByTagName('c:strRef')[0];
          var catLit = (_node$getElementsByTa2 = node.getElementsByTagName('c:cat')[0]) === null || _node$getElementsByTa2 === void 0 ? void 0 : _node$getElementsByTa2.getElementsByTagName('c:strLit')[0];
          var stacking = this.detectStacking(c.kind, node);
          var barDir = this.detectBarDir(c.kind, node);
          var gapWidth = this.detectGapWidth(node);
          var overlap = this.detectOverlap(node);
          return {
            kind: c.kind,
            node: node,
            seriesNodes: seriesNodes,
            catRef: catRef,
            catLit: catLit,
            stacking: stacking,
            barDir: barDir,
            gapWidth: gapWidth,
            overlap: overlap
          };
        }
      }
      return null;
    }
  }, {
    key: "detectStacking",
    value: function detectStacking(kind, node) {
      var _node$getElementsByTa3;
      if (kind !== 'column') return 'none';
      var grouping = ((_node$getElementsByTa3 = node.getElementsByTagName('c:grouping')[0]) === null || _node$getElementsByTa3 === void 0 ? void 0 : _node$getElementsByTa3.getAttribute('val')) || 'clustered';
      if (grouping === 'stacked') return 'stacked';
      if (grouping === 'percentStacked') return 'percent';
      return 'none';
    }
  }, {
    key: "detectBarDir",
    value: function detectBarDir(kind, node) {
      var _node$getElementsByTa4;
      if (kind !== 'column') return 'column';
      var dir = ((_node$getElementsByTa4 = node.getElementsByTagName('c:barDir')[0]) === null || _node$getElementsByTa4 === void 0 ? void 0 : _node$getElementsByTa4.getAttribute('val')) || 'col';
      return dir === 'bar' ? 'bar' : 'column';
    }
  }, {
    key: "detectGapWidth",
    value: function detectGapWidth(node) {
      var gapWidthEl = node.getElementsByTagName('c:gapWidth')[0];
      if (!gapWidthEl) return null;
      var val = parseInt(gapWidthEl.getAttribute('val') || '0', 10);
      return Number.isNaN(val) ? null : val; // PowerPoint uses 0-500
    }
  }, {
    key: "detectOverlap",
    value: function detectOverlap(node) {
      var overlapEl = node.getElementsByTagName('c:overlap')[0];
      if (!overlapEl) return null;
      var val = parseInt(overlapEl.getAttribute('val') || '0', 10);
      return Number.isNaN(val) ? null : Math.max(-100, Math.min(100, val));
    }
  }, {
    key: "extractCategories",
    value: function extractCategories(catRef, catLit) {
      // Prefer cached string values; fallback to literal, respecting pt idx
      var getPts = function getPts(parent) {
        var _parent$getElementsBy;
        if (!parent) return [];
        var cache = parent.getElementsByTagName('c:strCache')[0];
        var pts = cache ? cache.getElementsByTagName('c:pt') : parent.getElementsByTagName('c:pt');
        if (!pts || pts.length === 0) return [];
        var ptCountAttr = (_parent$getElementsBy = parent.getElementsByTagName('c:ptCount')[0]) === null || _parent$getElementsBy === void 0 ? void 0 : _parent$getElementsBy.getAttribute('val');
        var count = ptCountAttr ? parseInt(ptCountAttr, 10) : pts.length;
        var arr = new Array(Number.isFinite(count) ? count : pts.length).fill('');
        Array.from(pts).forEach(function (pt, idx) {
          var _pt$getElementsByTagN;
          var idxAttr = pt.getAttribute('idx');
          var targetIdx = idxAttr !== null ? parseInt(idxAttr, 10) : idx;
          var val = ((_pt$getElementsByTagN = pt.getElementsByTagName('c:v')[0]) === null || _pt$getElementsByTagN === void 0 ? void 0 : _pt$getElementsByTagN.textContent) || '';
          if (Number.isFinite(targetIdx) && targetIdx >= 0 && targetIdx < arr.length) {
            arr[targetIdx] = val;
          }
        });
        return arr;
      };
      var vals = getPts(catRef);
      if (vals.length > 0) return vals;
      return getPts(catLit);
    }
  }, {
    key: "extractSeries",
    value: function extractSeries(seriesNodes, categories) {
      var _this4 = this;
      var series = [];
      seriesNodes.forEach(function (serNode, idx) {
        var name = _this4.extractSeriesName(serNode) || "Series ".concat(idx + 1);
        var vals = _this4.extractSeriesValues(serNode, categories.length);
        var color = _this4.extractSeriesColor(serNode);

        // If no explicit color, try theme accent colors based on series index
        if (!color && _this4.themeExtractor) {
          // PowerPoint uses accent1-6 for series colors
          var accentIdx = idx % 6 + 1;
          var themeColor = _this4.themeExtractor.getSchemeColor("accent".concat(accentIdx));
          if (themeColor) {
            color = themeColor;
          }
        }

        // Fall back to default palette if still no color
        if (!color) {
          color = _this4.COLOR_PALETTE[idx % _this4.COLOR_PALETTE.length];
        }
        series.push({
          name: name,
          values: vals,
          color: color
        });
      });
      return series;
    }
  }, {
    key: "extractSeriesName",
    value: function extractSeriesName(serNode) {
      var tx = serNode.getElementsByTagName('c:tx')[0];
      if (!tx) return null;
      var strRef = tx.getElementsByTagName('c:strRef')[0];
      if (strRef) {
        var _pt$getElementsByTagN2;
        var cache = strRef.getElementsByTagName('c:strCache')[0];
        var pt = cache === null || cache === void 0 ? void 0 : cache.getElementsByTagName('c:pt')[0];
        return (pt === null || pt === void 0 || (_pt$getElementsByTagN2 = pt.getElementsByTagName('c:v')[0]) === null || _pt$getElementsByTagN2 === void 0 ? void 0 : _pt$getElementsByTagN2.textContent) || null;
      }
      var v = tx.getElementsByTagName('c:v')[0];
      return v ? v.textContent : null;
    }
  }, {
    key: "extractSeriesValues",
    value: function extractSeriesValues(serNode, catCount) {
      var valNode = serNode.getElementsByTagName('c:val')[0];
      if (!valNode) return new Array(catCount).fill(0);
      var numRef = valNode.getElementsByTagName('c:numRef')[0];
      var numLit = valNode.getElementsByTagName('c:numLit')[0];
      var readPts = function readPts(parent) {
        if (!parent) return null;
        var cache = parent.getElementsByTagName('c:numCache')[0];
        var pts = cache ? cache.getElementsByTagName('c:pt') : parent.getElementsByTagName('c:pt');
        if (!pts || pts.length === 0) return null;
        var arr = new Array(catCount).fill(0);
        Array.from(pts).forEach(function (pt, seqIdx) {
          var _pt$getElementsByTagN3;
          var idxAttr = pt.getAttribute('idx');
          var targetIdx = idxAttr !== null ? parseInt(idxAttr, 10) : seqIdx;
          var val = parseFloat(((_pt$getElementsByTagN3 = pt.getElementsByTagName('c:v')[0]) === null || _pt$getElementsByTagN3 === void 0 ? void 0 : _pt$getElementsByTagN3.textContent) || '0');
          if (Number.isFinite(targetIdx) && targetIdx >= 0 && targetIdx < arr.length) {
            arr[targetIdx] = Number.isFinite(val) ? val : 0;
          }
        });
        return arr;
      };
      var vals = readPts(numRef) || readPts(numLit);
      if (vals) return vals;
      return new Array(catCount).fill(0);
    }
  }, {
    key: "extractSeriesColor",
    value: function extractSeriesColor(serNode) {
      var spPr = serNode.getElementsByTagName('c:spPr')[0] || serNode.getElementsByTagName('a:spPr')[0];
      if (!spPr) return null;
      var solidFill = spPr.getElementsByTagName('a:solidFill')[0];
      if (solidFill && this.backgroundExtractor && typeof this.backgroundExtractor.extractColor === 'function') {
        var c = this.backgroundExtractor.extractColor(solidFill);
        if (c) return c;
      }
      var gradFill = spPr.getElementsByTagName('a:gradFill')[0];
      if (gradFill && this.backgroundExtractor && typeof this.backgroundExtractor.extractGradient === 'function') {
        var _g$stops$;
        var g = this.backgroundExtractor.extractGradient(gradFill);
        if (g && Array.isArray(g.stops) && (_g$stops$ = g.stops[0]) !== null && _g$stops$ !== void 0 && _g$stops$.color) {
          return g.stops[0].color;
        }
      }
      var ln = spPr.getElementsByTagName('a:ln')[0];
      if (ln && this.backgroundExtractor && typeof this.backgroundExtractor.extractColor === 'function') {
        var _c = this.backgroundExtractor.extractColor(ln);
        if (_c) return _c;
      }
      return null;
    }
  }, {
    key: "extractHoleSize",
    value: function extractHoleSize(plotArea) {
      var doughnut = plotArea.getElementsByTagName('c:doughnutChart')[0];
      if (!doughnut) return 0;
      var hole = doughnut.getElementsByTagName('c:holeSize')[0];
      if (hole && hole.getAttribute('val')) {
        var val = parseInt(hole.getAttribute('val'), 10);
        if (!Number.isNaN(val)) return Math.min(90, Math.max(0, val));
      }
      return 50; // default 50% hole
    }
  }, {
    key: "extractLegend",
    value: function extractLegend(chartSpace) {
      var _legend$getElementsBy, _legend$getElementsBy2;
      var legend = chartSpace.getElementsByTagName('c:legend')[0];
      if (!legend) return {
        position: 'r',
        overlay: false
      };
      var pos = ((_legend$getElementsBy = legend.getElementsByTagName('c:legendPos')[0]) === null || _legend$getElementsBy === void 0 ? void 0 : _legend$getElementsBy.getAttribute('val')) || 'r';
      var overlayVal = (_legend$getElementsBy2 = legend.getElementsByTagName('c:overlay')[0]) === null || _legend$getElementsBy2 === void 0 ? void 0 : _legend$getElementsBy2.getAttribute('val');
      var overlay = overlayVal === '1' || overlayVal === 'true';
      return {
        position: pos,
        overlay: overlay
      };
    }
  }, {
    key: "extractAxes",
    value: function extractAxes(plotArea) {
      var valueAxis = plotArea.getElementsByTagName('c:valAx')[0];
      var axis = {
        value: {}
      };
      if (valueAxis) {
        var scaling = valueAxis.getElementsByTagName('c:scaling')[0];
        if (scaling) {
          var minEl = scaling.getElementsByTagName('c:min')[0];
          var maxEl = scaling.getElementsByTagName('c:max')[0];
          var minVal = minEl ? parseFloat(minEl.getAttribute('val')) : null;
          var maxVal = maxEl ? parseFloat(maxEl.getAttribute('val')) : null;
          if (!Number.isNaN(minVal)) axis.value.min = minVal;
          if (!Number.isNaN(maxVal)) axis.value.max = maxVal;
        }
        var numFmt = valueAxis.getElementsByTagName('c:numFmt')[0];
        var formatCode = numFmt ? numFmt.getAttribute('formatCode') : null;
        if (formatCode) {
          axis.value.formatCode = formatCode;
        }
      }
      return axis;
    }
  }]);
}(); // Export
window.ChartParser = ChartParser;

/* === parsers/pptx-parser.js === */
/**
 * PPTX Parser Module
 * Main orchestrator for parsing PowerPoint files
 * Coordinates all parsing modules (XML, Theme, Background, Shape, Text extraction)
 */

/**
 * PPTX Parser Module (Core)
 * Main orchestrator for parsing PowerPoint files
 * Coordinates all parsing modules (XML, Theme, Background, Shape, Text extraction)
 */
var PPTXParser = /*#__PURE__*/function () {
  /**
   * Create a PPTX Parser
   */
  function PPTXParser() {
    _classCallCheck(this, PPTXParser);
    this.zip = null;
    this.xmlParser = new DOMParser();
    this.themeExtractor = null;
    this.backgroundExtractor = null;
    this.shapeParser = null;
    this.textExtractor = null;
    this.layoutParser = null;
    this.tableParser = null;
    this.chartParser = null;
    this._chartDataCache = new Map();
    this.slides = [];
    this.slideLayouts = [];
    this.slideMasters = [];
    this.theme = null;
    this.images = {};
    this.presentation = null;
  }

  /**
   * Parse a PPTX file
   * @param {File|Blob} file - The PPTX file to parse
   * @returns {Promise<Object>} - Parsed presentation data
   */
  return _createClass(PPTXParser, [{
    key: "parse",
    value: (function () {
      var _parse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(file) {
        var _t6;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              // Reset state for new file
              this.reset();

              // Load the ZIP file
              _context9.n = 1;
              return JSZip.loadAsync(file);
            case 1:
              this.zip = _context9.v;
              _context9.n = 2;
              return this.loadImages();
            case 2:
              _context9.n = 3;
              return this.parsePresentation();
            case 3:
              _context9.n = 4;
              return this.parseTheme();
            case 4:
              _context9.n = 5;
              return this.parseSlides();
            case 5:
              return _context9.a(2, {
                slides: this.slides,
                theme: this.theme,
                images: this.images,
                presentation: this.presentation
              });
            case 6:
              _context9.p = 6;
              _t6 = _context9.v;
              console.error('Error parsing PPTX:', _t6);
              throw _t6;
            case 7:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 6]]);
      }));
      function parse(_x16) {
        return _parse.apply(this, arguments);
      }
      return parse;
    }()
    /**
     * Reset parser state for loading a new file
     * @private
     */
    )
  }, {
    key: "reset",
    value: function reset() {
      // Revoke old image blob URLs to prevent memory leaks
      Object.values(this.images).forEach(function (url) {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      });

      // Clear layout parser cache if exists
      if (this.layoutParser) {
        this.layoutParser.clearCache();
      }
      this.zip = null;
      this.themeExtractor = null;
      this.backgroundExtractor = null;
      this.shapeParser = null;
      this.textExtractor = null;
      this.layoutParser = null;
      this.tableParser = null;
      this.chartParser = null;
      this._chartDataCache = new Map();
      this.slides = [];
      this.slideLayouts = [];
      this.slideMasters = [];
      this.theme = null;
      this.images = {};
      this.presentation = null;
    }

    /**
     * Get parsed slides
     * @returns {Array<Object>} - Array of parsed slides
     */
  }, {
    key: "getSlides",
    value: function getSlides() {
      return this.slides;
    }

    /**
     * Get theme data
     * @returns {Object} - Theme object
     */
  }, {
    key: "getTheme",
    value: function getTheme() {
      return this.theme;
    }

    /**
     * Get images
     * @returns {Object} - Map of image names to blob URLs
     */
  }, {
    key: "getImages",
    value: function getImages() {
      return this.images;
    }
  }]);
}(); // Standard PowerPoint slide dimensions in EMUs (16:9 ratio)
PPTXParser.SLIDE_WIDTH_EMU = 9144000;
PPTXParser.SLIDE_HEIGHT_EMU = 5143500;

/**
 * Resolve a relationship target against a base path (handles ../ segments)
 * @param {string} basePath - The referencing file path
 * @param {string} target - The relationship target
 * @returns {string|null} - Normalized path or null
 */
PPTXParser.resolveTarget = function (basePath, target) {
  if (!basePath || !target) return null;

  // Absolute target within the package (e.g. "/ppt/slideLayouts/slideLayout1.xml")
  if (target.startsWith('/')) {
    return target.replace(/^\/+/, '');
  }
  var baseParts = basePath.split('/');
  baseParts.pop(); // remove file name
  var targetParts = target.split('/');
  var _iterator30 = _createForOfIteratorHelper(targetParts),
    _step30;
  try {
    for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
      var part = _step30.value;
      if (part === '..') {
        baseParts.pop();
      } else if (part === '.' || part === '') {
        continue;
      } else {
        baseParts.push(part);
      }
    }
  } catch (err) {
    _iterator30.e(err);
  } finally {
    _iterator30.f();
  }
  return baseParts.join('/');
};

// Export for use in other modules
window.PPTXParser = PPTXParser;

/* === parsers/pptx/pptx-presentation-parser.js === */
/**
 * PPTX Parser - Presentation + Theme
 * Extends PPTXParser with presentation and theme parsing logic
 */

PPTXParser.prototype.loadImages = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
  var mediaFolder, createEmfPlaceholder, emfConverter, convertEmfBlobToSvgUrl, files, _i4, _files, filePath, file, blob, fileName, ext, svgUrl, url, _t8;
  return _regenerator().w(function (_context10) {
    while (1) switch (_context10.p = _context10.n) {
      case 0:
        mediaFolder = this.zip.folder('ppt/media');
        if (mediaFolder) {
          _context10.n = 1;
          break;
        }
        return _context10.a(2);
      case 1:
        createEmfPlaceholder = function createEmfPlaceholder(label) {
          var safeLabel = (label || 'EMF image').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"200\" viewBox=\"0 0 400 200\" role=\"img\" aria-label=\"".concat(safeLabel, " unsupported\"><rect width=\"400\" height=\"200\" fill=\"#f3f4f6\" stroke=\"#d1d5db\"/><text x=\"200\" y=\"80\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-size=\"18\" fill=\"#4b5563\">EMF not rendered</text><text x=\"200\" y=\"120\" text-anchor=\"middle\" font-family=\"Arial, sans-serif\" font-size=\"14\" fill=\"#6b7280\">Converter unavailable</text></svg>");
          var blob = new Blob([svg], {
            type: 'image/svg+xml'
          });
          return URL.createObjectURL(blob);
        };
        emfConverter = new (globalThis.EMFConverter || /*#__PURE__*/function () {
          function _class() {
            _classCallCheck(this, _class);
          }
          return _createClass(_class, [{
            key: "convertToObjectUrl",
            value: function () {
              var _convertToObjectUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
                return _regenerator().w(function (_context0) {
                  while (1) switch (_context0.n) {
                    case 0:
                      return _context0.a(2, createEmfPlaceholder());
                  }
                }, _callee0);
              }));
              function convertToObjectUrl() {
                return _convertToObjectUrl.apply(this, arguments);
              }
              return convertToObjectUrl;
            }()
          }]);
        }())();
        convertEmfBlobToSvgUrl = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(blob) {
            var label,
              url,
              _args1 = arguments,
              _t7;
            return _regenerator().w(function (_context1) {
              while (1) switch (_context1.p = _context1.n) {
                case 0:
                  label = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : null;
                  _context1.p = 1;
                  _context1.n = 2;
                  return emfConverter.convertToObjectUrl(blob, label || null);
                case 2:
                  url = _context1.v;
                  return _context1.a(2, url || createEmfPlaceholder(label));
                case 3:
                  _context1.p = 3;
                  _t7 = _context1.v;
                  console.warn('EMF to SVG conversion failed, using placeholder', _t7);
                  return _context1.a(2, createEmfPlaceholder(label));
              }
            }, _callee1, null, [[1, 3]]);
          }));
          return function convertEmfBlobToSvgUrl(_x17) {
            return _ref5.apply(this, arguments);
          };
        }();
        files = Object.keys(mediaFolder.files);
        _i4 = 0, _files = files;
      case 2:
        if (!(_i4 < _files.length)) {
          _context10.n = 10;
          break;
        }
        filePath = _files[_i4];
        file = mediaFolder.files[filePath];
        if (file.dir) {
          _context10.n = 9;
          break;
        }
        _context10.p = 3;
        _context10.n = 4;
        return file.async('blob');
      case 4:
        blob = _context10.v;
        fileName = file.name.split('/').pop();
        ext = (fileName.split('.').pop() || '').toLowerCase();
        if (!(ext === 'emf' || ext === 'wmf')) {
          _context10.n = 6;
          break;
        }
        _context10.n = 5;
        return convertEmfBlobToSvgUrl(blob, fileName);
      case 5:
        svgUrl = _context10.v;
        this.images[fileName] = svgUrl;
        _context10.n = 7;
        break;
      case 6:
        url = URL.createObjectURL(blob);
        this.images[fileName] = url;
      case 7:
        _context10.n = 9;
        break;
      case 8:
        _context10.p = 8;
        _t8 = _context10.v;
        console.warn("Failed to load image: ".concat(filePath), _t8);
      case 9:
        _i4++;
        _context10.n = 2;
        break;
      case 10:
        return _context10.a(2);
    }
  }, _callee10, this, [[3, 8]]);
}));
/**
 * Load ppt/tableStyles.xml (if present) and pass to TableParser for styling.
 */
PPTXParser.prototype.loadTableStyles = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
  var entry, xml, _t9;
  return _regenerator().w(function (_context11) {
    while (1) switch (_context11.p = _context11.n) {
      case 0:
        if (!(!this.zip || !this.tableParser || typeof this.tableParser.setTableStyles !== 'function')) {
          _context11.n = 1;
          break;
        }
        return _context11.a(2);
      case 1:
        _context11.p = 1;
        entry = this.zip.file('ppt/tableStyles.xml');
        if (entry) {
          _context11.n = 2;
          break;
        }
        return _context11.a(2);
      case 2:
        _context11.n = 3;
        return entry.async('string');
      case 3:
        xml = _context11.v;
        this.tableParser.setTableStyles(xml, this.xmlParser);
        _context11.n = 5;
        break;
      case 4:
        _context11.p = 4;
        _t9 = _context11.v;
        console.warn('Unable to load tableStyles.xml', _t9);
      case 5:
        return _context11.a(2);
    }
  }, _callee11, this, [[1, 4]]);
}));
PPTXParser.prototype.parsePresentation = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
  var _this5 = this;
  var presFile, doc, sldSz, slideSize, cx, cy, ratio, sldIdLst, slideIds, presRels, relsDoc, _t0;
  return _regenerator().w(function (_context12) {
    while (1) switch (_context12.p = _context12.n) {
      case 0:
        _context12.p = 0;
        _context12.n = 1;
        return this.zip.file('ppt/presentation.xml').async('string');
      case 1:
        presFile = _context12.v;
        doc = this.xmlParser.parseFromString(presFile, 'text/xml'); // Slide size (cx/cy in EMUs). This is the authoritative coordinate system for shapes.
        // If we assume 16:9 defaults for a 4:3 deck (or custom size), shapes will be offset/overflow.
        sldSz = doc.getElementsByTagName('p:sldSz')[0];
        slideSize = null;
        if (sldSz) {
          cx = parseInt(sldSz.getAttribute('cx') || '0', 10);
          cy = parseInt(sldSz.getAttribute('cy') || '0', 10);
          if (cx > 0 && cy > 0) {
            ratio = cx / cy;
            slideSize = {
              cx: cx,
              cy: cy,
              ratio: ratio,
              invRatio: cy / cx
            };

            // Update shared slide dimensions used throughout parsing.
            PPTXParser.SLIDE_WIDTH_EMU = cx;
            PPTXParser.SLIDE_HEIGHT_EMU = cy;
            if (window.ShapeParser) {
              ShapeParser.SLIDE_WIDTH_EMU = cx;
              ShapeParser.SLIDE_HEIGHT_EMU = cy;
            }

            // Layout parsers (older + refactored) may also use static slide dimensions.
            if (window.LayoutParser) {
              LayoutParser.SLIDE_WIDTH_EMU = cx;
              LayoutParser.SLIDE_HEIGHT_EMU = cy;
            }
            if (window.LayoutShapeParser) {
              LayoutShapeParser.SLIDE_WIDTH_EMU = cx;
              LayoutShapeParser.SLIDE_HEIGHT_EMU = cy;
            }
          }
        }

        // Extract presentation properties
        sldIdLst = doc.getElementsByTagName('p:sldIdLst')[0];
        slideIds = Array.from(sldIdLst.getElementsByTagName('p:sldId')).map(function (el) {
          return {
            id: el.getAttribute('id'),
            rId: el.getAttribute('r:id')
          };
        }); // Get slide relationships
        _context12.n = 2;
        return this.zip.file('ppt/_rels/presentation.xml.rels').async('string');
      case 2:
        presRels = _context12.v;
        relsDoc = this.xmlParser.parseFromString(presRels, 'text/xml'); // Map relationship IDs to slide file paths
        this.slideRelationships = new Map();
        Array.from(relsDoc.getElementsByTagName('Relationship')).forEach(function (rel) {
          _this5.slideRelationships.set(rel.getAttribute('Id'), rel.getAttribute('Target'));
        });

        // Store presentation info
        this.presentation = {
          slideCount: slideIds.length,
          slideIds: slideIds,
          slideSize: slideSize
        };
        _context12.n = 4;
        break;
      case 3:
        _context12.p = 3;
        _t0 = _context12.v;
        console.error('Error parsing presentation structure:', _t0);
        throw _t0;
      case 4:
        return _context12.a(2);
    }
  }, _callee12, this, [[0, 3]]);
}));
PPTXParser.prototype.parseTheme = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
  var themeFileEntry, themeFile, doc, _this$zip$file, themeRelsXml, themeRels, TableParserCtor, _TableParserCtor, _t1, _t10;
  return _regenerator().w(function (_context13) {
    while (1) switch (_context13.p = _context13.n) {
      case 0:
        _context13.p = 0;
        // Find theme file (usually theme1.xml)
        themeFileEntry = this.zip.file('ppt/theme/theme1.xml');
        if (themeFileEntry) {
          _context13.n = 1;
          break;
        }
        throw new Error('Theme file not found');
      case 1:
        _context13.n = 2;
        return themeFileEntry.async('string');
      case 2:
        themeFile = _context13.v;
        doc = this.xmlParser.parseFromString(themeFile, 'text/xml');
        this.themeExtractor = new ThemeExtractor();

        // Theme relationships (needed for theme blip fills)
        _context13.p = 3;
        _context13.n = 4;
        return (_this$zip$file = this.zip.file('ppt/theme/_rels/theme1.xml.rels')) === null || _this$zip$file === void 0 ? void 0 : _this$zip$file.async('string');
      case 4:
        themeRelsXml = _context13.v;
        themeRels = window.XMLUtils ? XMLUtils.parseRelationships(themeRelsXml) : [];
        if (typeof this.themeExtractor.setThemeRelationships === 'function') {
          this.themeExtractor.setThemeRelationships(themeRels);
        }
        _context13.n = 6;
        break;
      case 5:
        _context13.p = 5;
        _t1 = _context13.v;
        if (typeof this.themeExtractor.setThemeRelationships === 'function') {
          this.themeExtractor.setThemeRelationships([]);
        }
      case 6:
        _context13.n = 7;
        return this.themeExtractor.extract(doc);
      case 7:
        this.theme = _context13.v;
        // Initialize other extractors with theme reference
        this.backgroundExtractor = new BackgroundExtractor(this.themeExtractor, this.images);
        this.shapeParser = new ShapeParser(this.backgroundExtractor, this.images, this.themeExtractor);
        this.textExtractor = new TextExtractor(this.themeExtractor, this.backgroundExtractor);
        TableParserCtor = typeof globalThis !== 'undefined' && globalThis.TableParser ? globalThis.TableParser : null;
        if (!TableParserCtor) {
          _context13.n = 9;
          break;
        }
        this.tableParser = new TableParserCtor(this.backgroundExtractor, this.themeExtractor, this.shapeParser);
        _context13.n = 8;
        return this.loadTableStyles();
      case 8:
        _context13.n = 10;
        break;
      case 9:
        console.warn('TableParser not available; tables will not be styled');
      case 10:
        this.chartParser = new ChartParser(this.backgroundExtractor, this.themeExtractor);

        // Initialize layout parser for template support
        this.layoutParser = new LayoutParser(this.zip, this.xmlParser, this.backgroundExtractor, this.themeExtractor, this.images);
        _context13.n = 16;
        break;
      case 11:
        _context13.p = 11;
        _t10 = _context13.v;
        console.error('Error parsing theme:', _t10);
        // Continue without theme - will use defaults
        this.themeExtractor = new ThemeExtractor();
        if (typeof this.themeExtractor.setThemeRelationships === 'function') {
          this.themeExtractor.setThemeRelationships([]);
        }
        _context13.n = 12;
        return this.themeExtractor.extract(null);
      case 12:
        this.theme = _context13.v;
        this.backgroundExtractor = new BackgroundExtractor(this.themeExtractor, this.images);
        this.shapeParser = new ShapeParser(this.backgroundExtractor, this.images, this.themeExtractor);
        this.textExtractor = new TextExtractor(this.themeExtractor, this.backgroundExtractor);
        _TableParserCtor = typeof globalThis !== 'undefined' && globalThis.TableParser ? globalThis.TableParser : null;
        if (!_TableParserCtor) {
          _context13.n = 14;
          break;
        }
        this.tableParser = new _TableParserCtor(this.backgroundExtractor, this.themeExtractor, this.shapeParser);
        _context13.n = 13;
        return this.loadTableStyles();
      case 13:
        _context13.n = 15;
        break;
      case 14:
        console.warn('TableParser not available; tables will not be styled');
      case 15:
        this.chartParser = new ChartParser(this.backgroundExtractor, this.themeExtractor);

        // Initialize layout parser even with default theme
        this.layoutParser = new LayoutParser(this.zip, this.xmlParser, this.backgroundExtractor, this.themeExtractor, this.images);
      case 16:
        return _context13.a(2);
    }
  }, _callee13, this, [[3, 5], [0, 11]]);
}));

/* === parsers/pptx/pptx-slide-parser.js === */
/**
 * PPTX Parser - Slide parsing
 * Extends PPTXParser with slide and background parsing logic
 */

PPTXParser.prototype.parseSlides = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
  var index, slideInfo, slidePath, slide, _t11;
  return _regenerator().w(function (_context14) {
    while (1) switch (_context14.p = _context14.n) {
      case 0:
        _context14.p = 0;
        if (!(!this.presentation || !this.presentation.slideIds)) {
          _context14.n = 1;
          break;
        }
        throw new Error('Presentation not initialized');
      case 1:
        index = 0;
      case 2:
        if (!(index < this.presentation.slideIds.length)) {
          _context14.n = 6;
          break;
        }
        slideInfo = this.presentation.slideIds[index];
        slidePath = this.slideRelationships.get(slideInfo.rId);
        if (slidePath) {
          _context14.n = 3;
          break;
        }
        return _context14.a(3, 5);
      case 3:
        _context14.n = 4;
        return this.parseSlide("ppt/".concat(slidePath), index + 1);
      case 4:
        slide = _context14.v;
        if (slide) {
          this.slides.push(slide);
        }
      case 5:
        index++;
        _context14.n = 2;
        break;
      case 6:
        _context14.n = 8;
        break;
      case 7:
        _context14.p = 7;
        _t11 = _context14.v;
        console.error('Error parsing slides:', _t11);
        throw _t11;
      case 8:
        return _context14.a(2);
    }
  }, _callee14, this, [[0, 7]]);
}));
PPTXParser.prototype.parseSlide = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(slidePath) {
    var _this6 = this;
    var slideNumber,
      _doc$getElementsByTag4,
      _this$presentation,
      slideFile,
      doc,
      slideRelsPath,
      slideRels,
      layoutPath,
      slideRelsFile,
      relsDoc,
      layoutRel,
      masterPath,
      layoutInfo,
      background,
      slideShapes,
      textDefaultsProvider,
      spTree,
      shapeElements,
      i,
      shapeEl,
      result,
      k,
      mergedShapes,
      textStyles,
      mergeResult,
      _args15 = arguments,
      _t12,
      _t13;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          slideNumber = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : null;
          _context15.p = 1;
          _context15.n = 2;
          return this.zip.file(slidePath).async('string');
        case 2:
          slideFile = _context15.v;
          doc = this.xmlParser.parseFromString(slideFile, 'text/xml'); // Get slide relationships (for images and links)
          slideRelsPath = slidePath.replace('ppt/slides/', 'ppt/slides/_rels/').replace('.xml', '.xml.rels');
          slideRels = [];
          layoutPath = null;
          _context15.p = 3;
          _context15.n = 4;
          return this.zip.file(slideRelsPath).async('string');
        case 4:
          slideRelsFile = _context15.v;
          relsDoc = this.xmlParser.parseFromString(slideRelsFile, 'text/xml');
          slideRels = Array.from(relsDoc.getElementsByTagName('Relationship'));

          // Find layout relationship
          layoutRel = slideRels.find(function (r) {
            return (r.getAttribute('Type') || '').includes('slideLayout');
          });
          if (layoutRel) {
            layoutPath = PPTXParser.resolveTarget(slidePath, layoutRel.getAttribute('Target'));
          }
          _context15.n = 6;
          break;
        case 5:
          _context15.p = 5;
          _t12 = _context15.v;
        case 6:
          // Preload layout/master data to resolve template defaults
          masterPath = null;
          if (!(this.layoutParser && layoutPath)) {
            _context15.n = 8;
            break;
          }
          _context15.n = 7;
          return this.layoutParser.parseLayout(layoutPath);
        case 7:
          layoutInfo = _context15.v;
          masterPath = layoutInfo.masterPath || null;
          if (!masterPath) {
            _context15.n = 8;
            break;
          }
          _context15.n = 8;
          return this.layoutParser.parseMaster(masterPath);
        case 8:
          // Parse slide background
          background = this.backgroundExtractor.extract(doc, slideRels); // If no slide background, try layout background
          if (!(!background && layoutPath)) {
            _context15.n = 10;
            break;
          }
          _context15.n = 9;
          return this.parseLayoutBackground(layoutPath);
        case 9:
          background = _context15.v;
        case 10:
          if (background) {
            _context15.n = 12;
            break;
          }
          _context15.n = 11;
          return this.parseMasterBackground(layoutPath);
        case 11:
          background = _context15.v;
        case 12:
          // Parse shapes from slide
          slideShapes = [];
          textDefaultsProvider = function textDefaultsProvider(placeholderType, level) {
            var placeholderIdx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            if (!_this6.layoutParser) return null;
            return _this6.layoutParser.getTextDefaults(masterPath, placeholderType, level, layoutPath, placeholderIdx);
          };
          spTree = (_doc$getElementsByTag4 = doc.getElementsByTagName('p:cSld')[0]) === null || _doc$getElementsByTag4 === void 0 ? void 0 : _doc$getElementsByTag4.getElementsByTagName('p:spTree')[0];
          if (spTree) {
            shapeElements = Array.from(spTree.children).filter(function (el) {
              return el.tagName === 'p:sp' || el.tagName === 'p:pic' || el.tagName === 'p:grpSp' || el.tagName === 'p:cxnSp' || el.tagName === 'p:graphicFrame';
            });
            for (i = 0; i < shapeElements.length; i++) {
              shapeEl = shapeElements[i];
              result = this.parseShape(shapeEl, slideRels, textDefaultsProvider, slideNumber, slidePath);
              if (result) {
                // Group shapes return arrays, others return single objects
                if (Array.isArray(result)) {
                  for (k = 0; k < result.length; k++) {
                    if (result[k] && typeof result[k]._treeOrder !== 'number') {
                      result[k]._treeOrder = i + k / 1000; // keep children near parent order
                    }
                    slideShapes.push(result[k]);
                  }
                } else {
                  if (typeof result._treeOrder !== 'number') {
                    result._treeOrder = i;
                  }
                  slideShapes.push(result);
                }
              }
            }
          }

          // Populate chart data for any chart shapes on this slide
          if (!(slideShapes.length > 0)) {
            _context15.n = 13;
            break;
          }
          _context15.n = 13;
          return this.attachChartData(slideShapes);
        case 13:
          // Merge layout/master shapes with slide shapes for template support
          mergedShapes = slideShapes;
          textStyles = null; // masterPath already resolved above when layout was pre-parsed
          if (!(this.layoutParser && layoutPath)) {
            _context15.n = 15;
            break;
          }
          _context15.n = 14;
          return this.layoutParser.getMergedShapes(layoutPath, slideShapes);
        case 14:
          mergeResult = _context15.v;
          mergedShapes = mergeResult.shapes;
          textStyles = mergeResult.textStyles;
          masterPath = masterPath || mergeResult.masterPath;
        case 15:
          if (!(mergedShapes && mergedShapes.length > 0)) {
            _context15.n = 17;
            break;
          }
          _context15.n = 16;
          return this.attachChartData(mergedShapes);
        case 16:
          this.resolveConnectorEndpoints(mergedShapes);
        case 17:
          return _context15.a(2, {
            background: background,
            shapes: mergedShapes,
            layoutPath: layoutPath,
            textStyles: textStyles,
            masterPath: masterPath,
            slideSize: ((_this$presentation = this.presentation) === null || _this$presentation === void 0 ? void 0 : _this$presentation.slideSize) || null
          });
        case 18:
          _context15.p = 18;
          _t13 = _context15.v;
          console.error("Error parsing slide ".concat(slidePath, ":"), _t13);
          return _context15.a(2, null);
      }
    }, _callee15, this, [[3, 5], [1, 18]]);
  }));
  return function (_x18) {
    return _ref0.apply(this, arguments);
  };
}();
PPTXParser.prototype.attachChartData = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(shapes) {
    var _this7 = this;
    var tasks, _iterator31, _step31, _loop, _t14;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          if (!(!this.chartParser || !Array.isArray(shapes) || shapes.length === 0)) {
            _context17.n = 1;
            break;
          }
          return _context17.a(2);
        case 1:
          tasks = [];
          _iterator31 = _createForOfIteratorHelper(shapes);
          _context17.p = 2;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var shape, cacheKey, loader, promise;
            return _regenerator().w(function (_context16) {
              while (1) switch (_context16.n) {
                case 0:
                  shape = _step31.value;
                  if (!(!shape || shape.type !== 'chart' || !shape.chartTarget || shape.chartData)) {
                    _context16.n = 1;
                    break;
                  }
                  return _context16.a(2, 1);
                case 1:
                  cacheKey = shape.chartTarget;
                  if (!_this7._chartDataCache.has(cacheKey)) {
                    loader = _this7.chartParser.parseChart(_this7.zip, cacheKey).catch(function (err) {
                      console.warn("Failed to parse chart ".concat(cacheKey, ":"), err);
                      return null;
                    });
                    _this7._chartDataCache.set(cacheKey, loader);
                  }
                  promise = _this7._chartDataCache.get(cacheKey).then(function (data) {
                    if (data) {
                      shape.chartData = data;
                    }
                  });
                  tasks.push(promise);
                case 2:
                  return _context16.a(2);
              }
            }, _loop);
          });
          _iterator31.s();
        case 3:
          if ((_step31 = _iterator31.n()).done) {
            _context17.n = 6;
            break;
          }
          return _context17.d(_regeneratorValues(_loop()), 4);
        case 4:
          if (!_context17.v) {
            _context17.n = 5;
            break;
          }
          return _context17.a(3, 5);
        case 5:
          _context17.n = 3;
          break;
        case 6:
          _context17.n = 8;
          break;
        case 7:
          _context17.p = 7;
          _t14 = _context17.v;
          _iterator31.e(_t14);
        case 8:
          _context17.p = 8;
          _iterator31.f();
          return _context17.f(8);
        case 9:
          if (!(tasks.length > 0)) {
            _context17.n = 10;
            break;
          }
          _context17.n = 10;
          return Promise.all(tasks);
        case 10:
          return _context17.a(2);
      }
    }, _callee16, this, [[2, 7, 8, 9]]);
  }));
  return function (_x19) {
    return _ref1.apply(this, arguments);
  };
}();

// Resolve connector endpoints to target shapes so arrowheads land on the correct ends
PPTXParser.prototype.resolveConnectorEndpoints = function (shapes) {
  if (!Array.isArray(shapes) || shapes.length === 0) return;
  var byId = new Map();
  var _iterator32 = _createForOfIteratorHelper(shapes),
    _step32;
  try {
    for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
      var s = _step32.value;
      if (s && typeof s.shapeId === 'number' && s.type !== 'line') {
        byId.set(s.shapeId, s);
      }
    }
  } catch (err) {
    _iterator32.e(err);
  } finally {
    _iterator32.f();
  }
  var anchorFor = function anchorFor(shape, idx) {
    var _shape$x, _shape$y, _shape$width, _shape$height;
    if (!shape) return null;
    var x = (_shape$x = shape.x) !== null && _shape$x !== void 0 ? _shape$x : 0;
    var y = (_shape$y = shape.y) !== null && _shape$y !== void 0 ? _shape$y : 0;
    var w = (_shape$width = shape.width) !== null && _shape$width !== void 0 ? _shape$width : 0;
    var h = (_shape$height = shape.height) !== null && _shape$height !== void 0 ? _shape$height : 0;
    switch (idx) {
      case 0:
        return {
          x: x + w * 0.5,
          y: y
        };
      // top center
      case 1:
        return {
          x: x + w,
          y: y + h * 0.5
        };
      // right center
      case 2:
        return {
          x: x + w * 0.5,
          y: y + h
        };
      // bottom center
      case 3:
        return {
          x: x,
          y: y + h * 0.5
        };
      // left center
      default:
        return {
          x: x + w * 0.5,
          y: y + h * 0.5
        };
    }
  };
  var _iterator33 = _createForOfIteratorHelper(shapes),
    _step33;
  try {
    for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
      var _shape$x2, _shape$y2, _shape$x3, _shape$width2, _shape$y3, _shape$height2;
      var shape = _step33.value;
      if (!shape || shape.type !== 'line') continue;
      var startShape = shape.startCxn ? byId.get(shape.startCxn.shapeId) : null;
      var endShape = shape.endCxn ? byId.get(shape.endCxn.shapeId) : null;
      var start = startShape ? anchorFor(startShape, shape.startCxn.idx) : null;
      var end = endShape ? anchorFor(endShape, shape.endCxn.idx) : null;
      if (!start && !end) continue;
      var fallback = {
        x1: (_shape$x2 = shape.x) !== null && _shape$x2 !== void 0 ? _shape$x2 : 0,
        y1: (_shape$y2 = shape.y) !== null && _shape$y2 !== void 0 ? _shape$y2 : 0,
        x2: ((_shape$x3 = shape.x) !== null && _shape$x3 !== void 0 ? _shape$x3 : 0) + ((_shape$width2 = shape.width) !== null && _shape$width2 !== void 0 ? _shape$width2 : 0),
        y2: ((_shape$y3 = shape.y) !== null && _shape$y3 !== void 0 ? _shape$y3 : 0) + ((_shape$height2 = shape.height) !== null && _shape$height2 !== void 0 ? _shape$height2 : 0)
      };
      var startPt = start || {
        x: fallback.x1,
        y: fallback.y1
      };
      var endPt = end || {
        x: fallback.x2,
        y: fallback.y2
      };
      var minX = Math.min(startPt.x, endPt.x);
      var minY = Math.min(startPt.y, endPt.y);
      var maxX = Math.max(startPt.x, endPt.x);
      var maxY = Math.max(startPt.y, endPt.y);
      var w = Math.max(0.1, maxX - minX);
      var h = Math.max(0.1, maxY - minY);
      shape.x = minX;
      shape.y = minY;
      shape.width = w;
      shape.height = h;
      shape.linePoints = {
        x1: (startPt.x - minX) / w * 100,
        y1: (startPt.y - minY) / h * 100,
        x2: (endPt.x - minX) / w * 100,
        y2: (endPt.y - minY) / h * 100
      };
      delete shape.flipH;
      delete shape.flipV;
    }
  } catch (err) {
    _iterator33.e(err);
  } finally {
    _iterator33.f();
  }
};
PPTXParser.prototype.parseLayoutBackground = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(layoutPath) {
    var layoutFileEntry, layoutFile, doc, layoutRelsPath, layoutRels, relsFileEntry, relsFile, relsDoc, _t15, _t16;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          layoutFileEntry = this.zip.file(layoutPath);
          if (layoutFileEntry) {
            _context18.n = 1;
            break;
          }
          return _context18.a(2, null);
        case 1:
          _context18.n = 2;
          return layoutFileEntry.async('string');
        case 2:
          layoutFile = _context18.v;
          doc = this.xmlParser.parseFromString(layoutFile, 'text/xml'); // Get layout relationships for images
          layoutRelsPath = layoutPath.replace('ppt/slideLayouts/', 'ppt/slideLayouts/_rels/').replace('.xml', '.xml.rels');
          layoutRels = [];
          _context18.p = 3;
          relsFileEntry = this.zip.file(layoutRelsPath);
          if (!relsFileEntry) {
            _context18.n = 5;
            break;
          }
          _context18.n = 4;
          return relsFileEntry.async('string');
        case 4:
          relsFile = _context18.v;
          relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
          layoutRels = Array.from(relsDoc.getElementsByTagName('Relationship'));
        case 5:
          _context18.n = 7;
          break;
        case 6:
          _context18.p = 6;
          _t15 = _context18.v;
        case 7:
          return _context18.a(2, this.backgroundExtractor.extract(doc, layoutRels));
        case 8:
          _context18.p = 8;
          _t16 = _context18.v;
          return _context18.a(2, null);
      }
    }, _callee17, this, [[3, 6], [0, 8]]);
  }));
  return function (_x20) {
    return _ref10.apply(this, arguments);
  };
}();
PPTXParser.prototype.parseMasterBackground = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(layoutPath) {
    var _masterPath, layoutRelsPath, relsFileEntry, relsFile, relsDoc, masterRel, masterFileEntry, masterFile, doc, masterRelsPath, masterRels, _relsFileEntry, _relsFile, _relsDoc, _t17, _t18, _t19;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.p = 0;
          // Find master from layout relationships, or use default
          _masterPath = 'ppt/slideMasters/slideMaster1.xml';
          if (!layoutPath) {
            _context19.n = 5;
            break;
          }
          layoutRelsPath = layoutPath.replace('ppt/slideLayouts/', 'ppt/slideLayouts/_rels/').replace('.xml', '.xml.rels');
          _context19.p = 1;
          relsFileEntry = this.zip.file(layoutRelsPath);
          if (!relsFileEntry) {
            _context19.n = 3;
            break;
          }
          _context19.n = 2;
          return relsFileEntry.async('string');
        case 2:
          relsFile = _context19.v;
          relsDoc = this.xmlParser.parseFromString(relsFile, 'text/xml');
          masterRel = Array.from(relsDoc.getElementsByTagName('Relationship')).find(function (r) {
            return (r.getAttribute('Type') || '').includes('slideMaster');
          });
          if (masterRel) {
            _masterPath = 'ppt/slideLayouts/' + masterRel.getAttribute('Target');
            _masterPath = _masterPath.replace(/[^/]+\/\.\.\//g, '');
          }
        case 3:
          _context19.n = 5;
          break;
        case 4:
          _context19.p = 4;
          _t17 = _context19.v;
        case 5:
          masterFileEntry = this.zip.file(_masterPath);
          if (masterFileEntry) {
            _context19.n = 6;
            break;
          }
          return _context19.a(2, null);
        case 6:
          _context19.n = 7;
          return masterFileEntry.async('string');
        case 7:
          masterFile = _context19.v;
          doc = this.xmlParser.parseFromString(masterFile, 'text/xml'); // Get master relationships for images
          masterRelsPath = _masterPath.replace('ppt/slideMasters/', 'ppt/slideMasters/_rels/').replace('.xml', '.xml.rels');
          masterRels = [];
          _context19.p = 8;
          _relsFileEntry = this.zip.file(masterRelsPath);
          if (!_relsFileEntry) {
            _context19.n = 10;
            break;
          }
          _context19.n = 9;
          return _relsFileEntry.async('string');
        case 9:
          _relsFile = _context19.v;
          _relsDoc = this.xmlParser.parseFromString(_relsFile, 'text/xml');
          masterRels = Array.from(_relsDoc.getElementsByTagName('Relationship'));
        case 10:
          _context19.n = 12;
          break;
        case 11:
          _context19.p = 11;
          _t18 = _context19.v;
        case 12:
          return _context19.a(2, this.backgroundExtractor.extract(doc, masterRels));
        case 13:
          _context19.p = 13;
          _t19 = _context19.v;
          return _context19.a(2, null);
      }
    }, _callee18, this, [[8, 11], [1, 4], [0, 13]]);
  }));
  return function (_x21) {
    return _ref11.apply(this, arguments);
  };
}();

/* === parsers/pptx/pptx-shape-parser.js === */
/**
 * PPTX Parser - Shape parsing
 * Extends PPTXParser with shape-level parsing helpers
 */

PPTXParser.prototype.parseShape = function (shapeEl, slideRels) {
  var textDefaultsProvider = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var slideNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var basePath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var tagName = shapeEl.tagName;
  if (tagName === 'p:sp') {
    // Regular shape
    return this.shapeParser.parseShape(shapeEl, slideRels, textDefaultsProvider, slideNumber);
  } else if (tagName === 'p:pic') {
    // Picture/Image shape - handle as image shape
    var picture = this.parsePicture(shapeEl, slideRels);
    return picture;
  } else if (tagName === 'p:cxnSp') {
    // Connection shape (lines, connectors, arrows)
    return this.parseConnectionShape(shapeEl, slideRels);
  } else if (tagName === 'p:grpSp') {
    // Group shape - parse and flatten children
    return this.parseGroupShape(shapeEl, slideRels, textDefaultsProvider, slideNumber, basePath);
  } else if (tagName === 'p:graphicFrame') {
    return this.parseGraphicFrame(shapeEl, slideRels, textDefaultsProvider, basePath);
  }
  return null;
};
PPTXParser.prototype.parseGraphicFrame = function (graphicFrame, slideRels) {
  var textDefaultsProvider = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var basePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // Handle tables
  var hasTable = graphicFrame.getElementsByTagName('a:tbl')[0];
  if (hasTable && this.tableParser) {
    return this.tableParser.parseTable(graphicFrame, slideRels, textDefaultsProvider);
  }

  // Handle charts (rendered as placeholders for now)
  var graphicData = graphicFrame.getElementsByTagName('a:graphicData')[0];
  var chartEl = graphicData ? graphicData.getElementsByTagName('c:chart')[0] : null;
  if (chartEl) {
    var _graphicFrame$getElem;
    var relId = chartEl.getAttribute('r:id');
    // Resolve chart target from slide relationships
    var chartTarget = null;
    if (relId && Array.isArray(slideRels)) {
      var rel = slideRels.find(function (r) {
        return r.getAttribute('Id') === relId;
      });
      if (rel) {
        var base = basePath || 'ppt/slides/slide1.xml';
        chartTarget = PPTXParser.resolveTarget(base, rel.getAttribute('Target')) || rel.getAttribute('Target');
      }
    }

    // Extract transform - graphicFrame uses p:xfrm, not a:xfrm
    var x = 0,
      y = 0,
      width = 50,
      height = 30;
    var xfrm = graphicFrame.getElementsByTagName('p:xfrm')[0] || graphicFrame.getElementsByTagName('a:xfrm')[0];
    if (xfrm) {
      var off = xfrm.getElementsByTagName('a:off')[0];
      var ext = xfrm.getElementsByTagName('a:ext')[0];
      if (off) {
        x = parseInt(off.getAttribute('x') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU * 100;
        y = parseInt(off.getAttribute('y') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU * 100;
      }
      if (ext) {
        width = parseInt(ext.getAttribute('cx') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU * 100;
        height = parseInt(ext.getAttribute('cy') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU * 100;
      }
    }
    var name = ((_graphicFrame$getElem = graphicFrame.getElementsByTagName('p:cNvPr')[0]) === null || _graphicFrame$getElem === void 0 ? void 0 : _graphicFrame$getElem.getAttribute('name')) || 'Chart';
    return {
      type: 'chart',
      x: x,
      y: y,
      width: width,
      height: height,
      chartRelId: relId || null,
      chartTarget: chartTarget,
      name: name,
      layer: 'slide'
    };
  }
  return null;
};
PPTXParser.prototype.parseConnectionShape = function (cxnSp, slideRels) {
  var cNvPr = cxnSp.getElementsByTagName('p:cNvPr')[0];
  var shapeIdAttr = cNvPr ? cNvPr.getAttribute('id') : null;
  var cNvCxnSpPr = cxnSp.getElementsByTagName('p:cNvCxnSpPr')[0];
  var stCxn = cNvCxnSpPr === null || cNvCxnSpPr === void 0 ? void 0 : cNvCxnSpPr.getElementsByTagName('a:stCxn')[0];
  var endCxn = cNvCxnSpPr === null || cNvCxnSpPr === void 0 ? void 0 : cNvCxnSpPr.getElementsByTagName('a:endCxn')[0];
  var shape = {
    type: 'line',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: 'none',
    stroke: null,
    strokeWidth: 1,
    rotation: 0,
    shapeId: shapeIdAttr ? parseInt(shapeIdAttr, 10) : null,
    startCxn: stCxn ? {
      shapeId: parseInt(stCxn.getAttribute('id') || '-1', 10),
      idx: parseInt(stCxn.getAttribute('idx') || '-1', 10)
    } : null,
    endCxn: endCxn ? {
      shapeId: parseInt(endCxn.getAttribute('id') || '-1', 10),
      idx: parseInt(endCxn.getAttribute('idx') || '-1', 10)
    } : null
  };
  var spPr = cxnSp.getElementsByTagName('p:spPr')[0];
  if (!spPr) return null;

  // Get transform
  var xfrm = spPr.getElementsByTagName('a:xfrm')[0];
  if (xfrm) {
    var off = xfrm.getElementsByTagName('a:off')[0];
    var ext = xfrm.getElementsByTagName('a:ext')[0];
    if (off) {
      shape.x = parseInt(off.getAttribute('x') || '0') / PPTXParser.SLIDE_WIDTH_EMU * 100;
      shape.y = parseInt(off.getAttribute('y') || '0') / PPTXParser.SLIDE_HEIGHT_EMU * 100;
    }
    if (ext) {
      shape.width = parseInt(ext.getAttribute('cx') || '0') / PPTXParser.SLIDE_WIDTH_EMU * 100;
      shape.height = parseInt(ext.getAttribute('cy') || '0') / PPTXParser.SLIDE_HEIGHT_EMU * 100;
    }
    var rot = xfrm.getAttribute('rot');
    if (rot) {
      shape.rotation = parseInt(rot) / 60000;
    }

    // Check for flip
    if (xfrm.getAttribute('flipH') === '1') shape.flipH = true;
    if (xfrm.getAttribute('flipV') === '1') shape.flipV = true;
  }

  // Get geometry type
  var prstGeom = spPr.getElementsByTagName('a:prstGeom')[0];
  if (prstGeom) {
    shape.type = prstGeom.getAttribute('prst') || 'line';
  }

  // Get line style and arrowheads
  var ln = spPr.getElementsByTagName('a:ln')[0];
  if (ln) {
    var w = ln.getAttribute('w');
    if (w) {
      shape.strokeWidth = parseInt(w) / 914400 * 96;
    }
    var lnSolidFill = ln.getElementsByTagName('a:solidFill')[0];
    if (lnSolidFill) {
      shape.stroke = this.backgroundExtractor.extractColor(lnSolidFill);
    }
    var headEnd = ln.getElementsByTagName('a:headEnd')[0];
    if (headEnd && headEnd.getAttribute('type') && headEnd.getAttribute('type') !== 'none') {
      shape.arrowHead = headEnd.getAttribute('type');
    }
    var tailEnd = ln.getElementsByTagName('a:tailEnd')[0];
    if (tailEnd && tailEnd.getAttribute('type') && tailEnd.getAttribute('type') !== 'none') {
      shape.arrowTail = tailEnd.getAttribute('type');
    }
  }

  // Default stroke if none specified
  if (!shape.stroke) {
    shape.stroke = this.themeExtractor ? this.themeExtractor.getDefaultTextColor() : '#000000';
  }
  return shape;
};
PPTXParser.prototype.parseGroupShape = function (grpSp, slideRels) {
  var textDefaultsProvider = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var slideNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var basePath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var shapes = [];

  // Get group transform for coordinate adjustment
  var grpSpPr = grpSp.getElementsByTagName('p:grpSpPr')[0];
  var groupOffsetX = 0,
    groupOffsetY = 0;
  var groupOffsetXEMU = 0,
    groupOffsetYEMU = 0;
  var groupScaleX = 1,
    groupScaleY = 1;
  var groupIsBackground = false;
  if (grpSpPr) {
    var xfrm = grpSpPr.getElementsByTagName('a:xfrm')[0];
    if (xfrm) {
      var off = xfrm.getElementsByTagName('a:off')[0];
      var chOff = xfrm.getElementsByTagName('a:chOff')[0];
      var ext = xfrm.getElementsByTagName('a:ext')[0];
      var chExt = xfrm.getElementsByTagName('a:chExt')[0];
      if (off && chOff) {
        groupOffsetXEMU = parseInt(off.getAttribute('x') || '0') - parseInt(chOff.getAttribute('x') || '0');
        groupOffsetYEMU = parseInt(off.getAttribute('y') || '0') - parseInt(chOff.getAttribute('y') || '0');
        groupOffsetX = groupOffsetXEMU / PPTXParser.SLIDE_WIDTH_EMU * 100;
        groupOffsetY = groupOffsetYEMU / PPTXParser.SLIDE_HEIGHT_EMU * 100;
      }
      if (off && ext) {
        var x = parseInt(off.getAttribute('x') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU * 100;
        var y = parseInt(off.getAttribute('y') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU * 100;
        var width = parseInt(ext.getAttribute('cx') || '0', 10) / PPTXParser.SLIDE_WIDTH_EMU * 100;
        var height = parseInt(ext.getAttribute('cy') || '0', 10) / PPTXParser.SLIDE_HEIGHT_EMU * 100;
        var tolPos = 1;
        var tolSize = 98;
        var nearZero = function nearZero(v) {
          return Math.abs(v) <= tolPos;
        };
        groupIsBackground = nearZero(x) && nearZero(y) && width >= tolSize && height >= tolSize;
      }
      if (ext && chExt) {
        var extCx = parseInt(ext.getAttribute('cx') || '1');
        var chExtCx = parseInt(chExt.getAttribute('cx') || '1');
        var extCy = parseInt(ext.getAttribute('cy') || '1');
        var chExtCy = parseInt(chExt.getAttribute('cy') || '1');
        if (chExtCx > 0) groupScaleX = extCx / chExtCx;
        if (chExtCy > 0) groupScaleY = extCy / chExtCy;
      }
    }
  }

  // Parse direct children only (not descendants)
  var _iterator34 = _createForOfIteratorHelper(grpSp.children),
    _step34;
  try {
    for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
      var child = _step34.value;
      var tagName = child.tagName;
      var shapeData = null;
      if (tagName === 'p:sp') {
        shapeData = this.shapeParser.parseShape(child, slideRels, textDefaultsProvider, slideNumber, basePath);
      } else if (tagName === 'p:pic') {
        shapeData = this.parsePicture(child, slideRels);
      } else if (tagName === 'p:cxnSp') {
        shapeData = this.parseConnectionShape(child, slideRels);
      } else if (tagName === 'p:grpSp') {
        // Recursive nested groups
        var nestedShapes = this.parseGroupShape(child, slideRels, textDefaultsProvider, slideNumber, basePath);
        var _iterator35 = _createForOfIteratorHelper(nestedShapes),
          _step35;
        try {
          for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
            var nested = _step35.value;
            nested.x = nested.x * groupScaleX + groupOffsetX;
            nested.y = nested.y * groupScaleY + groupOffsetY;
            nested.width = nested.width * groupScaleX;
            nested.height = nested.height * groupScaleY;
            if (typeof nested.xEMU === 'number') nested.xEMU = nested.xEMU * groupScaleX + groupOffsetXEMU;
            if (typeof nested.yEMU === 'number') nested.yEMU = nested.yEMU * groupScaleY + groupOffsetYEMU;
            if (typeof nested.cxEMU === 'number') nested.cxEMU = nested.cxEMU * groupScaleX;
            if (typeof nested.cyEMU === 'number') nested.cyEMU = nested.cyEMU * groupScaleY;
            shapes.push(nested);
          }
        } catch (err) {
          _iterator35.e(err);
        } finally {
          _iterator35.f();
        }
        continue;
      }
      if (shapeData) {
        // Apply group transform to child shape
        shapeData.x = shapeData.x * groupScaleX + groupOffsetX;
        shapeData.y = shapeData.y * groupScaleY + groupOffsetY;
        shapeData.width = shapeData.width * groupScaleX;
        shapeData.height = shapeData.height * groupScaleY;
        if (typeof shapeData.xEMU === 'number') shapeData.xEMU = shapeData.xEMU * groupScaleX + groupOffsetXEMU;
        if (typeof shapeData.yEMU === 'number') shapeData.yEMU = shapeData.yEMU * groupScaleY + groupOffsetYEMU;
        if (typeof shapeData.cxEMU === 'number') shapeData.cxEMU = shapeData.cxEMU * groupScaleX;
        if (typeof shapeData.cyEMU === 'number') shapeData.cyEMU = shapeData.cyEMU * groupScaleY;
        if (groupIsBackground) shapeData._groupIsBackground = true;
        shapes.push(shapeData);
      }
    }
  } catch (err) {
    _iterator34.e(err);
  } finally {
    _iterator34.f();
  }
  return shapes;
};
PPTXParser.prototype.parsePicture = function (picEl, slideRels) {
  var _this8 = this;
  var picture = {
    type: 'picture',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    src: null
  };
  try {
    // Get transform (position and size)
    var nvPicPr = picEl.getElementsByTagName('p:nvPicPr')[0];
    if (nvPicPr) {
      var cNvPr = nvPicPr.getElementsByTagName('p:cNvPr')[0];
      // Could store name: cNvPr.getAttribute('name')
    }
    var blipFill = picEl.getElementsByTagName('p:blipFill')[0];
    if (blipFill) {
      var blip = blipFill.getElementsByTagName('a:blip')[0];
      if (blip) {
        var svgBlip = blip.getElementsByTagName('asvg:svgBlip')[0];
        var svgId = svgBlip ? svgBlip.getAttribute('r:embed') : null;
        var pngId = blip.getAttribute('r:embed');
        var resolveRel = function resolveRel(embedId) {
          if (!embedId) return null;
          var rel = slideRels.find(function (r) {
            return r.getAttribute('Id') === embedId;
          });
          if (rel) {
            var imageName = rel.getAttribute('Target').split('/').pop();
            return _this8.images[imageName] || null;
          }
          return null;
        };
        var svgUrl = resolveRel(svgId);
        var pngUrl = resolveRel(pngId);
        picture.src = svgUrl || pngUrl || picture.src;
      }
    }

    // Get transform (position and size) as percentages
    var spPr = picEl.getElementsByTagName('p:spPr')[0];
    if (spPr) {
      var xfrm = spPr.getElementsByTagName('a:xfrm')[0];
      if (xfrm) {
        var off = xfrm.getElementsByTagName('a:off')[0];
        var ext = xfrm.getElementsByTagName('a:ext')[0];
        if (off) {
          var xEMU = parseInt(off.getAttribute('x') || '0');
          var yEMU = parseInt(off.getAttribute('y') || '0');
          picture.xEMU = xEMU;
          picture.yEMU = yEMU;
          picture.x = xEMU / PPTXParser.SLIDE_WIDTH_EMU * 100;
          picture.y = yEMU / PPTXParser.SLIDE_HEIGHT_EMU * 100;
        }
        if (ext) {
          var cxEMU = parseInt(ext.getAttribute('cx') || '0');
          var cyEMU = parseInt(ext.getAttribute('cy') || '0');
          picture.cxEMU = cxEMU;
          picture.cyEMU = cyEMU;
          picture.width = cxEMU / PPTXParser.SLIDE_WIDTH_EMU * 100;
          picture.height = cyEMU / PPTXParser.SLIDE_HEIGHT_EMU * 100;
        }
      }
    }
    return picture;
  } catch (error) {
    console.warn('Error parsing picture:', error);
    return null;
  }
};

/* === renderers/chart-renderer.js === */
/**
 * Chart Renderer
 * Renders column, line, area, pie, and doughnut charts using SVG.
 */
var ChartRenderer = /*#__PURE__*/function () {
  function ChartRenderer() {
    _classCallCheck(this, ChartRenderer);
    this.viewBoxWidth = 1000;
    this.viewBoxHeight = 620;
    this.margins = {
      top: 40,
      right: 24,
      bottom: 96,
      left: 96
    };
  }
  return _createClass(ChartRenderer, [{
    key: "render",
    value: function render(chart) {
      if (!chart) return '';
      var x = chart.x || 0;
      var y = chart.y || 0;
      var width = Math.max(1, chart.width || 10);
      var height = Math.max(1, chart.height || 10);
      var zIndexStyle = typeof chart.zIndex === 'number' ? "z-index: ".concat(chart.zIndex, ";") : '';
      var style = "position: absolute; left: ".concat(x, "%; top: ").concat(y, "%; width: ").concat(width, "%; height: ").concat(height, "%; box-sizing: border-box; background: #ffffff; border: 1px solid #dcdcdc; border-radius: 6px; overflow: hidden; ").concat(zIndexStyle);

      // If chart data is missing, show a lightweight placeholder
      if (!chart.chartData || !chart.chartData.series || chart.chartData.series.length === 0) {
        return this.renderPlaceholder(style, chart.name || 'Chart', 'No chart data found');
      }
      var svg = this.renderChart(chart.chartData);
      return "<div class=\"slide-shape chart\" style=\"".concat(style, "\">").concat(svg, "</div>");
    }
  }, {
    key: "renderChart",
    value: function renderChart(data) {
      var kind = (data.chartType || 'column').toLowerCase();
      if (['column', 'line', 'area'].includes(kind)) {
        return this.renderCartesian(kind, data);
      }
      if (kind === 'pie' || kind === 'doughnut') {
        var hole = kind === 'doughnut' ? data.holeSize || 50 : 0;
        return this.renderPie(data, hole);
      }
      return this.renderPlaceholder('width: 100%; height: calc(100% - 32px);', 'Chart', "Unsupported chart type: ".concat(kind));
    }
  }, {
    key: "renderCartesian",
    value: function renderCartesian(kind, data) {
      var _data$series$,
        _this9 = this,
        _axes$value;
      var categories = data.categories && data.categories.length > 0 ? data.categories : ((_data$series$ = data.series[0]) === null || _data$series$ === void 0 ? void 0 : _data$series$.values.map(function (_, idx) {
        return "Category ".concat(idx + 1);
      })) || [];
      var series = data.series || [];
      var stacking = data.stacking || 'none';
      var barDir = data.barDir || (kind === 'column' ? 'column' : 'column');
      var legendCfg = data.legend || {
        position: 'r',
        overlay: false
      };
      var axes = data.axes || {};
      var baseMargins = {
        top: 32,
        right: 32,
        bottom: 96,
        left: 96
      };
      var legendLayout = this.layoutLegend(series, legendCfg);
      var margins = this.applyLegendToMargins(_objectSpread({}, baseMargins), legendLayout, legendCfg.overlay);
      var innerWidth = this.viewBoxWidth - margins.left - margins.right;
      var innerHeight = this.viewBoxHeight - margins.top - margins.bottom;
      var domain = this.computeDomain(series, stacking, categories.length, axes.value || {});
      var tickInfo = this.buildTicks(domain.min, domain.max, stacking === 'percent' ? 100 : null);
      var scaleY = function scaleY(val) {
        var span = tickInfo.max - tickInfo.min || 1;
        return margins.top + innerHeight - (val - tickInfo.min) / span * innerHeight;
      };
      var scaleX = function scaleX(val) {
        var span = tickInfo.max - tickInfo.min || 1;
        return margins.left + (val - tickInfo.min) / span * innerWidth;
      };
      var xBand = categories.length > 0 ? innerWidth / categories.length : innerWidth;
      var yBand = categories.length > 0 ? innerHeight / categories.length : innerHeight;
      var barGroupPaddingX = xBand * 0.18;
      var barGroupPaddingY = yBand * 0.18;
      var barWidth = series.length > 0 ? (xBand - 2 * barGroupPaddingX) / series.length : xBand;
      var barHeight = series.length > 0 ? (yBand - 2 * barGroupPaddingY) / series.length : yBand;
      var bars = [];
      if (kind === 'column') {
        if (barDir === 'column') {
          if (stacking === 'none') {
            categories.forEach(function (_, catIndex) {
              series.forEach(function (ser, sIdx) {
                var _ser$values;
                var v = ((_ser$values = ser.values) === null || _ser$values === void 0 ? void 0 : _ser$values[catIndex]) || 0;
                var x = margins.left + catIndex * xBand + barGroupPaddingX + sIdx * barWidth;
                var y0 = scaleY(0);
                var y1 = scaleY(v);
                var y = Math.min(y0, y1);
                var height = Math.abs(y1 - y0);
                bars.push("<rect x=\"".concat(x.toFixed(2), "\" y=\"").concat(y.toFixed(2), "\" width=\"").concat(Math.max(4, barWidth - 4).toFixed(2), "\" height=\"").concat(Math.max(0, height).toFixed(2), "\" rx=\"3\" fill=\"").concat(ser.color || '#4e79a7', "\" />"));
              });
            });
          } else {
            categories.forEach(function (_, catIndex) {
              var total = stacking === 'percent' ? series.reduce(function (sum, ser) {
                var _ser$values2;
                return sum + (((_ser$values2 = ser.values) === null || _ser$values2 === void 0 ? void 0 : _ser$values2[catIndex]) || 0);
              }, 0) : null;
              var posBase = 0;
              var negBase = 0;
              var stackWidth = xBand * 0.55;
              var x = margins.left + catIndex * xBand + (xBand - stackWidth) / 2;
              series.forEach(function (ser) {
                var _ser$values3;
                var raw = ((_ser$values3 = ser.values) === null || _ser$values3 === void 0 ? void 0 : _ser$values3[catIndex]) || 0;
                var v = stacking === 'percent' ? total > 0 ? raw / total * 100 : 0 : raw;
                if (v >= 0) {
                  var yTop = scaleY(posBase + v);
                  var yBase = scaleY(posBase);
                  bars.push("<rect x=\"".concat(x.toFixed(2), "\" y=\"").concat(Math.min(yTop, yBase).toFixed(2), "\" width=\"").concat(Math.max(6, stackWidth - 4).toFixed(2), "\" height=\"").concat(Math.abs(yBase - yTop).toFixed(2), "\" rx=\"3\" fill=\"").concat(ser.color || '#4e79a7', "\" />"));
                  posBase += v;
                } else {
                  var _yTop = scaleY(negBase);
                  var _yBase = scaleY(negBase + v);
                  bars.push("<rect x=\"".concat(x.toFixed(2), "\" y=\"").concat(Math.min(_yTop, _yBase).toFixed(2), "\" width=\"").concat(Math.max(6, stackWidth - 4).toFixed(2), "\" height=\"").concat(Math.abs(_yBase - _yTop).toFixed(2), "\" rx=\"3\" fill=\"").concat(ser.color || '#4e79a7', "\" />"));
                  negBase += v;
                }
              });
            });
          }
        } else {
          // Horizontal bars
          if (stacking === 'none') {
            categories.forEach(function (_, catIndex) {
              series.forEach(function (ser, sIdx) {
                var _ser$values4;
                var v = ((_ser$values4 = ser.values) === null || _ser$values4 === void 0 ? void 0 : _ser$values4[catIndex]) || 0;
                var y = margins.top + catIndex * yBand + barGroupPaddingY + sIdx * barHeight;
                var x0 = scaleX(0);
                var x1 = scaleX(v);
                var x = Math.min(x0, x1);
                var width = Math.abs(x1 - x0);
                bars.push("<rect x=\"".concat(x.toFixed(2), "\" y=\"").concat(y.toFixed(2), "\" width=\"").concat(Math.max(4, width).toFixed(2), "\" height=\"").concat(Math.max(4, barHeight - 4).toFixed(2), "\" rx=\"3\" fill=\"").concat(ser.color || '#4e79a7', "\" />"));
              });
            });
          } else {
            categories.forEach(function (_, catIndex) {
              var total = stacking === 'percent' ? series.reduce(function (sum, ser) {
                var _ser$values5;
                return sum + (((_ser$values5 = ser.values) === null || _ser$values5 === void 0 ? void 0 : _ser$values5[catIndex]) || 0);
              }, 0) : null;
              var posBase = 0;
              var negBase = 0;
              var stackHeight = yBand * 0.55;
              var y = margins.top + catIndex * yBand + (yBand - stackHeight) / 2;
              series.forEach(function (ser) {
                var _ser$values6;
                var raw = ((_ser$values6 = ser.values) === null || _ser$values6 === void 0 ? void 0 : _ser$values6[catIndex]) || 0;
                var v = stacking === 'percent' ? total > 0 ? raw / total * 100 : 0 : raw;
                if (v >= 0) {
                  var xStart = scaleX(posBase);
                  var xEnd = scaleX(posBase + v);
                  bars.push("<rect x=\"".concat(Math.min(xStart, xEnd).toFixed(2), "\" y=\"").concat(y.toFixed(2), "\" width=\"").concat(Math.abs(xEnd - xStart).toFixed(2), "\" height=\"").concat(Math.max(6, stackHeight - 4).toFixed(2), "\" rx=\"3\" fill=\"").concat(ser.color || '#4e79a7', "\" />"));
                  posBase += v;
                } else {
                  var _xStart = scaleX(negBase);
                  var _xEnd = scaleX(negBase + v);
                  bars.push("<rect x=\"".concat(Math.min(_xStart, _xEnd).toFixed(2), "\" y=\"").concat(y.toFixed(2), "\" width=\"").concat(Math.abs(_xEnd - _xStart).toFixed(2), "\" height=\"").concat(Math.max(6, stackHeight - 4).toFixed(2), "\" rx=\"3\" fill=\"").concat(ser.color || '#4e79a7', "\" />"));
                  negBase += v;
                }
              });
            });
          }
        }
      }
      var lines = [];
      var areas = [];
      if (kind === 'line' || kind === 'area') {
        series.forEach(function (ser) {
          var points = [];
          categories.forEach(function (_, idx) {
            var _ser$values7;
            var cx = margins.left + idx * xBand + xBand / 2;
            var cy = scaleY(((_ser$values7 = ser.values) === null || _ser$values7 === void 0 ? void 0 : _ser$values7[idx]) || 0);
            points.push({
              x: cx,
              y: cy
            });
          });
          if (points.length === 0) return;
          var path = points.map(function (p, i) {
            return "".concat(i === 0 ? 'M' : 'L', " ").concat(p.x.toFixed(2), " ").concat(p.y.toFixed(2));
          }).join(' ');
          lines.push("<path d=\"".concat(path, "\" fill=\"none\" stroke=\"").concat(ser.color || '#4e79a7', "\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\" />"));
          if (kind === 'area') {
            var areaPath = "".concat(path, " L ").concat(points[points.length - 1].x.toFixed(2), " ").concat((margins.top + innerHeight).toFixed(2), " L ").concat(points[0].x.toFixed(2), " ").concat((margins.top + innerHeight).toFixed(2), " Z");
            areas.push("<path d=\"".concat(areaPath, "\" fill=\"").concat(_this9.addAlpha(ser.color || '#4e79a7', 0.2), "\" stroke=\"none\" />"));
          }
          points.forEach(function (pt) {
            lines.push("<circle cx=\"".concat(pt.x.toFixed(2), "\" cy=\"").concat(pt.y.toFixed(2), "\" r=\"5\" fill=\"#ffffff\" stroke=\"").concat(ser.color || '#4e79a7', "\" stroke-width=\"3\" />"));
          });
        });
      }
      var xAxisLine = barDir === 'bar' ? "<line x1=\"".concat(margins.left, "\" y1=\"").concat(margins.top + innerHeight, "\" x2=\"").concat(margins.left, "\" y2=\"").concat(margins.top, "\" stroke=\"#555\" stroke-width=\"2\" />") : "<line x1=\"".concat(margins.left, "\" y1=\"").concat(margins.top + innerHeight, "\" x2=\"").concat(margins.left + innerWidth, "\" y2=\"").concat(margins.top + innerHeight, "\" stroke=\"#555\" stroke-width=\"2\" />");
      var yAxisLine = barDir === 'bar' ? "<line x1=\"".concat(margins.left, "\" y1=\"").concat(margins.top + innerHeight, "\" x2=\"").concat(margins.left + innerWidth, "\" y2=\"").concat(margins.top + innerHeight, "\" stroke=\"#555\" stroke-width=\"2\" />") : "<line x1=\"".concat(margins.left, "\" y1=\"").concat(margins.top, "\" x2=\"").concat(margins.left, "\" y2=\"").concat(margins.top + innerHeight, "\" stroke=\"#555\" stroke-width=\"2\" />");
      var valueFormat = (axes === null || axes === void 0 || (_axes$value = axes.value) === null || _axes$value === void 0 ? void 0 : _axes$value.formatCode) || null;
      var tickLabels = tickInfo.ticks.map(function (tickVal) {
        if (barDir === 'bar') {
          var x = scaleX(tickVal);
          return "<g>\n                    <line x1=\"".concat(x.toFixed(2), "\" y1=\"").concat((margins.top + innerHeight).toFixed(2), "\" x2=\"").concat(x.toFixed(2), "\" y2=\"").concat((margins.top + innerHeight + 6).toFixed(2), "\" stroke=\"#777\" stroke-width=\"1\" />\n                    <text x=\"").concat(x.toFixed(2), "\" y=\"").concat((margins.top + innerHeight + 28).toFixed(2), "\" text-anchor=\"middle\" font-size=\"28\" fill=\"#555\">").concat(_this9.formatNumber(tickVal, valueFormat), "</text>\n                </g>");
        }
        var y = scaleY(tickVal);
        return "<g>\n                <line x1=\"".concat((margins.left - 6).toFixed(2), "\" y1=\"").concat(y.toFixed(2), "\" x2=\"").concat(margins.left.toFixed(2), "\" y2=\"").concat(y.toFixed(2), "\" stroke=\"#777\" stroke-width=\"1\" />\n                <text x=\"").concat((margins.left - 10).toFixed(2), "\" y=\"").concat((y + 4).toFixed(2), "\" text-anchor=\"end\" font-size=\"28\" fill=\"#555\">").concat(_this9.formatNumber(tickVal, valueFormat), "</text>\n            </g>");
      }).join('');
      var categoriesLabels = categories.map(function (cat, idx) {
        if (barDir === 'bar') {
          var _y7 = margins.top + idx * yBand + yBand / 2;
          var _x22 = margins.left - 12;
          return "<text x=\"".concat(_x22.toFixed(2), "\" y=\"").concat(_y7.toFixed(2), "\" text-anchor=\"end\" dominant-baseline=\"middle\" font-size=\"28\" fill=\"#555\">").concat(_this9.escapeHtml(cat), "</text>");
        }
        var x = margins.left + idx * xBand + xBand / 2;
        var y = margins.top + innerHeight + 42;
        return "<text x=\"".concat(x.toFixed(2), "\" y=\"").concat(y.toFixed(2), "\" text-anchor=\"middle\" font-size=\"28\" fill=\"#555\">").concat(_this9.escapeHtml(cat), "</text>");
      }).join('');
      var legendSvg = legendLayout.svg || '';
      return "<svg viewBox=\"0 0 ".concat(this.viewBoxWidth, " ").concat(this.viewBoxHeight, "\" preserveAspectRatio=\"none\" style=\"width: 100%; height: 100%;\">\n            <rect x=\"0\" y=\"0\" width=\"").concat(this.viewBoxWidth, "\" height=\"").concat(this.viewBoxHeight, "\" fill=\"#ffffff\" />\n            ").concat(legendSvg, "\n            ").concat(areas.join(''), "\n            ").concat(xAxisLine).concat(yAxisLine, "\n            ").concat(tickLabels, "\n            ").concat(categoriesLabels, "\n            ").concat(bars.join(''), "\n            ").concat(lines.join(''), "\n        </svg>");
    }
  }, {
    key: "renderPie",
    value: function renderPie(data) {
      var _this0 = this;
      var holeSizePercent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var series = data.series && data.series.length > 0 ? data.series[0] : null;
      if (!series || !series.values || series.values.length === 0) {
        return this.renderPlaceholder('width: 100%; height: calc(100% - 32px);', 'Chart', 'No chart data found');
      }
      var values = series.values.map(function (v) {
        return Math.max(0, v);
      });
      var total = values.reduce(function (sum, v) {
        return sum + v;
      }, 0);
      if (total === 0) {
        return this.renderPlaceholder('width: 100%; height: calc(100% - 32px);', 'Chart', 'No chart values to display');
      }
      var categories = data.categories && data.categories.length > 0 ? data.categories : values.map(function (_, idx) {
        return "Slice ".concat(idx + 1);
      });
      var cx = this.viewBoxWidth / 2;
      var cy = this.viewBoxHeight / 2 + 10;
      var radius = Math.min(this.viewBoxWidth, this.viewBoxHeight) * 0.32;
      var innerRadius = holeSizePercent > 0 ? radius * (holeSizePercent / 100) : 0;
      var currentAngle = -Math.PI / 2;
      var slices = values.map(function (v, idx) {
        var angle = v / total * Math.PI * 2;
        var start = currentAngle;
        var end = currentAngle + angle;
        currentAngle = end;
        var path = _this0.describeArc(cx, cy, radius, start, end, innerRadius);
        var color = _this0.defaultColor(idx);
        return "<path d=\"".concat(path, "\" fill=\"").concat(color, "\" stroke=\"#ffffff\" stroke-width=\"2\" />");
      }).join('');
      var legendItems = categories.map(function (cat, idx) {
        var color = _this0.defaultColor(idx);
        var value = values[idx];
        return "<g transform=\"translate(".concat(_this0.margins.left, ", ").concat((_this0.margins.top + idx * 34).toFixed(2), ")\">\n                <rect x=\"0\" y=\"0\" width=\"24\" height=\"24\" rx=\"4\" fill=\"").concat(color, "\" />\n                <text x=\"34\" y=\"18\" font-size=\"26\" fill=\"#444\">").concat(_this0.escapeHtml(cat), " (").concat(_this0.formatNumber(value), ")</text>\n            </g>");
      }).join('');
      return "<svg viewBox=\"0 0 ".concat(this.viewBoxWidth, " ").concat(this.viewBoxHeight, "\" preserveAspectRatio=\"none\" style=\"width: 100%; height: 100%;\">\n            <rect x=\"0\" y=\"0\" width=\"").concat(this.viewBoxWidth, "\" height=\"").concat(this.viewBoxHeight, "\" fill=\"#ffffff\" />\n            ").concat(slices, "\n            ").concat(innerRadius > 0 ? "<circle cx=\"".concat(cx, "\" cy=\"").concat(cy, "\" r=\"").concat(innerRadius, "\" fill=\"#ffffff\" />") : '', "\n            ").concat(legendItems, "\n        </svg>");
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder(style, title, message) {
      var safeStyle = style.includes('position') ? style : "position: absolute; left: 0; top: 0; ".concat(style);
      return "<div class=\"slide-shape chart-placeholder\" style=\"".concat(safeStyle, "; display: flex; align-items: center; justify-content: center; color: #555; font-size: 12px; text-align: center; padding: 12px; height: 100%;\">\n            <div>").concat(this.escapeHtml(title), "<br><small>").concat(this.escapeHtml(message), "</small></div>\n        </div>");
    }
  }, {
    key: "layoutLegend",
    value: function layoutLegend() {
      var _this1 = this;
      var series = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var legendCfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        position: 'r',
        overlay: false
      };
      if (!series || series.length === 0) return {
        svg: '',
        width: 0,
        height: 0,
        position: legendCfg.position || 'r'
      };
      var pos = legendCfg.position || 'r';
      var horizontal = pos === 't' || pos === 'b' || pos === 'tr';
      var itemHeight = 32;
      var itemGap = 10;
      var itemWidth = 180;
      var totalWidth = series.length * itemWidth;
      var maxWidth = this.viewBoxWidth - 48;
      var legendWidth = Math.min(totalWidth, maxWidth);
      var legendHeight = horizontal ? itemHeight + itemGap * 2 : series.length * (itemHeight + itemGap) - itemGap;
      var startX = 24;
      var startY = 16;
      if (pos === 't') {
        startX = (this.viewBoxWidth - legendWidth) / 2;
        startY = 16;
      } else if (pos === 'b') {
        startX = (this.viewBoxWidth - legendWidth) / 2;
        startY = this.viewBoxHeight - legendHeight - 16;
      } else if (pos === 'l') {
        startX = 24;
        startY = (this.viewBoxHeight - legendHeight) / 2;
      } else if (pos === 'r') {
        startX = this.viewBoxWidth - legendWidth - 24;
        startY = (this.viewBoxHeight - legendHeight) / 2;
      } else if (pos === 'tr') {
        startX = this.viewBoxWidth - legendWidth - 24;
        startY = 16;
      }
      var items = '';
      if (horizontal) {
        series.forEach(function (ser, idx) {
          var x = startX + idx * itemWidth;
          var color = ser.color || _this1.defaultColor(idx);
          items += "<g transform=\"translate(".concat(x, ", ").concat(startY, ")\">\n                    <rect x=\"0\" y=\"0\" width=\"26\" height=\"26\" rx=\"5\" fill=\"").concat(color, "\" />\n                    <text x=\"34\" y=\"20\" font-size=\"26\" fill=\"#444\">").concat(_this1.escapeHtml(ser.name || "Series ".concat(idx + 1)), "</text>\n                </g>");
        });
      } else {
        series.forEach(function (ser, idx) {
          var y = startY + idx * (itemHeight + itemGap);
          var color = ser.color || _this1.defaultColor(idx);
          items += "<g transform=\"translate(".concat(startX, ", ").concat(y, ")\">\n                    <rect x=\"0\" y=\"0\" width=\"26\" height=\"26\" rx=\"5\" fill=\"").concat(color, "\" />\n                    <text x=\"34\" y=\"20\" font-size=\"26\" fill=\"#444\">").concat(_this1.escapeHtml(ser.name || "Series ".concat(idx + 1)), "</text>\n                </g>");
        });
      }
      return {
        svg: "<g>".concat(items, "</g>"),
        width: legendWidth,
        height: legendHeight,
        position: pos
      };
    }
  }, {
    key: "applyLegendToMargins",
    value: function applyLegendToMargins(margins, legendLayout) {
      var overlay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!legendLayout || overlay || !legendLayout.width || !legendLayout.height) return margins;
      var pad = 12;
      switch (legendLayout.position) {
        case 't':
        case 'tr':
          margins.top += legendLayout.height + pad;
          break;
        case 'b':
          margins.bottom += legendLayout.height + pad;
          break;
        case 'l':
          margins.left += legendLayout.width + pad;
          break;
        case 'r':
        default:
          margins.right += legendLayout.width + pad;
          break;
      }
      return margins;
    }
  }, {
    key: "buildTicks",
    value: function buildTicks(minVal, maxVal) {
      var forceMax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (forceMax !== null) {
        return {
          ticks: [0, 25, 50, 75, 100],
          min: 0,
          max: forceMax
        };
      }
      var min = typeof minVal === 'number' ? minVal : 0;
      var max = typeof maxVal === 'number' ? maxVal : 1;
      if (min === max) {
        min -= 1;
        max += 1;
      }
      var range = max - min;
      var niceRange = this.niceNumber(range, false);
      var niceStep = this.niceNumber(niceRange / 4, true);
      var niceMin = Math.floor(min / niceStep) * niceStep;
      var niceMax = Math.ceil(max / niceStep) * niceStep;
      var ticks = [];
      for (var v = niceMin; v <= niceMax + 1e-6; v += niceStep) {
        ticks.push(parseFloat(v.toFixed(6)));
      }
      return {
        ticks: ticks,
        min: niceMin,
        max: niceMax
      };
    }
  }, {
    key: "niceNumber",
    value: function niceNumber(range, round) {
      var exponent = Math.floor(Math.log10(range));
      var fraction = range / Math.pow(10, exponent);
      var niceFraction;
      if (round) {
        if (fraction < 1.5) niceFraction = 1;else if (fraction < 3) niceFraction = 2;else if (fraction < 7) niceFraction = 5;else niceFraction = 10;
      } else {
        if (fraction <= 1) niceFraction = 1;else if (fraction <= 2) niceFraction = 2;else if (fraction <= 5) niceFraction = 5;else niceFraction = 10;
      }
      return niceFraction * Math.pow(10, exponent);
    }
  }, {
    key: "computeDomain",
    value: function computeDomain(series, stacking, catCount) {
      var axisSettings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var min = 0;
      var max = 0;
      if (stacking === 'percent') {
        min = 0;
        max = 100;
      } else if (stacking === 'stacked') {
        var _loop2 = function _loop2(idx) {
          var pos = 0;
          var neg = 0;
          series.forEach(function (ser) {
            var _ser$values8;
            var v = ((_ser$values8 = ser.values) === null || _ser$values8 === void 0 ? void 0 : _ser$values8[idx]) || 0;
            if (v >= 0) pos += v;else neg += v;
          });
          max = Math.max(max, pos);
          min = Math.min(min, neg);
        };
        for (var idx = 0; idx < catCount; idx++) {
          _loop2(idx);
        }
      } else {
        series.forEach(function (ser) {
          (ser.values || []).forEach(function (v) {
            if (typeof v === 'number') {
              if (v > max) max = v;
              if (v < min) min = v;
            }
          });
        });
      }
      if (typeof axisSettings.min === 'number') min = axisSettings.min;
      if (typeof axisSettings.max === 'number') max = axisSettings.max;
      if (min === max) {
        min -= 1;
        max += 1;
      }
      return {
        min: min,
        max: max
      };
    }
  }, {
    key: "describeArc",
    value: function describeArc(cx, cy, outerR, startAngle, endAngle) {
      var innerR = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
      var startOuter = {
        x: cx + outerR * Math.cos(startAngle),
        y: cy + outerR * Math.sin(startAngle)
      };
      var endOuter = {
        x: cx + outerR * Math.cos(endAngle),
        y: cy + outerR * Math.sin(endAngle)
      };
      if (innerR > 0) {
        var startInner = {
          x: cx + innerR * Math.cos(endAngle),
          y: cy + innerR * Math.sin(endAngle)
        };
        var endInner = {
          x: cx + innerR * Math.cos(startAngle),
          y: cy + innerR * Math.sin(startAngle)
        };
        return "M ".concat(startOuter.x, " ").concat(startOuter.y, " A ").concat(outerR, " ").concat(outerR, " 0 ").concat(largeArcFlag, " 1 ").concat(endOuter.x, " ").concat(endOuter.y, " L ").concat(startInner.x, " ").concat(startInner.y, " A ").concat(innerR, " ").concat(innerR, " 0 ").concat(largeArcFlag, " 0 ").concat(endInner.x, " ").concat(endInner.y, " Z");
      }
      return "M ".concat(cx, " ").concat(cy, " L ").concat(startOuter.x, " ").concat(startOuter.y, " A ").concat(outerR, " ").concat(outerR, " 0 ").concat(largeArcFlag, " 1 ").concat(endOuter.x, " ").concat(endOuter.y, " Z");
    }
  }, {
    key: "addAlpha",
    value: function addAlpha(color, alpha) {
      var ctx = document.createElement('canvas').getContext('2d');
      ctx.fillStyle = color || '#4e79a7';
      var computed = ctx.fillStyle;
      if (computed.startsWith('#')) {
        var hex = computed.replace('#', '');
        var bigint = parseInt(hex.length === 3 ? hex.split('').map(function (c) {
          return c + c;
        }).join('') : hex, 16);
        var r = bigint >> 16 & 255;
        var g = bigint >> 8 & 255;
        var b = bigint & 255;
        return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
      }
      return computed;
    }
  }, {
    key: "formatNumber",
    value: function formatNumber(val) {
      var formatCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var isCurrency = typeof formatCode === 'string' && formatCode.includes('$');
      var hasOneDecimal = typeof formatCode === 'string' && /0\.0/.test(formatCode);
      if (isCurrency) {
        var abs = Math.abs(val);
        var digits = hasOneDecimal ? 1 : 0;
        var formatted = abs >= 1 ? val.toFixed(digits) : val.toFixed(Math.max(2, digits + 1));
        return "$".concat(formatted);
      }
      if (Math.abs(val) >= 1000) {
        return "".concat((val / 1000).toFixed(1), "k");
      }
      if (Math.abs(val) >= 1) {
        return "".concat(val.toFixed(0));
      }
      return val.toFixed(2);
    }
  }, {
    key: "defaultColor",
    value: function defaultColor(idx) {
      var palette = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'];
      return palette[idx % palette.length];
    }
  }, {
    key: "escapeHtml",
    value: function escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text || '';
      return div.innerHTML;
    }
  }]);
}(); // Export
window.ChartRenderer = ChartRenderer;

/* === renderers/style-builder.js === */
/**
 * Style Builder Module
 * Handles CSS style generation for backgrounds and gradients
 */
var StyleBuilder = /*#__PURE__*/function () {
  function StyleBuilder() {
    _classCallCheck(this, StyleBuilder);
  }
  return _createClass(StyleBuilder, [{
    key: "createBackgroundStyle",
    value:
    /**
     * Create CSS background style from background object
     * @param {Object} background - Background configuration
     * @returns {string} - CSS style string
     */
    function createBackgroundStyle(background) {
      if (!background) return '';
      switch (background.type) {
        case 'solid':
          return background.color ? "background-color: ".concat(background.color, ";") : '';
        case 'gradient':
          return this.createGradientStyle(background.gradient);
        case 'image':
          return background.image ? "background-image: url('".concat(background.image, "'); background-size: cover; background-position: center;") : '';
        case 'pattern':
          return background.color ? "background-color: ".concat(background.color, ";") : '';
        default:
          return '';
      }
    }

    /**
     * Create CSS gradient style
     * @param {Object} gradient - Gradient configuration
     * @returns {string} - CSS gradient style string
     */
  }, {
    key: "createGradientStyle",
    value: function createGradientStyle(gradient) {
      var _this10 = this;
      if (!gradient || !gradient.stops || gradient.stops.length === 0) return '';

      // Build gradient stops string with opacity support
      var stopsStr = gradient.stops.map(function (stop) {
        var colorStr = stop.color;
        // Apply opacity to the color using rgba if opacity < 1
        if (stop.opacity !== undefined && stop.opacity < 1) {
          // Convert hex to rgba with opacity
          var rgba = _this10.hexToRgbaForGradient(stop.color, stop.opacity);
          colorStr = rgba;
        }
        return "".concat(colorStr, " ").concat(stop.position, "%");
      }).join(', ');
      if (gradient.type === 'linear' || !gradient.type) {
        // Convert PowerPoint angle to CSS angle
        // PowerPoint: 0 = left to right, 90 = top to bottom
        // CSS: 0 = bottom to top, 90 = left to right
        var cssAngle = (gradient.angle + 90) % 360;
        return "background: linear-gradient(".concat(cssAngle, "deg, ").concat(stopsStr, ");");
      } else if (gradient.type === 'circle' || gradient.type === 'rect') {
        return "background: radial-gradient(circle, ".concat(stopsStr, ");");
      }
      return '';
    }

    /**
     * Convert hex color to rgba string for use in gradients
     * @param {string} hex - Hex color (#RRGGBB)
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} - rgba() color string
     */
  }, {
    key: "hexToRgbaForGradient",
    value: function hexToRgbaForGradient(hex) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      // Remove '#' if present
      hex = hex.replace('#', '');

      // Parse hex to RGB
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
      return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
    }

    /**
     * Apply background styling to a DOM element
     * @param {HTMLElement} element - Target element
     * @param {Object} background - Background configuration
     */
  }, {
    key: "applyBackgroundToElement",
    value: function applyBackgroundToElement(element, background) {
      if (!background) return;
      switch (background.type) {
        case 'solid':
          if (background.color) {
            element.style.backgroundColor = background.color;
          }
          break;
        case 'gradient':
          if (background.gradient) {
            element.style.background = this.createGradientStyle(background.gradient).replace('background: ', '').replace(';', '');
          }
          break;
        case 'image':
          if (background.image) {
            element.style.backgroundImage = "url('".concat(background.image, "')");
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
          }
          break;
        case 'pattern':
          if (background.color) {
            element.style.backgroundColor = background.color;
          }
          break;
      }
    }

    /**
     * Build inline style for an image with position and size
     * @param {Object} img - Image object with position and size
     * @returns {string} - CSS style string
     */
  }, {
    key: "buildImageStyle",
    value: function buildImageStyle(img) {
      var style = '';
      if (img.x !== undefined && img.y !== undefined) {
        style += "position: absolute; left: ".concat(img.x, "px; top: ").concat(img.y, "px;");
      }
      if (img.width) {
        style += "width: ".concat(img.width, "px;");
      }
      if (img.height) {
        style += "height: ".concat(img.height, "px;");
      }
      return style;
    }
  }]);
}(); // Export for use in other modules
window.StyleBuilder = StyleBuilder;

/* === renderers/text-formatter.js === */
/**
 * Text Formatter Module
 * Handles text formatting, font stacks, and text utilities
 */
var TextFormatter = /*#__PURE__*/function () {
  function TextFormatter() {
    _classCallCheck(this, TextFormatter);
  }
  return _createClass(TextFormatter, [{
    key: "formatTextElement",
    value:
    /**
     * Format a text element with styling
     * @param {Object|string} textElement - Text element object or string
     * @param {boolean} isTitle - Whether this is a title element
     * @returns {string} - HTML string
     */
    function formatTextElement(textElement) {
      var _this11 = this;
      var isTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!textElement) return '';

      // Handle legacy string format
      if (typeof textElement === 'string') {
        return this.escapeHtml(textElement);
      }

      // Handle structured text with formatting
      if (textElement.paragraphs) {
        return textElement.paragraphs.map(function (paragraph) {
          return paragraph.map(function (run) {
            var html = _this11.escapeHtml(run.text);

            // Apply formatting tags
            if (run.bold) html = "<strong>".concat(html, "</strong>");
            if (run.italic) html = "<em>".concat(html, "</em>");
            if (run.underline) html = "<u>".concat(html, "</u>");
            if (run.strikethrough) html = "<s>".concat(html, "</s>");
            if (run.superscript) html = "<sup>".concat(html, "</sup>");
            if (run.subscript) html = "<sub>".concat(html, "</sub>");

            // Build inline styles
            var style = '';
            if (run.color) style += "color: ".concat(run.color, ";");
            if (run.fontSize) style += "font-size: ".concat(run.fontSize, "pt;");
            if (run.fontFamily) {
              // Build font-family with fallbacks
              var fontStack = _this11.buildFontStack(run.fontFamily);
              style += "font-family: ".concat(fontStack, ";");
            }
            if (run.highlight) style += "background-color: ".concat(run.highlight, ";");
            if (run.textTransform && run.textTransform !== 'none') {
              if (run.textTransform === 'small-caps') {
                style += 'font-variant: small-caps;';
              } else if (run.textTransform === 'uppercase') {
                style += 'text-transform: uppercase;';
              }
            }
            if (run.shadow) {
              var s = run.shadow;
              var opacity = s.opacity !== undefined ? Math.min(1, Math.max(0, s.opacity)) : 1;
              style += "text-shadow: ".concat(s.offsetX || 0, "px ").concat(s.offsetY || 0, "px ").concat(s.blur || 0, "px ").concat(s.color || '#000').concat(opacity < 1 ? "".concat(Math.round(opacity * 100) / 100) : '', ";");
            }
            if (style) {
              html = "<span style=\"".concat(style, "\">").concat(html, "</span>");
            }
            return html;
          }).join('');
        }).join('<br>');
      }
      return '';
    }

    /**
     * Build a CSS font-family stack with appropriate fallbacks
     * @param {string} fontFamily - The primary font family
     * @returns {string} - CSS font-family value with fallbacks
     */
  }, {
    key: "buildFontStack",
    value: function buildFontStack(fontFamily) {
      if (!fontFamily) return 'inherit';

      // Check if we have a predefined mapping
      if (TextFormatter.FONT_MAP[fontFamily]) {
        return TextFormatter.FONT_MAP[fontFamily];
      }

      // For unknown fonts, create a reasonable fallback stack
      var lowerFont = fontFamily.toLowerCase();
      if (lowerFont.includes('sans') || lowerFont.includes('gothic') || lowerFont.includes('arial')) {
        return "\"".concat(fontFamily, "\", Arial, sans-serif");
      } else if (lowerFont.includes('serif') || lowerFont.includes('roman') || lowerFont.includes('times')) {
        return "\"".concat(fontFamily, "\", \"Times New Roman\", serif");
      } else if (lowerFont.includes('mono') || lowerFont.includes('courier') || lowerFont.includes('console')) {
        return "\"".concat(fontFamily, "\", \"Courier New\", monospace");
      }

      // Default fallback
      return "\"".concat(fontFamily, "\", Arial, sans-serif");
    }

    /**
     * Get plain text from a text element
     * @param {Object|string} textElement - Text element
     * @returns {string} - Plain text
     */
  }, {
    key: "getPlainText",
    value: function getPlainText(textElement) {
      if (!textElement) return '';
      if (typeof textElement === 'string') return textElement;
      if (textElement.paragraphs) {
        return textElement.paragraphs.map(function (p) {
          return p.map(function (r) {
            return r.text;
          }).join('');
        }).join(' ');
      }
      return '';
    }

    /**
     * Get the color of the first text run
     * @param {Object|string} textElement - Text element
     * @returns {string|null} - Color value or null
     */
  }, {
    key: "getTextColor",
    value: function getTextColor(textElement) {
      if (!textElement || typeof textElement === 'string') return null;
      if (textElement.paragraphs && textElement.paragraphs[0] && textElement.paragraphs[0][0]) {
        return textElement.paragraphs[0][0].color;
      }
      return null;
    }

    /**
     * Truncate text with ellipsis
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @returns {string} - Truncated text
     */
  }, {
    key: "truncateText",
    value: function truncateText(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
  }, {
    key: "escapeHtml",
    value: function escapeHtml(text) {
      if (!text) return '';
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }]);
}(); // Export for use in other modules
/**
 * Font mapping for common PowerPoint fonts to web-safe fallbacks
 */
_defineProperty(TextFormatter, "FONT_MAP", {
  // Sans-serif fonts
  'Calibri': '"Calibri", "Segoe UI", Arial, sans-serif',
  'Calibri Light': '"Calibri Light", "Calibri", "Segoe UI Light", Arial, sans-serif',
  'Arial': 'Arial, Helvetica, sans-serif',
  'Arial Black': '"Arial Black", Arial, sans-serif',
  'Helvetica': 'Helvetica, Arial, sans-serif',
  'Tahoma': 'Tahoma, Geneva, sans-serif',
  'Verdana': 'Verdana, Geneva, sans-serif',
  'Trebuchet MS': '"Trebuchet MS", Helvetica, sans-serif',
  'Segoe UI': '"Segoe UI", Tahoma, Geneva, sans-serif',
  'Century Gothic': '"Century Gothic", Arial, sans-serif',
  'Gill Sans MT': '"Gill Sans MT", "Gill Sans", Arial, sans-serif',
  'Franklin Gothic Medium': '"Franklin Gothic Medium", "Franklin Gothic", Arial, sans-serif',
  // Serif fonts
  'Times New Roman': '"Times New Roman", Times, serif',
  'Georgia': 'Georgia, "Times New Roman", serif',
  'Palatino Linotype': '"Palatino Linotype", Palatino, Georgia, serif',
  'Book Antiqua': '"Book Antiqua", Palatino, Georgia, serif',
  'Garamond': 'Garamond, "Times New Roman", serif',
  'Cambria': 'Cambria, Georgia, serif',
  // Monospace fonts
  'Courier New': '"Courier New", Courier, monospace',
  'Consolas': 'Consolas, Monaco, "Courier New", monospace',
  'Lucida Console': '"Lucida Console", Monaco, monospace',
  // Display/decorative fonts
  'Impact': 'Impact, "Arial Black", sans-serif',
  'Comic Sans MS': '"Comic Sans MS", cursive, sans-serif',
  'Brush Script MT': '"Brush Script MT", cursive',
  // Common presentation fonts
  'Aptos': 'Aptos, Calibri, Arial, sans-serif',
  'Aptos Display': '"Aptos Display", Aptos, Calibri, Arial, sans-serif'
});
window.TextFormatter = TextFormatter;

/* === renderers/shape-renderer.js === */
/**
 * Shape Renderer Module
 * Handles rendering of PowerPoint shapes to HTML/CSS
 */
var ShapeRenderer = /*#__PURE__*/function () {
  function ShapeRenderer(styleBuilder, textFormatter) {
    _classCallCheck(this, ShapeRenderer);
    this.styleBuilder = styleBuilder;
    this.textFormatter = textFormatter;
    this.chartRenderer = new ChartRenderer();
  }

  /**
   * Render multiple shapes to HTML
   * Shapes are sorted by z-index to ensure proper layering in HTML
   * @param {Array} shapes - Array of shape objects
   * @returns {string} - HTML string
   */
  return _createClass(ShapeRenderer, [{
    key: "renderShapes",
    value: function renderShapes() {
      var _this12 = this;
      var shapes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // Prefer PowerPoint spTree order (DOM order) unless zIndex is explicitly provided.
      // Sorting by a default (e.g. 0) can reshuffle elements and break stacking.
      var hasAnyZIndex = shapes.some(function (s) {
        return typeof (s === null || s === void 0 ? void 0 : s.zIndex) === 'number';
      });
      var ordered = hasAnyZIndex ? _toConsumableArray(shapes).map(function (shape, originalIndex) {
        return {
          shape: shape,
          originalIndex: originalIndex
        };
      }).sort(function (a, b) {
        var aIndex = typeof a.shape.zIndex === 'number' ? a.shape.zIndex : Number.POSITIVE_INFINITY;
        var bIndex = typeof b.shape.zIndex === 'number' ? b.shape.zIndex : Number.POSITIVE_INFINITY;
        if (aIndex !== bIndex) return aIndex - bIndex;
        return a.originalIndex - b.originalIndex; // stable
      }).map(function (x) {
        return x.shape;
      }) : shapes;
      return ordered.map(function (shape) {
        return _this12.renderShape(shape);
      }).join('');
    }

    /**
     * Render a single shape to HTML
     * @param {Object} shape - Shape object
     * @returns {string} - HTML string
     */
  }, {
    key: "renderShape",
    value: function renderShape(shape) {
      if (!shape) return '';

      // Handle group shapes (render children)
      if (shape.type === 'group' && Array.isArray(shape.shapes)) {
        return this.renderShapes(shape.shapes);
      }
      var style = this.buildShapeStyle(shape);
      var clipPath = this.getShapeClipPath(shape.type);
      var transform = shape.rotation ? "transform: rotate(".concat(shape.rotation, "deg);") : '';

      // Handle flip transforms
      if (shape.flipH || shape.flipV) {
        var scaleX = shape.flipH ? -1 : 1;
        var scaleY = shape.flipV ? -1 : 1;
        if (transform) {
          transform = transform.replace('transform:', "transform: scale(".concat(scaleX, ", ").concat(scaleY, ")"));
        } else {
          transform = "transform: scale(".concat(scaleX, ", ").concat(scaleY, ");");
        }
      }

      // Render pictures separately to ensure images show up
      if (shape.type === 'picture' && shape.src) {
        var _fullStyle = "".concat(style).concat(transform);
        return "<div class=\"slide-shape picture\" style=\"".concat(_fullStyle, "\"><img src=\"").concat(shape.src, "\" alt=\"\" /></div>");
      }

      // Render custom geometry shapes as SVG
      if (shape.type === 'custom' && shape.customGeometry) {
        return this.renderCustomGeometry(shape);
      }

      // Render line/connector shapes
      if (this.isLineShape(shape.type)) {
        return this.renderLineShape(shape);
      }

      // Render tables
      if (shape.type === 'table') {
        return this.renderTableShape(shape);
      }

      // Render charts (placeholder)
      if (shape.type === 'chart') {
        return this.chartRenderer.render(shape);
      }
      var textContent = '';
      var hasText = false;
      if (shape.text) {
        var boxStyle = this.buildTextBoxStyle(shape);
        textContent = "<div class=\"shape-text-box\" style=\"".concat(boxStyle, "\">").concat(this.formatShapeText(shape.text), "</div>");
        hasText = true;
      }
      var fullStyle = "".concat(style).concat(clipPath).concat(transform);

      // If shape has text, add a class to help with stacking context
      var shapeClass = hasText ? 'slide-shape with-text' : 'slide-shape';
      return "<div class=\"".concat(shapeClass, "\" style=\"").concat(fullStyle, "\">").concat(textContent, "</div>");
    }

    /**
     * Check if shape type is a line/connector
     * @param {string} type - Shape type
     * @returns {boolean}
     */
  }, {
    key: "isLineShape",
    value: function isLineShape(type) {
      var lineTypes = ['line', 'straightConnector1', 'bentConnector2', 'bentConnector3', 'bentConnector4', 'bentConnector5', 'curvedConnector2', 'curvedConnector3', 'curvedConnector4', 'curvedConnector5'];
      return lineTypes.includes(type);
    }

    /**
     * Build CSS for the text box inside a shape.
     * Uses EMU insets relative to the shape's EMU extents for PowerPoint-faithful padding.
     */
  }, {
    key: "buildTextBoxStyle",
    value: function buildTextBoxStyle(shape) {
      var cxEMU = typeof shape.cxEMU === 'number' && shape.cxEMU > 0 ? shape.cxEMU : null;
      var cyEMU = typeof shape.cyEMU === 'number' && shape.cyEMU > 0 ? shape.cyEMU : null;
      var left = 0,
        right = 0,
        top = 0,
        bottom = 0;
      if (shape.textInsetsEMU && cxEMU && cyEMU) {
        left = shape.textInsetsEMU.left / cxEMU * 100;
        right = shape.textInsetsEMU.right / cxEMU * 100;
        top = shape.textInsetsEMU.top / cyEMU * 100;
        bottom = shape.textInsetsEMU.bottom / cyEMU * 100;
      }
      var autoFit = shape.textAutoFit || null;
      var overflowMode = autoFit === 'norm' ? 'visible' : 'hidden';
      var style = "position: absolute; left: ".concat(left, "%; top: ").concat(top, "%; right: ").concat(right, "%; bottom: ").concat(bottom, "%; box-sizing: border-box; overflow: ").concat(overflowMode, "; display: flex; flex-direction: column; align-items: stretch;");

      // Lightly shrink text when norm autofit is requested to reduce clipping without measuring
      if (autoFit === 'norm') {
        style += 'font-size: 0.9em; line-height: 1.12; height: auto; min-height: 100%; bottom: auto;';
      }
      if (shape.textVAlign === 'bottom') {
        style += 'justify-content: flex-end;';
      } else if (shape.textVAlign === 'middle') {
        style += 'justify-content: center;';
      } else {
        style += 'justify-content: flex-start;';
      }
      if (shape.textWrap === false) {
        style += 'white-space: nowrap;';
      } else {
        style += 'white-space: normal;';
      }
      return style;
    }

    /**
     * Render a line/connector shape using SVG
     * @param {Object} shape - Line shape object
     * @returns {string} - HTML string with SVG
     */
  }, {
    key: "renderLineShape",
    value: function renderLineShape(shape) {
      var strokeColor = shape.stroke || '#000000';
      var strokeWidth = Math.max(1, shape.strokeWidth || 1);
      var x = shape.x;
      var y = shape.y;
      var width = Math.max(0.1, shape.width);
      var height = Math.max(0.1, shape.height);

      // Use explicit line points when provided (from connector resolution), otherwise infer orientation
      var x1 = 0,
        y1 = 0,
        x2 = '100%',
        y2 = '100%';
      if (shape.linePoints) {
        x1 = "".concat(shape.linePoints.x1, "%");
        y1 = "".concat(shape.linePoints.y1, "%");
        x2 = "".concat(shape.linePoints.x2, "%");
        y2 = "".concat(shape.linePoints.y2, "%");
      } else {
        var isHorizontal = height <= width * 0.2;
        var isVertical = width <= height * 0.2;
        if (isHorizontal) {
          y1 = '50%';
          y2 = '50%';
          x1 = 0;
          x2 = '100%';
        } else if (isVertical) {
          x1 = '50%';
          x2 = '50%';
          y1 = 0;
          y2 = '100%';
        }

        // Apply flips to swap endpoints (preserves arrow end meaning)
        if (shape.flipH) {
          var tmp = x1;
          x1 = x2;
          x2 = tmp;
        }
        if (shape.flipV) {
          var _tmp = y1;
          y1 = y2;
          y2 = _tmp;
        }
      }

      // Include z-index for proper layer ordering
      var zIndexStyle = typeof shape.zIndex === 'number' ? "z-index: ".concat(shape.zIndex, ";") : '';
      var style = "position: absolute; left: ".concat(x, "%; top: ").concat(y, "%; width: ").concat(width, "%; height: ").concat(height, "%; overflow: visible; ").concat(zIndexStyle);

      // Arrowheads: prefer mapping to connector start/end when available
      var uid = Math.random().toString(36).slice(2, 9);
      // If connector metadata present, attach tail to startCxn and head to endCxn
      var markerStartId = shape.startCxn && shape.arrowTail ? "arrow-start-".concat(uid) : shape.arrowTail && !shape.startCxn ? "arrow-start-".concat(uid) : null;
      var markerEndId = shape.endCxn && shape.arrowHead ? "arrow-end-".concat(uid) : shape.arrowHead && !shape.endCxn ? "arrow-end-".concat(uid) : null;
      var markerStart = markerStartId ? "\n            <marker id=\"".concat(markerStartId, "\" viewBox=\"0 0 10 10\" refX=\"2\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\">\n                <path d=\"M0 0 L10 5 L0 10 Z\" fill=\"").concat(strokeColor, "\" />\n            </marker>") : '';
      var markerEnd = markerEndId ? "\n            <marker id=\"".concat(markerEndId, "\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\">\n                <path d=\"M0 0 L10 5 L0 10 Z\" fill=\"").concat(strokeColor, "\" />\n            </marker>") : '';
      var markerStartAttr = markerStartId ? "marker-start=\"url(#".concat(markerStartId, ")\"") : '';
      var markerEndAttr = markerEndId ? "marker-end=\"url(#".concat(markerEndId, ")\"") : '';
      return "<div class=\"slide-shape line-shape\" style=\"".concat(style, "\">\n            <svg width=\"100%\" height=\"100%\" preserveAspectRatio=\"none\" style=\"overflow: visible;\">\n                <defs>").concat(markerStart).concat(markerEnd, "</defs>\n                <line x1=\"").concat(x1, "\" y1=\"").concat(y1, "\" x2=\"").concat(x2, "\" y2=\"").concat(y2, "\" \n                      stroke=\"").concat(strokeColor, "\" stroke-width=\"").concat(strokeWidth, "\" stroke-linecap=\"round\" ").concat(markerStartAttr, " ").concat(markerEndAttr, "/>\n            </svg>\n        </div>");
    }

    /**
     * Render a custom geometry shape using SVG paths
     * @param {Object} shape - Shape with custom geometry
     * @returns {string} - HTML string with SVG
     */
  }, {
    key: "renderCustomGeometry",
    value: function renderCustomGeometry(shape) {
      if (!shape.customGeometry || !shape.customGeometry.paths || shape.customGeometry.paths.length === 0) {
        // Fallback to bounding box rectangle
        return this.renderShape(_objectSpread(_objectSpread({}, shape), {}, {
          type: 'rect'
        }));
      }
      var x = shape.x;
      var y = shape.y;
      var width = Math.max(0.1, shape.width);
      var height = Math.max(0.1, shape.height);

      // Build SVG paths from custom geometry
      var pathsHTML = '';
      var _iterator36 = _createForOfIteratorHelper(shape.customGeometry.paths),
        _step36;
      try {
        for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
          var path = _step36.value;
          var fillColor = shape.fill === 'none' ? 'none' : typeof shape.fill === 'string' ? shape.fill : '#ffffff';
          var strokeColor = shape.stroke && shape.stroke !== 'none' ? shape.stroke : 'none';
          var strokeWidth = shape.strokeWidth || 1;
          pathsHTML += "<path d=\"".concat(path.data, "\" \n                            fill=\"").concat(fillColor, "\" \n                            stroke=\"").concat(strokeColor, "\" \n                            stroke-width=\"").concat(strokeWidth, "\"\n                            vector-effect=\"non-scaling-stroke\"/>");
        }
      } catch (err) {
        _iterator36.e(err);
      } finally {
        _iterator36.f();
      }
      var zIndexStyle = typeof shape.zIndex === 'number' ? "z-index: ".concat(shape.zIndex, ";") : '';
      var transformStyle = shape.rotation ? "transform: rotate(".concat(shape.rotation, "deg);") : '';
      var style = "position: absolute; left: ".concat(x, "%; top: ").concat(y, "%; width: ").concat(width, "%; height: ").concat(height, "%; overflow: visible; ").concat(transformStyle).concat(zIndexStyle);

      // If shape has text, add text box on top
      var textContent = '';
      if (shape.text) {
        var boxStyle = this.buildTextBoxStyle(shape);
        textContent = "<div class=\"shape-text-box\" style=\"".concat(boxStyle, "\">").concat(this.formatShapeText(shape.text), "</div>");
      }
      return "<div class=\"slide-shape custom-geometry\" style=\"".concat(style, "\">\n            <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\" style=\"overflow: visible;\">\n                ").concat(pathsHTML, "\n            </svg>\n            ").concat(textContent, "\n        </div>");
    }

    /**
     * Render a table shape using CSS grid
     * @param {Object} shape - Table shape object
     * @returns {string} - HTML string for the table
     */
  }, {
    key: "renderTableShape",
    value: function renderTableShape(shape) {
      var _rows$;
      var columns = shape.columnWidths || [];
      var rows = shape.rows || [];
      var rowHeights = shape.rowHeights || [];

      // Ensure minimum dimensions
      var width = Math.max(1, shape.width || 10);
      var height = Math.max(1, shape.height || 10);
      var x = shape.x || 0;
      var y = shape.y || 0;
      var colTemplate = columns.length > 0 ? columns.map(function (w) {
        return "".concat(w.toFixed(2), "%");
      }).join(' ') : "repeat(".concat(((_rows$ = rows[0]) === null || _rows$ === void 0 || (_rows$ = _rows$.cells) === null || _rows$ === void 0 ? void 0 : _rows$.length) || 1, ", 1fr)");
      var rowTemplate = rowHeights.length > 0 ? rowHeights.map(function (h) {
        return "".concat(h.toFixed(2), "%");
      }).join(' ') : "repeat(".concat(rows.length || 1, ", 1fr)");
      var zIndexStyle = typeof shape.zIndex === 'number' ? "z-index: ".concat(shape.zIndex, ";") : '';
      var transform = shape.rotation ? "transform: rotate(".concat(shape.rotation, "deg);") : '';
      var tableStyle = "position: absolute; left: ".concat(x, "%; top: ").concat(y, "%; width: ").concat(width, "%; height: ").concat(height, "%; display: grid; grid-template-columns: ").concat(colTemplate, "; grid-template-rows: ").concat(rowTemplate, "; ").concat(zIndexStyle).concat(transform, "box-sizing: border-box;");
      var cellsHtml = '';
      var _iterator37 = _createForOfIteratorHelper(rows),
        _step37;
      try {
        for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
          var row = _step37.value;
          var _iterator38 = _createForOfIteratorHelper(row.cells || []),
            _step38;
          try {
            for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
              var cell = _step38.value;
              var colSpan = Math.max(1, cell.colSpan || 1);
              var rowSpan = Math.max(1, cell.rowSpan || 1);

              // Apply cell fill
              var cellFill = '';
              if (cell.fill && cell.fill !== 'none') {
                if (typeof cell.fill === 'string') {
                  cellFill = "background-color: ".concat(cell.fill, ";");
                } else if (cell.fill.type === 'gradient' && cell.fill.gradient && Array.isArray(cell.fill.gradient.stops)) {
                  var firstStop = cell.fill.gradient.stops[0];
                  var color = (firstStop === null || firstStop === void 0 ? void 0 : firstStop.color) || '#ffffff';
                  cellFill = "background-color: ".concat(color, ";");
                }
              }

              // Apply cell margins/padding
              var margins = cell.margins || {
                l: 8,
                r: 8,
                t: 4,
                b: 4
              };
              var padding = "padding: ".concat(margins.t / 4, "px ").concat(margins.r / 4, "px ").concat(margins.b / 4, "px ").concat(margins.l / 4, "px;");

              // Apply borders
              var borderStyle = 'border: 1px solid #ddd;';
              if (cell.borders) {
                var borders = [];
                if (cell.borders.top) {
                  borders.push("border-top: ".concat(cell.borders.top.width, "px solid ").concat(cell.borders.top.color, ";"));
                }
                if (cell.borders.bottom) {
                  borders.push("border-bottom: ".concat(cell.borders.bottom.width, "px solid ").concat(cell.borders.bottom.color, ";"));
                }
                if (cell.borders.left) {
                  borders.push("border-left: ".concat(cell.borders.left.width, "px solid ").concat(cell.borders.left.color, ";"));
                }
                if (cell.borders.right) {
                  borders.push("border-right: ".concat(cell.borders.right.width, "px solid ").concat(cell.borders.right.color, ";"));
                }
                if (borders.length > 0) {
                  borderStyle = borders.join('');
                } else if (cell.stroke) {
                  borderStyle = "border: ".concat(cell.strokeWidth || 1, "px solid ").concat(cell.stroke, ";");
                }
              }

              // Header styling
              var headerStyle = '';
              if (cell.isHeader || row.isHeader) {
                headerStyle = 'font-weight: 700; text-align: center; vertical-align: middle;';
              }
              var colSpanStyle = colSpan > 1 ? "grid-column: span ".concat(colSpan, ";") : '';
              var rowSpanStyle = rowSpan > 1 ? "grid-row: span ".concat(rowSpan, ";") : '';
              var textContent = cell.text ? "<div class=\"table-text-box\">".concat(this.formatShapeText(cell.text), "</div>") : '';
              cellsHtml += "<div class=\"table-cell\" style=\"box-sizing: border-box; overflow: hidden; ".concat(borderStyle).concat(cellFill).concat(padding).concat(headerStyle).concat(colSpanStyle).concat(rowSpanStyle, "\">").concat(textContent, "</div>");
            }
          } catch (err) {
            _iterator38.e(err);
          } finally {
            _iterator38.f();
          }
        }
      } catch (err) {
        _iterator37.e(err);
      } finally {
        _iterator37.f();
      }
      return "<div class=\"slide-shape table-shape\" style=\"".concat(tableStyle, "\">").concat(cellsHtml, "</div>");
    }

    /**
     * Build CSS style for a shape
     * @param {Object} shape - Shape object
     * @returns {string} - CSS style string (uses percentages for scaling)
     */
  }, {
    key: "buildShapeStyle",
    value: function buildShapeStyle(shape) {
      // Ensure minimum dimensions for visibility. If percent dimensions are missing/zero but EMU extents exist,
      // recompute from the slide EMU size to avoid 0% sizing on text shapes.
      var slideWidthEMU = typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_WIDTH_EMU ? ShapeParser.SLIDE_WIDTH_EMU : 9144000;
      var slideHeightEMU = typeof ShapeParser !== 'undefined' && ShapeParser.SLIDE_HEIGHT_EMU ? ShapeParser.SLIDE_HEIGHT_EMU : 5143500;
      var width = typeof shape.width === 'number' ? shape.width : 0;
      var height = typeof shape.height === 'number' ? shape.height : 0;
      if ((width === 0 || !Number.isFinite(width)) && typeof shape.cxEMU === 'number' && shape.cxEMU > 0) {
        width = shape.cxEMU / slideWidthEMU * 100;
      }
      if ((height === 0 || !Number.isFinite(height)) && typeof shape.cyEMU === 'number' && shape.cyEMU > 0) {
        height = shape.cyEMU / slideHeightEMU * 100;
      }
      width = Math.max(0.1, width);
      height = Math.max(0.1, height);

      // Determine positioning based on placeholder type
      var x = shape.x || 0;
      var y = shape.y || 0;

      // Reposition footer and slide number placeholders to bottom-right
      if (shape.isPlaceholder && (shape.placeholderType === 'sldNum' || shape.placeholderType === 'ftr' || shape.placeholderType === 'dt')) {
        // Bottom-right corner (accounting for element dimensions)
        x = 100 - width - 1; // 1% margin from right edge
        y = 100 - height - 1; // 1% margin from bottom edge
      }

      // Use percentage-based positioning and sizing for proper scaling
      // box-sizing: border-box ensures padding/border don't expand the element
      var style = "position: absolute; left: ".concat(x, "%; top: ").concat(y, "%; width: ").concat(width, "%; height: ").concat(height, "%; box-sizing: border-box;");

      // Only apply z-index when explicitly provided.
      // Otherwise let DOM order determine stacking (matches spTree order).
      if (typeof shape.zIndex === 'number') {
        style += "z-index: ".concat(shape.zIndex, ";");
      }

      // Note: text alignment/insets are handled by inner .shape-text-box

      // Fill
      if (shape.fill) {
        if (shape.fill === 'none') {
          style += 'background: transparent;';
        } else if (typeof shape.fill === 'string') {
          style += "background-color: ".concat(shape.fill, ";");
        } else if (shape.fill.type === 'solid' && shape.fill.color) {
          // Solid fill with potential opacity
          var color = shape.fill.color;
          var opacity = shape.fill.opacity !== undefined ? shape.fill.opacity : 1;
          if (opacity < 1) {
            var rgba = this.hexToRgba(color, opacity);
            style += "background-color: ".concat(rgba, ";");
          } else {
            style += "background-color: ".concat(color, ";");
          }
        } else if (shape.fill.type === 'gradient') {
          style += this.styleBuilder.createGradientStyle(shape.fill.gradient);
        } else if (shape.fill.type === 'image' && shape.fill.src) {
          style += "background-image: url('".concat(shape.fill.src, "'); background-size: cover; background-position: center;");
        }
      }

      // Explicit picture support (fallback if fill isn't set)
      if (shape.type === 'picture' && shape.src) {
        style += "background-image: url('".concat(shape.src, "'); background-size: contain; background-repeat: no-repeat; background-position: center;");
      }

      // Stroke
      if (shape.stroke && shape.stroke !== 'none') {
        style += "border: ".concat(Math.max(1, shape.strokeWidth), "px solid ").concat(shape.stroke, ";");
      } else if (shape.stroke === 'none') {
        style += 'border: none;';
      }

      // Shadow effects
      if (shape.shadow) {
        var shadow = shape.shadow;
        var offsetX = (shadow.distance || 0) * Math.cos((shadow.angle || 0) * Math.PI / 180);
        var offsetY = (shadow.distance || 0) * Math.sin((shadow.angle || 0) * Math.PI / 180);
        var blur = shadow.blur || 0;
        var _color = shadow.color || '#000000';
        var _opacity = shadow.opacity !== undefined ? shadow.opacity : 1;
        var _rgba = this.hexToRgba(_color, _opacity);
        style += "box-shadow: ".concat(offsetX, "px ").concat(offsetY, "px ").concat(blur, "px ").concat(_rgba, ";");
      }

      // Corner radius from parsed geometry
      if (shape.cornerRadius !== null && shape.cornerRadius !== undefined) {
        var radiusPercent = shape.cornerRadius * 100;
        style += "border-radius: ".concat(radiusPercent, "%;");
      }

      // 3D effects and filters
      style = this.apply3DEffects(shape, style);
      return style;
    }

    /**
     * Apply 3D effects and CSS filters to shapes
     * @param {Object} shape - Shape object
     * @param {string} style - Existing style string
     * @returns {string} - Modified style string with 3D effects
     */
  }, {
    key: "apply3DEffects",
    value: function apply3DEffects(shape, style) {
      var type = shape.type;

      // Apply CSS filters and 3D transforms based on shape type
      if (type === 'cube') {
        // Add perspective and subtle 3D transform for cube effect
        style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); transform: perspective(1000px) rotateX(5deg) rotateY(-5deg);';
        // Add inset shadow for depth
        style += 'box-shadow: inset -2px -2px 5px rgba(0,0,0,0.2), inset 2px 2px 5px rgba(255,255,255,0.3);';
      } else if (type === 'cylinder') {
        // Cylindrical shading with gradient
        style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); box-shadow: inset -3px 0 5px rgba(0,0,0,0.2);';
      } else if (type === 'sphere') {
        // Spherical shading effect
        style += 'filter: drop-shadow(-3px 3px 5px rgba(0,0,0,0.3)); box-shadow: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent), inset -2px -2px 5px rgba(0,0,0,0.2);';
      } else if (type === 'cone') {
        // Conical depth effect
        style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); box-shadow: inset 2px 2px 5px rgba(0,0,0,0.15);';
      } else if (type === 'pyramid') {
        // Pyramidal depth with perspective
        style += 'filter: drop-shadow(-2px 3px 4px rgba(0,0,0,0.3)); transform: perspective(1000px) rotateX(3deg);';
      } else if (type === 'tetrahedron') {
        // Tetrahedral effect
        style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.25)); box-shadow: inset 1px 1px 3px rgba(0,0,0,0.1);';
      } else if (type === 'octahedron') {
        // Octahedral faceted effect
        style += 'filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.3)); box-shadow: inset -1px -1px 3px rgba(0,0,0,0.15);';
      } else if (type === 'ribbon' || type === 'ribbon2') {
        // Ribbon fold effect with skew
        style += 'filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));';
        if (shape.fill && typeof shape.fill === 'string') {
          // Add subtle gradient to simulate ribbon fold
          var fill = shape.fill;
          style = style.replace("background-color: ".concat(fill), "background: linear-gradient(135deg, ".concat(fill, " 0%, ").concat(this.adjustBrightness(fill, -20), " 100%)"));
        }
      } else if (type.includes('curved') || type === 'doubleWave') {
        // Curved shapes get subtle shadow
        style += 'filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.15));';
      } else if (type.includes('action') || type.includes('explosion') || type.includes('star')) {
        // Action buttons, explosions, and stars get subtle shadow
        style += 'filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.15));';
      }
      return style;
    }

    /**
     * Adjust brightness of a hex color
     * @param {string} hex - Hex color code
     * @param {number} amount - Amount to adjust (-100 to 100)
     * @returns {string} - Adjusted hex color
     */
  }, {
    key: "adjustBrightness",
    value: function adjustBrightness(hex, amount) {
      var color = hex.replace('#', '');
      var num = parseInt(color, 16);
      var r = Math.min(255, Math.max(0, (num >> 16) + amount));
      var g = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amount));
      var b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
      return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
    }

    /**
     * Convert hex color to rgba
     * @param {string} hex - Hex color code
     * @param {number} alpha - Alpha value (0-1)
     * @returns {string} - rgba() color string
     */
  }, {
    key: "hexToRgba",
    value: function hexToRgba(hex) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      // Remove # if present
      hex = hex.replace('#', '');

      // Parse hex to RGB
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
      return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
    }

    /**
     * Get CSS clip-path for shape type
     * @param {string} type - Shape type
     * @returns {string} - CSS clip-path or border-radius
     */
  }, {
    key: "getShapeClipPath",
    value: function getShapeClipPath(type) {
      var clipPaths = {
        'square': '',
        'ellipse': 'border-radius: 50%;',
        'circle': 'border-radius: 50%;',
        // PowerPoint's default rounded corners are typically subtler than 12%.
        // Use a smaller radius for a sharper look.
        // Cap in px so large shapes don't get overly round.
        'roundSquare': 'border-radius: min(10px, 3%);',
        'roundRect': 'border-radius: min(10px, 3%);',
        'triangle': 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);',
        'rightTriangle': 'clip-path: polygon(0% 0%, 0% 100%, 100% 100%);',
        'diamond': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
        'pentagon': 'clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);',
        'hexagon': 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
        'heptagon': 'clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);',
        'octagon': 'clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);',
        'star5': 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);',
        'star4': 'clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);',
        'star6': 'clip-path: polygon(50% 0%, 61% 25%, 90% 10%, 75% 40%, 95% 60%, 60% 50%, 75% 90%, 50% 65%, 25% 90%, 40% 50%, 5% 60%, 25% 40%, 10% 10%);',
        'parallelogram': 'clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);',
        'trapezoid': 'clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);',
        'arrow': 'clip-path: polygon(0% 20%, 65% 20%, 65% 0%, 100% 50%, 65% 100%, 65% 80%, 0% 80%);',
        'rightArrow': 'clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);',
        'leftArrow': 'clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);',
        'upArrow': 'clip-path: polygon(50% 0%, 100% 40%, 80% 40%, 80% 100%, 20% 100%, 20% 40%, 0% 40%);',
        'downArrow': 'clip-path: polygon(20% 0%, 80% 0%, 80% 60%, 100% 60%, 50% 100%, 0% 60%, 20% 60%);',
        'heart': 'clip-path: polygon(50% 100%, 0% 30%, 25% 0%, 50% 15%, 75% 0%, 100% 30%);',
        // Callout shapes
        'speechBubble': 'clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 20% 85%, 10% 100%, 15% 85%, 0% 85%);',
        'speechBubbleOval': 'clip-path: ellipse(50% 45% at 50% 45%); position: relative;',
        'calloutRect': 'clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);',
        'calloutRoundRect': 'clip-path: polygon(5% 0%, 85% 0%, 100% 5%, 100% 50%, 100% 95%, 85% 100%, 5% 100%, 0% 95%, 0% 5%);',
        'calloutOval': 'border-radius: 50%;',
        // Flowchart shapes
        'flowChartProcess': '',
        'flowChartDecision': 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
        'flowChartInputOutput': 'clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);',
        'flowChartTerminator': 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
        'flowChartData': 'clip-path: polygon(0% 25%, 100% 0%, 100% 75%, 0% 100%);',
        'flowChartDocument': 'clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%);',
        'flowChartMultidocument': 'clip-path: polygon(0% 10%, 100% 0%, 100% 90%, 10% 100%, 0% 85%);',
        'flowChartPredefinedProcess': 'clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);',
        // 3D shapes (using CSS transforms)
        'cube': 'perspective(600px);',
        'cylinder': 'clip-path: ellipse(50% 30% at 50% 30%);',
        'sphere': 'border-radius: 50%;',
        'cone': 'clip-path: polygon(50% 0%, 100% 100%, 0% 100%);',
        'pyramid': 'clip-path: polygon(50% 0%, 100% 100%, 0% 100%);',
        // Block arrows
        'blockArcRight': 'clip-path: polygon(0% 25%, 75% 25%, 75% 0%, 100% 50%, 75% 100%, 75% 75%, 0% 75%);',
        'blockArcLeft': 'clip-path: polygon(25% 25%, 100% 25%, 100% 75%, 25% 75%, 25% 100%, 0% 50%, 25% 0%);',
        'blockArcUp': 'clip-path: polygon(25% 25%, 75% 25%, 100% 0%, 50% 25%, 0% 0%, 25% 25%, 25% 100%, 75% 100%, 75% 75%, 25% 75%);',
        'blockArcDown': 'clip-path: polygon(25% 0%, 75% 0%, 75% 25%, 100% 100%, 50% 75%, 0% 100%, 25% 25%, 25% 100%, 75% 100%, 75% 75%);',
        // Additional flowchart shapes
        'flowChartOffPage': 'clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 85% 85%, 85% 100%, 0% 100%);',
        'flowChartMerge': 'clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%);',
        'flowChartExtract': 'clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%);',
        'flowChartOr': 'border-radius: 50%;',
        'flowChartSum': 'clip-path: polygon(50% 0%, 100% 30%, 75% 50%, 100% 70%, 50% 100%, 0% 70%, 25% 50%, 0% 30%);',
        'flowChartSort': 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
        'flowChartManualInput': 'clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%);',
        'flowChartDelay': 'clip-path: path(\"M 0,0 L 70,0 Q 100,0 100,30 Q 100,100 100,100 L 0,100 Q 0,50 0,0\");',
        // Additional 3D shapes with gradient support
        'tetrahedron': 'clip-path: polygon(50% 0%, 100% 85%, 0% 85%);',
        'octahedron': 'clip-path: polygon(50% 0%, 100% 37%, 75% 62%, 100% 100%, 50% 75%, 0% 100%, 25% 62%, 0% 37%);',
        // Additional arrow shapes
        'quadArrow': 'clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);',
        'leftRightArrow': 'clip-path: polygon(0% 40%, 40% 40%, 40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%);',
        'upDownArrow': 'clip-path: polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 50% 60%, 0% 40%, 40% 40%, 40% 100%, 60% 100%, 60% 60%, 50% 40%);',
        // Ribbon shapes
        'ribbon': 'clip-path: polygon(0% 0%, 100% 10%, 90% 50%, 100% 90%, 0% 100%, 10% 50%);',
        'ribbon2': 'clip-path: polygon(10% 0%, 100% 0%, 90% 50%, 100% 100%, 10% 100%, 0% 50%);',
        // Wavy shapes
        'doubleWave': 'clip-path: path(\"M 0,50 Q 25,20 50,50 T 100,50 L 100,100 Q 75,70 50,100 T 0,100\");',
        // Chevron shapes
        'chevron': 'clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%);',
        'chevronRight': 'clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%);',
        // Curved arrow shapes
        'curvedUpArrow': 'clip-path: path(\"M 0,100 Q 50,0 100,100 L 85,80 Q 50,40 15,80\");',
        'curvedDownArrow': 'clip-path: path(\"M 0,0 Q 50,100 100,0 L 85,20 Q 50,60 15,20\");',
        'curvedLeftArrow': 'clip-path: path(\"M 100,0 Q 0,50 100,100 L 80,85 Q 40,50 80,15\");',
        'curvedRightArrow': 'clip-path: path(\"M 0,0 Q 100,50 0,100 L 20,85 Q 60,50 20,15\");'
      };
      // Note: cornerRadius is now applied directly in buildShapeStyle, so clipPaths
      // is mainly used for non-rounded preset shapes
      return clipPaths[type] || '';
    }

    /**
     * Format text inside a shape
     * @param {Array} textParts - Array of paragraphs with runs
     * @returns {string} - HTML string
     */
  }, {
    key: "formatShapeText",
    value: function formatShapeText(textParts) {
      var _this13 = this;
      if (!textParts || !Array.isArray(textParts)) return '';

      // Base font size is 18pt (1em), so convert pt to em for proper scaling
      var BASE_FONT_SIZE = 18;

      // Numbering counters per level (0-based)
      var counters = new Array(10).fill(null);
      var escapeAttr = function escapeAttr(value) {
        var s = String(value !== null && value !== void 0 ? value : '');
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      };
      return textParts.map(function (paragraph) {
        var meta = (paragraph === null || paragraph === void 0 ? void 0 : paragraph[0]) || {};
        var paragraphAlign = meta.align || 'left';
        var lvl = typeof meta.lvl === 'number' ? meta.lvl : 0;
        var bullet = meta.bullet || null;
        var spaceBeforeEm = typeof meta.spaceBeforeEm === 'number' ? meta.spaceBeforeEm : null;
        var spaceAfterEm = typeof meta.spaceAfterEm === 'number' ? meta.spaceAfterEm : null;
        var lineHeight = typeof meta.lineHeight === 'number' ? meta.lineHeight : null;
        var runsHtml = paragraph.map(function (run) {
          var html = _this13.textFormatter.escapeHtml(run.text);
          var style = '';
          if (run.color) style += "color: ".concat(run.color, ";");
          if (run.highlight) style += "background-color: ".concat(run.highlight, ";");
          if (run.fontSize) {
            var emSize = run.fontSize / BASE_FONT_SIZE;
            style += "font-size: ".concat(emSize.toFixed(3), "em;");
          }
          if (run.fontFamily) {
            style += "font-family: ".concat(run.fontFamily, ";");
          }
          if (run.bold) style += 'font-weight: 700;';
          if (run.italic) style += 'font-style: italic;';
          var decorations = [];
          if (run.underline) decorations.push('underline');
          if (run.strikethrough) decorations.push('line-through');
          if (decorations.length) style += "text-decoration: ".concat(decorations.join(' '), ";");
          if (run.textTransform && run.textTransform !== 'none') {
            if (run.textTransform === 'small-caps') style += 'font-variant: small-caps;';else if (run.textTransform === 'uppercase') style += 'text-transform: uppercase;';
          }
          if (run.shadow) {
            var s = run.shadow;
            var opacity = s.opacity !== undefined ? Math.min(1, Math.max(0, s.opacity)) : 1;
            style += "text-shadow: ".concat(s.offsetX || 0, "px ").concat(s.offsetY || 0, "px ").concat(s.blur || 0, "px ").concat(s.color || '#000').concat(opacity < 1 ? '' : '', ";");
          }
          if (style) {
            html = "<span style=\"".concat(style, "\">").concat(html, "</span>");
          }
          if (run.superscript) html = "<sup>".concat(html, "</sup>");
          if (run.subscript) html = "<sub>".concat(html, "</sub>");
          if (run.link && run.link.kind === 'url' && run.link.href) {
            var href = escapeAttr(run.link.href);
            html = "<a class=\"pptx-link\" href=\"".concat(href, "\" target=\"_blank\" rel=\"noopener noreferrer\">").concat(html, "</a>");
          } else if (run.link && run.link.kind === 'slide' && Number.isFinite(run.link.slideIndex)) {
            html = "<a class=\"pptx-link\" href=\"#\" data-pptx-slide=\"".concat(run.link.slideIndex, "\">").concat(html, "</a>");
          }
          return html;
        }).join('');
        var bulletEnabled = bullet && bullet.type !== 'none' && (bullet.type === 'char' || bullet.type === 'auto');
        var marLEm = typeof meta.marLEm === 'number' ? meta.marLEm : null;
        var indentEm = typeof meta.indentEm === 'number' ? meta.indentEm : null;
        var marginTop = spaceBeforeEm !== null ? "margin-top: ".concat(spaceBeforeEm.toFixed(3), "em;") : '';
        var marginBottom = spaceAfterEm !== null ? "margin-bottom: ".concat(spaceAfterEm.toFixed(3), "em;") : '';
        var lineHt = lineHeight !== null ? "line-height: ".concat(lineHeight.toFixed(3), ";") : '';
        var paragraphStyle = "".concat(marginTop).concat(marginBottom).concat(lineHt);
        if (!bulletEnabled) {
          // Reset deeper counters when leaving an auto-numbered list
          for (var i = lvl; i < counters.length; i++) counters[i] = null;
          var padLeft = marLEm !== null ? "padding-left: ".concat(marLEm.toFixed(3), "em;") : '';
          var textIndent = indentEm !== null ? "text-indent: ".concat(indentEm.toFixed(3), "em;") : '';
          return "<div class=\"pptx-paragraph\" style=\"text-align: ".concat(paragraphAlign, "; white-space: inherit; ").concat(padLeft).concat(textIndent).concat(paragraphStyle, "\">").concat(runsHtml, "</div>");
        }

        // Reset deeper levels when current level changes
        for (var _i5 = lvl + 1; _i5 < counters.length; _i5++) counters[_i5] = null;
        var marker = '•';
        if (bullet.type === 'auto') {
          var startAt = Number.isFinite(bullet.startAt) ? bullet.startAt : 1;
          if (counters[lvl] === null) counters[lvl] = startAt;
          var numType = (bullet.numType || '').toLowerCase();
          var formatAutoNumber = function formatAutoNumber(value) {
            var n = Math.max(1, value);
            var toRoman = function toRoman(val) {
              var romans = [{
                v: 1000,
                s: 'M'
              }, {
                v: 900,
                s: 'CM'
              }, {
                v: 500,
                s: 'D'
              }, {
                v: 400,
                s: 'CD'
              }, {
                v: 100,
                s: 'C'
              }, {
                v: 90,
                s: 'XC'
              }, {
                v: 50,
                s: 'L'
              }, {
                v: 40,
                s: 'XL'
              }, {
                v: 10,
                s: 'X'
              }, {
                v: 9,
                s: 'IX'
              }, {
                v: 5,
                s: 'V'
              }, {
                v: 4,
                s: 'IV'
              }, {
                v: 1,
                s: 'I'
              }];
              var num = val;
              var res = '';
              for (var _i6 = 0, _romans = romans; _i6 < _romans.length; _i6++) {
                var r = _romans[_i6];
                while (num >= r.v) {
                  res += r.s;
                  num -= r.v;
                }
              }
              return res;
            };
            var toAlpha = function toAlpha(val, upper) {
              var num = val;
              var res = '';
              while (num > 0) {
                num--; // 1 -> A
                res = String.fromCharCode(97 + num % 26) + res;
                num = Math.floor(num / 26);
              }
              return upper ? res.toUpperCase() : res;
            };
            if (numType.includes('roman')) {
              var roman = toRoman(n);
              return numType.includes('lc') ? roman.toLowerCase() : roman;
            }
            if (numType.includes('alpha') || numType.includes('alph')) {
              var upper = numType.includes('uc');
              return toAlpha(n, upper);
            }
            return String(n);
          };
          var rawMarker = formatAutoNumber(counters[lvl]);
          var prefix = '';
          var suffix = '.';
          if (numType.includes('parenboth')) {
            prefix = '(';
            suffix = ')';
          } else if (numType.includes('parenr')) {
            suffix = ')';
          } else if (numType.includes('paren')) {
            suffix = ')';
          } else if (numType.includes('period')) {
            suffix = '.';
          } else {
            suffix = '.';
          }
          marker = "".concat(prefix).concat(rawMarker).concat(suffix);
          counters[lvl] += 1;
        } else {
          marker = bullet.char || '•';
        }

        // PowerPoint uses paragraph properties for indentation:
        // - marL: left margin (where the text body starts)
        // - indent: first-line indent (often negative for hanging bullets)
        // When these are present, they should define the paragraph position.
        // Fall back to a reasonable per-level indent only when marL is missing.
        var paddingLeftEm = marLEm !== null ? marLEm : lvl * 1.25;

        // For hanging bullets (indent < 0), shift the marker left by indent,
        // and reserve space equal to -indent so text aligns at marL.
        var markerOffsetEm = indentEm !== null && indentEm < 0 ? indentEm : 0;
        var markerWidthEm = indentEm !== null && indentEm < 0 ? Math.max(0.5, -indentEm) : 1.2;
        var safeLvl = Math.max(0, Math.min(9, lvl));
        return "\n                <div class=\"pptx-paragraph pptx-bullet pptx-lvl-".concat(safeLvl, "\" style=\"padding-left: ").concat(paddingLeftEm.toFixed(3), "em; ").concat(paragraphStyle, "\">\n                    <span class=\"pptx-bullet-marker\" style=\"margin-left: ").concat(markerOffsetEm.toFixed(3), "em; width: ").concat(markerWidthEm.toFixed(3), "em;\">").concat(_this13.textFormatter.escapeHtml(marker), "</span>\n                    <span class=\"pptx-bullet-content\" style=\"text-align: ").concat(paragraphAlign, ";\">").concat(runsHtml, "</span>\n                </div>\n            ");
      }).join('');
    }
  }]);
}(); // Export for use in other modules
window.ShapeRenderer = ShapeRenderer;

/* === renderers/slide-renderer.js === */
/**
 * Slide Renderer Module
 * Orchestrates rendering of slides to HTML with proper layout and styling
 */
var SlideRenderer = /*#__PURE__*/function () {
  /**
   * Create a Slide Renderer
   */
  function SlideRenderer() {
    _classCallCheck(this, SlideRenderer);
    this.styleBuilder = new StyleBuilder();
    this.textFormatter = new TextFormatter();
    this.shapeRenderer = new ShapeRenderer(this.styleBuilder, this.textFormatter);
  }

  /**
   * Create HTML for a single slide
   * @param {Object} slide - Parsed slide data
   * @returns {string} - HTML string for the slide
   */
  return _createClass(SlideRenderer, [{
    key: "createSlideHTML",
    value: function createSlideHTML(slide) {
      var _slide$slideSize, _slide$slideSize2, _slide$slideSize3, _slide$slideSize4;
      if (!slide || !slide.shapes) {
        return '<div class="slide" style="background: white;"></div>';
      }

      // Build background style
      var bgStyle = this.buildBackgroundStyle(slide.background);

      // Slide size/aspect ratio (from presentation.xml p:sldSz)
      var ratio = ((_slide$slideSize = slide.slideSize) === null || _slide$slideSize === void 0 ? void 0 : _slide$slideSize.ratio) || 16 / 9;
      var invRatio = ((_slide$slideSize2 = slide.slideSize) === null || _slide$slideSize2 === void 0 ? void 0 : _slide$slideSize2.invRatio) || 9 / 16;
      var aspectRatio = (_slide$slideSize3 = slide.slideSize) !== null && _slide$slideSize3 !== void 0 && _slide$slideSize3.cx && (_slide$slideSize4 = slide.slideSize) !== null && _slide$slideSize4 !== void 0 && _slide$slideSize4.cy ? "".concat(slide.slideSize.cx, " / ").concat(slide.slideSize.cy) : '16 / 9';

      // Render all shapes
      var shapesHTML = slide.shapes.length > 0 ? this.shapeRenderer.renderShapes(slide.shapes) : '';
      return "\n            <div class=\"slide-wrapper\">\n                <div class=\"slide\" style=\"".concat(bgStyle, " --slide-ratio: ").concat(ratio, "; --slide-inv-ratio: ").concat(invRatio, "; aspect-ratio: ").concat(aspectRatio, ";\">\n                    <div class=\"slide-shapes-container\">\n                        ").concat(shapesHTML, "\n                    </div>\n                </div>\n            </div>\n        ");
    }

    /**
     * Create a thumbnail element for a slide
     * @param {Object} slide - Parsed slide data
     * @param {number} index - Slide index
     * @param {Function} onThumbnailClick - Callback when thumbnail is clicked
     * @returns {HTMLElement} - Thumbnail element
     */
  }, {
    key: "createThumbnail",
    value: function createThumbnail(slide, index, onThumbnailClick) {
      var _slide$slideSize5, _slide$slideSize6, _slide$slideSize7, _slide$slideSize8;
      // Create container
      var thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      thumbnail.dataset.slide = index;

      // Build background style with thumbnail sizing
      var bgStyle = this.buildBackgroundStyle(slide.background);
      var ratio = ((_slide$slideSize5 = slide.slideSize) === null || _slide$slideSize5 === void 0 ? void 0 : _slide$slideSize5.ratio) || 16 / 9;
      var invRatio = ((_slide$slideSize6 = slide.slideSize) === null || _slide$slideSize6 === void 0 ? void 0 : _slide$slideSize6.invRatio) || 9 / 16;
      var aspectRatio = (_slide$slideSize7 = slide.slideSize) !== null && _slide$slideSize7 !== void 0 && _slide$slideSize7.cx && (_slide$slideSize8 = slide.slideSize) !== null && _slide$slideSize8 !== void 0 && _slide$slideSize8.cy ? "".concat(slide.slideSize.cx, " / ").concat(slide.slideSize.cy) : '16 / 9';
      thumbnail.style.setProperty('--slide-ratio', ratio);
      thumbnail.style.setProperty('--slide-inv-ratio', invRatio);
      thumbnail.style.aspectRatio = aspectRatio;

      // Render shapes with thumbnail scaling
      var shapesHTML = slide.shapes && slide.shapes.length > 0 ? this.shapeRenderer.renderShapes(slide.shapes) : '';

      // Create slide preview (16:9 aspect ratio)
      var slidePreview = document.createElement('div');
      slidePreview.className = 'thumbnail-slide';
      slidePreview.style.cssText = "".concat(bgStyle, " --slide-ratio: ").concat(ratio, "; --slide-inv-ratio: ").concat(invRatio, "; aspect-ratio: ").concat(aspectRatio, ";");
      slidePreview.innerHTML = "\n            <div class=\"slide-shapes-container\">\n                ".concat(shapesHTML, "\n            </div>\n        ");
      thumbnail.appendChild(slidePreview);

      // Add slide number
      var slideNumber = document.createElement('div');
      slideNumber.className = 'thumbnail-number';
      slideNumber.textContent = (index + 1).toString();
      thumbnail.appendChild(slideNumber);

      // Add click handler
      thumbnail.addEventListener('click', function () {
        return onThumbnailClick(index);
      });
      return thumbnail;
    }

    /**
     * Build background CSS style
     * @param {Object} background - Background object from parser
     * @returns {string} - CSS style string
     */
  }, {
    key: "buildBackgroundStyle",
    value: function buildBackgroundStyle(background) {
      if (!background) {
        return 'background: white;';
      }
      var style = '';
      switch (background.type) {
        case 'solid':
          if (background.color) {
            style = "background: ".concat(background.color, ";");
          } else {
            style = 'background: white;';
          }
          break;
        case 'gradient':
          if (background.gradient) {
            style = this.buildGradientStyle(background.gradient);
          } else {
            style = 'background: white;';
          }
          break;
        case 'image':
          if (background.image) {
            style = "background-image: url(".concat(background.image, "); background-size: cover; background-position: center;");
          } else {
            style = 'background: white;';
          }
          break;
        case 'pattern':
          if (background.color) {
            style = "background: ".concat(background.color, ";");
          } else {
            style = 'background: white;';
          }
          break;
        default:
          style = 'background: white;';
      }
      return style;
    }

    /**
     * Build CSS gradient style
     * @param {Object} gradient - Gradient object
     * @returns {string} - CSS gradient string
     */
  }, {
    key: "buildGradientStyle",
    value: function buildGradientStyle(gradient) {
      if (!gradient || !gradient.stops || gradient.stops.length === 0) {
        return 'background: white;';
      }
      try {
        var angle = gradient.angle || 90;
        var colorStops = gradient.stops.map(function (stop) {
          return "".concat(stop.color, " ").concat(stop.position * 100, "%");
        }).join(', ');
        return "background: linear-gradient(".concat(angle, "deg, ").concat(colorStops, ");");
      } catch (error) {
        console.warn('Error building gradient style:', error);
        return 'background: white;';
      }
    }

    /**
     * Scale slide coordinates for thumbnail display
     * @param {number} value - Original coordinate value
     * @param {number} scale - Scale factor (typically 0.2 for thumbnails)
     * @returns {number} - Scaled value
     */
  }, {
    key: "scaleValue",
    value: function scaleValue(value) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
      return value * scale;
    }
  }]);
}();
/* === ui/theme-manager.js === */
/**
 * Theme Manager Module
 * Handles theme switching and persistence
 */
var ThemeManager = /*#__PURE__*/function () {
  function ThemeManager() {
    _classCallCheck(this, ThemeManager);
    this.themeToggle = document.getElementById('theme-toggle');
    this.initialize();
  }

  /**
   * Initialize theme based on stored preference or system preference
   */
  return _createClass(ThemeManager, [{
    key: "initialize",
    value: function initialize() {
      var _this14 = this;
      // Check for stored preference
      var storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.setTheme(storedTheme);
      } else {
        // Auto-detect based on system preference
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
      }

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
          _this14.setTheme(e.matches ? 'dark' : 'light');
        }
      });

      // Bind toggle event
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', function () {
          return _this14.toggle();
        });
      }
    }

    /**
     * Toggle between dark and light theme
     */
  }, {
    key: "toggle",
    value: function toggle() {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }

    /**
     * Set the theme
     * @param {string} theme - 'dark' or 'light'
     */
  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Get current theme
     * @returns {string} - Current theme
     */
  }, {
    key: "getTheme",
    value: function getTheme() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
  }]);
}(); // Export for use in other modules
window.ThemeManager = ThemeManager;

/* === ui/keyboard-manager.js === */
/**
 * Keyboard Manager Module
 * Handles keyboard input and shortcuts
 */
var KeyboardManager = /*#__PURE__*/function () {
  function KeyboardManager(navigator) {
    _classCallCheck(this, KeyboardManager);
    this.navigator = navigator;
    this.bindKeyboardEvents();
  }

  /**
   * Bind keyboard event listeners
   */
  return _createClass(KeyboardManager, [{
    key: "bindKeyboardEvents",
    value: function bindKeyboardEvents() {
      var _this15 = this;
      document.addEventListener('keydown', function (e) {
        return _this15.handleKeyDown(e);
      });
    }

    /**
     * Handle keyboard input
     * @param {KeyboardEvent} e - The keyboard event
     */
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (this.navigator.getSlideCount() === 0) return;

      // Prevent default for arrow keys to avoid page scrolling
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          this.navigator.navigate(-1);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          this.navigator.navigate(1);
          break;
        case 'Home':
          this.navigator.displaySlide(0);
          break;
        case 'End':
          this.navigator.displaySlide(this.navigator.getSlideCount() - 1);
          break;
      }
    }
  }]);
}(); // Export for use in other modules
window.KeyboardManager = KeyboardManager;

/* === ui/screen-manager.js === */
/**
 * Screen Manager Module
 * Handles switching between screens (welcome, viewer)
 */
var ScreenManager = /*#__PURE__*/function () {
  function ScreenManager() {
    _classCallCheck(this, ScreenManager);
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.viewerContainer = document.getElementById('viewer-container');
  }

  /**
   * Show the viewer and hide welcome screen
   */
  return _createClass(ScreenManager, [{
    key: "showViewer",
    value: function showViewer() {
      this.welcomeScreen.classList.add('hidden');
      this.viewerContainer.classList.remove('hidden');

      // Add viewer-active class to header to show file info
      var header = document.querySelector('.header');
      if (header) {
        header.classList.add('viewer-active');
      }
    }

    /**
     * Show the welcome screen and hide viewer
     */
  }, {
    key: "showWelcome",
    value: function showWelcome() {
      this.welcomeScreen.classList.remove('hidden');
      this.viewerContainer.classList.add('hidden');

      // Remove viewer-active class from header
      var header = document.querySelector('.header');
      if (header) {
        header.classList.remove('viewer-active');
      }
    }

    /**
     * Check if viewer is currently visible
     * @returns {boolean} - True if viewer is visible
     */
  }, {
    key: "isViewerVisible",
    value: function isViewerVisible() {
      return !this.viewerContainer.classList.contains('hidden');
    }
  }]);
}(); // Export for use in other modules
window.ScreenManager = ScreenManager;

/* === ui/slide-navigator.js === */
/**
 * Slide Navigator Module
 * Handles slide display and navigation
 */
var SlideNavigator = /*#__PURE__*/function () {
  function SlideNavigator(renderer) {
    _classCallCheck(this, SlideNavigator);
    this.slides = [];
    this.currentSlideIndex = 0;
    this.renderer = renderer;

    // DOM elements
    this.thumbnailList = document.getElementById('thumbnail-list');
    this.slideContent = document.getElementById('slide-content');
    this.slideCounter = document.getElementById('slide-counter');
    this.slideNumberInput = document.getElementById('slide-number-input');

    // Navigation buttons
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.firstBtn = document.getElementById('first-btn');
    this.lastBtn = document.getElementById('last-btn');
    this.bindEvents();
  }

  /**
   * Bind navigation events
   */
  return _createClass(SlideNavigator, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this16 = this;
      this.prevBtn.addEventListener('click', function () {
        return _this16.navigate(-1);
      });
      this.nextBtn.addEventListener('click', function () {
        return _this16.navigate(1);
      });
      this.firstBtn.addEventListener('click', function () {
        return _this16.displaySlide(0);
      });
      this.lastBtn.addEventListener('click', function () {
        return _this16.displaySlide(_this16.slides.length - 1);
      });
      this.slideNumberInput.addEventListener('change', function (e) {
        var num = parseInt(e.target.value);
        if (num >= 1 && num <= _this16.slides.length) {
          _this16.displaySlide(num - 1);
        } else {
          e.target.value = _this16.currentSlideIndex + 1;
        }
      });
      this.slideNumberInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.target.blur();
        }
      });
    }

    /**
     * Set slides data
     * @param {Array} slides - Array of slide objects
     */
  }, {
    key: "setSlides",
    value: function setSlides(slides) {
      this.slides = slides;
      this.currentSlideIndex = 0;
    }

    /**
     * Display a specific slide
     * @param {number} index - Slide index
     */
  }, {
    key: "displaySlide",
    value: function displaySlide(index) {
      if (index < 0 || index >= this.slides.length) return;
      this.currentSlideIndex = index;
      var slide = this.slides[index];

      // Update active thumbnail
      var thumbnails = this.thumbnailList.querySelectorAll('.thumbnail');
      thumbnails.forEach(function (thumb, i) {
        thumb.classList.toggle('active', i === index);
      });

      // Scroll thumbnail into view
      if (thumbnails[index]) {
        thumbnails[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }

      // Render slide content
      this.slideContent.innerHTML = this.renderer.createSlideHTML(slide);

      // Update navigation UI
      this.updateNavigation();
    }

    /**
     * Navigate to previous or next slide
     * @param {number} direction - -1 for previous, 1 for next
     */
  }, {
    key: "navigate",
    value: function navigate(direction) {
      var newIndex = this.currentSlideIndex + direction;
      if (newIndex >= 0 && newIndex < this.slides.length) {
        this.displaySlide(newIndex);
      }
    }

    /**
     * Render all slide thumbnails
     */
  }, {
    key: "renderThumbnails",
    value: function renderThumbnails() {
      var _this17 = this;
      this.thumbnailList.innerHTML = '';
      this.slides.forEach(function (slide, index) {
        var thumbnail = _this17.renderer.createThumbnail(slide, index, function (i) {
          return _this17.displaySlide(i);
        });
        _this17.thumbnailList.appendChild(thumbnail);
      });

      // Highlight first thumbnail
      if (this.slides.length > 0) {
        this.thumbnailList.children[0].classList.add('active');
      }

      // Update slide number input max
      this.slideNumberInput.max = this.slides.length;
    }

    /**
     * Update navigation button states and counter
     */
  }, {
    key: "updateNavigation",
    value: function updateNavigation() {
      var total = this.slides.length;
      var current = this.currentSlideIndex + 1;
      this.slideCounter.textContent = "Slide ".concat(current, " of ").concat(total);
      this.slideNumberInput.value = current;
      this.prevBtn.disabled = this.currentSlideIndex === 0;
      this.nextBtn.disabled = this.currentSlideIndex === total - 1;
      this.firstBtn.disabled = this.currentSlideIndex === 0;
      this.lastBtn.disabled = this.currentSlideIndex === total - 1;
    }

    /**
     * Get current slide index
     * @returns {number} - Current slide index
     */
  }, {
    key: "getCurrentSlideIndex",
    value: function getCurrentSlideIndex() {
      return this.currentSlideIndex;
    }

    /**
     * Get total number of slides
     * @returns {number} - Total number of slides
     */
  }, {
    key: "getSlideCount",
    value: function getSlideCount() {
      return this.slides.length;
    }
  }]);
}(); // Export for use in other modules
window.SlideNavigator = SlideNavigator;

/* === ui/file-manager.js === */
/**
 * File Manager Module
 * Handles file selection, loading, and parsing
 */
var FileManager = /*#__PURE__*/function () {
  function FileManager(onFileLoaded) {
    _classCallCheck(this, FileManager);
    this.fileInput = document.getElementById('pptx-input');
    this.fileName = document.getElementById('file-name');
    this.viewerFileName = document.getElementById('viewer-file-name');
    this.loadingOverlay = document.getElementById('loading-overlay');
    this.onFileLoaded = onFileLoaded;
    this.parser = new PPTXParser();
    this.bindEvents();
  }

  /**
   * Bind file input events
   */
  return _createClass(FileManager, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this18 = this;
      this.fileInput.addEventListener('change', function (e) {
        return _this18.handleFileSelect(e);
      });

      // Drag and drop
      document.body.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
      document.body.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var files = e.dataTransfer.files;
        if (files.length > 0 && files[0].name.endsWith('.pptx')) {
          _this18.loadFile(files[0]);
        }
      });
    }

    /**
     * Handle file input selection
     */
  }, {
    key: "handleFileSelect",
    value: (function () {
      var _handleFileSelect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(e) {
        var file;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              file = e.target.files[0];
              if (!file) {
                _context20.n = 1;
                break;
              }
              _context20.n = 1;
              return this.loadFile(file);
            case 1:
              return _context20.a(2);
          }
        }, _callee19, this);
      }));
      function handleFileSelect(_x23) {
        return _handleFileSelect.apply(this, arguments);
      }
      return handleFileSelect;
    }()
    /**
     * Load and parse a PPTX file
     * @param {File} file - The file to load
     */
    )
  }, {
    key: "loadFile",
    value: (function () {
      var _loadFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(file) {
        var arrayBuffer, slides, _t20;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              if (file.name.endsWith('.pptx')) {
                _context21.n = 1;
                break;
              }
              alert('Please select a valid .pptx file');
              return _context21.a(2);
            case 1:
              this.showLoading(true);
              this.fileName.textContent = file.name;
              this.fileName.classList.add('active');
              if (this.viewerFileName) {
                this.viewerFileName.textContent = file.name;
              }
              _context21.p = 2;
              _context21.n = 3;
              return file.arrayBuffer();
            case 3:
              arrayBuffer = _context21.v;
              _context21.n = 4;
              return this.parser.parse(arrayBuffer);
            case 4:
              slides = _context21.v;
              this.onFileLoaded(slides);
              _context21.n = 6;
              break;
            case 5:
              _context21.p = 5;
              _t20 = _context21.v;
              console.error('Error loading PPTX:', _t20);
              alert('Error loading the presentation. Please make sure it\'s a valid PPTX file.');
            case 6:
              _context21.p = 6;
              this.showLoading(false);
              return _context21.f(6);
            case 7:
              return _context21.a(2);
          }
        }, _callee20, this, [[2, 5, 6, 7]]);
      }));
      function loadFile(_x24) {
        return _loadFile.apply(this, arguments);
      }
      return loadFile;
    }()
    /**
     * Show or hide loading overlay
     * @param {boolean} show - Whether to show the loading overlay
     */
    )
  }, {
    key: "showLoading",
    value: function showLoading(show) {
      if (show) {
        this.loadingOverlay.classList.remove('hidden');
      } else {
        this.loadingOverlay.classList.add('hidden');
      }
    }
  }]);
}(); // Export for use in other modules
window.FileManager = FileManager;

/* === ui/ui-controller.js === */
/**
 * UI Controller Module
 * Handles user interface interactions and navigation
 */
var UIController = /*#__PURE__*/function () {
  function UIController() {
    _classCallCheck(this, UIController);
    this.slides = [];
    this.currentSlideIndex = 0;
    this.parser = new PPTXParser();
    this.renderer = new SlideRenderer();
    this.zoomScale = 1;
    this.zoomStep = 0.15;
    this.minZoom = 0.5;
    this.maxZoom = 3;
    this.initializeElements();
    this.bindEvents();
    this.initializeTheme();
    this.updateZoomUI();
  }

  /**
   * Initialize DOM element references
   */
  return _createClass(UIController, [{
    key: "initializeElements",
    value: function initializeElements() {
      // Input and file elements
      this.fileInput = document.getElementById('pptx-input');
      this.fileName = document.getElementById('file-name');
      this.viewerFileName = document.getElementById('viewer-file-name');
      this.headerOpenBtn = document.getElementById('header-open-btn');

      // Screens
      this.welcomeScreen = document.getElementById('welcome-screen');
      this.viewerContainer = document.getElementById('viewer-container');
      this.loadingOverlay = document.getElementById('loading-overlay');

      // Slide elements
      this.thumbnailList = document.getElementById('thumbnail-list');
      this.slideContent = document.getElementById('slide-content');
      this.slideCounter = document.getElementById('slide-counter');
      this.slideNumberInput = document.getElementById('slide-number-input');
      this.zoomOutBtn = document.getElementById('zoom-out-btn');
      this.zoomInBtn = document.getElementById('zoom-in-btn');
      this.zoomLevelLabel = document.getElementById('zoom-level');

      // Navigation
      this.prevBtn = document.getElementById('prev-btn');
      this.nextBtn = document.getElementById('next-btn');
      this.firstBtn = document.getElementById('first-btn');
      this.lastBtn = document.getElementById('last-btn');

      // Theme toggle
      this.themeToggle = document.getElementById('theme-toggle');
    }

    /**
     * Bind event listeners
     */
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this19 = this;
      // Zoom controls
      if (this.zoomOutBtn) {
        this.zoomOutBtn.addEventListener('click', function () {
          return _this19.changeZoom(-_this19.zoomStep);
        });
      }
      if (this.zoomInBtn) {
        this.zoomInBtn.addEventListener('click', function () {
          return _this19.changeZoom(_this19.zoomStep);
        });
      }

      // File input change
      this.fileInput.addEventListener('change', function (e) {
        return _this19.handleFileSelect(e);
      });

      // Theme toggle
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', function () {
          return _this19.toggleTheme();
        });
      }

      // Navigation buttons
      this.prevBtn.addEventListener('click', function () {
        return _this19.navigateSlide(-1);
      });
      this.nextBtn.addEventListener('click', function () {
        return _this19.navigateSlide(1);
      });
      this.firstBtn.addEventListener('click', function () {
        return _this19.displaySlide(0);
      });
      this.lastBtn.addEventListener('click', function () {
        return _this19.displaySlide(_this19.slides.length - 1);
      });

      // Slide number input
      this.slideNumberInput.addEventListener('change', function (e) {
        var num = parseInt(e.target.value);
        if (num >= 1 && num <= _this19.slides.length) {
          _this19.displaySlide(num - 1);
        } else {
          e.target.value = _this19.currentSlideIndex + 1;
        }
      });
      this.slideNumberInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.target.blur();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        return _this19.handleKeyboard(e);
      });

      // Drag and drop
      document.body.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });

      // Slide-internal hyperlinks (e.g., links to another slide)
      if (this.slideContent) {
        this.slideContent.addEventListener('click', function (e) {
          var _e$target, _e$target$closest;
          var link = (_e$target = e.target) === null || _e$target === void 0 || (_e$target$closest = _e$target.closest) === null || _e$target$closest === void 0 ? void 0 : _e$target$closest.call(_e$target, 'a[data-pptx-slide]');
          if (!link) return;
          var idx = parseInt(link.getAttribute('data-pptx-slide'), 10);
          if (Number.isNaN(idx)) return;
          e.preventDefault();
          e.stopPropagation();
          _this19.displaySlide(idx);
        });
      }
      document.body.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var files = e.dataTransfer.files;
        if (files.length > 0 && files[0].name.endsWith('.pptx')) {
          _this19.loadFile(files[0]);
        }
      });

      // Header open button - allows opening a new file anytime
      if (this.headerOpenBtn) {
        this.headerOpenBtn.addEventListener('click', function () {
          // Reset file input so same file can be selected again
          _this19.fileInput.value = '';
          _this19.fileInput.click();
        });
      }
    }

    /**
     * Handle keyboard navigation
     */
  }, {
    key: "handleKeyboard",
    value: function handleKeyboard(e) {
      if (this.slides.length === 0) return;

      // Prevent default for arrow keys to avoid page scrolling
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          this.navigateSlide(-1);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          this.navigateSlide(1);
          break;
        case 'Home':
          this.displaySlide(0);
          break;
        case 'End':
          this.displaySlide(this.slides.length - 1);
          break;
      }
    }

    /**
     * Handle file selection
     */
  }, {
    key: "handleFileSelect",
    value: (function () {
      var _handleFileSelect2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(e) {
        var file;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              file = e.target.files[0];
              if (!file) {
                _context22.n = 1;
                break;
              }
              _context22.n = 1;
              return this.loadFile(file);
            case 1:
              return _context22.a(2);
          }
        }, _callee21, this);
      }));
      function handleFileSelect(_x25) {
        return _handleFileSelect2.apply(this, arguments);
      }
      return handleFileSelect;
    }()
    /**
     * Load and parse a PPTX file
     */
    )
  }, {
    key: "loadFile",
    value: (function () {
      var _loadFile2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(file) {
        var arrayBuffer, parsedData, _t21;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              if (file.name.endsWith('.pptx')) {
                _context23.n = 1;
                break;
              }
              alert('Please select a valid .pptx file');
              return _context23.a(2);
            case 1:
              this.showLoading(true);
              if (this.fileName) {
                this.fileName.textContent = file.name;
                this.fileName.classList.add('active');
              }
              if (this.viewerFileName) {
                this.viewerFileName.textContent = file.name;
              }
              _context23.p = 2;
              _context23.n = 3;
              return file.arrayBuffer();
            case 3:
              arrayBuffer = _context23.v;
              _context23.n = 4;
              return this.parser.parse(arrayBuffer);
            case 4:
              parsedData = _context23.v;
              this.slides = parsedData.slides || [];
              this.setZoom(1);
              this.showViewer();
              this.renderThumbnails();
              this.displaySlide(0);
              _context23.n = 6;
              break;
            case 5:
              _context23.p = 5;
              _t21 = _context23.v;
              console.error('Error loading PPTX:', _t21);
              alert('Error loading the presentation. Please make sure it\'s a valid PPTX file.');
            case 6:
              _context23.p = 6;
              this.showLoading(false);
              return _context23.f(6);
            case 7:
              return _context23.a(2);
          }
        }, _callee22, this, [[2, 5, 6, 7]]);
      }));
      function loadFile(_x26) {
        return _loadFile2.apply(this, arguments);
      }
      return loadFile;
    }()
    /**
     * Show or hide loading overlay
     */
    )
  }, {
    key: "showLoading",
    value: function showLoading(show) {
      if (show) {
        this.loadingOverlay.classList.remove('hidden');
      } else {
        this.loadingOverlay.classList.add('hidden');
      }
    }

    /**
     * Show the viewer and hide welcome screen
     */
  }, {
    key: "showViewer",
    value: function showViewer() {
      this.welcomeScreen.classList.add('hidden');
      this.viewerContainer.classList.remove('hidden');
      // Add viewer-active class to header to show file info and hide search
      var header = document.querySelector('.header');
      if (header) {
        header.classList.add('viewer-active');
      }
    }

    /**
     * Render all slide thumbnails
     */
  }, {
    key: "renderThumbnails",
    value: function renderThumbnails() {
      var _this20 = this;
      this.thumbnailList.innerHTML = '';
      this.slides.forEach(function (slide, index) {
        var thumbnail = _this20.renderer.createThumbnail(slide, index, function (i) {
          return _this20.displaySlide(i);
        });
        _this20.thumbnailList.appendChild(thumbnail);
      });

      // Highlight first thumbnail
      if (this.slides.length > 0) {
        this.thumbnailList.children[0].classList.add('active');
      }

      // Update slide number input max
      this.slideNumberInput.max = this.slides.length;
    }

    /**
     * Display a specific slide
     */
  }, {
    key: "displaySlide",
    value: function displaySlide(index) {
      if (index < 0 || index >= this.slides.length) return;
      this.currentSlideIndex = index;
      var slide = this.slides[index];

      // Update active thumbnail
      var thumbnails = this.thumbnailList.querySelectorAll('.thumbnail');
      thumbnails.forEach(function (thumb, i) {
        thumb.classList.toggle('active', i === index);
      });

      // Scroll thumbnail into view
      if (thumbnails[index]) {
        thumbnails[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }

      // Render slide content
      this.slideContent.innerHTML = this.renderer.createSlideHTML(slide);
      this.applyZoomToSlide();
      this.updateZoomUI();

      // Update navigation
      this.updateNavigation();
    }

    /**
     * Update navigation button states
     */
  }, {
    key: "updateNavigation",
    value: function updateNavigation() {
      var total = this.slides.length;
      var current = this.currentSlideIndex + 1;
      this.slideCounter.textContent = "Slide ".concat(current, " of ").concat(total);
      this.slideNumberInput.value = current;
      this.prevBtn.disabled = this.currentSlideIndex === 0;
      this.nextBtn.disabled = this.currentSlideIndex === total - 1;
      this.firstBtn.disabled = this.currentSlideIndex === 0;
      this.lastBtn.disabled = this.currentSlideIndex === total - 1;
    }

    /**
     * Navigate to previous or next slide
     */
  }, {
    key: "navigateSlide",
    value: function navigateSlide(direction) {
      var newIndex = this.currentSlideIndex + direction;
      if (newIndex >= 0 && newIndex < this.slides.length) {
        this.displaySlide(newIndex);
      }
    }

    /**
     * Adjust zoom by a delta step
     * @param {number} delta - Positive to zoom in, negative to zoom out
     */
  }, {
    key: "changeZoom",
    value: function changeZoom(delta) {
      this.setZoom(this.zoomScale + delta);
    }

    /**
     * Set zoom scale and apply it to the current slide
     * @param {number} scale - Target zoom scale
     */
  }, {
    key: "setZoom",
    value: function setZoom(scale) {
      var clamped = Math.min(this.maxZoom, Math.max(this.minZoom, scale));
      this.zoomScale = clamped;
      this.updateZoomUI();
      this.applyZoomToSlide();
    }

    /**
     * Apply the current zoom to the rendered slide
     */
  }, {
    key: "applyZoomToSlide",
    value: function applyZoomToSlide() {
      if (!this.slideContent) return;
      var isZoomed = Math.abs(this.zoomScale - 1) > 0.01;
      this.slideContent.classList.toggle('zoomed', isZoomed);
      var wrapper = this.slideContent.querySelector('.slide-wrapper');
      if (wrapper) {
        wrapper.style.transform = "scale(".concat(this.zoomScale, ")");
        wrapper.style.transformOrigin = 'top center';
      }
    }

    /**
     * Update zoom UI elements (label and button states)
     */
  }, {
    key: "updateZoomUI",
    value: function updateZoomUI() {
      if (this.zoomLevelLabel) {
        var isFit = Math.abs(this.zoomScale - 1) < 0.01;
        this.zoomLevelLabel.textContent = isFit ? 'Fit' : "".concat(Math.round(this.zoomScale * 100), "%");
      }
      if (this.zoomOutBtn) {
        this.zoomOutBtn.disabled = this.zoomScale <= this.minZoom + 0.001;
      }
      if (this.zoomInBtn) {
        this.zoomInBtn.disabled = this.zoomScale >= this.maxZoom - 0.001;
      }
    }

    /**
     * Initialize theme based on stored preference or system preference
     */
  }, {
    key: "initializeTheme",
    value: function initializeTheme() {
      var _this21 = this;
      // Check for stored preference
      var storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.setTheme(storedTheme);
      } else {
        // Auto-detect based on system preference (especially useful on mobile)
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
      }

      // Listen for system theme changes (for auto mode)
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
          _this21.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    /**
     * Toggle between dark and light theme
     */
  }, {
    key: "toggleTheme",
    value: function toggleTheme() {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }

    /**
     * Set the theme
     */
  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }]);
}(); // Export for use in other modules
window.UIController = UIController;

/* === app.js === */
/**
 * PowerPoint (PPTX) Viewer Application
 * Main entry point - initializes the application
 */

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  window.pptxViewer = new UIController();
});