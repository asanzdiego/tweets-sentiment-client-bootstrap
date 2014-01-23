#! /bin/bash

function writeEnvironment() {
cat << ENVIRONMENT

/****************************
 * ENVIRONMENT = PRODUCTION *
 ****************************/

// version
var util_version = "`date`"

// Server URL
var util_server_url = "http://tweetssentiment.herokuapp.com";

ENVIRONMENT
}

echo "****************************************************"
echo "* PUSH CHANGES TO GIT PAGES POINTING TO PRODUCTION *"
echo "****************************************************"

FROM=`pwd`
echo "FROM=$FROM"

FOLDERTO=$GIT_PAGES_FOLDER
#echo "FOLDERTO=$FOLDERTO"

TO="$GIT_PAGES_FOLDER/markdownslides"
echo "TO=$TO"

DATE=`date +"%Y.%m.%d-%H:%M"`
TO_OLD=$TO'-OLD-'$DATE
#echo "TO_OLD=$TO_OLD"

mv $TO $TO_OLD && \
cp -r $FROM $FOLDERTO && \
rm -rf $TO'/.git' && \
cp -r $TO_OLD'/.git' $TO && \
cd $TO && \
writeEnvironment > js/util/environment.js && \
more js/util/environment.js && \
node app.js && \
git diff | grep +++

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    read -p "Write the commit message: " MESSAGE

    git add . && \
    git commit -m "$MESSAGE" && \
    git push origin gh-pages && \
    rm -rf $TO_OLD

else

  rm -rf $TO && \
  mv $TO_OLD $TO

fi

cd -
