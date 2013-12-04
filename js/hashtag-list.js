$('document').ready(function(){

    var data = {};

    // get data from server
    util_ajaxGet('/hashtags', data, function(json) {

        if(!json || json.error) {

            $('#internal-server-error').removeClass('hidden');
            console.log('ERROR retrieving hashtags', json.error);

        } else {

            var hashtags = json;

            console.log(hashtags.length+' hashtags retrieved');
            drawHashtags(hashtags);
        }
    });

    // draw data
    var drawHashtags = function(hashtags) {

        var tweetsShowed = 1;
        var deviceSize = util_getBootstrapEnvironment();
        console.log('deviceSize =',deviceSize);

        for (var i = 0; i < hashtags.length; i++) {

            var hashtag = hashtags[i];

            var score = util_scoreImageAndColor(hashtag.lastScore, hashtag.lastScoreTag);

            var statsUrl = 'hashtag.html?q='+encodeURIComponent(util_hashtagTitle(hashtag));

            var buttons = ''+
              '<p>'+
                '<a href="'+util_getShareLink(score, hashtag)+'" '+
                  'target="_blank" '+
                  'class="btn btn-sm btn-'+score.scoreClass+'">'+
                  '<span class="icon share"></span> Share</a> '+
                '<a href="'+statsUrl+'" '+
                  'class="btn btn-sm btn-'+score.scoreClass+'">'+
                  '<span class="icon bar-chart"></span> Stats</a>'+
                  //'<span class="icon eye-open"></span> View</a>'+
                  //'<span class="icon refresh"></span> Reload</a>'+
              '</p>';

            if (     hashtag.lastScoreTag === 'NOT_ANALYZED'
                  || hashtag.lastScoreTag === 'NO_SENTIMENT' ) {

              buttons = ''+
              '<p>'+
                '<a href="'+statsUrl+'" '+
                  'class="btn btn-sm btn-'+score.scoreClass+'">'+
                  //'<span class="icon bar-chart"></span> Stats</a>'+
                  '<span class="icon eye-open"></span> View</a>'+
                  //'<span class="icon refresh"></span> Reload</a>'+
              '</p>';
            }

            var html = ''+
              '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" '+
                'data-action="search">'+
                '<div class="panel panel-'+score.scoreClass+' centered">'+
                  '<div class="panel-heading">'+
                    '<h3 class="panel-title bolded">'
                      +util_hashtagTitle(hashtag)+'</h3>'+
                  '</div>'+
                  '<div class="panel-body">'+
                    '<p style="color:#'+score.scoreColor+'">'+
                      score.scoreText+
                      '&nbsp;<span class="'+score.scoreIcon+'"></span>'+
                    '</p>'+
                    '<p style="color:#'+score.scoreColor+'">&nbsp;'+
                      score.scoreStars+'&nbsp;</p>'+
                    buttons+
                  '</div>'+
                '</div>'+
              '</div>';

            tweetsShowed++;

            if(    (deviceSize === 'sm' && (tweetsShowed+2)%2 === 0)
                || (deviceSize === 'md' && (tweetsShowed+1)%3 === 0)
                || (deviceSize === 'lg' && (tweetsShowed+2)%4 === 0) ) {

                //console.log('tweetsShowed =', tweetsShowed);
                $('#tweets').append('</div><div class="row">');
            }

            $('#hashtags').append(html);
        }
    };

    $('#search-hashtag').click(function() {

        var hashtagToSearch = $('input[type=search]').val();

        console.log('hashtagToSearch =', hashtagToSearch);

        if (hashtagToSearch.length < 3 || hashtagToSearch.length > 60) {

            $('#search-hastag-error').removeClass('hidden');

        } else {

            window.location.replace('hashtag.html?q='+encodeURIComponent(hashtagToSearch));
        }
    });

    $('#search-hashtag-close').click(function() {

        $('#search-hastag-error').addClass('hidden');
    });
});
