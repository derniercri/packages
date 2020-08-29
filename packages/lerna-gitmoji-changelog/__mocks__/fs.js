'use strict';

const fs = jest.createMockFromModule('fs');

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function writeFileSync() {
    return "";
}

fs.writeFileSync = writeFileSync;

module.exports = fs;
