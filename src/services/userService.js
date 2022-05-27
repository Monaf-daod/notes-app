import http from "./httpServices"
import config from '../config.json'

export const SignUp = async (email,password,name)=>{
 
    return await http.post(config.apiCreateUserEndPoint,{email,password,name})
}

export default {
    SignUp
}