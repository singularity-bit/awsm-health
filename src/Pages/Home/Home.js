import React from 'react'
import Statistics from '../../Components/Statistics/Statistics';

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
