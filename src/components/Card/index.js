import React from "react"
import {Card as CardElem} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import NotFound from "../../assets/img/notfound.jpg"
import {Link} from "gatsby"

const useStyles = makeStyles({
    root: {
      width: (1040-120)/4,
      height: 261,
      margin: "15px",
      boxSizing: "border-box",
      display: 'flex',
      flexDirection: "column",
      alignItems: "center"
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      textDecoration: "none"
    },
    media: {
        backgroundColor: "black",
        width: 150,
        height: 150,
        objectFit: "contain",
        textAlign: "center",
    }
  });

const Card = ({movie}) => {
    const classes = useStyles();
    return (
        <Link to={`/${movie.show.id}`}>
            <CardElem className={classes.root}>
                <div style={{padding: 5, backgroundColor: "black", marginTop: 10}}>
                    <CardMedia
                        className={classes.media}
                        image={movie.show.image ? movie.show.image.medium : NotFound}
                        title={movie.show.name}
                    />
                </div>
                
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        {movie.show.name}
                    </Typography>
                </CardContent>
            </CardElem>
        </Link>
    )
}

export default Card