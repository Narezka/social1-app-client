import React from "react";
import "./Home.css";
import Story from "../../componets/stories/Story";
import Posts from "../../componets/posts/Posts";
import Share from "../../componets/share/Share";

function Home() {
  return (
    <div className="home">
      <Story />
      <Share />
      <Posts />
    </div>
  );
}

export default Home;
