import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/note.state';
import { useEffect, useState } from 'react';
import { noteRepository } from './modules/notes/notes.repository';
import { Note } from './modules/notes/note.entity';
import { subscribe, unsubscribe } from './lib/supabase';


const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [serchResult, setSerchResult] = useState<Note[]>();
  const navigate = useNavigate();

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`)
  }

  const featchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
  }

  const serchNotes = async (keyword: string) => {
    const notes = await noteRepository.findByLeyword(currentUser!.id, keyword)
    console.log(keyword)
    if (notes == null) return;
    noteStore.set(notes);
    setSerchResult(notes);
  }

  useEffect(() => {
    featchNotes(); const channel = subscribeNote(); return () => {
      unsubscribe(channel!);
    }
  }, [])

  const subscribeNote = () => {
    if (currentUser == null) return;
    return subscribe(currentUser!.id, (payload) => {
      console.log(payload)
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        noteStore.set([payload.new]);
      } else if (payload.eventType === 'DELETE') {
        noteStore.delete(payload.old.id!);
      }
    })
  }

  if (currentUser == null) return <Navigate replace to="signin" />;

  return (
    <div className="flex h-full">
      {!isLoading && <SideBar onSearchButtonClicked={() => setIsShowModal((prev) => !prev)} />}
      <main className="h-full flex-1 overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={serchResult!}
          onItemSelect={moveToDetail}
          onKeywordChanged={serchNotes}
          onClose={() => setIsShowModal(prev => !prev)}
        />
      </main>
    </div>
  );
};

export default Layout;
