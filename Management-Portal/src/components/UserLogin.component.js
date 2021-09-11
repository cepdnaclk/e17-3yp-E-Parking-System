import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Login({ history }){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/private");
        }
    }, [history]);

    async function loginData(e) {
        e.preventDefault();

        try{
            console.log(email, password);
            const {data} = await axios.post("http://localhost:5000/registeredcustomers/signin", {email, password});
                
            localStorage.setItem("authToken", data.token);

            history.push("/private");
        }catch(error){
            alert(error.message);
        }

    }

    return(
        <div className="container">
            <form onSubmit={loginData}>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
