import React from "react"
import Header from "../shared/Header/index"
import Layout from "../shared/Layout/index"
import css from "./index.module.css"
import css2 from "../Card/index.module.css"
import NotFound from "../../assets/img/notfound.jpg"
import Rating from "@material-ui/lab/Rating"
import "@fontsource/roboto"
import "./index.css"
import Footer from "../shared/Footer/index"

const CardDetails = ({ pageContext: { movie } }) => {
  // destructuring de l'objet movie
  const { show: film } = movie

  // formatting de la partie description
  let desc
  if (film.summary) {
    const { summary } = film
    desc = summary.replaceAll("<p>", "")
    desc = desc.replaceAll("</p>", "")
    desc = desc.replaceAll("<b>", "")
    desc = desc.replaceAll("</b>", "")
    desc = desc.replaceAll("<i>", "")
    desc = desc.replaceAll("</i>", "")
    desc = desc.replaceAll("<p>", "")
  }

  // formatting en lettres de la date de première diffusion
  let monthLetter
  const year = film.premiered.split("-")[0]
  const monthNumber = film.premiered.split("-")[1]
  const day = film.premiered.split("-")[1]
  switch (monthNumber) {
    case "01":
      monthLetter = "January"
      break
    case "02":
      monthLetter = "February"
      break
    case "03":
      monthLetter = "March"
      break
    case "04":
      monthLetter = "April"
      break
    case "05":
      monthLetter = "May"
      break
    case "06":
      monthLetter = "June"
      break
    case "07":
      monthLetter = "July"
      break
    case "08":
      monthLetter = "August"
      break
    case "09":
      monthLetter = "September"
      break
    case "10":
      monthLetter = "October"
      break
    case "11":
      monthLetter = "November"
      break
    case "12":
      monthLetter = "December"
      break
    default:
      return
  }
  return (
    <div style={{ backgroundColor: "#242424" }}>
      <Header isCard={true} />
      <Layout style={{ backgroundColor: "#242424" }}>
        <div className={css.container}>
          <div className={css.image}>
            {/* Display a default image if original not available*/}
            <img
              src={film.image ? film.image.medium : NotFound}
              alt={film.name}
            />
            <span>{film.name}</span>
          </div>
          <div className={css.details}>
            <div className={css.leftPartDetails}>
              {desc ? (
                <p style={{ lineHeight: 1.2 }}>{desc}</p>
              ) : (
                <p style={{ justifyContent: "center" }}>
                  No description available
                </p>
              )}
              {film.rating.average && (
                <div className={css.rating}>
                  <Rating
                    name="half-rating-read"
                    value={Math.round(film.rating.average) * 0.5}
                    precision={0.5}
                    readOnly
                  />
                  <span
                    style={{ color: "red", fontWeight: "bold", marginLeft: 20 }}
                  >
                    {film.rating.average + " "}
                    <span style={{ color: "black", fontWeight: "normal" }}>
                      / 10
                    </span>
                  </span>
                </div>
              )}

              <div className={css.smallDetails}>
                {/* Check if info available */}
                {film.type ? (
                  <span className={css.detailKey}>
                    type: <span className={css.detailValue}>{film.type}</span>
                  </span>
                ) : (
                  <span className={css.detailKey}>
                    type:{" "}
                    <span className={css.detailValue}>No type displayed</span>
                  </span>
                )}
                {/* Check if info available */}
                {film.language ? (
                  <span className={css.detailKey}>
                    language:{" "}
                    <span className={css.detailValue}>{film.language}</span>
                  </span>
                ) : (
                  <span className={css.detailKey}>
                    language:{" "}
                    <span className={css.detailValue}>
                      No language displayed
                    </span>
                  </span>
                )}
                {/* Check if info available */}
                {film.genres.length > 0 ? (
                  <span className={css.detailKey}>
                    genre(s):{" "}
                    <span className={css.detailValue}>
                      {film.genres.join(", ")}
                    </span>
                  </span>
                ) : (
                  <span className={css.detailKey}>
                    genre(s):{" "}
                    <span className={css.detailValue}>No genre displayed</span>
                  </span>
                )}
              </div>

              {film.schedule.time && film.schedule.days.length > 0 ? (
                <div className={css.moreDetails}>
                  Scheduled at {film.schedule.time} on{" "}
                  {film.schedule.days.join(", ")}
                </div>
              ) : (
                <div className={css.moreDetails}>
                  There's no time schedule available
                </div>
              )}
            </div>
            <div className={css.rightPartDetails}>
              {film.network?.name && film.network?.country.code ? (
                <div className={css.rightContainer}>
                  <h2 className={css.rightContainerTitle}>Network</h2>
                  {film.network?.name && (
                    <span className={css.networkNameKey}>
                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        name:{" "}
                        <span className={css.networkNameValue}>
                          {film.network.name}
                        </span>
                      </div>
                    </span>
                  )}

                  {film.network?.country.code && (
                    <div className={css.networkCountryContainer}>
                      <span className={css.networkCountryKey}>
                        country:{" "}
                        <span className={css.networkCountryValue}>
                          {film.network.country.name}
                        </span>
                      </span>
                      <span>{film.network.country.code}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={css.rightContainer}>
                  <div>No network data available</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={css.historyDetails}>
          <div className={css.historyDetailsTitleContainer}>
            <h2 className={css.historyDetailsTitle}>Background</h2>
          </div>
          <span>
            This movie was for the first time shown on{" "}
            <span style={{ fontWeight: "bold" }}>
              {monthLetter} {day} {year}
            </span>
            .
          </span>
          {film.officialSite && (
            <span>
              You can find more on the official website:{" "}
              <a href={film.officialSite} className={css.officialSite}>
                {film.officialSite}
              </a>
            </span>
          )}
        </div>
      </Layout>
      <Footer />
    </div>
  )
}

export default CardDetails
