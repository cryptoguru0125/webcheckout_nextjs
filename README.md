# Bloom Webcheckout

The site is built by Express.js + Next.JS.
It is supposed to run on digital ocean web hosting service.

## Development

First, install Packages
```bash
npm install
# or
yarn install

```

Run the development server:

```bash
npm run dev
# or
yarn dev

```

## Deploy to Server

The site will be still running on http://localhost:8080 and use apache server for ssl.
Make the apache server to proxy pass to http://localhost:8080

#### Register Node Server as a service

Make sure you are on the project directory
```bash
npm install pm2 --global
pm2 run "npm start" --name bloom

```

Your site is running on http://localhost:8080

#### Install Apache server and secure Apache

Please follow the instructions:
https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04
https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04

#### Add proxypass to Apache server

Please follow this instruction:
https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension
