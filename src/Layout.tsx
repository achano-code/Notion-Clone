import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';

const Layout = () => {
  return (
    <div className="flex h-full">
      <SideBar onSearchButtonClicked={() => {}} />
      <main className="h-full flex-1 overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => {}}
          onKeywordChanged={() => {}}
          onClose={() => {}}
        />
      </main>
    </div>
  );
};

export default Layout;
