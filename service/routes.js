var querystring = require("querystring");
var requestMapping = require("./requestMapping").requestMapping;
var url = require("url");
function route( request , response , callback ){
	var pathName = url.parse(request.url).pathname,
		query = url.parse(request.url).query,
		method = request.method,
		reg = /\{(.*?)\}/g,
		pathVariables = {},
		_vNames = [],
		_vValues;
	console.log("Request for " + pathName);
	//support restful
	if(requestMapping[method]){
		var _m = requestMapping[method],path,_reg;
		for(path in _m){
			_vNames.length = 0;
			_reg = new RegExp("^" + path.replace(reg, 
				function(x,y){
					_vNames.push(y);
					return "([^/]*?)";
				}) + "$");
			if(_reg.test(pathName)){
				_vValues = pathName.match(_reg);
				for(var i=0;i<_vNames.length;i++){
					pathVariables[_vNames[i]] = _vValues[i+1];
				}
				return _m[path](request,response,pathVariables,callback);
			}
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
