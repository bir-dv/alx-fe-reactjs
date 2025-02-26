import React from 'react'
import userContext from './UserContext'
import ProfilePage from './ProfilePage'

function App() {
  const userData = { name: "biruk yoseph", email: "brukjoseph@gmail.com" }

  return (
   <userContext.Provider value={userData}>
    <ProfilePage />
   </userContext.Provider>
  )
}

export default App
