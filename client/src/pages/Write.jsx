import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function Write() {
  const [value, setValue] = useState('');

  console.log("value", value)

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Enter you title" />
        <div className="editorContainer" >
          <ReactQuill className="editor" theme="snow" value={value} onChange={(e) => setValue(e)} />
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
          <input type="file" id="file" name="" value="" style={{ display: "none" }} />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons" >
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        {/* item */}
        <div className="item">
          <h1>Category</h1>
          <div className="cat" >
            <input type="radio" name="cat" value="art" id="art" />
            <label htmlFor="art" >Art</label>
          </div>
          <div className="cat" >
            <input type="radio" name="cat" value="science" id="science" />
            <label htmlFor="science" >Science</label>
          </div>

          <div className="cat" >
            <input type="radio" name="cat" value="technology" id="technology" />
            <label htmlFor="technology" >Technology</label>
          </div>

          <div className="cat" >
            <input type="radio" name="cat" value="cinema" id="cinema" />
            <label htmlFor="cinema" >Cinema</label>
          </div>

          <div className="cat" >
            <input type="radio" name="cat" value="design" id="design" />
            <label htmlFor="design" >Design</label>
          </div>

          <div className="cat" >
            <input type="radio" name="cat" value="food" id="food" />
            <label htmlFor="food" >Food</label>
          </div>
          {/* cat */}
        </div>
      </div>
      {/* menu */}
    </div>
  );
}
