# Solar Website Mk4

After a brief attempt at converting my Statisk static website generator from Kotlin to Python so it would easily run on this RaspberryPi Zero, I've decided I hate Python with a passion. This site is now served using [node.js](https://nodejs.org/) and [Express](https://expressjs.com/), Markdown files are converted dynamically to html using [Showdown](https://github.com/showdownjs/showdown). 

This is the entire server:

```javascript
const express = require('express')
const fs = require('fs')
const showdown = require('showdown')
const app = express()
const converter = new showdown.Converter()

const head = '<html lang="en"><head><title></title><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body><main>';
		const footer = '</main></body></html>'

app.get('*', function (req, res) {
    let filePath = req.originalUrl.substr(1);
    if(filePath.endsWith('.md')){
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            res.send(head + converter.makeHtml(data) + footer);
        })
    }else{
        res.sendFile("./" + filePath, { root: __dirname });
    }
})

app.listen(80)
```

Keeping the node/express process running is done using [pm2](https://pm2.keymetrics.io/), the process is called `server`, so after any edits as restart is required: `pm2 restart server`.
  
Exposing my local RaspberryPi Zero to the internet from 4GEE's double-natted cellular broadband is still done with a reverse ssh tunnel to a [FastHosts VPS](https://www.fasthosts.co.uk/virtual-private-servers) with a cron job periodically checking things are still running:

```ssh -f -N -R 80:192.168.86.28:80 root@77.68.25.88 -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=10```