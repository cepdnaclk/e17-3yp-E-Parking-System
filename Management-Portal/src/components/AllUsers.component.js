import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function AllUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        function getRegUsers(){
            axios.get("http://localhost:5000/registeredcustomers/").then((res) => {
                setUsers(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getRegUsers();
    }, [])
    return(
        <div className="container">
            <h1>All registered users</h1>
            {users.map(user => <div>{user.name}</div>)}
        </div>
    )
}