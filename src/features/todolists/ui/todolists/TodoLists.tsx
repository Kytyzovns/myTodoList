import React, { memo, useCallback, useEffect } from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { AddItem } from "common/components/AddItem/AddItem"
import { AddItemInput } from "../../../../MaterialStyles"
import Paper from "@mui/material/Paper"
import { Todolist } from "./todolist/Todolist"
import { useDispatch } from "react-redux"
import { addListTaskAc, setTasksAc } from "../../model/TasksReducer"
import { useAppSelector } from "common/hooks/useAppSelector"
import { listsSelector } from "../../model/listSelectors"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import axios from "axios"
import { todoListsApi } from "./api/todoListsApi"
import { setListsAc } from "../../model/ListsReducer"
import { tasksApi } from "./api/tasksApi"

export const TodoLists = memo(() => {
    const dispatch = useAppDispatch()
    const currentLists = useAppSelector(listsSelector)

    const addListHandler = useCallback((title: string) => {
        let action = addListTaskAc({ title })
        dispatch(action)
    }, [])

    useEffect(() => {}, [])

    return (
        <Container fixed>
            <Grid sx={{ padding: "30px" }} container>
                <AddItem
                    sxInputStyles={AddItemInput}
                    sxButtonStyles={{ height: "40px" }}
                    buttonVariant={"contained"}
                    addItem={addListHandler}
                    buttonName={"Add List"}
                />
            </Grid>
            <Grid container>
                {currentLists.map((list) => {
                    return (
                        <Grid key={list.id} size={4}>
                            <Paper sx={{ padding: "10px", margin: "15px" }} elevation={3}>
                                <Todolist key={list.id} list={list} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
})
