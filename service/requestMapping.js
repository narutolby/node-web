var  requestHandler = require("./requestHandler").requestHandler;
exports.requestMapping = {

	"GET" : {
		//下载资源接口
		"/resource/{id}" : requestHandler.downloadResource,
		//获取某资源相关数据接口
		"/resource/data/{id}" : requestHandler.getResourceDataById,
		//分页显示某类型资源数据接口
		"/resource/data/{type}/{begin}/to/{end}" : requestHandler.getDataByResourceType,
		//获取某类型全部资源数据接口
		"/resource/data/{type}/all" : requestHandler.getAllResourceDataByType,
		//获取全部资源数据接口
		"/resource/data/all" :  requestHandler.getAllResourceData
	},

	"POST" : {
		//上传资源接口
		"/resource" :  requestHandler.uploadResource
	},

	"PUT" : {
		//修改资源名称接口
		"/resource/{id}/{oldname}/to/{newname}" : requestHandler.renameResourceById
	},

	"DELETE" : {
		//删除某资源接口
		"/resource/{id}" : requestHandler.deleteResourceById
	}
}