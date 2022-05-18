import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/' // movies/id/showtime

function Session({ weekday, date, showtimes }) {
    return(
        <div className='session-box'>
            {`${weekday} - ${date}`}
            <div className='button-box'>
                { showtimes.map((time) => <Link className='button' to={`/sessao/${time.id}`} key={time.id} id={time.id}> {time.name} </Link> )}
            </div>
        </div>
    )
}

function Footer({ poster, title }) {
    return(
        <div className="footer">
            <div className="poster mini">
                <img src={poster} />
            </div>
            { title }
        </div>
    )
}

export default function Schedule() {
    const { idMovie } = useParams();

    const [movie, setMovie] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const promise = axios.get(BASE_URL+`movies/${idMovie}/showtimes`)
        promise.then((response) => {
            setMovie(response.data)
            setSchedule(response.data.days)
        })
    }, []);

    return(
        <div className='content with-footer'>
            <h1>Selecione o horário</h1>
            { schedule.map((item) => <Session key={item.id} weekday={item.weekday} date={item.date} showtimes={item.showtimes}  /> ) }
            <Footer title={movie.title} poster={movie.posterURL} />
        </div>
    )
}