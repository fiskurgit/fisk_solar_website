# Moving to Linux

I'm changing jobs in the New Year so will be handing back the huge and heavy Macbook Pro that comes with the current position (I won't miss the butterfly keyboard...). I have a 2015 Google Chromebook Pixel (codename: Samus), which is an i7 with 16gb ram - it's powerful, so I've set it up as my main dev machine, here's an overview of the steps I took:

* Although [this machine](https://www.chromium.org/a/chromium.org/dev/chromium-os/developer-information-for-chrome-os-devices/chromebook-pixel-2015) is supposed to be getting official Linux support within ChromeOS (aka [Crostini](https://chromium.googlesource.com/chromiumos/docs/+/master/containers_and_vms.md#Crostini), aka [Linux (Beta)](https://support.google.com/chromebook/answer/9145439?hl=en-GB)) there's no sign of it yet. I've used [Crouton](https://github.com/dnschneid/crouton) before but found it flakey. So I tried installing [GalliumOS](https://galliumos.org/) with [Chrx](https://github.com/reynhout/chrx) and found it much more friendly.

* Without opening the laptop and removing a write-protect screw the best I can hope for is dual-booting ChromeOS and Gallium (which is fine, on startup you type ctrl-d for ChromeOS, or Ctrl-l for GalliumOS), I worked through the [GalliumOS prep steps](https://wiki.galliumos.org/Installing/Preparing) which included running MrChromebox's Firmware Utility Script (I selected the only option available that didn't require the write-protect screw removal).

* I installed GalliumOS using the [Chrx method](https://wiki.galliumos.org/Installing#chrx_Installation) which doesn't require messing about with downloading ISOs, USB memory sticks and partitioning. Very straightforward.

* GalliumOS by default doesn't look great with the Chromebook Pixels very high resolution screen, after some hunting around I found `sudo apt install galliumos-hidpi` and [some extra steps on Reddit](https://www.reddit.com/r/GalliumOS/comments/7j0b3t/how_to_scale_the_display_without_changing_the/dtfyye2?utm_source=share&utm_medium=web2x):

```
sudo apt install galliumos-hidpi

for f in $(dpkg -L galliumos-hidpi | grep /etc/skel); do
  if [ -f "$f" ]; then
    destdir="$HOME/$(dirname "$(echo $f | sed 's/\/etc\/skel\///')")"
    mkdir -p "$destdir" && cp "$f" "$destdir"
  fi
done
```

* GalliumOS comes with [XFCE](https://www.xfce.org/) as the default desktop environment but I just don't get on with it, so I installed [GNOME](https://www.gnome.org/). In order to use GNOME you need to configure GalliumOS to display a desktop environment chooser on startup by editing: `/etc/lxdm/lxdm.conf` set `bottom_pane=0` to `bottom_pane=1` (Note. this only displays anything if there's more than one desktop environment installed).

* Install GNOME Desktop: `sudo apt install gnome-session gdm3` and reboot.

* That's the core system ready, I then installed my main tools: [Jetbrains IDEA Community Edition](https://www.jetbrains.com/idea/download/#section=linux), [VSCode](https://code.visualstudio.com/) (using the [Debian download and install method](https://code.visualstudio.com/docs/setup/linux)).