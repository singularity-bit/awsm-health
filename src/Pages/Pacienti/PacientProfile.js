import React, { useEffect,useState ,useContext} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {UserContext} from '../../UserContext'
import Appointments from '../Appointments/Appointments'
import PacientData from './PacientData'
function PacientProfile({match}) {
    const userType=useContext(UserContext)
    const [userData, setuserData] = useState([])
    const [activeTab,setActiveTab]=useState('profile');
    const [enableInput,setEnableInput] = useState(false)
    const [modal, setmodal] = useState(false)

    let redirect=useHistory();
    useEffect(()=>{
        axios.get(`https://powerful-brushlands-81010.herokuapp.com/pacienti/${match.params.id}`).then(res=>{
            setuserData(res.data); 
        })
    },[])

    const toggleButtons=(value)=>{
        setEnableInput(value);
    }
    const deleteRequest=()=>{
        axios.delete('https://powerful-brushlands-81010.herokuapp.com/delete',{data:{
            id:userData[0].id,
            user_type:userData[0].user_type
        }})
            .then(res=>{
          
            redirect.push('/patients');
            setmodal(!modal);
        })
    }
    return (
        
        <>
            <div className="p-6 py-6">
                <div className="is-flex">
                    <div >
                        <figure className="image is-128x128">
                        <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png"/>
                        </figure>
                    </div>
                    <div className="px-4">
                        <h1 className="is-size-2  has-text-black">
                            { userData[0]?.nume_pacient}  { userData[0]?.prenume_pacient}          
                        </h1>
                        {userType.user_type==='admin' &&
                            <div className="buttons mt-3">
                            <button class="button is-warning" onClick={()=>setEnableInput(!enableInput)}>Modify user data</button>
                            <button class="button is-danger" onClick={()=>setmodal(!modal)} >Delete User</button>
                            </div>
                            
                        }
                        {modal && 
                                <div className="modal is-active">
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                    <section className="modal-card-body">
                                    <p>Are you sure you want to delete { userData[0]?.nume_pacient}  { userData[0]?.prenume_pacient} </p>
                                    </section>
                                    <footer className="modal-card-foot">
                                    <button className="button is-success"onClick={()=>deleteRequest()}>Delete</button>
                                    <button className="button" onClick={()=>setmodal(!modal)}>Cancel</button>
                                    </footer>
                                </div>
                                </div>
                        }
                    </div>
                </div>

                <div className='is-flex is-align-items-center pt-6 pb-3'>      
                    <div className='is-flex sub-menu-tabs '>
                        <a  onClick={()=>setActiveTab('profile')} className={activeTab=='profile'?"px-3 has-text-link has-text-weight-semibold is-pulled-left":"px-3 has-text-grey is-pulled-left"}>Profile info</a>
                        <a  onClick={()=>setActiveTab('appointments')} className={activeTab=='appointments'?"px-3 has-text-link has-text-weight-semibold is-pulled-left":"px-3 has-text-grey is-pulled-left"}>Appointments</a>
                    </div> 
                </div>

                {
                    activeTab=='profile' & userData.length>0 ? <PacientData userData={userData} enableInput={enableInput} toggler={toggleButtons}/>:
                    <></>
                }
                {
                    activeTab=='appointments' & userData.length>0 ? <Appointments user={userData}/>:
                    <></>
                }
                                
            </div>
        </>
        
    )
}

export default PacientProfile
