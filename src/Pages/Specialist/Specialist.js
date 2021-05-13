import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import SpecialistCard from '../../Components/SpecialistCard/SpecialistCard'
import useComponentVisible from '../../Components/useComponentVisible'
import DropDown from '../../Components/DropDown/DropDown'

//const activeTags=new Set();
function Specialist() {
    
    
    const [specialists, setspecialists] = useState([])
    const specialistTypes=Array.from(new Set(specialists?.map(item=>{return item.category})))
    //hooks for filtering
    const [listOfFilters,setListOfFilters]=useState(new Set());

    const filterItems=data=> {  
        setListOfFilters(new Set([...listOfFilters,data]));
    }

    //on page load display all specialist
    useEffect(()=>{
        removeAllFilters();
        axios.get('https://powerful-brushlands-81010.herokuapp.com/specialists').then(res=>{
        setspecialists(res.data)
        
    })
    },[])

    const displayTags=Array.from(listOfFilters).map((item,index)=>{
        return(
            item!==undefined && 
            <span key={index} className="tag">
                {item}
            <button className="delete is-small" onClick={()=>{
                removeCurrentFilter(item)
            }}></button>
            </span>
        )
    })

    const removeAllFilters=()=>{
        setListOfFilters(new Set());
    }
    const removeCurrentFilter=(item)=>{
        setListOfFilters(prev=>new Set([...prev].filter(x=>x!==item)));
    }
    return (
        <div className="container is-fluid">
            <h1 className=' has-text-centered-touch title is-4 has-text-grey-dark'>Specialist</h1>

            {/*dropdown */}
                
                <DropDown tags={specialistTypes} selectedTags={filterItems}/>
                
                <div className="tags my-3">
                    {displayTags}

                    {/*if there is more than 1 active filter then render remove all filter button*/}
                    {listOfFilters.size>=2 &&
                        <span className="tag is-warning">
                        Remove all filters
                        <button className="delete is-small" onClick={()=>{
                            removeAllFilters()
                        }}></button>
                    </span>
                    }
                    
                </div> 
                

                {/*specialist cards */}

                <div className='columns is-multiline  pt-5'>
                    {specialists.length>0 && <SpecialistCard data={specialists} filter={listOfFilters}/>} 
                </div>
        </div>
    )
}

export default Specialist
