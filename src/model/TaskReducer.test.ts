import {TasksType} from "../App";
import {v1} from "uuid";
import {addListTaskAc, addTaskAc, changeTaskTitleAc, removeTaskAc, TaskReducer, taskSetDoneAc} from "./TasksReducer";

describe('TaskReducer', () => {
    // Test case for "REMOVE-TASK"
    test('should remove the task correctly', () => {
        const taskIdToRemove = v1();
        const initialState: TasksType = {
            'list-1': [
                {id: taskIdToRemove, title: 'Task to remove', isDone: false},
                {id: v1(), title: 'Another Task', isDone: true}
            ],
            'list-2': [
                {id: v1(), title: 'Task in another list', isDone: false}
            ]
        };

        const action = removeTaskAc('list-1', taskIdToRemove);
        const newState = TaskReducer(initialState, action);

        expect(newState['list-1'].length).toBe(1);  // Ensure one task is removed
        expect(newState['list-1'].find(t => t.id === taskIdToRemove)).toBeUndefined(); // Task should not exist
        expect(newState['list-1'][0].title).toBe('Another Task');  // Ensure other tasks remain unchanged
    });

    // Test case for "ADD-TASK"
    test('should add a new task correctly', () => {
        const initialState: TasksType = {
            'list-1': [
                {id: v1(), title: 'Existing Task', isDone: false}
            ],
            'list-2': [
                {id: v1(), title: 'Task in another list', isDone: false}
            ]
        };

        const newTaskTitle = 'New Task';
        const action = addTaskAc('list-1', newTaskTitle);
        const newState = TaskReducer(initialState, action);

        expect(newState['list-1'].length).toBe(2);  // Ensure a task is added
        expect(newState['list-1'][0].title).toBe(newTaskTitle);  // Ensure the new task is added at the beginning
        expect(newState['list-1'][0].isDone).toBe(false);  // New task should have isDone as false
        expect(newState['list-1'][1].title).toBe('Existing Task');  // Existing task should remain unchanged
    });

    // Test case for "CHANGE-TASK-TITLE"
    test('should change the task title correctly', () => {
        const taskId = v1();
        const initialState: TasksType = {
            'list-1': [
                {id: taskId, title: 'Initial Task', isDone: false},
                {id: v1(), title: 'Another Task', isDone: true}
            ],
            'list-2': [
                {id: v1(), title: 'Task in another list', isDone: false}
            ]
        };

        const action = changeTaskTitleAc('list-1', taskId, 'Updated Task Title');
        const newState = TaskReducer(initialState, action);

        expect(newState['list-1'].length).toBe(2);  // Ensure task count remains the same
        expect(newState['list-1'][0].title).toBe('Updated Task Title');  // Ensure the title was updated
        expect(newState['list-1'][1].title).toBe('Another Task');  // Ensure other tasks remain unchanged
    });

    // Test case for "ADD-LIST-TASK"
    test('should add a new list with an empty task array', () => {
        const initialState: TasksType = {
            'list-1': [
                {id: v1(), title: 'Existing Task', isDone: false}
            ]
        };

        const action = addListTaskAc();
        const newState = TaskReducer(initialState, action);

        expect(Object.keys(newState).length).toBe(2);  // Ensure a new list is added
        expect(newState[action.payload.listId]).toEqual([]);  // Ensure the new list is empty
    });

    // Test case for "SET-DONE"
    test('should set the task completion status correctly', () => {
        const taskId = v1();
        const initialState: TasksType = {
            'list-1': [
                {id: taskId, title: 'Task to complete', isDone: false},
                {id: v1(), title: 'Another Task', isDone: true}
            ]
        };

        const action = taskSetDoneAc('list-1', taskId, true);
        const newState = TaskReducer(initialState, action);

        expect(newState['list-1'].length).toBe(2);  // Ensure task count remains the same
        expect(newState['list-1'][0].isDone).toBe(true);  // Ensure the task completion status is updated
        expect(newState['list-1'][1].isDone).toBe(true);  // Ensure other tasks remain unchanged
    });
});