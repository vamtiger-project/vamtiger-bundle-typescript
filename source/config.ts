export const babel = {
    exclude: 'node_modules/**',
    plugins: [
        '@babel/plugin-transform-destructuring',
        { useBuiltIns: true }
    ]
}