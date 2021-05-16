import React from 'react'
import { Link } from 'react-router-dom';
import './SpecialistCard.css'
function SpecialistCard(props) {

    //hooks

    const {data,filter}=props;

    const displaySpecialist=data?.filter((item)=>{    
        
        return filter?.size===0?data:filter?.has(item.category)
    })
    



    const specialistList=displaySpecialist?.map((item)=>{
        const {prenume_medic,nume_medic,category,id}=item;
        return(
            <div className='column is-one-quarter' key={id}>
                    <div className='block'>
                        <Link to={`medic/${id}`}>
                            <div  className="card">
                                <div className="card-content ">
                                    <div className="is-flex-direction-column is-justify-content-center">
                                    <div className="avatar pb-4">
                                        <figure className="image is-rounded is-96x96">
                                        <img className='is-rounded' src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="card-details has-text-centered">
                                        <p className="title is-4">{prenume_medic} {nume_medic}</p>
                                        <p className="subtitle is-6 has-text-link">{category}</p>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                    </div>
            </div>
            
            
        )
    })


    return (
        <>      
            
            {specialistList}
        </>
    )
}

export default SpecialistCard
