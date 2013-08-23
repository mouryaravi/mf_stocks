var fund_locations = {
  'HDFCTop200': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MZU009',
  'HDFCEquity': 'http://localhost:3000/hdfcequity.html'
}

module.exports.getLocation = function(fund) {
  return fund_locations[fund];
}
