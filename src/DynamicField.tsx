// @flow
import * as React from 'react';
import {ChangeEvent} from "react";
import s from './styles/Styles.module.css'
import {memo} from "react";


type Props = {
    currentTitle: string
    setValue: (title: string) => void
    className?: string
};

export const DynamicField = memo(({currentTitle, setValue, className}: Props) => {

    const [editing, setEditing] = React.useState<boolean>(false);
    const [newTitle, setNewTitle] = React.useState(currentTitle);

    const changeHandler = () => {
        setEditing(!editing)
    }

    const setValueHandler = () => {
        setEditing(!editing)
        setValue(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value.trim())
    }
    return (
            editing ? <input onChange={onChangeHandler} value={newTitle} onBlur={setValueHandler} autoFocus/> :
            <span style={{lineBreak: "normal"}} className={`${className ? className + " " + s.dynamicSpan : s.dynamicSpan}`} onDoubleClick={changeHandler}>{currentTitle}</span>
    );
});