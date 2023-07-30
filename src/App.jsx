import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = axios.get('http://localhost:3001/api/users')
    const getArticles = axios.get('http://localhost:3001/api/articles')

    axios.all([getUsers, getArticles])
      .then(axios.spread((resUsers, resArticles) => {
        const users = resUsers.data.map(user => {
          return {
            ...user,
            articles: resArticles.data.filter(article => {
              return article.user_id === user.id
            })
          }
        })
        
        setUsers(users)
      }))
      .catch(err => {
        throw err
      })
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Article numbers</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.articles.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App