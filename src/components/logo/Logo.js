import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0 center pt4">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 190, width: 250 }} >
                <div className="Tilt-inner pt2 pr2 pl2">
                    <img src={brain} alt="brain logo" style={{paddingTop:"5px"}}/>
                    <h1>SmartBrain</h1>
                </div>
                
            </Tilt>
        </div>
    );
}

export default Logo;