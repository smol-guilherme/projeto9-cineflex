import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/' // movies

function Poster({ id, poster }) {
    return(
        <div className='poster'>
            <Link to={`/filme/${id}`} >
                <img src={poster} />
            </Link>
        </div> 
    )
}

export default function Main() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get(BASE_URL+'movies')
        promise.then(response => {
            setMovies(response.data)
        })
    }, [])

    return (
        <div className='content'>
            <h1>Selecione o filme</h1>
            <div className='posters'>
                { 
                    movies.map((item, index) => <Poster key={index} id={item.id} poster={item.posterURL} />
                )}
            </div>
        </div>
    )
}