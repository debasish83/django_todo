import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";

function MovieDetails(props) {
    const mov = props.movie;
    //We would like users to rate the movie and then take the input back to our backend
    //If I hover using the mouse, I would like to highlight purple till that
    const [highlighted, setHighlighted] = useState(-1);
    const [token] = useCookies(['mr-token']);

    const highlightRate = high => evt => {
        setHighlighted(high);
    }

    const rateClicked = rate => evt => {
        console.log(rate)
        //call the API to set the rating
        //which movie to trigger ? it's in mov.props
        fetch(`http://127.0.0.1:8000/api/movierater/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`
            },
            body: JSON.stringify({stars: rate + 1})
        })
            .then( () => getDetails())
            .catch(error => console.log(error))
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movierater/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`
            },
        })
            .then(resp => resp.json())
            .then(resp => props.updateMovie(resp))
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {mov ? (
                <div>
                    <h1>{mov.title}</h1>
                    <p>{mov.description}</p>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 0 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 1 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 2 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 3 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_ratings > 4 ? "orange": ''}/>
                    ({mov.no_of_ratings})
                    <div className={"rate-container"}>
                        <h2>Rate it</h2>
                        {[...Array(5)].map( (e,i) => {
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? "purple": ''}
                                                    onMouseEnter={highlightRate(i)}
                                                    onMouseLeave={highlightRate(-1)}
                                                    onClick={rateClicked(i)}
                            />
                        })}
                    </div>
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieDetails;