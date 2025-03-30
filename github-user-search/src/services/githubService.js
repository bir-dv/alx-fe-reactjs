import axios from 'axios'; //import axios for making HTTP requests

export const fetchUserData = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Error fetching user data');
      }
}