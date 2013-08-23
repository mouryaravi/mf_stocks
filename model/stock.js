var _ = require('underscore');

function Stock() {
  this.name = '';
  this.percentage = 0.0;
};


Stock.prototype.buildFromArray = function(stockArray) {
  this.name =   _.first(stockArray);
  this.percentage = _.last(stockArray);
};


module.exports = exports = Stock;
