import {ListsReducer} from './ListsReducer';
import {addListActionAc, removeListActionAc, setFilterActionAc, changeListTitleActionAc} from './ListsReducer';
import {FilterType, ListType} from '../App';

describe('ListsReducer', () => {

    let initialState: ListType[];

    beforeEach(() => {
        initialState = [
            {listId: '1', title: 'List 1', filter: 'all'},
            {listId: '2', title: 'List 2', filter: 'all'},
        ];
    });

    // Test for ADD-LIST action
    test('should add a new list when "ADD-LIST" action is dispatched', () => {
        const action = addListActionAc('New List', '3');
        const newState = ListsReducer(initialState, action);

        expect(newState.length).toBe(3);
        expect(newState[0]).toEqual({listId: '3', title: 'New List', filter: 'all'});
    });

    // Test for REMOVE-LIST action
    test('should remove the list when "REMOVE-LIST" action is dispatched', () => {
        const action = removeListActionAc('1');
        const newState = ListsReducer(initialState, action);

        expect(newState.length).toBe(1);
        expect(newState[0].listId).toBe('2');
    });

    // Test for CHANGE-TITLE action
    test('should change the title of a list when "CHANGE-TITLE" action is dispatched', () => {
        const action = changeListTitleActionAc('1', 'Updated List 1');
        const newState = ListsReducer(initialState, action);

        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe('Updated List 1');
    });

    // Test for SET-FILTER action
    test('should set the filter of a list when "SET-FILTER" action is dispatched', () => {
        const action = setFilterActionAc('2', 'completed' as FilterType);
        const newState = ListsReducer(initialState, action);

        expect(newState.length).toBe(2);
        expect(newState[1].filter).toBe('completed');
    });

});
