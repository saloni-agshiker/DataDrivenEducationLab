import React from 'react';
import {NavBar} from '../modules/NavBar';
import {ClassDropdown} from '../modules/ClassDropdown';
import './HomePage.css'; 

export function HomePage() {

    return(
        <div>
            <NavBar />
            <div className="title-container">
                <h1>Discussion Forum Analysis</h1>
            </div>
            <div className="description-container">
                <h2> How to Get Started </h2>
                <p> 
                    Discussion Forums Analysis takes in a class's Piazza/edX data 
                    and displays meaningful statistics and charts showcasing 
                    many aspects of a particular forum.
                </p>
            </div>
            <div className="dropdown-container">
                <ClassDropdown />
            </div>
        </div>
    )

}