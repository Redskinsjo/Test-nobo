import React from "react"
import { Link } from "gatsby"
import Back from "@material-ui/icons/ArrowLeft"
import css from "./index.module.css"
import { makeStyles } from "@material-ui/core/styles"
import Layout from "../Layout/index"
import Message from "../Message/index"

const useStyles = makeStyles({
  root: {
    color: "white",
    fontSize: "48px",
    height: "100%",
  },
})

const Header = ({ isCard, isDynamicMessage }) => {
  const classes = useStyles()
  return (
    <div className={css.container}>
      <Layout
        style={{
          width: 1040,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          {isCard && (
            <Link className={css.goBack} to="/">
              <Back classes={{ root: classes.root }} />
            </Link>
          )}
          {isCard ? (
            <div className={css.title}>Movie details</div>
          ) : (
            <div className={css.title} style={{ paddingLeft: "20px" }}>
              Nobo - Jonathan Carnos
            </div>
          )}
        </div>
        {isDynamicMessage && <Message />}
      </Layout>
    </div>
  )
}

export default Header
