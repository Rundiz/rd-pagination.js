/**
 * Test that files exists.
 */

const fs = require('node:fs');


describe('Test that built files are really exists.', () => {
    test('Original file', () => {
        expect(fs.existsSync('assets/js/rd-pagination.js')).toBe(true);
    });
    test('Minified files', () => {
        expect(fs.existsSync('assets/js/rd-pagination.min.js')).toBe(true);
        expect(fs.existsSync('assets/js/rd-pagination.min.js.map')).toBe(true);
    });
    test('UMD file', () => {
        expect(fs.existsSync('assets/js/rd-pagination.umd.js')).toBe(true);
    });
});


describe('Test that it is really built from original file (version check).', () => {
    const fileData = fs.readFileSync('assets/js/rd-pagination.js');
    const versionString = fileData.toString().match(/@version\s+(.*)/i);
    if (versionString[1]) {
        test('Matched version number on all files.', () => {
            expect(typeof versionString[1]).toBe('string');

            const minifiedFileData = fs.readFileSync('assets/js/rd-pagination.min.js');
            const minifiedVersionString = minifiedFileData.toString().match(/@version\s+(.*)/i);
            expect(minifiedVersionString[1]).toBe(versionString[1]);

            const umdFileData = fs.readFileSync('assets/js/rd-pagination.umd.js');
            const umdVersionString = umdFileData.toString().match(/@version\s+(.*)/i);
            expect(umdVersionString[1]).toBe(versionString[1]);

            const packageJsonFileData = fs.readFileSync('package.json');
            const packageJsonObj = JSON.parse(packageJsonFileData);
            expect(packageJsonObj.version).toBe(versionString[1]);
        });
    } else {
        fail('Not found version number.');
    }
});