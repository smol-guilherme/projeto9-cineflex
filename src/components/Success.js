import { useState } from "react-dom"
import { useLocation } from "react-router-dom"

import styled from 'styled-components';

export default function Success() {
    const location = useLocation();
    const state = location.state
    
    console.log(state)
    return (
        <Content>
            <Movie />
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