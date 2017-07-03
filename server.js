var csv = require( "fast-csv" );

// Require the 'request' module.
// Install it with `npm install --save request`.
var request = require('request');

var URL = "http://webrates.truefx.com/rates/connect.html?f=csv";

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

var MyData=[];
function fast_csv_read_url(url)
{
    // Let request return the document pointed to by the URL
    // as a readable stream, and pass it to csv.fromStream()
   // let currency_data=[][];
    csv.fromStream(request(url))
      .on("data", function(data){
        //console.log("current data: ");
        //console.log(data[0])
        if(data[0]!=undefined){
        MyData.push(new MyCSV(data[0], data[1], data[2]));
        }
        console.log(MyData);
      })
      .on("end", function(){
        //console.log("done reading");
      });
      //console.log(data);
}

fast_csv_read_url(URL);