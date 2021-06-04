import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../UserContext'
import AppointmentScheduled from '../../Components/Statistics/UpcomingAppointments/AppointmentScheduled'

function UserRecords() {
    const userType=useContext(UserContext)

    const [upcomingAppointments,setupcominAppointments]=useState('');
    const [finishedAppointments,setFinishedAppointments]=useState([]);
    const [changedAppointments, setstChangedAppointmentsate] = useState('');

useEffect(()=>{
    //shows only active app
    if(userType?.user_type==='pacient'){
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-pacient-appoinments',{
            params:{
                id:userType.id
            }
        }).then(res=> setupcominAppointments(res.data));

        axios.get('https://powerful-brushlands-81010.herokuapp.com/finished-pacient-appointments',{
            params:{
                id:userType.id
            }
        }).then(res=> setFinishedAppointments(res.data));
    }else if(userType?.user_type==='medic') {
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
            params:{
                id:userType.id
            }
        })).then(result=>{
            setupcominAppointments(result.data)})

            axios.get('https://powerful-brushlands-81010.herokuapp.com/finished-medic-appointments',({
                params:{
                    id:userType.id
                }
            })).then(result=>{
                setFinishedAppointments(result.data)})
    }
    
},[])
    return (
        <div>
            <p className="container has-text-centered title is-3">Your appointments</p>
            <div className="container">
                <div className="columns is-mobile">
                    <div className="column ">
                        <nav className="panel is-info  mx-0">
                        <p className="panel-heading has-background-success">
                            <h3 class="subtitle is-3 has-text-white">Upcoming appointments</h3>
                        </p>
                            {
                                upcomingAppointments.length>0?
                                <AppointmentScheduled data={upcomingAppointments} result={setstChangedAppointmentsate}/>:
                                <></>
                            }
                        </nav>
                    </div>
                    <div className="column">
                    <nav className="panel is-info  mx-0">
                        <p className="panel-heading">
                        <h3 class="subtitle is-3 has-text-white">Finished appointments</h3>
                        </p>
                            {
                                finishedAppointments.length>0?
                                <AppointmentScheduled data={finishedAppointments} result={setstChangedAppointmentsate}/>:
                                <></>
                            }
                    </nav>   
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default UserRecords
