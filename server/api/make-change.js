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
            }
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
