
import React from "react";
import Header from "../shared/Header/index"
import Layout from "../shared/Layout/index"
import css from "./index.module.css"
import NotFound from "../../assets/img/notfound.jpg"
import Rating from '@material-ui/lab/Rating';
import "@fontsource/roboto"
import "./index.css"
import Footer from "../shared/Footer/index"

const CardDetails = ({pageContext: {movie}}) => {

    // destructuring de l'objet movie
    const { show: film } = movie

    // formatting de la clé summary
    let desc;
    if (film.summary) {
        const {summary} = film
        desc = summary.replaceAll("<p>", "")
        desc = desc.replaceAll("</p>", "")
        desc = desc.replaceAll("<b>", "")
        desc = desc.replaceAll("</b>", "")
        desc = desc.replaceAll("<i>", "")
        desc = desc.replaceAll("</i>", "")
        desc = desc.replaceAll("<p>", "")
    }

    // formatting de la clé premiered en lettres
    let monthLetter;
    const year = film.premiered.split("-")[0]
    const monthNumber = film.premiered.split("-")[1]
    const day = film.premiered.split("-")[1]
    switch (monthNumber) {
        case "01":
            monthLetter = "January";
            break;
        case "02":
            monthLetter = "February";
            break;
        case "03":
            monthLetter = "March";
            break;
        case "04":
            monthLetter = "April";
            break;
        case "05":
            monthLetter = "May";
            break;
        case "06":
            monthLetter = "June";
            break;
        case "07":
            monthLetter = "July";
            break;
        case "08":
            monthLetter = "August";
            break;
        case "09":
            monthLetter = "September";
            break;
        case "10":
            monthLetter = "October";
            break;
        case "11":
            monthLetter = "November";
            break;
        case "12":
            monthLetter = "December";
            break;
        default:
            return;
    }
    return (
        <>
            <Header isCard={true} />
            <Layout>
                <div className={css.container}>
                    <div className={css.image}>
                        {/* Display a default image if original not available*/}
                        <img src={film.image ? film.image.medium: NotFound} alt={film.name}/>
                        <span>{film.name}</span>
                    </div>
                    <div className={css.details}>
                        <div className={css.leftPartDetails}>
                            <p style={{lineHeight: 1.2}}>{desc}</p>
                            {film.rating.average && <div className={css.rating}>
                                <Rating name="half-rating-read" value={Math.round(film.rating.average)*0.5} precision={0.5} readOnly />
                                <span style={{color: "red", fontWeight: "bold", marginLeft: 20}}>{film.rating.average + " "}<span style={{color: "black", fontWeight: "normal"}}>/ 10</span></span>
                            </div>}
                            
                            <div className={css.smallDetails}>
                                {/* Check if info available */}
                                {film.type ? <span style={{color: "gray", marginTop: 10}}>type: <span style={{color: "black", fontWeight: "bold"}}>{film.type}</span></span> : <span style={{color: "gray", marginTop: 10}}>type: <span style={{color: "black", fontWeight: "bold"}}>No type displayed</span></span> }
                                {/* Check if info available */}
                                {film.language ? <span style={{color: "gray", marginTop: 10}}>language: <span style={{color: "black", fontWeight: "bold"}}>{film.language}</span></span> : <span style={{color: "gray", marginTop: 10}}>language: <span style={{color: "black", fontWeight: "bold"}}>No language displayed</span></span> }
                                {/* Check if info available */}
                                {film.genres.length > 0 ? <span style={{color: "gray", marginTop: 10}}>genre(s): <span style={{color: "black", fontWeight: "bold"}}>{film.genres.join(", ")}</span></span> : <span style={{color: "gray", marginTop: 10}}>genre(s): <span style={{color: "black", fontWeight: "bold"}}>No genre displayed</span></span>}
                                
                            </div>

                            {film.schedule.time && film.schedule.days.length > 0 ? <div className={css.moreDetails}>
                            Scheduled at {film.schedule.time} on {film.schedule.days.join(", ")}
                            </div> : null }
                            
                        </div>
                        <div className={css.rightPartDetails}>
                            <div style={{display: "flex", flexDirection: "column", border: "1px dotted black", padding: 10, height: 190}} >
                                <h2 style={{flex: 1, fontSize: 16, textAlign: "center", textDecoration: "underline"}}>Network</h2>
                                {film.network?.name &&  <span style={{flex: 3,color: "gray", display: "flex", alignItems: "center"}}>name:     <span style={{ fontSize: 20, fontWeight: "bold", color: "black"}}>{film.network.name}</span></span>}
                               
                               {film.network?.country.code && <div style={{flex: 1, display: "flex", justifyContent: "space-between"}}>
                                    <span style={{color: "gray"}}>country: <span style={{flex: 1, fontSize: 16, fontWeight: "bold"}}>{film.network.country.name}</span></span>
                                    <span>{film.network.country.code}</span>
                                </div> }
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.historyDetails}>
                        <div style={{width: "100%", display: "flex", justifyContent: "flex-start"}}>
                            <h2 style={{fontSize: 16, fontWeight: "bold"}}>Background</h2>
                        </div>
                        <span>This movie was for the first time shown on <span style={{fontWeight: "bold"}}>{monthLetter} {day} {year}</span>.</span>
                        <span>You can find more on the official website: <a href={film.officialSite}>{film.officialSite}</a></span>
                    </div>
            </Layout>
            <Footer/>
        </>
    )
}

export default CardDetails