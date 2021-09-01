import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PrivateScreen = ({history}) => {
   // const [error, setError] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }

        const fetchPrivateData = async() => {
            const config = {
                headers: {
                    authorization: `bearer ${localStorage.getItem("authToken")}`
                }
            }

            axios.get("http://localhost:5000/registeredcustomers/user", config).then((res) => {
                setName(res.data.name);
                console.log("Hi");
                console.log(res.data.name);
            }).catch((err) => {
                alert(err.message);
            })
            /*
            try{
                axios.get("http://localhost:5000/registeredcustomers/user", config);
                console.log(data.data);
                if(!privatedata){
                    alert("kela wela react");
                }
                alert(privatedata);
    
            }catch(error){
                localStorage.removeItem("authToken");
                
            }
            */
        };
        fetchPrivateData();
    },[history, setName]);

    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }
    return(
        <div>
            <div>{name}</div>
            <button onClick={logOutHandler}>Logout</button>
        </div>
    )
}

export default PrivateScreen;