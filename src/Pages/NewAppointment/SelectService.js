import React,{useEffect,useState} from 'react'
import axios from 'axios'

function SelectService(props) {
    const {category,selectService,price,closeTag}=props

    const [activeService, setactiveService] = useState([]);
    const [selectServices, setselectServices] = useState([]);

    useEffect(()=>{

        axios.get(`https://powerful-brushlands-81010.herokuapp.com/services-by-category/${category}`).then(res=>{
            console.log("services",[...res.data])    
            setactiveService(res.data)
        });
    },[category])

    useEffect(()=>{
        var sum=0   
        selectServices?.forEach((i)=>{
            
            var price=i.service_price
            var priceInt=parseInt(price,10)
            sum=sum+priceInt
            
        })
        price(sum);
        selectService(selectServices) 
        console.log("selected service",selectServices)
    },[selectServices])

    useEffect(()=>{
        closeTag!==undefined && setselectServices(selectServices.filter(item=> item.service_name!==closeTag))
    },[closeTag])

    const servicesList=
        activeService.length>0 && activeService?.map((item,index)=>{
        return <option key={index} value={item.service_name}>{item.service_name}</option>;
        
    })
    
    const onChangeService=(e)=>{
        
        let servicesCopy=[...activeService];

        //check if the item is selected already in our list
        const result=selectServices?.find((item)=>item.service_name===e)

        //gets item from original array
        const substractResult=servicesCopy.find(item=>item.service_name===e);
        console.log("mutate result",substractResult)

        result===undefined ?setselectServices([...selectServices,substractResult]):
        setselectServices(selectServices.filter(item=> item.service_name!==e))       
    }
    return (
        <div className="field-body">
            <div className="field is-narrow">
                <div className="control">
                    <div className="select is-fullwidth">
                        <select   onChange={(e)=>onChangeService(e.target.value)}>
                            <option selected disabled>Choose service</option>
                            {servicesList}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectService
