var _ = require('underscore'),
  store = require('./store');

function Stock() {
  this.name = '';
  this.percentage = 0.0;
};


Stock.prototype.buildFromArray = function(stockArray) {
  this.name =   _.first(stockArray);
  this.percentage = _.last(stockArray);
};

Stock.prototype.addFund = function(fundName) {
  store.addFundsForStock(this, fundName);
};

module.exports = exports = Stock;

