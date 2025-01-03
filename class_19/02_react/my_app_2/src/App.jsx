import { useState } from "react";
import { PostComponent } from "./components/post";
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);

  // if you dont understand this code read 09_code_explanation.md
  const postComponents = posts.map(post => <PostComponent
    name={post.name}
    subtitle={post.subtitle}
    time={post.title}
    image={post.image}
    description={post.description}
  />)

  function addPost() {
    setPosts([...posts, {
      name: "cooldude",
      subtitle: "1,000,000 followers",
      time: "2m ago",
      image: "https://t4.ftcdn.net/jpg/00/85/02/85/360_F_85028564_ki6Hiz5UwSC0OpJlJbwAWaHRDZ1lNpRx.jpg",
      description: "Hey everyone! Just a quick shout-out – let’s keep aiming high, supporting each other, and making the most of every moment. Here’s to growth, good times, and all the great things ahead!"
    }])
  }

  return (
    <div>
      <button onClick={addPost}>Add post</button>
      <div style={{display: "flex", justifyContent: "center" }}>
        <div>
          {postComponents}
        </div>
      </div>
    </div>
  )
}

export default App