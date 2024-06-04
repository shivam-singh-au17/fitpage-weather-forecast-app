import * as fs from 'fs';
import * as path from 'path';

const srcDir = path.join(__dirname);
const distDir = path.join(__dirname, '../dist');
const filesToCopy = ['api-docs.yml'];

filesToCopy.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(distDir, file);
    fs.copyFileSync(srcFile, destFile);
});
