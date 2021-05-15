import React,{useEffect,useState,useContext} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import TopNavigation from './Components/TopNavigation/TopNavigation'
import Routes from './Pages/Routes';
import './MainViev.css';
import {UserContext} from './UserContext'


function MainView(props) {
    
    const userType= useContext(UserContext);
    const [isMobile, setMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });


    useEffect(()=>{
        function handleResize() {
            setWindowSize({
                height: window.innerHeight,
                width: window.innerWidth
            }) 
        }
          // Add event listener
        window.addEventListener('resize', handleResize);  
          // Call handler right away so state gets updated with initial window size
        handleResize(); 
          // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    },[]);
 useEffect(()=>{
        if(windowSize.width<800){
            setMobile(true);
        }else setMobile(false)
        
    },[windowSize.width]);

    return (
        <>
        <div className="columns">  
                {!isMobile?
                <aside className="pr-0 column is-narrow menu sidebar">
                    <UserContext.Provider value={userType}>
                    <Sidebar/>
                    </UserContext.Provider>               
                </aside> :
                    <UserContext.Provider value={userType}>
                        <Sidebar/>
                    </UserContext.Provider>    
            }          
                      
            <div className="column">
            <UserContext.Provider value={userType}>
                    <TopNavigation />
                    <Routes isSignedIn={props.isSignedIn}/>
            </UserContext.Provider>
            </div>
                

        </div>
        </>
    )
}

export default MainView;