#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var Args = require("vamtiger-argv");
var __1 = require("..");
var log_1 = require("../log");
var types_1 = require("../types");
var workingDirectory = process.cwd();
var args = new Args();
var relativePath = args.has(types_1.CommandlineArgs.relativePath);
var entryFilePath = relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.entryFilePath))
    ||
        args.get(types_1.CommandlineArgs.entryFilePath);
var entryFolderPath = entryFilePath && path_1.dirname(entryFilePath);
var bundleFilePath = relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.bundleFilePath))
    ||
        args.get(types_1.CommandlineArgs.bundleFilePath);
var format = args.get(types_1.CommandlineArgs.format);
var sourcemap = args.get(types_1.CommandlineArgs.sourcemap);
var bundleName = args.get(types_1.CommandlineArgs.bundleName);
var copyBundleFilePath = args.get(types_1.CommandlineArgs.copyBundleFilePath) || '';
var copySourceMap = args.has(types_1.CommandlineArgs.copySourceMap);
var watch = args.has(types_1.CommandlineArgs.watch);
var bin = args.has(types_1.CommandlineArgs.bin);
var watchOptions = {
    recursive: true
};
var bundleParams = {
    entryFilePath: entryFilePath,
    bundleFilePath: bundleFilePath,
    format: format,
    sourcemap: sourcemap,
    bundleName: bundleName,
    copySourceMap: copySourceMap,
    copyBundleFilePath: copyBundleFilePath,
    bin: bin
};
try {
    if (!entryFilePath) {
        throw new Error('No entry file specified');
    }
    else if (!bundleFilePath) {
        throw new Error('No bundle file specified');
    }
    else if (watch) {
        fs_1.watch(entryFolderPath, watchOptions, createBundle);
    }
    else {
        createBundle();
    }
}
catch (error) {
    handleError(error);
}
function createBundle(eventType, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var fileType, generateTypescriptBundle;
        return __generator(this, function (_a) {
            fileType = fileName && path_1.extname(fileName)
                .substring(1)
                .toLowerCase();
            generateTypescriptBundle = (!eventType && !fileName)
                ||
                    fileType === types_1.FileExtension.ts;
            if (eventType && fileName) {
                log_1.default({
                    eventType: eventType,
                    fileName: fileName
                });
            }
            if (generateTypescriptBundle) {
                __1.default(bundleParams);
            }
            return [2 /*return*/];
        });
    });
}
function handleError(error) {
    console.log(error);
    console.error(error.message);
    console.error(error.stack);
    console.log('*'.repeat(10));
}
//# sourceMappingURL=index.js.map