import React from 'react';
import './App.css';
import {ThemeProvider} from '@mui/material/styles';
import {ApplicationBar} from "../common/components/Header/ApplicationBar";
import CssBaseline from '@mui/material/CssBaseline';
import {themeCreator} from "../common/theme/theme";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../features/todolists/model/store";
import {changeThemeAC, ThemeModeType} from "./app-reducer";
import {Main} from "./Main";

export const App = () => {

    const themeMode = useSelector<StoreType, ThemeModeType>(state => state.app.themeMode)
    const dispatch = useDispatch();

    const changeTheme = () => {
        dispatch(changeThemeAC(themeMode === "dark" ? "light" : "dark"));
    }

    const MyTheme = themeCreator(themeMode)

    return (
        <ThemeProvider theme={MyTheme}>
            <ApplicationBar changeTheme={changeTheme} themeOn={themeMode}/>
            <Main/>
            <CssBaseline/>
        </ThemeProvider>
    );
}


