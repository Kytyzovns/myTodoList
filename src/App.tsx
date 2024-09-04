import React, {useReducer, useState} from 'react';
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

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [listId: string]: TaskType[]
}
export type FilterType = "all" | "completed" | "active"

type ListType = {
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

    const [currentLists, setCurrentLists] = useState<ListType[]>(lists);
    const [currentTasks, dispatchCurrentTasks] = useReducer(TaskReducer, tasks)

    const addTask = (listId: string, title: string) => {
        dispatchCurrentTasks(addTaskAc(listId, title))
    }
    const setDoneHandler = (listId: string, id: string, isDone: boolean) => {
        dispatchCurrentTasks(taskSetDoneAc(listId, id, isDone))
    }
    const removeTask = (listId: string, taskId: string) => {
        dispatchCurrentTasks(removeTaskAc(listId, taskId))
    }
    const changeTaskTitle = (listId: string, title: string, id: string) => {
        dispatchCurrentTasks(changeTaskTitleAc(listId, id, title))
    }


    const addListHandler = (title: string) => {
        let newId = v1();
        setCurrentLists([...currentLists, {listId: newId, title, filter: "all"}])
        dispatchCurrentTasks(addListTaskAc(newId))
    }

    const removeListHandler = (listId: string) => {
        setCurrentLists(currentLists.filter(list => list.listId !== listId))
        delete currentTasks[listId]
    }

    const setFilterHandler = (listId: string, filter: FilterType) => {
        let currentList = currentLists.find(l => l.listId === listId);
        if (currentList) {
            currentList.filter = filter
        }
        setCurrentLists([...currentLists])
    }

    const changeListTitle = (listId: string, title: string) => {
        setCurrentLists(currentLists.map(list => list.listId === listId ? {...list, title} : list))
    }

    const [themeMode, setThemeMode] = useState<boolean>(true)

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
