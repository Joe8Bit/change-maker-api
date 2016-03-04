'use strict';

const Lab = require('lab');
const Code = require('code');
const _ = require('lodash');
const Config = require('../../../config');
const Hapi = require('hapi');
const CurrencyPlugin = require('../../../server/api/currency');

const lab = exports.lab = Lab.script();
let server;

const Currencies = require('../../../server/lib/currencies').currencies;

lab.beforeEach((done) => {

    const plugins = [CurrencyPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }
        done();

    });

});

lab.experiment('CurrencyPlugin Plugin', () => {

    lab.test('it returns all available currencies', (done) => {

        server.inject({
            method: 'GET',
            url: '/v1/currencies'
        }, (response) => {

            Code.expect(response.result).to.be.an.array();
            Code.expect(response.result.length).to.equal(Currencies.length);

            response.result.forEach((returnedCur, index) => {

                Code.expect(returnedCur.isoCode).to.equal(Currencies[index].isoCode);
                Code.expect(returnedCur.name).to.equal(Currencies[index].name);
                Code.expect(returnedCur.symbol).to.equal(Currencies[index].symbol);
                Code.expect(returnedCur.fractionalUnit.name).to.equal(Currencies[index].fractionalUnit.name);
                Code.expect(returnedCur.fractionalUnit.numberToBasic).to.equal(Currencies[index].fractionalUnit.numberToBasic);
                Code.expect(returnedCur.denominations).to.only.include(Currencies[index].denominations);
                Code.expect(returnedCur._link).to.equal(`${Config.get('/baseURL')}/v1/currencies/${Currencies[index].currency_code}`);

            });

            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns an individual currency by it\'s currency_code', (done) => {

        const usd = _.find(Currencies, { isoCode: 'USD' });

        server.inject({
            method: 'GET',
            url: '/v1/currencies/USD'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.isoCode).to.equal(usd.isoCode);
            Code.expect(response.result.name).to.equal(usd.name);
            Code.expect(response.result.symbol).to.equal(usd.symbol);
            Code.expect(response.result.fractionalUnit.name).to.equal(usd.fractionalUnit.name);
            Code.expect(response.result.fractionalUnit.numberToBasic).to.equal(usd.fractionalUnit.numberToBasic);
            Code.expect(response.result.denominations).to.only.include(usd.denominations);
            Code.expect(response.result['_change-link']).to.equal(`${Config.get('/baseURL')}/v1/currencies/${usd.isoCode}/change`);

            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns a 400 when bad currency_code is specified', (done) => {

        server.inject({
            method: 'GET',
            url: '/v1/currencies/foo'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.statusCode).to.equal(400);
            Code.expect(response.result.error).to.equal('Bad Request');
            Code.expect(response.result.message).to.equal('child "currency" fails because ["currency" must be one of [USD, GBP, EUR, JPY]]');
            Code.expect(response.result.validation).to.be.an.object();
            Code.expect(response.result.validation.source).to.equal('params');
            Code.expect(response.result.validation.keys).to.be.an.array();
            Code.expect(response.result.validation.keys.length).to.equal(1);
            Code.expect(response.result.validation.keys[0]).to.equal('currency');

            Code.expect(response.statusCode).to.equal(400);
            done();

        });

    });

    lab.test('it returns a the correct smallest amount of change', (done) => {

        const usd = _.find(Currencies, { isoCode: 'USD' });

        server.inject({
            method: 'GET',
            url: '/v1/currencies/USD/change?total=12.34'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.isoCode).to.equal(usd.isoCode);
            Code.expect(response.result.total).to.equal('12.34');
            Code.expect(response.result.change).to.be.an.object();
            Code.expect(response.result.change['1']).to.equal(4);
            Code.expect(response.result.change['5']).to.equal(1);
            Code.expect(response.result.change['10']).to.equal(0);
            Code.expect(response.result.change['25']).to.equal(1);
            Code.expect(response.result.change['50']).to.equal(0);
            Code.expect(response.result.change['100']).to.equal(12);
            Code.expect(Object.keys(response.result.change)).to.only.include(usd.denominations.map(String));

            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    lab.test('it returns a 400 if no total property is sent when requesting change', (done) => {

        server.inject({
            method: 'GET',
            url: '/v1/currencies/USD/change'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result.statusCode).to.equal(400);
            Code.expect(response.result.error).to.equal('Bad Request');
            Code.expect(response.result.message).to.equal('child "total" fails because ["total" is required]');
            Code.expect(response.result.validation).to.be.an.object();
            Code.expect(response.result.validation.source).to.equal('query');
            Code.expect(response.result.validation.keys).to.be.an.array();
            Code.expect(response.result.validation.keys.length).to.equal(1);
            Code.expect(response.result.validation.keys[0]).to.equal('total');

            Code.expect(response.statusCode).to.equal(400);
            done();

        });

    });

});
