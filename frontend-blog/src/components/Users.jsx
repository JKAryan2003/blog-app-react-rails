import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}registrations`)
      console.log(axios.defaults)
      setUsers(response.data.users)
    }
    catch(error) {
      if (error.response && error.response.data && error.response.data.errors) {
        alert(error.response.data.errors)
      } else {
        alert(error.response.data.error)
      }    
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  console.log(users)

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => <p key={user.id}>{user.username}</p>) 
      ) : (
        <p>No users found</p>
      )}
    </div>
  )
}

export default Users