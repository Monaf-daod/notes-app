import { useState, useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import auth from './services/authService' 
import Main from './Components/Main'
import SwitchSign from './Components/SwitchSign'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


function App() {

  const [user, setUser] =  useState();

  useEffect(()=>{
    setUser(auth.getCurrentUser());
  },[])

  return (
          <>
            <ToastContainer />
            {user ? <Main /> : <SwitchSign />}
          </>
   );
}

export default App;
