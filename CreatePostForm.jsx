import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const Ccreatepost = ({ isAuth }) => {
  // State variables for form inputs and success message
  const [language, setLanguage] = useState('');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Reference to the Firestore collection
  const postsCollectionRef = collection(db, "posts");

  // Hook for navigation
  let navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Adding a new document to the Firestore collection
    await addDoc(postsCollectionRef, {
      language,
      title,
      story,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    // Setting success message
    setSuccessMessage('Your post has been published!');
    // Clearing success message and navigate to "/createpost" after 2 seconds
    setTimeout(() => {
      setSuccessMessage('');
      navigate("/createpost");
    }, 2000);
  };

  return (
    <div className='p-10 md:p-20'>
      {/* Introductory text */}
      <p className='text-center text-xl'>
        Welcome! I write igbo, english, and french short stories here. Read, enjoy and post!
      </p>
      <p>Create post here.</p>

      {/* Form for creating a post */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Language of story" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Title of story" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <textarea 
            placeholder="Story" 
            value={story} 
            onChange={(e) => setStory(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded h-40"
          />
        </div>
        <div>
          <button 
            type="submit" 
            className="text-white uppercase font-semibold text-sm rounded-full bg-gray-500 hover:bg-gray-400 px-3 py-2"
          >
            Create Post
          </button>
        </div>
      </form>
      
      {/* Success message */}
      {successMessage && (
        <div className="mt-2 text-center font-semibold text-2xl text-[#9fac2c]">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Ccreatepost;
