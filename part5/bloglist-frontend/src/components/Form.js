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

const NoteForm = ({ vars, setter, handleCreation }) => {
  const [title, author, url] = vars
  const [setTitle, setAuthor, setURL] = setter

  return (
    <>
      <h1>Create new blog post</h1>
      <form onSubmit={handleCreation}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL: </label>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}


export { LoginForm, NoteForm }
