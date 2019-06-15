"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.babel = {
    exclude: 'node_modules/**',
    plugins: [
        require("@babel/plugin-transform-destructuring"),
        { "useBuiltIns": true }
    ]
};
//# sourceMappingURL=config.js.map