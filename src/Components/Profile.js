import {useContext} from 'react'
import CurrentUser from './../Context/CurrentUser';
import auth from '../services/authService'
import {Button, Typography } from '@material-ui/core';





const Profile = () => {

    const currentUser = useContext(CurrentUser);

    const handleLogOut = () => {
        auth.LogOut();
        window.location = "/"       // we use window.location for rerun the all application 
    }

    return ( 
        <div>
            <div style={{padding : 10}}>
                <Typography 
                    variant="h4" 
                    color="default"
                >
                    First Name : {currentUser.first_name}
                </Typography>
                <Typography 
                    variant="h4" 
                    color="default"
                >
                    Last Name : {currentUser.last_name}
                </Typography>
                <Typography
                    variant="h4"
                    color="default"
                >
                    Your Email : {currentUser.email}
                </Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={handleLogOut}
                >
                    Log out
                </Button>
            </div>
        </div>
     );
}
 
export default Profile;