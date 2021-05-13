import React,{useState,useEffect} from 'react'
import axios from 'axios'

function SelectSpecialist(props) {
    const {selectedSpecialist,category,idSpecialist}=props

    const [activeSpecialists, setactiveSpecialist] = useState([]);
    

    const specialistList=activeSpecialists.length>0 && activeSpecialists.map((item,index)=>{
        return <option key={index} value={item.nume_medic}>{item.nume_medic} {item.prenume_medic}</option>;
    })

    
    
    useEffect(()=>{

        axios.get(`https://powerful-brushlands-81010.herokuapp.com/specialist-by-category`,{
            params:{
                category:category
            }
        }).then(res=>{
            //pentru a returna doar numele specialistului si a nu se repeta  
            setactiveSpecialist(res.data);
            });
    },[category])

    const onSelectSpecialist=(e)=>{
        selectedSpecialist(e)
        const id=activeSpecialists.filter(item=>{
            const fname=e.split(' ')
            return item.nume_medic===fname[0]
        })
        idSpecialist(id[0].id)
    }

    return (
        <div className="field is-narrow">
            <div className="control">
                <div className="select is-fullwidth">
                    <select  onChange={(e)=>onSelectSpecialist(e.target.value)}>
                    <option selected disabled>Choose specialist</option>
                        {specialistList}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SelectSpecialist
