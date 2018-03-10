import { resolve as resolvePath, dirname } from 'path';
import bash from 'vamtiger-bash';

const mocha = resolvePath(
    __dirname,
    '../../../node_modules/mocha/bin/_mocha'
);
const testPath = resolvePath(
    __dirname,
    'index.js'
);
const test = `${mocha} ${testPath} --minify`;

runTest();

async function runTest() {
    const runTestProcess = await bash(test);
}