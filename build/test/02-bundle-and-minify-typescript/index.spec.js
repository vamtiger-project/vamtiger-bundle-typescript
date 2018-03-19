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
const vamtiger_bash_1 = require("vamtiger-bash");
const mocha = path_1.resolve(__dirname, '../../../node_modules/mocha/bin/_mocha');
const testPath = path_1.resolve(__dirname, 'index.js');
const test = `${mocha} ${testPath} --minify`;
runTest();
function runTest() {
    return __awaiter(this, void 0, void 0, function* () {
        const runTestProcess = yield vamtiger_bash_1.default(test);
    });
}
//# sourceMappingURL=index.spec.js.map