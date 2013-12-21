var http = require("http");
var url = require("url");
function start(route){
	function onRequest(request,response){
		var pathName = url.parse(request.url).pathname;	
		console.log("Request for " + pathName);
		route(pathName);
		response.end();
	}
	http.createServer(onRequest).listen(8989);
	console.log("Server start");
}
exports.start = start;

