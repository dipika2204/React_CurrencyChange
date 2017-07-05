import React,{Component} from 'react';
import logo from './money-exchange.jpg';
import './App.css';
import Fadown from 'react-icons/lib/fa/hand-o-down';
import Faup from 'react-icons/lib/fa/hand-o-up';
import Fano from 'react-icons/lib/fa/hand-grab-o';


 let offer_points_diff=[];
 let offer_figure_diff=[];
class App extends Component {
  //constructor for default states
        constructor(props){
        super(props);
        this.state={
        data:[]
        }
        this.loadCurrencyFromServer=this.loadCurrencyFromServer.bind(this);
        this.CheckPrevNext=this.CheckPrevNext.bind(this);       
        }
  //Fetching data from the server
   loadCurrencyFromServer(){
   fetch("http://localhost:3001/currency_data").then(function(response) {
    if (response.status >= 400) {
       throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(data => {               
     this.setState({
        data:data 
             })
  });
  }
  //Rendering of the component
  componentWillMount(props) {
    //first call
     this.loadCurrencyFromServer();
     //call after every 20 sec(20000msec)
      this.interval = setInterval(this.loadCurrencyFromServer, 20000);
  }
  
  //before rendering the updates Data check the diff
  shouldComponentUpdate(nextProps,nextState){
        this.CheckPrevNext(this.state.data,nextState.data)   
        return true;
        }
       
       //Checking the diff of prevState and NextState
        CheckPrevNext(prev_data,next_state){
         offer_points_diff=[];
         offer_figure_diff=[];
         for(var index=0;index<next_state.length&&prev_data.length;index++){
          offer_points_diff[index]= (next_state[index]['Offer_big_points'])-(prev_data[index]['Offer_big_points']);
          offer_figure_diff[index]= (next_state[index]['Offer_big_figure'])-(prev_data[index]['Offer_big_figure']);
          console.log(offer_points_diff[index])
         }
        
  }
//render the component data
  render(nextState) { 
    //Icon change
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
        //Data
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
      </tbody>
        </table>
        </div>
      </div>
    );
  }
};
 

export default App;
