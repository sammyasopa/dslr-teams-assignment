import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  return (
   <div style={{display:"flex",alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
       <h1>Please use userID: DSLR and password as tech</h1>
       <button onClick={()=>{
        router.push({
          pathname:"/login"
        })
       }}>Go to login</button>
   </div>

  )
}
