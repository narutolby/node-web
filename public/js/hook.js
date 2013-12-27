(function (doc,win) {
	var domain = "127.0.0.1:8989";
	var $ = undefined;
	var app = {
		htmlTmp : "<div style='position:fixed;width:226px;height:326px;background:#ffffff;border:1px solid #e9e9e9;top:100px;right:-226px' id='r_box'>"
		+	"<div id='r_slide' style='background: url(http://"+domain +"/static/img/tip.png) no-repeat;"
		+ "color: #FFFFFF; padding: 8px 6px; font-family:Microsoft Yahei; font-weight: bold; font-size: 13px; cursor: pointer; position: absolute;"
		+ "left: -24px; top: 60px; width: 24px; height: 88px;'>资源分享</div>"
		+ "<div id='r_tab1' style='width:50%;height:45px;background:#ffffff;float:left;text-align:center;line-height:45px;font-weight:bold'>下载资源</div>"
		+ "<div id='r_tab2' style='width:50%;height:45px;background:#e9e9e9;float:left;text-align:center;line-height:45px;cursor:pointer;font-weight:bold'>上传资源</div>"
		+ "<div id='r_view1' style='dispaly:block'><ul id='r_body' style='list-style:none;font-size:10px;padding:35px 0 0 7px'></ul></div>"
		+ "<div id='r_view2' style='display:none;padding-top:36px;position:relative;overflow:hidden;width:100%;height:100%'>"
		+ "<div id='input_div' style='height:38px;line-height:38px;text-align:center;font-size:10px;width: 161px;margin-left: 3px;float:left;background:url(http://lib.youionline.com:8888/JavaDecompiler/img/icon.gif) no-repeat 0 -136px'>&nbsp;&nbsp;Pro.Git-zh_CN.pdf</div>"
		+ "<div style='margin-left:2px;width: 60px; height: 33px; background: url(http://lib.youionline.com:8888/JavaDecompiler/img/brow.png);float: left;'> </div>"
		+ "<input type='button' value='提交' id='submitBtn' style='background: url(http://lib.youionline.com:8888/img/act_btn.png) no-repeat scroll 0 0 transparent;"
        + "border: none; cursor: pointer; height: 35px; width: 104px; text-indent: -9999px; outline: none;position: absolute; top: 86px; left: 65px;'>"
		+ "<img src='img/1.jpg' style='position: absolute; top: 140px; left: 0px; width: 100%;'>"
		+ "</div>"
		+ "<div id='r_foot' style='position:absolute;bottom:0px;height:30px;background:#e9e9e9;width:100%;line-height:30px;padding-left:8px'>"
		+ "<select id='r_type'>"
		+ "<option value='all'>全部</option>"
		+ "<option value='pdf'>PDF</option>"
		+ "<option value='word'>WORD</option>"
		+ "<option value='ppt'>PPT</option>"
		+ "<option value='txt'>Txt</option>"
		+ "</select>"
		+ "&nbsp"
		+ "<a href='javascript:void(0)'><img src='http://lib.youionline.com/img/re_l.png' style='opacity: 1;' id='resc_prev'></a>"
		+ "<a href='javascript:void(0)'><img src='http://lib.youionline.com/img/re_r.png' style='opacity: 1;' id='resc_prev'></a>"
		+ "&nbsp;"
		+ "<input id='r_keyword' type='text' placeholder='搜索资源' style='width:88px;height:18px;border:1px solid #CCC'>"
		+ "</div>"
		+	"</div>",
		rescListTmpl : "<li style='height:30px;border-bottom:1px solid #e9e9e9;line-height:30px;overflow:hidden'><span title='${resource_real_name}' style='display:inline-block;width:155px;text-overflow:ellipsis;white-space: nowrap;overflow:hidden'>${resource_real_name}</span>"
		+ "<a href='http://"+domain+"/resource/${id}' style='float:right;height:30px;line-height:30px; "
		+ "background: url(http://lib.youionline.com/img/btn_myResrc.jpg) no-repeat; border: none; margin: 2px 5px 0 0; cursor: pointer;color;width:47px;text-align:center;font-weight:bold;text-decoration:none'>下载</a></li>",
		option : {
			type : "all",
			begin:0,
			end : 20
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
		},
		viewController : {
			eventSource : "",
			create : function(view){
				var klass = function(){};
				klass.prototype.active = function(){
					$(view).show();
				};
				klass.prototype.deactive = function(){
					$(view).hide();
				};
				var clazz = new klass;
				this.add(clazz);
				return clazz;
			},
			add : function(v){
				this.eventSource.bind("toggleActive",function(e,_v){
					if(v == _v){
						v.active();
					}else{
						v.deactive();
					}
				});
			},
			trigger : function(v){
				this.eventSource.trigger("toggleActive",[v]);
			}
		}
		,
		init : function(){
			$ = jQuery;
			$(app.htmlTmp).appendTo(doc.body);
			$.template('template',app.rescListTmpl);
			app.filter();
			app.viewController.eventSource = $({});
			var view1 = app.viewController.create("#r_view1");
			var view2 = app.viewController.create("#r_view2");
			$("#r_type").change(function(){
				app.option.type = $(this).val();
				app.filter();
			})
			var $tab1 = $("#r_tab1").bind("click",function(){
				app.viewController.trigger(view1);
				$(this).css("background","white").css("cursor","default");
				$tab2.css("background","#e9e9e9").css("cursor","pointer");
				$("#r_foot").show();
			});
			var $tab2 = $("#r_tab2").bind("click",function(){
				app.viewController.trigger(view2);
				$(this).css("background","white").css("cursor","default");
				$tab1.css("background","#e9e9e9").css("cursor","pointer");
				$("#r_foot").hide();
			});

			$("#r_box").bind("mouseenter",function(){
				$(this).stop(true,false).animate({right : "0px"},300);
			}).bind("mouseleave",function(){
				$(this).stop(true,false).animate({right : "-226px"},300);
			}); 
			var $r_body = $("#r_body");
			$("#r_keyword").bind("keyup",function(){
					var val =$(this).val();
					var list = $r_body.find("li");
					list.filter(function(){
						var html = $(this).find("span").attr("title");
						if(html.indexOf(val) != -1){
							html = html.replace(val,"<span style='color:red;font-weight:bold'>"+val+"</span>")
							$(this).show();
							$(this).find("span").html(html);
						}else{
							$(this).hide();
						}
					});
			});
},

}
app.start();
})(document,window);