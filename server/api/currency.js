'use strict';

const ChangeMaker = require('change-maker');
const Joi = require('joi');
const _ = require('lodash');
const Currencies = require('../lib/currencies');

const validateInputAgainstCountryCodes = function validateInputAgainstCountryCodes() {

    return Joi.string().required().valid(Currencies.ISOCodes).description('the currency requested');

};

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

            reply(Currencies.currencies.map((curr) => {

                curr._link = `/v1/currencies/${curr.currencyISOCode}`;
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
                    currency: validateInputAgainstCountryCodes()
                }
            },
            description: 'Returns the details for a requested currency',
            notes: 'It also returns discoverable links for all operations possible on that currency',
            tags: ['api', 'currency']
        },
        handler: function (request, reply) {

            const currency = _.find(Currencies.currencies, { isoCode: request.params.currency.toUpperCase() });
            currency['_change-link'] = `/v1/currencies/${request.params.currency}/change`;

            reply(currency);

        }
    });

    server.route({
        method: 'GET',
        path: '/v1/currencies/{currency}/change',
        config: {
            validate: {
                params: {
                    currency: validateInputAgainstCountryCodes()
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

            const currency = _.find(Currencies.currencies, { isoCode: request.params.currency });

            reply({
                isoCode: currency.isoCode,
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
