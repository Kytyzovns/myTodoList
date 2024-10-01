import React, {memo, useCallback} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {AddItem} from "../../../../common/components/AddItem/AddItem";
import {AddItemInput} from "../../../../MaterialStyles";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../model/store";
import {addListTaskAc} from "../../model/TasksReducer";
import {ListType} from "../../model/ListsReducer";

export const Lists = memo(() => {
    const dispatch = useDispatch();
    const currentLists = useSelector<StoreType, ListType[]>(state => state.lists)

    const addListHandler = useCallback((title: string) => {
        let action = addListTaskAc({title})
        dispatch(action)
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
                                          list = {list}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>

        </Container>
    );
});

