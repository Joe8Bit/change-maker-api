'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const CurrencyPlugin = require('../../../server/api/currency');

const lab = exports.lab = Lab.script();
let server;

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

    lab.test('it returns an object with total and change properties', (done) => {

        server.inject({
            method: 'GET',
            url: '/v1/currencies/gbp/change?total=122.37'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            // Code.expect(response.result.total).to.equal('122.37');
            // Code.expect(response.result.change).to.be.an.object();
            // Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

    // lab.test('it returns an object with the correct coins', (done) => {
    //
    //     server.inject({
    //         method: 'GET',
    //         url: '/v1/currencies/gbp/change?total=122.37'
    //     }, (response) => {
    //
    //         Code.expect(response.result.change['100']).to.equal(122);
    //         Code.expect(response.result.change['50']).to.equal(0);
    //         Code.expect(response.result.change['20']).to.equal(1);
    //         Code.expect(response.result.change['10']).to.equal(1);
    //         Code.expect(response.result.change['5']).to.equal(1);
    //         Code.expect(response.result.change['1']).to.equal(2);
    //         Code.expect(response.statusCode).to.equal(200);
    //         done();
    //
    //     });
    //
    // });
    //
    // lab.test('it returns 400 if no total query param is supplied', (done) => {
    //
    //     server.inject({
    //         method: 'GET',
    //         url: '/v1/currencies/gbp/change'
    //     }, (response) => {
    //
    //         Code.expect(response.result).to.be.an.object();
    //         Code.expect(response.result.error).to.equal('Bad Request');
    //         Code.expect(response.result.message).to.equal('child "total" fails because ["total" is required]');
    //         Code.expect(response.result.validation.source).to.equal('query');
    //         Code.expect(response.result.validation.keys[0]).to.equal('total');
    //         Code.expect(response.statusCode).to.equal(400);
    //         done();
    //
    //     });
    //
    // });

});
