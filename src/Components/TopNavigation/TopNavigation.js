import React,{useContext,useEffect} from 'react'
import './TopNavigation.css';
import {UserContext,isAuth} from '../../UserContext'
import {Link,BrowserRouter,Redirect} from 'react-router-dom';

export default function TopNavigation(props) {
    const userType=useContext(UserContext)
    const {isSignedIn,setSignedIn}=useContext(isAuth)

    useEffect(()=>{
        console.log("usertype",userType)
    },[])
    return (
        <nav className="navbar my-4 px-6">
            <div className='navbar-menu '>
                <div className='navbar-end  block'>
                    <div className='navbar-item is-spaced'>
                        <div className='field is-grouped userArea'>
                            <i className=" mr-3 fas fa-user-circle fa-3x "></i>
                            <div className="">
                            <h1 className="title is-6">{Object.values(userType)[3]} {Object.values(userType)[4]}</h1>
                            <p className="subtitle is-6">{Object.values(userType)[2]}</p>
                            </div>       
                        </div>
                        
                    </div>
                            <i className="ml-6 mt-4 fas fa-sign-out-alt fa-2x  is-clickable" onClick={()=>{
                                setSignedIn(!isSignedIn)
                            }}></i>
                </div>
            </div>
            
        </nav>
    )
}
