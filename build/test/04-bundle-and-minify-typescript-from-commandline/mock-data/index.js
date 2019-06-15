"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booya = "\nimport kasha from './kasha';\n\nconst booyaKasha = `Booya ${kasha}`;\n\nconst a = {b: {c: 'c'}};\n\nconst { b } = a;\nconst { c } = b;\n\nconsole.log(b);\nconsole.log(c);\n\nexport default booyaKasha;\n".trim();
exports.kasha = "\nconst kasha = 'Kasha!';\n\nexport default kasha;\n".trim();
//# sourceMappingURL=index.js.map