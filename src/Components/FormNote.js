import {makeStyles}  from '@material-ui/core' 
import { useState, useEffect, useContext } from 'react';
import moment from 'moment'
import http from '../services/httpServices'
import config from '../config.json'
import NotesContext from '../Context/NotesContext'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {Row, Col} from 'reactstrap'


const useStyles = makeStyles({
    root : {
        display :'flex',
        flexDirection : 'column',
        width : '70%',
    },
    formStyle : {
        display:'flex',
        flexDirection: 'column'
    },
    item : {
        marginTop :30 
    }
})

const FormNote = ({history, match}) => {


    const classes = useStyles();
    const [title,setTitle] =useState('');
    const [body,setBody] =useState('');
    const [favorite,setFavorite] = useState(false);
    const [timeStart,setTimeStart] =useState('')
    const [timeEnd,setTimeEnd] =useState('')
    const [note,setNote] = useState(null);

    const notesContext = useContext(NotesContext);

    useEffect(()=>{
        const temp = notesContext.allNotes.filter(note => note.id == match.params.id );
        setNote(temp[0]);
        setTitle(temp[0].title);
        setBody(temp[0].body);
        setFavorite(temp[0].favorite);
        setTimeStart(moment(temp[0].start).format("yyyy-MM-DDThh:mm"));
        setTimeEnd(moment(temp[0].end).format("yyyy-MM-DDThh:mm"));
    },[]);

    
    const handleUpdate = async ()=> {
        let tempNotes = [...notesContext.allNotes];
        const originalNotes = [...notesContext.allNotes];
        const index = tempNotes.indexOf(note);
        if(timeStart < timeEnd && title && body){
            tempNotes[index] = {...note}
            tempNotes[index].title = title;
            tempNotes[index].body = body;
            tempNotes[index].favorite = favorite;
            tempNotes[index].start = new Date(timeStart).toISOString();
            tempNotes[index].end = new Date(timeEnd).toISOString();
            notesContext.setAllNotes(tempNotes);
            history.push('/notes')
            try{
            const {data} =  await  http.put(config.apiEndPoint+`/${match.params.id}` , tempNotes[index])
            console.log(data)
            }
            catch(ex){
                console.log(ex)
                notesContext.setAllNotes(originalNotes)
            }
        }
    }

    const handleCancelUpdate = () =>{
            history.push('/notes')
    }
    return  <div className={classes.root} >
                <Typography variant="h3" color="textSecondary" >
                    Update Note  
                </Typography>
                <form onSubmit={handleUpdate} className={classes.formStyle}>
                    <TextField 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        value={title} 
                        className={classes.item} 
                        autoFocus
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField 
                        variant="outlined"  
                        multiline 
                        rows={4} 
                        label='Details' 
                        fullWidth
                        value={body} 
                        className={classes.item}
                        onChange={e => setBody(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox icon={<FavoriteBorder />} 
                            checkedIcon={<Favorite />} 
                            name="favorite"
                            checked={favorite}
                            className={classes.item} 
                            onChange={()=>setFavorite(!favorite)}/>}
                            label ="Favorite"
                            labelPlacement="bottom"   
                        />
                        <Row>
                            <Col xs={12} sm={8} md={6}>
                                <Typography variant="h6" color="textSecondary" >
                                    Start Time  
                                </Typography>
                                <TextField 
                                    type="datetime-local"
                                    variant="outlined"
                                    name="start"
                                    value={timeStart}
                                    onChange={(e)=>setTimeStart(e.target.value)}  
                                />
                            </Col>
                            <Col xs={12} sm={8} md={6}>
                                <Typography variant="h6" color="textSecondary" >
                                    End Time  
                                </Typography>
                                <TextField 
                                    type="datetime-local"
                                    variant="outlined" 
                                    name= "end"
                                    value={timeEnd}
                                    onChange={(e)=>setTimeEnd(e.target.value)}   
                                />
                            </Col>
                        </Row>
                    <Button
                        button='true'
                        variant="contained" 
                        color="secondary" 
                        className={classes.item} 
                        onClick={handleCancelUpdate}
                        >
                        Cancel   
                    </Button>
                    <Button
                        button='true'
                        variant="contained" 
                        color="primary" 
                        className={classes.item} 
                        onClick={handleUpdate}
                        >
                        Update   
                    </Button>
                </form>
            </div>;
}
 
export default FormNote;