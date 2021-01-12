import React, { useEffect, useState } from 'react'
import http from '../services/http'
import styled from 'styled-components'
import { Layout } from '../components/layout'

const LoginWrapper = styled.div`
  .form-item {
    margin-bottom: 10px;
  }
`

const Login = ({
  userStore
}) => {
  return <Layout>
    <LoginWrapper>
      <h2>Login</h2>
      <form className="form">
        <div className="form-item">
          <input type="text" placeholder="username" />
        </div>
        <div className="form-item">
          <input type="password" placeholder="password" />
        </div>
      </form>
      <button>Submit</button>
    </LoginWrapper>
  </Layout>
}

export default Login
