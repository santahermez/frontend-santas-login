import React from 'react'
import { Outlet } from 'react-router-dom';

export default function Account() {
  const username = localStorage.getItem('username')
  return (
    <div>
      <p>@{username}</p>
      <hr />
      <Outlet />
    </div>
  )
}
