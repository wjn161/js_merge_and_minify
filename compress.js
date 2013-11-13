/**
 *
 * @authors wujn (wjn-161@163.com)
 * @date    2013-11-13 21:25:56
 * @version 1.0
 */
var fs = require('fs');
var uglify = require('uglify-js');
var path = require("path");
var SOURCE_ROOT = "source";
var MIN_ROOT = "min";
//get all files from some folder
function getAllFiles(root) {
	var result = [],
		files = fs.readdirSync(root)
		files.forEach(function(file) {
			var pathname = root + "/" + file,
				stat = fs.lstatSync(pathname);
			if (stat === undefined) return;

			// not a folder,must be a file
			if (!stat.isDirectory()) {
				result.push(pathname);
				// recursion
			} else {
				result = result.concat(getAllFiles(pathname));
			}
		});
	return result;
}

function main() {
	var sourceFiles = getAllFiles(SOURCE_ROOT);
    //load all javascript files
	sourceFiles.forEach(function(file) {
		var extName = path.extname(file);
		if (extName != '.js') {
			return false;
		}
		var code = fs.readFileSync(file).toString();//get file content
		var output = uglify.minify(code, { //call uglify api to compress code
			fromString: true
		});
		if (!fs.existsSync(MIN_ROOT)) { //if min folder doesn't exist,create a new one
			fs.mkdirSync(MIN_ROOT, 0777);
		}
		var arrayPath = file.split('/');
		var fileName = arrayPath[1];
		var realFileName =fileName.substr(0,fileName.lastIndexOf('.'));
		var targetPath = MIN_ROOT + '/' + realFileName + '.' + MIN_ROOT + '.js';
		console.log(targetPath);
		fs.writeFile(targetPath, output.code, function(err) {
			if (err) {
				console.log(err);
			}
		});
	});
}
main();