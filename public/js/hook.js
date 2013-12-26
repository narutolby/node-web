(function (doc,win) {
	var domain = "127.0.0.1:8989";
	var $ = undefined;
	var app = {
		htmlTmp : "<div style='position:fixed;width:226px;height:326px'></div>"
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
			$ = jquery;

		}
	}
	app.start();
})(document,window);