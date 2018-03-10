"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booya = `
import kasha from './kasha';

const booyaKasha = \`Booya \${kasha}\`;

export default booyaKasha;
`.trim();
exports.kasha = `
const kasha = 'Kasha!';

export default kasha;
`.trim();
//# sourceMappingURL=index.js.map