var fund_locations = {
  'HDFCEquity': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MZU001',
  'UTIOpportunities': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MUT072',
  'ICICIPruDynamic': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MPI038',
  'IDFCPremierEquity': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MAG094',
  'DSPBRMicroCap': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MDS584',
  'RelianceRegularSavingsEquity': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MRC098',
  'HDFCTop200': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MZU009',
  'QuantumLTEquity': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MQU001',
  'UTIDividendYield': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MUT070',
  'DSPBRTop100': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MDS018',
  'IDFCSterlingEquity': 'http://www.moneycontrol.com/india/mutualfunds/mfinfo/portfolio_holdings/MAG162' 
}

module.exports.locations = fund_locations;

module.exports.getLocation = function(fund) {
  return fund_locations[fund];
}
