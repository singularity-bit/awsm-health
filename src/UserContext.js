import {createContext} from 'react'

export const UserContext=createContext(null)
export const isAuth=createContext({isSignedIn:false,setSignedIn:()=>{}})
export const UserAppointments=createContext(null) 