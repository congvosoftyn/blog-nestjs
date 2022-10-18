import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../utils/axios.instance";

export function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (state) {
      try {
        const { data } = await AxiosInstance({
          method: "PUT",
          url: `/posts/${state.id}`,
          data: {
            title: title,
            description: value,
            img: img ? img : state.img,
            cat: cat
          }
        });
        // console.log({ data });
        if (data.affected === 1) {
          navigate(`/post/${state.id}`)
        }
      } catch (error) {
        console.log({ error })
        navigate(`/write?edit=${state.id}`)
      }
    } else {
      try {
        const { data } = await AxiosInstance({
          method: "POST",
          url: `/posts`,
          data: JSON.stringify({
            title: title,
            description: value,
            img: img ? img : "",
            cat: cat
          })
        });
        console.log("data add new post", data)
        navigate("/")
      } catch (error) {
        // console.log({ error })
        navigate(`/write`)
        
      }
     
    }

  }

  const upload = async (file) => {
    if (!file) return;

    const formData = new FormData()
    formData.append('file', file);
    try {
      const { data } = await AxiosInstance.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setImg(data.url);
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Enter you title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} placeholder="Enter your description" />
        </div>
        {/* editorContainer */}
      </div>
      {/* content */}
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Publish
          </span>
          <input type="file" onChange={(e) => upload(e.target.files[0])} id="file" style={{ display: "none" }} />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick} >Publish</button>
          </div>
        </div>
        {/* item */}
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" value="art" id="art" onChange={(e) => setCat(e.target.value)} checked={cat === "art"} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="science" id="science" onChange={(e) => setCat(e.target.value)} checked={cat === "science"} />
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">
            <input
              type="radio" name="cat" value="technology" id="technology" onChange={(e) => setCat(e.target.value)} checked={cat === "technology"} />
            <label htmlFor="technology">Technology</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="cinema" id="cinema" onChange={(e) => setCat(e.target.value)} checked={cat === "cinema"} />
            <label htmlFor="cinema">Cinema</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="design" id="design" onChange={(e) => setCat(e.target.value)} checked={cat === "design"} />
            <label htmlFor="design">Design</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="food" id="food" onChange={(e) => setCat(e.target.value)} checked={cat === "food"} />
            <label htmlFor="food">Food</label>
          </div>
          {/* cat */}
        </div>
      </div>
      {/* menu */}
    </div>
  );
}
