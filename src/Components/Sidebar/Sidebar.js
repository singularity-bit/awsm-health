import React,{useEffect, useState,useContext} from 'react'
import * as FaIcons from 'react-icons/fa';
import {SidebarData} from './SidebarData';
import {Link,BrowserRouter} from 'react-router-dom';
import './Sidebar.css';
import {UserContext} from '../../UserContext'



function Sidebar() {
    const [active,setActive]=useState(SidebarData[0].title);
    
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [isMobile, setMobile] = useState(false);

    const userType=useContext(UserContext)
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
    const activeStyle='has-background-info-light';
    const defaultStyle='';

    const [activeClass,setActiveClass]=useState(defaultStyle);

    const clickMenuHandler=name=>{
        setActive(name);
    }
    const activateClass=name=>{
        setActiveClass(name);
    }
    
    const menuItems=
        SidebarData.map((item,index)=>{
        
        
        const isSelected=active===item.title;
                    
                        if(userType.user_type==='pacient'){
                            if(item.title!=='Patients' & item.title!=='Appointments'){
                                return(
                                    <li key={index} 
                                        onClick={()=>{
                                            clickMenuHandler(item.title);
                                            activateClass(activeStyle);
                                            item.className=activeClass;
                                            }}
                                            
                                    >
                                        <Link to={item.path} key={index}                               
                                                className={isSelected && item.className} 
                                            >
                                                <span className="icon-text ">
                                                <span className="icon pl-4">
                                                    <div>
                                                        {item.icon}
                                                    </div>
                                                </span>
                                                    <p className='is-hidden-touch'>{item.title}</p>
                                                </span>           
                                        </Link>                    
                                    </li>      
                                )     
                            }
                            
                        }else if(userType.user_type==='medic'){
                            if(item.title!=='Patients' & item.title!=='Appointments'){
                                return(
                                    <li key={index} 
                                        onClick={()=>{
                                            clickMenuHandler(item.title);
                                            activateClass(activeStyle);
                                            item.className=activeClass;
                                            }}
                                            
                                    >
                                        <Link to={item.path} key={index}                               
                                                className={isSelected && item.className} 
                                            >
                                                <span className="icon-text ">
                                                <span className="icon pl-4">
                                                    <div>
                                                        {item.icon}
                                                    </div>
                                                </span>
                                                    <p className='is-hidden-touch'>{item.title}</p>
                                                </span>           
                                        </Link>                    
                                    </li>      
                                ) 
                            }
                        }else{
                            return(
                                <li key={index} 
                                    onClick={()=>{
                                        clickMenuHandler(item.title);
                                        activateClass(activeStyle);
                                        item.className=activeClass;
                                        }}
                                        
                                >
                                    <Link to={item.path} key={index}                               
                                            className={isSelected && item.className} 
                                        >
                                            <span className="icon-text ">
                                            <span className="icon pl-4">
                                                <div>
                                                    {item.icon}
                                                </div>
                                            </span>
                                                <p className='is-hidden-touch'>{item.title}</p>
                                            </span>           
                                    </Link>                    
                                </li>      
                            ) 
                        }
        })
    return (
        <>
            
            <ul className={!isMobile?"menu-list":"pt-6 is-flex is-flex-direction-row is-justify-content-space-around"}>
                {menuItems}
            </ul>
            
            
        </>
    )
}

export default Sidebar;
