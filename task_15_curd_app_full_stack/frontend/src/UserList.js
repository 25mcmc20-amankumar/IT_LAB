import React from "react";
import axios from "axios";

function UserList({ users, fetchUsers, setEditUser }) {
  
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name} - {user.email}</p>
          <button onClick={() => setEditUser(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;