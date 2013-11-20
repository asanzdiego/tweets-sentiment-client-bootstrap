/*****************
 *               *
 *  SHARE LINKS  *
 *               *
 *****************/

// share link
$('document').ready(function(){

    var url         = 'http://tweetssentiment.com/';

    var tweetText   = 'Tweets Sentiment helps you to know if '
                    + 'the tweets feeling of a topic is positive or negative.';

    var href        = 'http://twitter.com/share?'
                    + 'text=' + encodeURIComponent(tweetText)
                    + '&via=TweetsSentiment'
                    + '&url=' + encodeURIComponent(url);


    $('#share-link-navbar').attr('href', href);
    $('#share-link-button').attr('href', href);

});

// create share link
var util_getShareLink = function(score, hashtag) {

    var url       = 'http://tweetssentiment.com/hashtag.html?'
                  + 'q='+encodeURIComponent(hashtag.hashtagText);


    var tweetText = '"'+hashtag.hashtagText+'" has a '+score.scoreText+
                    ' tweets sentiment ('+score.scoreStars+') > '+url;

    var href      = 'http://twitter.com/share?'
                  + 'text=' + encodeURIComponent(tweetText)
                  + '&via=TweetsSentiment';

    return href;
};

// put share link to element
var util_putShareLink = function(element, score, hashtag) {

    $(element).attr('href', util_getShareLink(score, hashtag));
};


