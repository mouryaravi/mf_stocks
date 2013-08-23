var locations = require('./fund_location.js'),
  HtmlPage = require('./html_page');

function Fund(fund) {
  this.fund = fund;
}

Fund.prototype.getStocks = function() {
  var loc = locations.getLocation(this.fund);
  console.log('Location for fund', this.fund, "is", loc);
  var htmlPage = new HtmlPage(loc);
  htmlPage.parse(function() {
    console.log("Total percentage:", htmlPage.totalPerc());    
  });
  return ['super', 'duper'];
}

module.exports = exports = Fund;
