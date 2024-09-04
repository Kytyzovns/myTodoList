import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button'
import {SxProps} from "@mui/material";
import TextField from '@mui/material/TextField';

type AddItemProps = {
    addItem: (title: string) => void
    buttonName: string
    buttonVariant?:  "text" | "outlined" | "contained" | undefined
    sxButtonStyles?: SxProps
    sxInputStyles?: SxProps
}

export function AddItem({addItem, buttonName, buttonVariant, sxButtonStyles, sxInputStyles}: AddItemProps) {

    const [currentTitle, setCurrentTitle] = useState("");
    const [error, setError] = useState<null | string>(null)

    const addTaskItemHandler = () => {
        if (!currentTitle.trim()) {
            setError("required field")
        } else {
            addItem(currentTitle);
            setCurrentTitle('');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value);
        setError(null);
    }

    const InputPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskItemHandler()
        }
    }

    return (
        <div>
            <TextField size={"small"} sx={sxInputStyles} label={"Enter title"} variant={"outlined"} error={!!error} helperText={error} value={currentTitle} onChange={onChangeHandler}
                   onKeyUp={InputPressHandler}/>
            <Button sx={sxButtonStyles} size={"small"} variant={buttonVariant} onClick={addTaskItemHandler}>{buttonName}</Button>

        </div>

    )
}