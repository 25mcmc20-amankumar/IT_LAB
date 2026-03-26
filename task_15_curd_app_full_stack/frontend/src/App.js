import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./Userform";
import UserList from "./UserList";

function App() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>CRUD App</h1>
            <UserForm fetchUsers={fetchUsers} editUser={editUser} />
            <UserList users={users} fetchUsers={fetchUsers} setEditUser={setEditUser} />
        </div>
    );
}

export default App;