import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CreateUser(){
    const [userRole,setUserRole] = useState("Non-Admin");
    const [userName,setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(true);

    const handleRoleChange = (e)=>{
        setUserRole(e.target.value);
    }

    useEffect(()=>{
        const role = window.localStorage.getItem("role");
        if(role == "Non-Admin"){
            alert("You're not allowed to view this page");
            router.push({
                pathname:"/dashboard"
            })
        }
        else{
            setIsLoading(false);
        }
    },[])

    if(isLoading){
        return <h1>Loading...</h1>
    }

    const handleSubmit = () => {
        if(!userId || !userName || !password){
            alert("Please enter all the details");
            return;
        }
        const reqBody = {
            userName:userName,
            userId:userId,
            role:userRole,
            password:password
        }

        fetch(`/api/user?userId=${window.localStorage.getItem("userId")}`,
            {
                method:"POST",
                body:JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response)=>{
            return response.json();
        }).then(response=>{
            if(response.success){
                alert("user created successfully")
            }
            else{
                alert("Couldn't create the user");
            }
        }).catch(error=>{
            alert("Couldn't create the user");
        })
    }
    return (
        <div style={{width:"80%", marginLeft:"auto",marginRight:"auto", display:"flex", textAlign:"center", justifyItems:"center", alignItems:"center", margin:"200px", flexDirection:"column"}}>
            <h1>Create User</h1>
            <input
                placeholder="Give yourself a nice user id"
                style={{ margin: "5px", height:"50px",width:"500px",textAlign:"center" }}
                name="userId"
                onChange = {(e)=>setUserId(e.target.value)}
                value ={userId}
                type="text"
            />
            <input
                placeholder="Your Name"
                style={{ margin: "5px", height:"50px",width:"500px",textAlign:"center" }}
                name="username"
                onChange = {(e)=>setUserName(e.target.value)}
                value={userName}
                type="text"
            />
            <input
                placeholder= "Strong password here"
                style={{ margin: "5px", height:"50px",width:"500px",textAlign:"center" }}
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password"
            />
            <select value={userRole} 
            style={{ margin: "5px", height:"50px",width:"500px",textAlign:"center" }}
             onChange={handleRoleChange}>
                <option value="Admin">Admin</option>
                <option value="Non-Admin">Non-Admin</option>
            </select>
            <button 
                style={{ margin: "5px", height:"50px",width:"500px",textAlign:"center" }}
                onClick={handleSubmit}
            >
            Create User</button>
        </div>
    );
}