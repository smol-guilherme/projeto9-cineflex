import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'

import Footer from './Footer';

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/' // movies/id/showtime

function Session({ weekday, date, showtimes }) {
    return(
        <Container>
            {`${weekday} - ${date}`}
            <Buttons>
                { 
                    showtimes.map((time) => 
                        <Button key={time.id}>
                            <Link style={ { textDecoration: 'none', color: '#FFFFFF' } } to={`/sessao/${time.id}`}>
                                {time.name}
                            </Link>
                        </Button> )
                }
            </Buttons>
        </Container>
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
        <Content>
            <Header>Selecione o horário</Header>
            { schedule.map((item,) => <Session key={item.id} weekday={item.weekday} date={item.date} showtimes={item.showtimes}  /> ) }
            <Footer title={movie.title} poster={movie.posterURL} />
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10vh auto;
    margin-bottom: 14vh;
    width: 100%;
    background-color: #FFFFFF;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    font-size: 20px;
    box-sizing: border-box;
`

const Buttons = styled.div`
    display: flex;
    justify-content: left;
    margin-top: 20px;
    align-items: center;
`

const Button = styled.div`
    display: flex;
    height: 32px;
    width: 64px;
    justify-content: center;
    align-items: center;
    margin: 2px 8px 8px 0;
    border-radius: 2px;
    background-color: #E8833A;
    font-size: 18px;

    &:hover {
        cursor: pointer;
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