## change-maker-api


[![Circle CI](https://circleci.com/gh/Joe8Bit/change-maker-api.svg?style=svg)](https://circleci.com/gh/Joe8Bit/change-maker-api)

[![Coverage Status](https://coveralls.io/repos/github/Joe8Bit/change-maker-api/badge.svg?branch=master)](https://coveralls.io/github/Joe8Bit/change-maker-api?branch=master)
[![Dependency status](https://david-dm.org/joe8bit/change-maker-api.svg)](https://david-dm.org/Joe8bit/change-maker-api)
[![Dependency status](https://david-dm.org/Joe8bit/change-maker-api/dev-status.svg)](https://david-dm.org/Joe8bit/change-maker-api#info=devDependencies&view=table)

[https://change-maker-api.herokuapp.com](https://change-maker-api.herokuapp.com)

The Change Maker API is a JSON API powered by [change-maker](https://github.com/Joe8Bit/change-maker). It is used as a demonstration for how to build and deploy a NodeJS API application to Heroku.

### API

There is only a single route exposed by the application:

`/change?total={total}` - Which given an amount of currency (e.g. `$12.55`) will return an object comprised of the least possible number of coins to make up that denomination

Documentation for this route is generated automatically and [exposed here](https://change-maker-api.herokuapp.com/docs).

**Note:** the denominations are currently a constant defined in `./server/api/make-change.js`


### Development

```
git clone https://github.com/Joe8Bit/change-maker-api.git
cd change-maker-api
npm install
npm test
npm start
```

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
