"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDestructuring = require("@babel/plugin-transform-destructuring").default;
console.log(exports.transformDestructuring);
;
exports.babel = {
    exclude: 'node_modules/**',
    plugins: [
        exports.transformDestructuring,
        { "useBuiltIns": true }
    ]
};
//# sourceMappingURL=config.js.map