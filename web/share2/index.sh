#! /bin/bash

INDEX_HOME=`dirname $BASH_SOURCE`


#PListInfo="buildInfo-plist.js"
OTAInfo="buildInfo-ota.js"

#echo "module.exports = {" > $PListInfo

echo "var OTA = this.OTA = this.OTA || {};" > $OTAInfo
# echo "" >> $OTAInfo
echo "OTA.buildInfoList = [" >> $OTAInfo

for cfg in `ls | grep .cfg$`; do
    
    unset DEPLOY_APK_URL
    unset APP_IDENTIFIER
    unset APP_VERSION
    unset DESCRIPTION
    unset ARCHIVE_NAME
    unset BUILD_VERSION
    unset ARCHIVE_DISPLAY_NAME
    
    . "$PWD/$cfg"
    
    #echo "    \"$ARCHIVE_NAME\": {" >> $PListInfo
    #echo "        \"appTitle\": \"$ARCHIVE_NAME\"," >> $PListInfo
    #echo "        \"appDescription\": \"$DESCRIPTION\"," >> $PListInfo
    #echo "        \"appVersion\": \"$APP_VERSION\"," >> $PListInfo
    #echo "        \"appIdentifier\": \"$APP_IDENTIFIER\"," >> $PListInfo
    #echo "        \"buildVersion\": \"$BUILD_VERSION\"," >> $PListInfo
    #echo "        \"buildIPA\": \"$DEPLOY_APK_URL\"" >> $PListInfo
    #echo "    }," >> $PListInfo
    
    echo "    {" >> $OTAInfo

    APP_TITLE=$ARCHIVE_NAME
    if [[ -n $ARCHIVE_DISPLAY_NAME ]]; then
        APP_TITLE=$ARCHIVE_DISPLAY_NAME
    fi
    echo "        \"appTitle\": \"$APP_TITLE\"," >> $OTAInfo
    echo "        \"appFileName\": \"$ARCHIVE_NAME\"," >> $OTAInfo
    echo "        \"appDescription\": \"$DESCRIPTION\"," >> $OTAInfo
    echo "        \"appVersion\": \"$APP_VERSION\"," >> $OTAInfo
    echo "        \"appIdentifier\": \"$APP_IDENTIFIER\"," >> $OTAInfo
    echo "        \"buildVersion\": \"$BUILD_VERSION\"," >> $OTAInfo
    echo "        \"buildAPK\": \"$DEPLOY_APK_URL\"" >> $OTAInfo
    echo "    }," >> $OTAInfo
done

#echo "    \"\": null" >> $PListInfo
#echo "};" >> $PListInfo

echo "    null" >> $OTAInfo
echo "];" >> $OTAInfo

echo
#echo "plist info:"
#cat $PListInfo

echo
echo "ota info:"
cat $OTAInfo

