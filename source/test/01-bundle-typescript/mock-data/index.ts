export const booya = `
import kasha from './kasha';

const booyaKasha = \`Booya \${kasha}\`;

const a = {b: 'b'};

const { b } = a;

console.log(b);

export default booyaKasha;
`.trim();

export const kasha = `
const kasha = 'Kasha!';

export default kasha;
`.trim();