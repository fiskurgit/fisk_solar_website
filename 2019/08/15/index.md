# Off-cloud Webserver Part 3
#### 15th August 2019

Last step for keeping this site online is to periodically try and start the SSH tunnel, if it's still up the command just gets ignored.

* SSH to Pi Zero on local network, login as `su`, generate ssh key: `ssh-keygen -t rsa`
* SSH to remote VPS (from local Pi Zero) and create `.ssh` directory, then exit back to Pi Zero
* Upload Pi Zero SSH key to VPS: `cat .ssh/id_rsa.pub | ssh user@77.68.25.88 'cat >> .ssh/authorized_keys'`
* SSH to VPS and set permissions: `chmod 700 .ssh; chmod 640 .ssh/authorized_keys`
* Now there's passwordless SSH between the local Pi Zero and remote VPS schedule a new cron task every 10 minutes on the Pi Zero to try the reverse SSH tunnel command `crontab -e` then add a new line:
  ```
  */10 * * * * (bash -c 'ssh -f -N -R 80:192.168.86.28:80 root@77.68.25.88 -o ExitOnForwardFailure=yes  -o ServerAliveInterval=60 -o ServerAliveCountMax=10')

  ```
