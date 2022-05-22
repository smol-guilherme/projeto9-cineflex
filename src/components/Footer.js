import styled from 'styled-components';

export default function Footer({ poster, title, name = "", weekday }) {
    return(
        <Container>
            <Miniature>
                <img src={poster} />
            </Miniature>
            <Infobox>
                <Info>{ title }</Info>
                <Info>{ name.length === 0 ? "" : `${weekday} - ${name}` }</Info>
            </Infobox>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    border-top: 1px solid #9EADBA;
    background-color: #DFE6ED;
    color: #293845;
    min-height: 14vh;
    width: 100%;
    font-size: 26px;
    position: fixed;
    bottom: 0;
    left: 0;
`

const Miniature = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 65px;
    height: 80px;
    margin: 0 5px;
    padding: 3px;
    background-color: #FFFFFF;
    box-shadow: 0 0 1px 1px #33333360;
    border-radius: 2px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const Infobox = styled.div`
    display: flex;
    flex-direction: column;
`

const Info = styled.p`
    display: flex;
    width: 100%;
`

