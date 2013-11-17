var util_parseTweetToHtml = function(tweet) {

    tweet = tweet || {};

    if ( tweet.textHtml ) {

        return tweet.textHtml;

    } else {

        return util_parseTweetTextToHtml(tweet.text);
    }
}

var util_parseTweetTextToHtml = function(tweetText) {

    tweetText = tweetText || '';

    // replace urls
    tweetText = tweetText.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
  	  	return url.link(url);
	  });

    // replace usernames
    tweetText = tweetText.replace(/[@]+[A-Za-z0-9-_]+/g, function(username) {
		    return username.link("http://twitter.com/"+username.replace("@",""));
	  });

    // replace hashtags
    tweetText = tweetText.replace(/[#]+[A-Za-z0-9-_]+/g, function(tag) {
    		return tag.link("http://search.twitter.com/search?q="+tag.replace("#",""));
		});

    return tweetText;
};
