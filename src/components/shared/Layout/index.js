import React from "react"
import css from "./index.module.css"

const Layout = ({ children, style }) => {
  return (
    <div className={css.container} style={style && style}>
      {children}
    </div>
  )
}

export default Layout
