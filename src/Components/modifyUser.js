import axios from 'axios'
const modifyUser=(method,id,type)=>{
    if(method==='delete'){
        axios.post('https://powerful-brushlands-81010.herokuapp.com/delete',{
            id:id,
            type:type,
            method:method
        }).then(res=>console.log(res))
    }else if (method==='update'){
        axios.put('https://powerful-brushlands-81010.herokuapp.com/change-user',{
            id:id,
            type:type,
            method:method
        }).then(res=>console.log(res))
    }
}
export default modifyUser