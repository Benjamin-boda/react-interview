//Get visible movies

const getVisibleMovies = (movies, filters) => {
    return movies.filter((movie) => {
        const categoryMatch = filters.category.toLowerCase().includes(movie.category.toLowerCase());

        return categoryMatch;
    })
};

export default getVisibleMovies;