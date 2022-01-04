import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postsLists, setPostsList] = useState([]);

  const postCollectionRef = collection(db, "posts"); //collection q queremos o CRUD

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }

  return (
    <div className="homePage">
      {postsLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid &&
                <button onClick={() => { deletePost(post.id) }}> &#128465; </button>  
                }
              </div>
            </div>

            <div className="postTextContainer">
              {post.postText}
              <h3>@{post.author.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
