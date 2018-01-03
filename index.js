'use strict';
const cheerio = require('cheerio');
const scrapeArange = require('terminal-scrapearange');


function request(path) {
  // 1. make request to myfitnesspal
  var opt = {method: 'GET', protocol: 'http:', hostname: 'www.myfitnesspal.com', path};
  return scrapeArange.request(opt);
};

function nameParts(z, str, id) {
  // 1. get details from name
  z['Number'] = id;
  z['Name'] = str.trim();
};

function headParts(z, $, elm) {
  // 1. get details from head
  z['Servings'] = elm.find('option:selected').text().trim();
};

function bodyParts(z, $, elm) {
  // 1. get details from body
  var tds = $(elm).find('td');
  var name = $(tds[0]).text().trim();
  if(!!name) z[name] = $(tds[1]).text().trim();
  name = $(tds[2]).text().trim();
  if(!!name) z[name] = $(tds[3]).text().trim();
};

function searchAll(id) {
  return request(`/food/calories/${id}`).then((html) => {
    var $ = cheerio.load(html), z = {'Id': id};
    var foodDesc = $('.food-description');
    if(!foodDesc.length) throw new Error('Bad request id');
    nameParts(z, foodDesc.text(), id);
    headParts(z, $, $('#food_entry_weight_id'));
    $('#nutrition-facts tr').each((i, elm) => bodyParts(z, $, elm));
    return z;
  });
};
module.exports = searchAll;
if(require.main===module) scrapeArange.main({method: searchAll});
