import React,{useEffect,useState,useContext} from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Statistics from '../../Components/Statistics/Statistics';
import {UserContext} from '../../UserContext'

const data={
    nrOfSpecialists:45,
    nrOfVisits:1000,
    nrOfPatients:3000,
    nrOfAppointments:1500
}
function Home() {
    const {nrOfSpecialists,nrOfVisits,nrOfPatients,nrOfAppointments}=data;
    
    return (
        <div className="container is-fluid">
            
            <Statistics nrOfSpecialists={nrOfSpecialists}
                nrOfVisits={nrOfVisits}
                nrOfPatients={nrOfPatients}
                nrOfAppointments={nrOfAppointments}               
            />
            
            
            

            
    </div>
    )
}

export default Home;
