import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState([null, null])  // msg, error
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(['Wrong credentials', true])
      setTimeout(() => {
        setMessage([null, null])
      }, 1000)
    }
  }

  if (user === null) {
    return (
      <>
        <Notification message={message[0]} error={message[1]} />
        <div>
          {user === null && <LoginForm credentials={[username, password]} handleLogin={handleLogin}
            setUsername={setUsername} setPassword={setPassword}
          />}
        </div>
      </>
    )
  }

  return (
    <>
      <Notification message={message[0]} error={message[1]} />
      <div>
        <h1>Blogs</h1>
        <p>{user.username} logged in.</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App