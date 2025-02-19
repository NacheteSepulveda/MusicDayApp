import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from "./pages/Home";
import PlaylistPage from "./pages/PlaylistPage";  
import './App.css'
import FeelingPage from './pages/FeelingPage';
import MyPlaylistPage from './pages/MyPlaylistPage';

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist/:clima" element={<PlaylistPage />} />
        <Route path="/playlist/animo/:animo" element={<FeelingPage />} />  
        <Route path="/MyPlaylist" element={<MyPlaylistPage />} />    
      </Routes>
    </BrowserRouter>
  )
}


export default App
