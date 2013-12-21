var querystring = require("./querystring");
var requestMapping = require("./requestMapping");
var url = require("url");
function route(request,response){
	var pathName = url.parse(request.url).pathname,
		query = url.parse(request.url).query,
		params = querystring.parse(query),
		method = request.method;
	console.log("Request for " + pathName);
	if(requestMapping[method]){
		var _m = requestMapping[method],reg;
		for(reg in_m){

		}
		return {
			status : "404",
			message : "Not found"
		}
	}else{
		return {
			"status" : "error",
			"message" : "Don't support '" + method +"' HTTP method"
		}
	}


}
exports.route = route;
