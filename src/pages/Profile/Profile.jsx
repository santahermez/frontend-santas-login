import React from 'react'
import { Navigate } from 'react-router-dom'
import User from '../../components/User/User';

export default function Profil() {
  const fullname = localStorage.getItem("fullname");
  const userID = localStorage.getItem("_id");
  if (!fullname) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <User userID={userID}/>
    </>
  )
}
