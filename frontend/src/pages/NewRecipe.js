import React, { useContext, useState } from "react";
import "./NewRecipe.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const NewRecipe = () => {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [createdRecipe, setCreatedRecipe] = useState({
    title: "",
    summary: "",
    time: "",
    content: "",
    file: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", createdRecipe.title);
    data.set("summary", createdRecipe.summary);
    data.set("time", createdRecipe.time);
    data.set("content", createdRecipe.content);
    data.set("file", createdRecipe.file[0]);
    data.set("author", loggedUser);

    await axios.post("http://localhost:4000/recipes/create", data);

    navigate("/recipes");
  };

  return (
    <section>
      <form className="container create-container" onSubmit={submitHandler}>
        <input
          type="title"
          placeholder="Title"
          value={createdRecipe.title}
          onChange={(e) =>
            setCreatedRecipe({
              title: e.target.value,
              summary: createdRecipe.summary,
              time: createdRecipe.time,
              content: createdRecipe.content,
              file: createdRecipe.file,
            })
          }
        />
        <input
          type="summary"
          placeholder="Summary"
          value={createdRecipe.summary}
          onChange={(e) =>
            setCreatedRecipe({
              title: createdRecipe.title,
              summary: e.target.value,
              time: createdRecipe.time,
              content: createdRecipe.content,
              file: createdRecipe.file,
            })
          }
        />
        <input
          type="number"
          placeholder="Time (Minutes)"
          value={createdRecipe.time}
          onChange={(e) =>
            setCreatedRecipe({
              title: createdRecipe.title,
              summary: createdRecipe.summary,
              time: e.target.value,
              content: createdRecipe.content,
              file: createdRecipe.file,
            })
          }
        />
        <div className="create-container-image">
          <label for="file">Choose main image to upload</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) =>
              setCreatedRecipe({
                title: createdRecipe.title,
                summary: createdRecipe.summary,
                time: createdRecipe.time,
                content: createdRecipe.content,
                file: e.target.files,
              })
            }
          />
        </div>
        <p>
          Enter recipe below. Feel free to format it as you like and add images
          where you need!
        </p>
        <ReactQuill
          className="react-quill"
          value={createdRecipe.content}
          modules={modules}
          formats={formats}
          onChange={(value) =>
            setCreatedRecipe({
              title: createdRecipe.title,
              summary: createdRecipe.summary,
              time: createdRecipe.time,
              content: value,
              file: createdRecipe.file,
            })
          }
        />
        <div className="create-button-container">
          <button>Create</button>
        </div>
      </form>
    </section>
  );
};

export default NewRecipe;
