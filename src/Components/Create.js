import {makeStyles}  from '@material-ui/core' 
import { useState , useContext} from 'react';
import moment from 'moment'
import http from '../services/httpServices'
import config from '../config.json'
import NotesContext from '../Context/NotesContext'
import {toast} from 'react-toastify'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import {Row, Col} from 'reactstrap'

const useStyles = makeStyles({
    root : {
        display :'flex',
        flexDirection : 'column',
        width : '70%',
    },
    item : {
        marginTop :30 
    }
})
const Create = ({history}) => {

    const classes = useStyles();
    const [title,setTitle] =useState('');
    const [body,setBody] =useState('');
    const [timeStart,setTimeStart] =useState('')
    const [timeEnd,setTimeEnd] =useState('')

    const notesContext = useContext(NotesContext);

    
    const handleCreateNewNote = async (e)=> {
        e.preventDefault();
       if (timeStart < timeEnd && title && body ) {
            const newNote = {
                id: notesContext.allNotes.length +1,
                title,
                body,
                start :timeStart,
                end :timeEnd,
                favorite : false
            };
            const adding = [...notesContext.allNotes];
            const originalNotes = [...notesContext.allNotes];
            adding.push(newNote);
            notesContext.setAllNotes(adding);
            history.push('/notes')
            try {
                await  http.post(config.apiEndPoint,newNote);
            } catch (ex) {
                console.log(ex)
                if(ex.response && ex.response.status === 404){
                toast.error("Sorry , we can't add the note");
                }
                notesContext.setAllNotes(originalNotes)
            }
       }
     }

    return (  
        <div className={classes.root} >
            <Typography variant="h3" color="textSecondary" >
                Create Your Note  
            </Typography>
            <form onSubmit={handleCreateNewNote}>
                <TextField 
                    variant="outlined" 
                    label="Title Here" 
                    fullWidth 
                    className={classes.item} 
                    autoFocus
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField 
                    variant="outlined"  
                    multiline 
                    rows={4} 
                    label='Details Here' 
                    fullWidth 
                    className={classes.item}
                    onChange={e => setBody(e.target.value)}
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
                            value={moment(timeStart).format("YYYY-MM-DDThh:mm")}
                            onChange={(e)=>setTimeStart(new Date(e.target.value).toISOString())}  
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
                            value={moment(timeEnd).format("YYYY-MM-DDThh:mm")}
                            onChange={(e)=>setTimeEnd(new Date(e.target.value).toISOString())}   
                        />
                    </Col>
                </Row>
                <Button
                    button='true'
                    variant="contained" 
                    color="primary" 
                    className={classes.item} 
                    onClick={handleCreateNewNote}
                    >
                    Create Note    
                </Button>
            </form>
        </div>
    );
}
 
export default Create;