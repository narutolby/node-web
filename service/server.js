var http = require("http");
var url = require("url");
var querystring = require("querystring");
function start(route){
	function onRequest(request,response){
			route(request,response,function(content){
			var search = url.parse(request.url).search;
			var callback = querystring.parse(search)['?callback'];
			content = JSON.stringify(content);
			callback && (content = callback + "('" + content + "')")
			response.write(content);
			response.end();
		});
	}
	http.createServer(onRequest).listen(8989);
	console.log("Server start");
}
exports.start = start;

