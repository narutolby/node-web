var querystring = require("querystring");
var requestMapping = require("./requestMapping").requestMapping;
var url = require("url");
function route( request , response , callback ){
	//（1）	通过解析URI，获取请求方法与请求路径；
	var pathName = url.parse(request.url).pathname,
		method = request.method,
		reg = /\{(.*?)\}/g,
		pathVariables = {},
		//存储参数名称
		_vNames = [],
		_vValues;
	console.log("Request for " + pathName);
	//（2）	将请求路径与本论文设计的Restful接口进行正则表达式匹配
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
		//（3）	对为匹配的路径进行相关的异常处理
		return {
			status : "404",
			message : "Not found"
		}
	}else{
		//（3）	对为匹配的路径进行相关的异常处理
		return {
			"status" : "error",
			"message" : "Don't support '" + method +"' HTTP method"
		}
	}


}
exports.route = route;
