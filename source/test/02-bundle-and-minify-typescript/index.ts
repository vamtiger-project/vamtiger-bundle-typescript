import { resolve as resolvePath, dirname } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import bash from 'vamtiger-bash';
import getFileData from 'vamtiger-get-file-data';
import bundleTypescript from '../..';
import { Format, SourceMap } from '../..';
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
const entryfileModulePathFolder = dirname(entryfileModulePath);
const bundleFilePathFolder = dirname(bundleFilePath);
const createFolders = `mkdir -p ${entryfileModulePathFolder} ${bundleFilePathFolder}`;
const clearFolders = [
    dirname(entryFilePath),
    entryfileModulePathFolder
].map(folder => `rm -rfv ${folder}/*`);
const newLines = /\n/gm;

describe('vamtiger-bundle-typescript should', function () {
    it('bundle and minify typescript into a single file', async function () {
        const cleared = await Promise.all(clearFolders.map(clearFolder => bash(clearFolder)))
            .then((clearedPathGroups) => clearedPathGroups.reduce((cleardPaths: string[], cleardPathsString: string) => cleardPaths.concat(cleardPathsString.split(newLines)), []))
            .then(cleardPaths => cleardPaths.filter(cleardPath => cleardPath));
        const makeEntryfileModulePathFolder = await bash(createFolders).catch(ignoreError);
        const createEntryFile = await createFile(entryFilePath, mockData.booya);
        const createEntryFileModule = await createFile(entryfileModulePath, mockData.kasha);
        const createBundle = await bundleTypescript({
            entryFilePath,
            bundleFilePath,
            sourcemap: SourceMap.inline,
            format: Format.iife
        });
        const bundleFileText = await getFileData(bundleFilePath);

        expect(createBundle).to.be.ok;
    })
});

function ignoreError(error: Error) {
    console.warn(error);
    console.warn('Error ignored');
}