import { Link } from 'react-router-dom';

function Session({ id, weekday, date, showtimes }) {
    return(
        <div>
            {`${weekday} - ${date}`}
            { showtimes.map((time) => <Link to={`/sessao/${time.id}`} id={time.id}> {time.name} </Link> )}
        </div>
    )
}

export default function Schedule() {

    const times = [
    {
        "id": 24062021,
        "weekday": "Quinta-feira",
        "date": "24/06/2021",
        "showtimes": [
            {
                "name": "15:00",
                "id": 1
            },
            {
                "name": "19:00",
                "id": 2
            }
        ]
    },
    {
        "id": 25062021,
        "weekday": "Sexta-feira",
        "date": "25/06/2021",
        "showtimes": [
            {
                "name": "15:00",
                "id": 3
            },
            {
                "name": "19:00",
                "id": 4
            }
        ]
    },
    {
        "id": 26062021,
        "weekday": "Sábado",
        "date": "26/06/2021",
        "showtimes": [
            {
                "name": "15:00",
                "id": 5
            },
            {
                "name": "19:00",
                "id": 6
            }
        ]
    },
]

    return(
        <>
            <h1>Selecione o horário</h1>
            {times.map((item, index) => <Session key={index} id={item.id} weekday={item.weekday} date={item.date} showtimes={item.showtimes}  /> )}
        </>
    )
}