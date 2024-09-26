import {Theme} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeModeType} from "../../App";

export const themeCreator = (themeMode: themeModeType) => {
    return createTheme({
        palette: {
            mode: themeMode
        }
    })
}