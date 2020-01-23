# guagua ota server

This project is a share services of application package in develop !

# Usage

Has two methods.

- First Method: Docker

Pull Image

```css
sudo docker pull pixboly/ggota:1.0
```

Start container

```css
sudo docker run -d -p 1337:1337 -v ~/ota/web:/work/ota/web pixboly/ggota:1.0
```

Clone this project in your PC.

```css
gitclone git@github.com: pixb/ota.git;
```

Copy project `ota` web directory into `~/ota/web`

```css
cp -R web/* ~/ota/web
```

* Second Method: Direct Install

Clone this project in your PC.

```css
gitclone git@github.com: pixb/ota.git;
```

Need install `nodejs` program!

Run `ota-start.sh` shell script.

```shell
sh ota-start.sh
```

Visit Services

This services usage nodejs default port:`1337`.

Please visit:

```shell
http://you_pc_ip:1337
```
