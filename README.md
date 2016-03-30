## change-maker-api


[![Circle CI](https://circleci.com/gh/Joe8Bit/change-maker-api.svg?style=svg)](https://circleci.com/gh/Joe8Bit/change-maker-api)

[![Coverage Status](https://coveralls.io/repos/github/Joe8Bit/change-maker-api/badge.svg?branch=master)](https://coveralls.io/github/Joe8Bit/change-maker-api?branch=master)
[![Dependency status](https://david-dm.org/joe8bit/change-maker-api.svg)](https://david-dm.org/Joe8bit/change-maker-api)
[![Dependency status](https://david-dm.org/Joe8bit/change-maker-api/dev-status.svg)](https://david-dm.org/Joe8bit/change-maker-api#info=devDependencies&view=table)
[![Code Climate](https://codeclimate.com/github/Joe8Bit/change-maker-api/badges/gpa.svg)](https://codeclimate.com/github/Joe8Bit/change-maker-api)

[https://change-maker-api.herokuapp.com](https://change-maker-api.herokuapp.com)

The Change Maker API is a JSON API powered by [change-maker](https://github.com/Joe8Bit/change-maker). It is used as a demonstration for how to build and deploy a NodeJS API application to Heroku.

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

Documentation for these routes are generated automatically and [exposed here](https://change-maker-api.herokuapp.com/documentation).

**Note:** the denominations and currencies are defined in `./data/currencies.json`

### Development

#### Via Docker

Install and configure Docker [for your environment](https://docs.docker.com/engine/installation/).

```
git clone https://github.com/Joe8Bit/change-maker-api.git
cd change-maker-api
docker build -t your-name/change-maker-api .
docker run -d -p 8080:8080 your-name/change-maker-api
```

or

```
docker pull joe8bit/change-maker-api
docker run -d -p 8080:8080 joe8bit/change-maker-api

```

You can also run the app without Docker via the following:

```
git clone https://github.com/Joe8Bit/change-maker-api.git
cd change-maker-api
npm install
npm start
```

The key difference between the two is that starting with `npm start` will run the dev server using [nodemon](https://github.com/remy/nodemon) and hot reload code.

### Testing

```
npm test
```

### Deployment
Deployment happens automatically upon a successfull CI build of the `master` branch

## Contrubuting

All contributors will abide by the `CODE_OF_CONDUCT.md`.

## License

MIT
