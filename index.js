'use strict';
const jsdom = require('jsdom');

const request = function(path) {
  // 1. make request with user-agent
  return jsdom.JSDOM.fromURL(`http://www.myfitnesspal.com${path}`, {
    'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  });
};

const $ = function(id) {
  return request(`/food/calories/${id}`).then((dom) => {
  }, (err) => {
    const dom = new jsdom.JSDOM(err.error.toString());
    throw new Error(''+err.statusCode+' - '+dom.window.document.title);
  });
};
module.exports = $;
