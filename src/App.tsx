import React, {useState} from 'react';
import './App.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ApplicationBar} from "./ApplicationBar";
import CssBaseline from '@mui/material/CssBaseline';
import {Route, Routes} from "react-router-dom";
import {Lists} from "./styles/Lists";
import {About} from "./About";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [listId: string]: TaskType[]
}
export type FilterType = "all" | "completed" | "active"

export type ListType = {
    listId: string
    title: string
    filter: FilterType
}

export const PATH = {
    LISTS: "/lists",
    ABOUT: "/about",
}

function App() {

    const [themeMode, setThemeMode] = useState<boolean>(false)

    const changeTheme = () => {
        setThemeMode(!themeMode);
    }

    const MyTheme = createTheme({
        palette: {
            mode: themeMode ? "dark" : "light"
        }
    })

    return (
        <ThemeProvider theme={MyTheme}>
            <ApplicationBar changeTheme={changeTheme} themeOn={themeMode}/>
                <Routes>
                    <Route path={"/"} element={<Lists />} />
                    <Route path={PATH.LISTS} element={<Lists />} />
                    <Route path={PATH.ABOUT} element={<About />} />
                </Routes>
            <CssBaseline/>
        </ThemeProvider>
    );
}

export default App;
