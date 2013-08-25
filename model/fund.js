var locations = require('./fund_location.js'),
  HtmlPage = require('./html_page'),
  store = require('./store');

function Fund(fund) {
  this.fund = fund;
}

Fund.prototype.getStocks = function(callback) {
  var that = this;
  var loc = locations.getLocation(this.fund);
  console.log('Location for fund', this.fund, "is", loc);
  var htmlPage = new HtmlPage(loc);
  htmlPage.parse(function() {
    console.log("Total percentage:", htmlPage.totalPerc());    
    callback(htmlPage.stocks);
  });
}

Fund.prototype.updateStocks = function() {
  var that = this;
  this.getStocks(this.fund, function(stocks) {
    that.storeStocks(stocks);
  });
}

Fund.prototype.storeStocks = function(stocks) {
  store.storeStocksForFund(this.fund, stocks);
}

module.exports = exports = Fund;
