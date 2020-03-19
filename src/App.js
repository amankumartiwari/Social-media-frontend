import React, {Component} from 'react';
import axios from 'axios'
import Loading from './Loading'
class App extends Component{

   constructor(props){
        super(props);

      this.state = {
          users:[],
          loading:false
      };
   }

   getUser(){
     this.setState({
       loading:true
     })
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then( response =>{
       this.setState({
         users :response.data.results,
         loading:false
       })
    });
   }

componentWillMount(){
 this.getUser();
}   


render(){
  return(
      <div>
      { !this.state.loading ?  
         this.state.users.map( (user)=>( 
          <div>
               <h1> {user.name.first} </h1>
               <p> {user.email} </p>
               <hr/>
          </div>
   ) ) : (<Loading/>) }
      </div>
  ); 
      
}

}
export default App;