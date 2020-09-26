"use strict";
exports.__esModule = true;
var AS = require("@assemblyscript/loader");
function bindExports(e) {
    var mainBufferPtr = -1;
    var ptrs = [];
    return {
        uploadBuffer: function (buffer) {
            mainBufferPtr = e.__allocArray(e.Uint8Array_ID, buffer);
            e.uploadBuffer(mainBufferPtr);
            return mainBufferPtr;
        },
        parse24BPP_P: function (opt, bopt) {
            if (bopt === void 0) { bopt = null; }
            bopt = Object.assign(bopt || {}, { useView: false });
            if (mainBufferPtr === -1) {
                throw "Buffer should be uploaded before decoding";
            }
            if (!(opt.width * opt.height)) {
                throw "Invalid dimensions " + opt.width + "x" + opt.height;
            }
            if (!opt.length) {
                throw "Invalid lenght " + opt.length;
            }
            var ptr = e.parse24BPP_P(opt.offset | 0, opt.length | 0, opt.width | 0, opt.length | 0, 0, true);
            if (bopt.useView) {
                ptrs.push(ptr);
                return e.__getUint8ClampedArrayView(ptr);
            }
            var arr = e.__getUint8ClampedArray(ptr);
            e.__release(ptr);
            return arr;
        },
        parseColorMapped_P: function (opt, bopt) {
            if (bopt === void 0) { bopt = null; }
            bopt = Object.assign(bopt || {}, { useView: false });
            if (mainBufferPtr === -1) {
                throw "Buffer should be uploaded before decoding";
            }
            if (!(opt.width * opt.height)) {
                throw "Invalid dimensions " + opt.width + "x" + opt.height;
            }
            if (!opt.length) {
                throw "Invalid lenght " + opt.length;
            }
            if (!opt.tableSize || opt.tableSize < 3) {
                throw "Invalid table size: " + opt.tableSize;
            }
            var ptr = e.parseColorMapped_P(opt.offset | 0, opt.length | 0, opt.width | 0, opt.length | 0, opt.tableSize | 0, !!opt.hasAlpha);
            if (bopt.useView) {
                ptrs.push(ptr);
                return e.__getUint8ClampedArrayView(ptr);
            }
            var arr = e.__getUint8ClampedArray(ptr);
            e.__release(ptr);
            return arr;
        },
        dispose: function () {
            if (mainBufferPtr > -1) {
                e.__release(mainBufferPtr);
            }
            for (var _i = 0, ptrs_1 = ptrs; _i < ptrs_1.length; _i++) {
                var p = ptrs_1[_i];
                e.__release(p);
            }
            mainBufferPtr = -1;
            ptrs.length = 0;
        }
    };
}
function loadModule(urlOrArray) {
    var f = typeof urlOrArray === 'string'
        ? fetch(urlOrArray).then(function (e) { return e.arrayBuffer(); })
        : Promise.resolve(urlOrArray);
    return f
        .then(function (buff) { return AS.instantiate(buff); })
        .then(function (m) { return bindExports(m.exports); });
}
exports.loadModule = loadModule;
