var db = require("./db");
var path = require("path");
var settings = require("../settings");
var _u = undefined;
//HDFS = require('../node-hdfs');
//var hdfs = new HDFS({host:"127.0.0.1", port:"50070"});
var hdfs = require("fs");
exports.requestHandler = {

  uploadResource : function ( request ){

  },
  downloadResource : function ( request , response , pathVariables ) {
    var resourceId = pathVariables["id"],
    tmpStr = resourceId.substring(26),
    hdfs_file_path = tmpStr.replace(/(?=(\w{2})*$)/g,path.sep) + resourceId ;
    db.get(function(rows){
      var resourceType = rows[0]["resource_type"],
      resourceRealName = rows[0]["resource_real_name"];
      hdfs_file_path = settings.base_path + hdfs_file_path + "." + resourceType;
      /*******/
      hdfs.readFile(hdfs_file_path,function(e,data){
       response.writeHead(200 , {
        "Content-type" : "application/octet-stream;charset=utf-8",
        "Content-disposition" : "attachment; filename='" + new Buffer(resourceRealName).toString('binary') + "'"
      }); 
       response.write(data);
       response.end();
     });
      /*******/
      hdfs.read(hdfs_file_path, 1024*1024, function(reader) {
        var readed = "";
        reader.on("data", function(data) {
          readed += data;
        });
        reader.on("end", function(err) {
          if(!err) {
            console.log("Finished reading data - Total readed: " + readed);
          }
          response.writeHead(200 , {
            "Content-type" : "application/octet-stream;charset=utf-8",
            "Content-disposition" : "attachment; filename='" + new Buffer(resourceRealName).toString('binary') + "'"
          }); 
          response.write(data);
          response.end();
        });
      });
      /*******/
    },_u,_u,_u,pathVariables["id"]);
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