$('document').ready(function(){

    var hashtagText = util_urlParams['q'];
    var data = {};

    // get data from server
    var getDataFromServer = function(retries){

        updateProgessBar(retries);

        if ( retries%2 === 0 ) {

            setTimeout(function(){
                getDataFromServer(retries+1);
            }, util_millBetweenRequestRetries);

        } else {

            util_ajaxGet('/search/'+hashtagText, data, function(json) {

                if(!json || json.error) {

                    $('#progessbar').hide();
                    $('#internal-server-error').removeClass('hidden');
                    console.log('ERROR retrieving hashtag', json.error);

                } else {

                    var hashtag = json;
                    console.log('Hashtag retrieved');

                    if (hashtag.lastScoreTag === 'NOT_ANALYZED') {

                        console.log('Hashtag not analyzed');
                        console.log('retries =', retries);

                        if( retries < util_requestRetries ) {

                            setTimeout(function(){
                                getDataFromServer(retries+1);
                            }, util_millBetweenRequestRetries);

                        } else {

                            $('#progessbar').hide();
                            $('#internal-server-error').removeClass('hidden');
                            console.log('ERROR retrieving hashtag', 'tried '+retries+' retries');
                        }

                    } else {

                        var score = util_scoreImageAndColor(hashtag.lastScore, hashtag.lastScoreTag);

                        shareLink(score, hashtag);
                        drawHashtag(score, hashtag);
                        drawHashtagHistory(hashtag);
                        drawTweets(score, hashtag.lastTweetsAnalyzed);
                    }
                }
            });
        }
    };

    var updateProgessBar = function(retries) {

        var percentage = Math.floor((retries-1)*100/util_requestRetries);
        //console.log('percentage =', percentage);

        if ( percentage > 5 ) {

          $('#progessbar').html(
            '<div class="progress progress-bar-primary">'+
              '<div id="progessbar-percentage"'+
                'class="progress-bar progress-bar-primary" role="progressbar"'+
                'aria-valuenow="'+percentage+'" style="width: '+percentage+'%"'+
                'aria-valuemin="0" aria-valuemax="100">'+
                '<span id="progessbar-text">'+percentage+'% Complete</span>'+
              '</div>'+
            '</div>');
        }
    }

    var shareLink = function(score, hashtag) {

        $('#share-link').attr('href', util_getShareLink(score, hashtag));
    };

    var drawHashtag = function(score, hashtag) {

        $('#progessbar').hide();
        $('#hashtag').removeClass('hidden');

        $('#hashtag').append(
            '<div class="panel panel-'+score.scoreClass+'">'+
              '<div class="panel-heading">'+
                '<h3 class="panel-title bolded">'
                  +hashtag.hashtagText+'</h3>'+
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
                '<p>'+
                  '<a href="'+util_getShareLink(score, hashtag)+
                    '" target="_blank" '+
                    'class="btn btn-sm btn-'+score.scoreClass+'">'+
                    '<span class="icon share"></span> Share</a> '+
                '</p>'+
              '</div>'+
            '</div>');
    };

    var drawHashtagHistory = function(hashtag) {

        // get data from server
        util_ajaxGet('/histories/'+hashtag._id, data, function(json) {

            if(!json || json.error) {

                console.log('ERROR retrieving hashtagHistories', json.error);

            } else {

                var hashtagHistories = json;

                console.log(hashtagHistories.length+' hashtagHistories retrieved');
                drawGraphic(hashtagHistories);
            }
        });
    };

    var drawGraphic = function(hashtagHistories) {

        $('#graphic').removeClass('hidden');

        var labels = [];
        var data   = [];

        var filter = Math.floor(hashtagHistories.length/util_maxGraphData)+1;

        if ( hashtagHistories.length === 1 ) {
            labels.push(util_dateToStringMini(hashtagHistories[0].date));
            data.push(hashtagHistories[0].score * 100);
        }

        hashtagHistories = hashtagHistories.reverse();

        for (var i = 0; i < hashtagHistories.length; i++) {

            if (   i === 0
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

        util_drawGraphic("hasgtagHistory-sm", labels, data);
        util_drawGraphic("hasgtagHistory-md", labels, data);
        util_drawGraphic("hasgtagHistory-lg", labels, data);
    };

    var drawTweets = function(score, tweets) {

        var tweetsShowed = 1;
        var deviceSize = util_getBootstrapEnvironment();
        console.log('deviceSize =',deviceSize);

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

                var hrefViewTweet = 'http://twitter.com/'+tweet.nick+
                    '/status/'+tweet.id;

                $('#tweets').append(
                  '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">'+
                    '<div class="panel panel-'+score.scoreClass+'">'+
                      '<div class="panel-body tweet-'+score.scoreClass+'"">'+
                        '<a href="http://twitter.com/'+tweet.nick+'" target="_blank">'+
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
                        '<p class="pull-right tweet-'+score.scoreClass+'">'+
                          '<span class="icon share"> </span>'+
                          '<a href="'+hrefShareTweet+'" target="_blank">'+
                            'share</a>&nbsp'+
                          '<span class="icon eye-open"> </span>'+
                          '<a href="'+hrefViewTweet+'" target="_blank">'+
                            'view</a>'+
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

    getDataFromServer(1);
});
