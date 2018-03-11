# VAMTIGER Bundle Typescript
[VAMTIGER Bundle Typescript](https://github.com/vamtiger-project/vamtiger-bundle-typescript) bundles  [typescript](https://www.typescriptlang.org/) into a single compiled output file.

## Installation
[VAMTIGER Bundle Typescript](https://github.com/vamtiger-project/vamtiger-bundle-typescript) can be installed using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/):
```javascript
npm i --global vamtiger-bundle-typescript 
```
or
```javascript
yarn global vamtiger-bundle-typescript
```

## Usage
[VAMTIGER Bundle Typescript](https://github.com/vamtiger-project/vamtiger-bundle-typescript) can bundle [typescript](https://www.typescriptlang.org/) to a single compiled output file:
```bash
vamtiger-bundle-typescript --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format cjs --sourcemap inline
```

The compiled result can also be minified by specifying the **minify** option:
```bash
vamtiger-bundle-typescript --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format cjs --sourcemap inline --minify
```

The **watch** option can be added to generate compiled output each time a source file is updated:
```bash
vamtiger-bundle-typescript --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format cjs --sourcemap inline --watch
```

The **copyBundleFilePath** option will copy the compiled output to a defined path:
```bash
vamtiger-bundle-typescript --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format cjs --sourcemap inline --copyBundleFilePath ${PWD}/some/bundle-copy.js
```

The **relativePath** option can be used to reference **entryFilePath** and **bundleFilePath** relative to the current working directory:
```bash
vamtiger-bundle-typescript --relativePath --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format cjs --sourcemap inline --copyBundleFilePath ${PWD}/some/bundle-copy.js
```

[VAMTIGER Bundle Typescript](https://github.com/vamtiger-project/vamtiger-bundle-typescript) can also be defined as a custom script:
```json
    ...
    scripts: {
        "bundle": "vamtiger-bundle-typescript --relativePath --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format iife --sourcemap inline --minify",
        "watch": "vamtiger-bundle-typescript --relativePath --entryFilePath source/index.ts --bundleFilePath build/bundle.js --format iife --sourcemap inline --minify --watch"
    }
    ...
```

Output formats of the compiled result include:
* umd
* amd
* system
* cjs
* iife

Sourcemap can be set to:
* inline
* true
* false