(function($) {
    
    var OTA = window.OTA = window.OTA || {};
    OTA.URL = location.href;
    
    var $VERSION = $("<section class='version'><h4 class='title'></h4><ul class='content'></ul></section>");
    var $BUILD = $("<li class='build'><a class='link'></a><span>[ <a class='apk'>APK</a> ]</span><span class='desc'></span></li>");
    
    OTA.$build = function(title, name, description) {
        if (!name) {
            return null;
        }
        
        var $build = $BUILD.clone(true);
        
        var url = OTA.URL;
        if (url.charAt(url.length - 1) !== "/") {
            url += "/";
        }
        url += name;
        
        $(".name", $build).text(name);
        
       // $(".link", $build).text(name).attr("href", url + ".apk");
       $(".link", $build).text(title);
       $(".link", $build).attr("href", url + ".apk");
        $(".apk", $build).attr("href", url + ".apk");
        
        $(".desc", $build).html(description || "");
        
        return $build;
    }
    
    OTA.$version = function(title) {
        var $version = $VERSION.clone(true);
        $(".title", $version).text(title || "");
        $version.addClass("collapse");
        return $version;
    };
    
    jQuery(function($) {
        var versionOfTitle = function(title) {
            title = (title || "") + "";
            var _ = "-", index = title.indexOf(_);
            return index >= 0 ? title.substring(index + _.length) : title;
        };
        
        var compareBuildInfo = function(buildInfoLeft, buildInfoRight) {
            buildInfoLeft = buildInfoLeft || {};
            buildInfoRight = buildInfoRight || {};
            
            // appVersion
            var result = buildInfoLeft.appVersion && buildInfoRight.appVersion && buildInfoLeft.appVersion.localeCompare(buildInfoRight.appVersion);
            
            // buildVersion
            if (!result) {
                result = buildInfoLeft.buildVersion && buildInfoRight.buildVersion && buildInfoLeft.buildVersion.localeCompare(buildInfoRight.buildVersion);
                
                // title substring
                if (!result) {
                    var titleSubstringLeft = versionOfTitle(buildInfoLeft.appTitle);
                    var titleSubstringRight = versionOfTitle(buildInfoRight.appTitle);
                    result = titleSubstringLeft && titleSubstringRight && titleSubstringLeft.localeCompare(titleSubstringRight);
                    
                    // title
                    if (!result) {
                        result = (buildInfoLeft.appTitle || "").localeCompare(buildInfoRight.appTitle || "");
                    }
                }
            }
            
            return result;
        };
        
        
        var buildInfoList = OTA.buildInfoList = OTA.buildInfoList || [];
        if (!buildInfoList.length) {
            return;
        }
        
        buildInfoList.sort(compareBuildInfo);
        
        var $app = $(".app");
        
        var lastVersion = null, $lastVersion = null;
        for (var index in buildInfoList) {
            var buildInfo = buildInfoList[index];
            if (!buildInfo) {
                continue;
            }
            
            if (!$lastVersion || lastVersion !== buildInfo.appVersion) {
                $lastVersion = OTA.$version(buildInfo.appVersion);
                $app.prepend($lastVersion);
                lastVersion = buildInfo.appVersion;
            }
            
            $(".content", $lastVersion).prepend(OTA.$build(buildInfo.appTitle, buildInfo.appFileName, buildInfo.appDescription));
        }
        $lastVersion.removeClass("collapse");
        
        $(".version .title").click(function(event) {
            var $this = $(this);
            var $version = $this.closest(".version");
            $version.toggleClass("collapse");
        });
    });
    
})(jQuery);

