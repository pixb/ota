#!/bin/bash
CFG_NAME=$1
VERSION=`echo $CFG_NAME | awk -F_ '{print $2}'`

if [ -e "$CFG_NAME.cfg" ] 
then
	echo "$CFG_NAME file exist,delete ..."
	rm -f $CFG_NAME.cfg
fi
echo "-------------------Output cfg File---------------------"
echo "#!/bin/bash" >> $CFG_NAME.cfg
echo "" >> $CFG_NAME.cfg
echo DEPLOY_IPA_URL=\"\" >> $CFG_NAME.cfg
echo APP_IDENTIFIER=\"\" >> $CFG_NAME.cfg
echo APP_VERSION=\"1.8.0\" >> $CFG_NAME.cfg
echo DESCRIPTION=\"Release\" >> $CFG_NAME.cfg
echo ARCHIVE_NAME=\"$CFG_NAME\" >> $CFG_NAME.cfg
echo ARCHIVE_DISPLAY_NAME=\"$CFG_NAME\" >> $CFG_NAME.cfg
echo BUILD_VERSION=\"$VERSION\" >> $CFG_NAME.cfg
echo EXTRA_PLIST_URL=\"\" >> $CFG_NAME.cfg
echo "------------------Write config file completed!---------"
sh index.sh
