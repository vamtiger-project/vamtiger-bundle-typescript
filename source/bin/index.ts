#!/usr/bin/env node
import { PathLike, FSWatcher, watch as watchFolder } from 'fs';
import { dirname, extname as getExtension, resolve as resolvePath } from 'path';
import Args = require('vamtiger-argv');
import bundleTypescript from '..';
import log from '../log';
import { 
    CommandlineArgs, 
    Format, 
    SourceMap, 
    FileExtension,
} from '../types';

const workingDirectory = process.cwd();
const args = new Args();
const relativePath = args.has(CommandlineArgs.relativePath);
const entryFilePath = relativePath && 
    resolvePath(
        workingDirectory,
        args.get(CommandlineArgs.entryFilePath) as string
    )
    ||
    args.get(CommandlineArgs.entryFilePath) as PathLike;
const entryFolderPath = entryFilePath && dirname(entryFilePath as string);
const bundleFilePath = relativePath && 
    resolvePath(
        workingDirectory,
        args.get(CommandlineArgs.bundleFilePath) as string
    )
    ||
    args.get(CommandlineArgs.bundleFilePath) as PathLike;
const format = args.get(CommandlineArgs.format) as Format; 
const sourcemap = args.get(CommandlineArgs.sourcemap) as SourceMap | boolean; 
const bundleName = args.get(CommandlineArgs.bundleName);
const copyBundleFilePath = args.get(CommandlineArgs.copyBundleFilePath) || '';
const copySourceMap = args.has(CommandlineArgs.copySourceMap);
const watch = args.has(CommandlineArgs.watch);
const watchOptions = {
    recursive: true
};
const bundleParams = {
    entryFilePath,
    bundleFilePath,
    format,
    sourcemap,
    bundleName,
    copySourceMap,
    copyBundleFilePath
};

if (!entryFilePath) 
    throw new Error('No entry file specified');
else if(!bundleFilePath) 
    throw new Error('No bundle file specified');
else if(watch)
    watchFolder(entryFolderPath, watchOptions, createBundle);
else
    createBundle();

async function createBundle(eventType?: string, fileName?: string) {
    const fileType = fileName && getExtension(fileName)
        .substring(1)
        .toLowerCase();
    const generateTypescriptBundle = 
        (!eventType && !fileName)
        ||
        fileType === FileExtension.ts;

    if (eventType && fileName)
        log({
            eventType,
            fileName
        });
    
    if (generateTypescriptBundle)
        bundleTypescript(bundleParams);
}