import React,{Component} from 'react';
import logo from './money-exchange.jpg';
//import request from 'request';
import './App.css';
import Fadown from 'react-icons/lib/fa/hand-o-down';
import Faup from 'react-icons/lib/fa/hand-o-up';
import Fano from 'react-icons/lib/fa/hand-grab-o';

//var URL = "http://webrates.truefx.com/rates/connect.html?f=csv";

 let offer_points_diff=[];
 let offer_figure_diff=[];
class App extends Component {
  //constructor for default states
        constructor(props){
        super(props);
        //console.log(props)
        this.state={
        data:[]
        }
        this.loadCurrencyFromServer=this.loadCurrencyFromServer.bind(this);
        this.CheckPrevNext=this.CheckPrevNext.bind(this);       
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

     this.loadCurrencyFromServer();
      this.interval = setInterval(this.loadCurrencyFromServer, 2000);
  }
  
  
  shouldComponentUpdate(nextProps,nextState){
        //console.log("Should I update?");
        //console.log("PREV STATE",this.state.data);
        
        //console.log("NEXT STATE",nextState);

        this.CheckPrevNext(this.state.data,nextState.data)
        
        return true;
        //return nextProps.likes %2==0;
        }
       
        CheckPrevNext(prev_data,next_state){
        // let prev_bid=[];
         //let next_bid=[];
         offer_points_diff=[];
         offer_figure_diff=[];
         /*
         for(var index=0;index<prev_data.length;index++){
          //console.log(prev_data[index],next_state[index]);
         prev_bid[index]=prev_data[index]['Offer_big_figure'];
          //console.log(prev_val['Offer_big_figure'])
          //console.log("Diff:",next_val['Offer_big_figure']-prev_val['Offer_big_figure']);
         }*/
         for(var index=0;index<next_state.length&&prev_data.length;index++){
          //console.log(next_state[index]);
          //next_bid[index]=next_state[index]['Offer_big_points'];
           //prev_bid[index]=prev_data[index]['Offer_big_points'];
          offer_points_diff[index]= (next_state[index]['Offer_big_points'])-(prev_data[index]['Offer_big_points']);
          offer_figure_diff[index]= (next_state[index]['Offer_big_figure'])-(prev_data[index]['Offer_big_figure']);
          //var prev_val=prev_data[index]
          console.log(offer_points_diff[index])
          
         }
         
        // console.log("Diff:",next_bid[0]-prev_bid[0]);offer_figure_diff
  }
  

  render(nextState) { 
   
    const Icon_insert=(num)=>{
            if(parseInt(num,10)===0){
                return(
              <Fano/>
              )
             }
              else if(parseInt(num,10)>0){
              return(
              <Faup/>
              )
            }
            else{
              return(
                <Fadown/>
              )
            }

          }
        //console.log(currency_info);
        const ListItems =this.state.data.map((number,index) =>
        <tr key={number.Symbols}>
          <td>{number.Symbols}</td>
          <td>{number.Offer_big_figure}</td> 
          <td>
          {Icon_insert(offer_figure_diff[index])}</td>
          <td>{number.Offer_big_points}</td>
          <td>{Icon_insert(offer_points_diff[index])}</td>
        </tr>
        
        );
      
      return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Currency Rate Exchange</h2>   
        </div>
        <div className="App-intro">
        <table className="App-data">
          <tbody>
        <tr>
            <th>Symbols</th>
            <th>Offer_big_figure</th> 
            <th>Change</th>
            <th>Offer_big_points</th> 
            <th>Change</th>
        </tr>
        {ListItems}
      `</tbody>
        </table>
        </div>
      </div>
    );
  }
};
 

export default App;
