$('document').ready(function(){

    var hashtagText = util_urlParams['q'];
    console.log('hashtagText =', hashtagText);

    var data = {};

    var getDataFromServerRecursive = function(retries){

        console.log('retries =', retries);

        if ( retries === 1 || retries%util_eachGetRequestRetrie === 0 ) {

            getDataFromServer(retries);

        } else {

            util_updateProgessBar('#progessbar', retries, util_numberRequestRetries);
            setTimeout(function(){
                getDataFromServerRecursive(retries+1);
            }, util_millBetweenRequestRetries);
        }
    };

    var getDataFromServer = function(retries){

        util_ajaxGet('/search/'+encodeURIComponent(hashtagText), data, function(json) {

            if(!json || json.error) {

                $('#progessbar').hide();
                $('#internal-server-error').removeClass('hidden');
                console.log('ERROR retrieving hashtag', json.error);

            } else {

                var hashtag = json;
                console.log('Hashtag retrieved');

                var score = util_scoreImageAndColor(hashtag.lastScore, hashtag.lastScoreTag);

                if (hashtag.lastScoreTag === 'NOT_ANALYZED') {

                    processHashtagNotAnalyzed(retries, score, hashtag);

                } else {

                    processHashtag(score, hashtag);
                }
            }
        });
    };

    var processHashtagNotAnalyzed = function(retries, score, hashtag) {

        console.log('Hashtag not analyzed');

        if( retries < util_numberRequestRetries ) {

            util_updateProgessBar('#progessbar', retries, util_numberRequestRetries);
            setTimeout(function(){
                getDataFromServerRecursive(retries+1);
            }, util_millBetweenRequestRetries);

        } else {

            $('#progessbar').hide();
            $('#not-analized').removeClass('hidden');
            console.log('ERROR retrieving hashtag', 'tried '+retries+' retries');

            drawHashtag(score, hashtag);
        }
    }


    var processHashtag = function(score, hashtag) {

        drawHashtag(score, hashtag);

        if ( hashtag.lastScoreTag === 'NO_SENTIMENT' ) {

            console.log('Hashtag without sentiment');
            $('#no-sentiment').removeClass('hidden');

        } else {

            util_putShareLink('#share-link', score, hashtag);
            drawHashtagHistory(hashtag);
        }

        drawTweets(score, hashtag.lastTweetsAnalyzed);


    }

    var drawHashtag = function(score, hashtag) {

        $('#progessbar').hide();
        $('#hashtag').removeClass('hidden');

        var button = ''+
          '<p>'+
            '<a href="'+util_getShareLink(score, hashtag)+'" '+
              'target="_blank" '+
              'class="btn btn-sm btn-'+score.scoreClass+'">'+
              '<img src="./img/share-white.png" alt="Share"/> Share</a> '+
          '</p>';

        if (     hashtag.lastScoreTag === 'NOT_ANALYZED'
              || hashtag.lastScoreTag === 'NO_SENTIMENT' ) {

          button = ''+
            '<p>'+
              '<a href="hashtag.html?q='+encodeURIComponent(util_hashtagTitle(hashtag))+'" '+
                'class="btn btn-sm btn-'+score.scoreClass+'">'+
                '<img src="./img/reload.png" alt="Reload"/> Reload</a>'+
            '</p>';
        }

        $('#hashtag').append(
            '<div class="panel panel-'+score.scoreClass+'">'+
              '<div class="panel-heading">'+
                '<h3 class="panel-title bolded">'
                  +util_hashtagTitle(hashtag)+'</h3>'+
              '</div>'+
              '<div class="panel-body">'+
                '<p style="color:#'+score.scoreColor+'">'+
                  '<span class="'+score.scoreIcon+'"></span>'+
                '</p>'+
                '<p style="color:#'+score.scoreColor+'">'+
                  score.scoreText+'</span>'+
                '</p>'+
                '<p style="color:#'+score.scoreColor+'">&nbsp;'+
                  score.scoreStars+'&nbsp;</p>'+
                button+
              '</div>'+
            '</div>');
    };

    var drawHashtagHistory = function(hashtag) {

        // get data from server
        util_ajaxGet('/histories/'+encodeURIComponent(hashtag._id), data, function(json) {

            if(!json || json.error) {

                $('#not-history').removeClass('hidden');
                console.log('ERROR retrieving hashtagHistories', json.error);

            } else {

                var hashtagHistories = json;

                console.log(hashtagHistories.length+' hashtagHistories retrieved');
                drawGraphic(hashtagHistories);
            }
        });
    };

    var drawGraphic = function(hashtagHistories) {

        var labels = [];
        var data   = [];

        var filter = Math.floor(hashtagHistories.length/util_maxGraphData)+1;

        hashtagHistories = hashtagHistories.reverse();

        for (var i = 0; i < hashtagHistories.length; i++) {

            if (     hashtag.lastScoreTag !== 'NOT_ANALYZED'
                  && hashtag.lastScoreTag !== 'NO_SENTIMENT' ) {

                if (     i === 0
                      || i === (hashtagHistories.length-1)
                      || 0 === (i%filter) ) {

                    var date = util_dateToStringMini(hashtagHistories[i].date);
                    labels.push(' '+date+' ');
                    //console.log(date);

                    var score = hashtagHistories[i].score * 100;
                    data.push(score);
                    //console.log(score);
                }
            }
        }

        if ( labels.length === 1 ) {

            labels.push(labels[0]);
            data.push(data[0]);
        }

        $('#graphic').removeClass('hidden');

        util_drawGraphic("hasgtagHistory-sm", labels, data);
        util_drawGraphic("hasgtagHistory-md", labels, data);
        util_drawGraphic("hasgtagHistory-lg", labels, data);
    };

    var drawTweets = function(score, tweets) {

        var tweetsShowed = 1;
        var deviceSize = util_getBootstrapEnvironment();
        //console.log('deviceSize =',deviceSize);

        for (var i = 0; i < tweets.length; i++) {

            var tweet = tweets[i];

            if (     !tweet.text.startsWith('RT')
                  && !(tweet.text.indexOf(',@') != -1 ) ) {

                tweetsShowed++;

                if(    (deviceSize === 'sm' && (tweetsShowed+2)%2 === 0)
                    || (deviceSize === 'md' && (tweetsShowed+1)%3 === 0)
                    || (deviceSize === 'lg' && (tweetsShowed+2)%4 === 0) ) {

                    //console.log('tweetsShowed =', tweetsShowed);
                    $('#tweets').append('</div><div class="row">');
                }

                var hrefShareTweet = 'http://twitter.com/share?'+
                    'text=' + encodeURIComponent('RT @'+tweet.nick+': '+tweet.text);

                var hrefViewTweet = 'http://twitter.com/'+encodeURIComponent(tweet.nick)+
                    '/status/'+encodeURIComponent(tweet.id);

                $('#tweets').append(
                  '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">'+
                    '<div class="panel panel-'+score.scoreClass+'">'+
                      '<div class="panel-body tweet-'+score.scoreClass+'"">'+
                        '<a href="http://twitter.com/'+encodeURIComponent(tweet.nick)+'" target="_blank">'+
                          '<img src="'+tweet.avatar+'" '+
                            'class="pull-left img-thumbnail"" '+
                            'style="border: 1px solid #'+score.scoreColor+'; '+
                              'margin-right: 1em"'+
                            'alt="@'+tweet.nick+' avatar"/>'+
                          '<h3 class="text-'+score.scoreClass+' panel-title bolded">'+
                              tweet.username+
                              ' <small class="text-'+score.scoreClass+'">@'+
                                tweet.nick+'</small>'+
                          '</h3>'+
                        '</a>'+
                        '<p class="text-'+score.scoreClass+'">'+
                          util_parseTweetToHtml(tweet)+
                        '</p>'+
                        '<p class="pull-right">'+
                          '<a href="'+hrefShareTweet+'" target="_blank">'+
                            '<img src="./img/share-blue.png" alt="Share"'+
                            'class="marged-right"/>share</a>&nbsp'+
                          '<a href="'+hrefViewTweet+'" target="_blank">'+
                            '<img src="./img/eye-blue.png" alt="Share"'+
                            'class="marged-right"/>view</a>'+
                        '</p>'+
                      '</div>'+
                    '</div>'+
                  '</div>');
            }
        }

        if ( tweetsShowed > 1) {
          $('#search-tweets').removeClass('hidden');
        }
    };

    getDataFromServerRecursive(1);

});
