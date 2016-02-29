'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const MakeChangePlugin = require('../../../server/api/make-change');

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach((done) => {

    const plugins = [MakeChangePlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }
        done();

    });

});

lab.experiment('MakeChangePlugin Plugin', () => {

    lab.test('it returns an object with total and coins properties', (done) => {

        server.inject({
            method: 'GET',
            url: '/change?total=$122.37'
        }, (response) => {

            Code.expect(response.result).to.be.an.object();
            Code.expect(response.result['100']).to.equal(122);
            Code.expect(response.result['50']).to.equal(0);
            Code.expect(response.result['20']).to.equal(1);
            Code.expect(response.result['10']).to.equal(1);
            Code.expect(response.result['5']).to.equal(1);
            Code.expect(response.result['1']).to.equal(2);
            Code.expect(response.statusCode).to.equal(200);
            done();

        });

    });

});
