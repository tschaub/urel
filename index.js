function parsePath(path) {
  if (path[0] !== '/') {
    throw new Error('Must be called with a full path');
  }

  var parsed = {};

  // deal with the hash
  var hashIndex = path.indexOf('#');
  if (hashIndex > 0) {
    parsed.hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  } else {
    parsed.hash = '';
  }

  // deal with the query string
  var queryIndex = path.indexOf('?');
  if (queryIndex > 0) {
    parsed.search = path.slice(queryIndex);
    path = path.slice(0, queryIndex);
  } else {
    parsed.search = '';
  }

  parsed.pathname = path;
  parsed.parts = path.split('/');
  return parsed;
}

module.exports = function(from, to) {
  var fromParsed = parsePath(from);
  var toParsed = parsePath(to);

  var commonDepth = 1;
  var fromLength = fromParsed.parts.length;
  while (commonDepth < fromLength - 1) {
    if (fromParsed.parts[commonDepth] === toParsed.parts[commonDepth]) {
      ++commonDepth;
    } else {
      break;
    }
  }

  var back = new Array(fromLength - commonDepth).join('../') || './';
  return back + toParsed.parts.slice(commonDepth).join('/') + toParsed.search + toParsed.hash;
};
