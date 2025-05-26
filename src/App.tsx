import '@/app.css';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import NoteDetail from './pages/NoteDetail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useEffect, useState } from 'react';
import { authRepository } from './modules/auth/auth.repository';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser?.user);
    setIsLoading(false);
  };

  useEffect(() => {
    setSession();
  }, []);

  if (isLoading) return <div />;

  return (
    <BrowserRouter>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
