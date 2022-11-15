import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function ViewUsers() {
    const [userList, setUserList] = useState(null);
    const [isDeleteAllowed,setIsDeleteAllowed] = useState(false);
    const router = useRouter();
    const fetchUserList = async (userId) =>{
            alert(userId);
            fetch(`/api/user?userId=${userId}`)
            .then(async(response) => {
                console.log(response.status)
                    const data = await response.json();
                    if(data.success){
                        console.log(data);
                        setUserList([...data.data])
                        setIsDeleteAllowed(data.deleteAllowed);
                    }
                    else{
                        alert("You're not allowed to view this page");
                        router.push({
                            pathname:"/dashboard"
                        })
                    }

            })
            .catch(error=>console.log(error));
        
    }
    useEffect(()=>{
        fetchUserList(window.localStorage.getItem("userId"));
    },[]);
    if(userList==null){
        return(
            <h1>Loading...</h1>
        )
    }

    const handleDelete =(e)=>{
        alert(e.target.id)
        fetch(`/api/user/${e.target.id}?userId=${window.localStorage.getItem("userId")}`,
            {method:"DELETE"}
        ).then((response)=>{
            return response.json();
        }).then(res=>{
            if(res.data.deletedCount==0){
                alert("Couldn't delete the user");
            }
            else{
                alert("User deleted successfully");
                fetchUserList(window.localStorage.getItem("userId"));
            }
        })
    }

    return (
        <div style={{textAlign:"center", margin:"100px"}}>
            {
                userList.length == 0? <h1>No user found</h1>:<h1>List of users</h1>
            }
            {
                userList.map((user,index)=>{
                    return (
                        <div id={user.userId} style={{padding:"20px",display:"flex",justifyContent:"space-between"}}>
                            <b style={{width:"300px"}}>UserName: {user.userName}</b>
                            <b style={{width:"300px"}}>UserId: {user.userId}</b>
                            <b style={{}}>UserRole: {user.role}</b>
                            {isDeleteAllowed && <button id ={user.userId} onClick={handleDelete}>delete this user</button>}
                        </div>
                    )
                })
            }
        </div>
    );
}