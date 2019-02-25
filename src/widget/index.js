var central = require('./CentralWidget');
var input = require('./input');
var select = require('./select');
var date = require('./date');
var date701 = require('./date701');
var expDate = require('./expDate');
var address = require('./address');
var insureAmount = require('./insureAmount');
var idcard = require('./idcard');
var select_and_input = require('./select_and_input');
var order_form = require('./order_form');
var number = require('./number');

var index = {
    central: central,
    address: address,
    input: input,
    insureAmount: insureAmount,
    select: select,
    date: date,
    date701:date701,
    idcard: idcard,
    select_and_input: select_and_input,
    order_form: order_form,
    number: number,
    expDate:expDate
};
module.exports = index;
