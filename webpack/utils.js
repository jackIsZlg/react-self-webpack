const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

const resolveAssetsRootDir = (dir) => path.join(dir);

const assetsPath = (_path) => path.posix.join('', _path);

module.exports = {
    resolve,
    resolveAssetsRootDir,
    assetsPath
};
