import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot, doc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CreatePost = ({ isAuth }) => {
  // Form states for creating/editing a post
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Display success messages
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [editingPost, setEditingPost] = useState(null); // Track the post being edited

  const postsCollectionRef = collection(db, "posts");

  // Fetch posts from Firestore on component mount
  useEffect(() => {
    const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  // Handle form submission for creating or editing posts
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingPost) {
      // Update existing post
      const postDoc = doc(db, "posts", editingPost.id);
      await updateDoc(postDoc, { language, title, story });

      // Display success message for editing
      setSuccessMessage("Your post has been updated successfully!");
      setEditingPost(null); // Clear editing state
    } else {
      // Create new post
      await addDoc(postsCollectionRef, {
        language,
        title,
        story,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        createdAt: Timestamp.now(),
      });

      // Display success message for creating
      setSuccessMessage("Your post has been published!");
    }

    // Clear form fields and success message
    setLanguage("");
    setTitle("");
    setStory("");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  // Handle editing a post: populate the form with existing data
  const handleEdit = (post) => {
    setEditingPost(post);
    setLanguage(post.language);
    setTitle(post.title);
    setStory(post.story);
  };

  // Handle deleting a post
  const handleDelete = async (postId) => {
    const postDoc = doc(db, "posts", postId);
    await deleteDoc(postDoc);

    setSuccessMessage("Post deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div className="p-10">
      <p className="text-center text-xl mb-2">
      Welcome! Read, enjoy and post yours!
      </p>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Language of story"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Title of story"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-40"
        />
        <button
          type="submit"
          className="text-white uppercase font-semibold text-sm rounded-full bg-gray-500 hover:bg-gray-400 px-3 py-2"
        >
          {editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 mb-4 text-center font-semibold text-xl text-[#9fac2c]">
          {successMessage}
        </div>
      )}

      {/* Posts Section */}
      <div className="mt-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-center text-3xl text-gray-600">Posts</h2>
        <div className="p-4">
          {posts.map((post) => (
            <div key={post.id} className="mb-4 p-4 border-b border-gray-200">
              {/* Edit and Delete Icons */}
              {post.author.id === auth.currentUser?.uid && (
                <div className="flex justify-end space-x-3 mb-2">
                  <FaEdit
                    className="text-[#9fac2c] cursor-pointer"
                    onClick={() => handleEdit(post)}
                  />
                  <MdDelete
                    className="text-[#9fac2c] cursor-pointer"
                    onClick={() => handleDelete(post.id)}
                  />
                </div>
              )}
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.language}</p>
              <p className="mt-2">{post.story}</p>
              <p className="text-sm text-gray-500 mt-2">
                By: {post.author?.name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(post.createdAt.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
