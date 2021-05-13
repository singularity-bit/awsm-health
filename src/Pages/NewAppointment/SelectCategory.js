import React,{useEffect,useState} from 'react'
import axios from 'axios'

function SelectCategory(props) {
    const {selectedCategory}=props;
    const [categories,setCategories]=useState([])

    useEffect(()=>{
        axios.get(`https://powerful-brushlands-81010.herokuapp.com/categories`).then(res=>{
        //pentru a returna doar categoriile specialistilor si a nu se repeta      
        setCategories(Array.from(new Set(res.data.map(item=>{return item.category}))))
        })
    },[])

    const categoryList=categories.length>0 && categories?.map((item,index)=>{  
        return (
        <option key={index} value={item}>{item}</option>
        )
})
    return (
        <div className="field is-narrow">
            <div className="control">
                <div className="select is-fullwidth">
                    <select onChange={(e)=>selectedCategory(e.target.value)}>
                    <option selected disabled>Choose category</option>
                        {categoryList}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SelectCategory
