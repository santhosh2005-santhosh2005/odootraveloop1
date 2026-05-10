import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const clientDist = path.join(rootDir, 'client', 'dist');
const serverPublic = path.join(rootDir, 'server', 'public');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function cleanDir(dir) {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            if (file === '.gitkeep') return;
            const curPath = path.join(dir, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                cleanDir(curPath);
                fs.rmdirSync(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
    }
}

console.log('==> Cleaning server/public...');
cleanDir(serverPublic);

console.log('==> Copying client build to server/public...');
if (fs.existsSync(clientDist)) {
    copyRecursiveSync(clientDist, serverPublic);
    console.log('==> Build successfully copied to server/public');
} else {
    console.error('!! Error: client/dist not found. Did you run "npm run build" in the client folder?');
    process.exit(1);
}
