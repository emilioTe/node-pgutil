

var crypto = require('crypto');

exports.insertParse = function(obj) {
  var keys = Object.keys(obj)
    , values = []
    , numerals = []   // This will hold the placeholders. I.e. `$1,$2,$3`
    ;

  keys.forEach(function(key) { values.push(obj[key]); });

  for (var i = 1; i <= values.length; i++) {
    numerals.push('$' + i);
  }

  return {fields: keys.toString(), params: numerals.toString(), values: values};

};


exports.updateParse = function(obj) {
  var keys = Object.keys(obj)
    , values = []
    , numerals = []
    ;

  keys.forEach(function(key) { values.push(obj[key]); });

  for (var i = 1; i <= keys.length; i++) {
    numerals.push(keys[i - 1] + '=$' + i);
  }

  return {fields: numerals.toString(), values: values};
};


exports.hash = function(s, salt, hash) {
  return crypto.createHash(hash || 'sha512').update(s + (salt || ''), 'utf8').digest('hex');
};