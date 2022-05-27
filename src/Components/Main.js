import {useEffect,useState} from 'react'
import {Route,BrowserRouter,Switch} from 'react-router-dom'
import config from '../config.json'
import http from '../services/httpServices'
import Layout from './Layout';
import Notes from './Notes'
import Create from './Create'
import Profile from './Profile'
import Setting from './Setting'
import FormNote from './FormNote';
import CalenderBooking from './CalenderBooking'
import NotesContext from '../Context/NotesContext'
import CurrentUser from './../Context/CurrentUser';
import Preview from './Preview';


const Main = () => {

    const [allNotes,setAllNotes] = useState([]);
    const [currentUser,setCurrentUser] = useState();


    useEffect( async ()=> {
        try{
            const posts = await http.get(config.apiEndPoint)
            .then(res => res.data.slice(1,7))
            posts.map(post=>{
                post.favorite = true
                post.start = new Date(Date.now()).toISOString();  
                post.end = new Date(Date.now()+(1000*60*60*5)).toISOString();  
                post.color = '' 
            })
            setAllNotes(posts);
                const {data : userInfo} = await http.get(config.apiGetCuurentUser + '/4');
                setCurrentUser(userInfo.data)
                console.log(userInfo.data)
            }
            catch (ex) {
                console.log(ex)
            }
      },[]);
    
    return (
        <BrowserRouter>
            <NotesContext.Provider value={{allNotes,setAllNotes}}>
                <CurrentUser.Provider value={currentUser}> 
                    <Layout>
                        <Switch>
                            <Route path = "/create" component={Create} />
                            <Route path = "/notes/:id" component={FormNote}/>
                            <Route path = "/notes" component={Notes}/>
                            <Route path = "/setting" component={Setting}/>
                            <Route path = "/preview" component={Preview}/>
                            <Route path = "/calendar" component={CalenderBooking}/>
                            <Route path = "/profile" component={Profile}/>
                            <Route path="/" component={Notes}/>
                        </Switch>
                    </Layout>
                </CurrentUser.Provider>
            </NotesContext.Provider>
        </BrowserRouter>   
     );
}
 
export default Main;