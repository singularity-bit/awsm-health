import React,{useState,useEffect} from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';


function Appointment(props) {

    const {user}=props

    const [data,setData]=useState('');

    useEffect(()=>{

        if(user){
            if(user[0]?.user_type==='medic'){
                axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
                    params:{
                        id:user[0]?.id
                    }
                })).then(res=>{
                    const appointment=res.data.map(item=>{
                        const {id,nume_medic,prenume_medic,nume_pacient,prenume_pacient,title,start_date,end_date,status}=item
                        return {
                            id:id ,
                            nume_pacient: nume_medic,
                            prenume_medic: prenume_medic,
                            nume_pacient: nume_pacient,
                            prenume_pacient: prenume_pacient,
                            title: title,
                            startDate: start_date,
                            endDate: end_date,
                            status: status
                        }
                    })
                    
                    setData(appointment)})
            }else if(user[0]?.user_type==='pacient'){
                axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-pacient-appoinments',({
                    params:{
                        id:user[0]?.id
                    }
                })).then(res=>{
                    const appointment=res.data.map(item=>{
                        const {id,nume_medic,prenume_medic,nume_pacient,prenume_pacient,title,start_date,end_date,status}=item
                        return {
                            id:id ,
                            nume_pacient: nume_medic,
                            prenume_medic: prenume_medic,
                            nume_pacient: nume_pacient,
                            prenume_pacient: prenume_pacient,
                            title: title,
                            startDate: start_date,
                            endDate: end_date,
                            status: status
                        }
                    })
                    ("appoinments",res.data)
                    setData(appointment)})
            }
        }else{
            axios.get('https://powerful-brushlands-81010.herokuapp.com/appoinments').then(res=>{
                const appointment=res.data.map(item=>{
                    const {id,nume_medic,prenume_medic,nume_pacient,prenume_pacient,title,start_date,end_date,status}=item
                    return {
                        id:id ,
                        nume_pacient: nume_medic,
                        prenume_medic: prenume_medic,
                        nume_pacient: nume_pacient,
                        prenume_pacient: prenume_pacient,
                        title: title,
                        startDate: start_date,
                        endDate: end_date,
                        status: status
                    }
                })
                setData(appointment)})
        }
        
       
    },[])

    return (
        <>
            {data? 
                <Scheduler data={data}>
                    <ViewState defaulturrentDate={Date.now()}/>
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                </Scheduler>
                :
                <>data is loading...</>
            }
            
        </>
    )
}

export default Appointment
