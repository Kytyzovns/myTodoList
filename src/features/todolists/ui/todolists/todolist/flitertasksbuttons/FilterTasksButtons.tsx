import React, {memo} from 'react';
import {StyledButton} from "../../../../../../MaterialStyles";
import {FilterType, ListType, setFilterActionAc} from "../../../../model/ListsReducer";
import {useDispatch} from "react-redux";

type FilterTasksButtonsProps = {
    list: ListType
}

export const FilterTasksButtons = memo(({list}: FilterTasksButtonsProps) => {
    const {filter, listId} = list

    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterType) => {
        dispatch(setFilterActionAc({ listId, filter }))
    }
    return (
        <div>
            <StyledButton variant={filter === "all" ? "contained" : "outlined"}
                          onClick={() => changeFilterTasksHandler("all")}>all
            </StyledButton>
            <StyledButton variant={filter === "active" ? "contained" : "outlined"}
                          onClick={() => changeFilterTasksHandler("active")}>active
            </StyledButton>
            <StyledButton variant={filter === "completed" ? "contained" : "outlined"}
                          onClick={() => changeFilterTasksHandler("completed")}>completed
            </StyledButton>
        </div>
    );
});

