import { v1 } from "uuid";
import {
    addListTaskAc,
    addTaskAc,
    changeTaskTitleAc,
    removeTaskAc,
    TaskReducer,
    taskSetDoneAc,
    TasksType
} from "../TasksReducer";

describe("TaskReducer", () => {
    let initialState: TasksType;

    beforeEach(() => {
        initialState = {
            "list1": [
                { id: "1", title: "Task 1", isDone: false },
                { id: "2", title: "Task 2", isDone: true }
            ],
            "list2": [
                { id: "3", title: "Task 3", isDone: false }
            ]
        };
    });

    test("should remove a task by id", () => {
        const action = removeTaskAc({ listId: "list1", id: "1" });
        const newState = TaskReducer(initialState, action);
        expect(newState["list1"].length).toBe(1);
        expect(newState["list1"].find(task => task.id === "1")).toBeUndefined();
    });

    test("should add a new task", () => {
        const action = addTaskAc({ listId: "list1", title: "New Task" });
        const newState = TaskReducer(initialState, action);
        expect(newState["list1"].length).toBe(3);
        expect(newState["list1"][0].title).toBe("New Task");
        expect(newState["list1"][0].isDone).toBe(false);
    });

    test("should change the title of a task", () => {
        const action = changeTaskTitleAc({ listId: "list1", id: "1", title: "Updated Task 1" });
        const newState = TaskReducer(initialState, action);
        expect(newState["list1"][0].title).toBe("Updated Task 1");
    });

    test("should add a new list with an empty task array", () => {
        const action = addListTaskAc({ title: "New List" });
        const newState = TaskReducer(initialState, action);
        const newListId = Object.keys(newState).find(id => newState[id].length === 0); // Find the new list with empty tasks
        expect(newState[newListId!]).toEqual([]);
    });

    test("should set the task as done", () => {
        const action = taskSetDoneAc({ listId: "list1", id: "1", isDone: true });
        const newState = TaskReducer(initialState, action);
        expect(newState["list1"][0].isDone).toBe(true);
    });

    test("should return the default state if the action type is not recognized", () => {
        const action = { type: "UNKNOWN_ACTION" };
        const newState = TaskReducer(initialState, action as any);
        expect(newState).toEqual(initialState);
    });
});
