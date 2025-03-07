import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BlogPost = () => {
  const { id } = useParams(); // Get the dynamic blog ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        // Simulated API Data
        const fakeApiData = [
          { id: "1", title: "React Basics", content: "React is a JavaScript library..." },
          { id: "2", title: "Understanding Hooks", content: "Hooks are a new feature in React 16.8..." },
          { id: "3", title: "React Router Guide", content: "React Router is a powerful library..." }
        ];

        const foundPost = fakeApiData.find(post => post.id === id);

        if (!foundPost) {
          throw new Error("Post not found!");
        }

        setPost(foundPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
