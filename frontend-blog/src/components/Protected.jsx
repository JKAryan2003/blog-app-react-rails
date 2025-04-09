import React from 'react'
import { useEffect, useContext, useNavigate } from 'react'
import { AuthContext } from '../context/AuthContext'

const Protected = ({ props }) => {

  const { Component } = props
  const navigate = useNavigate
  const { token } = useContext(AuthContext)
  
  useEffect(() => {
    if (token === null) {
      navigate('/')
    }
  })
  return (
    <div>
      <Component />  
    </div>
  )
}

export default Protected