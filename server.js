var csv = require( "fast-csv" );
var request = require('request');
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3001));

var URL = "http://webrates.truefx.com/rates/connect.html?f=csv";

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers' ,'Origin, X-Requested-With, Content-Type, Accept' );
    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function MyCSV(Fcol,Scol,tcol,fcol,ficol,scol,secol,ecol,ncol){
  this.Symbols=Fcol;
  this.Timestamp_msec=Scol;
  this.Bid_big_figure=tcol;
  this.Bid_points=fcol;
  this.Offer_big_figure=ficol;
  this.Offer_big_points=scol;
  this.High=secol;
  this.Low=ecol;
  this.Mid=ncol;
}


app.get('/currency_data', function(req, res) {
  var MyData=[];
  console.log("REquest ali");
 // Let request return the document pointed to by the URL
    // as a readable stream, and pass it to csv.fromStream(
request(URL, function (error, response, body) {
  if (!error && response.statusCode == 200) {
var temp=response.body;
console.log(temp);
var inde=temp.split("\n");

for(var index=0;index<inde.length;index++){

var temp1=inde[index].split(",");
if(temp1[1]!=undefined){
MyData.push({"Symbols":temp1[0],"Offer_big_figure":temp1[4],"Offer_big_points":temp1[5]});

}
}
//Converting the data into JSON Object
 var myJSON = JSON.stringify(MyData);
  myJSON=JSON.parse(myJSON);
  console.log(myJSON);
  res.json(myJSON);
  }
});
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
