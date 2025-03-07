import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams(); // Get the dynamic username from URL

  return (
    <div>
      <h2>Profile of {username}</h2>
      <p>This is {username}'s profile page.</p>
    </div>
  );
};

export default UserProfile;
