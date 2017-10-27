'use strict';
const jsdom = require('jsdom');

const request = function(path) {
    // 1. make request with user-agent
    return jsdom.JSDOM.fromURL(`http://www.myfitnesspal.com${path}`, {
        'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    });
};
