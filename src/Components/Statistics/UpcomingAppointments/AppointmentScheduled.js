import React,{useState,useEffect, useContext} from 'react'
import './AppointmentScheduled.css'
import axios from 'axios'
import {UserContext} from '../../../UserContext'
function AppointmentScheduled(props) {
    //props
    const {data,result}=props;
    const userType=useContext(UserContext)
                
    const options = { month: 'long', day: 'numeric' };
    const optionsHour={hour:'numeric',minute: 'numeric'}
    //hooks
    //hook for header pressed
    const [isOpen,setOpen]=useState([]);

    //hook to change arrow icon when pressed
    const [isActive,setActive]=useState();

    const [appointmentStatus, setappointmentStatus] = useState();

    useEffect(()=>{
        console.log("change status",appointmentStatus)
        //updates appoinment list with status of app
        appointmentStatus && axios.post('https://powerful-brushlands-81010.herokuapp.com/update-appointments',appointmentStatus).then(res=>result(res.data));
    },[appointmentStatus])

    useEffect(()=>{
        
        //pentru a pune statusul la header (isopen/)
        data.length>0 && data.forEach(item=>{
            setOpen(isOpen=>[...isOpen,{id:item.id,open:false}])
        })
    },[])
    

    const onchangeStatus=(id,type)=>{
            setappointmentStatus({id:id,status:type});
    }


    const subMenu=(item)=>{
        const{title,prenume_medic,start_date,id}=item;
        const time=new Date(start_date).toLocaleTimeString(undefined, optionsHour)
        return (           
            <ul>
                <li className="my-4 ">
                    <div className="is-flex is-flex-direction-row is-align-content-stretch ">
                        <p className="menu-label is-size-4 has-text-weight-bold has-text-grey-darker pr-3">
                            {time}
                        </p>
                        <div className="is-flex is-flex-direction-column pl-4 mb-5">
                            <p className="is-size-6 has-text-weight-normal has-text-grey-light">{title}</p>
                            <p className="is-size-6 has-text-weight-bold has-text-grey-darker">{prenume_medic}</p>
                        </div>
                        <div className="container">
                            <a className="is-pulled-right pl-5 has-text-danger" onClick={()=>onchangeStatus(id,'canceled')}><i class="far fa-calendar-times fa-2x "></i></a>
                            
                            {userType.user_type==='admin'&&
                                <a className="is-pulled-right pr-5 has-text-success" onClick={()=>onchangeStatus(id,'finished')}><i class="fas fa-check fa-2x"></i></a>}                               
                        </div>
                        
                    </div>
                </li>
            </ul>      
        )
    }

    const header =(item)=>{
        const {start_date,id}=item;
        const date= new Date(start_date).toLocaleDateString(undefined, options);

        
        
        return(
            <a className='panel-block px-5'>
            <li>
                <a className={isOpen?isActive:''}
                    onClick={()=>{                       
                        setActive('is-active');
                        let headers=[...isOpen];
                        let header={...headers[id],open:!headers[id]?.open};
                        headers[id]=header;
                        setOpen(headers)
                        }
                    }
                >
                    <h1 className="has-text-weight-semibold has-text-grey-light is-capitalized">{date}</h1>
                    
                </a>
                {
                    isOpen[id]?.open && subMenu(item)
                }

            </li>
            </a>  
        )
    }

    return (
        data.length>0 && data.map(item=>{
            return (
                <div key={item.id}>
                    {
                        
                        header(item)
                    }                   
                </div>         
            )
        })
    )
}

export default AppointmentScheduled


