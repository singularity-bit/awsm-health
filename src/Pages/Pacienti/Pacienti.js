import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PacientCard from '../../Pages/Pacienti/PacientCard'

//const activeTags=new Set();
function Pacienti() {
    
    
    const [pacienti, setPacienti] = useState([])

    //on page load display all pacienti
    useEffect(()=>{
        axios.get('https://powerful-brushlands-81010.herokuapp.com/pacienti').then(res=>{
        setPacienti(res.data);  
    })
    },[])

    return (
        <div className="container is-fluid">
            <h1 className=' has-text-centered-touch title is-4 has-text-grey-dark'>Pacienti</h1>
                {/*pacienti cards */}

                <div className='columns is-multiline  pt-5'>
                        {pacienti.length>0 && <PacientCard data={pacienti}/>}
                </div>
        </div>
    )
}

export default Pacienti

