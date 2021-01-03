import React, {useState, useEffect} from 'react';
import API from '../api-services';
import {useCookies} from "react-cookie";

//props is immutable
function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mr-token']);

    // Since we are not using class based components we don't get lifecycle methods
    // useEffect hook can be used for that
    // update the state whenever there is a change on props.movie
    useEffect(() => {
        setTitle(props.movie.title);
        setDescription(props.movie.description)
    }, [props.movie])

    const updateClicked = () => {
        API.updateMovie(token['mr-token'], props.movie, {title, description})
            .then(resp => props.updatedMovie(resp))
            .catch(error => console.log(error))
    }

    const createClicked = () => {
        API.createMovie(token['mr-token'], {title, description})
            .then(resp => props.movieCreated(resp))
            .catch(error => console.log(error))
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <React.Fragment>
            {props.movie ? (
                <div>
                    <label htmlFor={"title"}>Title</label><br/>
                    <input id="title" type={"text"} placeholder={"title"}
                        value={title} onChange={evt => setTitle(evt.target.value)}
                    /><br/>
                    <label htmlFor={"description"}>Description</label><br/>
                    <textarea id={"description"}
                              type={"text"}
                              placeholder={"Description"}
                              value={description}
                              onChange={evt => setDescription(evt.target.value)}
                    >
                    </textarea><br/>
                    { // if it's a update case we have the fetched movie props.movie.id}
                        props.movie.id ?
                            <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
                            <button onClick={createClicked} disabled={isDisabled}>Create</button>
                    }
                </div>
            ): null }
        </React.Fragment>
    )
}

export default MovieForm;
