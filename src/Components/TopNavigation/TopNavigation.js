import React,{useContext} from 'react'
import './TopNavigation.css';
import {UserContext} from '../../UserContext'
export default function TopNavigation() {
    const userType=useContext(UserContext)

    return (
        <nav className="navbar my-4 px-6">
            <div className='navbar-menu '>
                <div classNam='navbar-start block '>
                    <div className='navbar-item is-spaced'>
                    <p className="control has-icons-left">
                        <input className="input is-info" type="text" placeholder="Search"/>
                        <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                    </div>
                </div>
                
                <div className='navbar-end '>
                    <div className='navbar-item id-spaced'>
                        <div className='field is-grouped'>
                            <p className='control '>
                                <i className="far fa-bell fa-2x pr-5 is-clickable"/>
                                
                            </p>
                            <p className='control dropdown'>
                                <h3 class="title is-5 mr-5">{Object.values(userType)[1]}</h3>
                                <i className="fas fa-user-circle fa-2x  is-clickable"></i>
                                
                            </p>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </nav>
    )
}
