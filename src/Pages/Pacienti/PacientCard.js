import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
//import './SpecialistCard.css'


function PacientCard(props) {
    //hooks
    const {data}=props;


    const pacienti=data?.map((item)=>{
        const {prenume_pacient,nume_pacient,id}=item;
        return(
            <div className='column is-one-quarter' key={id}>
                    <div className='block'>
                        <Link to={`pacient/${id}`}>
                            <div  className="card">
                                <div className="card-content ">
                                    <div className="is-flex-direction-column is-justify-content-center">
                                    <div className="avatar pb-4">
                                        <figure className="image is-rounded is-96x96">
                                        <img className='is-rounded' src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="card-details has-text-centered">
                                        <p className="title is-4">{prenume_pacient} {nume_pacient}</p>
                                        
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                    </div>
            </div>    
        );
    })
    return (
        <>      
            {pacienti}
        </>
    )
}

export default PacientCard
