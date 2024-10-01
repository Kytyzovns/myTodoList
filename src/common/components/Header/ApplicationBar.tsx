import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import {memo, useCallback, useState} from "react";
import {Sidebar} from "../sidebar/Sidebar";
import s from "../sidebar/Sidebar.module.css";
import {ThemeModeType} from "../../../app/app-reducer";

type ApplicationBarProps = {
    changeTheme: () => void
    themeOn: ThemeModeType
}

export const ApplicationBar = memo(({changeTheme, themeOn}: ApplicationBarProps) => {

    const [openMenu, setOpenMenu]= useState<boolean>(false)

    const onClickHandler = useCallback(() => setOpenMenu(prevState => !prevState), []);

    return (
        <Box sx={{flexGrow: 1}}>
            {openMenu && <div onClick={onClickHandler} className={s.back}></div>}
            <Sidebar open={openMenu} openChange={onClickHandler}/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={onClickHandler}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Switch color={"secondary"} checked={themeOn === "light"} onChange={changeTheme}/>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
})