import {getGenres} from '../Data/filterGenres'
import {useEffect, useState, useContext} from 'react'
import NotesContext from '../Context/NotesContext'
import {Fragment} from 'react'
import NoteCard from './Note'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '../Common/Pagination'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {paginate} from '../Utils/paginate'
import ListGroup from '../Common/ListGroup';
import http from '../services/httpServices'
import config from '../config.json'
import {toast} from 'react-toastify'



const useStyles = makeStyles((theme)=>({

    root :{
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'space-around'

    },
    page : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    fab: {
        position : 'fixed',
        margin: theme.spacing(8),
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
}))

const Notes = (props) => {

     const {history} =props;
     const classes = useStyles()
     const [pageSize, setPageSize] = useState(4);
     const [currentPage, setCurrentPage] = useState(1);
     const [genres, setGenres] = useState([]);
     const [selectedGenre,setSelectedGenre] = useState();
     
     const notesContext = useContext(NotesContext);

     useEffect( async ()=> {
       console.log('effect run');
       setGenres([{name :'All Notes'},...getGenres()]);   
     },[]);

     const handleFavorite = note => {
         const tempNotes = [...notesContext.allNotes];
         const index = tempNotes.indexOf(note);
         tempNotes[index] = {...tempNotes[index]};
         tempNotes[index].favorite = !tempNotes[index].favorite;
         notesContext.setAllNotes(tempNotes);
     }

     const handlePageChange = page => {
            setCurrentPage(page);
     }

     const handleItemSelected = item => {
        setSelectedGenre(item);
        setCurrentPage(1);
     }

     const handleDelete = async note =>{
        console.log(note)
        const originalNotes = [...notesContext.allNotes];
        const temp = notesContext.allNotes.filter(n => n.id !== note.id);
        notesContext.setAllNotes(temp);
        //setCurrentPage(1);
        try{
          await  http.delete(config.apiEndPoint+"/"+note.id)
        }
        catch (ex){
            console.log('hello from catch')
            console.log(ex)
            if(ex.response && ex.response.status === 404){
            toast.error("sorry , the item isn't exists");
            }
            notesContext.setAllNotes(originalNotes)
        }
     }

    const filtered = selectedGenre && 
                     selectedGenre.id ? 
                     notesContext.allNotes.filter(n => n.favorite ) : notesContext.allNotes;
    const count = filtered.length;
    return ( 
        <div className="row">
            <div className="col-3">
                <ListGroup 
                    items={genres}
                    selectedItem={selectedGenre}
                    onItemSelected={handleItemSelected}
                />
            </div>
            <div className="col">
                <div className= {classes.page}>
                    <div className={classes.root}>
                        {paginate(filtered,currentPage,pageSize).map(note =>(
                            <Fragment key={note.title}>
                                <NoteCard 
                                item={note}
                                {...props}
                                onFavorite={handleFavorite}
                                onDelete={handleDelete}
                            />
                            </Fragment>
                        )   
                        )}
                    </div>
                    <Pagination 
                        pageSize={pageSize} 
                        count={count}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Fab color="primary" className={classes.fab} onClick={()=> history.push('/create')}>
                <AddIcon />
            </Fab>
        </div>
     );
}
 
export default Notes;