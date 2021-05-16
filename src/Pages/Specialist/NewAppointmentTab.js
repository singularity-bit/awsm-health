import React,{useContext,useState,useEffect} from 'react'


import SelectService from '../NewAppointment/SelectService'
import SelectDate from '../NewAppointment/SelectDate'
import {UserContext} from '../../UserContext'
import moment from 'moment'
import axios from 'axios'
import { useHistory } from "react-router-dom";
function NewAppointmentTab(props) {
    const history = useHistory();
    const userType=useContext(UserContext)

    const {userData}=props

    const [selectSpecialist, setselectSpecialist] = useState(`${userData.nume_medic} ${userData.prenume_medic}`)
    const [idSpecialist,setIdSpecialist]=useState(userData.id)
    const [selectedServices, setselectedServices] = useState([])

    const [pacientNume,setPacientNume]=useState();
    const [pacientPrenume, setpacientPrenume] = useState();


    const [deleteService, setdeleteService] = useState();


    const [totalPrice, settotalPrice] = useState(0)
    const [calendarisOpened, setcalendarisOpened] = useState(false)

    const [selectedDate,setSelectedDate]=useState([]);
    const [savedDate,setSavedDate]=useState([]);

    const formatedDateSQLstart_date=moment(savedDate[0]?.start_date).format("YYYY-MM-DD HH:mm:ss");
    const formatedDateSQLend_date=moment(savedDate[0]?.end_date).format("YYYY-MM-DD HH:mm:ss");
    const formatedDateDisplay=moment(savedDate[0]?.start_date).format('MMMM Do YYYY, h:mm:ss');
    const handleDatePick=()=>{
        setcalendarisOpened(!calendarisOpened)
    }

    const onMakeAppointment=()=>{

        if(userType?.user_type==='admin'){
            const splitName=selectSpecialist.split(' ');
            const nume=splitName[0];
            const prenume=splitName[1];

            axios.post('https://powerful-brushlands-81010.herokuapp.com/make-appointment',{
                title:savedDate[0].title,
                status:"active",
                nume_medic:nume,
                prenume_medic:prenume,
                nume_pacient:pacientNume,
                prenume_pacient:pacientPrenume,
                selectedServices:selectedServices,
                totalPrice:totalPrice,
                start_date:formatedDateSQLstart_date,
                end_date:formatedDateSQLend_date
            }).then(res=>{
                if(res.status>=200& res.status<300){
                    history.push("/");
                }
            })
        }else if(userType?.user_type==='pacient'){
            const splitName=selectSpecialist.split(' ');
            const nume=splitName[0];
            const prenume=splitName[1];
            axios.post('https://powerful-brushlands-81010.herokuapp.com/make-appointment',{
                title:savedDate[0].title,
                status:"active",
                nume_medic:nume,
                prenume_medic:prenume,
                id_pacient:userType.id,
                selectedServices:selectedServices,
                totalPrice:totalPrice,
                start_date:formatedDateSQLstart_date,
                end_date:formatedDateSQLend_date
            }).then(res=>{
                
                if(res.status>=200& res.status<300){
                    history.push("/");
                }
            })
        }      
    }

    useEffect(()=>{
        setPacientNume(userType.nume_pacient);
        setpacientPrenume(userType.prenume_pacient)
    },[])

    
    return (
        <article className='panel is-primary my-6 '>
            <p class="panel-heading">
                Create new appointment
            </p>
            {userType.user_type==='admin' &&
                <>
            <p className='panel-block'>
                <p className='control'>
                <div className="field is-horizontal ">
                <div className="field-label"><label className="label">Nume</label></div>
                <div className="field-body">
                <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input class="input " type="text" placeholder="nume" onChange={(e)=>setPacientNume(e.target.value)}/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                        </span>                    
                    </p>
                </div>


                <div className="field-label"><label className="label">Prenume</label></div>
                <div className="field-body">
                <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input class="input " type="text" placeholder="prenume" onChange={(e)=>setpacientPrenume(e.target.value)}/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                        </span>                    
                    </p>
                </div>
                </div>
                </div>
                </div>
                </p>
                
            </p>
            <p className='panel-block'>
                <p className='control'>
                <div className="field is-horizontal ">
                <div className="field-label"><label className="label">email</label></div>
                <div className="field-body">
                <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input class="input " type="email" placeholder="Email"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>


                <div className="field-label is-normal">
                    <label class="label">Nr</label>
                    </div> 
                    <div className="field is-expanded">
                    <div className="field has-addons">
                    
                    
                        <p className="control">
                        <a className="button is-static">
                            +44
                        </a>
                        </p>
                        <p className="control is-expanded">
                        <input className="input" type="tel" placeholder="Your phone number"/>
                        </p>
                    </div>                 
                    </div>
                </div>
                </div>
                </p>
                
            </p>
            </>
            }
            
            
            <p className='panel-block'>
                <p className='control'>
                <div className="field is-horizontal ">
               
                <div className="field-body">

                <p className='control'>
                    <div className='field is-horizontal'>
                    <div className="field-label is-normal">
                        <label className="label">Choose service</label>
                    </div>
                    <div className="field-body">
                    { selectSpecialist.length>0 && 
                            <SelectService selectService={setselectedServices} category={userData.category} price={settotalPrice} closeTag={deleteService}/>
                        }
                    </div>
                    </div> 
                </p>
                </div>
                </div>
                </p>              
            </p>

            <p className='panel-block'>
                <p className='control'>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Select date</label>
                        </div>
                        <div className="field-body">
                            <div className="field is-narrow">
                                <div className="control">
                                    {selectedServices.length>0?
                                    <button className="button" onClick={()=>handleDatePick()}>
                                    <span className="icon">
                                    <i className="fas fa-calendar-alt"></i>
                                    </span>
                                    <span>click me</span>
                                </button>:
                                <button className="button is-warning" onClick={()=>handleDatePick()} disabled>
                                    <span className="icon">
                                    <i className="fas fa-calendar-alt"></i>
                                    </span>
                                    <span>select service...</span>
                                </button>
                                }
                                
                                {calendarisOpened  && 
                                        <div className="py-5">  
                                                {idSpecialist? <SelectDate chosenDate={setSelectedDate} idSpecialist={idSpecialist}/>:
                                                <>loading... </>
                                                
                                            }
                                            <div className="my-4">
                                            {selectedDate.length>0 ?
                                                <button className="button is-success" onClick={()=>{
                                                        selectedDate.length>0 && setSavedDate(selectedDate);
                                                        setcalendarisOpened(!calendarisOpened);
                                                        }}>Save changes</button>:
                                                <button className="button is-warning" onClick={()=>{
                                                    selectedDate.length>0 && setSavedDate(selectedDate);
                                                    setcalendarisOpened(!calendarisOpened);
                                                    }} disabled>Select date</button>
                                            }
                                            <button className="button mx-3" onClick={()=>setcalendarisOpened(!calendarisOpened)}>Cancel</button>
                                            </div>
                                            <button className="modal-close is-large" aria-label="close" onClick={()=>setcalendarisOpened(!calendarisOpened)}></button>
                                        </div>  
                                } 
                                </div>
                            </div>
                        </div>

                        
                    </div>
                    
                </p>                          
            </p>
            
            {
                savedDate.length>0&& 
                    <p className='panel-block'>
                        <p className='control'>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Subject</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                <div className="control">
                                    <input className="input is-static" type="text" placeholder={`${savedDate[0]?.title} ${formatedDateDisplay}`} readOnly/>
                                </div>
                                </div>
                            </div>
                            </div>
                        </p>
                        
                    </p>       
            }
                    
            <p className='panel-block'>
            <p className='control'>
            <div className="field is-horizontal">
                
                <div className="field-body">
                    <div className="field ">
                    <div className="control">
                        {
                            userType.user_type==='admin'?
                            (
                            selectSpecialist?.length>0 &
                            selectedServices?.length>0 &
                            pacientNume?.length>0 &
                            pacientPrenume?.length>0 &
                            savedDate?.length>0 ?
                            <button className="button is-primary" onClick={()=>onMakeAppointment()}>
                            Make appointment
                            </button> :
                            <button className="button is-warning " disabled>
                            Please fill all fields
                            </button>
                            ):(
                                selectSpecialist?.length>0 &
                                selectedServices?.length>0 &
                                savedDate?.length>0 ?
                                <button className="button is-primary" onClick={()=>onMakeAppointment()}>
                                Make appointment
                                </button>
                                :
                                <button className="button is-warning " disabled>
                                Please fill all fields
                                </button>
                            )
                            
                        }
                        
                    </div>
                    </div>
                </div>
                <div className="field-label is-narrow">
                    Total de plata: {<span>{totalPrice}</span>} 
                    <div className="tags m-3">
                    {selectedServices?.map((item,index)=>{
                        return <span key={index} className="tag is-info is-light is-medium"> 
                        {item.service_name}
                        <button class="delete is-small " onClick={()=>setdeleteService(item.service_name)}></button>
                        </span> 
                        })
                    }
                    </div>
                    
                </div>
                </div>
            </p>          
            </p>
            
        </article>
    )
}

export default NewAppointmentTab
