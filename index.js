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
    const a = {}, b = {}, document = dom.window.document;
    const viewName = document.querySelector('.food-description');
    if(viewName==null) return {};
    const key = viewName.textContent.trim();
    const servings = document.getElementById('food_entry_weight_id');
    for(var tr of document.querySelectorAll('#nutrition-facts tr')) {
      var tds = tr.getElementsByTagName('td');
      var name = tds[0].textContent.trim();
      if(name) b[name] = tds[1].textContent.trim();
      name = tds[2].textContent.trim();
      if(name) b[name] = tds[3].textContent.trim();
    }
    a[key] = b;
    return a;
  }, (err) => {
    const dom = new jsdom.JSDOM(err.error.toString());
    throw new Error(''+err.statusCode+' - '+dom.window.document.title);
  });
};
module.exports = $;

if(require.main===module) {
  const z = {}, a = process.argv;
  const start = parseInt(a[2], 10)||0, stop = parseInt(a[3], 10);
  const step = parseInt(a[4])||1, inc = Math.sign(step);
  const fetch = (id) => pro.then(() => $(id)).then((ans) => Object.assign(z, ans));
  for(var i=start, pro=Promise.resolve(); i!==stop;) {
    for(var I=Math.min(stop, i+step), p=[]; i!==I; i+=inc)
      p.push(fetch(i));
    pro = Promise.all(p);
  }
  pro.then(() => console.log(JSON.stringify(z)));
}
