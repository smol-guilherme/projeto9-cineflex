import { useState } from "react-dom"
import { useLocation } from "react-router-dom"

import styled from 'styled-components';

function Movie({ title = "", date = "", time = "" }) {
    return(
        <Container>
            <li>{title}</li>
            <li>{date} {time}</li>
        </Container>
    )
}

export default function Success() {
    const location = useLocation();
    const state = location.state
    const [movieData, setMovieData] = useState([])
    
    function getData() {
        const time = {...state.movie.name}
        const date = {...state.movie.day.date}
        const title = {...state.movie.movie.title}
        return { time, date, title }
    }

    console.log(state)
    return (
        <Content>
            <Header>Pedido feito com sucesso!</Header>
            <Movie title={movieData.title} date={movieData.date} time={movieData.time} />
            <Seats>
                { state.info.ids.map((id, index) => <Seat key={index}>Assento {id}</Seat>) }
            </Seats>
            <Buyer />
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

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-decoration: none;
`

const Buyer = styled.div`
    display: flex;
`

const Seats = styled.div`
    display: flex;
`

const Seat = styled.div`
    display: flex;
`

const Header = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 30px;
    width: 100%;
    margin-top: 30px;
    font-size: 24px;
    color: #247A6B;
`