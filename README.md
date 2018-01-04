![WordPress React logo](docs/logo.jpg)

# `wp-react` - More than a blog

WordPress React (or `wp-react`) is a basic setup for WordPress theme development based on **ReactJS**. It is a toolkit that helps you to develop well performing and state-of-the-art websites - even more than blogs.

If you follow the steps in the [installation guide](#installation) a WordPress instance will run in a docker container and a webpack driven development environment supports you with the React app development (including hot module reloading ;) ).

## Installation

First clone the repository and install the NPM dependencies
```
$ git clone git@github.com:niels-garve/wp-react.git
$ cd wp-react/
$ npm install
```

Kick-off the docker container to serve WordPress (at `http://localhost:8080`)
```
docker-compose up -d && docker-compose logs -f wordpress
```

Start the webpack dev server to serve the React app assets (at `http://localhost:3000`)
```
npm run dev
```

Open a browser and navigate to `http://localhost:8080`. You will see a WordPress site that still comes in the look of the default theme.
![WordPress React logo](docs/step-0.png)

Lets change it! Navigate to `http://localhost:8080/wp-admin` and log in with user `root` and password `root`
![WordPress React logo](docs/step-1.png)

Activate the `wp-react-theme` through the 'Appearance' menu in WordPress
![WordPress React logo](docs/step-2.png)

![WordPress React logo](docs/step-3.png)

If you now open `http://localhost:8080` again you will see the (very) basic `wp-react-theme`.

Feel free to submit issues if this installation guide needs improvement. I will gladly collect installation problems in a troubleshooting section.

### WordPress CMS

The `wp-react-theme` activates new WordPress menus which allow you to add Headers, Sidebars and Footers. Theses new types - besides the default ones: pages and posts - can now be linked to pages and posts. This is the core of a very flexible website architecture.

### Shutdown and cleanup

The command
```
$ docker-compose down
```
removes the containers and default network, but preserves your WordPress database.

The command
```
docker-compose down --volumes
```
removes the containers, default network, and the WordPress database. (see [docker docs](https://docs.docker.com/compose/wordpress/#shutdown-and-cleanup))

## Final words

I'm currently working on further docs and setup improvements. I will be glad if you get in touch with me!
