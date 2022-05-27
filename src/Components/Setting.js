import {useContext} from 'react'
import CurrentUser from './../Context/CurrentUser';
import { Typography } from '@material-ui/core';


const Setting = () => {
    const currentUser = useContext(CurrentUser);
    return ( 
        <div>
            <Typography
                variant="h4"
            >
                Id : {currentUser.id}
            </Typography>
            <Typography
                variant="h4"
            >
                Your Email : {currentUser.email}
            </Typography>
            <Typography
                variant="h4"
            >
                Your Pass : {currentUser.password}
            </Typography>
        </div>
     );
}
 
export default Setting;