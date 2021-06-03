import axios from 'axios';
import React,{useState,useEffect} from 'react';


function Register(props){
    const {onRouteChange}=props;
    const [nume, setNume] = useState('')
    const [prenume, setPrenume] = useState('')
    const [signInEmail, setsignInEmail] = useState();
    const [signInPassword, setssignInPassword] = useState();
    const [cnp, setcnp] = useState();
    const [phoneNr, setphoneNr] = useState()
    const [passRepeat, setpassRepeat] = useState()
    const [targetRoute,setTargetRoute]=useState('register');
    const [username, setusername] = useState()

    const [cnpIsValid, setcnpIsValid] = useState(false)
    const [emailIsValid, setemailIsValid] = useState(false)
    const [phoneIsValid, setphoneIsValid] = useState(false)
    const [passwordIsValid, setpasswordIsValid] = useState(false)
    const [numeIsValid, setnumeIsValid] = useState(false)
    const [prenumeIsValid, setprenumeIsValid] = useState(false)

    const [registerMessage,setRegisterMessage]=useState('')
    const [submitIsvalid,setSubmitIsValid]=useState(false)

    //regex pt cnp
    let cnpREGEX=new RegExp(/^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/)
    //regex pt email
    let mailREGEX=new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    //regex pt tel
    let phoneREGEX=new RegExp(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/)

    //regex pt nume
    let nameREGEX=new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)

    const matchEMAIL=()=>{
        let e=mailREGEX.exec(signInEmail)
        if(e!==null){
            setemailIsValid(true)
            return e[0];
        }else{
            setemailIsValid(false)
            return false;
        }
    }
    const matchCNP=()=>{
        let c=cnpREGEX.exec(cnp)
        if(c!==null){
            setcnpIsValid(true);
            return c[0]
        }else {
            setcnpIsValid(false);
            return false;
        }

    }
    const matchPHONE=()=>{
        let p=phoneREGEX.exec(phoneNr)
        if(p!==null){
            setphoneIsValid(true)
            return p[0]
        }else{
            setphoneIsValid(false)
            return false
        }
    }
    const matchPASS=()=>{
        if(passRepeat===signInPassword){
            setpasswordIsValid(true)
        }else{
            setpasswordIsValid(false)
        }
    }
    const matchNume=()=>{
        let n=nameREGEX.exec(nume)
        if(n!==null){
            setnumeIsValid(true)
        }else{
            setnumeIsValid(false)
        }
    }
    const matchPrenume=()=>{
        let p=nameREGEX.exec(prenume)
        if(p!==null){
            setprenumeIsValid(true)
        }else{
            setprenumeIsValid(false)
        }
    }

    const onRegister=(e)=>{
        e.preventDefault();
        username.length>0 &
        numeIsValid &
        prenumeIsValid &
        passwordIsValid  &
        emailIsValid &
        cnpIsValid &&
        axios.post('https://powerful-brushlands-81010.herokuapp.com/register',{
            cnp_pacient:cnp,
            nume_pacient:nume,
            prenume_pacient:prenume,
            username:username,
            tel_nr:phoneNr,
            email:signInEmail,
            password:signInPassword
        }).then(res=>{
            e.preventDefault();
            console.log("res",res.data)
            if(res.data.status>=400){
                setRegisterMessage(res.data.message)
            }else{
                setTargetRoute('login')
            }
            
        }).catch(err=>(err))
    }
    useEffect(()=>{
        setcnp('')
        setNume('')
        setPrenume('')
        setusername('')
        setphoneNr('')
        setsignInEmail('')
        setssignInPassword('')
    },[])
    useEffect(()=>{
        onRouteChange(targetRoute);
    },[targetRoute])

    useEffect(()=>{
        matchCNP();
    },[cnp])

    useEffect(()=>{
        matchEMAIL();
    },[signInEmail])

    useEffect(()=>{
        matchPHONE();
    },[phoneNr])
    useEffect(()=>{
        matchPASS();
    },[passRepeat,signInPassword])

    useEffect(()=>{
        matchNume();
    },[nume])
    
    useEffect(()=>{
        matchPrenume();
    },[prenume])
    return(
            <section className="hero is-fullheight">
                    
                        <div className="column is-4 is-offset-4">
                            <p className="title is-1 has-text-centered has-text-left-mobile pt-6">AWSMHealth</p>
                            <h2 className="subtitle has-text-centered is-size-5 ">Please  register</h2>
                            <form className="box ">
                                <div className="field is-horizontal">                                 
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="field-label is-normal">
                                                <label className="label has-text-left">Nume</label>
                                            </div>
                                            <p className="control is-expanded has-icons-left">
                                                <input onChange={(event)=>setNume(event.target.value)} className={numeIsValid?"input":"input is-danger"} type="text" placeholder="nume"/>
                                                <span className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                                <div className="field-label is-normal">
                                                    <label className="label has-text-left">Prenume</label>
                                                </div>
                                                <p className="control is-expanded has-icons-left">
                                                    <input onChange={(event)=>setPrenume(event.target.value)} className={prenumeIsValid?"input":"input is-danger"} type="text" placeholder="prenume"/>
                                                    <span className="icon is-small is-left">
                                                    <i className="fas fa-user"></i>
                                                    </span>
                                                </p>
                                        </div>
                                    </div>
                                </div>
                                    <div className="field is-horizontal">

                                    <div className="field-body">
                                        <div className="field">
                                                    <div className="field-label is-normal">
                                                        <label className="label has-text-left">CNP</label>
                                                    </div>
                                                    <p className="control is-expanded has-icons-left">
                                                        <input onChange={(event)=>setcnp(`${event.target.value}`)} className={cnpIsValid?"input is-success":"input is-danger"} type="text" placeholder="cnp"/>
                                                        <span className="icon is-small is-left">
                                                        <i className="fas fa-id-card"></i>
                                                        </span>
                                                    </p>
                                                    {
                                                        !cnpIsValid&&
                                                            <p className="help is-danger">
                                                                Wrong CNP
                                                            </p>
                                                        
                                                    }
                                                    
                                            </div>
                                    </div>
                                        
                                    </div>
                                    <div className="field is-horizontal">
                                    <div className="field-body">
                                        <div className="field">
                                                    <div className="field-label is-normal">
                                                            <label className="label has-text-left">Email</label>
                                                    </div>
                                                    <p className="control is-expanded has-icons-left has-icons-right">
                                                        <input onChange={(event)=>setsignInEmail(event.target.value)} className={emailIsValid?"input is-success":"input is-danger"} type="email" placeholder="Email" />
                                                        <span className="icon is-small is-left">
                                                        <i className="fas fa-envelope"></i>
                                                        </span>
                                                        <span className="icon is-small is-right">
                                                        <i className="fas fa-check"></i>
                                                        </span>
                                                    </p>
                                        </div> 
                                        <div className="field">
                                        <div className="field is-expanded">
                                            <div className="field-label is-normal">
                                                <label className="label has-text-left">Numar de telefon</label>
                                            </div>
                                            <div className="field has-addons">
                                                <p className="control">
                                                <a className="button is-static">
                                                    +40
                                                </a>
                                                </p>
                                                <p className="control is-expanded">
                                                <input onChange={(event)=>setphoneNr(event.target.value)} className={phoneIsValid?"input is-success":"input is-danger"} type="tel" placeholder="Nr de telefon"/>
                                                </p>
                                                
                                            </div>
                                            {!phoneIsValid&&
                                            <p className="help is-danger">
                                            This field is required
                                            </p>
                                            }
                                            </div>
                                        </div>
                                    </div>                                           
                                    </div>

                                    <div className="field is-horizontal">
                                        <div className="field-body">
                                        <div className="field">
                                            <div className="field-label is-normal">
                                                <label className="label has-text-left">Username</label>
                                            </div>
                                            <p className="control is-expanded has-icons-left">
                                                <input onChange={(event)=>setusername(event.target.value)} className={numeIsValid?"input":"input is-danger"} type="text" placeholder="username"/>
                                                <span className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                                </span>
                                            </p>
                                            {
                                            registerMessage.length>0&&
                                                            <p className="help is-danger">
                                                                {registerMessage}
                                                            </p>
                                                        
                                                    }
                                        </div>

                                        </div>
                                    </div>

                                    <div className="field">
                                    <div className="field-label is-normal">
                                                            <label className="label has-text-left">Parola</label>
                                                    </div>
                                    <p className="control has-icons-left">
                                        <input onChange={(event)=>setssignInPassword(event.target.value)} className="input" type="password" placeholder="Password"/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                        </span>
                                    </p>
                                    </div>

                                    <div className="field">
                                    <div className="field-label is-normal">
                                                            <label className="label has-text-left">Repetati parola</label>
                                                    </div>
                                    <p className="control has-icons-left">
                                        <input onChange={(event)=>setpassRepeat(event.target.value)} className={passwordIsValid?"input is-success":"input is-danger"} type="password" placeholder="Password"/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                        </span>
                                    </p>
                                    </div>
                                    {!passwordIsValid&&
                                            <p className="help is-danger">
                                            Pass don't match
                                            </p>
                                            }

                                    <div className="field is-horizontal">                                                             
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            {
                                                username.length>0 &numeIsValid &prenumeIsValid &passwordIsValid  &emailIsValid &cnpIsValid?
                                            <button className="button is-block is-fullwidth is-primary mgt-small mx-0" onClick={(e)=>onRegister(e)}>
                                            Register
                                            </button>:
                                            <button className="button is-block is-fullwidth is-warning mgt-small mx-0" disabled>
                                            Please fill all the fields accordingly
                                            </button>
                                            }
                                        </div>
                                    </div>
                            </form>            
                            <p className="has-text-grey has-text-centered">
                                <a 
                                    onClick={()=>setTargetRoute('login')}
                                >Sign In</a> &nbsp;·&nbsp;
                                <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                <a href="../">Need Help?</a>
                            </p>             
                    </div>                     
            </section> 
        );
}
export default Register;