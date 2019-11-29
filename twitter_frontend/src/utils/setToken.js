/**
 * @author Dharmang Solanki
 * @description This file will check Token. If the token is found it will add it to the header 
 * otherwise it will delete it from the header 
 */

 import axios from 'axios';
 
 export default (authToken) => {
     
     if(authToken){
         
         axios.defaults.headers.common['x-auth-token'] = authToken;
     }
     else{

        delete axios.defaults.headers.common['x-auth-token'];
     }
 }