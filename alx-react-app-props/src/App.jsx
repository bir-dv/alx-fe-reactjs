import React from 'react'
import UserContext from './components/UserContext'
import ProfilePage from './ProfilePage'

function App() {
  const userData = { name: "biruk yoseph", email: "brukjoseph@gmail.com" }

  return (
    <div>
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>
    </div>
  )
}

export default App
