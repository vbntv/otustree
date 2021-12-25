const printDirTree = require('./index.js');
const {getLog} = require('jest-console');

describe('tree test', () => {
    it('should print a tree with a depth level of 1', () => {
        printDirTree('testdata',1)
        expect(getLog().log).toMatch('├───folder\n' +
            '├───folder2\n' +
            '├───folder3\n' +
            '└─test.txt')
    })

    it('should print a tree with a depth level of 2', () => {
        printDirTree('testdata',2)
        expect(getLog().log).toMatch('├───folder\n' +
            '│\t└─subfolder1\n' +
            '├───folder2\n' +
            '│\t└─file.txt\n' +
            '├───folder3\n' +
            '└─test.txt')
    })

    it('should print a full tree', () => {
        printDirTree('testdata')
        expect(getLog().log).toMatch('├───folder\n' +
            '│\t└─subfolder1\n' +
            '│\t\t└─style.css\n' +
            '├───folder2\n' +
            '│\t└─file.txt\n' +
            '├───folder3\n' +
            '└─test.txt')
    })
});
