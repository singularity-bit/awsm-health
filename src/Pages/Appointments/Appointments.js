import React,{useState,useEffect,useContext} from 'react'
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

import {UserContext} from '../../UserContext'



function Appointment(props) {

    const {user}=props

    const [userData,setUserData]=useState('')
    const [data,setData]=useState('');

    useEffect(()=>{

        if(user){
            if(user[0]?.user_type==='medic'){
                axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-medic-appoinments',({
                    params:{
                        id:user[0]?.id
                    }
                })).then(result=>{
                    console.log("appoinments",result.data)
                    setData(result.data)})
            }else if(user[0]?.user_type==='pacient'){
                axios.get('https://powerful-brushlands-81010.herokuapp.com/upcoming-pacient-appoinments',({
                    params:{
                        id:user[0]?.id
                    }
                })).then(result=>{
                    console.log("appoinments",result.data)
                    setData(result.data)})
            }
        }else{
            axios.get('https://powerful-brushlands-81010.herokuapp.com/appoinments').then(result=>{
                console.log("appoinments",result.data)
                setData(result.data)})
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
