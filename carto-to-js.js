var fs = require('fs');

fs.readFile('./test.mss', 'utf8', function(err, contents) {
  if (err) return console.error(err);
  contents = contents.split('\n').join('').replace(/ /g,'');
  console.log(contents);
});