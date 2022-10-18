import React, { useContext, useEffect, useState } from "react";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { AxiosInstance } from "../utils/axios.instance";
import moment from 'moment';
import { AuthContext } from "../context/auth.context";

export function Single() {
  const [post, setPost] = useState([])
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosInstance.get(`/posts/${id}`)
        setPost(data);
      } catch (error) {
        console.error({ error });
      }
    }
    return () => {
      fetchData()
    }
  }, [id])

  const handleDelete = async (postId) => {
    try {
      AxiosInstance.delete(`/posts/${postId}`);
      navigate("/")
    } catch (error) {
      console.error({ error })
    }
  }


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt={post?.title} />
        <div className="user">
          <img src={post?.user?.img} alt="single" />
          <div className="info">
            <span>{post?.user?.username}</span>
            <p>Posted {moment(post?.createdAt).fromNow()}</p>
          </div>
          {/* info */}
          {
            currentUser.id === post?.user?.id && (
              <div className="edit">
                <Link to={`/write?edit=${post.id}`} state={post} >
                  <img src={Edit} alt="edit" />
                </Link>
                <img src={Delete} alt="delete" onClick={() => handleDelete(post.id)} />
              </div>
            )
          }
          {/* edit */}
        </div>
        {/* user */}
        <h1>{post?.title}</h1>
        {getText(post?.description)}
      </div>

      <Menu cat={post?.cat} />
    </div>
  );
}
