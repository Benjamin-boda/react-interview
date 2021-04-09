//Filter reducer

const filterReducerDefaultState = {
    category: ""
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case "SORT_BY_CATEGORY":
            return {
                ...state,
                category: action.category
            };
        default:
            return state;
    };
};

export default filterReducer;