import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SecondNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="bg-black text-white p-4">
            <div className="flex justify-between items-center">
                <div className="flex space-x-6">
                    <Link to="/home"
                        className={currentPath === '/home' ? 'text-pink-400' : 'hover:text-pink-400 text-white'}>All Events</Link>
                    <Link to="/Addevent"
                        className={currentPath === '/Addevent' ? 'text-pink-400' : 'hover:text-pink-400 text-white'}>Add Event</Link>
                    <Link to="/Myevents"
                        className={currentPath === '/Myevents' ? 'text-pink-400' : 'hover:text-pink-400 text-white'}>My Events</Link>
                </div>
            </div>
        </div>
    );
};

export default SecondNavbar;
