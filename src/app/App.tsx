import React from 'react';
import './App.css';
import {ThemeProvider} from '@mui/material/styles';
import {ApplicationBar} from "../common/components/Header/ApplicationBar";
import CssBaseline from '@mui/material/CssBaseline';
import {themeCreator} from "../common/theme/theme";
import {changeThemeAC} from "./app-reducer";
import {Main} from "./Main";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectThemeMode} from "./appSelectors";


export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch();

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


