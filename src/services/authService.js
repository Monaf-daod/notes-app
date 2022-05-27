import http from "./httpServices"
import config from '../config.json'

const tokenKey = "token";

export const LogIn = async (email,password) => {
    const {data} = await http.post(config.apiLogInEndPoint,{email,password})
    localStorage.setItem(tokenKey,data.token)
}

export const LogInWithJwt=(jwt)=>{
    localStorage.setItem(tokenKey,jwt)
}

export const LogOut =()=>{
    localStorage.removeItem(tokenKey)
}

export const getCurrentUser =()=>{
    //you should read the cookie (jwt code) and decode it and return an object that represents the current user
    try {
        const token = localStorage.getItem(tokenKey) 
        return token
    }
    catch(ex) {
        return null
    }
}

export default { 
    LogIn,
    LogInWithJwt,
    LogOut,
    getCurrentUser

}