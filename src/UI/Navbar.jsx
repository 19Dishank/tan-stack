import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import navItems from '../APIs/NavItems.json'

const Navbar = () => {


    const activeStyle = ({ isActive }) => {

        return `transition-all duration-300 px-1 py-1 uppercase font-bold tracking-wide ${isActive
            ? "text-indigo-500 border-b-2 border-indigo-500"
            : "text-slate-300 hover:text-white hover:border-b-2 hover:border-slate-500"
            }`
    }
    return (
        <div className='w-full min-h-20 bg-black px-10 sticky top-0 z-50 border-b border-slate-800'>
            
            <div className='flex flex-col md:flex-row justify-between items-center min-h-20 py-4 md:py-0'>

                
                <div className='flex items-center italic mb-4 md:mb-0'>
                    <span className='font-extrabold  text-2xl uppercase text-slate-100'>Tan</span>
                    <span className='font-extrabold text-2xl uppercase text-indigo-500'>Stack</span>
                </div>

                
                <div className='flex flex-wrap justify-center md:justify-end items-center gap-5 text-slate-100'>
                    {navItems.map((ele) => (
                        <NavLink to={ele.location} key={ele.location} className={activeStyle}>
                            {ele.heading}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Navbar;