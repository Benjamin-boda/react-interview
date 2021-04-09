import React from "react";

export const Header = () => {
    return (
        <div className="header">
            <img className="header__image" src={require("../images/header.png").default}/>
        </div>
    )
}