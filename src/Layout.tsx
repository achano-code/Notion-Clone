import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/note.state';
import { useEffect, useState } from 'react';
import { noteRepository } from './modules/notes/notes.repository';

const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);

  const featchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
  }

  useEffect(() => { featchNotes() }, [])

  if (currentUser == null) return <Navigate replace to="signin" />;

  return (
    <div className="flex h-full">
      {!isLoading && <SideBar onSearchButtonClicked={() => { }} />}
      <main className="h-full flex-1 overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => { }}
          onKeywordChanged={() => { }}
          onClose={() => { }}
        />
      </main>
    </div>
  );
};

export default Layout;
