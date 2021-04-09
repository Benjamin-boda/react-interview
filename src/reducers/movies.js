import { movies } from "../movies/movies";

//Movie reducer

const movieReducerDefaultState = movies

export const moviesReducer = (state = movieReducerDefaultState, action) => {
    switch (action.type) {
        case "REMOVE_MOVIE":
            return state.filter(({id}) => id !== action.id)
        case "EDIT_MOVIE":
            return state.map((movie) => {
                if (movie.id === action.id) {
                    return {
                        ...movie,
                        ...action.updates
                    }
                } else {
                    return movie
                }
            })
        default : 
            return state
    }
}