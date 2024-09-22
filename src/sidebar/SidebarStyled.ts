import Box from "@mui/material/Box";
import {styled} from "@mui/material";
import {NavLink} from "react-router-dom";

type BoxProps = {
    open: boolean
}

type LinkProps = {

}

export const StyledBox = styled(Box)<BoxProps>(({open, ...props}) => ({
    background: props.theme.palette.mode === "dark" ? "rgb(74,62,95)" : "#fff",
    display: open ? "flex" : "none",
    width: "350px",
    height: "100%",
    position: "absolute",
    flexDirection: "column",
    alignItems: 'flex-end',
    boxShadow: '0 1px 2px 0 rgba(29, 33, 38, 0.1), 0 10px 40px 0 rgba(29, 33, 38, 0.13)',
    zIndex: '99',

}))

export const StyledLink = styled(NavLink)<LinkProps>((props) => ({
    fontWeight: 600,
    fontSize: '22px',
    color: props.theme.palette.mode === "dark" ? '#fff' : '#000',
    textDecoration: 'none',
    '&:hover': {
        color: props.theme.palette.mode === "dark" ? "#6ba8e4" : "#3d6b99"
    },

    '&.active': {
        textDecoration: 'underline',
        textDecorationSkipInk: 'none',
        color: props.theme.palette.mode === "dark" ? '#49e4f1' : '#0059b2'
    },

}))