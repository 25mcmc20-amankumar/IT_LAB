import React, { useState, useEffect } from "react";
import axios from "axios";

function UserForm({ fetchUsers, editUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editUser) {
      await axios.put(`http://localhost:5000/users/${editUser.id}`, {
        name,
        email,
      });
    } else {
      await axios.post("http://localhost:5000/users", { name, email });
    }

    setName("");
    setEmail("");
    fetchUsers();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">
        {editUser ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default UserForm;