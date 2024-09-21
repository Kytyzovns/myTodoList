import React, {useCallback} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {AddItem} from "../AddItem";
import {AddItemInput} from "../MaterialStyles";
import Paper from "@mui/material/Paper";
import {Todolist} from "../Todolist";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../model/store";
import {addListTaskAc, addTaskAc, changeTaskTitleAc, removeTaskAc, taskSetDoneAc} from "../model/TasksReducer";
import {changeListTitleActionAc, removeListActionAc, setFilterActionAc} from "../model/ListsReducer";
import {FilterType, ListType, TasksType} from "../App";

export const Lists = () => {
    const dispatch = useDispatch();
    const currentLists = useSelector<StoreType, ListType[]>(state => state.lists)
    const currentTasks = useSelector<StoreType, TasksType>(state => state.tasks)

    const addTask = useCallback((listId: string, title: string) => {
        dispatch(addTaskAc({listId, title}))
    }, [])
    const setDoneHandler = useCallback((listId: string, id: string, isDone: boolean) => {
        dispatch(taskSetDoneAc({isDone, id, listId}))
    }, [])
    const removeTask = useCallback((listId: string, id: string) => {
        dispatch(removeTaskAc({listId, id}))
    }, [])
    const changeTaskTitle = useCallback((listId: string, title: string, id: string) => {
        dispatch(changeTaskTitleAc({title, id, listId}))
    }, [])


    const addListHandler = useCallback((title: string) => {
        let action = addListTaskAc({title})
        dispatch(action)
    }, [])
    const removeListHandler = useCallback((listId: string) => {
        dispatch(removeListActionAc({listId}))
    }, [])
    const setFilterHandler = useCallback((listId: string, filter: FilterType) => {
        dispatch(setFilterActionAc({filter, listId}))
    }, [])
    const changeListTitle = useCallback((listId: string, title: string) => {
        dispatch(changeListTitleActionAc({listId, title}))
    }, [])
    return (
        <Container fixed>
            <Grid sx={{padding: "30px"}} container>
                <AddItem sxInputStyles={AddItemInput} sxButtonStyles={{height: "40px"}} buttonVariant={"contained"}
                         addItem={addListHandler} buttonName={"Add List"}/>
            </Grid>
            <Grid container>
                {currentLists.map((list) => {
                    return (
                        <Grid size={4}>
                            <Paper sx={{padding: "10px", margin: "15px"}} elevation={3}>
                                <Todolist key={list.listId}
                                          listTitle={list.title}
                                          tasks={currentTasks[list.listId]}
                                          removeList={removeListHandler}
                                          listId={list.listId}
                                          addTask={addTask}
                                          setFilter={setFilterHandler}
                                          setDone={setDoneHandler}
                                          removeTask={removeTask}
                                          filter={list.filter}
                                          changeTaskTitle={changeTaskTitle}
                                          changeListTitle={changeListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>

        </Container>
    );
};

