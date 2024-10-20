import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useUserContext } from '../Context/UserContext';
import EditUser from './EditUser'; 
import { useNavigate } from 'react-router-dom';
import './UserList.css'; 

const UserList = () => {
  const { users, editingUser, handleDelete, handleEdit, closeEditModal } = useUserContext(); 
  const navigate = useNavigate();

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User List</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">Email: {user.email}</p>
            </div>
            <div className="user-actions">
              <FaEdit 
                className="edit-icon" 
                onClick={() => handleEdit(user)} 
                title="Edit User"
              />
              <FaTrash 
                className="delete-icon" 
                onClick={() => handleDelete(user._id)} 
                title="Delete User"
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      {editingUser && (
        <EditUser 
          user={editingUser} 
          onClose={() => {
            closeEditModal();
          }} 
        />
      )}
    </div>
  );
};

export default UserList;
