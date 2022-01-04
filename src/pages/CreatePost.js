import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();

  const postCollectionRef = collection(db, "posts"); //collection q queremos o CRUD

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };

  useEffect(() => {
    if(!isAuth) {
      navigate("/login");
    }
    }, [])

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>

        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input
            placeholder="Title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="inputGp">
          <label>Post:</label>
          <textarea
            rows="10"
            placeholder="Post..."
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></textarea>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
