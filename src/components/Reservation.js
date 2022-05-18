import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/' // showtimes/id/seats

export default function Reservation() {
    const { idSession } = useParams();
    
    const [movie, setMovie] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const promise = axios.get(BASE_URL+`showtimes/${idSession}/seats`)
        promise.then((response) => {
            setMovie(response.data)
        })
    }, []);

    return(
        <div className='content with-footer'>
            <h1>Selecione o(s) assento(s)</h1>
        </div>
    )    
}