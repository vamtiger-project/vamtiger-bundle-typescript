"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var typescript = require("typescript");
var rollup_1 = require("rollup");
var Args = require("vamtiger-argv");
var vamtiger_copy_file_1 = require("vamtiger-copy-file");
var vamtiger_get_file_text_1 = require("vamtiger-get-file-text");
var vamtiger_create_file_1 = require("vamtiger-create-file");
var types_1 = require("./types");
var config = require("./config");
var babel = require('rollup-plugin-babel');
var rollupTypescript = require('rollup-plugin-typescript');
var uglify = require('rollup-plugin-uglify');
var args = new Args();
var typescriptConfiguration = {
    typescript: typescript
};
var plugins = [
    rollupTypescript(typescriptConfiguration),
    babel(config.babel)
];
if (args.has(types_1.CommandlineArgs.minify)) {
    plugins.push(uglify());
}
exports.default = (function (params) { return __awaiter(_this, void 0, void 0, function () {
    var entryFilePath, bundleFilePath, sourcemap, format, copySourceMap, copyBundleFilePath, bin, bundleFileSourceMapPath, copyBundleFileSourceMapPath, bundleName, bundleConfiguration, exportConfigurations, copyFileParams, copyFileSourceMapParams, bundle, l, exportBundle, exportBundleText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                entryFilePath = params.entryFilePath;
                bundleFilePath = params.bundleFilePath;
                sourcemap = params.sourcemap;
                format = params.format || types_1.Format.iife;
                copySourceMap = params.copySourceMap;
                copyBundleFilePath = params.copyBundleFilePath;
                bin = params.bin;
                bundleFileSourceMapPath = bundleFilePath && params.bundleFilePath + ".map";
                copyBundleFileSourceMapPath = copySourceMap && copyBundleFilePath && copyBundleFilePath + ".map";
                bundleName = format === types_1.Format.iife && !params.bundleName ? types_1.BundleName.bundle : params.bundleName;
                bundleConfiguration = {
                    input: entryFilePath,
                    plugins: plugins,
                    acorn: {
                        allowReserved: true
                    }
                };
                exportConfigurations = {
                    file: bundleFilePath,
                    format: format,
                    sourcemap: sourcemap,
                    name: bundleName,
                };
                copyFileParams = copyBundleFilePath && {
                    source: bundleFilePath,
                    destination: copyBundleFilePath
                };
                copyFileSourceMapParams = copyBundleFileSourceMapPath && {
                    source: bundleFileSourceMapPath,
                    destination: copyBundleFileSourceMapPath
                };
                return [4 /*yield*/, rollup_1.rollup(bundleConfiguration)];
            case 1:
                bundle = _a.sent();
                return [4 /*yield*/, bundle.generate(exportConfigurations)];
            case 2:
                l = _a.sent();
                console.log(l.code);
                return [4 /*yield*/, bundle.write(exportConfigurations)];
            case 3:
                exportBundle = _a.sent();
                if (!copyFileParams) return [3 /*break*/, 5];
                return [4 /*yield*/, vamtiger_copy_file_1.default(copyFileParams)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!copyFileSourceMapParams) return [3 /*break*/, 7];
                return [4 /*yield*/, vamtiger_copy_file_1.default(copyFileSourceMapParams)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                if (!bin) return [3 /*break*/, 10];
                return [4 /*yield*/, vamtiger_get_file_text_1.default(bundleFilePath)];
            case 8:
                exportBundleText = _a.sent();
                exportBundleText = types_1.Shebang.node + "\n" + exportBundleText;
                return [4 /*yield*/, vamtiger_create_file_1.default(bundleFilePath, exportBundleText)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [2 /*return*/, true];
        }
    });
}); });
var types_2 = require("./types");
exports.SourceMap = types_2.SourceMap;
exports.Format = types_2.Format;
//# sourceMappingURL=index.js.map