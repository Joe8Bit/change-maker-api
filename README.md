## change-maker-api


[![Circle CI](https://circleci.com/gh/Joe8Bit/change-maker-api.svg?style=svg)](https://circleci.com/gh/Joe8Bit/change-maker-api)

[![Coverage Status](https://coveralls.io/repos/github/Joe8Bit/change-maker-api/badge.svg?branch=master)](https://coveralls.io/github/Joe8Bit/change-maker-api?branch=master)
[![Dependency status](https://david-dm.org/joe8bit/change-maker-api.svg)](https://david-dm.org/Joe8bit/change-maker-api)
[![Dependency status](https://david-dm.org/Joe8bit/change-maker-api/dev-status.svg)](https://david-dm.org/Joe8bit/change-maker-api#info=devDependencies&view=table)
[![Code Climate](https://codeclimate.com/github/Joe8Bit/change-maker-api/badges/gpa.svg)](https://codeclimate.com/github/Joe8Bit/change-maker-api)

[http://api.change-maker.io/documentation](http://api.change-maker.io/documentation)

The project contains a JSON API powered primarily by the [change-maker](https://github.com/Joe8Bit/change-maker) NPM module. It's primary purpose is as a teaching aide to demonstrate: how to build a modular and decomposed NodeJS application; and, how to do continuous integration and deployment into a scalable (production) Docker environment (in AWS).

This change making problem was picked to allow for the implementation of a (reasonably) complex but self contained algorithmic problem in JavaScript.

### API

The API exposes three routes:

```
GET /currencies
```
```
GET /currencies/{currency_code}
```
```
GET /currencies/{currency_code}/change
```

Documentation for these routes are generated automatically and [exposed here](http://api.change-maker.io/documentation).

### Development

Install and configure Docker [for your environment](https://docs.docker.com/engine/installation/). Then build your own image:

```
git clone https://github.com/Joe8Bit/change-maker-api.git
cd change-maker-api
docker build -t your-name/change-maker-api .
docker run -d -p 8080:8080 your-name/change-maker-api
```
Or pull the `latest` version from Docker Hub:

```
docker pull joe8bit/change-maker-api:latest
docker run -d -p 8080:8080 joe8bit/change-maker-api:latest
```

You can also run the app without Docker via the following:

```
git clone https://github.com/Joe8Bit/change-maker-api.git
cd change-maker-api
npm install
npm start
```

The key difference between running with Docker and without is that starting with `npm start` will run the dev server using [nodemon](https://github.com/remy/nodemon) and hot reload code.

### Testing

The following command will run the apps full test suite, this includes:

* Unit testing (build will fail if coverage is <100%)
* Linting (uses ESLint and build will also fail on any errors)
* Snyk (will check if any of the modules deps introduce security vulernabilities, will fail if they do)

```
npm test
```

### Deployment

This app is continuously deployed in the following way:

1. A commit to this repos `master` branch triggers a webhook to [CircleCI](https://circleci.com/gh/Joe8Bit/change-maker-api/)
2. CircleCI runs the projects tests
3. If the tests pass it builds a new version of the Docker container (`joe8bit/change-maker-api:latest`)
4. This container is then pushed automatically [into Docker Hub](https://hub.docker.com/r/joe8bit/change-maker-api/)
5. Docker Hub then sends a webhook to Docker Cloud, Docker Cloud then handles the zero downtime deploy of the container into AWS using Docker Hubs 'high availability' mode.

## Production

The application is currently deployed into a high availability cluster in Amazon Web Services, that cluster is provisioned and managed by Docker Cloud.

The `change-api` container is currently deployed 8 times times across four EC2 instances hosted in two `us-east` availabilty zones. The diagram below demonstrates this configuration.

The `change-maker.io` domain is in a hosted zone Amazon's DNS service Route53. It points to CloudFront, Amazon's global CDN that functions as a reverse proxy/edge cache for the API.

![image](http://i.imgur.com/34XPvaP.png)
[https://cloudcraft.co/view/a6ddad77-655a-4670-a06e-d78b4b290f18?key=iy8gmfxa9j5crgut](https://cloudcraft.co/view/a6ddad77-655a-4670-a06e-d78b4b290f18?key=iy8gmfxa9j5crgut)


## Contrubuting

All contributors will abide by the `CODE_OF_CONDUCT.md`.

## License

MIT
