export const {default: transformDestructuring} = require('@babel/plugin-transform-destructuring');
export const transformEs2015Destructuring = require('babel-plugin-transform-es2015-destructuring');

export const babel = {
    exclude: 'node_modules/**',
    plugins: [
        transformDestructuring,
        transformEs2015Destructuring,
        { 'useBuiltIns': true }
    ]
}