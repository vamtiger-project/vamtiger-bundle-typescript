"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chai_1 = require("chai");
const vamtiger_create_file_1 = require("vamtiger-create-file");
const vamtiger_bash_1 = require("vamtiger-bash");
const vamtiger_get_file_data_1 = require("vamtiger-get-file-data");
const __1 = require("../..");
const types_1 = require("../../types");
const mockData = require("./mock-data");
const entryFilePath = path_1.resolve(__dirname, 'mock-data/source/index.ts');
const entryfileModulePath = path_1.resolve(__dirname, 'mock-data/source/kasha/index.ts');
const bundleFilePath = path_1.resolve(__dirname, 'mock-data/bundle/index.js');
const createBundlePath = path_1.resolve(__dirname, '../../bin/index.js');
const entryfileModulePathFolder = path_1.dirname(entryfileModulePath);
const bundleFilePathFolder = path_1.dirname(bundleFilePath);
const createFolders = `mkdir -p ${entryfileModulePathFolder} ${bundleFilePathFolder}`;
const clearFolders = [
    path_1.dirname(entryFilePath),
    entryfileModulePathFolder
].map(folder => `rm -rfv ${folder}/*`);
const newLines = /\n/gm;
const createTypescriptBundle = [
    `node ${createBundlePath}`,
    `--${types_1.CommandlineArgs.entryFilePath} ${entryFilePath}`,
    `--${types_1.CommandlineArgs.bundleFilePath} ${bundleFilePath}`,
    `--${types_1.CommandlineArgs.format} ${__1.Format.iife}`,
    `--${types_1.CommandlineArgs.sourcemap} ${__1.SourceMap.inline}`,
    `--${types_1.CommandlineArgs.minify}`
].join(' ');
describe('vamtiger-bundle-typescript: commandline should', function () {
    it('bundle typescript into a single file', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const cleared = yield Promise.all(clearFolders.map(clearFolder => vamtiger_bash_1.default(clearFolder)))
                .then((clearedPathGroups) => clearedPathGroups.reduce((cleardPaths, cleardPathsString) => cleardPaths.concat(cleardPathsString.split(newLines)), []))
                .then(cleardPaths => cleardPaths.filter(cleardPath => cleardPath));
            const makeEntryfileModulePathFolder = yield vamtiger_bash_1.default(createFolders).catch(ignoreError);
            const createEntryFile = yield vamtiger_create_file_1.default(entryFilePath, mockData.booya);
            const createEntryFileModule = yield vamtiger_create_file_1.default(entryfileModulePath, mockData.kasha);
            const createBundle = yield vamtiger_bash_1.default(createTypescriptBundle);
            const bundleFileText = yield vamtiger_get_file_data_1.default(bundleFilePath);
            chai_1.expect(createBundle).to.equal('');
        });
    });
});
function ignoreError(error) {
    console.warn(error);
    console.warn('Error ignored');
}
//# sourceMappingURL=index.spec.js.map