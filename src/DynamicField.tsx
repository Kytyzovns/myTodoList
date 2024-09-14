// @flow
import * as React from 'react';
import {ChangeEvent, useCallback} from "react";
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

    const changeHandler = useCallback(() => {
        setEditing(prevState => !prevState);
    }, []);

    const setValueHandler = useCallback(() => {
        setEditing(prevState => !prevState);
        setValue(newTitle);
    }, [newTitle]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value.trim());
    }, []);
    return (
            editing ? <input onChange={onChangeHandler} value={newTitle} onBlur={setValueHandler} autoFocus/> :
            <span style={{lineBreak: "normal"}} className={`${className ? className + " " + s.dynamicSpan : s.dynamicSpan}`} onDoubleClick={changeHandler}>{currentTitle}</span>
    );
});