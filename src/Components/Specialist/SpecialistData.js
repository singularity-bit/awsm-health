import React,{useEffect, useState} from 'react'
import '../Specialist/SpecialistData.css'
import axios from 'axios'

function SpecialistData(props) {
    const {userData,enableInput,toggler}=props;
    const [activeTab, setActiveTab] = useState('info');
    const [servicii,setServicii]= useState([])
    const [input, setInput] = useState({
        id:userData[0].id,
        name:`${userData[0].prenume_medic} ${userData[0].nume_medic}`,
        category:userData[0].category,
        cnp:userData[0].cnp_medic,
        tel_nr:userData[0].tel_nr,
        email:userData[0].email
    })

    useEffect(()=>{
        axios.get(`https://powerful-brushlands-81010.herokuapp.com/medic-services/${userData[0].id}`)
        .then(result=>{
            setServicii(result.data);
           
        });
    },[])
    //servicii
    
    const onSave=()=>{
        const fullname=input.name.split(' ');
        axios.put('https://powerful-brushlands-81010.herokuapp.com/change-user',{
            id:input.id,
            user_type:userData[0].user_type,
            category:input.category,
            prenume_medic:fullname[0],
            nume_medic:fullname[1],
            cnp_medic:input.cnp,
            tel_nr:input.tel_nr,
            email:input.email,
        }).then(res=>{
            
            toggler(!enableInput)
        })
    }
    const personalInfoList=()=>{
        return(
            <tbody >
                <tr>
                    <td>Name</td>
                    <th align="right"><input className={enableInput?"input":"input is-static"} 
                            onChange={(e)=>setInput({
                                ...input,
                                name:e.target.value
                            })} 
                            value={input.name} type="text" />
                        </th>
                </tr>
                <tr>
                    <td>Category</td>
                    <th align="right"><input className={enableInput?"input":"input is-static"} 
                            onChange={(e)=>setInput({
                                ...input,
                                category:e.target.value
                            })} 
                            value={input.category} type="text"/>
                        </th>
                </tr>
                <tr>
                    <td>CNP</td>
                    <th align="right"><input className={enableInput?"input":"input is-static"} 
                            onChange={(e)=>setInput({
                                ...input,
                                cnp:e.target.value
                            })} 
                            value={input.cnp} type="text"/>
                        </th>
                </tr>
                <tr>
                    <td>Phone nr</td>
                    <th align="right"><input className={enableInput?"input":"input is-static"} 
                            onChange={(e)=>setInput({
                                ...input,
                                tel_nr:e.target.value
                            })} 
                            value={input.tel_nr} type="text"/>
                        </th>
                </tr>
                <tr>
                    <td>Email</td>
                    <th align="right"><input className={enableInput?"input":"input is-static"} 
                            onChange={(e)=>setInput({
                                ...input,
                                email:e.target.value
                            })} 
                            value={input.email} type="text"/>
                        </th>
                </tr>
            </tbody>
            
        )
    }

    const serviceList=servicii.length>0 && servicii?.map((item,index)=>{
        return(
                <tr>
                    <td>{item.service_name}</td>
                    <th align="right">{item.service_price}</th>
                </tr>
            
            
        ) 
    })

    return (
        <div>
            <div className="tabs">
                <ul>
                    <li onClick={()=>setActiveTab('info')} className={activeTab==='info'?"is-active":""}><a>Personal info</a></li>
                    <li onClick={()=>setActiveTab('price')} className={activeTab==='price'?"is-active":""}><a>Preturi</a></li>

                </ul>
            </div>

            <table className="table">
                { activeTab==='info'?personalInfoList():<tbody>{serviceList}</tbody>}
            </table>
            {enableInput && 
                <div class="buttons">
                    <button class="button is-primary" onClick={()=>onSave()} >Save changes</button>
                    <button class="button is-link" onClick={()=>toggler(!enableInput)}>Discard</button>
                </div>
            }
        </div>
    )
}

export default SpecialistData
