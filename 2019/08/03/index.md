# Off-cloud Webserver Part 2
#### 03rd July 2019

**The previous post covered relatively simple port-forwarding steps on a router to self-host a website. I've now escaped Sky Broadband and switched to 4GEE cellular broadband which offers higher bandwidth in our rural location. Unfortunately EE 4G broadband operates [Carrier Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) which means a simple port forward from the router won't work. Here I'm detailing how I kept [Fisk Solar](http://fisksolar.ddns.net/) online. **

* Unfortunately I can't think of any easy way of hosting a website on this 4G connection without having to rely on some kind of tunnel to a hosted service. A VPN service that supports a static Ip address and port forwarding should be fine, but they're also quite expensive. Instead I've got a Virtual Private Server from [Fast Hosts](https://www.fasthosts.co.uk/virtual-private-servers) which is currently £2.49 a month.
* From the VPS web-based control panel I setup a firewall rule to allow web traffic on port 80, and ssh access on the standard 443.
* From a terminal I then ssh to the VPS and configure the ssh server config to allow reverse ssh tunneling: `nano /etc/ssh/sshd_config` the main setting being: `GatewayPorts yes`
* Once this config file has been saved restart the VPS to load the rule changes: `service sshd restart`
* I then exited the VPS ssh session and ssh to my Pi Zero, from there create a reverse ssh tunnel from the vps, any traffic hitting port 80 of the remote vps will be forwarded to port 80 of my local Pi Zero:
```
ssh -R 80:localhost:80 root@77.68.25.88
```
* The last step is to change the [No-ip](https://www.noip.com/) domain to reference the VPS Ip address: http://fisksolar.ddns.net is now up and running again.

## To do

I Need to create a cron job on the Pi Zero to check this tunnel is still active and set it up again if not.
