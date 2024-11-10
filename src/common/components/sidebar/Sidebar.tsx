import React from "react"
import { IconButton, useTheme } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import s from "./Sidebar.module.css"
import { StyledBox, StyledLink } from "./SidebarStyled"
import { PATH } from "../../../app/Main"

type SidebarProps = {
    open: boolean
    openChange: () => void
}
export const Sidebar = ({ open, openChange }: SidebarProps) => {
    return (
        <StyledBox open={open}>
            <IconButton sx={{ width: "24px", height: "24px", margin: "20px" }} onClick={openChange}>
                <CloseIcon />
            </IconButton>

            <nav className={s.navLight}>
                <StyledLink to={PATH.ABOUT}>About</StyledLink>
                <StyledLink to={PATH.LISTS}>Lists</StyledLink>
            </nav>
        </StyledBox>
    )
}
