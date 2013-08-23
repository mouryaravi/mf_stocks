var jsdom = require('jsdom'),
  url = require('url'),
  _ = require('underscore'),
  Stock = require('./stock'),
  _s = require('underscore.string');

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
    scripts : ['http://localhost:3000/jquery.min.js'],
    done: function(errors, window) {
      if (errors) {
        console.log('Error while loading page:', url, errors);
        return;
      }

      var $ = window.$;
      var tbl = $('table.tblporhd tr').get().map(function(row) {
        return $(row).find('td').get().map(function(cell) {
          var cellHtml = $(cell).html();
          if (_s.startsWith(cellHtml, '<')) {
            return $(cellHtml).html();
          }
          return cellHtml;
        });
      });
      console.log("Table: ", tbl);
      parseStocks(tbl);
      callback();
    }
  });

  function parseStocks(tableJson) {
    that.stocks = _.map(tableJson, function(stockArray) {
      if (stockArray.length == 0) {
        return null;
      }
      var stock = new Stock();
      stock.buildFromArray(stockArray);
      return stock;
    });
    that.stocks = _.compact(that.stocks);
  }
};


HtmlPage.prototype.totalPerc = function() {
  var idx = 0, idx2 = 0;
  var perc = 0;
  for (idx = 0; idx < this.stocks.length; idx++) {
    var stock = this.stocks[idx];
    perc += parseFloat(stock.percentage) || 0.0;
  }
  return perc;
};

module.exports = exports = HtmlPage;
