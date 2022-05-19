import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Footer from './Footer';

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/' // showtimes/id/seats

export default function Reservation() {
    const { idSession } = useParams();

    const [seats, setSeats] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [reserve, setReserve] = useState([]);
    const [blah, setBlah] = useState(false)

    useEffect(() => {
        const promise = axios.get(BASE_URL+`showtimes/${idSession}/seats`)
        promise.then((response) => {
            console.log(response.data)
            const newSeats = response.data.seats.map((item) => {
                return {...item, isTaken: false}
            })
            console.log(newSeats)
            setSeats(newSeats)
        })
    }, []);

    return(
        <Content>
            <Header>Selecione o(s) assento(s)</Header>
            <Seats>
                {
                    seats.map((seat, index) => <Seat key={index} isAvailable={seat.isAvailable} isTaken={seat.isTaken} onClick={() => setBlah(!blah)}> {seat.name} </Seat>
                )}
                <Tooltip className='tooltip'>
                    <Box><Seat isAvailable={false} isTaken={true}></Seat>Selecionado</Box>
                    <Box><Seat isAvailable={true} ></Seat>Disponível</Box>
                    <Box><Seat isAvailable={false}></Seat>Indisponível</Box>
                </Tooltip>
            </Seats>
            <Footer />
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

const Seats = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    margin: 20px 10px;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 100%;
    text-align: center;
    font-size: 24px;
`

const Seat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-size: 11px;
    margin: 5px;
    color: black;
    background-color: ${ props => props.isAvailable ? '#C3CFD9' : props.isTaken ? '#8DD7CF' : '#FBE192' };
    border: ${ props => props.isAvailable ? '1px solid #808F9D' : props.isTaken ? '1px solid #1AAE9E' : '1px solid #F7C52B' };
`

const Tooltip = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 30px;
    margin: 25px 0;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-size: 13px;
    color: #4E5A65;
`

// '#FBE192'
// '1px solid #F7C52B'