import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import "./Recipes.css";

const Recipes = () => {
  const [posts, setPosts] = useState([]);
  const [updatedPosts, setUpdatedPosts] = useState([]);
  const [title, setTitle] = useState([]);
  const [test, setTest] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/recipes");
      setPosts(response.data);
      setUpdatedPosts(response.data);
    };
    fetchData();
  }, []);

  const filteredPosts = async (e) => {
    setTitle(e.target.value);
    posts.forEach((post) => {
      const thisTitle = post.title;
      if (thisTitle.includes("title")) {
        setTest(1);
      }
      console.log(thisTitle, title, test);
    });
  };

  return (
    <section>
      {/* <input placeholder="Search" onChange={filteredPosts} /> */}
      <div className="container home-container">
        {posts.length > 0 &&
          updatedPosts.map((post) => (
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
