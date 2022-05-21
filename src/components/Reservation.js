import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Footer from './Footer';

function Forms({ seat = "", setForms, forms, index }) {
    
    function handleData(event, seatIndex, isName) {
        const newForms = [...forms]
        
        newForms.map((reservation, index) => {
            if(index === seatIndex) {
                if (isName) {
                    reservation.nome = event.target.value
                }
                else {
                    reservation.cpf = event.target.value
                }
                return {...reservation}
            } else {
                return {...reservation}
            }
        })
        setForms([...newForms])
    }
    return(
        <>
                { seat === "" ? <label>Nome do comprador:</label> : <label>Nome do comprador: (Poltrona {seat})</label> }
                <input 
                    type='text'
                    placeholder='Digite seu nome...'
                    value={forms.nome}
                    onChange={(e) => handleData(e, index, true)}
                    required
                />
                <label>CPF do comprador:</label>
                <input
                    type='text'
                    placeholder='Digite ceu CPF'
                    value={forms.cpf}
                    onChange={(e) => handleData(e, index, false)}
                    minLength={11}
                    maxLength={11}
                    required
                />
        </>
    )
}

const BASE_URL = 'https://mock-api.driven.com.br/api/v5/cineflex/'

export default function Reservation() {
    const navigate = useNavigate();

    const { idSession } = useParams();

    const [day, setDay] = useState([])
    const [session, setSession] = useState([]);
    const [movieData, setMovieData] = useState([]);

    const [seats, setSeats] = useState([]);
    const [reserved, setReserved] = useState([]);

    const [forms, setForms] = useState([])

    useEffect(() => {
        const promise = axios.get(BASE_URL+`showtimes/${idSession}/seats`)
        promise.then((response) => {
            const newSeats = response.data.seats.map((item) => {
                return {...item, isSelected: false}
            })
            setDay(response.data.day)
            setSession(response.data)
            setMovieData(response.data.movie)
            setSeats(newSeats)
        })
    }, []);

    function seatReservation(seatNum) {
        if(!seats[seatNum].isAvailable) {
            alert('Esse assento não está disponível');
            return;
        }
        const newSeats = seats.map((seat, index) => {
            if (seatNum === index)
                return { ...seat, isSelected: !seat.isSelected }
            else
                return seat
        });
        const newForms = [...forms]
        const newReserve = [...reserved]
        newSeats.filter((seat) => {
            if (seat.isSelected && !reserved.includes(seat.name)) {
                newReserve.push(seat.name);
                newForms.push({ idAssento: Number(seat.name), nome: '', cpf: '' })
                return {...seat}
            }
            else if(!seat.isSelected && reserved.includes(seat.name)) {
                const index = newReserve.indexOf(seat.name)

                newReserve.splice(index, 1);
                newForms.splice(index, 1);
                return {...seat}
            } 
            return null
        })

        setReserved([...newReserve]);
        setForms([...newForms])
        setSeats([...newSeats]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let formSeats = seats.filter((item) => {
            if(item.isSelected) {
                const newItem = {...item}
                delete newItem.isSelected;
                return {...newItem }
            } else {
                return null
            }
        })

        const ids = formSeats.map((seat) => {
            return seat.id;
        })

        const request = {
            ids: ids,
            compradores: [...forms]
        }
        const promise = axios.post(BASE_URL+'seats/book-many', request);
        promise.then((response) => {
            const info = [...forms]
            navigate("/sucesso", { replace: true, state: { movie: session, info: info }} )
        });
    }

    return(
        <Content>
            <Header>Selecione o(s) assento(s)</Header>
            <Seats>
                {
                    seats.map((seat, index) => <Seat key={index} isAvailable={seat.isAvailable} isSelected={seat.isSelected} onClick={() => seatReservation(index)}> {seat.name} </Seat>
                )}
                <Tooltip className='tooltip'>
                    <Box><Seat isAvailable={false} isSelected={true}></Seat>Selecionado</Box>
                    <Box><Seat isAvailable={true} ></Seat>Disponível</Box>
                    <Box><Seat isAvailable={false}></Seat>Indisponível</Box>
                </Tooltip>
                <InputWrapper onSubmit={handleSubmit}>
                    <Formsbox>
                        { 
                            reserved.length > 0 && reserved.map((seatNum, index) => 
                                <Forms key={seatNum} seat={seatNum} index={index} setForms={setForms} forms={forms} /> ) 
                        }
                    </Formsbox>
                    <Submit type='submit'>Reservar assento(s)</Submit>
                </InputWrapper>
            </Seats>
            <Footer poster={movieData.posterURL} weekday={day.weekday} title={movieData.title} name={session.name} />
        </Content>
    )    
}

const Header = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    margin-top: 25px;
    text-align: center;
    font-size: 24px;
`

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
    justify-content: space-around;
    width: 100%;
    height: fit-content;
    margin: 15px 0;
    padding: 0 5%;
    box-sizing: border-box;
    overflow-y: hidden;
`

const Seat = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    font-size: 11px;
    margin: 2px;
    color: black;
    background-color: ${ props => props.isSelected ? '#8DD7CF' : props.isAvailable ? '#C3CFD9' : '#FBE192' };
    border: ${ props => props.isSelected ? '1px solid #1AAE9E' : props.isAvailable ? '1px solid #7B8B99' : '1px solid #F7C52B' };
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

const InputWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    margin: 10px 0;
    font-size: 18px;
    color: #293845;
    
    input {
        display: flex;
        width: 100%;
        min-height: 40px;
        padding: 2px 8px;
        margin: 6px 0;
        border-radius: 3px;
        border: 1px solid #D4D4D4;
        box-sizing: border-box;
    }

    input::placeholder {
        font-family: 'Roboto', sans-serif;
        font-style: italic;
        font-size: 18px;
        color: #AFAFAF;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
`

const Submit = styled.button`
    display: flex;
    height: 48px;
    width: 60%;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    margin-top: 50px;
    padding: 10px;
    border-radius: 5px;
    background-color: #E8833A;
    color: #FFFFFF;
    font-size: 18px;
    border: none;
    box-sizing: border-box;

    &:hover {
        cursor: pointer;
    }
`

const Formsbox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 160px;
    overflow-y: scroll;
`
