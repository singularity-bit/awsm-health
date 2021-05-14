
import 'bulma/css/bulma.css';
import './App.css';
import React, {useState,useEffect,useContext} from 'react';

import Login from './Pages/Signin/Login/Login';
import Register from './Pages/Signin/Register/Register';
import MainView from './MainView';
import {UserContext,isAuth} from  './UserContext'




function App() {

  const [route,setRoute]=useState('login');
  const [isSignedIn,setSignedIn]=useState(false);
  const [userType,setUserType]=useState('');

  const onRouteChange=(argument)=>{
    setRoute(argument);
  }


  useEffect(()=>{
    console.log("signed",isSignedIn)
  },[isSignedIn])
    return (
      <div className="App ">
        {
          isSignedIn &route==='/'
          ?
          <UserContext.Provider value={userType}>
            <isAuth.Provider value={{isSignedIn,setSignedIn}}>
              <MainView onRouteChange={(argument)=>onRouteChange(argument)} isSignedIn={isSignedIn}/>
            </isAuth.Provider>
            
          </UserContext.Provider>
              
            

          :(
            route==='register'
            ?
            <Register onRouteChange={(argument)=>onRouteChange(argument)}/>
            :
            <Login onRouteChange={(argument)=>onRouteChange(argument)} userType={(argument)=>setUserType(argument)} isAuth={setSignedIn}/>
          )
          
        }
        
      </div>
    ); 
}

export default App;
