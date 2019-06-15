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
var path_1 = require("path");
var chai_1 = require("chai");
var vamtiger_create_file_1 = require("vamtiger-create-file");
var vamtiger_bash_1 = require("vamtiger-bash");
var vamtiger_get_file_data_1 = require("vamtiger-get-file-data");
var __1 = require("../..");
var __2 = require("../..");
var mockData = require("./mock-data");
var entryFilePath = path_1.resolve(__dirname, 'mock-data/source/index.ts');
var entryfileModulePath = path_1.resolve(__dirname, 'mock-data/source/kasha/index.ts');
var bundleFilePath = path_1.resolve(__dirname, 'mock-data/bundle/index.js');
var entryfileModulePathFolder = path_1.dirname(entryfileModulePath);
var bundleFilePathFolder = path_1.dirname(bundleFilePath);
var createFolders = "mkdir -p " + entryfileModulePathFolder + " " + bundleFilePathFolder;
var clearFolders = [
    path_1.dirname(entryFilePath),
    entryfileModulePathFolder
].map(function (folder) { return "rm -rfv " + folder + "/*"; });
var newLines = /\n/gm;
describe('vamtiger-bundle-typescript should', function () {
    it('bundle typescript into a single file', function () {
        return __awaiter(this, void 0, void 0, function () {
            var cleared, makeEntryfileModulePathFolder, createEntryFile, createEntryFileModule, createBundle, bundleFileText, lines;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(clearFolders.map(function (clearFolder) { return vamtiger_bash_1.default(clearFolder); }))
                            .then(function (clearedPathGroups) { return clearedPathGroups.reduce(function (cleardPaths, cleardPathsString) { return cleardPaths.concat(cleardPathsString.split(newLines)); }, []); })
                            .then(function (cleardPaths) { return cleardPaths.filter(function (cleardPath) { return cleardPath; }); })];
                    case 1:
                        cleared = _a.sent();
                        return [4 /*yield*/, vamtiger_bash_1.default(createFolders).catch(ignoreError)];
                    case 2:
                        makeEntryfileModulePathFolder = _a.sent();
                        return [4 /*yield*/, vamtiger_create_file_1.default(entryFilePath, mockData.booya)];
                    case 3:
                        createEntryFile = _a.sent();
                        return [4 /*yield*/, vamtiger_create_file_1.default(entryfileModulePath, mockData.kasha)];
                    case 4:
                        createEntryFileModule = _a.sent();
                        return [4 /*yield*/, __1.default({
                                entryFilePath: entryFilePath,
                                bundleFilePath: bundleFilePath,
                                sourcemap: __2.SourceMap.inline,
                                format: __2.Format.iife
                            })];
                    case 5:
                        createBundle = _a.sent();
                        return [4 /*yield*/, vamtiger_get_file_data_1.default(bundleFilePath)];
                    case 6:
                        bundleFileText = _a.sent();
                        lines = bundleFileText.toString().split(newLines);
                        chai_1.expect(createBundle).to.be.ok;
                        chai_1.expect(lines.length).to.be.greaterThan(4);
                        return [2 /*return*/];
                }
            });
        });
    });
});
function ignoreError(error) {
    console.warn(error);
    console.warn('Error ignored');
}
//# sourceMappingURL=index.spec.js.map