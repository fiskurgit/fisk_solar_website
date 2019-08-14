# Off-cloud Webserver Part 2
#### 03rd August 2019

**The previous post covered relatively simple port-forwarding steps on a router to self-host a website. I've now escaped Sky Broadband and switched to 4GEE cellular broadband which offers higher bandwidth in our rural location. EE 4G broadband operates [Carrier Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) which means a simple port forward from the router won't work. Here I'm detailing how I kept [Fisk Solar](http://fisksolar.ddns.net/) online.**

* Unfortunately I can't think of any easy way of hosting a website on this 4G connection without having to rely on some kind of tunnel to a hosted service. A VPN service that supports a static Ip address and port forwarding should be fine, but they're also quite expensive. Instead I've got a [Virtual Private Server](https://en.wikipedia.org/wiki/Virtual_private_server) from [Fast Hosts](https://www.fasthosts.co.uk/virtual-private-servers) which is currently £2.49 a month. _This solution does mean my off-cloud website is now not fully off-cloud._
* From the VPS web-based control panel I setup a firewall rule to allow web traffic on port 80, and ssh access on the standard 443.
* From a terminal I then ssh to the VPS and configure the ssh server config to allow reverse ssh tunneling: `nano /etc/ssh/sshd_config` the main setting being: `GatewayPorts yes`
* Once this config file has been saved restart ssh to load the rule changes:
    ```
    service sshd restart
    ```
* I then exited the VPS ssh session and ssh to my Pi Zero, from there create a reverse ssh tunnel from the VPS, any traffic hitting port 80 of the remote VPS will be forwarded to port 80 of my local Pi Zero (see Addendum below for update on this):
    ```
    ssh -R 80:localhost:80 user@77.68.25.88
    ```
* The last step is to change the [No-ip](https://www.noip.com/) domain to reference the VPS Ip address: http://fisksolar.ddns.net is now up and running again.

## Addendum

If one side of the ssh connection fails things get into a hung state where simply setting up the tunnel again will fail which was only solved by restarting the VPS. After some research I found the following arguments which hopefully will stay alive more reliably and also safely close the session and allow a cron job on the Pi Zero to get it up and running again:
```
ssh -f -N -R 80:192.168.86.28:80 user@77.68.25.88 -o ExitOnForwardFailure=yes  -o ServerAliveInterval=60 -o ServerAliveCountMax=10
```

### Todo

* Set up passwordless ssh between Pi Zero and VPS
* Cron job on the Pi Zero to retry connection
