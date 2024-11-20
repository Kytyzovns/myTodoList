import React, { memo, useCallback } from "react"
import { DynamicField } from "common/components/DynamicField/DynamicField"
import s from "../../../../../../styles/Styles.module.css"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeListTitleTC, ListType, removeListTC } from "../../../../model/ListsReducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"

type TodoListTitleProps = {
    list: ListType
}
export const TodoListTitle = memo(({ list }: TodoListTitleProps) => {
    const { id: listId, title } = list
    const dispatch = useAppDispatch()

    const changeListTitleHandler = useCallback((title: string) => {
        dispatch(changeListTitleTC({ listId, title }))
    }, [])

    const removeListHandler = useCallback(() => {
        dispatch(removeListTC(listId))
    }, [])

    return (
        <div>
            <DynamicField currentTitle={title} setValue={changeListTitleHandler} className={s.titleStyle} />
            <IconButton onClick={removeListHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
})
