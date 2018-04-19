//客户端检测
var client=function(){
	//呈现引擎
	var engine={
		ie:0,
		gecko:0,
		webkit:0,
		khtml:0,
		opera:0,

		//完整的版本号
		ver:null
	};
	//浏览器
	var browser={
		//主要浏览器
		ie:0,
		firfox:0,
		safari:0,
		konq:0,
		opera:0,
		chrome:0,

		//具体的版本号
		ver:null
	};

	//平台、设备和操作系统
	var system={
		win:false,
		mac:false,
		xl1:false,

		//移动设备
		iphone:false,
		ipod:false,
		ipad:false,
		ios:false,
		android:false,
		nokiaN:false,
		winMobile:false,

		//游戏系统
		wii:false,
		ps:false
	};

	//检测呈现引擎和浏览器
	var ua=navigator.userAgent;
	if(window.opera){
		engine.ver=browser.ver=window.opera.version();
		engine.opera=browser.opera=parseFloat(engine.ver);
	}else if(/AppleWebKit\/(\S+)/.test(ua)){
		engine.ver=RegExp["$1"];
		engine.webkit=parseFloat(engine.ver);

		//确定是Chrome还是Safari
		if(/Chrome\/(\S+)/.test(ua)){
			browser.ver=RegExp["$1"];
			browser.chrome=parseFloat(browser.ver);
		}else if(/Version\/(\S+)/.test(ua)){
			browser.ver=RegExp["$1"];
			browser.safari=parseFloat(browser.ver);
		}else{
			//近似地确定版本号
			var safariVerion=1;
			if(engine.webkit<100){
				safariVerion=1;
			}else if(engine.webkit < 312){
				safariVerion=1.2;
			}else if(engine.webkit < 412){
				safariVerion=1.3;
			}else{
				safariVerion=2;
			}

			browser.safari=browser.ver=safariVerion;
		}
	}else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
			engine.ver=browser.ver=RegExp["$1"];
			engine.khtml=browser.konq=parseFloat(engine.ver);
	}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
		engine.ver=RegExp["$1"];
		engine.gecko=parseFloat(engine.ver);

		//确定是不是Firefox
		if(/Firfox\/(\S+)/.test(ua)){
			browser.ver=RegExp["$1"];
			browser.firfox=parseFloat(browser.ver);
		}
	}else if(/MSIE([^;]+)/.test(ua)){
		engine.ver=browser.ver=RegExp["$1"];
		engine.ie=browser.ie=parseFloat(engine.ver);
	}

	//检测浏览器
	browser.ie=engine.ie;
	browser.opera=engine.opera;

	//检测平台
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.xll = (p.indexOf("Xll")) == 1 || (p.indexOf("Linux") == 0);

	//检测 Windows 操作系统
    if( system.win){
        if( /Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if(RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0" :
                        system.win = "2000";
                        break;
                    case "5.1" :
                        system.win = "XP";
                        break;
                    case "6.0" :
                        system.win = "Vista";
                        break;
                    default : 
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x"){
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }

    //移动设备
    system.iphone = ua.indexOf("iphone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
    system.winMobile = (system.win == "CE");
    system.macMobile = (system.iphone || system.ipod);

    //游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    //再次检测呈现引擎、平台和设备

    return {
        engine : engine,
        browser : browser,
        system : system
    };
}();

console.log(client.engine);
console.log(client.browser);
console.log(client.system);