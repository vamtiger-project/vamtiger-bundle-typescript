import { PathLike } from 'fs';

export interface MainParams {
    entryFilePath: PathLike;
    bundleFilePath: PathLike;
    format: Format;
    sourcemap?: SourceMap | boolean;
    bundleName?: string;
    copySourceMap?: boolean;
    copyBundleFilePath?: string;
}

export interface LogParams {
    eventType: string;
    fileName: string;
}

export enum Format {
    umd = 'umd',
    amd = 'amd',
    system = 'system',
    cjs = 'cjs',
    iife = 'iife'
}

export enum SourceMap {
    inline = 'inline'
}

export enum CommandlineArgs {
    entryFilePath = 'entryFilePath',
    bundleFilePath = 'bundleFilePath',
    copyBundleFilePath = 'copyBundleFilePath',
    copySourceMap = 'copySourceMap',
    format = 'format',
    sourcemap = 'sourcemap',
    bundleName = 'bundleName',
    minify = 'minify',
    watch = 'watch',
    relativePath = 'relativePath'
}

export enum BundleName {
    bundle = 'index'
}

export enum TypescriptConfigurationModule {
    ES2015 = 'ES2015',
    ES2016 = 'ES2016',
    ES2017 = 'ES2017',
    ESNext = 'ESNext',
    ES5 = 'ES5',
    ES6 = 'ES6',
    ES7 = 'ES7'
}

export enum FileExtension {
    ts = 'ts'
}