import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react-dom';

import Header from './Header';
import Main from './Main';
import Schedule from './Schedule';
import Reservation from './Reservation';
import Success from './Success';

export default function App() {
    
    return (
        <BrowserRouter>
            <Main />
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/filme/:id" element={<Schedule />} />
                <Route path="/sessao/:sid" element={<Reservation />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}