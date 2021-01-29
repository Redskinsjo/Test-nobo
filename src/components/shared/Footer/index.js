import React from "react"
import css from "./index.module.css"
import "@fontsource/roboto"

const Footer = () => {
  return (
    <div className={css.footerContainer}>
      <div>
        Made with{" "}
        <a href="https://www.gatsbyjs.com/" style={{ textDecoration: "none" }}>
          Gatsby
        </a>{" "}
        by{" "}
        <a
          href="https://github.com/Redskinsjo?tab=repositories"
          style={{ textDecoration: "none" }}
        >
          Jonathan Carnos
        </a>
      </div>
    </div>
  )
}

export default Footer
