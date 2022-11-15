import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react';
 
// export default function Dashboard() {
//     const [user,setUser] = useState(null);
//     const getUserData = async()=>{
//         const userId = window.localStorage.getItem("userId");
//         console.log(userId);
//         const res = await fetch(`/api/user/${userId}`);
//         const userData = await res.json();
//         console.log(userData);
//         setUser(userData.data);
//     }
//     useEffect(()=>{
//         getUserData()
//     },[])
//   return (
//     <div>
//         {user?user.role=="Admin"?"Hello Admin":"Hello non-admin":"Hello no user"}
        
//     </div>
//   );
// }


import {useEffect,useState} from "react";

 
export default function Dashboard(){
    const [currentUser, setCurrentUser] = useState(null);
    const [operations,setOperations] = useState([]);
    const router = useRouter();
  
    
    const fetchCurrentUser = (userId) => {
        fetch(`/api/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setCurrentUser(data.data)
                setOperations(data.operations);
                console.log(data);
            });
    }

    useEffect(()=>{
        const userId = window.localStorage.getItem("userId");
        console.log(userId);
        if(userId===null || userId === undefined){
            router.push({
                pathname:"/login"
            })
        }
        fetchCurrentUser(userId);
    },[])

    if(!currentUser){
        return <h1>Loading...</h1>
    }

    const handleCreateUserClick = ()=>{
            router.push({
                pathname:"/createUser"
            })
    }

    const handleViewUsersClick = () =>{
        router.push({
            pathname:"/viewUsers"
        })
    }
    const handleLogOut = () =>{
        window.localStorage.clear();
        router.push({
            pathname:"/login"
        })
    }
    return (
    <div style={{ textAlign:"center", margin:"300px"}}>
        <h1>User Profile</h1>
        <h2>Your Name: {currentUser.userName}</h2>
        <h2>Your Role: {currentUser.role}</h2>
        <h2>Your userId: {currentUser.userId}</h2>
        <button onClick={handleLogOut}>Log Out</button>
        <div style={{padding:"20px"}}>
            {operations.includes("Create") && <button 
                onClick={ handleCreateUserClick }
                style={{margin:"20px",height:"50px",width:"175px"}}>
                Create User
            </button>}
            {operations.includes("Read") && <button
                onClick={ handleViewUsersClick }
                style={{margin:"20px",height:"50px",width:"175px"}}>
                View User List
            </button>}
        </div>
    </div>
  )
}