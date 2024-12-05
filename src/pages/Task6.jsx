import React, { useState, useEffect } from "react";
import axios from "axios";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]); // Stores all fetched posts
  const [page, setPage] = useState(1); // Current page to fetch
  const [loading, setLoading] = useState(false); // Loading indicator
  const [hasMore, setHasMore] = useState(true); // Determines if more posts are available

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: { _page: page, _limit: 10 }, // Pagination params
        }
      );

      const newPosts = response.data;

      if (newPosts.length === 0) {
        setHasMore(false); // No more data
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]); // Fetch posts whenever the page changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [loading, hasMore]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Infinite Scroll with API</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f4f4f4",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <span>Loading...</span>
        </div>
      )}
      {!hasMore && (
        <div style={{ textAlign: "center", margin: "20px 0", color: "gray" }}>
          <span>No more posts to load</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
