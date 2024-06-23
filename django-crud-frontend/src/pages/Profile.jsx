import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile(props) {
    const { user } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${props.url}/${user}/`);
                setProfileData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    if (loading) {
        return <p className='text-pink-300'>Loading...</p>;
    }

    if (error) {
        return <p className='text-pink-300'>Error: {error.message}</p>;
    }

    const manipulatedData = profileData ? {
        ...profileData,
        fullName: `${profileData.first_name} ${profileData.last_name}`,
    } : null;

    return (
        <div>
            <h1>Profile Page</h1>
            {manipulatedData ? (
                <div>
                    <p className='text-pink-300'>user: {manipulatedData.user}</p>
                    <p className='text-pink-300'>sno: {manipulatedData.sno}</p>
                    <p className='text-pink-300'>admission_no: {manipulatedData.admission_no}</p>
                    <p className='text-pink-300'>name: {manipulatedData.name}</p>
                    <p className='text-pink-300'>age: {manipulatedData.age}</p>
                    <p className='text-pink-300'>gender: {manipulatedData.gender}</p>
                    <p className='text-pink-300'>profile_img: {manipulatedData.profile_img}</p>
                    <p className='text-pink-300'>class_name: {manipulatedData.class_name}</p>
                    <p className='text-pink-300'>address: {manipulatedData.address}</p>
                    <p className='text-pink-300'>roll_no: {manipulatedData.roll_no}</p>
                    <p className='text-pink-300'>date_of_addmission: {manipulatedData.date_of_addmission}</p>
                    <p className='text-pink-300'>dob: {manipulatedData.dob}</p>
                    <p className='text-pink-300'>about: {manipulatedData.about}</p>
                    <p className='text-pink-300'>fathers_name: {manipulatedData.fathers_name}</p>
                    <p className='text-pink-300'>mothers_name: {manipulatedData.mothers_name}</p>
                    <p className='text-pink-300'>phone_num: {manipulatedData.phone_num}</p>
                    <p className='text-pink-300'>phone_num_alt: {manipulatedData.phone_num_alt}</p>
                    <p className='text-pink-300'>phone_gardian: {manipulatedData.phone_gardian}</p>
                    <p className='text-pink-300'>isactive: {manipulatedData.isactive}</p>
                </div>
            ) : (
                <p className='text-pink-300'>No profile data available</p>
            )}
        </div>
    );
}

export default Profile;
