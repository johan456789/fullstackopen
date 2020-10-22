import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { LoginForm, NoteForm } from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState([null, null])  // msg, error
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
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

  const handleLogout = () => {
    console.log('log out')
    window.localStorage.clear()
    window.location.reload()
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    console.log('create new note.')

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setURL('')
      const userObject = {
        id: blog.user,
        name: user.name,
        username: user.username
      }
      blog.user = userObject
      setBlogs([...blogs, blog])
    } catch (exception) {
      setMessage(['Error', true])
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
        <p>{user.username} logged in. <button onClick={handleLogout}>Logout</button></p>
      </div>
      <div>
        <NoteForm vars={[title, author, url]} setter={[setTitle, setAuthor, setURL]} handleCreation={handleCreation}/>
        <br></br>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App