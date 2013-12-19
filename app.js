var compressor = require('node-minify');

var execute = function() {

    // Using Sqwish for CSS
    new compressor.minify({
        type: 'sqwish',
        fileIn: [
            'css/tweetssentiment.css',
            'lib/bootstrap/css/bootstrap.css'
        ],
        fileOut: 'css/tweetssentiment-min.css',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('sqwish ->', 'css/tweetssentiment-min.css');
            if (err) console.log(err);
        }
    });

    // Concat util js files
    new compressor.minify({
        type: 'no-compress',
        fileIn: [
            'js/util/ajax.js',
            'js/util/bootstrap.js',
            'js/util/config.js',
            'js/util/date.js',
            'js/util/environment.js',
            'js/util/graph.js',
            'js/util/hashtag.js',
            'js/util/misc.js',
            'js/util/params.js',
            'js/util/progressbar.js',
            'js/util/score.js',
            'js/util/search.js',
            'js/util/share-link.js',
            'js/util/tweets.js',
            'lib/moment/moment.js',
            'lib/chart/Chart.js',
        ],
        fileOut: 'js/util.js',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('no-compress ->', 'js/util.js');
            if (err) {

                console.log(err);

            } else {

                // Using UglifyJS for JS
                new compressor.minify({
                    type: 'uglifyjs',
                    fileIn: 'js/util.js',
                    fileOut: 'js/util-min.js',
                    tempPath: 'tmp',
                    callback: function(err, min){
                        console.log('uglifyjs ->', 'js/util-min.js');
                        if (err) console.log(err);
                    }
                });
            }
        }
    });

    // Using UglifyJS for JS
    new compressor.minify({
        type: 'uglifyjs',
        fileIn: 'js/hashtag-list.js',
        fileOut: 'js/hashtag-list-min.js',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('uglifyjs ->', 'js/hashtag-list-min.js');
            if (err) console.log(err);
        }
    });

    // Using UglifyJS for JS
    new compressor.minify({
        type: 'uglifyjs',
        fileIn: 'js/hashtag-view.js',
        fileOut: 'js/hashtag-view-min.js',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('uglifyjs ->', 'js/hashtag-view-min.js');
            if (err) console.log(err);
        }
    });
};

execute();
