"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDestructuring = require('@babel/plugin-transform-destructuring').default;
exports.transformEs2015Destructuring = require('babel-plugin-transform-es2015-destructuring');
exports.babel = {
    exclude: 'node_modules/**',
    plugins: [
        exports.transformDestructuring,
        exports.transformEs2015Destructuring,
        { 'useBuiltIns': true }
    ]
};
//# sourceMappingURL=config.js.map