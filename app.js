var express = require("express"),
  cons = require("consolidate"),
  Fund = require('./model/fund'),
  app = express();


app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(app.router);


app.get("/", function(req, res) {
  res.render('index', {funds: ['HDFCEquity', 'HDFCTop200']});
});

app.post("/getStocks", function(req, res) {
  var fund = req.body.fund;
  console.log("Getting stocks for fund", fund);
  var stocks = new Fund(fund).getStocks();
  res.render("stocks", {stocks: stocks});
});

app.listen(3000);
console.log("Started server on port 3000");
