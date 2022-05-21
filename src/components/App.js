import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react-dom';
import GlobalStyle from '../assets/globalStyles';

import Header from './Header';
import Main from './Main';
import Schedule from './Schedule';
import Reservation from './Reservation';
import Success from './Success';

export default function App() {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/filme/:idMovie" element={<Schedule />} />
                <Route path="/sessao/:idSession" element={<Reservation />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}