import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/'

function Movie({ id, poster }) {
    return(
        <Poster>
            <Link to={`/filme/${id}`} >
                <img src={poster} />
            </Link>
        </Poster> 
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
        <Content>
            <Header>Selecione o filme</Header>
            <Posters>
                { 
                    movies.map((item, index) => <Movie key={index} id={item.id} poster={item.posterURL} />
                )}
            </Posters>
        </Content>
    );
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10vh auto;
    width: 100%;
    background-color: #FFFFFF;
`

const Posters = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Poster = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 200px;
    padding: 10px;
    margin: 15px;
    background-color: #FFFFFF;
    box-shadow: 0 0 2px 2px #33333360;
    border-radius: 5px;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    margin-top: 30px;
    text-align: center;
    font-size: 24px;
`