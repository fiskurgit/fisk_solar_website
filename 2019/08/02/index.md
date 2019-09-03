<!--- -bg #e9f1e8 -->
# Off-cloud Webserver Part 1
#### 02nd August 2019

**This website is running on a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) in my garden shed, and is powered by a battery charged by two 100W solar panels on the shed roof.**

The content is created in simple [Markdown](https://en.wikipedia.org/wiki/Markdown) files which are turned into Html by a static site generator I made called [Statisk](https://github.com/fiskurgit/Statisk). New posts are written, Statisk does the conversion, then the local changes are pushed to a Git repo ([a public repo on Github](https://github.com/fiskurgit/fisk_solar_website)). The Pi Zero has a regular [Cron job](https://en.wikipedia.org/wiki/Cron) checking for any changes to download and update the site and also grabs local environment data from an [Awair air monitor](https://getawair.com/).

## Raspberry Pi Server Setup Notes

I made some notes on setting up the web server so it'd be easier to do next time.

* Downloaded [Balena Etcher](https://www.balena.io/etcher/) and [Rasbian Buster Lite](https://www.raspberrypi.org/downloads/raspbian/), a lightweight version of Raspbian with no desktop gui. Flashed onto a 32gb micro SD.
* Connected a keyboard and hdmi cable, added user using the general RaspberryPi [Linux notes](https://www.raspberrypi.org/documentation/linux/usage/users.md) through my TV.

* Setup wifi, as we're using Lite there's no gui, needs to be done via terminal ([guide here](https://www.argon40.com/resources/how-to-enable-your-raspberry-pi-3-wifi-via-terminal/)) then `sudo reboot`

* [Enable ssh from terminal](https://www.raspberrypi.org/documentation/remote-access/ssh/) - turns out `raspi-config` would have sorted the wifi more easily too. Reboot for good measure: `sudo reboot`

* Get the ip address on the Pi Zero: `hostname -I` then disconnect the keyboard and hdmi - from this point on everything is done over SSH from a laptop: `ssh username@192.168.111.222`

* [Install Nginx web server and start it](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md).

* Setup Pi Zero to run `sudo /etc/init.d/nginx start` [on startup](https://www.raspberrypi.org/documentation/linux/usage/rc-local.md)

* Install git: `sudo apt-get install git` and move to Nginx web server directory: `cd /var/www/html`

* Add 'hello world' index.html

* Configure router. I have Sky Broadband (for the moment, I'm in the process of switching away from Murdoch) with Google WiFi attached via Ethernet. Create Firewall rule on the Broadband Router to allow incoming requests on Port 80 to be forwarded to Google WiFi. Google WiFi then has a port forwarding rule to pass incoming port 80 requests to the Pi Zero.

* Setup No-IP. From the Pi Zero SSH session get the external IP: `curl icanhazip.com`. Add this address to a [No-IP](https://www.noip.com) hostname: [fisksolar.ddns.net](http://fisksolar.ddns.net).

* Add cron job to update website from git repo
