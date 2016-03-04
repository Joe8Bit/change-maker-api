'use strict';

const ChangeMaker = require('change-maker');
const Joi = require('joi');
const _ = require('lodash');
const Config = require('../../config');


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/v1/currencies',
        config: {
            description: 'Returns a list of all supported currencies',
            notes: 'It also returns discoverable links for their operation',
            tags: ['api', 'currency']
        },
        handler: function (request, reply) {

            reply(currencies.map((curr) => {

                curr._link = `${Config.get('/baseURL')}/v1/currencies/${curr.currency_code}`;
                return curr;

            }));

        }
    });

    server.route({
        method: 'GET',
        path: '/v1/currencies/{currency}',
        config: {
            validate: {
                params: {
                    currency: Joi
                            .string()
                            .required()
                            .valid(currencyCodes)
                            .description('the currency requested')
                }
            },
            description: 'Returns the details for a requested currency',
            notes: 'It also returns discoverable links for all operations possible on that currency',
            tags: ['api', 'currency']
        },
        handler: function (request, reply) {

            const currency = _.find(currencies, { currency_code: request.params.currency });
            currency['_change-link'] = `${Config.get('/baseURL')}/v1/currencies/${request.params.currency}/change`;

            reply(currency);

        }
    });

    server.route({
        method: 'GET',
        path: '/v1/currencies/{currency}/change',
        config: {
            validate: {
                params: {
                    currency: Joi
                            .string()
                            .required()
                            .valid(currencyCodes)
                            .description('the currency requested')
                },
                query: {
                    total: Joi
                            .string()
                            .min(1)
                            .required()
                            .description('the total amount to get change for')
                }
            },
            description: 'Returns an object corresponding to the least possible number of coins for the given total',
            tags: ['api', 'change']
        },
        handler: function (request, reply) {

            const currency = _.find(currencies, { currency_code: request.params.currency });

            reply({
                currency_code: currency.currency_code,
                total: request.query.total,
                change: ChangeMaker(request.query.total, currency.denominations)
            });

        }
    });

    next();

};

exports.register.attributes = {
    name: 'currency'
};
