var jsdom = require('jsdom'),
  url = require('url');

function HtmlPage(httpUrl) {
  this.httpUrl = url.parse(httpUrl);
  this.contents = null;
  this.stocks = [];
}

HtmlPage.prototype.parse = function(callback) {
  var that = this;
  console.log("")
  jsdom.env({
    url: that.httpUrl.href,
    scripts : ['http://code.jquery.com/jquery.js'],
    done: function(errors, window) {
      if (errors) {
        console.log('Error while loading page:', url, errors);
        return;
      }

      var $ = window.$;
      var tbl = $('table.tblporhd tr').get().map(function(row) {
        return $(row).find('td').get().map(function(cell) {
          return $(cell).html();
        });
      });
      console.log("Table: ", tbl);
      that.stocks = tbl;
      callback();
    }
  });
};

HtmlPage.prototype.totalPerc = function() {
  var idx = 0, idx2 = 0;
  var perc = 0;
  for (idx = 0; idx < this.stocks.length; idx++) {
    var stock = this.stocks[idx];
    perc += parseFloat(stock[4]) || 0.0;
  }
  console.log("Total perc:", perc, " ");
};

module.exports = exports = HtmlPage;