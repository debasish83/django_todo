import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import MovieList from './components/movielist';
import MovieDetails from './components/moviedetails';
import MovieForm from './components/movieform';
import './App.css';
import {useCookies} from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faFilm, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {useFetch} from './hooks/useFetch'

function App() {
    const [movies, setMovies] = useState(['movie1', 'movie2']);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState(null);
    const [token, setToken, deleteToken] = useCookies(['mr-token']);
    const [data, loading, error] = useFetch();

    // With REST we have to fetch all the objects and every field related to the
    // object. With graphql we can pull only specific fields that are needed from
    // an object

    //Wrote a custom hook in useFetch to replace the useEffect
    /*
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/movierater/movies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`
            }
        })
            .then(resp => resp.json())
            .then(resp => setMovies(resp))
            .catch(error => console.log(error))
    }, [])
     */

    useEffect(() => {
        setMovies(data);
    }, [data])

    //Do the authorization check on all SPA we have to ensure users
    //are always authenticated
    useEffect(() => {
        console.log(token);
        if(!token['mr-token']) window.location.href = '/';
    }, [token])

    // We are sending movieClicked function from the parent component to the child component
    // Now we can send the selected movie to Movie Details component that will display the
    // details about the movie
    const editClicked = movie => {
        setEditedMovie(movie);
        setSelectedMovie(null);
        console.log(movie.title)
    }

    const loadMovie = movie => {
        setSelectedMovie(movie)
        setEditedMovie(null)
    }

    // We have the list from current state, we just update it
    const updatedMovie = movie => {
        const newMovies = movies.map(mov => {
            if (mov.id === movie.id) {
                return movie;
            }
            return mov;
        })
        setMovies(newMovies)
    }

    const newMovie = () => {
        setEditedMovie({title: '', description: ''})
        setSelectedMovie(null)
    }

    const movieCreated = movie => {
        const newMovies = [...movies, movie]
        setMovies(newMovies);
    }

    const removeClicked = movie => {
        const newMovies = movies.filter(mov => {
            if (mov.id === movie.id) return false
            else return true
        })
        setMovies(newMovies);
        //it's not removed from API yet and so we need to call it
    }

    const logoutUser = () => {
        deleteToken('mr-token');
    }

    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Error Loading Movies </h1>

    // initially we designed the layout for 2 columns but now we have a MovieForm
    // column and we need to change the layout
    // className=layout setup the grid layout with 2 columns. If we add 3 components
    // it will overflow into 3 columns
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    <FontAwesomeIcon icon={faFilm}/>
                    <span>Movie Rater</span>
                    <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
                </h1>
                <div className={"layout"}>
                    <div>
                        <MovieList movies={movies}
                                   movieClicked={loadMovie}
                                   editClicked={editClicked}
                                   removeClicked={removeClicked}
                        />
                        <button onClick={newMovie}>New Movie</button>
                    </div>
                    <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
                    { editedMovie ? <MovieForm movie={editedMovie}
                                               updatedMovie={updatedMovie}
                                               movieCreated={movieCreated}/> : null }
                </div>
            </header>
        </div>
    );
}

export default App;
