import { resolve as resolvePath, dirname } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import bash from 'vamtiger-bash';
import getFileData from 'vamtiger-get-file-data';
import bundleTypescript from '../..';
import { Format, SourceMap } from '../..';
import { CommandlineArgs as Args } from '../../types';
import * as mockData from './mock-data';

const entryFilePath = resolvePath(
    __dirname,
    'mock-data/source/index.ts'
);
const entryfileModulePath = resolvePath(
    __dirname,
    'mock-data/source/kasha/index.ts'
);
const bundleFilePath = resolvePath(
    __dirname,
    'mock-data/bundle/index.js'
);
const createBundlePath = resolvePath(
    __dirname,
    '../../bin/index.js'
);
const entryfileModulePathFolder = dirname(entryfileModulePath);
const bundleFilePathFolder = dirname(bundleFilePath);
const createFolders = `mkdir -p ${entryfileModulePathFolder} ${bundleFilePathFolder}`;
const clearFolders = [
    dirname(entryFilePath),
    entryfileModulePathFolder
].map(folder => `rm -rfv ${folder}/*`);
const newLines = /\n/gm;
const createTypescriptBundle = [
    `node ${createBundlePath}`,
    `--${Args.entryFilePath} ${entryFilePath}`,
    `--${Args.bundleFilePath} ${bundleFilePath}`,
    `--${Args.format} ${Format.iife}`,
    `--${Args.sourcemap} ${SourceMap.inline}`
].join(' ');

describe('vamtiger-bundle-typescript: commandline should', function () {
    it('bundle typescript into a single file', async function () {
        const cleared = await Promise.all(clearFolders.map(clearFolder => bash(clearFolder)))
            .then((clearedPathGroups) => clearedPathGroups.reduce((cleardPaths: string[], cleardPathsString: string) => cleardPaths.concat(cleardPathsString.split(newLines)), []))
            .then(cleardPaths => cleardPaths.filter(cleardPath => cleardPath));
        const makeEntryfileModulePathFolder = await bash(createFolders).catch(ignoreError);
        const createEntryFile = await createFile(entryFilePath, mockData.booya);
        const createEntryFileModule = await createFile(entryfileModulePath, mockData.kasha);
        const createBundle = await bash(createTypescriptBundle);
        const bundleFileText = await getFileData(bundleFilePath);
        const lines = bundleFileText.toString().split(newLines);

        expect(createBundle).to.equal('');
        expect(lines.length).to.be.greaterThan(4);
    })
});

function ignoreError(error: Error) {
    console.warn(error);
    console.warn('Error ignored');
}