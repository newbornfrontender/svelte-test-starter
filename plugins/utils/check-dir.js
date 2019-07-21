import { existsSync, mkdirSync } from 'fs';

export default (dirname) => !existsSync(dirname) && mkdirSync(dirname);
