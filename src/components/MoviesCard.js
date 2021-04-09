import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie, editMovie } from "../actions/movies";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { movies } from "../movies/movies";
import getVisibleMovies from "../selectors/movies";

export const MoviesCard = ({ emptyFilter, currentPage, setCurrentPage, itemPerPage, isFiltered}) => {
    const [removed, setRemoved] = useState(false)
    const [dislikeOrLike, setDislikeOrLike] = useState("")
    const [idLikedMovie, setIdLikedMovie] = useState("")
    const moviesInStore = useSelector(state => getVisibleMovies(state.movies, state.filters))
    const dispatch = useDispatch()

    
    const [moviesDisplayed, setMoviesDiplayed] = useState([])
    const numberOfPage = Math.ceil(moviesInStore.length/itemPerPage)

    useEffect(() => {
        if (dislikeOrLike === "like") {
            if (movies.find(movie => movie.id === idLikedMovie).dislikes !== moviesDisplayed.find(movie => movie.id === idLikedMovie).dislikes) {
                const movieUpdate = {
                    id: moviesDisplayed.find(movie => movie.id === idLikedMovie).id,
                    title: moviesDisplayed.find(movie => movie.id === idLikedMovie).title,
                    category: moviesDisplayed.find(movie => movie.id === idLikedMovie).category,
                    likes: moviesDisplayed.find(movie => movie.id === idLikedMovie).likes + 1,
                    dislikes: moviesDisplayed.find(movie => movie.id === idLikedMovie).dislikes - 1
                }
                dispatch(editMovie(idLikedMovie, movieUpdate))
            } else {
                const movieUpdate = {
                    id: moviesDisplayed.find(movie => movie.id === idLikedMovie).id,
                    title: moviesDisplayed.find(movie => movie.id === idLikedMovie).title,
                    category: moviesDisplayed.find(movie => movie.id === idLikedMovie).category,
                    likes: moviesDisplayed.find(movie => movie.id === idLikedMovie).likes + 1,
                    dislikes: moviesDisplayed.find(movie => movie.id === idLikedMovie).dislikes
                }
                dispatch(editMovie(idLikedMovie, movieUpdate))
            }
        } else if (dislikeOrLike === "dislike") {
            if (movies.find(movie => movie.id === idLikedMovie).likes !== moviesDisplayed.find(movie => movie.id === idLikedMovie).likes) {
                const movieUpdate = {
                    id: moviesDisplayed.find(movie => movie.id === idLikedMovie).id,
                    title: moviesDisplayed.find(movie => movie.id === idLikedMovie).title,
                    category: moviesDisplayed.find(movie => movie.id === idLikedMovie).category,
                    likes: moviesDisplayed.find(movie => movie.id === idLikedMovie).likes - 1,
                    dislikes: moviesDisplayed.find(movie => movie.id === idLikedMovie).dislikes + 1
                }
                dispatch(editMovie(idLikedMovie, movieUpdate))
            } else {
                const movieUpdate = {
                    id: moviesDisplayed.find(movie => movie.id === idLikedMovie).id,
                    title: moviesDisplayed.find(movie => movie.id === idLikedMovie).title,
                    category: moviesDisplayed.find(movie => movie.id === idLikedMovie).category,
                    likes: moviesDisplayed.find(movie => movie.id === idLikedMovie).likes,
                    dislikes: moviesDisplayed.find(movie => movie.id === idLikedMovie).dislikes + 1
                }
                dispatch(editMovie(idLikedMovie, movieUpdate))
            }
        }
        setDislikeOrLike("")
        setIdLikedMovie("")
    }, [dislikeOrLike])

    useEffect(() => {

        if (currentPage === 3 & numberOfPage === 2 || currentPage === 2 & numberOfPage === 1 || currentPage === 3 & numberOfPage === 1) {
            setCurrentPage(numberOfPage)
        }
        const startIndex = currentPage * itemPerPage - itemPerPage
        const endIndex = startIndex + itemPerPage

        setMoviesDiplayed(moviesInStore.slice(startIndex , endIndex))

    }, [currentPage, itemPerPage, dislikeOrLike, removed, isFiltered])

    useEffect(() => {
        const timer = setTimeout(() => {
            setRemoved(!removed)
          }, 500);
          return () => clearTimeout(timer);
    }, [emptyFilter])

    return (
        <div className="card__container">
            <div className="card__display">
                {
                    moviesDisplayed.map(( movie ) => 
                        <div className="card" key={movie.id}>
                            <h2 className="card__title">{movie.title}</h2>
                            <p className="card__category">{movie.category}</p>

                            <ProgressBar className="card__progressbar">
                                <ProgressBar 
                                    striped 
                                    variant="success" 
                                    now={(movie.likes/(movie.likes + movie.dislikes))*100} 
                                    label={((movie.likes/(movie.likes + movie.dislikes))*100).toFixed(2) + "%"} 
                                    key={1} 
                                    />
                                <ProgressBar 
                                    striped 
                                    variant="danger" 
                                    now={(movie.dislikes/(movie.likes + movie.dislikes))*100} 
                                    label={((movie.dislikes/(movie.likes + movie.dislikes))*100).toFixed(2) + "%"} 
                                    key={2} 
                                    />
                            </ProgressBar>

                            <div className="card__button__div">
                                <button 
                                    className="card__button__like"
                                    disabled={movies[movie.id - 1].likes === movie.likes ? false : true} 
                                    onClick={() => {
                                        setDislikeOrLike("like")
                                        setIdLikedMovie(movie.id)}}
                                    >
                                        <img className="card__like" src={require("../images/like.png").default}/>
                                </button>
                                <button
                                    className="card__button__like"
                                    disabled={movies[movie.id - 1].dislikes === movie.dislikes ? false : true} 
                                    onClick={() => {
                                        setDislikeOrLike("dislike")
                                        setIdLikedMovie(movie.id)}}
                                    >
                                        <img className="card__dislike" src={require("../images/dislike.png").default}/>
                                </button>

                            </div>
                            <button className="card__remove" onClick={() => {
                                setRemoved(!removed)
                                dispatch(removeMovie(movie))}}>Remove</button>
                        </div>
                    )
                }
            </div>
            

            <div className="card__arrow__div">
	            <button 
                    className="card__button__like"
                    disabled={currentPage === 1 ? true : false} 
                    onClick={() => setCurrentPage(currentPage - 1)}>
                        <img className="card__arrow" src={require("../images/leftarrow.png").default}/>
                </button>
	            <button 
                    className="card__button__like"
                    disabled={currentPage === numberOfPage ? true : false} 
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    <img className="card__arrow" src={require("../images/rightarrow.png").default}/>
                </button>
            </div>

        </div>
    )
}