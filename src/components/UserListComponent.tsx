import { useState, useEffect } from 'react';

const UserListComponent = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data.users))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <div>Name: {user.name}</div>
                        <div>Email: {user.email}</div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListComponent;
