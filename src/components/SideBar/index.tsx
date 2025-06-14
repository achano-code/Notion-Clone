import { FC } from 'react';
import { Item } from './Item';
import { NoteList } from '../NoteList';
import UserItem from './UserItem';
import { Plus, Search } from 'lucide-react';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { useNoteStore } from '@/modules/notes/note.state';
import { noteRepository } from '@/modules/notes/notes.repository';
import { useNavigate } from 'react-router-dom';
import { authRepository } from '@/modules/auth/auth.repository';

type Props = {
  onSearchButtonClicked: () => void;
};

const SideBar: FC<Props> = ({ onSearchButtonClicked }) => {
  const currentUserStore = useCurrentUserStore();
  const noteStore = useNoteStore();
  const navigate = useNavigate();
  const createNote = async () => {
    const newNote = await noteRepository.create(currentUserStore.currentUser!.id, {});
    noteStore.set([newNote])
    navigate(`/notes/${newNote.id}`)
  }

  const signout = async () => {
    await authRepository.signout()
    currentUserStore.set(undefined)
    noteStore.clear();
  }
  return (
    <>
      <aside className="group/sidebar relative flex h-full w-60 flex-col overflow-y-auto bg-neutral-100">
        <div>
          <div>
            <UserItem
              user={currentUserStore.currentUser!}
              signout={() => signout()}
            />
            <Item label="検索" icon={Search} onClick={onSearchButtonClicked} />
          </div>
          <div className="mt-4">
            <NoteList />
            <Item label="ノートを作成" icon={Plus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]"></div>
    </>
  );
};

export default SideBar;
