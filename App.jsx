import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar'; //imported in every page
import { auth } from './firebase/config';
import English from './pages/English';
import French from './pages/French';
import Igbo from './pages/Igbo';
import About from './pages/About';
import Chat from './pages/Chat';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const checkAuth = localStorage.getItem('isAuth');
    if (checkAuth) {
      setIsAuth(true);
    }
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate('/');
    });
  };

  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} signUserOut={signUserOut} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/english" element={<English />} />
        <Route path="/french" element={<French />} />
        <Route path="/igbo" element={<Igbo />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
