var fs = require('fs');
var uglify = require('uglify-js');
var open = fs.readFileSync;
var config = JSON.parse(open('config.json'));
var comment = config.comment && open(config.comment).toString().replace(/%date%/g, new Date().toJSON());
var inputs = config.input;

if (!inputs || !inputs.length) {
	console.log('no input files!');
	return;
}
//map and reduce
var results = inputs
	.map(function(f) {
		var code = open(f).toString();
		var output = uglify.minify(code, {fromString: true});
		console.log('uglify... <<< ', f, '\t', output.code.length + '/', code.length, '\t=', output.code.length / code.length);
		return output.code;
	})
	.reduce(function(a, b) {
		return a + b;
	}, comment);
//output codes
console.log('writing file >>>', config.output, results.length, 'bytes');
fs.writeFile(config.output, results, function(err) {
	if (err) throw err;
	console.log('all done!');
})