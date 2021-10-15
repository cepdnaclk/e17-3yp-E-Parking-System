import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function AddUser({ history }){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [paymentmethod, setMethod] = useState("");
    const [vehicalnumber, setVehicalNumber] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/private");
        }
    }, [history]);

    async function SendData(e) {
        e.preventDefault();
        const newUser = {
            name,
            email,
            contact,
            password,
            paymentmethod,
            vehicalnumber
        }

        try{
            const {data} = await axios.post("http://localhost:5000/registeredcustomers/add", newUser);
                
            localStorage.setItem("authToken", data.token);

            history.push("/private");
        }catch(error){
            alert(error.message);
        }

    }

    return(
        <div className="container">
            <form onSubmit={SendData}>
            <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="Help" placeholder="Enter Name" onChange={(e) => {
                    setName(e.target.value);
                }}/>
                <small id="nameHelp" className="form-text text-muted">Name with initials.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Contact number</label>
                <input type="text" className="form-control" id="contact" aria-describedby="Help" placeholder="Enter Contact Number" onChange={(e) => {
                    setNumber(e.target.value);
                }}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Payment Method</label>
                <input type="text" className="form-control" id="paymentmethod" aria-describedby="Help" placeholder="Enter Payment Method" onChange={(e) => {
                    setMethod(e.target.value);
                }}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Vehical Number</label>
                <input type="text" className="form-control" id="vehicalnumber" aria-describedby="Help" placeholder="Enter Vehical Number" onChange={(e) => {
                    setVehicalNumber(e.target.value);
                }}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
