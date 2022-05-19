import styled from 'styled-components';

export default function Header() {
    return(
        <Container>
            CINEFLEX
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 8.25%;
    width: 100%;
    background-color: #C3CFD9;
    color: #E8833A;
    font-size: 34px;
    position: fixed;
    top: 0;
    left: 0;
`