import './App.css';
import MainPage from './components/mainPage';
import Phone from './Phone'
import { Input, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setName] = useState('')
  const [age, setAge] = useState(0)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }

    if (loading) {
      return <h1>Loading...</h1>
    }
  }, [data])

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          age, username
        }
      }
    }).then(({ data }) => {
      console.log(data, 'daar')
      setName('')
      setAge(0)
    })
  }

  const getAll = e => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="App" style={{ marginTop: "150px" }}>
      <form >
        <Input value={username} onChange={e => setName(e.target.value)} type="text" style={{ marginRight: '10px' }} placeholder="Name" />
        <Input value={age} onChange={e => setAge(Number(e.target.value))} type="number" placeholder="Age" />
        <div style={{ marginTop: "10px" }}>
          <Button onClick={(e) => addUser(e)}>Create</Button>
          <Button onClick={(e) => getAll(e)}>Load</Button>
          <Button onClick={(e) => getAll(e)}>Load 2</Button>
        </div>
      </form>
      <div>
        {users.map(user =>
          <div>{user.id}. {user.username} {user.age} </div>
        )}
      </div>
      <div>
        {users.map(user =>
          <div>{user.id}. {user.username} {user.age} </div>
        )}
      </div>
      <div>
        {users.map(user =>
          <div>{user.id}. {user.username} {user.age} </div>
        )}
      </div>
    </div>
  );
}

export default App;
