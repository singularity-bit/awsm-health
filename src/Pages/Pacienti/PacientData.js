import axios from 'axios';
import React,{useState,useEffect} from 'react'

function PacientData(props) {
    const {userData,enableInput,toggler}=props;
    const [updatedData, setupdatedData] = useState();
    const [input, setInput] = useState({
        id:userData[0].id,
        name:`${userData[0].prenume_pacient} ${userData[0].nume_pacient}`,
        cnp:userData[0].cnp_pacient,
        tel_nr:userData[0].tel_nr,
        email:userData[0].email
    })

    useEffect(()=>{

        setupdatedData(JSON.stringify(userData))
    },[])
    
    
    const onSave=()=>{
        const fullname=input.name.split(' ');
        axios.put('https://powerful-brushlands-81010.herokuapp.com/change-user',{
            id:input.id,
            user_type:userData[0].user_type,
            prenume_pacient:fullname[0],
            nume_pacient:fullname[1],
            cnp_pacient:input.cnp,
            tel_nr:input.tel_nr,
            email:input.email,
        }).then(res=>{
            toggler(!enableInput)
        })
    }

    return (
        <div>
            <table className="table">
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

export default PacientData
