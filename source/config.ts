export const babel = {
    exclude: 'node_modules/**',
    plugins: [
        require("@babel/plugin-transform-destructuring"),
        { "useBuiltIns": true }
    ]
}