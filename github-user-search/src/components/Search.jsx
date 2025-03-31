// src/components/Search.jsx
import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import backgroundImage from '/src/assets/github.jpg';

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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center relative"
    style={{ backgroundImage: `url(https://images.pexels.com/photos/3612932/pexels-photo-3612932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }}>
      {/* Main content */}
      <div className="bg-gray-200 bg-opacity-80 p-8 rounded-xl shadow-xl w-full md:max-w-xl z-10">
        <h1 className="text-2xl font-bold text-[#003366] mb-6 text-center">GitHub User Search</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub Username"
            className="w-full p-3 border-2 border-[#04294F] rounded-md focus:outline-none focus:border-[#04294f] bg-transparent text-[#04294F] font-bold font-mono placeholder:text-[rgba(4,41,79,0.5)]"
            required
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location (optional)"
            className="w-full p-3 border-2 border-[#04294F] rounded-md focus:outline-none focus:border-[#04294f] bg-transparent text-[#04294F] font-bold font-mono placeholder:text-[rgba(4,41,79,0.5)]"
          />

          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Enter Minimum Repositories (optional)"
            className="w-full p-3 border-2 border-[#04294F] rounded-md focus:outline-none focus:border-[#04294f] bg-transparent text-[#04294F] font-bold font-mono placeholder:text-[rgba(4,41,79,0.5)]"
          />

          <button
            type="submit"
            className="w-full p-3 bg-[#003366] text-white rounded-md hover:bg-[#002347] transition-colors duration-300"
          >
            Search
          </button>
        </form>

        {isLoading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

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
                className="w-full bg-[#04294F] text-white py-2 rounded-md hover:bg-[#002347] transition mt-4"
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
