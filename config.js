'use strict';

const Confidence = require('confidence');

const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file configures the Make Change API',
    projectName: 'make-change-api',
    baseURL: process.env.BASE_URL,
    port: {
        api: {
            $filter: 'env',
            test: 9090,
            $default: process.env.PORT
        }
    }
};

const store = new Confidence.Store(config);

exports.get = function (key) {

    return store.get(key, criteria);

};

exports.meta = function (key) {

    return store.meta(key, criteria);

};
