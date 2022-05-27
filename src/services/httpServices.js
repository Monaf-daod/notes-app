import axios from 'axios'
import { toast } from 'react-toastify';


// this line you must write it in the config file to configure http requests that need authentication with jwt token
// but the right way is writing method setJwt in http file and getJwt method in auth file and they talks bi-directional 

//axios.defaults.headers.common['x-auth-token'] = jwt ;


axios.interceptors.response.use(null, error =>{

  const  expictedError = error.response && error.response.status>=400 && error.response.status<500 ;
    if(!expictedError){
        console.log("Logging the error ", error);
        toast.error("An unexpected Error Occurred ...")
    }
    console.log('hello from http service');
    return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put:axios.put,
    delete:axios.delete 
}