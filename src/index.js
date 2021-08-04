const fs = require('fs');
const path = require('path')

const graphicSymbols = {
    long: '│',
    mid: '├───',
    last: '└─',
    tab: '\t',
}

const counters = {
    dirs: 0,
    files: 0
}

function getBranch(lastPrefix, isLast) {
    let prefix;
    let branch;
    branch = lastPrefix;
    if (isLast) {
       prefix = graphicSymbols.last
       branch += graphicSymbols.tab;
    } else {
        prefix = graphicSymbols.mid
        branch += (graphicSymbols.long + graphicSymbols.tab);
    }
    return {
        prefix: prefix,
        branch: branch,
    }
}


function printDirTree(depth) {
    return function d(dirpath, lastprefix = '', level = 0) {
        level++;
        let dir = fs.readdirSync(dirpath, {withFileTypes: true})
        for (const dirent of dir) {
            let graphics = getBranch(lastprefix, (dirent.name === dir[dir.length - 1].name))
            if (dirent.isDirectory()) {
                counters.dirs++;
                console.log(lastprefix + graphics.prefix + dirent.name)
                if ((depth && depth > level) || !depth) d(path.join(dirpath, dirent.name), graphics.branch, level);
            } else {
                counters.files++;
                console.log(lastprefix + graphics.prefix + dirent.name)
            }
        }
    }
}


function main() {
    let params = getParams();
    printDirTree(params.depth)(params.path);
    Object.keys(counters).forEach((key) => { console.log(key + ' ' + counters[key]) })
}

const getParams = () => {
    return {
        path: process.argv[2],
        depth: process.argv[3] === '-d' ? process.argv[4] : undefined
    }
}

main()
