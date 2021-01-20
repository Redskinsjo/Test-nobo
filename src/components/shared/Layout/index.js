
import React from "react";
import css from "./index.module.css"

const Layout = ({children}) => {
    return (
        <div className={css.container}>{children}</div>
    )
}

export default Layout