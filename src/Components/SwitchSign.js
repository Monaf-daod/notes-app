import FormSign from '../Common/FormSign';
import {useState} from 'react'
import {bake_cookie} from 'sfcookies'
import userService from '../services/userService'
import Auth from '../services/authService'
import {toast} from 'react-toastify'
import CopyRight from '../Common/CopyRight'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default function SwitchSign() {
    const classes = useStyles();
    const [hasAccount, setHasAccount] = useState(true);

    const [emailError, setEmailError] =useState('');
    const [passError, setPassError] =useState('');
    const [nameError, setNameError] =useState('');
  
    const [email, setemail] =useState('');
    const [password, setpassword] =useState('');
    const [name, setName] =useState('');

    const validateErrors =(data) => {
      setEmailError(data.error)
      setPassError(data.error)
      setNameError(data.error)
      
    }
    const handleChange = (e) => {
     if (e.target.id === 'email') setemail(e.target.value) ;
     if(e.target.id === 'password') setpassword(e.target.value);
     if(e.target.id === 'name') setName(e.target.value);
    }

    const handleCreateUser = async(e) => {
        e.preventDefault();
        try{
          const {data} = await userService.SignUp(email,password,name)
          Auth.LogInWithJwt(data.token);
          window.location ="/"
      }
      catch(ex){
          validateErrors(ex.response.data);
          if(ex.response && ex.response.status === 400)
          toast.error(ex.response.data.error,{
            position: toast.POSITION.TOP_CENTER
          })
      }    
    }

    const handleLogIn = async(e) => {
      e.preventDefault();
      try {
          await Auth.LogIn(email,password) 
          window.location ="/"
      } catch (ex) {
          validateErrors(ex.response.data);
          if(ex.response && ex.response.status === 400)
          toast.error(ex.response.data.error,{
            position: toast.POSITION.TOP_CENTER
          })
      }
  }

  const toggleSign =() => { 
    setHasAccount(!hasAccount)
  }

  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {hasAccount && <>
            <FormSign 
              label="Sign In"
              classes={classes} 
              emailError={emailError} 
              passError={passError}
              onChangingInput={handleChange}
              onSubmitting={handleLogIn}
              />
            <Grid container>
              <Grid item>
                <span>
                    Don't have an account? 
                    <span 
                      style={{color:'red', cursor :'pointer', textDecoration : 'underline'}}
                      onClick = {toggleSign}>
                        Sign Up
                    </span>
                </span>
              </Grid>
            </Grid>
          </>
          }
          {!hasAccount && <>
              <FormSign
                label="Sign Up"
                classes={classes} 
                emailError={emailError} 
                passError={passError}
                nameError={nameError} 
                onChangingInput={handleChange}
                onSubmitting={handleCreateUser}
              />
              <Grid container>
                <Grid item>
                  <span>
                      Have an account? 
                      <span 
                        style={{color:'#f80', cursor :'pointer', textDecoration : 'underline'}}
                        onClick = {toggleSign}>
                          Sign In
                      </span>
                  </span>
                </Grid>
              </Grid>
          </>}
          <Box mt={8}>
            <CopyRight />
          </Box>
        </Container>  
  );
}