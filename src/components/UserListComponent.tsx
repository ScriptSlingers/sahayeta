import { useState, useEffect } from 'react';
import axios from 'axios';

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
                <ul>
                    {users?.map(User) => {
                        return (
                    <li key={singleUser?.id}>
                        <div>name={singleUser?.name}</div>
                        <div>email={singleUser?.email}</div>
                        <div>image={singleUser?.profileImage}</div>
                    </li>
                    );
                    })}
                </ul>

            </ul>
        </div>
    );
};

export default UserListComponent;
