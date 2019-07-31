# Off-cloud Webserver
#### 02nd July 2019

This website is running on a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) in my garden shed, and is powered by a battery charged by two 100W solar panels on the shed roof.

The content is created in simple Markdown files which are turned into Html by a static site generator I made called [Statisk](https://github.com/fiskurgit/Statisk). New posts are written, Statisk does the conversion, then the local changes are pushed to a Git repo ([a public repo on Github](https://github.com/fiskurgit/fisk_solar_website)). The Pi Zero has a regular [Cron job](https://en.wikipedia.org/wiki/Cron) checking for any changes to download and update the site.
