var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server;

var mongoclient = new MongoClient(
                     new Server('localhost', 27017, 
                                {native_parser: true}));
var db = mongoclient.db('funds');


module.exports.init = function(callback) {
  mongoclient.open(function(err, mongoclient) {
    if (err) throw err;
    callback();
  });
};

module.exports.findStocksForFunds = function(fundsArray, callback) {
  var query = {"funds.name": {'$in': fundsArray}};
  var cur = db.collection('stocks').find(query).sort({"funds.name": 1});
  cur.toArray(function(err, results) {
    if (err) throw err;
    console.log("Total stocks:", results.length);
    results = filterFunds(results);
    results = sortStocks(results);
    callback(results);
  });

  function filterFunds(stocksArray) {
    return _.map(stocksArray, function(stock) {
      console.log("Total funds for stock: ", stock.name, ": ", stock.funds.length);
      stock.funds = _.map(stock.funds, function(fundObj) {
        if (_.contains(fundsArray, fundObj.name)) {
          stock[fundObj.name] = fundObj.percentage;
        }
      });
      console.log("Funds for stock:", JSON.stringify(stock));
      return stock;
    });
  }

  function sortStocks(stocksArray) {
    return _.sortBy(stocksArray, function(stock) {
      var totalPerc = 0.0;
      _.each(fundsArray, function(fund) {
        totalPerc += parseFloat(stock[fund] || "0.0");
      });
      return totalPerc;
    }).reverse();
  }

};

module.exports.storeStocksForFund = function(fund, stocks) {
  db.collection('funds').findOne({name: fund}, function(doc) {
    if (!doc) {
      db.collection('funds').insert({name: fund, stocks: stocks}, function() {
        console.log("Saved for fund:", fund);
      });
    }
  });
};

module.exports.addFundsForStock = function(stock, fundName) {
  var query = {name: stock.name};
  var fundDetails = {name: fundName, percentage: stock.percentage};
  console.log("Adding stock:", stock.name, " fund: ", fundName, " perc:", stock.percentage);
  db.collection('stocks').findOne({name: stock.name}, function(err, doc) {
    if (!doc) {
      db.collection('stocks').insert({name: stock.name, funds: [fundDetails]}, function() {
        console.log("Added new stock with funds: ", stock.name);
      });
    }
    else {
      db.collection('stocks').update(query, {'$pull': {
        'funds': {'name': fundName}}}, [], function(err) {
          if (err) throw err;
          db.collection('stocks').update(query, {'$push': {
            'funds': fundDetails
          }}, [], function(err) {
            if (err) throw err;
          });
        });
    }
  });
};


