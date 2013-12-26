(function (doc,win) {
	var domain = "127.0.0.1:8989";
	var $ = undefined;
	var app = {
		htmlTmp : "<div style='position:fixed;width:226px;height:326px;background:#f6f6f6;border:1px solid #e9e9e9;top:100px;right:0px' id='r_box'>"
		+	"<div id='r_slide' style='background: url(http://"+domain +"/static/img/tip.png) no-repeat;"
+ "color: #FFFFFF; padding: 8px 6px; font-family:Microsoft Yahei; font-weight: bold; font-size: 13px; cursor: pointer; position: absolute;"
+ "left: -24px; top: 60px; width: 24px; height: 88px;'>资源分享</div>"
+	"</div>",
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
		init : function(){
			$ = jQuery;
			$(app.htmlTmp).appendTo(doc.body);
		}
	}
	app.start();
})(document,window);