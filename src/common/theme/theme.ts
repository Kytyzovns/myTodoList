import {Theme} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {ThemeModeType} from "../../app/app-reducer";

export const themeCreator = (themeMode: ThemeModeType) => {
    return createTheme({
        palette: {
            mode: themeMode
        }
    })
}