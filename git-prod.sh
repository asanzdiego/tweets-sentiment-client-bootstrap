#! /bin/bash

function writeEnvironment() {
cat << ENVIRONMENT
/*****************
 *               *
 *  ENVIRONMENT  *
 *               *
 *****************/

// Server URL
//var util_server_url = "http://localhost:5000";
var util_server_url = "http://tweetssentiment.herokuapp.com";
ENVIRONMENT
}

function execute() {

    read -p "You want to continue? [y|n]: " OPTION

    if [ "$OPTION" == "y" ]; then

        writeEnvironment > js/util/environment.js
        more js/util/environment.js
        node app.js
        git add
        git commit -m "$@"
        git push origin gh-pages
    fi
}

if [ $# -le 0 ]; then
  echo "Write the commit message as parameter"
else
  execute $@
fi
