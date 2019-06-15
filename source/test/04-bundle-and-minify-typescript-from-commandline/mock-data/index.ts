export const booya = `
import kasha from './kasha';

const booyaKasha = \`Booya \${kasha}\`;

const a = {b: {c: 'c'}};

const { b } = a;
const { c } = b;

console.log(b);
console.log(c);

export default booyaKasha;
`.trim();

export const kasha = `
const kasha = 'Kasha!';

export default kasha;
`.trim();