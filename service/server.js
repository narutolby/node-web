var http = require("http");
function start(route){
	function onRequest(request,response){
			route(request,response,function(content){
			response.writeHead(200 , {"Content-type" : "application/json"});
			response.write(JSON.stringify(content));
			response.end();
		});
	}
	http.createServer(onRequest).listen(8989);
	console.log("Server start");
}
exports.start = start;

