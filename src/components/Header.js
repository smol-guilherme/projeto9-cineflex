import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Back({ navigate }){
    return(<Icon onClick={() => navigate(-1)}><ion-icon name="arrow-back-circle"></ion-icon></Icon>)
}

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

    return(
        <Container>
            { location.pathname !== '/' ? <Back navigate={navigate} /> : ''}
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

const Icon = styled.div`
    display: flex;
    position: fixed;
    width: 30px;
    height: 30px;
    top: 2%;
    left: 3%;
    color: #E8833A;
    font-size: 36px;

    &:hover {
        cursor: pointer;
    }
`
