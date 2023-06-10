import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

const Recipes = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/recipes");
      setPosts(response.data);
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container home-container">
        {posts.length > 0 &&
          posts.map((post) => (
            <RecipeCard
              key={post._id}
              title={post.title}
              time={post.time}
              description={post.summary}
              img={post.cover}
              author={post.author}
              id={post._id}
            />
          ))}
      </div>
    </section>
  );
};

export default Recipes;
