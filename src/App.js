import React,{Component} from 'react';
import logo from './money-exchange.jpg';
//import request from 'request';
import './App.css';


//var URL = "http://webrates.truefx.com/rates/connect.html?f=csv";
var currency_info=[];
class App extends Component {
  //constructor for default states
        constructor(props){
        super(props);
        //console.log(props)
        this.state={
        data:[]
        }
        this.loadCurrencyFromServer=this.loadCurrencyFromServer.bind(this);
       
        }
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
 this.setState({
        data:response.body
             })
  }
});
*/

   fetch("http://localhost:3001/currency_data").then(function(response) {
    if (response.status >= 400) {
       throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(data => {               
    //console.log(data);
     //currency_info=data;
     //console.log(currency_info);
     //console.log(this.state.data)
     
     this.setState({
        data:data 
             })
  });
  //console.log(this.state.data);*/
  }
  componentWillMount(props) {
    var initialvalue="True"
     this.loadCurrencyFromServer();
      this.interval = setInterval(this.loadCurrencyFromServer, 20000);
  }
  
  render() {
    var currency_info=this.state.data;
        console.log("HELLO",currency_info);
        
    
        //console.log(currency_info);
        
      
      return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Currency Rate Exchange</h2>   
        </div>
        <div className="App-intro">
        <ul>
       
        </ul>
        </div>
      </div>
    );
  }
};


export default App;
