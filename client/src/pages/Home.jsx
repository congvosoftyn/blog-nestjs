import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AxiosInstance } from "../utils/axios.instance";

export function Home() {
  const [posts, setPosts] = useState([])
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/posts${cat}`)
        setPosts(data);
      } catch (error) {
        console.error({ error });
      }
    }
    fetchData()
    // return () => {
    //   fetchData()
    // }
  }, [cat])


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post, index) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt={post.title} />
              <div className="bg"></div>
            </div>
            {/* img */}
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* <p>{post.description}</p> */}
              {getText(post.description)}
              <button>read more</button>
            </div>
            {/* content */}
          </div>
        ))}
      </div>
    </div>
  );
}
