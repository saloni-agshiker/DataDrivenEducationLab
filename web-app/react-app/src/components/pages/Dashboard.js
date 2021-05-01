import React from 'react'
import {BarChart} from '../modules/BarChart';
import {LineChart} from '../modules/LineChart';
import {PieChart} from '../modules/PieChart';
import {NavBar} from '../modules/NavBar';
import './Dashboard.css'; 

export function Dashboard() {

    return (
        <div>
            <NavBar />

            <div className='title-container'>
                <h1> Dashboard </h1>
            </div>

            <div className='barchart-container'>
                <h2> Top Student Posters </h2>
                <BarChart />
            </div>

            <div className='linechart-container'> 
                <h2> Posts Over Time</h2>
                <LineChart />
            </div>

            <div className='piechart-container'>
                <h2> Posts per Topic </h2>
                <PieChart />
            </div>
            

        </div>
    )
}
