import { addListTaskType } from "../TasksReducer"
import {
    changeListTitleAc,
    FilterType,
    ListsReducer,
    ListType,
    removeListActionAc,
    setFilterActionAc,
} from "../ListsReducer"

describe("ListsReducer", () => {
    let initialState: ListType[]

    beforeEach(() => {
        initialState = [
            { id: "1", title: "Groceries", filter: "all", order: 0, addedDate: new Date().toString() },
            { id: "2", title: "Work", filter: "active", order: 1, addedDate: new Date().toString() },
        ]
    })

    test("should add a new list task", () => {
        const action: addListTaskType = {
            type: "ADD-LIST-TASK",
            payload: { listId: "3", title: "New Task" },
        }

        const newState = ListsReducer(initialState, action)
        expect(newState.length).toBe(3)
        expect(newState[2].title).toBe("New Task")
    })

    test("should remove a list by id", () => {
        const action = removeListActionAc({ listId: "1" })
        const newState = ListsReducer(initialState, action)
        expect(newState.length).toBe(1)
        expect(newState[0].id).toBe("2")
    })

    test("should change the title of the list", () => {
        const action = changeListTitleAc({ listId: "1", title: "Updated Groceries" })
        const newState = ListsReducer(initialState, action)
        expect(newState[0].title).toBe("Updated Groceries")
        expect(newState[1].title).toBe("Work")
    })

    test("should set filter for a list", () => {
        const action = setFilterActionAc({ listId: "2", filter: "completed" as FilterType })
        const newState = ListsReducer(initialState, action)
        expect(newState[1].filter).toBe("completed")
    })

    test("should return the default state if the action type is not recognized", () => {
        const action = { type: "UNKNOWN_ACTION" }
        const newState = ListsReducer(initialState, action as any)
        expect(newState).toEqual(initialState)
    })
})
