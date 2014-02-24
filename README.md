![](https://raw.github.com/tybenz/spamthe.net/gh-pages/img/logo-small.png)

This is a link spammer/aggregator. What does that mean? It means I spend a good
chunk of my day reading articles and I want to share them with people.

So you can follow [@spamthenet](http://twitter.com/spamthenet) on Twitter,
visit http://spamthe.net, join the IRC channel #spamthenet on
[freenode](http://webcaht.freenode.net), or sign up for the newsletter (on the
site).

There is a node.js app that listens for a request that specifies a title and a
URL. The node app creates a tweet on behalf of the @spamthenet account, and
creates a file in the gh-pages branch of this repo and pushes to github,
resulting in a new entry on the website (and the newsletter). There is also a
chat bot idling in the IRC channel who listens to tweets from @spamthenet and
notifies all users in the channel.

# Contributing

If you want to help me collect links (check out the site to get an idea for
what I'm going for), then ping me on IRC (tybenz) or on twitter
([@tybenz](http://twitter.com/tybenz)). I'll hook you up with the Twitter API
keys. From there you need to get the node app running, create the bookmarklet,
and a special directory for the gh-pages branch.

### Node app:

I use `nohup` to run the grunt-express server in the background independent
from any terminal. You can kill the server with `killall grunt`.

### Bookmarket:

Run `grunt bookmarklet`. Copy+paste that into a shortcut in your browser.

### gh-pages:

Clone this repo, cd into it, checkout gh-pages, and leave it that way. Make
sure app.js has the right relative path to said directory.
