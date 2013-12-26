(function (doc,win) {
	var domain = "127.0.0.1:8989";
	var $ = undefined;
	var app = {
		htmlTmp : "<div style='position:fixed;width:226px;height:326px;background:#ffffff;border:1px solid #e9e9e9;top:100px;right:0px' id='r_box'>"
		+	"<div id='r_slide' style='background: url(http://"+domain +"/static/img/tip.png) no-repeat;"
		+ "color: #FFFFFF; padding: 8px 6px; font-family:Microsoft Yahei; font-weight: bold; font-size: 13px; cursor: pointer; position: absolute;"
		+ "left: -24px; top: 60px; width: 24px; height: 88px;'>资源分享</div>"
		+ "<div style='width:50%;height:45px;background:#ffffff;float:left;text-align:center;line-height:45px;font-weight:bold'>下载资源</div>"
		+ "<div style='width:50%;height:45px;background:#e9e9e9;float:left;text-align:center;line-height:45px;cursor:pointer;font-weight:bold'>上传资源</div>"
		+ "<div><ul id='r_body' style='list-style:none;font-size:10px;padding:35px 0 0 7px'></ul></div>"
		+ "<div id='r_foot' style='position:absolute;bottom:0px;height:30px;background:#e9e9e9;width:100%;line-height:30px;padding-left:8px'>"
		+ "<select id='r_type'>"
		+ "<option value='all'>全部</option>"
		+ "<option value='pdf'>PDF</option>"
		+ "<option value='word'>WORD</option>"
		+ "<option value='ppt'>PPT</option>"
		+ "<option value='txt'>Txt</option>"
		+ "</select></div>"
		+	"</div>",
		rescListTmpl : "<li style='height:30px;border-bottom:1px solid #e9e9e9;line-height:30px;overflow:hidden'><span title='${resource_real_name}' style='display:block;width:180px;text-overflow:ellipsis;white-space: nowrap;overflow:hidden'>${resource_real_name}</span><a href='http://"+domain+"/resource/${id}'></a></li>",
		option : {
			type : "all",
			begin:0,
			end : 8
		},
		start : function(){
			var sc = document.createElement('script');
			sc.type = 'text/javascript';
			sc.async = true;
			sc.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
			'//' + domain + '/static/js/jquery.min.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(sc, s);	
			this.scriptLoaded(sc);
		},
		scriptLoaded: function(sc){
			var self = this;
			sc.onload = self.init;
			sc.onreadystatechange = function () { 
				if (sc.readyState == 'loaded' || sc.readyState == 'complete') { 
					self.init();
				} 
			}
		},
		filter : function(){
			var op = this.option;
			$.getJSON("http://"+domain+"/resource/data/"+op.type+"/"+op.begin+"/to/"+op.end+"?callback=?")
			 .done(function(data){
			 var _body = $('#r_body').html("");
            $.tmpl('template',JSON.parse(data)).appendTo(_body);
			});	
		}
		,
		init : function(){
			$ = jQuery;
			$(app.htmlTmp).appendTo(doc.body);
			$.template('template',app.rescListTmpl);
			app.filter();
			$("#r_type").change(function(){
				app.option.type = $(this).val();
				app.filter();
			})
			/*$("#r_box").bind("mouseenter",function(){
				$(this).stop(true,true).animate({right : "0px"},300);
			}).bind("mouseleave",function(){
				$(this).stop(true,true).animate({right : "-226px"},300);
			}); */
		},

	}
	app.start();
})(document,window);