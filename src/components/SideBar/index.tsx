import { FC } from 'react';
import { Item } from './Item';
import { NoteList } from '../NoteList';
import UserItem from './UserItem';
import { Plus, Search } from 'lucide-react';

type Props = {
  onSearchButtonClicked: () => void;
};

const SideBar: FC<Props> = ({ onSearchButtonClicked }) => {
  return (
    <>
      <aside className="group/sidebar relative flex h-full w-60 flex-col overflow-y-auto bg-neutral-100">
        <div>
          <div>
            <UserItem
              user={{
                id: 'test',
                aud: 'test',
                email: 'test@gmail.com',
                user_metadata: { name: 'testさん' },
                app_metadata: {},
                created_at: 'test',
              }}
              signout={() => {}}
            />
            <Item label="検索" icon={Search} onClick={onSearchButtonClicked} />
          </div>
          <div className="mt-4">
            <NoteList />
            <Item label="ノートを作成" icon={Plus} />
          </div>
        </div>
      </aside>
      <div className="absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]"></div>
    </>
  );
};

export default SideBar;
