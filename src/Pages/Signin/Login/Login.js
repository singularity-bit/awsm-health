import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { compareElementParent } from '@syncfusion/ej2-base';

function Login (props) {
    const {onRouteChange,userType,isAuth}=props;
    //const [targetRoute,setTargetRoute]=useState('login');
    const [user, setUser] = useState();
    const [username, setusername] = useState('');
    const [signInPassword, setsignInPassword] = useState('');
    const [auth,setAuth]=useState(false)
    const [wrongData,setWrongData]=useState(false)
    
    const onUsernameChange=(event)=>{
        setusername(event.target.value)         
    }
    const onPasswordChange=(event)=>{
        setsignInPassword(event.target.value) 
    }

    const checkCredentials=()=>{
        axios.post('https://powerful-brushlands-81010.herokuapp.com/signin',{
            username:username,
            password:signInPassword
        }).then(result=>{
            
            if(result.data.id){
                setUser(result.data)
                setAuth(true)
                setWrongData(false)
            }else {
                
                setUser()
                setAuth(false)
                setWrongData(true)
            }
            
        }).catch(err=>(err))
    }
      //update in main App user type
    useEffect(()=>{
        if(auth){
            userType(user)
            onRouteChange('/')
            isAuth(auth)
        }
    },[auth])
        return(
            
            <section className="hero is-fullheight">
                    {
                        wrongData?
                        <section class="hero">
                        <div class="hero-body">
                            <p class="title">
                            Woops
                            </p>
                            <p class="subtitle">
                            something is wrong
                            </p>
                        </div>
                        </section>:
                        
                        <div className="column is-4 is-offset-4">
                            <p className="title is-1 has-text-centered has-text-left-mobile pt-6">AWSMHealth</p>
                            <h2 className="subtitle has-text-centered is-size-5 ">Please sign-in or register</h2>
                            <div className="box ">
                                <div className="field">
                                    <label className="label has-text-left">username</label>
                                        <div className="control">
                                            <input onChange={onUsernameChange} className="input" type="text"/>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label has-text-left">Password</label>
                                    <div className="control">
                                        <input onChange={onPasswordChange} className="input" type="password" placeholder="********"/>
                                    </div>
                                    <br></br>
                                    <label className="checkbox">
                                    <input type="checkbox"/>
                                        Remember me
                                    </label>
                                    <br></br>
                                </div>
                                            
                                <button className="button is-block is-fullwidth is-primary mgt-small" onClick={()=>checkCredentials()}>sign in</button>
                            </div>            
                            <p className="has-text-grey has-text-centered">
                                <a 
                                    onClick={()=>onRouteChange('register')} 
                                >Sign Up</a> &nbsp;·&nbsp;
                                <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                <a href="../">Need Help?</a>
                            </p>             
                    </div>
                }
                    
                    
            </section> 
        );
}
export default Login;