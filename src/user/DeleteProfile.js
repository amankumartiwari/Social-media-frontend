import React from 'react'
import {isAuthenticated,signout} from '../auth'
import {remove} from './apiUser'
import { Redirect } from 'react-router-dom'
class DeleteProfile extends React.Component{

    state={
        redirect:false
    }

 deleteAccount= ()=>{
    const token=isAuthenticated().token;
    const userId=this.props.userId;

    remove( userId,token )
    .then(data=>{
        if(data.error){
            console.log(data.error);
        }else{
             signout(()=>{
                 console.log('user is deleted')
             }) 
             this.setState({redirect:true});
        }
    })

 }

    confirmDelete=()=>{
       let answer =window.confirm("DO YOU WANT TO DELETE YOUR ACCOUNT??")
       if(answer){
           this.deleteAccount();
       }
    }

    render(){

         if(this.state.redirect){
             return <Redirect  to="/" />
         }

        return(
            <button onClick={this.confirmDelete} className="btn btn-raised btn-danger">
                    DELETE PROFILE
                  </button>
        )
    }

}
export default DeleteProfile;