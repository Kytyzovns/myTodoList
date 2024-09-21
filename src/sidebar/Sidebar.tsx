import React from 'react';
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {NavLink} from "react-router-dom";
import {PATH} from "../App";
import s from "./Sidebar.module.css"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

type SidebarProps = {
    open: boolean
    openChange: () => void
}
export const Sidebar = ({open, openChange}: SidebarProps) => {

    return (
        <div className={open? s.open + " " + s.sidebar : s.sidebar}>

            <IconButton sx={{width: "24px", height: "24px", margin: "20px"}} onClick={openChange}>
                <CloseIcon />
            </IconButton>

            <nav className={s.nav}>
                <NavLink to={PATH.ABOUT} className={({isActive}) => isActive? s.active : ""}>About</NavLink>
                <NavLink to={PATH.LISTS} className={({isActive}) => isActive? s.active : ""}>Lists</NavLink>
            </nav>
        </div>
    );
};

