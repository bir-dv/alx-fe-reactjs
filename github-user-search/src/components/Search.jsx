// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Handle Search Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setPage(1); // Reset to first page

    try {
      const { users, totalCount } = await fetchUserData(
        username,
        location,
        parseInt(minRepos),
        1
      );
      setUsers(users);
      setTotalCount(totalCount);
    } catch (err) {
      setError('No users found or criteria not met.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Load More" Pagination
  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const { users: newUsers } = await fetchUserData(
        username,
        location,
        parseInt(minRepos),
        page + 1
      );
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError('Failed to load more users.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">GitHub User Search</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Minimum Repositories (optional)</label>
            <input
              type="number"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="Enter minimum repositories"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {users.length > 0 && !error && (
          <div className="mt-6">
            {users.map((user) => (
              <div key={user.id} className="p-4 bg-gray-100 rounded-lg mb-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full inline-block mr-4"
                />
                <div className="inline-block align-middle">
                  <h2 className="text-lg font-bold">{user.login}</h2>
                  <p>Location: {user.location || "Not provided"}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
            {users.length < totalCount && (
              <button
                onClick={handleLoadMore}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition mt-4"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
