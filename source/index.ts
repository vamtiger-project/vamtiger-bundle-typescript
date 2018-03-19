import { PathLike } from 'fs';
import * as typescript from 'typescript';
import { rollup as createBundle } from 'rollup';
import Args = require('vamtiger-argv');
import copyFile from 'vamtiger-copy-file';
import {
    MainParams as Params,
    Format,
    SourceMap,
    CommandlineArgs,
    BundleName as Name,
    TypescriptConfigurationModule as TsModule
} from './types';

const rollupTypescript = require('rollup-plugin-typescript');
const uglify = require('rollup-plugin-uglify');
const args = new Args();
const typescriptConfiguration = {
    typescript,
    module: TsModule.ES2015.toLowerCase()
};
const plugins = [
    rollupTypescript(typescriptConfiguration)
];

if (args.has(CommandlineArgs.minify)) 
    plugins.push(uglify());

export default async (params: Params) => {
    const entryFilePath = params.entryFilePath as string;
    const bundleFilePath = params.bundleFilePath as string;
    const sourcemap = params.sourcemap;
    const format = params.format || Format.iife;
    const copySourceMap = params.copySourceMap;
    const copyBundleFilePath = params.copyBundleFilePath;
    const bundleFileSourceMapPath = bundleFilePath && `${params.bundleFilePath}.map`;
    const copyBundleFileSourceMapPath = copySourceMap && copyBundleFilePath && `${copyBundleFilePath}.map`; 
    const bundleName = format === Format.iife && !params.bundleName ? Name.bundle : params.bundleName;
    const bundleConfiguration = {
        input: entryFilePath,
        plugins,
        acorn: {
            allowReserved: true
        }
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
    const bundle = await createBundle(bundleConfiguration);
    const exportBundle = await bundle.write(exportConfigurations);

    let exportBundleCopy;

    if (copyFileParams)
        await copyFile(copyFileParams);
    if (copyFileSourceMapParams)
        await copyFile(copyFileSourceMapParams);

    console.log(params);
    console.log([copyFileSourceMapParams]);

    return true;
};

export { SourceMap, Format } from './types';