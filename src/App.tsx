import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItem} from "./AddItem";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AddItemInput} from "./MaterialStyles";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {ApplicationBar} from "./ApplicationBar";
import CssBaseline from '@mui/material/CssBaseline';
import {
    addListTaskAc,
    addTaskAc,
    changeTaskTitleAc,
    removeTaskAc,
    TaskReducer,
    taskSetDoneAc
} from "./model/TasksReducer";
import {
    changeListTitleActionAc,
    ListsReducer,
    removeListActionAc,
    setFilterActionAc
} from "./model/ListsReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [listId: string]: TaskType[]
}
export type FilterType = "all" | "completed" | "active"

export type ListType = {
    listId: string
    title: string
    filter: FilterType
}

function App() {

    let listID = v1();

    const tasks: TasksType = {
        [listID]: [
            {id: v1(), title: "first task", isDone: false},
            {id: v1(), title: "second task", isDone: false},
            {id: v1(), title: "third task", isDone: false},
            {id: v1(), title: "fourth task", isDone: false},
        ]
    }

    const lists: ListType[] = [
        {listId: listID, title: "first list", filter: "all"}
    ]

    const [currentLists, dispatchCurrentLists] = useReducer(ListsReducer, lists);
    const [currentTasks, dispatchCurrentTasks] = useReducer(TaskReducer, tasks)

    const addTask = useCallback((listId: string, title: string) => {
        dispatchCurrentTasks(addTaskAc({listId, title}))
    }, [])
    const setDoneHandler = useCallback((listId: string, id: string, isDone: boolean) => {
        dispatchCurrentTasks(taskSetDoneAc({isDone, id, listId}))
    }, [])
    const removeTask = useCallback((listId: string, id: string) => {
        dispatchCurrentTasks(removeTaskAc({listId, id}))
    }, [])
    const changeTaskTitle = useCallback((listId: string, title: string, id: string) => {
        dispatchCurrentTasks(changeTaskTitleAc({title, id, listId}))
    }, [])


    const addListHandler = useCallback((title: string) => {
        let action = addListTaskAc({title})
        dispatchCurrentLists(action)
        dispatchCurrentTasks(action)
    }, [])
    const removeListHandler = useCallback((listId: string) => {
        dispatchCurrentLists(removeListActionAc({listId}))
    }, [])
    const setFilterHandler = useCallback((listId: string, filter: FilterType) => {
        dispatchCurrentLists(setFilterActionAc({filter, listId}))
    }, [])
    const changeListTitle = useCallback((listId: string, title: string) => {
        dispatchCurrentLists(changeListTitleActionAc({listId, title}))
    }, [])

    const [themeMode, setThemeMode] = useState<boolean>(false)

    const changeTheme = () => {
        setThemeMode(!themeMode);
    }

    const MyTheme = createTheme({
        palette: {
            mode: themeMode ? "dark" : "light"
        }
    })

    return (
        <ThemeProvider theme={MyTheme}>

            <ApplicationBar changeTheme={changeTheme} themeOn={themeMode}/>

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
            <CssBaseline/>
        </ThemeProvider>
    );
}

export default App;
