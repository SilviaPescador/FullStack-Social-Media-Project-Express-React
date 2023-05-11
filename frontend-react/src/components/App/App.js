import { Route, Routes } from 'react-router-dom';
import HomeLogin from '../../pages/Home/HomeLogin';
import Feed from '../../pages/FeedPage/Feed';

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomeLogin />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;