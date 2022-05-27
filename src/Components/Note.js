import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {FavoriteBorderOutlined, Favorite } from '@material-ui/icons';
import {Delete} from '@material-ui/icons';
import moment from 'moment'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop : 7 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: blue[500],
  },
});

const NoteCard = (props)=> {
  const classes = useStyles();
  const {onDelete, item, onFavorite, history} = props

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            N
          </Avatar>
        }
        action={
          <IconButton aria-label="delete" onClick={()=>onDelete(item)}>
              <Delete />
          </IconButton>
        }
        title={item.title}
        subheader={
          <>
            <span>Start : {moment(item.start).format("YYYY-MM-DD hh:mm a")} </span><br/>
            <span>End : {moment(item.end).format("YYYY-MM-DD hh:mm a")}</span>
          </>}
      /> 
      <CardContent 
        style={{cursor: 'pointer'}} 
        onClick={()=>history.push(`/notes/${item.id}`)}
      >
        <Typography variant="body2" color="textSecondary" component="p">
          {item.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>onFavorite(item)}>
          {item.favorite && <Favorite color="secondary"  />}
          {!item.favorite && <FavoriteBorderOutlined  />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default NoteCard