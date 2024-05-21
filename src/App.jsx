import { useEffect, useState } from 'react'
import './App.css'
import useCrud from './hooks/useCrud'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'

function App() {
  const [userSelected, setUserSelected] = useState()
  const [formIsOpen, setFormIsOpen] = useState(false)
  
  const [ users, getUsers, createUser, deleteUser, updateUser ] = useCrud('/users/')

  useEffect(() => {
    getUsers()    
  }, [])


  const handleOpenForm = () => {
    setFormIsOpen(true);
  }

    return (
    <div>
      <header>
      <h1>FORM USER CRUD</h1>
      <button onClick={handleOpenForm}>Create New User</button>
      </header>
      <FormUser
        createUser={createUser}
        userSelected={userSelected}
        updateUser={updateUser}
        setUserSelected={setUserSelected}
        formIsOpen={formIsOpen}
        setFormIsOpen={setFormIsOpen}
      />
      <div className='user-container'>
        {
          users?.map(user => (
            <UserCard 
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setUserSelected={setUserSelected}
              setFormIsOpen={setFormIsOpen}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
