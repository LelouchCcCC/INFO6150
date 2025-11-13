import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/post");
      console.log(response.data);
      setPost(response.data);
    })();
  }, []);

  useEffect(() => {
    console.log("post updated:", post);
  }, [post]);

  return <></>;
}

export default App;
