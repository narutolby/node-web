var url = require("url");
var path = require("path");
var fs = require("fs");
var settings = require("../settings");
module.exports = function (pathname,response) {
	var static_path = settings.static_path;
		pathname = pathname.replace("/static" , "");
	var ext = path.extname(pathname);
	var staticFileName = static_path + pathname;
	path.exists(staticFileName,function(exists){
		if(!exists) {  
			response.writeHead(404, { "Content-Type": "text/plain" });  
			response.write("404 Not Found\n");  
			response.end();  
			return;  
		}  
		 var ext = path.extname(staticFileName);
		fs.readFile(staticFileName,function(err,file){
			if(err) {  
				response.writeHead(500, { "Content-Type": "text/plain" });  
				response.write(err + "\n");  
			 	response.end();  
			 	return;  
			 }  
			response.writeHead(200, { 'Content-Type': settings.contentType[ext] });  
			//console.log(file);
			response.write(file,"binary");
			response.end();
		});
	});
}

