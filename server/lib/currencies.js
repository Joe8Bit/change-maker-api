'use strict';

const CurrencyData = require('currency-data');

const availableCurrencies = [{
    currencyISOCode: 'USD',
    denominations: [1, 5, 10, 25, 50, 100]
}, {
    currencyISOCode: 'GBP',
    denominations: [1, 2, 5, 10, 20, 50, 100, 200]
}, {
    currencyISOCode: 'EUR',
    denominations: [1, 2, 5, 10, 20, 50, 100, 200]
}, {
    currencyISOCode: 'JPY',
    denominations: [1, 5, 10, 50, 100, 500]
}];

exports.currencies = availableCurrencies.map((curr) => {

    const currency = CurrencyData.getCurrencyByCurrencyISOCode(curr.currencyISOCode);
    currency.denominations = curr.denominations;
    return currency;

});

exports.ISOCodes = availableCurrencies.map((curr) => {

    return curr.currencyISOCode;

});
