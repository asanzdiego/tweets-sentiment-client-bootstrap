#! /bin/bash

function writeEnvironment() {
cat << ENVIRONMENT

/*****************************
 * ENVIRONMENT = DEVELOPMENT *
 *****************************/

// version
var util_version = "`date`"

// Server URL
var util_server_url = "http://localhost:5000";

ENVIRONMENT
}

echo "**************************************************"
echo "* PUSH CHANGES TO GITHUB POINTING TO DEVELOPMENT *"
echo "**************************************************"

writeEnvironment > js/util/environment.js && \
more js/util/environment.js && \
node app.js && \
git add . && \
git diff | grep +++

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    read -p "Write the commit message: " MESSAGE

    git commit -m "$MESSAGE" && \
    git push
fi
