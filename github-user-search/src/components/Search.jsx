import React, { useState } from 'react'
import { fetchUserData } from '../services/githubService';
import './Search.css';  // Add this import at the top


const Search = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try{
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError('Looks like we cant find the user');
            setUserData(null);
          } finally {
            setIsLoading(false);
          }
        console.log("Searhch for:", username);
    };

  return (
    <div>
     <form onSubmit={handleSubmit}>
        <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter GitHub username'
        required
        />
        <button type='submit'>Search</button>
     </form>

     {isLoading && <p>Loading...</p>}
     {error && <p className="error">{error}</p>}

     {userData && !error && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <h2>{userData.name || userData.login}</h2>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}

    </div>
  )
}

export default Search