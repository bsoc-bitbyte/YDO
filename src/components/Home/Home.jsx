import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const nav = useNavigate();

  const redirectToLogin =() =>{
    nav("/login");
  } 
  return (
    
    <>
    <h1>
      YDO💜
    </h1>
    <button onClick={redirectToLogin}> Get Started!</button>
      </>
  )
}

export default Home