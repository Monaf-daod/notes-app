import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextfieldInput from '../Common/TextFieldInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export default function FormSign({classes ,emailError, passError, nameError="", label, onChangingInput, onSubmitting}) {
    
    const [showPassword,setShowPassword] = useState(false)
    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {label}
            </Typography>
            <form className={classes.form} autoComplete='Off' noValidate onSubmit={onSubmitting} >
                <TextfieldInput 
                type="email"
                label="Email Address"
                errorMessage={emailError}
                checkFocus = {true}
                changeEvent={onChangingInput}
                />
                {label==="Sign Up" &&
                    <TextfieldInput 
                    type="name"
                    label="Name"
                    checkFocus = {false}
                    errorMessage={nameError}
                    changeEvent={onChangingInput}
                    />
                }
                <TextfieldInput 
                type={showPassword ? "text" : "password"}
                label="Password"
                checkFocus = {false}
                errorMessage={passError}
                typeInput={showPassword ? "text" : "password"}
                changeEvent={onChangingInput}
                />
                <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit} 
            >
                {label}
            </Button>
            </form>
        </div>
    )


}