import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/userService';

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getUserById(id).then((data) => {
            if (data && data.user) {
                setUser(data.user); // Lấy "user" từ JSON
            }
            console.log(data.user)
        });

    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Info</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Created At: {user.createdAt}</p>
            <p>Updated At: {user.updatedAt}</p>
        </div>
    );
};

export default UserPage;
