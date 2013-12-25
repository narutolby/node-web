var db = require("./db");
var _u = undefined;
HDFS = require('../node-hdfs');
//var hdfs = new HDFS({host:"127.0.0.1", port:"50070"});
var hdfs = require("fs");
exports.requestHandler = {

  uploadResource : function ( request ){

  },
  downloadResource : function ( request , response , pathVariables ) {
    var resourceId = pathVariables["id"],
    tmpStr = resourceId.substring(26),
    hdfs_file_path = tmpStr.replace(/(?=(\w{2})*$)/,"/") + resourceId + "." + pathVariables["type"];
  /*  hdfs.read(hdfs_file_path, 1024*1024, function(reader) {
      var readed = 0;
      reader.on("open", function(handle) {
      // do something when open
    });
      reader.on("data", function(data) {
        readed += data.length;
      });
      reader.on("end", function(err) {
        if(!err) {
          console.log("Finished reading data - Total readed: " + readed);
        }
        cb();
      });
    });*/
hdfs.readFile(hdfs_file_path,function(e,data)){
  console.log(data);
}
  },


  getResourceDataById : function( request , response , pathVariables ,callback){
    db.get(callback,_u,_u,_u,pathVariables["id"]);
  },

  getDataByResourceType : function ( request , response , pathVariables ,callback) {
    db.get(callback,pathVariables["type"],pathVariables["begin"],pathVariables["end"]);
  },

  getAllResourceDataByType : function ( request , response , pathVariables ,callback ) {
    db.get(callback,pathVariables["type"]);
  } ,

  getAllResourceData : function ( request , response , pathVariables ,callback ) {
    db.get(callback);
  },

  deleteResourceById : function ( request , response , pathVariables ,callback ) {
  	// body...
  },

  renameResourceById : function ( request , response , pathVariables ,callback){

  }

}