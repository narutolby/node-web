var db = require("./db");
var _u = undefined;
exports.requestHandler = {
  
  uploadResource : function ( request ){

  },
  downloadResource : function ( request , response , pathVariables ) {

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