var express = require("express"),
  cons = require("consolidate"),
  Fund = require('./model/fund'),
  app = express(),
  store = require('./model/store'),
  locations = require('./model/fund_location'),
  Stock = require('./model/stock'),
  _ = require("underscore");


app.engine('html', cons.jade);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

app.get("/", function(req, res) {
  res.render('index', {funds: _.keys(locations.locations)});
}); 

app.post("/updateStocks", function(req, res) {
  updateStocksWithFunds();
  res.render('index', {funds: _.keys(locations.locations)});
});

app.get("/stocks", function(req, res) {
  var selectedFunds = [].concat(req.query.fund);
  console.log("Selected funds:", selectedFunds);
  store.findStocksForFunds(selectedFunds, function(stocks) {
    res.render('stocks', {stocks: stocks, selectedFunds: selectedFunds});
  });
});

store.init(function() {
  app.listen(3000);
  console.log("Started server on port 3000");
});

function updateStocksWithFunds() {
  _.map(_.keys(locations.locations), function(fundName) {
    var fund = new Fund(fundName);
    fund.getStocks(function(stocks) {
      _.map(stocks, function(stockObj) {
        var stock = new Stock();
        stock.name = stockObj.name;
        stock.percentage = stockObj.percentage;
        stock.addFund(fundName);
      });
    });
  });
}
