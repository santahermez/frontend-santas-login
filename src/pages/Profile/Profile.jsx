import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Profil() {
  const fullname = localStorage.getItem("fullname");
  if (!fullname) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1>Profil</h1>
      <p>Välkommen {fullname}</p>
   
    </>
  )
}
