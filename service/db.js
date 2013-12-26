var settings = require("../settings");
var mysql = require('mysql');
var conn = mysql.createConnection(settings.db_options);
conn.connect();
module.exports = {

	/*
	* Get data from database
	*/
	get : function(callback , type , begin , end ,id){
		var selectSql = "select * from RESOURCE" ;

		if(type && type != "all"){
			if(type == "word"){
				selectSql += " where resource_type='doc' or resource_type='docx'";
			}else{
				selectSql += " where resource_type='" + type + "'";
			}
		}
		if(begin && end){
			selectSql += " order by download_times desc limit " +begin+ "," + end;
		}

		if(id && id !== "all"){
			selectSql += " where id='" + id + "'";
		}
		conn.query(selectSql, function(err, rows, fields) {
			if (err) throw err;
			callback(rows);
		});
	}




}
//conn.end();