var util_hashtagTitle = function(hashtag) {

    if (hashtag.lastTitle) {
        return hashtag.lastTitle;
    } else {
        return hashtag.hashtagText
    };
};
