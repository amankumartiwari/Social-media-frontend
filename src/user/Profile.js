import React from "react";
import {isAuthenticated} from '../auth/index'
import { Redirect } from "react-router-dom";
class Profile extends React.Component {
  
  constructor(){
      super();
      this.state={
          user:"",
          redirectToSignin:false
      }
  }
  
  componentDidMount(){
   const userID = this.props.params.match.userId;

   fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`,{
       method:"GET",
       headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
       }
   })
   .then( response =>{
       return response.json()
   })
   .then(data=>{
       if(data.error){
          this.setState({redirectToSignin:true})
       }else{
           this.setState({user:data})
       }
   })
  }


    render() {
const redirectToSignin =this.state.redirectToSignin
     if(redirectToSignin){
         return <Redirect to="/signin"/>
     }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Profile </h2>
        <p>Hello {isAuthenticated().user.name}</p>
        <p>Email: {isAuthenticated().user.email}</p>
      </div>
    );
  }
}

export default Profile;
 