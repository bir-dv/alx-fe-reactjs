import React from 'react'
import { useState } from 'react'
import {useQuery, useQueryClient} from '@tanstack/react-query'


const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    console.log("Fetched Posts:", data); // Console log fetched data
    return data;
};


const PostsComponent = () => {

  const queryClient = useQueryClient();
  const { data: posts, isLoading,isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5000, // Data stays fresh for 5 seconds before refetching
    cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })} style={{ marginBottom: "1rem" }}>
        Refresh Posts
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>  )
}

export default PostsComponent