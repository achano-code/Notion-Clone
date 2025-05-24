import '@/app.css';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import NoteDetail from './pages/NoteDetail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
