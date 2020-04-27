import * as type from './action-type';

const initState = {
    count: 0,
};

/*
* reducer
 */
export function reducer(state = initState, action) {
    switch (action.type) {
        case type.AddCount:
            return {
                count: state.count + 1
            };
        case type.AddExact:
            return {
                count: state.count + action.parmas
            };
        case type.DelCount:
            return {
                count: state.count - 1
            };
        case type.DelExact:
            return {
                count: state.count - action.parmas
            };
        default:
            return state
    }
}

export function todos(state = [], action) {
    switch (action.type) {
        case type.AddItem:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case type.ShowTrue:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    })
                }
                return todo
            })
        default:
            return state
    }
}




