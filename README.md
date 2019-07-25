# Fisk Solar Website

The aim of this website is to reduce the page size as much as possible so that a website running on a Raspberry Pi Zero W and powered by solar power is efficient as possible. This project was inspired by [LOW←TECH MAGAZINE](https://solar.lowtechmagazine.com), but where that operates in sunny [Barcelona](https://solar.lowtechmagazine.com/power.html) this website runs in extremely rainy Todmorden in Yorkshire, UK.

_solar.lowtech_ has this power source:

> The server runs on a 50 Wp solar panel and a 24 Wh LiPo battery. However, [we] are still experimenting with different setups (see above). The PV installation is managed by a 10A solar charge controller.

I'll be using two 100 watt panels and initially a full leisure battery setup. Once up and running I'll look at using a [Lipo Rider Pro from Seeed Studio](http://wiki.seeedstudio.com/Lipo_Rider_Pro/) connected to the charge controller, with a LiPo rechargable battery powering the RaspberryPi.

## Design Decisions

* No analytics, just like in my mobile apps I don't use analytics of any kind.
* Minimise page size including images. Aim for sub 200k with a hard ceiling of 500k.
* Javascript is only used to load a json file from the RaspberryPi which includes various data points. The site should run correcty with JS disabled.

### Links

* https://github.com/lowtechmag/solar/wiki/Solar-Web-Design
