// Sample data for testing
import {
    changeListTitleAc,
    ListsReducer,
    ListType,
    removeListActionAc,
    setFilterActionAc,
    setListsAc,
} from "../ListsReducer"
import { Todolist } from "../../ui/todolists/api/todolistsApi.types"

const initialState: ListType[] = [
    { id: "1", title: "List 1", order: 0, addedDate: "", filter: "all" },
    { id: "2", title: "List 2", order: 1, addedDate: "", filter: "active" },
]

// Test suite for ListsReducer
describe("ListsReducer", () => {
    it("should handle ADD-LIST-TASK", () => {
        const newList = { id: "3", title: "List 3", order: 2, addedDate: "" }
        const action = { type: "ADD-LIST-TASK", payload: newList } as const
        const newState = ListsReducer(initialState, action)

        expect(newState).toHaveLength(3)
        expect(newState).toEqual([...initialState, { ...newList, filter: "all" }])
    })

    it("should handle REMOVE-LIST", () => {
        const action = removeListActionAc({ listId: "1" })
        const newState = ListsReducer(initialState, action)

        expect(newState).toHaveLength(1)
        expect(newState).not.toContainEqual(initialState[0])
    })

    it("should handle CHANGE-TITLE", () => {
        const action = changeListTitleAc({ listId: "1", title: "Updated List 1" })
        const newState = ListsReducer(initialState, action)

        expect(newState[0].title).toBe("Updated List 1")
        expect(newState[1].title).toBe("List 2")
    })

    it("should handle SET-FILTER", () => {
        const action = setFilterActionAc({ listId: "2", filter: "completed" })
        const newState = ListsReducer(initialState, action)

        expect(newState[1].filter).toBe("completed")
        expect(newState[0].filter).toBe("all")
    })

    it("should handle SET_LISTS", () => {
        const newLists: Todolist[] = [
            { id: "3", title: "New List 1", order: 0, addedDate: "" },
            { id: "4", title: "New List 2", order: 1, addedDate: "" },
        ]
        const action = setListsAc(newLists)
        const newState = ListsReducer([], action)

        expect(newState).toHaveLength(2)
        expect(newState[0].filter).toBe("all")
        expect(newState[1].title).toBe("New List 2")
    })

    it("should return the initial state when the action is not recognized", () => {
        const action = { type: "UNKNOWN_ACTION" } as any
        const newState = ListsReducer(initialState, action)

        expect(newState).toBe(initialState)
    })
})
