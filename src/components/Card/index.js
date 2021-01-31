import React from "react"
import css from "./index.module.css"
import { Card as CardElem } from "@material-ui/core"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import CardMedia from "@material-ui/core/CardMedia"
import NotFound from "../../assets/img/notfound.jpg"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "antd/dist/antd.css"
import { message, Modal } from "antd"
const { confirm } = Modal

const useStyles = makeStyles({
  root: {
    width: (992 - 120) / 4,
    height: 261,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "none",
  },
  media: {
    backgroundColor: "black",
    width: 150,
    height: 150,
    objectFit: "contain",
    textAlign: "center",
  },
})

const Card = ({ movie, movies, setMovies, isLiked, setIsLiked }) => {
  const classes = useStyles()

  // Confirm delete of movie
  function showConfirm(id) {
    confirm({
      title: "Voulez-vous supprimer ce film?",
      content: "Cette action est irréversible",
      onOk() {
        const newMovies = movies.filter(movie => movie.show.id !== id)
        setMovies(newMovies)
        message.success("Le film a été supprimé")
      },
      onCancel() {},
    })
  }

  return (
    <Link to={`/${movie.show.id}`} style={{ margin: 15 }}>
      <CardElem
        className={classes.root}
        style={
          isLiked.includes(movie.show.id)
            ? { backgroundColor: "rgb(170, 170, 255)" }
            : null
        }
      >
        <div
          style={{
            padding: 5,
            backgroundColor: "black",
            marginTop: 10,
            borderRadius: 5,
          }}
        >
          <CardMedia
            className={classes.media}
            image={movie.show.image ? movie.show.image.medium : NotFound}
            title={movie.show.name}
          >
            <FontAwesomeIcon
              icon={["fas", "times"]}
              className={css.delete}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                showConfirm(movie.show.id)
              }}
            />

            {/* Toggle like/dislike the card */}
            {!isLiked.includes(movie.show.id) ? (
              <FontAwesomeIcon
                icon={["fas", "thumbs-up"]}
                className={css.like}
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  const likes = [...isLiked, movie.show.id]
                  setIsLiked(likes)
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "thumbs-down"]}
                className={css.dislike}
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  const likes = isLiked.filter(like => like !== movie.show.id)
                  setIsLiked(likes)
                }}
              />
            )}
          </CardMedia>
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
