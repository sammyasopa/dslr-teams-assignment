import { useRouter } from 'next/router'
 
export default function Login() {
    const router = useRouter();
  const loginUser = (userId, password) => {
    if(!password || !userId){
        alert("Please add all the fields");
        return;
    }
    alert(userId);
    fetch('/api/user/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: userId,
    password: password
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if(data.success){
        console.log(data);
        alert("Success");
        window.localStorage.setItem("userId", data.data.userId);
        window.localStorage.setItem("role", data.data.role);
        router.push({
            pathname:"/dashboard",
        })
    }
    else{
        alert("Failure");
    }
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  };
 
  const handleSubmit = e => {
    e.preventDefault();
    loginUser(e.target.username.value,e.target.password.value);
  };
 
  return (
    <div>
        <h1 style={{fontSize:"1.25rem",textAlign:"center"}}>Login using your user id and password</h1>
    
    <form onSubmit={handleSubmit}>
      <div
        style={{
          background: "white",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <input
          placeholder="User id"
          style={{ margin: "5px", height:"50px",width:"500px",textAlign:"center" }}
          name="username"
          type="text"
        />
        <input
          placeholder="Password"
          style={{ margin: "5px",height:"50px",width:"500px",textAlign:"center" }}
          name="password"
          type="password"
        />
        <input style={{ margin: "5px",height:"50px",width:"500px",textAlign:"center" }}
         value="Login" type="submit" />
      </div>
    </form>
    </div>
  );
}
 
