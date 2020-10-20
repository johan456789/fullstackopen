import React from 'react'


const LoginForm = ({ credentials, handleLogin, setUsername, setPassword }) => {
  const [username, password] = credentials

  return ( 
    <>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}


export default LoginForm
