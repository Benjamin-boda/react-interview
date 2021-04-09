//REMOVE_MOVIE

export const removeMovie = ({id} = {}) => ({
    type: "REMOVE_MOVIE",
    id
});

//EDIT_MOVIE

export const editMovie = (id, updates) => ({
    type: "EDIT_MOVIE",
    id,
    updates
});