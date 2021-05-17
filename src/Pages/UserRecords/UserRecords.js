import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../UserContext'

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
    }else if(userType?.user_type==='medic') {
        axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
            params:{
                id:userType.id
            }
        })).then(result=>{
            setupcominAppointments(result.data)})
    }
    
},[])
    return (
        <div>
            
        </div>
    )
}

export default UserRecords
