/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */
var express = require( 'express' ),
    handlebars = require( 'handlebars' ),
    path = require( 'path' ),
    fs = require( 'fs' ),
    sys = require( 'sys' ),
    moment = require( 'moment' ),
    OAuth = require( 'oauth' ).OAuth,
    app = express(),
    oauth = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      process.env.SPAM_SERVER_CONSUMER_KEY,
      process.env.SPAM_SERVER_CONSUMER_SECRET,
      "1.0A",
      process.env.SPAM_SERVER_CALLBACK_URL,
      "HMAC-SHA1"
    );
console.log(process.env.SPAM_SERVER_CONSUMER_KEY);

app.use(allowCrossDomain);
app.use(express.bodyParser());

function allowCrossDomain( req, res, next ) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

function rawurlencode (str) {
  str = (str + '').toString();

  return str.replace(/'/g, "’");
}

app.post( '/tweet_link', function ( req, res, next ) {
    if ( !req.body.url ) {
        res.status(500);
        res.send( 'Must provide a link' );
        return;
    }

    if ( !req.body.title ) {
        res.status(500);
        res.send( 'Must provide a title' );
        return;
    }

    var title = req.body.title.replace( /"/g, '' ),
        url = req.body.url,
        fileTitle = title.replace( /\s/g, '-' ).replace( /,|\:/g, '' ).replace(/'|’/g, '').toLowerCase();

    oauth.post(
        "https://api.twitter.com/1.1/statuses/update.json",
        process.env.SPAM_SERVER_ACCESS_TOKEN, process.env.SPAM_SERVER_ACCESS_TOKEN_SECRET,
        { "status": rawurlencode(title) + ' ' + url },
        function( error, data ) {
            if ( error ) {
                console.log( require( 'sys' ).inspect( error ) );
                res.status(500);
                res.send( 'Twitter: ' + error + "\n" + JSON.stringify( data, undefined, 4 ) );
            } else {
                console.log( data );

                // create new post file
                var spamWeb = path.join( __dirname, '..', 'spam-web' );
                var postsDir = path.join( __dirname, '..', 'spam-web', '_posts' );
                var datetime = moment().format('YYYY-MM-DD hh:mm:ssa');
                if ( fs.existsSync( postsDir ) ) {
                    var postFile = path.join( __dirname, '..', 'spam-web', '_posts', moment().format( 'YYYY-MM-DD-' ) + fileTitle + '.md' );
                    var templateText = fs.readFileSync( path.join( __dirname, 'post.md.hbs' ), { encoding: 'utf-8' } );
                    var postTemplate = handlebars.compile( templateText );
                    var post = postTemplate( { title: title, url: url, datetime: datetime } );
                    var written = fs.writeFileSync( postFile, post );
                    sys.exec( "cd " + spamWeb + " && git add " + postFile + " && git commit -m 'Added " + title + "' && git push origin gh-pages" );

                    res.send( { data: data } );
                } else {
                    res.status(500);
                    res.send( { data: data } );
                }
            }
        }
    );
});

module.exports = app;
