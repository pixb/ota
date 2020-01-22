(function() {
    var appStore = "http://itunes.apple.com/cn/app/id458587755?mt=8";
    var playAPP = {"device": "iphone"};
    
    var checkNONSafari = function() {
        if (navigator.userAgent.indexOf("Safari") < 0 || navigator.userAgent.indexOf("Chrome") >= 0) {
            $("body").html($("<div />", {
                "class": "appStoreURL",
                html: $("<br />").add($("<a />", {
                    href: appStore,
                    text: appStore
                }))
            }));
            return true;
        }
        
        return false;
    };
    
    window.openApp = function(appURL) {
        // !!!: 暂停视频播放
        // TODO: _i_player.pause();
        
        // !!!: 定时检查
        var time = (new Date()).getTime();
        window.setTimeout(function() {
            if ((new Date()).getTime() - time < 1200 && confirm("请确认是否已安装呱呱唱聊客户端？\n已安装：iOS 系统出错导致无法打开，请重启您的系统；\n未安装：猛击“好”立即安装!")) {
                if (checkNONSafari()) {
                    return;
                }
                
                if (playAPP.device == "iphone") {
                    // itms:// or itms-apps://
                    document.location = "http://itunes.apple.com/cn/app/id458587755?mt=8";
                }
                else if (playAPP.device == "ipad") {
                    document.location = "http://itunes.apple.com/cn/app/id414430589?mt=8";
                }
            }
        }, 1000);
        
        // !!!: 尝试跳转
        window.location = appURL;
    };
    
    window.openApp2 = function(appURL) {
        // !!!: 定时检查
        var time = (new Date()).getTime();
        window.setTimeout(function() {
            if ((new Date()).getTime() - time < 1200) {
                if (checkNONSafari()) {
                    return;
                }
                
                alert("iOS 系统出错导致无法返回呱呱唱聊客户端，请重启您的系统。");
            }
        }, 1000);
        
        // !!!: 尝试跳转
        window.location = appURL;
    };
})();

