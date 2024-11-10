import React, { memo, useCallback } from "react"
import { DynamicField } from "../../../../../../common/components/DynamicField/DynamicField"
import s from "../../../../../../styles/Styles.module.css"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeListTitleActionAc, ListType, removeListActionAc } from "../../../../model/ListsReducer"
import { useDispatch } from "react-redux"

type TodoListTitleProps = {
    list: ListType
}
export const TodoListTitle = memo(({ list }: TodoListTitleProps) => {
    const { id: listId, title } = list
    const dispatch = useDispatch()

    const changeListTitleHandler = useCallback((title: string) => {
        dispatch(changeListTitleActionAc({ listId, title }))
    }, [])

    const removeListHandler = useCallback(() => {
        dispatch(removeListActionAc({ listId }))
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
