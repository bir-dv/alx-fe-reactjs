// src/services/githubService.js
import axios from 'axios';

export const fetchUserData = async (username, location, minRepos, page = 1) => {
  try {
    // Construct the query based on provided criteria
    let query = `${username ? `${username} in:login` : ''}`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    //let creat api request with pagination support 
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}$page=${page}&per_page=3`
    );

    // Check if any user found
    if (response.data.items.length === 0) {
      throw new Error('No user found');
    }

    // Fetch detailed user information using username
    const userResponse = await axios.get(
      `https://api.github.com/users/${response.data.items[0].login}`
    );

    return {
        users:response.data.items,
        totalCount: response.data.total_count,

    } 
  } catch (error) {
    throw new Error('User not found or criteria not met');
  }
};
