import React from 'react';
import '../index.css';

function Header() {
    return (
        <header className='w-full h-14 header-s-dbms rounded-md text-white flex items-center justify-between px-2 shadow-md'>
            {/* Current Page Viewer */}
            <div className='flex items-cente w-64 space-x-2' style={{ width: '285px' }}>
                <div className='w-full rounded-md px-4 py-2 text-sm font-semibold'>
                    Current Page
                </div>
            </div>
            <div className="h-3/4 rounded-md w-2 landing-clr mx-2"></div>

            {/* Navigation Buttons */}
            <div className='flex space-x-4'>
                <button className='w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-500'>
                    <span className='material-icons'>chevron_left</span>
                </button>
                <button className='w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-500'>
                    <span className='material-icons'>chevron_right</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className='flex-1 mx-6'>
                <input
                    type='text'
                    placeholder='Search...'
                    className='w-full h-10 px-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
            </div>

            {/* Circular Icons */}
            <div className='flex space-x-4'>
                <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                    <span className='material-icons text-gray-700'>account_circle</span>
                </div>
                <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                    <span className='material-icons text-gray-700'>notifications</span>
                </div>
                <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                    <span className='material-icons text-gray-700'>settings</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
