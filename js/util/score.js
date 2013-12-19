/***********
 *         *
 *  SCORE  *
 *         *
 ***********/

// score image and color
var util_scoreImageAndColor  = function(score, scoreTag) {

    var scoreIcon     = 'warning.png';
    var scoreColor    = '999999';
    var scoreText     = 'not analyzed';
    var scoreStars    = '- - - - -';
    var scoreClass    = 'default';

    switch (scoreTag) {
        case 'P+':
            scoreIcon     = 'very-positive.png';
            scoreColor    = '468847';
            scoreText     = 'very positive';
            scoreStars    = '★★★★★';
            scoreClass    = 'success';
            break;
        case 'P':
            scoreIcon     = 'positive.png';
            scoreColor    = '8fc38f';
            scoreText     = 'positive';
            scoreStars    = '★★★★☆';
            scoreClass    = 'primary';
            break;
        case 'NEU':
            scoreIcon     = 'neutral.png';
            scoreColor    = 'c09853';
            scoreText     = 'neutral';
            scoreStars    = '★★★☆☆';
            scoreClass    = 'warning';
            break;
        case 'N':
            scoreIcon     = 'negative.png';
            scoreColor    = 'dc9492';
            scoreText     = 'negative';
            scoreStars    = '★★☆☆☆';
            scoreClass    = 'info';
            break;
        case 'N+':
            scoreIcon     = 'very-negative.png';
            scoreColor    = 'b94a48';
            scoreText     = 'very negative';
            scoreStars    = '★☆☆☆☆';
            scoreClass    = 'danger';
            break;
        case 'NO_SENTIMENT':
            scoreText     = 'without sentiment';
            break;
    }

    var score = {
        scoreTag      : scoreTag,
        scoreIcon     : scoreIcon,
        scoreColor    : scoreColor,
        scoreText     : scoreText,
        scoreStars    : scoreStars,
        scoreClass    : scoreClass
    };

    //console.log('score =',score);

    return score;
};
