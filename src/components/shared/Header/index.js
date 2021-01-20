import React from "react";
import { Link } from "gatsby"
import Back from '@material-ui/icons/ArrowLeft';
import css from "./index.module.css"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        color: "white",
        fontSize: "48px",
        height: "100%"
    }
})

const Header = ({isCard}) => {
    const classes = useStyles()
    return (
        <div className={css.container}>
            {isCard && <Link className={css.goBack} to="/"><Back classes={{root: classes.root}}/></Link>}
            {isCard ? <div className={css.title}>Card details</div> : <div className={css.title} style={{paddingLeft: "20px"}}>Nobo - Jonathan Carnos</div>}
        </div>
    )
}

export default Header