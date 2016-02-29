'use strict';

const ChangeMaker = require('change-maker');
const Joi = require('joi');

const denominations = [100, 50, 20, 5, 10, 1];

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/change',
        config: {
            validate: {
                query: {
                    total: Joi.string().min(1).required()
                }
            },
            description: 'Returns an object corresponding to the least possible number of coins for the given total',
            notes: `The following coin denominations are used [${denominations.join(', ')}]}`,
            tags: ['api', 'change']
        },
        handler: function (request, reply) {

            reply(ChangeMaker(request.query.total, denominations));

        }
    });

    next();

};

exports.register.attributes = {
    name: 'make-change'
};
