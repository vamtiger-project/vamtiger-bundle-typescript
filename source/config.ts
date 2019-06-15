export const {default: transformDestructuring} = require("@babel/plugin-transform-destructuring");

console.log(transformDestructuring);;
export const babel = {
    exclude: 'node_modules/**',
    plugins: [
        transformDestructuring,
        { "useBuiltIns": true }
    ]
}