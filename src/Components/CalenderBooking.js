import React, {useState, useRef, useContext} from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import NotesContext from '../Context/NotesContext'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin   from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import {Row, Col, Button} from 'reactstrap'
 

const useStyles = makeStyles({
    root : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    item : {
        margin : 5
    },
    calendar : {
        width : '50%'
    },
    formStyle : {
        display:'flex',
        flexDirection: 'column'
    },
});


const CalenderBooking = () => {

    const notesContext = useContext(NotesContext);

    const calendarRef= useRef();
    const classes = useStyles();

    //const Events = calendarRef.current.getApi().currentDataManager.currentCalendarOptionsInput.events;
    //you can get the changes of object after drag and drop by (e.event.toPlainObject())

    const [meet,setMeet] =useState({
        startTime : new Date(),
        endTime : new Date(),
        title : '',
        body : '',
        color : ''
    });

   const handleChange = e =>{
        setMeet({...meet,[e.target.name] : e.target.value})
    }
    const handleAdd =() =>{
        const tempBookings =[...notesContext.allNotes];
        if ((meet.startTime < meet.endTime) && meet.title && meet.color ){
            const temp ={  
                id: tempBookings.length +1 ,
                title:meet.title,
                body : meet.body,
                start: new Date(meet.startTime).toISOString(),
                end: new Date(meet.endTime).toISOString(),
                color : rgbToHex(meet.color)
              }
    
              tempBookings.push(temp);
              notesContext.setAllNotes(tempBookings);
              setMeet({
                  startTime : new Date(),
                  endTime : new Date(),
                  title : '',
                  color : ''
              })
        }
    }

    const handleDateClick = (e) => { 
      }

    const handleAddEvent =(selectInfo) =>{
            let title = prompt('Please enter a new title for your event')
            let body = prompt('Please enter details for your event')
            let calendarApi = selectInfo.view.calendar

            calendarApi.unselect() // clear date selection
            const tempBookings =[...notesContext.allNotes];
            if (title && body) {
                const temp ={  
                    id: tempBookings.length +1 ,
                    title,
                    body ,
                    start: selectInfo.start,
                    end: selectInfo.end,
                    allDay : selectInfo.allDay
                  }
                tempBookings.push(temp);
                notesContext.setAllNotes(tempBookings);
                }
            }
                    
    const handleDeleteEvent =(e) =>{
            e.event.remove()
            const temp = notesContext.allNotes.filter(item=>item.id!=e.event.id)
            notesContext.setAllNotes(temp)
            //console.log(bookings)
    }  
    const handleChangEvent =(e) =>{
            console.log(e.event.id)
            const newEvent = e.event.toPlainObject()
            console.log(newEvent);
            console.log(calendarRef.current.getApi().currentDataManager.currentCalendarOptionsInput.events,'events')
            const temp =[...notesContext.allNotes];
            const index = notesContext.allNotes.findIndex(item =>item.id==newEvent.id)
            temp[index]={...e.event.toPlainObject(),body : temp[index].body}
            notesContext.setAllNotes(temp)
            //console.log('booking after change event',bookings)
    } 
      
    return ( 
        <div>
            <FullCalendar 
                plugins={[ dayGridPlugin ,timeGridPlugin ,interactionPlugin]}
                ref={calendarRef}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                initialView="dayGridMonth"
                events={notesContext.allNotes}
                editable
                startEditable
                eventResizableFromStart
                selectable
                select={handleAddEvent}
                dateClick={handleDateClick}
                eventClick={handleDeleteEvent}
                eventChange={handleChangEvent}
            />
            <form className={classes.formStyle}>
                <Row>
                    <Col xs={12} sm={8} md={6}>
                        <Typography variant="h6" color="textSecondary" >
                            Start Time  
                        </Typography>
                        <TextField 
                            type="datetime-local"
                            variant="outlined"
                            name="startTime"
                            value={meet.startTime}
                            className={classes.item}
                            onChange={handleChange}    
                        />
                    </Col>
                    <Col xs={12} sm={8} md={6}>
                        <Typography variant="h6" color="textSecondary" >
                            End Time  
                        </Typography>
                        <TextField 
                            type="datetime-local"
                            variant="outlined" 
                            name= "endTime"
                            value={meet.endTime}
                            className={classes.item} 
                            onChange={handleChange}   
                        />
                    </Col>
                </Row>
                <Row className={classes.item}>
                    <TextField 
                            variant="outlined" 
                            label="Title" 
                            fullWidth 
                            className={classes.item} 
                            autoFocus
                            name="title"
                            value={meet.title}
                            onChange={handleChange}   
                    />
                </Row>
                <Row className={classes.item}>
                    <TextField 
                            variant="outlined" 
                            label="Details" 
                            fullWidth 
                            className={classes.item} 
                            name="body"
                            value={meet.body}
                            onChange={handleChange}   
                    />
                </Row>
                <Row className={classes.item}>
                    <TextField 
                            type="color"
                            variant="outlined" 
                            label="color" 
                            fullWidth 
                            className={classes.item} 
                            name="color"
                            value={meet.color}
                            onChange={handleChange}   
                    />
                </Row>
                <Row className={classes.item}>
                    <Button 
                        type="button" 
                        color="primary"
                        onClick={handleAdd}
                    >
                        Add Event
                    </Button>
                </Row>
            </form>
        </div>
    )
}
 
export default CalenderBooking;