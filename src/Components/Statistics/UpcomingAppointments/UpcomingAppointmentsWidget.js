import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import AppointmentScheduled from './AppointmentScheduled'
import {UserContext} from '../../../UserContext'
import './UpcomingAppointmentsWidget.css'

function UpcomingAppointmentsWidget() {
    const userType=useContext(UserContext)

    const [appointments,setAppointments]=useState('');
    const [changedAppointments, setstChangedAppointmentsate] = useState('')
    
    
   //shows only active app
useEffect(()=>{
    if(userType?.user_type==='pacient'){
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-pacient-appoinments',{
            params:{
                id:userType.id
            }
        }).then(res=> setAppointments(res.data));
    }else if(userType?.user_type==='medic') {
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
            params:{
                id:userType.id
            }
        })).then(result=>{
            setAppointments(result.data)})
    }else{
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-appoinments').then(result=>{
            
            setAppointments(result.data)})
    }
    
},[])

useEffect(()=>{
    if(userType?.user_type==='pacient'){
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-pacient-appoinments',{
            params:{
                id:userType.id
            }
        }).then(res=> setAppointments(res.data));
    }else if(userType?.user_type==='medic') {
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
            params:{
                id:userType.id
            }
        })).then(result=>{
            setAppointments(result.data)})
    }else{
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-appoinments').then(result=>{
           
            setAppointments(result.data)})
    }
    
},[changedAppointments])       

    return (
        appointments.length>0?
        <div className='container'>
            <nav className="panel is-info  mx-0">
                <p className="panel-heading">
                    Upcoming Appointments
                </p>
                
                <AppointmentScheduled data={appointments} result={setstChangedAppointmentsate}/>
                
                
            </nav>
        </div>
        :
        <></>
        
    )
}

export default UpcomingAppointmentsWidget
