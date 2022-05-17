import { Link } from 'react-router-dom';

export default function Main() {
    const movies = [
        {
            id: 1,
            title: 'filme de super heroi generico',
            posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
            overview: 'mais um filme igual a todos os outros que voce ja viu',
            releaseDate: '2021-03-18T00:00:00.000Z'
        },
        {
            id: 2,
            title: 'filme de super heroi generico 2',
            posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
            overview: 'mais um filme igual a todos os outros que voce ja viu',
            releaseDate: '2021-04-18T00:00:00.000Z'
        },
        {
            id: 3,
            title: 'filme de super heroi com mais tela verde',
            posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
            overview: 'mais um filme igual a todos os outros que voce ja viu',
            releaseDate: '2021-05-19T00:00:00.000Z'
        },
        {
            id: 4,
            title: 'tela verde, o filme',
            posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg',
            overview: 'mais um filme igual a todos os outros que voce ja viu',
            releaseDate: '2021-04-15T00:00:00.000Z'
        }
    ];

    return (
        <div>
            <h1>Selecione o filme</h1>
            { movies.map((item, index) => <Link to={`/filme/${item.id}`} key={index} release={item.releaseDate} ><img src={item.posterUrl} /></Link>)}
        </div>
    )
}