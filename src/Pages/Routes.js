import React,{useContext} from 'react';
import {Switch,Route} from 'react-router-dom';

//components
import Home from './Home/Home'
import Appointment from './Appointments/Appointments'
import Messages from './Messages/Messages'
import Pacienti from './Pacienti/Pacienti'
import PacientProfile from './Pacienti/PacientProfile'
import Specialist from './Specialist/Specialist'
import NewAppointment from './NewAppointment/NewAppointment'
import Login from './Signin/Login/Login'
import SpecialistProfile from './Specialist/SpecialistProfile'
import Register from './Signin/Register/Register'
import {UserContext} from '../UserContext'
import NotFound from '../Components/NotFound/NotFound'
import UserRecords from  '../Pages/UserRecords/UserRecords'

const  Routes=(props)=>{
    const userType=useContext(UserContext)
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            userType.user_type === 'admin'
            ? <Component {...props} />
            : <NotFound/>
        )} />
    )
    return (
            <Switch>
                
                        <Route exact path='/' render={(props)=>(
                            <Home {...props}/>
                        )}/>
                        <Route  path='/appointments' render={(props)=>(
                            <Messages {...props}/>
                        )} component={Appointment}/>
                        <PrivateRoute  path='/patients' component={Pacienti}/>
                        <Route  path='/specialist' render={(props)=>(
                            <Specialist {...props}/>
                        )}/>

                        <Route  path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>

                        <Route path='/new-appointment' component={NewAppointment}/>
                        <Route path='/records' component={UserRecords}/>
                        <Route path='/medic/:id'  component={SpecialistProfile}/>
                        <PrivateRoute path='/pacient/:id'  component={PacientProfile}/>        
            </Switch>
        
    )
}

export default Routes

