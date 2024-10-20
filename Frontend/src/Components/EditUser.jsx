import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../Context/UserContext';
import './Edit.css'; 


const EditUser = () => {
    const { editingUser, closeEditModal } = useUserContext(); 
    const [name, setName] = useState(editingUser.name);
    const [email, setEmail] = useState(editingUser.email);
    const [password, setPassword] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, {
                name,
                email,
                password, 
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            closeEditModal(); 
        } catch (error) {
            alert(`Error updating user: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={closeEditModal}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
