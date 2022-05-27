import { useHistory } from 'react-router';
import {useState,useContext} from 'react'
import CurrentUser from './../Context/CurrentUser';
import {Avatar, makeStyles, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import { NotesOutlined,
         Add, 
         HomeRounded , 
         SettingsApplications, 
         CalendarToday,
        SearchRounded} from '@material-ui/icons';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
      },
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));


const Layout = (props) => {

    const currentUser = useContext(CurrentUser);

    const history = useHistory();
    const { window , children} = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] =useState(false);
    const [pageTitle,setPageTitle] = useState('My Notes');

    const redirectNewPage = (text,path) => {
        setPageTitle(text);
        history.push(path);
    }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

    const menuItems = [
        {
            text : 'My profile',
            icon : <HomeRounded  color = 'primary' />,
            path : '/profile'
        },
        {
            text : 'My Notes',
            icon : <NotesOutlined  color = 'primary' />,
            path : '/notes'
        },
        {
            text : 'Create One',
            icon : <Add  color = 'primary' />,
            path : '/create'
        },
        {
            text : 'Calender',
            icon : <CalendarToday  color = 'primary' />,
            path : '/calendar'
        },
        {
            text : 'Setting',
            icon : <SettingsApplications  color = 'primary' />,
            path : '/setting'
        },
        {
            text : 'Preview',
            icon : <SearchRounded  color = 'primary' />,
            path : '/preview'
        }
    ]
    const container = window !== undefined ? () => window().document.body : undefined;

    return (  
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                    >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h4" noWrap>
                    {pageTitle}
                </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        elevation= {3}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        anchor="left"
                    >
                        <Toolbar className={classes.toolbar}>
                            <Avatar className={classes.large} src={currentUser? currentUser.avatar : null} />  
                            <Typography variant="h5" color="primary">
                                Welcome {currentUser? currentUser.first_name :''}
                            </Typography>  
                        </Toolbar>
                        <Divider />
                        <List>
                            {menuItems.map(item => (
                                    <ListItem
                                        key={item.text}
                                        button
                                        onClick ={()=> redirectNewPage(item.text,item.path)}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <Toolbar className={classes.toolbar}>
                            <Avatar className={classes.large} src={currentUser? currentUser.avatar : null} />  
                            <Typography variant="h5" color="primary">
                                Welcome {currentUser? currentUser.first_name :''}
                            </Typography>  
                        </Toolbar>
                        <Divider />
                        <List>
                            {menuItems.map(item => (
                                    <ListItem
                                        key={item.text}
                                        button
                                        onClick ={()=> redirectNewPage(item.text,item.path)}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    <div className={classes.page}>
                        {children}
                    </div>
            </main>
        </div>
    );
}
 
export default Layout;