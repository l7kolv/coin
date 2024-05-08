import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Coins from './Routes/Coins';
import Coin from './Routes/Coin';
import Chart from './Routes/Chart';
import Price from './Routes/Price';

const Router = () => {
   
    return (
        <div>
            <Routes>
                <Route path = "/" element = {<Coins />}/>
                <Route path="/:coinId" element={<Coin />} >
                    <Route path="chart" element={<Chart />} />
                    <Route path="price" element={<Price />} />
                </Route>
            </Routes>
        </div>
    );
};

export default Router;