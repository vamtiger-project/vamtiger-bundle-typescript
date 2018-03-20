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
const typescript = require("typescript");
const rollup_1 = require("rollup");
const Args = require("vamtiger-argv");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
const types_1 = require("./types");
const rollupTypescript = require('rollup-plugin-typescript');
const uglify = require('rollup-plugin-uglify');
const args = new Args();
const typescriptConfiguration = {
    typescript
};
const plugins = [
    rollupTypescript(typescriptConfiguration)
];
if (args.has(types_1.CommandlineArgs.minify))
    plugins.push(uglify());
exports.default = (params) => __awaiter(this, void 0, void 0, function* () {
    const entryFilePath = params.entryFilePath;
    const bundleFilePath = params.bundleFilePath;
    const sourcemap = params.sourcemap;
    const format = params.format || types_1.Format.iife;
    const copySourceMap = params.copySourceMap;
    const copyBundleFilePath = params.copyBundleFilePath;
    const bundleFileSourceMapPath = bundleFilePath && `${params.bundleFilePath}.map`;
    const copyBundleFileSourceMapPath = copySourceMap && copyBundleFilePath && `${copyBundleFilePath}.map`;
    const bundleName = format === types_1.Format.iife && !params.bundleName ? types_1.BundleName.bundle : params.bundleName;
    const bundleConfiguration = {
        input: entryFilePath,
        plugins,
        acorn: {
            allowReserved: true
        },
        importHelpers: true
    };
    const exportConfigurations = {
        file: bundleFilePath,
        format,
        sourcemap,
        name: bundleName,
    };
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    const copyFileSourceMapParams = copyBundleFileSourceMapPath && {
        source: bundleFileSourceMapPath,
        destination: copyBundleFileSourceMapPath
    };
    const bundle = yield rollup_1.rollup(bundleConfiguration);
    const exportBundle = yield bundle.write(exportConfigurations);
    let exportBundleCopy;
    if (copyFileParams)
        yield vamtiger_copy_file_1.default(copyFileParams);
    if (copyFileSourceMapParams)
        yield vamtiger_copy_file_1.default(copyFileSourceMapParams);
    return true;
});
var types_2 = require("./types");
exports.SourceMap = types_2.SourceMap;
exports.Format = types_2.Format;
//# sourceMappingURL=index.js.map