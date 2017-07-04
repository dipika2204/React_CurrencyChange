import React,{Component} from 'react';
import logo from './money-exchange.jpg';
//import request from "/node_modules/request";
import './App.css';


//var URL = "http://webrates.truefx.com/rates/connect.html?f=csv";
class App extends Component {
   loadCurrencyFromServer(){
    // console.log(this.props.url);
 /*$.ajax({
      url: "http://localhost:3001/currency_data",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.log(this.state.data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
   */ 
  /*
  request("http://localhost:3001/currency_data", function (error, response, body) {
  if (!error && response.statusCode === 200) {
console.log(response.body);
  }
});
*/
   fetch("http://localhost:3001/currency_data").then(function(response) {
    if (response.status >= 400) {
       throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(data) {
     console.log(data);
  });
  }
  componentDidMount() {
    this.loadCurrencyFromServer();
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Currency Rate Exchange</h2>
        </div>
        <p className="App-intro">
        </p>
      </div>
    );
  }
};


export default App;
