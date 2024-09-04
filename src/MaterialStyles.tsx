import {styled, SxProps} from "@mui/material";
import Button from "@mui/material/Button";


type StyledButtonProps = {
    backgroundColor?: string;
    w?: string
    h?: string
}

export const StyledButton = styled(Button)<StyledButtonProps>(({backgroundColor, theme, w, h}) => ({
    backgroundColor: backgroundColor,
}))

export const AddTaskButton: SxProps = {
    height: "40px",
}

export const AddItemInput : SxProps = {

}