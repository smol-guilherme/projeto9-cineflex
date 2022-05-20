import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import styled from 'styled-components';

function Infobox({ header = "", main = "", info = "", extra="" }) {
    return(
        <Container>
            <Info>{header}</Info>
            { typeof main === "object" ? main.map((data, index) => <Info key={index}>{extra} {data}</Info>) : <Info>{extra} {main}</Info> }
            <Info>{info}</Info>
        </Container>
    )
}

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state

    console.log(state)
    
    const [clientData, setClientData] = useState([]);
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const ids = state.info.ids.map((item) => item)
        // const names = state.info.names.map((item) => item)
        // const cpfs = state.info.cpfs.map((item) => item)
        const names = state.info.name
        const cpfs = state.info.cpf
        setClientData({ ids, names, cpfs });

        const title = state.movie.movie.title
        const date = state.movie.day.date + " " + state.movie.name
        setMovieData({ title, date });
    }, [])

    function backHome() {
        setClientData([])
        setMovieData([])
        navigate('/')
    }

    return (
        <Content>
            <Header>Pedido feito com sucesso!</Header>
            <Infobox header="Filme e sessão" title={movieData.title ? movieData.title : ""} main={movieData.date ? movieData.date : "29/04/1994 23:55"}  />
            {
            clientData.hasOwnProperty('names') 
                ? 
                    <>
                        <Infobox header={'Ingressos'} main={clientData.ids} extra={'Assento'} />
                        <Infobox header={'Comprador'} main={`Nome: ${clientData.names}`} info={`CPF: ${clientData.cpfs}`} />
                    </>
                : 
                    <>
                        <Infobox key={0} header={'Ingresso'} main={'Assento 38'} />
                        <Infobox key={-1} header={'Comprador'} main={'Nome: Template da Silva'} info={'CPF: 1234567890'} />
                    </>
            }
            <Button onClick={backHome}>Voltar para Home</Button>
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
    overflow-x: none;
`

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;

    li:first-of-type {
        font-weight: bold;
        font-size: 24px;
        padding-top: 24px;
        padding-bottom: 10px;
    }
`

const Info = styled.li`
    padding: 3px 20px;
    font-size: 22px;
    width: 100%;
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
    font-weight: bold;
    color: #247A6B;
    box-sizing: border-box;
`

const Button = styled.button`
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