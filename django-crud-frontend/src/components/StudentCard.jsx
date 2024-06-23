import React from 'react';
import { NavLink } from 'react-router-dom';

function StudentCard(props) {
    return (
        <NavLink to={`/@${props.user}`} exact="true" className="p-2 lg:w-1/2 md:w-1/2 w-full">
            <div className="w-full">
                <div className="h-full flex items-center border-gray-800 hover:border-teal-50 border p-4 rounded-lg" style={{ 'background': '#74969D' }}>
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={props.img} />
                    <div className="flex-grow">
                        <h2 className="text-white title-font font-medium">{props.name}</h2>
                        <p className="text-gray-600">{props.class_name}</p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default StudentCard;
